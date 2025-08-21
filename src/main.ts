// --- Annotation Copy/Paste ---
let copiedAnnotation: any = null;
document.addEventListener('keydown', (e) => {
  if (!(e.ctrlKey || e.metaKey)) return;
  const overlay = document.getElementById('overlay');
  if (!overlay) return;
  const active = document.activeElement as HTMLElement;
  // Only operate if an annotation is focused or selected
  if (active && active.classList && active.classList.contains('annotation')) {
    if (e.key.toLowerCase() === 'c') {
      // Copy annotation data
      copiedAnnotation = {
        type: active.classList.contains('label') ? 'label' : active.classList.contains('arrow') ? 'arrow' : 'text',
        text: active.textContent,
        left: active.style.left,
        top: active.style.top,
        width: active.style.width,
        height: active.style.height,
        color: active.style.color,
        fontSize: active.style.fontSize,
        background: active.style.background,
        borderRadius: active.style.borderRadius,
        padding: active.style.padding,
        locked: active.getAttribute('data-locked') === '1'
      };
      e.preventDefault();
    }
  }
  // Paste: always allowed if something is copied
  if (e.key.toLowerCase() === 'v' && copiedAnnotation) {
    // Create new annotation div
    const ann = document.createElement('div');
    ann.className = 'annotation ' + copiedAnnotation.type;
    ann.contentEditable = copiedAnnotation.type !== 'arrow' && !copiedAnnotation.locked ? 'true' : 'false';
    ann.style.position = 'absolute';
    // Offset pasted annotation by 24px
    const left = parseInt(copiedAnnotation.left || '0', 10) + 24;
    const top = parseInt(copiedAnnotation.top || '0', 10) + 24;
    ann.style.left = left + 'px';
    ann.style.top = top + 'px';
    ann.style.minWidth = '60px';
    ann.style.minHeight = '24px';
    ann.style.color = copiedAnnotation.color || '#fff';
    ann.style.background = copiedAnnotation.background || (copiedAnnotation.type==='arrow' ? 'none' : 'rgba(20,30,50,0.7)');
    ann.style.borderRadius = copiedAnnotation.borderRadius || '6px';
    ann.style.padding = copiedAnnotation.padding || (copiedAnnotation.type==='arrow' ? '0' : '4px 10px');
    ann.style.fontSize = copiedAnnotation.fontSize || '18px';
    ann.style.cursor = 'move';
    ann.style.userSelect = 'text';
    ann.style.zIndex = '10';
    ann.draggable = !copiedAnnotation.locked;
    if (copiedAnnotation.locked) ann.setAttribute('data-locked','1');
    if(copiedAnnotation.type==='label') ann.textContent = copiedAnnotation.text || 'Label';
    if(copiedAnnotation.type==='text') ann.textContent = copiedAnnotation.text || 'Text';
    if(copiedAnnotation.type==='arrow') {
      ann.innerHTML = '<svg width="60" height="24"><line x1="8" y1="12" x2="52" y2="12" stroke="#fff" stroke-width="3" marker-end="url(#arrowhead)"/><defs><marker id="arrowhead" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L8,4 L0,8 L2,4 Z" fill="#fff"/></marker></defs></svg>';
      ann.contentEditable = 'false';
      ann.style.pointerEvents = 'auto';
      ann.style.width = '60px';
      ann.style.height = '24px';
      ann.style.background = 'none';
      ann.style.padding = '0';
    }
    // Drag logic
    let offsetX=0, offsetY=0;
    ann.addEventListener('dragstart', e=>{
      offsetX = e.offsetX; offsetY = e.offsetY;
    });
    ann.addEventListener('dragend', e=>{
      ann.style.left = (e.pageX - overlay.offsetLeft - offsetX) + 'px';
      ann.style.top = (e.pageY - overlay.offsetTop - offsetY) + 'px';
    });
    ann.addEventListener('dblclick', ()=> ann.remove());
    // Show style bar on click (if not locked)
    ann.addEventListener('click', (ev)=>{
      ev.stopPropagation();
      if(ann.getAttribute('data-locked')!=='1') showStyleBar(ann);
    });
    document.addEventListener('click', (ev)=>{
      if(!ann.contains(ev.target as Node)) hideStyleBar();
    }, {capture:true, once:true});
    overlay.appendChild(ann);
    if(copiedAnnotation.type!=='arrow') ann.focus();
    e.preventDefault();
  }
});
// --- Annotation Style Toolbar ---
let styleBar: HTMLDivElement|null = null;
function showStyleBar(target: HTMLElement) {
  if (!styleBar) {
    styleBar = document.createElement('div');
    styleBar.id = 'annotationStyleBar';
    styleBar.style.position = 'fixed';
    styleBar.style.background = '#222b';
    styleBar.style.borderRadius = '8px';
    styleBar.style.padding = '6px 12px';
    styleBar.style.display = 'flex';
    styleBar.style.gap = '8px';
    styleBar.style.zIndex = '2000';
    styleBar.style.boxShadow = '0 2px 12px #0008';
    styleBar.innerHTML = `
          <label style="color:#fff;font-size:13px;">Color <input type="color" id="annColor" style="vertical-align:middle;width:28px;height:22px;border:none;background:none;"></label>
          <label style="color:#fff;font-size:13px;">Size <input type="number" id="annSize" min="10" max="48" value="18" style="width:40px;"></label>
          <button id="annLock" style="background:none;border:none;color:#fff;font-size:16px;cursor:pointer;" title="Lock/Unlock">🔒</button>
          <button id="annDelete" style="background:none;border:none;color:#f55;font-size:16px;cursor:pointer;" title="Delete">🗑️</button>
          <button id="annClose" style="background:none;border:none;color:#fff;font-size:18px;cursor:pointer;">×</button>
        `;
    document.body.appendChild(styleBar);
  }
  // Position bar above annotation
  const rect = target.getBoundingClientRect();
  styleBar.style.left = rect.left + 'px';
  styleBar.style.top = (rect.top - 38) + 'px';
  styleBar.style.display = 'flex';
  // Set current color/size
  const colorInput = styleBar.querySelector('#annColor') as HTMLInputElement;
  const sizeInput = styleBar.querySelector('#annSize') as HTMLInputElement;
    colorInput.value = rgb2hex(target.style.color || '#ffffff');
    sizeInput.value = parseInt(target.style.fontSize || '18', 10).toString();
    colorInput.oninput = () => { target.style.color = colorInput.value; };
    sizeInput.oninput = () => { target.style.fontSize = sizeInput.value + 'px'; };
    (styleBar.querySelector('#annClose') as HTMLButtonElement)!.onclick = ()=>{ styleBar!.style.display = 'none'; };
    // Lock/Unlock logic
    const lockBtn = styleBar.querySelector('#annLock') as HTMLButtonElement;
    function updateLockIcon() {
      lockBtn.textContent = target.getAttribute('data-locked')==='1' ? '🔓' : '🔒';
      lockBtn.title = target.getAttribute('data-locked')==='1' ? 'Unlock' : 'Lock';
    }
    updateLockIcon();
    lockBtn.onclick = ()=>{
      const locked = target.getAttribute('data-locked')==='1';
      if(locked) {
        target.setAttribute('data-locked','0');
        target.contentEditable = target.classList.contains('arrow') ? 'false' : 'true';
        target.style.pointerEvents = 'auto';
        target.draggable = true;
      } else {
        target.setAttribute('data-locked','1');
        target.contentEditable = 'false';
        target.style.pointerEvents = 'none';
        target.draggable = false;
      }
      updateLockIcon();
      styleBar!.style.display = 'none';
    };
    // Delete logic
    (styleBar.querySelector('#annDelete') as HTMLButtonElement).onclick = ()=>{
      target.remove();
      styleBar!.style.display = 'none';
    };
}
function hideStyleBar() { if(styleBar) styleBar.style.display = 'none'; }
function rgb2hex(rgb:string) {
  if(rgb.startsWith('#')) return rgb;
  const m = rgb.match(/\d+/g); if(!m) return '#ffffff';
  return '#' + m.slice(0,3).map(x=>(+x).toString(16).padStart(2,'0')).join('');
}

