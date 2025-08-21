// Minimal interface used by UI to interact with the 2D engine
export type FluidEngine2D = {
  setInletVelocity(v:number): void;
  setViscosity(v:number): void;
  setDensity(v:number): void;
  setDt(v:number): void;
  setResolution(N:number): void;
  reset(): void;
  pause(): void;
  resume(): void;
  setTool(t: 'draw'|'select'): void;
  addCircle(): void;
  addRect(): void;
  clearObstacles(): void;
} | null;

export type UIHooks = { onMode: (m: '2d'|'3d')=>void; get2d: ()=> FluidEngine2D };

export function setupUI(root: HTMLElement, hooks: UIHooks){
  // Minimal CSS for collapsible arrows (inject if not present)
  if(!document.getElementById('collapsible-style')) {
    const style = document.createElement('style');
    style.id = 'collapsible-style';
    style.textContent = `
      .collapsible .group-header { cursor: pointer; user-select: none; display: flex; align-items: center; gap: 6px; font-size: 1.1em; padding: 2px 0; }
      .collapsible .arrow { font-size: 1.1em; transition: transform 0.15s; }
      .collapsible .group-content { transition: max-height 0.2s; }
      .collapsible:not(.open) .group-content { display: none; }
      .collapsible.open .arrow { transform: rotate(0deg); }
      .collapsible:not(.open) .arrow { transform: rotate(0deg); }
    `;
    document.head.appendChild(style);
  }
  // Build sidebar HTML
  root.innerHTML = `
  <div class="group collapsible open" data-group="help">
    <div class="group-header"><span class="arrow">▼</span> <span>Help</span></div>
    <div class="group-content"><div class="row"><button id="helpBtn" class="btn ghost">Help / Tutorial</button></div></div>
  </div>
  <div class="group collapsible open" data-group="workspace">
    <div class="group-header"><span class="arrow">▼</span> <span>Workspace</span></div>
    <div class="group-content">
      <div class="switch">
        <span class="opt">2D</span>
        <input id="modeSwitch" type="checkbox"/>
        <span class="opt">3D</span>
      </div>
      <div class="row"><span class="chip">Units: SI (m, s)</span></div>
      <div class="row"><button id="resetAll" class="btn danger">Reset All</button></div>
    </div>
  </div>
  <div class="group collapsible open" data-group="flow">
    <div class="group-header"><span class="arrow">▼</span> <span>Flow</span></div>
    <div class="group-content">
      <div class="row"><label>Inlet Velocity (m/s)</label><input id="vel" type="range" min="0" max="10" step="0.1" value="2"/><span id="velv" class="chip">2.0</span></div>
      <div class="row"><label>Viscosity ν (m²/s)</label><input id="nu" type="range" min="1e-6" max="5e-4" step="1e-6" value="1.5e-5"/><span id="nuv" class="chip">1.5e-5</span></div>
      <div class="row"><label>Density ρ (kg/m³)</label><input id="rho" type="range" min="0.5" max="2.0" step="0.01" value="1.0"/><span id="rhov" class="chip">1.00</span></div>
      <div class="row"><label>Overlay</label>
        <select id="overlayVis">
          <option value="dye">Dye</option>
          <option value="velocity">Velocity</option>
          <option value="pressure">Pressure</option>
          <option value="vorticity">Vorticity</option>
          <option value="streamlines">Streamlines</option>
        </select>
      </div>
      <div class="row"><label>Pressure Contrast</label><input id="pScale" type="range" min="0.2" max="4" step="0.1" value="1"/><span id="pScalev" class="chip">1.0x</span></div>
      <div class="row"><label>Streamlines Length</label><input id="licStep" type="range" min="0.5" max="3.0" step="0.1" value="1.5"/><span id="licStepv" class="chip">1.5px</span></div>
      <div class="row"><label>Streamlines Contrast</label><input id="licContrast" type="range" min="0.5" max="3.0" step="0.1" value="1.0"/><span id="licContrastv" class="chip">1.0x</span></div>
    </div>
  </div>
  <div class="group collapsible open" data-group="solver">
    <div class="group-header"><span class="arrow">▼</span> <span>Solver</span></div>
    <div class="group-content">
      <div class="row"><label>Resolution</label><select id="res">
        <option value="128">128</option>
        <option value="192">192</option>
        <option value="256" selected>256</option>
        <option value="384">384</option>
        <option value="512">512</option>
      </select></div>
      <div class="row"><label>Time step (s)</label><input id="dt" type="range" min="0.002" max="0.033" step="0.001" value="0.016"/><span id="dtv" class="chip">0.016</span></div>
      <div class="row"><button id="reset" class="btn">Reset</button><button id="pause" class="btn ghost">Pause</button></div>
    </div>
  </div>
  <div class="group collapsible open" data-group="obstacles">
    <div class="group-header"><span class="arrow">▼</span> <span>Obstacles (2D)</span></div>
    <div class="group-content">
      <div class="row"><button id="draw" class="btn">Draw</button><button id="select" class="btn ghost">Select/Move</button></div>
      <div class="row"><button id="circle" class="btn">Add Circle</button><button id="rect" class="btn ghost">Add Rect</button><button id="poly" class="btn ghost">Add Polygon</button></div>
      <div class="row"><button id="undo" class="btn ghost">Undo</button><button id="redo" class="btn ghost">Redo</button></div>
      <div class="row"><button id="snap" class="btn ghost">Snap to Grid</button><button id="align" class="btn ghost">Align Center</button><button id="dupe" class="btn ghost">Duplicate</button></div>
      <div class="row"><button id="rotateL" class="btn ghost">⟲ Rotate–</button><button id="rotateR" class="btn ghost">⟳ Rotate+</button></div>
      <div class="row"><button id="clear" class="btn ghost">Clear</button></div>
    </div>
  </div>
  <div class="group collapsible" data-group="annotations">
    <div class="group-header"><span class="arrow">▶</span> <span>Annotations</span></div>
    <div class="group-content" style="display:none">
      <div class="row">
        <button id="addLabel" class="btn">Label</button>
        <button id="addArrow" class="btn ghost">Arrow</button>
        <button id="addText" class="btn ghost">Text</button>
      </div>
    </div>
  </div>
  <div class="group collapsible" data-group="scene">
    <div class="group-header"><span class="arrow">▶</span> <span>Presets & Scene</span></div>
    <div class="group-content" style="display:none">
      <div class="row">
        <select id="preset">
          <option value="">-- Presets --</option>
          <option value="circle">Single Circle</option>
          <option value="rect">Single Rect</option>
          <option value="empty">Empty</option>
        </select>
        <button id="loadPreset" class="btn ghost">Load</button>
      </div>
      <div class="row">
        <button id="saveScene" class="btn">Save</button>
        <input id="loadFile" type="file" accept=".json" style="display:none"/>
        <button id="loadScene" class="btn ghost">Load</button>
      </div>
      <div class="row">
        <button id="exportImg" class="btn ghost">Export Image</button>
        <button id="recordGif" class="btn ghost">Record GIF</button>
      </div>
    </div>
  </div>`;

  const qs = (id:string)=>root.querySelector(id) as HTMLElement;

  // Collapsible group logic (after HTML exists)
  root.querySelectorAll('.collapsible .group-header').forEach(header => {
    header.addEventListener('click', () => {
      const group = (header as HTMLElement).parentElement as HTMLElement;
      const content = group.querySelector('.group-content') as HTMLElement;
      const arrow = header.querySelector('.arrow') as HTMLElement;
      const isOpen = group.classList.toggle('open');
      if(isOpen) { content.style.display = ''; arrow.textContent = '▼'; }
      else { content.style.display = 'none'; arrow.textContent = '▶'; }
    });
  });

  // Overlay selector
  const overlaySel = root.querySelector('#overlayVis') as HTMLSelectElement | null;
  overlaySel?.addEventListener('change', ()=>{
    const val = overlaySel.value;
    (hooks.get2d() as any)?.setOverlayMode?.(val);
    (window as any).updateLegend?.(val);
  });

  // Help / Tutorial
  qs('#helpBtn')?.addEventListener('click', ()=> (window as any).showHelp?.());

  // Reset All: reset sim + remove annotations
  qs('#resetAll')?.addEventListener('click', ()=>{
    hooks.get2d()?.reset();
    const overlay = document.getElementById('overlay');
    if(overlay) Array.from(overlay.querySelectorAll('.annotation')).forEach(el=>el.remove());
  });

  const modeSwitch = root.querySelector('#modeSwitch') as HTMLInputElement;
  // default 3D on
  modeSwitch.checked = true;
  modeSwitch.addEventListener('change', ()=>{
    console.log('Mode switch:', modeSwitch.checked ? '3D' : '2D');
    hooks.onMode(modeSwitch.checked ? '3d' : '2d');
  });

  const bindRange = (id: string, fmt: (v:number)=>string, cb:(v:number)=>void)=>{
    const el = root.querySelector(`#${id}`) as HTMLInputElement;
    const v = root.querySelector(`#${id}v`) as HTMLElement | null;
    const update = ()=>{ const val = parseFloat(el.value); v && (v.textContent = fmt(val)); cb(val); };
    el.addEventListener('input', update);
    update();
  };

  bindRange('vel', (v)=>v.toFixed(1), (v)=> hooks.get2d()?.setInletVelocity(v));
  bindRange('nu', (v)=>v.toExponential(1), (v)=> hooks.get2d()?.setViscosity(v));
  bindRange('rho', (v)=>v.toFixed(2), (v)=> hooks.get2d()?.setDensity(v));
  bindRange('dt', (v)=>v.toFixed(3), (v)=> hooks.get2d()?.setDt(v));
  bindRange('pScale', (v)=>v.toFixed(1)+'x', (v)=> (hooks.get2d() as any)?.setPressureScale?.(v));
  bindRange('licStep', (v)=>v.toFixed(1)+'px', (v)=> (hooks.get2d() as any)?.setLicStep?.(v));
  bindRange('licContrast', (v)=>v.toFixed(1)+'x', (v)=> (hooks.get2d() as any)?.setLicContrast?.(v));
  // Refresh legend on relevant slider changes
  const pScaleEl = root.querySelector('#pScale') as HTMLInputElement | null;
  const licStepEl = root.querySelector('#licStep') as HTMLInputElement | null;
  const licContrastEl = root.querySelector('#licContrast') as HTMLInputElement | null;
  [pScaleEl, licStepEl, licContrastEl].forEach(el=> el?.addEventListener('input', ()=> (window as any).updateLegend?.()));

  const resSel = root.querySelector('#res') as HTMLSelectElement;
  resSel.addEventListener('change', ()=>{
    const N = parseInt(resSel.value, 10);
    hooks.get2d()?.setResolution(N);
  });

  qs('#reset').addEventListener('click', ()=> hooks.get2d()?.reset());
  qs('#reset').addEventListener('click', ()=> (window as any).appLog?.('Reset simulation'));

  let paused = false;
  qs('#pause').addEventListener('click', (ev)=>{
    paused = !paused;
    (ev.currentTarget as HTMLElement).textContent = paused ? 'Resume' : 'Pause';
    paused ? hooks.get2d()?.pause() : hooks.get2d()?.resume();
  });

  const setActive = (a:HTMLElement, b:HTMLElement)=>{ a.classList.add('active'); b.classList.remove('active'); };
  const drawBtn = qs('#draw'); const selectBtn = qs('#select');
  const ensure2DThen = (fn:()=>void)=>{
    const eng = hooks.get2d();
    if(eng){ fn(); return; }
    const modeSwitch = document.querySelector('#modeSwitch') as HTMLInputElement | null;
    if(modeSwitch){ modeSwitch.checked = false; }
    hooks.onMode('2d');
    const once = ()=>{ document.removeEventListener('fluidsim-2d-ready', once as any); fn(); };
    document.addEventListener('fluidsim-2d-ready', once as any, { once: true } as any);
  };
  drawBtn.addEventListener('click', ()=>{ ensure2DThen(()=>{ setActive(drawBtn, selectBtn); hooks.get2d()?.setTool('draw'); (window as any).appLog?.('Draw tool active'); }); });
  selectBtn.addEventListener('click', ()=>{ ensure2DThen(()=>{ setActive(selectBtn, drawBtn); hooks.get2d()?.setTool('select'); (window as any).appLog?.('Select tool active'); }); });
  qs('#circle').addEventListener('click', ()=>{ ensure2DThen(()=>{ hooks.get2d()?.addCircle(); (window as any).appLog?.('Circle added'); }); });
  qs('#rect').addEventListener('click', ()=>{ ensure2DThen(()=>{ hooks.get2d()?.addRect(); (window as any).appLog?.('Rect added'); }); });
  qs('#clear').addEventListener('click', ()=> hooks.get2d()?.clearObstacles());
  qs('#clear').addEventListener('click', ()=> (window as any).appLog?.('Obstacles cleared'));
  // Fallback brush: delegate clicks on the canvas to paint (works across canvas recreation)
  document.addEventListener('click', (e)=>{
    const t = e.target as HTMLElement;
    if(t && t.id === 'glcanvas' && drawBtn.classList.contains('active')){
      const r = t.getBoundingClientRect();
      const u = (e.clientX - r.left)/r.width; const v = (e.clientY - r.top)/r.height;
      (hooks.get2d() as any)?.paintAtScreen?.(u, v, 0.02);
      (window as any).appLog?.(`Paint @ ${u.toFixed(2)}, ${v.toFixed(2)}`);
    }
  }, true);
  // Vorticity confinement toggle under Solver
  const solverGroup = root.querySelector('[data-group="solver"] .group-content');
  if(solverGroup){
    const row = document.createElement('div'); row.className='row';
    row.innerHTML = '<label>Vorticity Confinement</label><input id="vortConf" type="range" min="0" max="5" step="0.1" value="0"/><span id="vortConfv" class="chip">0.0</span>';
    solverGroup.appendChild(row);
    bindRange('vortConf', (v)=>v.toFixed(1), (v)=> (hooks.get2d() as any)?.setVorticityConfinement?.(v));
  const vf = root.querySelector('#vortConf') as HTMLInputElement | null; vf?.addEventListener('input', ()=> (window as any).appLog?.(`Vorticity confinement: ${vf.value}`));
  }

  // Keyboard shortcuts
  window.addEventListener('keydown', (e)=>{
    if(e.key==='d'){ drawBtn.click(); }
    if(e.key==='s'){ selectBtn.click(); }
    if(e.key==='r'){ (qs('#reset') as HTMLElement).click(); }
    // Test 2D mode switch
    if(e.key==='2'){ 
      console.log('2 key pressed - forcing 2D mode');
      const modeSwitch = document.querySelector('#modeSwitch') as HTMLInputElement;
      if(modeSwitch) {
        modeSwitch.checked = false;
        modeSwitch.dispatchEvent(new Event('change'));
      }
    }
    if(e.key==='3'){ 
      console.log('3 key pressed - forcing 3D mode');
      const modeSwitch = document.querySelector('#modeSwitch') as HTMLInputElement;
      if(modeSwitch) {
        modeSwitch.checked = true;
        modeSwitch.dispatchEvent(new Event('change'));
      }
    }
    (window as any).appLog?.(`Key: ${e.key}`);
  });

  // Undo/redo/snap/align/duplicate
  qs('#undo').addEventListener('click', ()=> (hooks.get2d() as any)?.undo?.());
  qs('#redo').addEventListener('click', ()=> (hooks.get2d() as any)?.redo?.());
  qs('#snap').addEventListener('click', ()=> (hooks.get2d() as any)?.snapObstacles?.());
  qs('#align').addEventListener('click', ()=> (hooks.get2d() as any)?.alignObstacles?.());
  qs('#dupe').addEventListener('click', ()=> (hooks.get2d() as any)?.duplicateSelected?.());
  qs('#rotateL').addEventListener('click', ()=> (hooks.get2d() as any)?.rotateSelected?.(-0.2));
  qs('#rotateR').addEventListener('click', ()=> (hooks.get2d() as any)?.rotateSelected?.(0.2));
  qs('#poly').addEventListener('click', ()=> (hooks.get2d() as any)?.addPolygon?.());

  // Presets loader
  qs('#loadPreset').addEventListener('click', ()=>{
    const val = (qs('#preset') as HTMLSelectElement).value;
    const eng = hooks.get2d(); if(!eng) return;
    if(val==='circle'){ eng.clearObstacles(); eng.addCircle(); }
    else if(val==='rect'){ eng.clearObstacles(); eng.addRect(); }
    else if(val==='empty'){ eng.clearObstacles(); }
  (window as any).appLog?.(`Preset loaded: ${val||'none'}`);
  });

  // Export hooks (implemented in main.ts)
  qs('#exportImg').addEventListener('click', ()=> { (window as any).exportImage?.(); (window as any).appLog?.('Export image clicked'); });
  qs('#recordGif').addEventListener('click', ()=> { (window as any).recordGif?.(); (window as any).appLog?.('Record video clicked'); });
  // Help overlay again (ensure bound)
  qs('#helpBtn').addEventListener('click', ()=> { (window as any).showHelp?.(); (window as any).appLog?.('Help clicked'); });
}
