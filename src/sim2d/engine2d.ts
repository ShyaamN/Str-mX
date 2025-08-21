/*
  FluidEngine2D: Stable Fluids (Jos Stam) semi-Lagrangian advection + Gauss-Seidel pressure projection.
  - WebGL2 float textures for velocity, pressure, divergence, dye
  - Obstacles via SDF mask, interactive editor (draw/select/move/scale)
  - Cd/Cl estimation by momentum flux and pressure on obstacle boundary (approximate)
*/

type LogFn = (msg:string)=>void;

export type Metrics = { Re:number; Cd:number; Cl:number; dP:number };

type Tool = 'draw'|'select'|'dye';

type DyeSource = {
  id: string;
  x: number;
  y: number;
  dirX: number;
  dirY: number;
  strength: number;
  color: [number, number, number];
  radius: number;
};

type Obstacle =
  | { id: string; kind: 'circle'; x: number; y: number; w: number; h: number; r: number; rot: number }
  | { id: string; kind: 'rect'; x: number; y: number; w: number; h: number; r: number; rot: number }
  | { id: string; kind: 'poly'; points: [number, number][]; rot: number };

function uid(){ return Math.random().toString(36).slice(2,9); }

export class FluidEngine2D {
  private texPressure!: WebGLTexture; // alias to texPr
  private texVorticity!: WebGLTexture; // computed from velocity each step
  private texStream!: WebGLTexture; // LIC output
  private texNoise!: WebGLTexture; // static noise for LIC
  private zoom: number = 1.0;
  private ofs: [number, number] = [0, 0];
  present: () => void = () => {};
  private overlayMode: 'dye'|'velocity'|'pressure'|'vorticity'|'streamlines' = 'dye';
  // visualization & physics tuning
  private pressureScale = 1.0;
  private licStep = 1.5;
  private licContrast = 1.0;
  private vortConf = 0.0; // vorticity confinement strength

  setOverlayMode(mode: string) {
    if(['dye','velocity','pressure','vorticity','streamlines'].includes(mode)) {
      this.overlayMode = mode as any;
    }
  }
  setPressureScale(s:number){ this.pressureScale = Math.max(0.05, Math.min(10, s)); }
  setLicStep(s:number){ this.licStep = Math.max(0.25, Math.min(4, s)); }
  setLicContrast(c:number){ this.licContrast = Math.max(0.25, Math.min(4, c)); }
  setVorticityConfinement(eps:number){ this.vortConf = Math.max(0, Math.min(10, eps)); }
  private undoStack: any[] = [];
  private redoStack: any[] = [];

  private gl: WebGL2RenderingContext;
  private raf = 0; private lastT=0; private fpsSmoothed=0;
  private dpr=1; private W=0; private H=0; private N=256; private Ny=256; // grid
  private dt=0.016; private nu=1.5e-5; private rho=1.0; private Uin=2.0;
  private running = true;

  private obstacles: Obstacle[] = [];
  private dyeSources: DyeSource[] = [];
  private tool: Tool = 'select';
  private selection: {id:string|null, dragging:boolean, dx:number, dy:number, sizing:boolean} = {id:null, dragging:false, dx:0, dy:0, sizing:false};

  private metrics: Metrics = {Re:0, Cd:0, Cl:0, dP:0};

  private overlay: HTMLElement;
  private handle!: HTMLDivElement; // simple uniform scale handle
  private polyHandles: HTMLDivElement[] = [];
  // Debug overlay canvas to visualize grid and obstacle outlines
  private dbgCanvas?: HTMLCanvasElement;
  private dbgCtx?: CanvasRenderingContext2D;
  // Dye source gizmos (DOM overlays)
  private dyeGizmos: Map<string, { root: HTMLDivElement; rot: HTMLDivElement }> = new Map();
  // Overlay global listeners we need to remove on dispose
  private overlayMoveListener?: (e: PointerEvent)=>void;
  private overlayUpListener?: (e: PointerEvent)=>void;

  constructor(private canvas: HTMLCanvasElement, overlay: HTMLElement, public log: LogFn, private onFps:(fps:number)=>void, private onMetrics:(m:Metrics)=>void){
    this.log('Initializing FluidEngine2D...');
    
    try {
      // Check canvas dimensions first
      const rect = canvas.getBoundingClientRect();
      this.log(`Canvas: ${rect.width}x${rect.height} (client), ${canvas.width}x${canvas.height} (actual)`);
      
      if (rect.width === 0 || rect.height === 0) {
        throw new Error(`Canvas has zero dimensions: ${rect.width}x${rect.height}`);
      }
      
      const gl = canvas.getContext('webgl2', {alpha:false, antialias:false, premultipliedAlpha:false});
      if(!gl) throw new Error('WebGL2 not supported');
      this.gl = gl;
      this.overlay = overlay;
      
      this.initGL();
      this.installPointer();
      this.initOverlay();
      
      this.overlayMode = 'dye';
      this.log('FluidEngine2D initialized successfully');

      // Create debug overlay canvas
      this.dbgCanvas = document.createElement('canvas');
      this.dbgCanvas.style.position = 'absolute';
      this.dbgCanvas.style.inset = '0';
      this.dbgCanvas.style.pointerEvents = 'none';
      this.dbgCanvas.style.zIndex = '6';
      this.overlay.appendChild(this.dbgCanvas);
      this.dbgCtx = this.dbgCanvas.getContext('2d') || undefined;
      this.overlay.classList.add('debugTint');
      
    } catch (error) {
      this.log('ERROR in FluidEngine2D constructor: ' + error);
      console.error('FluidEngine2D constructor error:', error);
      throw error;
    }
  }

  // UI hooks
  private pushUndo() {
    this.undoStack.push(JSON.stringify(this.obstacles));
    if (this.undoStack.length > 50) this.undoStack.shift();
    this.redoStack = [];
  }
  undo() {
    if (this.undoStack.length === 0) return;
    this.redoStack.push(JSON.stringify(this.obstacles));
    this.obstacles = JSON.parse(this.undoStack.pop());
    this.syncObstacles(); this.updateOverlay();
  }
  redo() {
    if (this.redoStack.length === 0) return;
    this.undoStack.push(JSON.stringify(this.obstacles));
    this.obstacles = JSON.parse(this.redoStack.pop());
    this.syncObstacles(); this.updateOverlay();
  }
  snapObstacles() {
    this.pushUndo();
    for (const o of this.obstacles) {
      if (o.kind === 'circle' || o.kind === 'rect') {
        o.x = Math.round(o.x * 20) / 20;
        o.y = Math.round(o.y * 20) / 20;
      } else if (o.kind === 'poly') {
        o.points = o.points.map(([x, y]) => [Math.round(x * 20) / 20, Math.round(y * 20) / 20]);
      }
    }
    this.syncObstacles();
  }
  alignObstacles() {
    this.pushUndo();
    // Center all obstacles horizontally
    const cx = 0.5;
    for (const o of this.obstacles) {
      if (o.kind === 'circle' || o.kind === 'rect') o.x = cx;
      else if (o.kind === 'poly') {
        const dx = cx - (o.points.reduce((a, p) => a + p[0], 0) / o.points.length);
        o.points = o.points.map(([x, y]) => [x + dx, y]);
      }
    }
    this.syncObstacles();
  }
  duplicateSelected() {
    if (!this.selection.id) return;
    this.pushUndo();
    const o = this.obstacles.find(o => o.id === this.selection.id);
    if (!o) return;
    let copy: Obstacle | undefined = undefined;
    if (o.kind === 'circle' || o.kind === 'rect') {
      copy = { ...o, id: uid(), x: o.x + 0.05, y: o.y + 0.05 };
    } else if (o.kind === 'poly') {
      copy = { ...o, id: uid(), points: o.points.map(([x, y]) => [x + 0.05, y + 0.05]) };
    }
    if (!copy) return;
    this.obstacles.push(copy);
    this.syncObstacles();
  }
  setInletVelocity(v:number){ this.Uin = v; }
  setViscosity(v:number){ this.nu = v; }
  setDensity(v:number){ this.rho = v; }
  setDt(v:number){ this.dt = v; }
  setResolution(N:number){ this.N = N; this.rebuild(); }
  setTool(t:Tool){ 
    this.tool = t; 
    this.log(`Tool set to: ${t}`);
    // Also add click fallback for drawing
    if(t === 'draw') {
      this.canvas.addEventListener('click', this.drawClickFallback, {capture: true});
    } else {
      this.canvas.removeEventListener('click', this.drawClickFallback, {capture: true});
    }
  }
  
  // Dye source management
  addDyeSource(x: number, y: number, dirX: number = 1, dirY: number = 0): DyeSource {
    const source: DyeSource = {
      id: uid(),
      x, y, dirX, dirY,
      strength: 2.0,
      color: [Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.5, 1.0], // Random blue-ish colors
      radius: 0.02
    };
  this.dyeSources.push(source);
  this.log(`Added dye source at (${x.toFixed(2)}, ${y.toFixed(2)}) direction (${dirX.toFixed(2)}, ${dirY.toFixed(2)})`);
  // Create UI gizmo
  try{ this.createDyeGizmo(source); this.updateDyeGizmos(); }catch{}
  return source;
  }
  
  removeDyeSource(id: string) {
    const index = this.dyeSources.findIndex(s => s.id === id);
    if (index >= 0) {
  this.dyeSources.splice(index, 1);
      this.log(`Removed dye source ${id}`);
  const g = this.dyeGizmos.get(id); if(g){ try{ g.rot.remove(); }catch{} try{ g.root.remove(); }catch{} this.dyeGizmos.delete(id); }
    }
  }
  
  clearDyeSources() {
    this.dyeSources = [];
    for(const {root, rot} of this.dyeGizmos.values()){
      try{ rot.remove(); }catch{}; try{ root.remove(); }catch{}
    }
    this.dyeGizmos.clear();
    this.log('All dye sources cleared');
  }
  
  getDyeSources() {
    return this.dyeSources;
  }

