import * as THREE from 'three';

export type ViewName = 'front'|'back'|'left'|'right'|'top'|'bottom';

export class NavCube3D {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(50, 1, 0.1, 10);
  private cube: THREE.Mesh;
  private raf = 0;
  private dragging = false; private last = new THREE.Vector2();
  constructor(private host: HTMLElement, private onSnap:(v:ViewName)=>void, private onOrbit:(dx:number,dy:number)=>void){
    const canvas = document.createElement('canvas');
    canvas.id = 'nav3d';
    canvas.style.width = '70px'; canvas.style.height = '70px';
    canvas.width = 140; canvas.height = 140; // 2x for crisp
    canvas.style.position = 'absolute'; canvas.style.top = '8px'; canvas.style.right = '8px';
    canvas.style.zIndex = '30'; canvas.style.pointerEvents = 'auto';
    this.host.appendChild(canvas);
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    this.renderer.setPixelRatio(1);
    this.camera.position.set(0,0,2.5);
    const g = new THREE.BoxGeometry(1,1,1);
    const m = new THREE.MeshStandardMaterial({ color: 0x2f72ff, roughness: 0.4, metalness: 0.1 });
    this.cube = new THREE.Mesh(g, m);
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(g), new THREE.LineBasicMaterial({ color: 0xffffff }));
    this.cube.add(edges);
    const light = new THREE.DirectionalLight(0xffffff, 1.2); light.position.set(2,3,4); this.scene.add(light);
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    this.scene.add(this.cube);
    // input
    canvas.addEventListener('pointerdown', (e)=>{ (e.currentTarget as HTMLElement).setPointerCapture((e as any).pointerId); this.dragging=true; this.last.set(e.clientX,e.clientY); });
    canvas.addEventListener('pointermove', (e)=>{ if(!this.dragging) return; const dx=e.clientX-this.last.x, dy=e.clientY-this.last.y; this.last.set(e.clientX,e.clientY); this.onOrbit(dx,dy); });
    canvas.addEventListener('pointerup', (e)=>{ this.dragging=false; (e.currentTarget as HTMLElement).releasePointerCapture?.((e as any).pointerId); });
    canvas.addEventListener('click', (e)=>{
      const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const x = (e.clientX - r.left)/r.width, y = (e.clientY - r.top)/r.height;
      if(y < 0.33) this.onSnap('top');
      else if(x < 0.33) this.onSnap('left');
      else if(x > 0.66) this.onSnap('right');
      else this.onSnap('front');
    });
    // loop
    const loop = ()=>{ this.renderer.setSize(canvas.width, canvas.height, false); this.renderer.render(this.scene, this.camera); this.raf = requestAnimationFrame(loop); };
    this.raf = requestAnimationFrame(loop);
  }
  setOrientation(q:{x:number;y:number;z:number;w:number}){
    // Use the inverse of the camera quaternion so the cube rotates with the scene correctly
    this.cube.quaternion.set(q.x, q.y, q.z, q.w).invert();
  }
  dispose(){ cancelAnimationFrame(this.raf); const el = this.renderer.domElement; el.parentElement?.removeChild(el); this.renderer.dispose(); }
}
