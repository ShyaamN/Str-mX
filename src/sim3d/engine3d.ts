import * as THREE from 'three';
// yo
export class Engine3D{
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
  private raf = 0; private last=0; private fps=0; private dpr=1;
  private isPanning=false; private lastPos = new THREE.Vector2(); private target = new THREE.Vector3(); private dist=3;
  private grid: THREE.GridHelper;
  // store bound handlers so we can remove them on dispose
  private _onWheel?: (e: WheelEvent)=>void;
  private _onPointerDown?: (e: PointerEvent)=>void;
  private _onPointerMove?: (e: PointerEvent)=>void;
  private _onPointerUp?: (e: PointerEvent)=>void;
  constructor(private canvas: HTMLCanvasElement, private onFps:(fps:number)=>void){
    this.renderer = new THREE.WebGLRenderer({canvas, antialias:true});
    this.renderer.setClearColor(0x0a0f16, 1);
  this.camera.position.set(0,0,this.dist);
    const g = new THREE.SphereGeometry(0.6, 48, 36);
    const m = new THREE.MeshStandardMaterial({color:0x2fa4ff, metalness:0.2, roughness:0.3});
    const mesh = new THREE.Mesh(g,m); this.scene.add(mesh);
  // Grid helper (XZ plane)
  this.grid = new THREE.GridHelper(10, 20, 0x335577, 0x223344);
  (this.grid.material as THREE.Material).transparent = true as any;
  (this.grid.material as any).opacity = 0.25;
  this.grid.position.y = -0.6; // sit just below the demo sphere
  this.scene.add(this.grid);
    const light = new THREE.DirectionalLight(0xffffff, 1.2); light.position.set(2,3,4); this.scene.add(light);
    this.scene.add(new THREE.AmbientLight(0xffffff,0.3));
    // store mesh for simple animation
    (this as any)._mesh = mesh;
  }
  resize(w:number,h:number,dpr:number){ this.dpr=dpr; this.renderer.setPixelRatio(dpr); this.renderer.setSize(w/dpr,h/dpr,false); this.camera.aspect=w/h; this.camera.updateProjectionMatrix(); }
  start(){
    // simple orbit/pan/zoom
    const el = this.canvas; const v2 = new THREE.Vector2();
    this._onWheel = (e: WheelEvent)=>{ e.preventDefault(); const s = Math.exp(-e.deltaY*0.001); this.dist = THREE.MathUtils.clamp(this.dist*s, 1, 10); const dir = new THREE.Vector3().subVectors(this.camera.position, this.target).normalize(); this.camera.position.copy(this.target.clone().add(dir.multiplyScalar(this.dist))); };
    this._onPointerDown = (e: PointerEvent)=>{ el.setPointerCapture(e.pointerId); this.isPanning = e.button===1 || e.shiftKey; this.lastPos.set(e.clientX,e.clientY); };
    this._onPointerMove = (e: PointerEvent)=>{ if(e.buttons===0) return; const dx=e.clientX-this.lastPos.x, dy=e.clientY-this.lastPos.y; this.lastPos.set(e.clientX,e.clientY);
      if(this.isPanning){ const panScale = this.dist*0.002; const right = new THREE.Vector3().subVectors(this.camera.getWorldDirection(new THREE.Vector3()).cross(this.camera.up).negate(), new THREE.Vector3(0,0,0)); this.target.addScaledVector(right, dx*panScale); this.target.addScaledVector(this.camera.up, -dy*panScale); this.camera.position.addScaledVector(right, dx*panScale); this.camera.position.addScaledVector(this.camera.up, -dy*panScale); }
      else { const rotSpeed=0.005; const off = new THREE.Vector3().subVectors(this.camera.position, this.target); const sph = new THREE.Spherical().setFromVector3(off); sph.theta -= dx*rotSpeed; sph.phi = THREE.MathUtils.clamp(sph.phi - dy*rotSpeed, 0.1, Math.PI-0.1); off.setFromSpherical(sph); this.camera.position.copy(this.target.clone().add(off)); this.camera.lookAt(this.target); }
    };
    this._onPointerUp = (e: PointerEvent)=>{ this.isPanning=false; el.releasePointerCapture(e.pointerId); };
    el.addEventListener('wheel', this._onWheel, {passive:false});
    el.addEventListener('pointerdown', this._onPointerDown);
    el.addEventListener('pointermove', this._onPointerMove);
    el.addEventListener('pointerup', this._onPointerUp);

    this.last=performance.now();
    const loop=(t:number)=>{ const dt=t-this.last; this.last=t; const mesh:(THREE.Mesh)=(this as any)._mesh; mesh.rotation.y += 0.001*dt; mesh.rotation.x += 0.0006*dt; this.renderer.render(this.scene,this.camera); this.fps=this.fps?this.fps*0.9+1000/dt*0.1:1000/dt; this.onFps(this.fps); this.raf=requestAnimationFrame(loop); };
    this.raf=requestAnimationFrame(loop);
  } 
  // --- Public camera helpers for nav cube ---
  resetView(){
    this.target.set(0,0,0);
    this.dist = 3;
    this.camera.position.set(0,0,this.dist);
    this.camera.lookAt(this.target);
  }
  setView(name: 'front'|'back'|'left'|'right'|'top'|'bottom'){
    const d = this.dist;
    if(name==='front') this.camera.position.set(0,0,d);
    if(name==='back') this.camera.position.set(0,0,-d);
    if(name==='left') this.camera.position.set(-d,0,0);
    if(name==='right') this.camera.position.set(d,0,0);
    if(name==='top') this.camera.position.set(0,d,0);
    if(name==='bottom') this.camera.position.set(0,-d,0);
    this.camera.lookAt(this.target.set(0,0,0));
  }
  orbitBy(dx:number, dy:number){
    const rotSpeed=0.005;
    const off = new THREE.Vector3().subVectors(this.camera.position, this.target);
    const sph = new THREE.Spherical().setFromVector3(off);
    sph.theta -= dx*rotSpeed;
    sph.phi = THREE.MathUtils.clamp(sph.phi - dy*rotSpeed, 0.1, Math.PI-0.1);
    off.setFromSpherical(sph);
    this.camera.position.copy(this.target.clone().add(off));
    this.camera.lookAt(this.target);
  }
  getSpherical(){
    const off = new THREE.Vector3().subVectors(this.camera.position, this.target);
    const sph = new THREE.Spherical().setFromVector3(off);
    return { theta: sph.theta, phi: sph.phi };
  }
  getCameraQuat(){
    const q = this.camera.quaternion;
    return { x: q.x, y: q.y, z: q.z, w: q.w };
  }
  setGridVisible(v:boolean){ if(this.grid) this.grid.visible = v; }
  dispose(){
    cancelAnimationFrame(this.raf);
    // remove listeners to avoid interfering with 2D mode
    const el = this.canvas;
    if(this._onWheel) el.removeEventListener('wheel', this._onWheel as any);
    if(this._onPointerDown) el.removeEventListener('pointerdown', this._onPointerDown as any);
    if(this._onPointerMove) el.removeEventListener('pointermove', this._onPointerMove as any);
    if(this._onPointerUp) el.removeEventListener('pointerup', this._onPointerUp as any);
    this._onWheel = this._onPointerDown = this._onPointerMove = this._onPointerUp = undefined;
    this.renderer.dispose();
  }
}