  // === Dye gizmo helpers ===
  private createDyeGizmo(source: DyeSource){
    const root = document.createElement('div');
    root.style.position = 'absolute';
    root.style.width = '24px'; root.style.height = '24px';
    root.style.marginLeft = '-12px'; root.style.marginTop = '-12px';
    root.style.border = '2px solid #48e3b7'; root.style.background = 'rgba(72,227,183,0.08)';
    root.style.borderRadius = '4px'; root.style.boxSizing = 'border-box';
    root.style.zIndex = '22'; root.style.cursor = 'move';
    root.title = 'Drag to move dye source; rotate with handle';
    const arrow = document.createElement('div');
    arrow.style.position = 'absolute'; arrow.style.left = '50%'; arrow.style.top = '50%';
    arrow.style.width = '0'; arrow.style.height = '0';
    arrow.style.borderLeft = '6px solid #48e3b7';
    arrow.style.borderTop = '4px solid transparent';
    arrow.style.borderBottom = '4px solid transparent';
    arrow.style.transformOrigin = '0 0';
    root.appendChild(arrow);
    const rot = document.createElement('div');
    rot.style.position = 'absolute'; rot.style.width = '10px'; rot.style.height = '10px';
    rot.style.marginLeft = '-5px'; rot.style.marginTop = '-22px';
    rot.style.borderRadius = '50%'; rot.style.background = '#48e3b7'; rot.style.boxShadow = '0 0 0 2px #0b1220';
    rot.style.cursor = 'grab'; rot.title = 'Drag to rotate';
    this.overlay.appendChild(root); this.overlay.appendChild(rot);
    this.dyeGizmos.set(source.id, {root, rot});

    const toUV = (e: PointerEvent): [number, number] => {
      const r=this.canvas.getBoundingClientRect(); return [(e.clientX-r.left)/r.width, (e.clientY-r.top)/r.height];
    };
    let dragging=false; let rotating=false;
    root.addEventListener('pointerdown', (e)=>{ dragging=true; (e.currentTarget as HTMLElement).setPointerCapture((e as any).pointerId); e.stopPropagation(); e.preventDefault(); });
    root.addEventListener('pointermove', (e)=>{ if(!dragging) return; const [u,v]=toUV(e); const [x,y]=this.screenToDomain(u,v); source.x=Math.max(0,Math.min(1,x)); source.y=Math.max(0,Math.min(1,y)); this.updateDyeGizmos(); });
    root.addEventListener('pointerup', (e)=>{ dragging=false; (e.currentTarget as HTMLElement).releasePointerCapture?.((e as any).pointerId); });
    rot.addEventListener('pointerdown', (e)=>{ rotating=true; (e.currentTarget as HTMLElement).setPointerCapture((e as any).pointerId); e.stopPropagation(); e.preventDefault(); });
    rot.addEventListener('pointermove', (e)=>{
      if(!rotating) return; const r=this.canvas.getBoundingClientRect(); const cx=parseFloat(root.style.left||'0'); const cy=parseFloat(root.style.top||'0');
      const px=e.clientX - r.left; const py=e.clientY - r.top; const dx=px-cx; const dy=py-cy; const len=Math.hypot(dx,dy)||1;
      // Convert screen dy into domain direction (invert Y)
      source.dirX = dx/len; source.dirY = -dy/len;
      this.updateDyeGizmos();
    });
    rot.addEventListener('pointerup', (e)=>{ rotating=false; (e.currentTarget as HTMLElement).releasePointerCapture?.((e as any).pointerId); });
  }

  private updateDyeGizmos(){
    for(const s of this.dyeSources){
      const g = this.dyeGizmos.get(s.id); if(!g) continue;
      const [sx, sy] = this.domainToScreen(s.x, s.y);
      g.root.style.left = `${sx}px`; g.root.style.top = `${sy}px`;
      // place rotate handle along direction
      const ang = Math.atan2(s.dirY, s.dirX);
      const r = 22;
      g.rot.style.left = `${sx + Math.cos(ang)*r}px`;
      g.rot.style.top  = `${sy - Math.sin(ang)*r}px`;
      const arrow = g.root.firstChild as HTMLDivElement | null; if(arrow){ arrow.style.transform = `translate(-2px,-2px) rotate(${ang}rad)`; }
    }
  }

  private rebuildDyeGizmos(){
    for(const {root, rot} of this.dyeGizmos.values()){ try{ rot.remove(); }catch{} try{ root.remove(); }catch{} }
    this.dyeGizmos.clear();
    for(const s of this.dyeSources) this.createDyeGizmo(s);
    this.updateDyeGizmos();
  }