// Annotation overlay logic
(window as any).addLabel = function() {
  createAnnotation('label');
};
(window as any).addArrow = function() {
  createAnnotation('arrow');
};
(window as any).addText = function() {
  createAnnotation('text');
};

function createAnnotation(type: 'label'|'arrow'|'text') {
  const overlay = document.getElementById('overlay');
  if (!overlay) return;
  const ann = document.createElement('div');
  ann.className = 'annotation ' + type;
  ann.contentEditable = type !== 'arrow' ? 'true' : 'false';
  ann.style.position = 'absolute';
  ann.style.left = '40%';
  ann.style.top = '40%';
  ann.style.minWidth = '60px';
  ann.style.minHeight = '24px';
  ann.style.color = '#fff';
  ann.style.background = type==='arrow' ? 'none' : 'rgba(20,30,50,0.7)';
  ann.style.borderRadius = '6px';
  ann.style.padding = type==='arrow' ? '0' : '4px 10px';
  ann.style.fontSize = '18px';
  ann.style.cursor = 'move';
  ann.style.userSelect = 'text';
  ann.style.zIndex = '10';
  ann.draggable = true;
  if(type==='label') ann.textContent = 'Label';
  if(type==='text') ann.textContent = 'Text';
  if(type==='arrow') {
    ann.innerHTML = '<svg width="60" height="24"><line x1="8" y1="12" x2="52" y2="12" stroke="#fff" stroke-width="3" marker-end="url(#arrowhead)"/><defs><marker id="arrowhead" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L8,4 L0,8 L2,4 Z" fill="#fff"/></marker></defs></svg>';
    ann.contentEditable = 'false';
    ann.style.pointerEvents = 'auto';
    ann.style.width = '60px';
    ann.style.height = '24px';
    ann.style.background = 'none';
    ann.style.padding = '0';
  }
  // Drag logic
  let offsetX=0, offsetY=0;
  ann.addEventListener('dragstart', e=>{
    offsetX = e.offsetX; offsetY = e.offsetY;
  });
  ann.addEventListener('dragend', e=>{
    ann.style.left = (e.pageX - overlay.offsetLeft - offsetX) + 'px';
    ann.style.top = (e.pageY - overlay.offsetTop - offsetY) + 'px';
  });
  // Remove on double click
  ann.addEventListener('dblclick', ()=> ann.remove());
  overlay.appendChild(ann);
  if(type!=='arrow') ann.focus();

  // Show style bar on click (if not locked)
  ann.addEventListener('click', (e)=>{
    e.stopPropagation();
    if(ann.getAttribute('data-locked')!=='1') showStyleBar(ann);
  });
  // Hide style bar when clicking elsewhere
  document.addEventListener('click', (e)=>{
    if(!ann.contains(e.target as Node)) hideStyleBar();
  }, {capture:true, once:true});
}
// Help overlay function for UI
(window as any).showHelp = function() {
  (window as any).appLog?.('Help opened');
  let help = document.getElementById('helpOverlay');
  if (help) { help.style.display = 'block'; return; }
  help = document.createElement('div');
  help.id = 'helpOverlay';
  help.style.position = 'fixed';
  help.style.inset = '0';
  help.style.background = 'rgba(10,16,25,0.96)';
  help.style.zIndex = '1000';
  help.style.color = '#dce6f2';
  help.style.fontSize = '16px';
  help.style.overflowY = 'auto';
  help.style.padding = '48px 0 0 0';
  help.innerHTML = `
    <div style="max-width:600px;margin:0 auto;background:#101a29;border-radius:16px;padding:32px 32px 24px 32px;box-shadow:0 8px 32px #0008;position:relative;">
      <button id="closeHelp" style="position:absolute;top:16px;right:16px;font-size:20px;background:none;border:none;color:#fff;cursor:pointer;">&times;</button>
      <h2 style="margin-top:0">FluidSim Studio Help & Shortcuts</h2>
      <ul style="line-height:1.7">
        <li><b>2D/3D Switch:</b> Toggle in sidebar</li>
        <li><b>Draw/Select:</b> Use Draw/Select buttons or D/S keys</li>
        <li><b>Add/Move/Scale/Rotate:</b> Use sidebar or drag handles</li>
        <li><b>Polygon Edit:</b> Drag/add (dbl-click)/remove (shift+click) vertices</li>
        <li><b>Undo/Redo:</b> Ctrl+Z / Ctrl+Y</li>
        <li><b>Pan/Zoom:</b> Right/middle/shift drag, mouse wheel</li>
        <li><b>Export:</b> Image (PNG), Video (WebM), Save/Load scene</li>
        <li><b>Shortcuts:</b> D = Draw, S = Select, R = Reset, Ctrl+Z/Y = Undo/Redo</li>
        <li><b>3D:</b> Orbit (left drag), Pan (shift/middle), Zoom (wheel)</li>
      </ul>
      <div style="margin-top:18px;color:#8da2b5;font-size:14px;">Tip: You can save/load scenes, export images/videos, and edit obstacles interactively. For more, see the project README.</div>
    </div>
  `;
  document.body.appendChild(help);
  document.getElementById('closeHelp')!.onclick = ()=>{ help!.style.display = 'none'; };
};
// Export GIF/video function for UI
(window as any).recordGif = function() {
  (window as any).appLog?.('Recording started');
  const canvas = document.getElementById('glcanvas') as HTMLCanvasElement;
  if (!canvas) return;
  if (typeof MediaRecorder !== 'undefined') {
    // Use MediaRecorder for WebM/MP4
    const stream = (canvas as any).captureStream ? (canvas as any).captureStream(30) : null;
    if (!stream) { alert('Recording not supported in this browser.'); return; }
    const rec = new MediaRecorder(stream, { mimeType: 'video/webm' });
    const chunks: Blob[] = [];
    rec.ondataavailable = e => { if (e.data.size > 0) chunks.push(e.data); };
    rec.onstop = () => {
  (window as any).appLog?.('Recording stopped and saved');
      const blob = new Blob(chunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'fluidsim_recording.webm';
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      setTimeout(()=>URL.revokeObjectURL(url), 500);
    };
    rec.start();
    alert('Recording started. Click OK to stop.');
    rec.stop();
  } else {
    alert('MediaRecorder not supported. For GIF export, use a screen recorder or try Chrome/Edge.');
  }
};
// Export image function for UI
(window as any).exportImage = function() {
  (window as any).appLog?.('Export image');
  const canvas = document.getElementById('glcanvas') as HTMLCanvasElement;
  if (!canvas) return;
  const link = document.createElement('a');
  link.download = 'fluidsim_view.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
};
import { setupUI } from './ui';
import { FluidEngine2D, type Metrics } from './sim2d/engine2d';
import { Engine3D } from './sim3d/engine3d';
import { NavCube3D, type ViewName } from './sim3d/navcube';

const app = document.getElementById('app')!;
app.innerHTML = `
<div id="shell">
  <header>
    <div class="brand"><div class="logo"></div><h1>FluidSim Studio</h1></div>
    <div class="badge" id="solverBadge">Navier–Stokes (Stable Fluids)</div>
    <div style="flex:1"></div>
    <div class="badge" id="fps">0 fps</div>
  </header>
  <aside id="sidebar"></aside>
  <main id="viewport">
    <canvas id="glcanvas"></canvas>
    <div id="overlay"></div>
  </main>
  <section id="bottom">
    <div class="panel" id="metrics">
      <h3>Metrics</h3>
      <div class="stats">
        <div class="stat"><div class="label">Reynolds (Re)</div><div class="value" id="re">—</div></div>
        <div class="stat"><div class="label">Drag Coef (Cd)</div><div class="value" id="cd">—</div></div>
        <div class="stat"><div class="label">Lift Coef (Cl)</div><div class="value" id="cl">—</div></div>
        <div class="stat"><div class="label">Pressure Drop</div><div class="value" id="dp">—</div></div>
      </div>
    </div>
    <div class="panel" id="log">
      <h3>Console</h3>
      <div id="console" style="font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;white-space:pre-wrap;opacity:.9"></div>
    </div>
  </section>
</div>`;

let canvas = document.getElementById('glcanvas') as HTMLCanvasElement;
const sidebar = document.getElementById('sidebar')!;
const consoleEl = document.getElementById('console')!;
const overlay = document.getElementById('overlay')!;

// Legend overlay
const legend = document.createElement('canvas');
legend.id = 'legend';
legend.width = 220; legend.height = 42;
legend.style.position = 'absolute';
legend.style.bottom = '12px'; legend.style.right = '12px';
legend.style.background = '#0b1220cc';
legend.style.border = '1px solid #1f2a3a';
legend.style.borderRadius = '8px';
legend.style.padding = '6px 8px';
legend.style.zIndex = '15';
overlay.appendChild(legend);

// Navigation cube widget (container)
const nav = document.createElement('div');
nav.id = 'navCube';
nav.style.position = 'absolute'; nav.style.top = '10px'; nav.style.right = '10px';
nav.style.width = '70px'; nav.style.height = '70px';
nav.style.background = '#0b1220cc'; nav.style.border = '1px solid #1f2a3a';
nav.style.borderRadius = '8px'; nav.style.display = 'grid'; nav.style.gridTemplateRows = '1fr auto';
nav.style.zIndex = '25'; nav.style.userSelect = 'none';
nav.style.pointerEvents = 'auto'; // ensure clickable even though overlay has pointer-events:none
nav.innerHTML = '<canvas id="navCanvas" width="70" height="50"></canvas><div style="display:flex;gap:6px;justify-content:center;padding:4px"><button id="homeView" class="btn ghost" style="padding:4px 8px">Home</button><label style="display:flex;align-items:center;gap:6px;color:#8da2b5;font-size:12px"><input id="gridToggle" type="checkbox" checked/> Grid</label></div>';
overlay.appendChild(nav);

type Spherical = { theta:number; phi:number };
let navLoopId:number|undefined;
function stopNavLoop(){ if(navLoopId) { cancelAnimationFrame(navLoopId); navLoopId = undefined; } }
function drawNavCube(mode:'2d'|'3d', sph?: Spherical){
  const c = document.getElementById('navCanvas') as HTMLCanvasElement; if(!c) return; const ctx = c.getContext('2d')!;
  ctx.clearRect(0,0,c.width,c.height);
  if(mode==='3d'){
  // draw a simple 3D-looking cube with labeled faces
    const cx=35, cy=26; const s=14;
    // faces
    ctx.lineWidth = 1.2; ctx.strokeStyle = '#4ea0ff';
    // top
    ctx.fillStyle = '#173152';
    ctx.beginPath(); ctx.moveTo(cx-s,cy-s); ctx.lineTo(cx+s,cy-s); ctx.lineTo(cx+s+6,cy-s-6); ctx.lineTo(cx-s+6,cy-s-6); ctx.closePath(); ctx.fill(); ctx.stroke();
    // front
    ctx.fillStyle = '#132239';
    ctx.beginPath(); ctx.rect(cx-s,cy-s, 2*s, 2*s); ctx.fill(); ctx.stroke();
    // side
    ctx.fillStyle = '#112034';
    ctx.beginPath(); ctx.moveTo(cx+s,cy-s); ctx.lineTo(cx+s+6,cy-s-6); ctx.lineTo(cx+s+6,cy+s-6); ctx.lineTo(cx+s,cy+s); ctx.closePath(); ctx.fill(); ctx.stroke();
    // label and facing highlight based on camera spherical angles
    ctx.fillStyle='#8da2b5'; ctx.font='10px ui-monospace, monospace'; ctx.textAlign='center'; ctx.fillText('3D', cx, 11);
    if(sph){
      // convert spherical to camera position vector (Three.js convention)
      const phi = sph.phi, theta = sph.theta;
      const vx = Math.sin(phi) * Math.sin(theta);
      const vy = Math.cos(phi);
      const vz = Math.sin(phi) * Math.cos(theta);
      // camera at (vx,vy,vz) looking to origin; determine dominant axis to show label
      const ax = Math.abs(vx), ay = Math.abs(vy), az = Math.abs(vz);
      let face = 'FRONT'; let color = '#4ea0ff';
      if(az >= ax && az >= ay) face = vz >= 0 ? 'FRONT' : 'BACK';
      else if(ax >= ay) face = vx >= 0 ? 'RIGHT' : 'LEFT';
      else face = vy >= 0 ? 'TOP' : 'BOTTOM';
      // highlight text badge
      const w=46, h=12, rx=cx - w/2, ry=5;
      ctx.fillStyle = '#0f1e34'; ctx.strokeStyle = color; ctx.lineWidth=1; ctx.beginPath(); ctx.roundRect(rx, ry, w, h, 4); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#bcd1e6'; ctx.font='9px ui-monospace, monospace'; ctx.fillText(face, cx, ry+9.5);
    }
  } else {
    // 2D square
    ctx.strokeStyle = '#48e3b7'; ctx.fillStyle = '#122a23'; ctx.lineWidth = 1.5;
    ctx.strokeRect(15,10,40,30); ctx.fillRect(15,10,40,30);
    ctx.fillStyle='#8da2b5'; ctx.font='10px ui-monospace, monospace'; ctx.textAlign='center'; ctx.fillText('2D', 35, 11);
  }
}
drawNavCube('3d');
// home view
document.getElementById('homeView')!.addEventListener('click', ()=>{
  if(engine3d){
    // reset 3D camera to home via helper
    (engine3d as any).resetView?.();
  }
  if(engine2d){ (engine2d as any).resetView?.(); }
});
// grid toggle (3D only)
const gridToggle = document.getElementById('gridToggle') as HTMLInputElement;
gridToggle?.addEventListener('change', ()=>{ if(engine3d) (engine3d as any).setGridVisible?.(gridToggle.checked); });
// nav canvas interaction: face clicks set canonical views; drag to orbit
const navCanvas = document.getElementById('navCanvas') as HTMLCanvasElement;
let navDragging=false; let navLast:[number,number]=[0,0];
navCanvas.addEventListener('pointerdown', (e)=>{ navDragging=true; (e.currentTarget as HTMLElement).setPointerCapture((e as any).pointerId); navLast=[e.clientX,e.clientY]; });
navCanvas.addEventListener('pointermove', (e)=>{
  if(!navDragging) return; if(!engine3d) return; const dx=e.clientX-navLast[0], dy=e.clientY-navLast[1]; navLast=[e.clientX,e.clientY];
  (engine3d as any).orbitBy?.(dx, dy);
});
navCanvas.addEventListener('pointerup', (e)=>{ navDragging=false; (e.currentTarget as HTMLElement).releasePointerCapture?.((e as any).pointerId); });
navCanvas.addEventListener('click', (e)=>{
  if(!engine3d) return;
  const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
  const x = (e.clientX - r.left)/r.width, y = (e.clientY - r.top)/r.height;
  // simple regions: top strip -> top, left third -> left, right third -> right, center -> front
  if(y < 0.35) (engine3d as any).setView?.('top');
  else if(x < 0.33) (engine3d as any).setView?.('left');
  else if(x > 0.66) (engine3d as any).setView?.('right');
  else (engine3d as any).setView?.('front');
});

function turbo(x:number){
  x=Math.max(0,Math.min(1,x));
  const r = 34.61 + x*(1172.33 + x*(-10793.56 + x*(33300.12 + x*(-38394.49 + x*14825.05))));
  const g = 23.31 + x*(557.33 + x*(1225.33 + x*(-3574.96 + x*(3481.96 - x*1108.04))));
  const b = 27.2 + x*(321.21 + x*(-1525.77 + x*(2815.57 + x*(-1904.75 + x*348.02))));
  const R = Math.round((r/255));
  const G = Math.round((g/255));
  const B = Math.round((b/255));
  return `rgb(${R}, ${G}, ${B})`;
}
function lerp(a:number,b:number,t:number){ return a + (b-a)*t; }
(window as any).updateLegend = function(mode?: string){
  const ctx = legend.getContext('2d')!; const w=legend.width, h=legend.height;
  ctx.clearRect(0,0,w,h);
  const label = (txt:string,x:number,y:number)=>{ ctx.fillStyle = '#dce6f2'; ctx.font = '11px ui-monospace, monospace'; ctx.textAlign = 'center'; ctx.fillText(txt,x,y); };
  const barX=10, barY=18, barW=w-20, barH=10;
  // Background
  ctx.fillStyle = '#0b1220'; ctx.fillRect(0,0,w,h);
  // Determine current overlay
  const sel = document.querySelector('#overlayVis') as HTMLSelectElement | null;
  const m = mode || (sel?.value || 'dye');
  // Draw gradient
  for(let i=0;i<barW;i++){
    const t=i/(barW-1);
    let color='white';
    if(m==='velocity') color = turbo(t);
    else if(m==='pressure'){ // diverging blue-red with white mid
      const p = lerp(-1,1,t);
      const r = 0.5+0.5*p, g = 0.5-0.5*p, b = 1.0-Math.abs(p);
      color = `rgb(${Math.round(r*255)},${Math.round(g*255)},${Math.round(b*255)})`;
    } else if(m==='vorticity'){
      const v = lerp(-1,1,t); const r=0.5+0.5*v, g=0.5-0.5*v, b=1.0-Math.abs(v); color = `rgb(${Math.round(r*255)},${Math.round(g*255)},${Math.round(b*255)})`;
    } else if(m==='streamlines'){ const g = Math.round(t*255); color = `rgb(${g},${g},${g})`; }
    ctx.fillStyle = color; ctx.fillRect(barX+i, barY, 1, barH);
  }
  // Ticks
  ctx.fillStyle = '#dce6f2'; ctx.font = '12px ui-monospace, monospace'; ctx.textAlign='left';
  let t0='0', t1='1'; let title='';
  if(m==='velocity'){ t0='0'; t1='|v|'; title='Velocity'; }
  else if(m==='pressure'){ 
    const pScaleEl = document.getElementById('pScale') as HTMLInputElement | null;
    const s = pScaleEl ? parseFloat(pScaleEl.value) : 1;
    t0 = `-${s.toFixed(1)}`; t1 = `+${s.toFixed(1)}`; title='Pressure'; 
  }
  else if(m==='vorticity'){ t0='-1'; t1='+1'; title='Vorticity'; }
  else if(m==='streamlines'){ t0='0'; t1='1'; title='Streamlines'; }
  ctx.fillText(title, barX, 12);
  label(t0, barX, barY+barH+14);
  label(t1, barX+barW, barY+barH+14);
  legend.style.display = (m==='dye') ? 'none' : 'block';
};

let mode: '2d' | '3d' = '3d';
let engine2d: FluidEngine2D | null = null;
let engine3d: Engine3D | null = null;
let nav3d: NavCube3D | null = null;

function log(msg: string){
  consoleEl.textContent = (consoleEl.textContent ? consoleEl.textContent + "\n" : "") + msg;
}
(window as any).appLog = log;

function resize(){
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const rect = canvas.getBoundingClientRect();
  const width = Math.floor(rect.width * dpr);
  const height = Math.floor(rect.height * dpr);
  
  log(`Resize called: rect=${rect.width}x${rect.height}, dpr=${dpr}, canvas size=${width}x${height}`);
  
  canvas.width = width;
  canvas.height = height;
  
  if(engine2d) {
    log(`Calling engine2d.resize(${width}, ${height}, ${dpr})`);
    engine2d.resize(width, height, dpr);
  }
  if(engine3d) {
    log(`Calling engine3d.resize(${width}, ${height}, ${dpr})`);
    engine3d.resize(width, height, dpr);
  }
}
window.addEventListener('resize', resize);

function recreateCanvas(){
  log('recreateCanvas() called');
  // Replace the canvas to reset any existing WebGL context and listeners
  const vp = document.getElementById('viewport')!;
  const old = document.getElementById('glcanvas');
  if(old){ 
    log('Removing old canvas');
    vp.removeChild(old); 
  }
  const c = document.createElement('canvas'); 
  c.id = 'glcanvas';
  c.style.position = 'absolute'; 
  c.style.inset = '0'; 
  c.style.width = '100%'; 
  c.style.height = '100%';
  // Ensure canvas sits below overlay widgets
  (c.style as any).zIndex = '1';
  vp.insertBefore(c, document.getElementById('overlay'));
  canvas = c as HTMLCanvasElement;
  log(`New canvas created with id=${canvas.id}`);
}

function start2D(){
  log('Switching to 2D mode...');
  
  try {
    engine3d?.dispose(); engine3d = null;
    stopNavLoop();
    if(nav3d){ nav3d.dispose(); nav3d = null; }
    
    recreateCanvas();
    
    // Wait a frame for layout to be computed
    requestAnimationFrame(() => {
      try {
        // Ensure canvas has dimensions before creating engine
        const rect = canvas.getBoundingClientRect();
        log(`Canvas dimensions: ${rect.width}x${rect.height}`);
        
        if (rect.width === 0 || rect.height === 0) {
          // Force canvas dimensions if layout hasn't computed yet
          const viewport = document.getElementById('viewport');
          if (viewport) {
            const vpRect = viewport.getBoundingClientRect();
            if (vpRect.width > 0 && vpRect.height > 0) {
              canvas.style.width = vpRect.width + 'px';
              canvas.style.height = vpRect.height + 'px';
              log('Fixed canvas dimensions from viewport');
            } else {
              canvas.style.width = '800px';
              canvas.style.height = '600px';
              log('Used fallback canvas dimensions');
            }
          }
        }
        
        engine2d = new FluidEngine2D(canvas, overlay, log, (fps: number)=>{
          const el = document.getElementById('fps'); if(el) el.textContent = `${fps.toFixed(0)} fps`;
        }, (m: Metrics)=>updateMetrics(m));
        
        engine2d.start();
        resize();
        engine2d.addCircle();
        (engine2d as any).setTool?.('draw');
        (engine2d as any).resetView?.();
        
        try{
          const sel = document.querySelector('#overlayVis') as HTMLSelectElement | null;
          if(sel){ sel.value = 'dye'; }
          (engine2d as any).setOverlayMode?.('dye');
        } catch(e) {
          log('Error setting overlay mode: ' + e);
        }
        
        // Update UI
        const drawBtn = document.querySelector('#draw'); const selectBtn = document.querySelector('#select');
        if(drawBtn && selectBtn){ drawBtn.classList.add('active'); selectBtn.classList.remove('active'); }
        (window as any).updateLegend?.();
        drawNavCube('2d');
        
        // Add mode badge
        let badge = document.getElementById('modeBadge');
        if(!badge){
          badge = document.createElement('div');
          badge.id = 'modeBadge';
          badge.style.position = 'absolute';
          badge.style.top = '10px';
          badge.style.left = '10px';
          badge.style.zIndex = '99';
          badge.style.background = '#0b1220cc';
          badge.style.border = '1px solid #1f2a3a';
          badge.style.borderRadius = '8px';
          badge.style.padding = '4px 8px';
          badge.style.color = '#8da2b5';
          overlay.appendChild(badge);
        }
        badge.textContent = '2D MODE';
        
        log('Entered 2D mode');
        document.dispatchEvent(new CustomEvent('fluidsim-2d-ready'));
        
      } catch(error) {
        log('ERROR initializing 2D engine: ' + error);
        console.error('2D engine initialization error:', error);
      }
    });
  } catch(error) {
    log('ERROR in start2D(): ' + error);
    console.error('start2D() error:', error);
  }
}

function start3D(){
  engine2d?.dispose(); engine2d = null;
  recreateCanvas();
  
  engine3d = new Engine3D(canvas, (fps: number)=>{
    const el = document.getElementById('fps'); if(el) el.textContent = `${fps.toFixed(0)} fps`;
  });
  engine3d.start();
  resize();
  drawNavCube('3d');
  log('Entered 3D mode');
  let badge = document.getElementById('modeBadge');
  if(!badge){
    badge = document.createElement('div');
    badge.id = 'modeBadge';
    badge.style.position = 'absolute';
    badge.style.top = '10px';
    badge.style.left = '10px';
    badge.style.zIndex = '99';
    badge.style.background = '#0b1220cc';
    badge.style.border = '1px solid #1f2a3a';
    badge.style.borderRadius = '8px';
    badge.style.padding = '4px 8px';
    badge.style.color = '#8da2b5';
    overlay.appendChild(badge);
  }
  badge.textContent = '3D MODE';
  // begin live nav cube updates following camera orientation
  const update = ()=>{
    if(!engine3d) return; const sph = (engine3d as any).getSpherical?.(); drawNavCube('3d', sph); navLoopId = requestAnimationFrame(update);
  };
  stopNavLoop(); navLoopId = requestAnimationFrame(update);
  // create 3D nav cube and wire controls
  if(nav3d){ nav3d.dispose(); nav3d = null; }
  nav3d = new NavCube3D(overlay, (view: ViewName)=>{ (engine3d as any).setView?.(view); }, (dx:number,dy:number)=>{ (engine3d as any).orbitBy?.(dx,dy); });
  // sync 3D nav cube orientation from camera quaternion
  const sync3d = ()=>{
    if(!engine3d || !nav3d) return; const q = (engine3d as any).getCameraQuat?.(); if(q) nav3d.setOrientation(q); requestAnimationFrame(sync3d);
  };
  requestAnimationFrame(sync3d);
}

function updateMetrics(m: {Re:number; Cd:number; Cl:number; dP:number}){
  (document.getElementById('re')!).textContent = m.Re.toFixed(0);
  (document.getElementById('cd')!).textContent = m.Cd.toFixed(3);
  (document.getElementById('cl')!).textContent = m.Cl.toFixed(3);
  (document.getElementById('dp')!).textContent = m.dP.toFixed(2);
}

setupUI(sidebar, {
  onMode:(m: '2d' | '3d')=>{ 
    log(`Switching to ${m.toUpperCase()} mode`);
    mode=m; 
    if(m==='2d') {
      start2D(); 
    } else {
      start3D(); 
    }
  },
  get2d:()=>engine2d,
});

// --- Annotation Save/Load ---
// Patch Save button to include annotations
const saveBtn = document.getElementById('saveScene');
if(saveBtn) saveBtn.addEventListener('click', ()=>{
  const overlay = document.getElementById('overlay');
  const anns = Array.from(overlay?.querySelectorAll('.annotation')||[]).map((el:any)=>({
    type: el.classList.contains('label') ? 'label' : el.classList.contains('arrow') ? 'arrow' : 'text',
    text: el.textContent,
    left: el.style.left,
    top: el.style.top,
    width: el.style.width,
    height: el.style.height
  }));
  // Save fluid scene
  let scene = null;
  if(engine2d && (engine2d as any).saveScene) scene = JSON.parse((engine2d as any).saveScene());
  const data = JSON.stringify({ ...scene, annotations: anns });
  const blob = new Blob([data], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'fluidsim_scene.json';
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  setTimeout(()=>URL.revokeObjectURL(url), 500);
});

// Patch Load button to restore annotations
const loadBtn = document.getElementById('loadScene');
const loadFile = document.getElementById('loadFile') as HTMLInputElement;
if(loadBtn && loadFile) {
  loadBtn.addEventListener('click', ()=>{ loadFile.click(); });
  loadFile.addEventListener('change', (ev:any)=>{
    const file = ev.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = ()=>{
      const json = reader.result as string;
      let s = null;
      try { s = JSON.parse(json); } catch(e){}
      if(engine2d && (engine2d as any).loadScene && s && s.obstacles) (engine2d as any).loadScene(json);
      // Remove old annotations
      const overlay = document.getElementById('overlay');
      if(overlay) Array.from(overlay.querySelectorAll('.annotation')).forEach(el=>el.remove());
      // Restore annotations
      if(s && Array.isArray(s.annotations) && overlay) {
        for(const ann of s.annotations) {
          const el = document.createElement('div');
          el.className = 'annotation ' + ann.type;
          el.contentEditable = ann.type !== 'arrow' ? 'true' : 'false';
          el.style.position = 'absolute';
          el.style.left = ann.left;
          el.style.top = ann.top;
          el.style.width = ann.width;
          el.style.height = ann.height;
          el.style.color = '#fff';
          el.style.background = ann.type==='arrow' ? 'none' : 'rgba(20,30,50,0.7)';
          el.style.borderRadius = '6px';
          el.style.padding = ann.type==='arrow' ? '0' : '4px 10px';
          el.style.fontSize = '18px';
          el.style.cursor = 'move';
          el.style.userSelect = 'text';
          el.style.zIndex = '10';
          el.draggable = true;
          if(ann.type==='arrow') {
            el.innerHTML = '<svg width="60" height="24"><line x1="8" y1="12" x2="52" y2="12" stroke="#fff" stroke-width="3" marker-end="url(#arrowhead)"/><defs><marker id="arrowhead" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L8,4 L0,8 L2,4 Z" fill="#fff"/></marker></defs></svg>';
            el.contentEditable = 'false';
            el.style.pointerEvents = 'auto';
            el.style.background = 'none';
            el.style.padding = '0';
          } else {
            el.textContent = ann.text;
          }
          // Drag logic
          let offsetX=0, offsetY=0;
          el.addEventListener('dragstart', e=>{ offsetX = e.offsetX; offsetY = e.offsetY; });
          el.addEventListener('dragend', e=>{ el.style.left = (e.pageX - overlay.offsetLeft - offsetX) + 'px'; el.style.top = (e.pageY - overlay.offsetTop - offsetY) + 'px'; });
          el.addEventListener('dblclick', ()=> el.remove());
          overlay.appendChild(el);
          if(ann.type!=='arrow') el.focus();
        }
      }
    };
    reader.readAsText(file);
  });
}

start3D();