  private drawClickFallback = (e: MouseEvent) => {
    if(this.tool !== 'draw') return;
    e.preventDefault();
    e.stopPropagation();
    const rect = this.canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    this.log(`Click fallback paint @ ${x.toFixed(3)}, ${y.toFixed(3)}`);
    this.paintAtScreen(x, y, 0.04);
  }
  resetView(){ this.view.zoom = 1.0; this.view.ofs = [0,0]; }
  setZoom(z:number){ this.view.zoom = Math.min(3, Math.max(0.5, z)); }
  setOffset(x:number,y:number){ this.view.ofs = [x,y]; }
  // Public helper: paint into obstacle mask at screen UV (0..1)
  paintAtScreen(u:number,v:number,r:number=0.04){
    const [ux,uy] = this.screenToDomain(u, v);
    this.log(`paintAtScreen: UV(${u.toFixed(3)}, ${v.toFixed(3)}) -> Domain(${ux.toFixed(3)}, ${uy.toFixed(3)}) r=${r.toFixed(3)}`);
    
    // Ensure textures exist
    if(!this.texMask || !this.texDye || !this.progPaint || !this.progSplat) {
      this.log('ERROR: Missing textures or programs in paintAtScreen');
      return;
    }
    
    // paint obstacle into mask (brush) and add dye for feedback
    this.drawTo(this.texMask, this.progPaint, (gl)=>{
      this.bindTexture(0, this.texMask);
      gl.uniform1i(gl.getUniformLocation(this.progPaint,'src'),0);
      gl.uniform2f(gl.getUniformLocation(this.progPaint,'p'), ux, uy);
      gl.uniform1f(gl.getUniformLocation(this.progPaint,'r'), r);
    });
    // add bright dye splat for immediate visual feedback
    this.drawTo(this.texDye, this.progSplat, (gl)=>{
      this.bindTexture(0, this.texDye);
      gl.uniform1i(gl.getUniformLocation(this.progSplat,'src'),0);
      gl.uniform2f(gl.getUniformLocation(this.progSplat,'p'), ux, uy);
      gl.uniform1f(gl.getUniformLocation(this.progSplat,'r'), Math.max(0.8*r, 0.02));
      gl.uniform3f(gl.getUniformLocation(this.progSplat,'color'), 4.0, 2.0, 0.5);
    });
    this.log(`paintAtScreen completed - should see bright splat`);
  }
  reset(){ this.clearObstacles(); this.clearFields(); }
  pause(){ this.running=false; }
  resume(){ this.running=true; this.lastT=performance.now(); this.loop(this.lastT); }
  addCircle(){ 
    this.pushUndo();
    // Create a larger, more visible circle
    const circle = {id:uid(), kind:'circle' as const, x:0.5, y:0.5, w:0.16, h:0.16, r:0.12, rot:0};
    this.obstacles.push(circle); 
    this.syncObstacles(); 
    this.updateOverlay();
    this.log(`Circle obstacle added at (${circle.x}, ${circle.y}) radius ${circle.r}`);
    this.log(`Total obstacles count: ${this.obstacles.length}`);
    
    // Add an EXTREMELY bright and large dye splat for visibility testing
    this.drawTo(this.texDye, this.progSplat, (gl)=>{
      this.bindTexture(0, this.texDye);
      gl.uniform1i(gl.getUniformLocation(this.progSplat,'src'),0);
      gl.uniform2f(gl.getUniformLocation(this.progSplat,'p'), circle.x, circle.y);
      gl.uniform1f(gl.getUniformLocation(this.progSplat,'r'), 0.3); // Much larger radius
      gl.uniform3f(gl.getUniformLocation(this.progSplat,'color'), 10.0, 10.0, 10.0); // Bright white
    });
    
    // Also force a debug overlay update
    if (this.dbgCanvas && this.dbgCtx) {
      this.log('Debug canvas available, drawing test circle...');
      this.drawDebugOverlay();
    } else {
      this.log('Debug canvas NOT available');
    }
  }
  addRect(){ 
    this.pushUndo();
    const rect = {id:uid(), kind:'rect' as const, x:0.6, y:0.5, w:0.15, h:0.1, r:0, rot:0};
    this.obstacles.push(rect); 
    this.log(`Rectangle obstacle added: id=${rect.id}, pos=(${rect.x}, ${rect.y}), size=(${rect.w}x${rect.h})`);
    this.log(`Total obstacles: ${this.obstacles.length}`);
    this.syncObstacles(); 
    this.updateOverlay();
    
    // Force immediate debug overlay redraw
    if (this.dbgCanvas && this.dbgCtx) {
      this.log('Forcing debug overlay update for rectangle...');
      this.drawDebugOverlay();
    } else {
      this.log('ERROR: Debug canvas not available for rectangle visualization');
    }
  }
  addPolygon(points?: [number, number][]) {
    // Default: triangle in center
    if (!points) points = [[0.5,0.6],[0.6,0.4],[0.4,0.4]];
    this.obstacles.push({ id: uid(), kind: 'poly', points, rot: 0 });
    this.syncObstacles();
  }
  clearObstacles(){ 
    this.pushUndo();
    this.obstacles=[]; 
    this.syncObstacles(); 
    this.updateOverlay();
    // also clear the mask texture to remove drawn obstacles
    const gl=this.gl;
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texMask, 0);
    gl.clearColor(0,0,0,1); 
    gl.clear(gl.COLOR_BUFFER_BIT);
    this.log('All obstacles cleared');
  }

  getObstacles(){ return this.obstacles; }

  start(){ 
    try {
      this.log('FluidEngine2D starting animation loop');
      this.lastT=performance.now(); 
      this.log('Calling loop() with timestamp: ' + this.lastT);
      this.loop(this.lastT); 
      this.log('FluidEngine2D start() completed successfully');
    } catch (error) {
      this.log('ERROR in FluidEngine2D start(): ' + error);
      console.error('FluidEngine2D start() error:', error);
      throw error;
    }
  }
  dispose(){
    cancelAnimationFrame(this.raf);
    // Remove canvas fallback listener
    try { this.canvas.removeEventListener('click', this.drawClickFallback as any, { capture: true } as any); } catch{}
    // Remove overlay handles
    try {
      if(this.polyHandles){ for(const h of this.polyHandles){ try{ h.remove(); }catch{} } this.polyHandles = []; }
      if(this.handle){ try{ this.handle.remove(); }catch{} }
      // Remove dye gizmos
      for(const {root, rot} of this.dyeGizmos.values()){
        try{ rot.remove(); }catch{}
        try{ root.remove(); }catch{}
      }
      this.dyeGizmos.clear();
      // Remove global listeners
      if(this.overlayMoveListener) window.removeEventListener('pointermove', this.overlayMoveListener);
      if(this.overlayUpListener) window.removeEventListener('pointerup', this.overlayUpListener);
      this.overlayMoveListener = undefined; this.overlayUpListener = undefined;
      // Remove debug canvas
      if(this.dbgCanvas){ try{ this.dbgCanvas.remove(); }catch{} this.dbgCanvas = undefined; this.dbgCtx = undefined; }
      this.overlay.classList.remove('debugTint');
    } catch{}
  }

  resize(w:number, h:number, dpr:number){ 
    this.log(`FluidEngine2D resize: ${w}x${h} dpr=${dpr}`);
    this.W=w; this.H=h; this.dpr=dpr; 
    
    // Ensure canvas has actual size
    this.canvas.width = w;
    this.canvas.height = h;
    this.log(`Canvas size set to: ${this.canvas.width}x${this.canvas.height}`);
    
    this.rebuild(); 
    // Resize debug canvas to match CSS pixels * dpr for crisp lines
    if(this.dbgCanvas){
      const cssW = Math.max(1, this.canvas.clientWidth|0);
      const cssH = Math.max(1, this.canvas.clientHeight|0);
      this.dbgCanvas.width = Math.floor(cssW * dpr);
      this.dbgCanvas.height = Math.floor(cssH * dpr);
      this.dbgCanvas.style.width = cssW + 'px';
      this.dbgCanvas.style.height = cssH + 'px';
      if(this.dbgCtx){ this.dbgCtx.setTransform(dpr,0,0,dpr,0,0); }
      this.log(`Debug canvas sized: ${this.dbgCanvas.width}x${this.dbgCanvas.height} (${cssW}x${cssH} CSS)`);
    }
  }

  // ===== Rendering and solver resources =====
  private progAdv!: WebGLProgram; private progJac!: WebGLProgram; private progDiv!: WebGLProgram; private progProj!: WebGLProgram; private progSplat!: WebGLProgram; private progCopy!: WebGLProgram; private progVis!: WebGLProgram; private progMask!: WebGLProgram; private progForces!: WebGLProgram; private progPresent!: WebGLProgram; private progFade!: WebGLProgram;
  private progPaint!: WebGLProgram;
  private progVort!: WebGLProgram; // vorticity compute
  private progLIC!: WebGLProgram;  // LIC streamlines
  private progVortForce!: WebGLProgram; // vorticity confinement force
  private progNoSlip!: WebGLProgram; // enforce no-slip at obstacle
  private vao!: WebGLVertexArrayObject; private quad!: WebGLBuffer;
  private view = { zoom: 1.0, ofs:[0,0] as [number,number] };

  private texVel!: WebGLTexture; private texVelTmp!: WebGLTexture; private texPr!: WebGLTexture; private texPrTmp!: WebGLTexture; private texDiv!: WebGLTexture; private texDye!: WebGLTexture; private texDyeTmp!: WebGLTexture; private texMask!: WebGLTexture;
  private fbo!: WebGLFramebuffer;
  private lastSampleT = 0;

  private initGL(){
    const gl = this.gl;
    const exts = [gl.getExtension('EXT_color_buffer_float'), gl.getExtension('OES_texture_float_linear')];
    if(!exts[0]) this.log('Warning: EXT_color_buffer_float missing');

    this.vao = gl.createVertexArray()!; gl.bindVertexArray(this.vao);
    this.quad = gl.createBuffer()!; gl.bindBuffer(gl.ARRAY_BUFFER, this.quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1,-1, 1,-1, -1,1,
      -1,1, 1,-1, 1,1,
    ]), gl.STATIC_DRAW);

    const makeProg=(vs:string, fs:string)=>{
      const v = this.c(gl.VERTEX_SHADER, vs);
      const f = this.c(gl.FRAGMENT_SHADER, fs);
      const p = gl.createProgram()!; gl.attachShader(p,v); gl.attachShader(p,f); gl.linkProgram(p);
      if(!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p) || 'link error');
      return p;
    };

    const vs=`#version 300 es
    layout(location=0) in vec2 p; out vec2 uv; void main(){ uv = 0.5*p+0.5; gl_Position=vec4(p,0,1);} `;

  const fsCopy=`#version 300 es
    precision highp float; in vec2 uv; out vec4 o; uniform sampler2D t; void main(){ o = texture(t, uv);} `;

    const fsAdv=`#version 300 es
    precision highp float; in vec2 uv; out vec4 o; uniform sampler2D vel; uniform sampler2D src; uniform sampler2D mask; uniform float dt; uniform vec2 invRes; 
    vec4 bilerp(sampler2D t, vec2 p){ vec2 st = p*invRes; vec2 f = fract(st); vec2 i = (floor(st)+0.5)*invRes; vec2 j = i + vec2(invRes.x,0.0); vec2 k = i + vec2(0.0,invRes.y); vec2 l = i + invRes; vec4 a=texture(t,i), b=texture(t,j), c=texture(t,k), d=texture(t,l); return mix(mix(a,b,f.x), mix(c,d,f.x), f.y);} 
    void main(){ vec2 v = texture(vel, uv).xy; vec2 p = uv - dt*v; vec4 s = bilerp(src, p); float m = texture(mask, uv).r; o = mix(s, vec4(0), m); }`;

    const fsDiv=`#version 300 es
    precision highp float; in vec2 uv; out vec4 o; uniform sampler2D vel; uniform sampler2D mask; uniform vec2 px; 
    void main(){ vec2 l=uv-vec2(px.x,0), r=uv+vec2(px.x,0), d=uv-vec2(0,px.y), u=uv+vec2(0,px.y);
      vec2 vL=texture(vel,l).xy, vR=texture(vel,r).xy, vD=texture(vel,d).xy, vU=texture(vel,u).xy; float m=texture(mask,uv).r; 
      float div = (vR.x - vL.x + vU.y - vD.y)*0.5; o = vec4((1.0-m)*div,0,0,1); }
    `;

    const fsJac=`#version 300 es
    precision highp float; in vec2 uv; out vec4 o; uniform sampler2D p; uniform sampler2D div; uniform sampler2D mask; uniform vec2 px; 
    void main(){ vec2 l=uv-vec2(px.x,0), r=uv+vec2(px.x,0), d=uv-vec2(0,px.y), u=uv+vec2(0,px.y);
      float m=texture(mask,uv).r; float pl=texture(p,l).x, pr=texture(p,r).x, pd=texture(p,d).x, pu=texture(p,u).x; float b=texture(div,uv).x; 
      float res = (pl+pr+pd+pu - b)*0.25; o = vec4(mix(res, 0.0, m)); }
    `;

    const fsProj=`#version 300 es
    precision highp float; in vec2 uv; out vec4 o; uniform sampler2D vel; uniform sampler2D p; uniform sampler2D mask; uniform vec2 px; 
    void main(){ vec2 l=uv-vec2(px.x,0), r=uv+vec2(px.x,0), d=uv-vec2(0,px.y), u=uv+vec2(0,px.y);
      float pl=texture(p,l).x, pr=texture(p,r).x, pd=texture(p,d).x, pu=texture(p,u).x; vec2 v=texture(vel,uv).xy; float m=texture(mask,uv).r;
      vec2 g = vec2(pr-pl, pu-pd)*0.5; vec2 vc = v - g; o = vec4(mix(vc, vec2(0), m), 0, 1); }
    `;

    const fsVis=`#version 300 es
    precision highp float; in vec2 uv; out vec4 o; uniform sampler2D vel; uniform float nu; uniform vec2 px; 
    void main(){ vec2 l=uv-vec2(px.x,0), r=uv+vec2(px.x,0), d=uv-vec2(0,px.y), u=uv+vec2(0,px.y);
      vec2 vL=texture(vel,l).xy, vR=texture(vel,r).xy, vD=texture(vel,d).xy, vU=texture(vel,u).xy, vC=texture(vel,uv).xy; 
      vec2 lap = (vL+vR+vD+vU - 4.0*vC); o = vec4(vC + nu*lap, 0, 1); }
    `;

  const fsSplat=`#version 300 es
    precision highp float; in vec2 uv; out vec4 o; uniform sampler2D src; uniform vec2 p; uniform float r; uniform vec3 color; 
    void main(){ float d = distance(uv, p); float s = exp(-d*d/(r*r)); vec4 c = texture(src, uv); o = c + vec4(color*s, 1); }
    `;

  const fsPaint=`#version 300 es
  precision highp float; in vec2 uv; out vec4 o; uniform sampler2D src; uniform vec2 p; uniform float r; 
  void main(){ float d = distance(uv, p); float b = smoothstep(r, r*0.8, d); float m = 1.0 - b; float cur = texture(src, uv).r; o = vec4(max(cur, m), 0.0, 0.0, 1.0); }
  `;

    const fsMask=`#version 300 es
    precision highp float; in vec2 uv; out vec4 o; uniform vec4 rects[64]; uniform float rectA[64]; uniform int rectCount; uniform vec4 cir[64]; uniform int cirCount; 
    float rectSDF(vec2 p, vec2 c, vec2 hw){ vec2 d = abs(p-c)-hw; return length(max(d,0.0))+min(max(d.x,d.y),0.0);} 
    void main(){ float m=0.0; 
      for(int i=0;i<rectCount;i++){ vec4 R=rects[i]; float a = rectA[i]; float ca=cos(-a), sa=sin(-a); vec2 pc = uv - R.xy; vec2 pr = vec2(ca*pc.x - sa*pc.y, sa*pc.x + ca*pc.y) + R.xy; m=max(m, step(-0.001, -rectSDF(pr, R.xy, R.zw*0.5))); }
      for(int i=0;i<cirCount;i++){ vec4 C=cir[i]; float d=distance(uv, C.xy)-C.z; m=max(m, step(-0.001, -d)); }
      o = vec4(m,0,0,1);
    }
    `;

    const fsForces=`#version 300 es
    precision highp float; in vec2 uv; out vec4 o; uniform sampler2D vel; uniform float Uin; uniform vec2 px; 
    void main(){
      vec2 v = texture(vel, uv).xy;
      // Inlet: enforce horizontal inflow
      if(uv.x < 0.01) v = vec2(Uin, 0.0);
      // Outlet: zero-gradient (copy from left neighbor)
      if(uv.x > 0.99) v = texture(vel, uv - vec2(px.x, 0.0)).xy;
      o = vec4(v,0,1);
    }
    `;

    const fsPresent=`#version 300 es
    precision highp float; in vec2 uv; out vec4 o;
  uniform sampler2D vel, dye, mask, pressure, vorticity, stream;
    uniform float zoom; uniform vec2 ofs;
    uniform int overlayMode;
  uniform float pressureScale;
    vec3 turbo(float x){ x=clamp(x,0.0,1.0); return vec3(
      34.61 + x*(1172.33 + x*(-10793.56 + x*(33300.12 + x*(-38394.49 + x*14825.05)))) ,
      23.31 + x*(557.33 + x*(1225.33 + x*(-3574.96 + x*(3481.96 - x*1108.04)))) ,
      27.2 + x*(321.21 + x*(-1525.77 + x*(2815.57 + x*(-1904.75 + x*348.02)))) )/255.0; }
    void main(){
      vec2 u = (uv-0.5)/zoom + 0.5 + ofs;
      float m = texture(mask, u).r;
      vec3 col = vec3(0.0);
      if(overlayMode==0) { // dye
        col = texture(dye, u).rgb;
      } else if(overlayMode==1) { // velocity
        vec2 v = texture(vel, u).xy; float s = length(v);
        col = turbo(s*2.0);
      } else if(overlayMode==2) { // pressure
        float p = texture(pressure, u).r * pressureScale;
        col = vec3(0.5+0.5*p, 0.5-0.5*p, 1.0-abs(p));
      } else if(overlayMode==3) { // vorticity
        float vort = texture(vorticity, u).r;
        col = vec3(0.5+0.5*vort, 0.5-0.5*vort, 1.0-abs(vort));
      } else if(overlayMode==4) { // streamlines (LIC)
        float g = texture(stream, u).r;
        col = vec3(g);
      }
      col = mix(col, vec3(0.08), m*0.8);
      o = vec4(col, 1.0);
    }
    `;

    const fsFade=`#version 300 es
    precision highp float; in vec2 uv; out vec4 o; uniform sampler2D t; uniform float k; void main(){ o = texture(t, uv)*k; }
    `;

    this.progCopy = makeProg(vs, fsCopy);
    this.progAdv = makeProg(vs, fsAdv);
    this.progDiv = makeProg(vs, fsDiv);
    this.progJac = makeProg(vs, fsJac);
    this.progProj = makeProg(vs, fsProj);
    this.progVis = makeProg(vs, fsVis);
    this.progSplat = makeProg(vs, fsSplat);
    this.progMask = makeProg(vs, fsMask);
    this.progForces = makeProg(vs, fsForces);
  this.progPresent = makeProg(vs, fsPresent);

  // Vorticity shader (curl of velocity)
  const fsVort=`#version 300 es
  precision highp float; in vec2 uv; out vec4 o; uniform sampler2D vel; uniform vec2 px;
  void main(){
    vec2 l=uv-vec2(px.x,0.0), r=uv+vec2(px.x,0.0), d=uv-vec2(0.0,px.y), u=uv+vec2(0.0,px.y);
    float dvy_dx = (texture(vel,r).y - texture(vel,l).y)*0.5;
    float dvx_dy = (texture(vel,u).x - texture(vel,d).x)*0.5;
    float w = dvy_dx - dvx_dy; o = vec4(w,0.0,0.0,1.0);
  }`;
  this.progVort = makeProg(vs, fsVort);

  // LIC streamlines shader
  const fsLIC=`#version 300 es
  precision highp float; in vec2 uv; out vec4 o; uniform sampler2D vel; uniform sampler2D noise; uniform vec2 px; uniform float licStep; uniform float licContrast;
  void main(){
    vec2 v = texture(vel, uv).xy; float s = length(v);
    vec2 dir = s > 1e-5 ? normalize(v) : vec2(1.0, 0.0);
    float h = licStep; // pixels per step
    vec3 acc = vec3(0.0); float wsum = 0.0;
    for(int i=-8;i<=8;i++){
      vec2 offset = dir * vec2(px.x, px.y) * float(i) * h;
      float w = 1.0 - abs(float(i))/9.0; w = max(w, 0.0);
      vec3 n = texture(noise, uv + offset).rgb;
      acc += n * w; wsum += w;
    }
    vec3 col = acc / max(wsum, 1e-5);
    float g = dot(col, vec3(0.299, 0.587, 0.114));
    g = clamp(0.5 + (g - 0.5) * licContrast, 0.0, 1.0);
    o = vec4(vec3(g), 1.0);
  }`;
  this.progLIC = makeProg(vs, fsLIC);

  // Vorticity confinement force shader
  const fsVortForce=`#version 300 es
  precision highp float; in vec2 uv; out vec4 o; uniform sampler2D vel; uniform sampler2D vort; uniform sampler2D mask; uniform vec2 px; uniform float eps; uniform float dt;
  void main(){
    // gradient of |w|
    float wl = abs(texture(vort, uv-vec2(px.x,0.0)).r);
    float wr = abs(texture(vort, uv+vec2(px.x,0.0)).r);
    float wd = abs(texture(vort, uv-vec2(0.0,px.y)).r);
    float wu = abs(texture(vort, uv+vec2(0.0,px.y)).r);
    vec2 grad = vec2(wr - wl, wu - wd) * 0.5;
    float len = length(grad) + 1e-6;
    vec2 N = grad / len;
    float w = texture(vort, uv).r;
    // 2D confinement force is epsilon * (N x w), where N x w rotates N by 90 degrees and scales by w
    vec2 f = eps * vec2(N.y, -N.x) * w;
    vec2 v = texture(vel, uv).xy + dt * f;
    float m = texture(mask, uv).r;
    o = vec4(mix(v, vec2(0.0), m), 0.0, 1.0);
  }`;
  this.progVortForce = makeProg(vs, fsVortForce);

  // No-slip boundary enforcement: zero velocity in and on mask boundary
  const fsNoSlip=`#version 300 es
  precision highp float; in vec2 uv; out vec4 o; uniform sampler2D vel; uniform sampler2D mask; uniform vec2 px;
  void main(){
    float m = texture(mask, uv).r;
    // detect boundary if any neighbor differs
    float ml = texture(mask, uv-vec2(px.x,0.0)).r;
    float mr = texture(mask, uv+vec2(px.x,0.0)).r;
    float md = texture(mask, uv-vec2(0.0,px.y)).r;
    float mu = texture(mask, uv+vec2(0.0,px.y)).r;
    bool boundary = (m>0.5) || (ml>0.5) || (mr>0.5) || (md>0.5) || (mu>0.5);
    vec2 v = texture(vel, uv).xy;
    if(boundary) v = vec2(0.0);
    o = vec4(v, 0.0, 1.0);
  }`;
  this.progNoSlip = makeProg(vs, fsNoSlip);
  // Present override: pass overlayMode to shader
  const oldPresent = this.present;
  this.present = () => {
    const gl = this.gl;
    gl.useProgram(this.progPresent);
    gl.uniform1i(gl.getUniformLocation(this.progPresent, 'overlayMode'),
      this.overlayMode==='dye'?0:this.overlayMode==='velocity'?1:this.overlayMode==='pressure'?2:this.overlayMode==='vorticity'?3:4);
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, this.texVel);
    gl.uniform1i(gl.getUniformLocation(this.progPresent, 'vel'), 0);
    gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, this.texDye);
    gl.uniform1i(gl.getUniformLocation(this.progPresent, 'dye'), 1);
    gl.activeTexture(gl.TEXTURE2); gl.bindTexture(gl.TEXTURE_2D, this.texMask);
    gl.uniform1i(gl.getUniformLocation(this.progPresent, 'mask'), 2);
    gl.activeTexture(gl.TEXTURE3); gl.bindTexture(gl.TEXTURE_2D, this.texPressure);
    gl.uniform1i(gl.getUniformLocation(this.progPresent, 'pressure'), 3);
    gl.activeTexture(gl.TEXTURE4); gl.bindTexture(gl.TEXTURE_2D, this.texVorticity);
    gl.uniform1i(gl.getUniformLocation(this.progPresent, 'vorticity'), 4);
    gl.activeTexture(gl.TEXTURE5); gl.bindTexture(gl.TEXTURE_2D, this.texStream);
    gl.uniform1i(gl.getUniformLocation(this.progPresent, 'stream'), 5);
    gl.uniform1f(gl.getUniformLocation(this.progPresent, 'zoom'), this.zoom);
    gl.uniform2fv(gl.getUniformLocation(this.progPresent, 'ofs'), this.ofs);
  gl.uniform1f(gl.getUniformLocation(this.progPresent, 'pressureScale'), this.pressureScale);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
  // Draw debug overlay grid and obstacle outlines
  this.drawDebugOverlay();
  };
  this.progFade = makeProg(vs, fsFade);
  this.progPaint = makeProg(vs, fsPaint);

    const loc = 0; gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    this.fbo = gl.createFramebuffer()!;
    this.rebuild();
  }

  private createTex(w:number,h:number,internal:number = this.gl.RG16F){
    const gl=this.gl; const t=gl.createTexture()!; gl.bindTexture(gl.TEXTURE_2D,t);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  let format: number = gl.RG;
    if(internal===gl.R16F) format = gl.RED; else if(internal===gl.RG16F) format = gl.RG; else if(internal===gl.RGBA16F) format = gl.RGBA;
    gl.texImage2D(gl.TEXTURE_2D,0,internal,w,h,0,format,gl.HALF_FLOAT,null);
    return t;
  }
//henlo
  private createNoiseTex(w:number, h:number){
    const gl=this.gl; const t=gl.createTexture()!; gl.bindTexture(gl.TEXTURE_2D,t);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    const data = new Uint8Array(w*h*4);
    for(let i=0;i<w*h*4;i++){ data[i] = Math.floor(Math.random()*256); }
    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,w,h,0,gl.RGBA,gl.UNSIGNED_BYTE,data);
    return t;
  }

  private rebuild(){
    const gl=this.gl; const w=this.W||Math.floor(this.canvas.clientWidth*this.dpr)||512; const h=this.H||Math.floor(this.canvas.clientHeight*this.dpr)||512;
  const Nx = this.N; const Ny = Math.max(2, Math.floor(Nx * h / w)); this.Ny = Ny;
    this.W=w; this.H=h;

    const del = (t?:WebGLTexture)=>{ if(t) gl.deleteTexture(t); };
  del(this.texVel); del(this.texVelTmp); del(this.texPr); del(this.texPrTmp); del(this.texDiv); del(this.texDye); del(this.texDyeTmp); del(this.texMask); del(this.texVorticity); del(this.texStream); del(this.texNoise);
    this.texVel = this.createTex(Nx,Ny,this.gl.RG16F);
    this.texVelTmp = this.createTex(Nx,Ny,this.gl.RG16F);
    this.texPr = this.createTex(Nx,Ny,this.gl.R16F);
    this.texPrTmp = this.createTex(Nx,Ny,this.gl.R16F);
    this.texDiv = this.createTex(Nx,Ny,this.gl.R16F);
    this.texDye = this.createTex(Nx,Ny,this.gl.RGBA16F);
    this.texDyeTmp = this.createTex(Nx,Ny,this.gl.RGBA16F);
    this.texMask = this.createTex(Nx,Ny,this.gl.R16F);
  this.texVorticity = this.createTex(Nx,Ny,this.gl.R16F);
  this.texStream = this.createTex(Nx,Ny,this.gl.RGBA16F);
  this.texNoise = this.createNoiseTex(Nx,Ny);
  // alias pressure for present binding
  this.texPressure = this.texPr;

    this.syncObstacles();
    // initialize with extremely bright, large visible areas
    this.log('Initializing dye and velocity textures with bright colors');
    
    // Large central dye splat - make it enormous and bright
    this.drawTo(this.texDye, this.progSplat, (gl)=>{
      this.bindTexture(0, this.texDye);
      gl.uniform1i(gl.getUniformLocation(this.progSplat,'src'),0);
      gl.uniform2f(gl.getUniformLocation(this.progSplat,'p'), 0.5, 0.5);
      gl.uniform1f(gl.getUniformLocation(this.progSplat,'r'), 0.8);
      gl.uniform3f(gl.getUniformLocation(this.progSplat,'color'), 5.0, 3.0, 1.0);
    });
    
    // add bright velocity field
    this.drawTo(this.texVel, this.progSplat, (gl)=>{
      this.bindTexture(0, this.texVel);
      gl.uniform1i(gl.getUniformLocation(this.progSplat,'src'),0);
      gl.uniform2f(gl.getUniformLocation(this.progSplat,'p'), 0.1, 0.5);
      gl.uniform1f(gl.getUniformLocation(this.progSplat,'r'), 0.2);
      gl.uniform3f(gl.getUniformLocation(this.progSplat,'color'), 4.0, 0.0, 0.0);
    });
    // add another velocity spot
    this.drawTo(this.texVel, this.progSplat, (gl)=>{
      this.bindTexture(0, this.texVel);
      gl.uniform1i(gl.getUniformLocation(this.progSplat,'src'),0);
      gl.uniform2f(gl.getUniformLocation(this.progSplat,'p'), 0.5, 0.8);
      gl.uniform1f(gl.getUniformLocation(this.progSplat,'r'), 0.15);
      gl.uniform3f(gl.getUniformLocation(this.progSplat,'color'), 0.0, 3.0, 0.0);
    });
    
    this.log('Dye and velocity initialization complete - should be visible');
  }
//just another easter egg :)
  private clearFields(){
    const gl=this.gl;
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);
    const clearTex=(t:WebGLTexture)=>{ gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, t, 0); gl.clearColor(0,0,0,1); gl.clear(gl.COLOR_BUFFER_BIT); };
  [this.texVel,this.texVelTmp,this.texPr,this.texPrTmp,this.texDiv,this.texDye,this.texDyeTmp,this.texVorticity,this.texStream].forEach(clearTex);
  }

  private drawTo(target:WebGLTexture, prog:WebGLProgram, set?: (gl:WebGL2RenderingContext)=>void){
    const gl=this.gl; gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, target, 0);
    gl.viewport(0,0,this.N, Math.max(2, Math.floor(this.N * this.H / this.W)));
  gl.useProgram(prog);
    set && set(gl);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }
//yipeeeee
  private bindTexture(unit:number, tex:WebGLTexture){ const gl=this.gl; gl.activeTexture(gl.TEXTURE0+unit); gl.bindTexture(gl.TEXTURE_2D, tex); }
//priv stuff yeah
  private c(type:number, src:string){ const gl=this.gl; const s=gl.createShader(type)!; gl.shaderSource(s, src); gl.compileShader(s); if(!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) || 'compile error'); return s; }

  private syncObstacles() {
    // render mask from obstacle list (now includes polygons)
    const gl = this.gl; gl.useProgram(this.progMask);
    // Pack arrays into uniforms (limited to 64 each)
    const rects: number[] = [], rectA: number[] = [], cir: number[] = [];
    let polys: number[][] = [];
    for (const o of this.obstacles) {
      if (o.kind === 'rect') { rects.push(o.x, o.y, o.w, o.h); rectA.push(o.rot || 0); }
      else if (o.kind === 'circle') cir.push(o.x, o.y, o.r, 0);
      else if (o.kind === 'poly') polys.push(o.points.flat());
    }
    // Fallback if empty
    while (rects.length < 64 * 4) rects.push(2, 2, 0, 0);
    while (rectA.length < 64) rectA.push(0);
    while (cir.length < 64 * 4) cir.push(2, 2, 0, 0);
    // For polygons, we rasterize on CPU for now (slow but simple)
    if (polys.length) {
      // Draw polygons into mask texture on CPU (brute force, slow for many polys)
      const Nx = this.N, Ny = this.Ny;
      const mask = new Float32Array(Nx * Ny);
      // Existing mask from rect/circle
      this.drawTo(this.texMask, this.progMask, (gl) => {
        const ul = (n: string) => gl.getUniformLocation(this.progMask, n);
        gl.uniform4fv(ul('rects'), new Float32Array(rects));
        gl.uniform1fv(ul('rectA'), new Float32Array(rectA));
        gl.uniform1i(ul('rectCount'), Math.min(64, this.obstacles.filter(o => o.kind === 'rect').length));
        gl.uniform4fv(ul('cir'), new Float32Array(cir));
        gl.uniform1i(ul('cirCount'), Math.min(64, this.obstacles.filter(o => o.kind === 'circle').length));
      });
      // Read mask
      this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.fbo);
      this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, this.texMask, 0);
      this.gl.readPixels(0, 0, Nx, Ny, this.gl.RED, this.gl.FLOAT, mask);
      // Rasterize polys
      for (const pts of polys) {
        for (let j = 0; j < Ny; ++j) for (let i = 0; i < Nx; ++i) {
          const x = i / Nx, y = j / Ny;
          if (pointInPoly(x, y, pts)) mask[j * Nx + i] = 1;
        }
      }
      // Write back to mask texture
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.texMask);
      this.gl.texSubImage2D(this.gl.TEXTURE_2D, 0, 0, 0, Nx, Ny, this.gl.RED, this.gl.FLOAT, mask);
    } else {
      this.drawTo(this.texMask, this.progMask, (gl) => {
        const ul = (n: string) => gl.getUniformLocation(this.progMask, n);
        gl.uniform4fv(ul('rects'), new Float32Array(rects));
        gl.uniform1fv(ul('rectA'), new Float32Array(rectA));
        gl.uniform1i(ul('rectCount'), Math.min(64, this.obstacles.filter(o => o.kind === 'rect').length));
        gl.uniform4fv(ul('cir'), new Float32Array(cir));
        gl.uniform1i(ul('cirCount'), Math.min(64, this.obstacles.filter(o => o.kind === 'circle').length));
      });
    }
    this.updateOverlay();
    // Helper: point in polygon (ray casting)
    function pointInPoly(x: number, y: number, pts: number[]): boolean {
      let inside = false;
      for (let i = 0, j = pts.length / 2 - 1; i < pts.length / 2; j = i++) {
        const xi = pts[2 * i], yi = pts[2 * i + 1], xj = pts[2 * j], yj = pts[2 * j + 1];
        const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi + 1e-12) + xi);
        if (intersect) inside = !inside;
      }
      return inside;
    }
  }
//yep
  private computeMetrics(){
    const now = performance.now();
    const Re = this.Uin * 1.0 / this.nu;
    let Cd = this.metrics.Cd, Cl = this.metrics.Cl, dP = this.metrics.dP;
    if(now - this.lastSampleT > 150){
      this.lastSampleT = now;
      const gl = this.gl; const Ny = this.Ny; const Nx = this.N;
      // sample outlet velocity column at x= Nx-2
      gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texVel, 0);
      const col = new Float32Array(Ny*2);
      gl.readBuffer?.(gl.COLOR_ATTACHMENT0 as any);
      gl.readPixels(Nx-2, 0, 1, Ny, gl.RG, gl.FLOAT, col);
      let ubar=0; for(let i=0;i<Ny;i++){ ubar += col[i*2]; } ubar/=Ny;
      const deficit = Math.max(0, this.Uin - ubar);
      // crude drag coefficient estimate based on momentum deficit ratio
      Cd = 2*deficit/Math.max(1e-6, this.Uin);
      // pressure drop between inlet and outlet
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texPr, 0);
      const pin = new Float32Array(Ny); const pout = new Float32Array(Ny);
      gl.readPixels(1, 0, 1, Ny, gl.RED, gl.FLOAT, pin);
      gl.readPixels(Nx-2, 0, 1, Ny, gl.RED, gl.FLOAT, pout);
      let pinBar=0, poutBar=0; for(let i=0;i<Ny;i++){ pinBar+=pin[i]; poutBar+=pout[i]; } pinBar/=Ny; poutBar/=Ny;
      dP = Math.abs(pinBar - poutBar);

      // --- Pressure-normal integration over obstacle boundary for Fx,Fy ---
      const pr = new Float32Array(Nx*Ny);
      const mask = new Float32Array(Nx*Ny);
      // pressure already bound
      gl.readPixels(0, 0, Nx, Ny, gl.RED, gl.FLOAT, pr);
      // read mask
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texMask, 0);
      gl.readPixels(0, 0, Nx, Ny, gl.RED, gl.FLOAT, mask);
      let Fx = 0, Fy = 0, edgeCount = 0;
      const dx = 1.0/ Nx, dy = 1.0/ Ny;
      // We'll also accumulate skin friction using velocity gradient along the normal.
      // Read velocity field
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texVel, 0);
      const vel = new Float32Array(Nx*Ny*2);
      gl.readPixels(0, 0, Nx, Ny, gl.RG, gl.FLOAT, vel);
      for(let j=1;j<Ny-1;++j){
        for(let i=1;i<Nx-1;++i){
          const idx = j*Nx+i; if(mask[idx] < 0.5) continue; // inside obstacle
          const ml = mask[idx-1], mr = mask[idx+1], md = mask[idx-Nx], mu = mask[idx+Nx];
          // boundary if any neighbor is fluid
          if(ml>0.5 && mr>0.5 && md>0.5 && mu>0.5) continue;
          // normal pointing into fluid ~ -grad(mask)
          let nx = -0.5*(mr-ml); let ny = -0.5*(mu-md);
          const nlen = Math.hypot(nx, ny) || 1; nx/=nlen; ny/=nlen;
          const tx = ny, ty = -nx; // tangent
          const p = pr[idx];
          const dl = 0.5*(dx+dy); // boundary element length
          // pressure contribution
          Fx += -p * nx * dl; Fy += -p * ny * dl; edgeCount++;
          // shear contribution: approximate du_t/dn from fluid-side velocity one step outward
          const i2 = (idx)*2; const uf_x = vel[i2]; const uf_y = vel[i2+1];
          // normal spacing for one grid step
          const ds_n = Math.hypot(nx*dx, ny*dy) || ((dx+dy)*0.5);
          const ut = uf_x*tx + uf_y*ty; // tangential component at first cell
          const dudn = ut / ds_n; // wall velocity ~ 0 at solid
          const tau = this.nu * this.rho * dudn; // dynamic viscosity mu = nu * rho
          // body experiences opposite of shear on fluid
          Fx += -tau * tx * dl; Fy += -tau * ty * dl;
        }
      }
      // Reference area from obstacle geometry (sum areas)
      const Aref = Math.max(1e-6, this.obstacles.reduce((A,o)=>{
        if(o.kind==='circle') return A + Math.PI * o.r * o.r;
        if(o.kind==='rect') return A + o.w * o.h;
        if(o.kind==='poly'){
          let area = 0; const pts = o.points;
          for(let k=0;k<pts.length;k++){ const [x1,y1]=pts[k]; const [x2,y2]=pts[(k+1)%pts.length]; area += (x1*y2 - x2*y1); }
          return A + Math.abs(area)*0.5;
        }
        return A;
      }, 0));
      const dynP = 0.5*this.rho*this.Uin*this.Uin;
      const Cd_raw = Fx / Math.max(1e-6, dynP*Aref);
      const Cl_raw = Fy / Math.max(1e-6, dynP*Aref);
      // low-pass filter
      Cd = this.metrics.Cd*0.8 + Cd_raw*0.2;
      Cl = this.metrics.Cl*0.8 + Cl_raw*0.2;
      dP = this.metrics.dP*0.8 + dP*0.2;
    }
    // final metrics update
    this.metrics = {Re, Cd, Cl, dP}; this.onMetrics(this.metrics);
  }
  private loop(t:number){
    try {
      const dt = Math.min(0.05, (t - this.lastT)/1000) || this.dt; 
      this.lastT = t;
      
      if(this.running){
        this.step(this.dt);
      }
      
      // fps
      const fps = 1000/Math.max(1, (performance.now()-t));
      this.fpsSmoothed = this.fpsSmoothed ? this.fpsSmoothed*0.9 + fps*0.1 : fps;
      this.onFps(this.fpsSmoothed);
      this.computeMetrics();
      
      this.raf = requestAnimationFrame((tt)=>this.loop(tt));
    } catch (error) {
      this.log('ERROR in FluidEngine2D loop(): ' + error);
      console.error('FluidEngine2D loop() error:', error);
      // Don't continue the loop if there's an error
    }
  }

  private step(dt:number){
    const gl=this.gl; const invRes = [1/this.N, 1/Math.max(2, Math.floor(this.N * this.H / this.W))];

    // apply inlet and obstacles force field
    this.drawTo(this.texVelTmp, this.progForces, (gl)=>{
      this.bindTexture(0, this.texVel);
      gl.uniform1i(gl.getUniformLocation(this.progForces,'vel'),0);
      gl.uniform1f(gl.getUniformLocation(this.progForces,'Uin'), this.Uin);
  gl.uniform2f(gl.getUniformLocation(this.progForces,'px'), invRes[0], invRes[1]);
    });
    // swap
    [this.texVel, this.texVelTmp] = [this.texVelTmp, this.texVel];

    // viscosity
    this.drawTo(this.texVelTmp, this.progVis, (gl)=>{
      this.bindTexture(0, this.texVel);
      gl.uniform1i(gl.getUniformLocation(this.progVis,'vel'),0);
      gl.uniform1f(gl.getUniformLocation(this.progVis,'nu'), this.nu);
      gl.uniform2f(gl.getUniformLocation(this.progVis,'px'), invRes[0], invRes[1]);
    }); [this.texVel, this.texVelTmp] = [this.texVelTmp, this.texVel];

    // advection of velocity
    this.drawTo(this.texVelTmp, this.progAdv, (gl)=>{
      this.bindTexture(0, this.texVel);
      this.bindTexture(1, this.texVel);
      this.bindTexture(2, this.texMask);
      gl.uniform1i(gl.getUniformLocation(this.progAdv,'vel'),0);
      gl.uniform1i(gl.getUniformLocation(this.progAdv,'src'),1);
      gl.uniform1i(gl.getUniformLocation(this.progAdv,'mask'),2);
      gl.uniform1f(gl.getUniformLocation(this.progAdv,'dt'), dt);
      gl.uniform2f(gl.getUniformLocation(this.progAdv,'invRes'), 1/this.N, 1/Math.max(2, Math.floor(this.N * this.H / this.W)));
    }); [this.texVel, this.texVelTmp] = [this.texVelTmp, this.texVel];

    // advect dye
    this.drawTo(this.texDyeTmp, this.progAdv, (gl)=>{
      this.bindTexture(0, this.texVel);
      this.bindTexture(1, this.texDye);
      this.bindTexture(2, this.texMask);
      gl.uniform1i(gl.getUniformLocation(this.progAdv,'vel'),0);
      gl.uniform1i(gl.getUniformLocation(this.progAdv,'src'),1);
      gl.uniform1i(gl.getUniformLocation(this.progAdv,'mask'),2);
      gl.uniform1f(gl.getUniformLocation(this.progAdv,'dt'), dt);
      gl.uniform2f(gl.getUniformLocation(this.progAdv,'invRes'), 1/this.N, 1/Math.max(2, Math.floor(this.N * this.H / this.W)));
    }); [this.texDye, this.texDyeTmp] = [this.texDyeTmp, this.texDye];

    // divergence
    this.drawTo(this.texDiv, this.progDiv, (gl)=>{
      this.bindTexture(0, this.texVel);
      this.bindTexture(1, this.texMask);
      gl.uniform1i(gl.getUniformLocation(this.progDiv,'vel'),0);
      gl.uniform1i(gl.getUniformLocation(this.progDiv,'mask'),1);
      gl.uniform2f(gl.getUniformLocation(this.progDiv,'px'), invRes[0], invRes[1]);
    });

    // pressure Jacobi
    for(let i=0;i<40;i++){
      this.drawTo(this.texPrTmp, this.progJac, (gl)=>{
        this.bindTexture(0, this.texPr);
        this.bindTexture(1, this.texDiv);
        this.bindTexture(2, this.texMask);
        gl.uniform1i(gl.getUniformLocation(this.progJac,'p'),0);
        gl.uniform1i(gl.getUniformLocation(this.progJac,'div'),1);
        gl.uniform1i(gl.getUniformLocation(this.progJac,'mask'),2);
        gl.uniform2f(gl.getUniformLocation(this.progJac,'px'), invRes[0], invRes[1]);
      }); [this.texPr, this.texPrTmp] = [this.texPrTmp, this.texPr];
    }

    // projection
    this.drawTo(this.texVelTmp, this.progProj, (gl)=>{
      this.bindTexture(0, this.texVel);
      this.bindTexture(1, this.texPr);
      this.bindTexture(2, this.texMask);
      gl.uniform1i(gl.getUniformLocation(this.progProj,'vel'),0);
      gl.uniform1i(gl.getUniformLocation(this.progProj,'p'),1);
      gl.uniform1i(gl.getUniformLocation(this.progProj,'mask'),2);
      gl.uniform2f(gl.getUniformLocation(this.progProj,'px'), invRes[0], invRes[1]);
    }); [this.texVel, this.texVelTmp] = [this.texVelTmp, this.texVel];

    // compute vorticity from updated velocity
    this.drawTo(this.texVorticity, this.progVort, (gl)=>{
      this.bindTexture(0, this.texVel);
      gl.uniform1i(gl.getUniformLocation(this.progVort,'vel'),0);
      gl.uniform2f(gl.getUniformLocation(this.progVort,'px'), invRes[0], invRes[1]);
    });

    // optional: vorticity confinement to re-inject small-scale swirl
    if(this.vortConf > 1e-6){
      this.drawTo(this.texVelTmp, this.progVortForce, (gl)=>{
        this.bindTexture(0, this.texVel);
        this.bindTexture(1, this.texVorticity);
        this.bindTexture(2, this.texMask);
        gl.uniform1i(gl.getUniformLocation(this.progVortForce,'vel'),0);
        gl.uniform1i(gl.getUniformLocation(this.progVortForce,'vort'),1);
        gl.uniform1i(gl.getUniformLocation(this.progVortForce,'mask'),2);
        gl.uniform2f(gl.getUniformLocation(this.progVortForce,'px'), invRes[0], invRes[1]);
        gl.uniform1f(gl.getUniformLocation(this.progVortForce,'eps'), this.vortConf);
        gl.uniform1f(gl.getUniformLocation(this.progVortForce,'dt'), dt);
      }); [this.texVel, this.texVelTmp] = [this.texVelTmp, this.texVel];
    }

    // enforce no-slip near obstacles
    this.drawTo(this.texVelTmp, this.progNoSlip, (gl)=>{
      this.bindTexture(0, this.texVel);
      this.bindTexture(1, this.texMask);
      gl.uniform1i(gl.getUniformLocation(this.progNoSlip,'vel'),0);
      gl.uniform1i(gl.getUniformLocation(this.progNoSlip,'mask'),1);
      gl.uniform2f(gl.getUniformLocation(this.progNoSlip,'px'), invRes[0], invRes[1]);
    }); [this.texVel, this.texVelTmp] = [this.texVelTmp, this.texVel];

    // inlet dye injection and fading - use custom dye sources
    for (const source of this.dyeSources) {
      this.drawTo(this.texDye, this.progSplat, (gl)=>{
        this.bindTexture(0, this.texDye);
        gl.uniform1i(gl.getUniformLocation(this.progSplat,'src'),0);
        gl.uniform2f(gl.getUniformLocation(this.progSplat,'p'), source.x, source.y);
        gl.uniform1f(gl.getUniformLocation(this.progSplat,'r'), source.radius);
        gl.uniform3f(gl.getUniformLocation(this.progSplat,'color'), 
          source.color[0] * source.strength, 
          source.color[1] * source.strength, 
          source.color[2] * source.strength);
      });
      
      // Add velocity at dye source location for flow effect
      this.drawTo(this.texVel, this.progSplat, (gl)=>{
        this.bindTexture(0, this.texVel);
        gl.uniform1i(gl.getUniformLocation(this.progSplat,'src'),0);
        gl.uniform2f(gl.getUniformLocation(this.progSplat,'p'), source.x, source.y);
        gl.uniform1f(gl.getUniformLocation(this.progSplat,'r'), source.radius * 2);
        gl.uniform3f(gl.getUniformLocation(this.progSplat,'color'), 
          source.dirX * source.strength * 0.5, 
          source.dirY * source.strength * 0.5, 
          0);
      });
    }
    
    // Add default flow sources if no custom sources exist
    if (this.dyeSources.length === 0) {
      for(let i=0;i<3;i++){
        const py = 0.2 + 0.6*Math.random();
        this.drawTo(this.texDye, this.progSplat, (gl)=>{
          this.bindTexture(0, this.texDye);
          gl.uniform1i(gl.getUniformLocation(this.progSplat,'src'),0);
          gl.uniform2f(gl.getUniformLocation(this.progSplat,'p'), 0.02, py);
          gl.uniform1f(gl.getUniformLocation(this.progSplat,'r'), 0.01);
          gl.uniform3f(gl.getUniformLocation(this.progSplat,'color'), 0.2, 0.6, 1.5);
        });
      }
    }
    this.drawTo(this.texDyeTmp, this.progFade, (gl)=>{
      this.bindTexture(0, this.texDye);
      gl.uniform1i(gl.getUniformLocation(this.progFade,'t'),0);
      gl.uniform1f(gl.getUniformLocation(this.progFade,'k'), 0.997);
    }); [this.texDye, this.texDyeTmp] = [this.texDyeTmp, this.texDye];

  // final present to default framebuffer with speed colormap and mask overlay
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0,0,this.W,this.H);
    
    // Clear with black background
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    this.log(`Present: rendering ${this.overlayMode} overlay to canvas ${this.W}x${this.H}`);
    
    // Simple direct dye texture rendering
    if (this.overlayMode === 'dye') {
      gl.useProgram(this.progCopy);
      this.bindTexture(0, this.texDye);
      gl.uniform1i(gl.getUniformLocation(this.progCopy, 'src'), 0);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      this.log('Rendered dye texture directly with progCopy');
  // Still draw the debug overlay (obstacles, handles) on top of the dye view
  try { this.drawDebugOverlay(); } catch (e) { this.log('Error drawing debug overlay: '+e); }
  return;
    }
    
    // Compute LIC streamlines only if requested
    if(this.overlayMode==='streamlines'){
      this.drawTo(this.texStream, this.progLIC, (gl)=>{
        this.bindTexture(0, this.texVel);
        this.bindTexture(1, this.texNoise);
        gl.uniform1i(gl.getUniformLocation(this.progLIC,'vel'),0);
        gl.uniform1i(gl.getUniformLocation(this.progLIC,'noise'),1);
        gl.uniform2f(gl.getUniformLocation(this.progLIC,'px'), invRes[0], invRes[1]);
        gl.uniform1f(gl.getUniformLocation(this.progLIC,'licStep'), this.licStep);
        gl.uniform1f(gl.getUniformLocation(this.progLIC,'licContrast'), this.licContrast);
      });
    }

    // Present with selected overlay
    gl.useProgram(this.progPresent);
    this.bindTexture(0, this.texVel);
    this.bindTexture(1, this.texDye);
    this.bindTexture(2, this.texMask);
    this.bindTexture(3, this.texPressure);
    this.bindTexture(4, this.texVorticity);
    this.bindTexture(5, this.texStream);
    gl.uniform1i(gl.getUniformLocation(this.progPresent,'vel'),0);
    gl.uniform1i(gl.getUniformLocation(this.progPresent,'dye'),1);
    gl.uniform1i(gl.getUniformLocation(this.progPresent,'mask'),2);
    gl.uniform1i(gl.getUniformLocation(this.progPresent,'pressure'),3);
    gl.uniform1i(gl.getUniformLocation(this.progPresent,'vorticity'),4);
    gl.uniform1i(gl.getUniformLocation(this.progPresent,'stream'),5);
    
    const overlayModeInt = this.overlayMode==='velocity'?1:this.overlayMode==='pressure'?2:this.overlayMode==='vorticity'?3:this.overlayMode==='streamlines'?4:0;
    {
      const locOverlay = gl.getUniformLocation(this.progPresent,'overlayMode'); if(locOverlay) gl.uniform1i(locOverlay, overlayModeInt);
      const locZoom = gl.getUniformLocation(this.progPresent,'zoom'); if(locZoom) gl.uniform1f(locZoom, this.view.zoom);
      const locOfs = gl.getUniformLocation(this.progPresent,'ofs'); if(locOfs) gl.uniform2f(locOfs, this.view.ofs[0], this.view.ofs[1]);
      const locPScale = gl.getUniformLocation(this.progPresent,'pressureScale'); if(locPScale) gl.uniform1f(locPScale, this.pressureScale);
    }
    
    // FORCE mask visibility - add bright white obstacles regardless of mode (only if supported by shader)
    {
      const locMaskInt = gl.getUniformLocation(this.progPresent,'maskIntensity'); if(locMaskInt) gl.uniform1f(locMaskInt, 1.0);
    }
    
    // Log present details occasionally for debugging
    if(Math.random() < 0.01) {
      this.log(`Present: mode=${this.overlayMode}(${overlayModeInt}), zoom=${this.view.zoom.toFixed(2)}, ofs=[${this.view.ofs[0].toFixed(2)}, ${this.view.ofs[1].toFixed(2)}]`);
    }
    
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    
    // Draw debug overlay after main rendering
    this.drawDebugOverlay();
  }

  private installPointer(){
    const el = this.canvas; let dragging=false; let panning=false; let last:[number,number]=[0,0];
    const toUV=(e:PointerEvent):[number,number]=>{ const r=el.getBoundingClientRect(); const x=(e.clientX-r.left)/r.width; const y=(e.clientY-r.top)/r.height; return [x,y]; };

    // Make canvas focusable and ensure it captures events
    el.tabIndex = 0;
    el.style.outline = 'none';

    el.addEventListener('pointerdown', (e)=>{
      e.preventDefault();
      e.stopPropagation();
      // ensure canvas gets focus for consistent events
      el.focus();
      this.log(`pointerdown - tool: ${this.tool}, button: ${e.button}`);
      
      el.setPointerCapture(e.pointerId); 
      dragging=true; 
      last=toUV(e);
      panning = (e.button===2 || e.shiftKey || e.button===1);
      
      if(panning){
        this.log('Panning mode');
        // no-op here; handled in move
      }
      else if(this.tool==='draw'){
        // paint obstacle into mask (brush) and add dye for visual feedback
        const [ux,uy] = this.screenToDomain(last[0], last[1]);
        this.log(`Draw paint START @ ${ux.toFixed(3)}, ${uy.toFixed(3)}, UV: ${last[0].toFixed(3)}, ${last[1].toFixed(3)}`);
        this.drawTo(this.texMask, this.progPaint, (gl)=>{
          this.bindTexture(0, this.texMask);
          gl.uniform1i(gl.getUniformLocation(this.progPaint,'src'),0);
          gl.uniform2f(gl.getUniformLocation(this.progPaint,'p'), ux, uy);
          gl.uniform1f(gl.getUniformLocation(this.progPaint,'r'), 0.05);
        });
        // Create MASSIVE bright dye splat that's impossible to miss
        this.drawTo(this.texDye, this.progSplat, (gl)=>{
          this.bindTexture(0, this.texDye);
          gl.uniform1i(gl.getUniformLocation(this.progSplat,'src'),0);
          gl.uniform2f(gl.getUniformLocation(this.progSplat,'p'), ux, uy);
          gl.uniform1f(gl.getUniformLocation(this.progSplat,'r'), 0.1);
          gl.uniform3f(gl.getUniformLocation(this.progSplat,'color'), 10.0, 5.0, 2.0);
        });
      }
      else if(this.tool==='dye'){
        // Start placing a dye source - record the starting position
        const [ux,uy] = this.screenToDomain(last[0], last[1]);
        this.log(`Dye tool START @ ${ux.toFixed(3)}, ${uy.toFixed(3)}`);
        // Store start position for calculating direction on drag
        (this as any).dyeStart = [ux, uy];
      } else {
        // select obstacle near pointer
        const [x, y] = this.screenToDomain(last[0], last[1]);
        const id = this.obstacles.find(o => {
          if (o.kind === 'circle' || o.kind === 'rect') {
            return Math.hypot((o as any).x - x, (o as any).y - y) < 0.08;
          } else if (o.kind === 'poly') {
            // If any vertex is close
            return o.points.some(([px, py]) => Math.hypot(px - x, py - y) < 0.08);
          }
          return false;
        })?.id || null;
        this.selection={id, dragging: !!id, dx:0, dy:0, sizing: false};
        this.updateOverlay();
      }
    });
    el.addEventListener('pointermove', (e)=>{
      if(!dragging) return; 
      e.preventDefault();
      const [x,y]=toUV(e); 
      const dx=x-last[0], dy=-(y-last[1]); 
      last=[x,y];
      
      if(panning){
        this.view.ofs[0] -= dx/this.view.zoom; this.view.ofs[1] -= dy/this.view.zoom;
      }
      else if(this.tool==='draw'){
        // continuous painting into mask + dye
        const [ux,uy] = this.screenToDomain(x, y);
        this.log(`Draw drag @ ${ux.toFixed(3)}, ${uy.toFixed(3)}`);
        this.drawTo(this.texMask, this.progPaint, (gl)=>{
          this.bindTexture(0, this.texMask);
          gl.uniform1i(gl.getUniformLocation(this.progPaint,'src'),0);
          gl.uniform2f(gl.getUniformLocation(this.progPaint,'p'), ux, uy);
          gl.uniform1f(gl.getUniformLocation(this.progPaint,'r'), 0.04);
        });
        // Create bright continuous dye trail
        this.drawTo(this.texDye, this.progSplat, (gl)=>{
          this.bindTexture(0, this.texDye);
          gl.uniform1i(gl.getUniformLocation(this.progSplat,'src'),0);
          gl.uniform2f(gl.getUniformLocation(this.progSplat,'p'), ux, uy);
          gl.uniform1f(gl.getUniformLocation(this.progSplat,'r'), 0.06);
          gl.uniform3f(gl.getUniformLocation(this.progSplat,'color'), 8.0, 4.0, 1.0);
        });
      }
      else if(this.tool==='dye' && (this as any).dyeStart){
        // Show direction preview while dragging
        const [ux,uy] = this.screenToDomain(x, y);
        const [startX, startY] = (this as any).dyeStart;
        const dirX = ux - startX;
        const dirY = uy - startY;
        const dist = Math.hypot(dirX, dirY);
        this.log(`Dye direction preview: dist=${dist.toFixed(3)}, dir=[${dirX.toFixed(3)}, ${dirY.toFixed(3)}]`);
        // TODO: Visual preview could be added to debug overlay here
      } else if(this.selection.id){
        const o = this.obstacles.find(o=>o.id===this.selection.id);
        if (o) {
          if (o.kind === 'circle' || o.kind === 'rect') {
            (o as any).x += dx / this.view.zoom;
            (o as any).y += dy / this.view.zoom;
          } else if (o.kind === 'poly') {
            // Move all vertices
            o.points = o.points.map(([px, py]) => [px + dx / this.view.zoom, py + dy / this.view.zoom]);
          }
          this.syncObstacles();
        }
      }
    });
    el.addEventListener('pointerup', (e)=>{ 
      e.preventDefault();
      
      // Handle dye source creation before cleaning up
      if(this.tool==='dye' && (this as any).dyeStart && dragging){
        const [x,y]=toUV(e);
        const [ux,uy] = this.screenToDomain(x, y);
        const [startX, startY] = (this as any).dyeStart;
        const dirX = ux - startX;
        const dirY = uy - startY;
        const dist = Math.hypot(dirX, dirY);
        
        // Normalize direction or use default if no drag
        let normalizedDirX = 0.1; // default right
        let normalizedDirY = 0;
        if(dist > 0.01) { // Only use direction if there was significant drag
          normalizedDirX = dirX / dist * 0.2; // Scale to reasonable strength
          normalizedDirY = dirY / dist * 0.2;
        }
        
        // Create the dye source using the method parameters
        this.addDyeSource(startX, startY, normalizedDirX, normalizedDirY);
        this.log(`Created dye source at [${startX.toFixed(3)}, ${startY.toFixed(3)}] with direction [${normalizedDirX.toFixed(3)}, ${normalizedDirY.toFixed(3)}]`);
        
        // Clean up
        delete (this as any).dyeStart;
      }
      
      dragging=false; 
      panning=false; 
      el.releasePointerCapture(e.pointerId); 
      this.selection.id=null; 
      this.log(`pointerup - tool was: ${this.tool}`);
    });
    el.addEventListener('wheel', (e)=>{ e.preventDefault(); const s = Math.exp(-e.deltaY*0.001); const prev = this.view.zoom; this.view.zoom = Math.min(3, Math.max(0.5, this.view.zoom*s));
      const r=el.getBoundingClientRect(); const x=(e.clientX-r.left)/r.width; const y=1-((e.clientY-r.top)/r.height);
      this.view.ofs[0] = x - (x - this.view.ofs[0])*(prev/this.view.zoom);
      this.view.ofs[1] = y - (y - this.view.ofs[1])*(prev/this.view.zoom);
    }, {passive:false});
    el.addEventListener('contextmenu', (e)=> e.preventDefault());
  }

  // Convert domain uv (0..1) to screen pixel (CSS pixels)
  private domainToScreen(x:number, y:number): [number, number] {
    const u = ((x - this.view.ofs[0] - 0.5) * this.view.zoom) + 0.5;
    const v = 1 - (((y - this.view.ofs[1] - 0.5) * this.view.zoom) + 0.5);
    const cssW = this.canvas.clientWidth || this.W/this.dpr; // fallback
    const cssH = this.canvas.clientHeight || this.H/this.dpr;
    const result: [number, number] = [u * cssW, v * cssH];
    
    // Debug log for rectangle transforms
    if (Math.random() < 0.1) { // Only log 10% of the time to avoid spam
      this.log(`DEBUG domainToScreen: domain(${x.toFixed(3)}, ${y.toFixed(3)}) -> UV(${u.toFixed(3)}, ${v.toFixed(3)}) -> screen(${result[0].toFixed(1)}, ${result[1].toFixed(1)})`);
      this.log(`DEBUG: view.zoom=${this.view.zoom}, view.ofs=[${this.view.ofs[0]}, ${this.view.ofs[1]}], cssW=${cssW}, cssH=${cssH}`);
    }
    
    return result;
  }

  // Draw debug overlay: grid and obstacle outlines
  private drawDebugOverlay(){
    const ctx = this.dbgCtx; if(!ctx || !this.dbgCanvas) {
      this.log('DEBUG: drawDebugOverlay early return - no ctx or canvas');
      return;
    }
    this.log(`DEBUG: Drawing debug overlay with ${this.obstacles.length} obstacles`);
    this.log(`DEBUG: Canvas dimensions: ${this.dbgCanvas.width}x${this.dbgCanvas.height}, DPR: ${this.dpr}`);
    
    const cssW = this.dbgCanvas.width / this.dpr; // in CSS pixels
    const cssH = this.dbgCanvas.height / this.dpr;
    ctx.clearRect(0,0,cssW,cssH);
    
    // Grid
    ctx.save();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(80,100,130,0.25)';
    const step = 64; // px
    for(let x=0; x<=cssW; x+=step){ ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,cssH); ctx.stroke(); }
    for(let y=0; y<=cssH; y+=step){ ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(cssW,y); ctx.stroke(); }
    ctx.restore();
    
    // Obstacles
    ctx.save();
    ctx.strokeStyle = '#48e3b7';
    ctx.fillStyle = 'rgba(72,227,183,0.08)';
    ctx.lineWidth = 2;
    
    this.log(`DEBUG: About to draw ${this.obstacles.length} obstacles`);
    for(const o of this.obstacles){
      this.log(`DEBUG: Processing obstacle: ${o.kind} at (${(o as any).x}, ${(o as any).y})`);
      if(o.kind==='circle' || o.kind==='rect'){
        const [sx, sy] = this.domainToScreen((o as any).x, (o as any).y);
        this.log(`DEBUG: Screen coords for ${o.kind}: (${sx}, ${sy})`);
        if(o.kind==='circle'){
          // Approx radius in pixels: r (domain) scaled by zoom and canvas size (assume square scale by width)
          const [sx2, ] = this.domainToScreen((o as any).x + o.r, (o as any).y);
          const rPx = Math.abs(sx2 - sx);
          this.log(`DEBUG: Circle radius in pixels: ${rPx}`);
          ctx.beginPath(); ctx.arc(sx, sy, rPx, 0, Math.PI*2); ctx.fill(); ctx.stroke();
        } else {
          const hw = (o.w||0)/2, hh = (o.h||0)/2;
          this.log(`DEBUG: Rectangle half-dims: hw=${hw}, hh=${hh}`);
          const corners: [number,number][] = [
            this.domainToScreen((o as any).x-hw, (o as any).y-hh),
            this.domainToScreen((o as any).x+hw, (o as any).y-hh),
            this.domainToScreen((o as any).x+hw, (o as any).y+hh),
            this.domainToScreen((o as any).x-hw, (o as any).y+hh),
          ];
          this.log(`DEBUG: Rectangle corners: ${JSON.stringify(corners)}`);
          ctx.beginPath(); ctx.moveTo(corners[0][0], corners[0][1]);
          for(let i=1;i<corners.length;i++){ ctx.lineTo(corners[i][0], corners[i][1]); }
          ctx.closePath(); ctx.fill(); ctx.stroke();
        }
      } else if(o.kind==='poly'){
        const pts = o.points.map(([x,y])=>this.domainToScreen(x,y));
        this.log(`DEBUG: Polygon points: ${JSON.stringify(pts)}`);
        if(pts.length){ ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); for(let i=1;i<pts.length;i++){ ctx.lineTo(pts[i][0], pts[i][1]); } ctx.closePath(); ctx.fill(); ctx.stroke(); }
      }
    }
    ctx.restore();
    this.log(`DEBUG: Finished drawing debug overlay`);
  try{ this.updateDyeGizmos(); }catch{}
  }

  // helper to convert screen uv to domain uv with current view
  private screenToDomain(u:number,v:number):[number,number]{ const du = (u-0.5)/this.view.zoom + 0.5 + this.view.ofs[0]; const dv = (1-v-0.5)/this.view.zoom + 0.5 + this.view.ofs[1]; return [du, dv]; }

  // ===== Overlay handles for scaling =====
  private initOverlay(){
    // Polygon vertex handles
    for (let i = 0; i < 16; ++i) {
      const v = document.createElement('div');
      v.className = 'polyhandle';
      v.style.display = 'none';
      v.style.pointerEvents = 'auto';
      v.title = 'Drag to move vertex. Shift+Click to remove. Double-click to add.';
      this.overlay.appendChild(v);
      this.polyHandles.push(v);
      let dragging = false;
      let last: [number, number] = [0, 0];
      const toUV = (e: PointerEvent) => { const r = this.canvas.getBoundingClientRect(); return [(e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height] as [number, number]; };
      v.addEventListener('pointerdown', (e) => {
        if (e.shiftKey) { // Remove vertex
          const o = this.obstacles.find(o => o.id === this.selection.id);
          if (o && o.kind === 'poly' && o.points.length > 3) {
            o.points.splice(i, 1); this.syncObstacles(); this.updateOverlay();
          }
          e.stopPropagation(); e.preventDefault(); return;
        }
        dragging = true; (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); last = toUV(e); e.stopPropagation(); e.preventDefault();
      });
      v.addEventListener('pointermove', (e) => {
        if (!dragging) return;
        const o = this.obstacles.find(o => o.id === this.selection.id);
        if (o && o.kind === 'poly') {
          const [x, y] = toUV(e);
          if (i < o.points.length) {
            o.points[i][0] = x;
            o.points[i][1] = y;
            this.syncObstacles(); this.updateOverlay();
          }
        }
        e.stopPropagation(); e.preventDefault();
      });
      v.addEventListener('pointerup', (e) => { dragging = false; (e.currentTarget as HTMLElement).releasePointerCapture?.((e as any).pointerId); });
      v.addEventListener('dblclick', (ev) => {
        // Add vertex after this one
        const o = this.obstacles.find(o => o.id === this.selection.id);
        if (o && o.kind === 'poly') {
          // Convert MouseEvent to PointerEvent for toUV
          let e = ev as PointerEvent;
          if (!(e instanceof PointerEvent)) {
            // Fallback: synthesize PointerEvent from MouseEvent
            e = new PointerEvent('pointerdown', ev);
          }
          const [x, y] = toUV(e);
          o.points.splice(i + 1, 0, [x, y]);
          this.syncObstacles(); this.updateOverlay();
        }
        ev.stopPropagation(); ev.preventDefault();
      });
    }
    const h = document.createElement('div'); h.className='handle'; h.style.display='none'; h.style.pointerEvents='auto';
    this.overlay.appendChild(h); this.handle = h;
    let sizing=false; let last:[number,number]=[0,0];
    const toUV=(e:PointerEvent)=>{ const r=this.canvas.getBoundingClientRect(); return [(e.clientX-r.left)/r.width, (e.clientY-r.top)/r.height] as [number,number]; };
    h.addEventListener('pointerdown', (e)=>{ sizing=true; (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); last=toUV(e); e.stopPropagation(); e.preventDefault(); });
    const onMove=(e:PointerEvent)=>{
      if(!sizing || !this.selection.id) return; const [x,y]=toUV(e); const dx=(x-last[0]); const dy=-(y-last[1]); last=[x,y];
      const o = this.obstacles.find(o=>o.id===this.selection.id); if(!o) return;
      if(o.kind==='circle'){ o.r = Math.max(0.01, o.r + (Math.abs(dx)+Math.abs(dy))*0.5); }
      else if(o.kind==='rect'){ o.w = Math.max(0.02, o.w + dx*2); o.h = Math.max(0.02, o.h + dy*2); }
      this.syncObstacles(); this.updateOverlay();
      e.stopPropagation(); e.preventDefault();
    };
    const onUp=(e:PointerEvent)=>{ sizing=false; (e.currentTarget as HTMLElement).releasePointerCapture?.((e as any).pointerId); };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  }

  private updateOverlay(){
    // Guard against calls before initOverlay() completes
    if (!this.handle || !this.polyHandles) {
      return;
    }
    
    if (!this.selection.id) {
      this.handle.style.display = 'none';
      this.polyHandles.forEach(h => h && h.style && (h.style.display = 'none'));
      return;
    }
    const o = this.obstacles.find(o => o.id === this.selection.id); if (!o) { this.handle.style.display = 'none'; this.polyHandles.forEach(h => h && h.style && (h.style.display = 'none')); return; }
    const r = this.canvas.getBoundingClientRect();
    if (o.kind === 'circle') {
      const u = o.x + o.r, v = o.y - o.r;
      const hs = this.handle.style; hs.display = 'block';
      hs.left = `${(u * r.width) - 6}px`; hs.top = `${((1 - v) * r.height) - 6}px`;
      this.polyHandles.forEach(h => h && h.style && (h.style.display = 'none'));
    } else if (o.kind === 'rect') {
      const u = o.x + o.w * 0.5, v = o.y - o.h * 0.5;
      const hs = this.handle.style; hs.display = 'block';
      hs.left = `${(u * r.width) - 6}px`; hs.top = `${((1 - v) * r.height) - 6}px`;
      this.polyHandles.forEach(h => h && h.style && (h.style.display = 'none'));
    } else if (o.kind === 'poly') {
      this.handle.style.display = 'none';
      o.points.forEach(([u, v], i) => {
        const h = this.polyHandles[i];
        if (!h || !h.style) return;
        h.style.display = 'block';
        h.style.left = `${(u * r.width) - 6}px`;
        h.style.top = `${((1 - v) * r.height) - 6}px`;
      });
      for (let i = o.points.length; i < this.polyHandles.length; ++i) {
        const h = this.polyHandles[i];
        if (h && h.style) h.style.display = 'none';
      }
    }
  }

  // Transform & edit utilities
  rotateSelected(delta:number){ if(!this.selection.id) return; const o=this.obstacles.find(o=>o.id===this.selection.id); if(!o) return; if(o.kind==='rect'){ o.rot = (o.rot||0)+delta; this.syncObstacles(); this.updateOverlay(); } }
  addCircleAt(x:number,y:number,r:number){ this.obstacles.push({id:uid(), kind:'circle', x, y, w:r*2, h:r*2, r, rot:0}); this.syncObstacles(); }
  addRectAt(x:number,y:number,w:number,h:number, rot=0){ this.obstacles.push({id:uid(), kind:'rect', x, y, w, h, r:0, rot}); this.syncObstacles(); }
  saveScene(){ return JSON.stringify({ obstacles:this.obstacles, params:{N:this.N, dt:this.dt, nu:this.nu, rho:this.rho, Uin:this.Uin, pressureScale:this.pressureScale, licStep:this.licStep, licContrast:this.licContrast, vortConf:this.vortConf} }); }
  loadScene(json:string){ try{ const s = JSON.parse(json); if(s.params){ this.N=s.params.N??this.N; this.dt=s.params.dt??this.dt; this.nu=s.params.nu??this.nu; this.rho=s.params.rho??this.rho; this.Uin=s.params.Uin??this.Uin; this.rebuild(); } if(Array.isArray(s.obstacles)){
    // Poly compatibility: ensure points are arrays
    this.obstacles = s.obstacles.map((o:any) => o.kind === 'poly' && o.points && typeof o.points[0] === 'number'
      ? { ...o, points: chunk(o.points, 2) } : o);
    // Restore optional tunables
    if(s.params){
      if(s.params.pressureScale!=null) this.setPressureScale(s.params.pressureScale);
      if(s.params.licStep!=null) this.setLicStep(s.params.licStep);
      if(s.params.licContrast!=null) this.setLicContrast(s.params.licContrast);
      if(s.params.vortConf!=null) this.setVorticityConfinement(s.params.vortConf);
    }
    this.syncObstacles();
  } } catch{} function chunk(arr:any[], n:number){ return Array.from({length:Math.ceil(arr.length/n)},(_,i)=>arr.slice(i*n,i*n+n)); }
  }
}
