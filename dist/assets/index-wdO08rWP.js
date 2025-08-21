var ol=Object.defineProperty;var al=(i,t,e)=>t in i?ol(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var Z=(i,t,e)=>al(i,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();function ll(i,t){var p,f;if(!document.getElementById("collapsible-style")){const g=document.createElement("style");g.id="collapsible-style",g.textContent=`
      .collapsible .group-header { cursor: pointer; user-select: none; display: flex; align-items: center; gap: 6px; font-size: 1.1em; padding: 2px 0; }
      .collapsible .arrow { font-size: 1.1em; transition: transform 0.15s; }
      .collapsible .group-content { transition: max-height 0.2s; }
      .collapsible:not(.open) .group-content { display: none; }
      .collapsible.open .arrow { transform: rotate(0deg); }
      .collapsible:not(.open) .arrow { transform: rotate(0deg); }
    `,document.head.appendChild(g)}i.innerHTML=`
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
  </div>`;const e=g=>i.querySelector(g);i.querySelectorAll(".collapsible .group-header").forEach(g=>{g.addEventListener("click",()=>{const _=g.parentElement,E=_.querySelector(".group-content"),C=g.querySelector(".arrow");_.classList.toggle("open")?(E.style.display="",C.textContent="▼"):(E.style.display="none",C.textContent="▶")})});const n=i.querySelector("#overlayVis");n==null||n.addEventListener("change",()=>{var _,E,C;const g=n.value;(E=(_=t.get2d())==null?void 0:_.setOverlayMode)==null||E.call(_,g),(C=window.updateLegend)==null||C.call(window,g)}),(p=e("#helpBtn"))==null||p.addEventListener("click",()=>{var g;return(g=window.showHelp)==null?void 0:g.call(window)}),(f=e("#resetAll"))==null||f.addEventListener("click",()=>{var _;(_=t.get2d())==null||_.reset();const g=document.getElementById("overlay");g&&Array.from(g.querySelectorAll(".annotation")).forEach(E=>E.remove())});const r=i.querySelector("#modeSwitch");r.checked=!0,r.addEventListener("change",()=>{t.onMode(r.checked?"3d":"2d")});const s=(g,_,E)=>{const C=i.querySelector(`#${g}`),b=i.querySelector(`#${g}v`),w=()=>{const W=parseFloat(C.value);b&&(b.textContent=_(W)),E(W)};C.addEventListener("input",w),w()};s("vel",g=>g.toFixed(1),g=>{var _;return(_=t.get2d())==null?void 0:_.setInletVelocity(g)}),s("nu",g=>g.toExponential(1),g=>{var _;return(_=t.get2d())==null?void 0:_.setViscosity(g)}),s("rho",g=>g.toFixed(2),g=>{var _;return(_=t.get2d())==null?void 0:_.setDensity(g)}),s("dt",g=>g.toFixed(3),g=>{var _;return(_=t.get2d())==null?void 0:_.setDt(g)}),s("pScale",g=>g.toFixed(1)+"x",g=>{var _,E;return(E=(_=t.get2d())==null?void 0:_.setPressureScale)==null?void 0:E.call(_,g)}),s("licStep",g=>g.toFixed(1)+"px",g=>{var _,E;return(E=(_=t.get2d())==null?void 0:_.setLicStep)==null?void 0:E.call(_,g)}),s("licContrast",g=>g.toFixed(1)+"x",g=>{var _,E;return(E=(_=t.get2d())==null?void 0:_.setLicContrast)==null?void 0:E.call(_,g)});const a=i.querySelector("#pScale"),o=i.querySelector("#licStep"),l=i.querySelector("#licContrast");[a,o,l].forEach(g=>g==null?void 0:g.addEventListener("input",()=>{var _;return(_=window.updateLegend)==null?void 0:_.call(window)}));const c=i.querySelector("#res");c.addEventListener("change",()=>{var _;const g=parseInt(c.value,10);(_=t.get2d())==null||_.setResolution(g)}),e("#reset").addEventListener("click",()=>{var g;return(g=t.get2d())==null?void 0:g.reset()}),e("#reset").addEventListener("click",()=>{var g;return(g=window.appLog)==null?void 0:g.call(window,"Reset simulation")});let h=!1;e("#pause").addEventListener("click",g=>{var _,E;h=!h,g.currentTarget.textContent=h?"Resume":"Pause",h?(_=t.get2d())==null||_.pause():(E=t.get2d())==null||E.resume()});const d=(g,_)=>{g.classList.add("active"),_.classList.remove("active")},u=e("#draw"),m=e("#select"),v=g=>{if(t.get2d()){g();return}const E=document.querySelector("#modeSwitch");E&&(E.checked=!1),t.onMode("2d");const C=()=>{document.removeEventListener("fluidsim-2d-ready",C),g()};document.addEventListener("fluidsim-2d-ready",C,{once:!0})};u.addEventListener("click",()=>{v(()=>{var g,_;d(u,m),(g=t.get2d())==null||g.setTool("draw"),(_=window.appLog)==null||_.call(window,"Draw tool active")})}),m.addEventListener("click",()=>{v(()=>{var g,_;d(m,u),(g=t.get2d())==null||g.setTool("select"),(_=window.appLog)==null||_.call(window,"Select tool active")})}),e("#circle").addEventListener("click",()=>{v(()=>{var g,_;(g=t.get2d())==null||g.addCircle(),(_=window.appLog)==null||_.call(window,"Circle added")})}),e("#rect").addEventListener("click",()=>{v(()=>{var g,_;(g=t.get2d())==null||g.addRect(),(_=window.appLog)==null||_.call(window,"Rect added")})}),e("#clear").addEventListener("click",()=>{var g;return(g=t.get2d())==null?void 0:g.clearObstacles()}),e("#clear").addEventListener("click",()=>{var g;return(g=window.appLog)==null?void 0:g.call(window,"Obstacles cleared")}),document.addEventListener("click",g=>{var E,C,b;const _=g.target;if(_&&_.id==="glcanvas"&&u.classList.contains("active")){const w=_.getBoundingClientRect(),W=(g.clientX-w.left)/w.width,y=(g.clientY-w.top)/w.height;(C=(E=t.get2d())==null?void 0:E.paintAtScreen)==null||C.call(E,W,y,.02),(b=window.appLog)==null||b.call(window,`Paint @ ${W.toFixed(2)}, ${y.toFixed(2)}`)}},!0);const x=i.querySelector('[data-group="solver"] .group-content');if(x){const g=document.createElement("div");g.className="row",g.innerHTML='<label>Vorticity Confinement</label><input id="vortConf" type="range" min="0" max="5" step="0.1" value="0"/><span id="vortConfv" class="chip">0.0</span>',x.appendChild(g),s("vortConf",E=>E.toFixed(1),E=>{var C,b;return(b=(C=t.get2d())==null?void 0:C.setVorticityConfinement)==null?void 0:b.call(C,E)});const _=i.querySelector("#vortConf");_==null||_.addEventListener("input",()=>{var E;return(E=window.appLog)==null?void 0:E.call(window,`Vorticity confinement: ${_.value}`)})}window.addEventListener("keydown",g=>{var _;g.key==="d"&&u.click(),g.key==="s"&&m.click(),g.key==="r"&&e("#reset").click(),(_=window.appLog)==null||_.call(window,`Key: ${g.key}`)}),e("#undo").addEventListener("click",()=>{var g,_;return(_=(g=t.get2d())==null?void 0:g.undo)==null?void 0:_.call(g)}),e("#redo").addEventListener("click",()=>{var g,_;return(_=(g=t.get2d())==null?void 0:g.redo)==null?void 0:_.call(g)}),e("#snap").addEventListener("click",()=>{var g,_;return(_=(g=t.get2d())==null?void 0:g.snapObstacles)==null?void 0:_.call(g)}),e("#align").addEventListener("click",()=>{var g,_;return(_=(g=t.get2d())==null?void 0:g.alignObstacles)==null?void 0:_.call(g)}),e("#dupe").addEventListener("click",()=>{var g,_;return(_=(g=t.get2d())==null?void 0:g.duplicateSelected)==null?void 0:_.call(g)}),e("#rotateL").addEventListener("click",()=>{var g,_;return(_=(g=t.get2d())==null?void 0:g.rotateSelected)==null?void 0:_.call(g,-.2)}),e("#rotateR").addEventListener("click",()=>{var g,_;return(_=(g=t.get2d())==null?void 0:g.rotateSelected)==null?void 0:_.call(g,.2)}),e("#poly").addEventListener("click",()=>{var g,_;return(_=(g=t.get2d())==null?void 0:g.addPolygon)==null?void 0:_.call(g)}),e("#loadPreset").addEventListener("click",()=>{var E;const g=e("#preset").value,_=t.get2d();_&&(g==="circle"?(_.clearObstacles(),_.addCircle()):g==="rect"?(_.clearObstacles(),_.addRect()):g==="empty"&&_.clearObstacles(),(E=window.appLog)==null||E.call(window,`Preset loaded: ${g||"none"}`))}),e("#exportImg").addEventListener("click",()=>{var g,_;(g=window.exportImage)==null||g.call(window),(_=window.appLog)==null||_.call(window,"Export image clicked")}),e("#recordGif").addEventListener("click",()=>{var g,_;(g=window.recordGif)==null||g.call(window),(_=window.appLog)==null||_.call(window,"Record video clicked")}),e("#helpBtn").addEventListener("click",()=>{var g,_;(g=window.showHelp)==null||g.call(window),(_=window.appLog)==null||_.call(window,"Help clicked")})}function Sn(){return Math.random().toString(36).slice(2,9)}class cl{constructor(t,e,n,r,s){Z(this,"texPressure");Z(this,"texVorticity");Z(this,"texStream");Z(this,"texNoise");Z(this,"zoom",1);Z(this,"ofs",[0,0]);Z(this,"present",()=>{});Z(this,"overlayMode","dye");Z(this,"pressureScale",1);Z(this,"licStep",1.5);Z(this,"licContrast",1);Z(this,"vortConf",0);Z(this,"undoStack",[]);Z(this,"redoStack",[]);Z(this,"gl");Z(this,"raf",0);Z(this,"lastT",0);Z(this,"fpsSmoothed",0);Z(this,"dpr",1);Z(this,"W",0);Z(this,"H",0);Z(this,"N",256);Z(this,"Ny",256);Z(this,"dt",.016);Z(this,"nu",15e-6);Z(this,"rho",1);Z(this,"Uin",2);Z(this,"running",!0);Z(this,"obstacles",[]);Z(this,"tool","select");Z(this,"selection",{id:null,dragging:!1,dx:0,dy:0,sizing:!1});Z(this,"metrics",{Re:0,Cd:0,Cl:0,dP:0});Z(this,"overlay");Z(this,"handle");Z(this,"polyHandles",[]);Z(this,"dbgCanvas");Z(this,"dbgCtx");Z(this,"drawClickFallback",t=>{if(this.tool!=="draw")return;t.preventDefault(),t.stopPropagation();const e=this.canvas.getBoundingClientRect(),n=(t.clientX-e.left)/e.width,r=(t.clientY-e.top)/e.height;this.log(`Click fallback paint @ ${n.toFixed(3)}, ${r.toFixed(3)}`),this.paintAtScreen(n,r,.04)});Z(this,"progAdv");Z(this,"progJac");Z(this,"progDiv");Z(this,"progProj");Z(this,"progSplat");Z(this,"progCopy");Z(this,"progVis");Z(this,"progMask");Z(this,"progForces");Z(this,"progPresent");Z(this,"progFade");Z(this,"progPaint");Z(this,"progVort");Z(this,"progLIC");Z(this,"progVortForce");Z(this,"progNoSlip");Z(this,"vao");Z(this,"quad");Z(this,"view",{zoom:1,ofs:[0,0]});Z(this,"texVel");Z(this,"texVelTmp");Z(this,"texPr");Z(this,"texPrTmp");Z(this,"texDiv");Z(this,"texDye");Z(this,"texDyeTmp");Z(this,"texMask");Z(this,"fbo");Z(this,"lastSampleT",0);this.canvas=t,this.log=n,this.onFps=r,this.onMetrics=s;const a=t.getContext("webgl2",{alpha:!1,antialias:!1,premultipliedAlpha:!1});if(!a)throw new Error("WebGL2 not supported");this.gl=a,this.overlay=e,this.log("FluidEngine2D constructor - initializing WebGL2 context"),this.initGL(),this.installPointer(),this.initOverlay(),this.overlayMode="dye",this.log("FluidEngine2D constructor complete"),this.dbgCanvas=document.createElement("canvas"),this.dbgCanvas.style.position="absolute",this.dbgCanvas.style.inset="0",this.dbgCanvas.style.pointerEvents="none",this.dbgCanvas.style.zIndex="6",this.overlay.appendChild(this.dbgCanvas),this.dbgCtx=this.dbgCanvas.getContext("2d")||void 0,this.overlay.classList.add("debugTint")}setOverlayMode(t){["dye","velocity","pressure","vorticity","streamlines"].includes(t)&&(this.overlayMode=t)}setPressureScale(t){this.pressureScale=Math.max(.05,Math.min(10,t))}setLicStep(t){this.licStep=Math.max(.25,Math.min(4,t))}setLicContrast(t){this.licContrast=Math.max(.25,Math.min(4,t))}setVorticityConfinement(t){this.vortConf=Math.max(0,Math.min(10,t))}pushUndo(){this.undoStack.push(JSON.stringify(this.obstacles)),this.undoStack.length>50&&this.undoStack.shift(),this.redoStack=[]}undo(){this.undoStack.length!==0&&(this.redoStack.push(JSON.stringify(this.obstacles)),this.obstacles=JSON.parse(this.undoStack.pop()),this.syncObstacles(),this.updateOverlay())}redo(){this.redoStack.length!==0&&(this.undoStack.push(JSON.stringify(this.obstacles)),this.obstacles=JSON.parse(this.redoStack.pop()),this.syncObstacles(),this.updateOverlay())}snapObstacles(){this.pushUndo();for(const t of this.obstacles)t.kind==="circle"||t.kind==="rect"?(t.x=Math.round(t.x*20)/20,t.y=Math.round(t.y*20)/20):t.kind==="poly"&&(t.points=t.points.map(([e,n])=>[Math.round(e*20)/20,Math.round(n*20)/20]));this.syncObstacles()}alignObstacles(){this.pushUndo();const t=.5;for(const e of this.obstacles)if(e.kind==="circle"||e.kind==="rect")e.x=t;else if(e.kind==="poly"){const n=t-e.points.reduce((r,s)=>r+s[0],0)/e.points.length;e.points=e.points.map(([r,s])=>[r+n,s])}this.syncObstacles()}duplicateSelected(){if(!this.selection.id)return;this.pushUndo();const t=this.obstacles.find(n=>n.id===this.selection.id);if(!t)return;let e;t.kind==="circle"||t.kind==="rect"?e={...t,id:Sn(),x:t.x+.05,y:t.y+.05}:t.kind==="poly"&&(e={...t,id:Sn(),points:t.points.map(([n,r])=>[n+.05,r+.05])}),e&&(this.obstacles.push(e),this.syncObstacles())}setInletVelocity(t){this.Uin=t}setViscosity(t){this.nu=t}setDensity(t){this.rho=t}setDt(t){this.dt=t}setResolution(t){this.N=t,this.rebuild()}setTool(t){this.tool=t,this.log(`Tool set to: ${t}`),t==="draw"?this.canvas.addEventListener("click",this.drawClickFallback,{capture:!0}):this.canvas.removeEventListener("click",this.drawClickFallback,{capture:!0})}resetView(){this.view.zoom=1,this.view.ofs=[0,0]}setZoom(t){this.view.zoom=Math.min(3,Math.max(.5,t))}setOffset(t,e){this.view.ofs=[t,e]}paintAtScreen(t,e,n=.04){const[r,s]=this.screenToDomain(t,e);if(this.log(`paintAtScreen: UV(${t.toFixed(3)}, ${e.toFixed(3)}) -> Domain(${r.toFixed(3)}, ${s.toFixed(3)}) r=${n.toFixed(3)}`),!this.texMask||!this.texDye||!this.progPaint||!this.progSplat){this.log("ERROR: Missing textures or programs in paintAtScreen");return}this.drawTo(this.texMask,this.progPaint,a=>{this.bindTexture(0,this.texMask),a.uniform1i(a.getUniformLocation(this.progPaint,"src"),0),a.uniform2f(a.getUniformLocation(this.progPaint,"p"),r,s),a.uniform1f(a.getUniformLocation(this.progPaint,"r"),n)}),this.drawTo(this.texDye,this.progSplat,a=>{this.bindTexture(0,this.texDye),a.uniform1i(a.getUniformLocation(this.progSplat,"src"),0),a.uniform2f(a.getUniformLocation(this.progSplat,"p"),r,s),a.uniform1f(a.getUniformLocation(this.progSplat,"r"),Math.max(.8*n,.02)),a.uniform3f(a.getUniformLocation(this.progSplat,"color"),4,2,.5)}),this.log("paintAtScreen completed - should see bright splat")}reset(){this.clearObstacles(),this.clearFields()}pause(){this.running=!1}resume(){this.running=!0,this.lastT=performance.now(),this.loop(this.lastT)}addCircle(){this.pushUndo();const t={id:Sn(),kind:"circle",x:.5,y:.5,w:.16,h:.16,r:.12,rot:0};this.obstacles.push(t),this.syncObstacles(),this.updateOverlay(),this.log(`Circle obstacle added at (${t.x}, ${t.y}) radius ${t.r}`),this.drawTo(this.texDye,this.progSplat,e=>{this.bindTexture(0,this.texDye),e.uniform1i(e.getUniformLocation(this.progSplat,"src"),0),e.uniform2f(e.getUniformLocation(this.progSplat,"p"),t.x,t.y),e.uniform1f(e.getUniformLocation(this.progSplat,"r"),t.r+.05),e.uniform3f(e.getUniformLocation(this.progSplat,"color"),2,4,1)})}addRect(){this.pushUndo(),this.obstacles.push({id:Sn(),kind:"rect",x:.6,y:.5,w:.15,h:.1,r:0,rot:0}),this.syncObstacles(),this.updateOverlay(),this.log("Rectangle obstacle added")}addPolygon(t){t||(t=[[.5,.6],[.6,.4],[.4,.4]]),this.obstacles.push({id:Sn(),kind:"poly",points:t,rot:0}),this.syncObstacles()}clearObstacles(){this.pushUndo(),this.obstacles=[],this.syncObstacles(),this.updateOverlay();const t=this.gl;t.bindFramebuffer(t.FRAMEBUFFER,this.fbo),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,this.texMask,0),t.clearColor(0,0,0,1),t.clear(t.COLOR_BUFFER_BIT),this.log("All obstacles cleared")}getObstacles(){return this.obstacles}start(){this.log("FluidEngine2D starting animation loop"),this.lastT=performance.now(),this.loop(this.lastT)}dispose(){cancelAnimationFrame(this.raf)}resize(t,e,n){if(this.log(`FluidEngine2D resize: ${t}x${e} dpr=${n}`),this.W=t,this.H=e,this.dpr=n,this.rebuild(),this.dbgCanvas){const r=Math.max(1,this.canvas.clientWidth|0),s=Math.max(1,this.canvas.clientHeight|0);this.dbgCanvas.width=Math.floor(r*n),this.dbgCanvas.height=Math.floor(s*n),this.dbgCanvas.style.width=r+"px",this.dbgCanvas.style.height=s+"px",this.dbgCtx&&this.dbgCtx.setTransform(n,0,0,n,0,0)}}initGL(){const t=this.gl;[t.getExtension("EXT_color_buffer_float"),t.getExtension("OES_texture_float_linear")][0]||this.log("Warning: EXT_color_buffer_float missing"),this.vao=t.createVertexArray(),t.bindVertexArray(this.vao),this.quad=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,this.quad),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),t.STATIC_DRAW);const n=(b,w)=>{const W=this.c(t.VERTEX_SHADER,b),y=this.c(t.FRAGMENT_SHADER,w),A=t.createProgram();if(t.attachShader(A,W),t.attachShader(A,y),t.linkProgram(A),!t.getProgramParameter(A,t.LINK_STATUS))throw new Error(t.getProgramInfoLog(A)||"link error");return A},r=`#version 300 es
    layout(location=0) in vec2 p; out vec2 uv; void main(){ uv = 0.5*p+0.5; gl_Position=vec4(p,0,1);} `,s=`#version 300 es
    precision highp float; in vec2 uv; out vec4 o; uniform sampler2D t; void main(){ o = texture(t, uv);} `,a=`#version 300 es
    precision highp float; in vec2 uv; out vec4 o; uniform sampler2D vel; uniform sampler2D src; uniform sampler2D mask; uniform float dt; uniform vec2 invRes; 
    vec4 bilerp(sampler2D t, vec2 p){ vec2 st = p*invRes; vec2 f = fract(st); vec2 i = (floor(st)+0.5)*invRes; vec2 j = i + vec2(invRes.x,0.0); vec2 k = i + vec2(0.0,invRes.y); vec2 l = i + invRes; vec4 a=texture(t,i), b=texture(t,j), c=texture(t,k), d=texture(t,l); return mix(mix(a,b,f.x), mix(c,d,f.x), f.y);} 
    void main(){ vec2 v = texture(vel, uv).xy; vec2 p = uv - dt*v; vec4 s = bilerp(src, p); float m = texture(mask, uv).r; o = mix(s, vec4(0), m); }`,o=`#version 300 es
    precision highp float; in vec2 uv; out vec4 o; uniform sampler2D vel; uniform sampler2D mask; uniform vec2 px; 
    void main(){ vec2 l=uv-vec2(px.x,0), r=uv+vec2(px.x,0), d=uv-vec2(0,px.y), u=uv+vec2(0,px.y);
      vec2 vL=texture(vel,l).xy, vR=texture(vel,r).xy, vD=texture(vel,d).xy, vU=texture(vel,u).xy; float m=texture(mask,uv).r; 
      float div = (vR.x - vL.x + vU.y - vD.y)*0.5; o = vec4((1.0-m)*div,0,0,1); }
    `,l=`#version 300 es
    precision highp float; in vec2 uv; out vec4 o; uniform sampler2D p; uniform sampler2D div; uniform sampler2D mask; uniform vec2 px; 
    void main(){ vec2 l=uv-vec2(px.x,0), r=uv+vec2(px.x,0), d=uv-vec2(0,px.y), u=uv+vec2(0,px.y);
      float m=texture(mask,uv).r; float pl=texture(p,l).x, pr=texture(p,r).x, pd=texture(p,d).x, pu=texture(p,u).x; float b=texture(div,uv).x; 
      float res = (pl+pr+pd+pu - b)*0.25; o = vec4(mix(res, 0.0, m)); }
    `,c=`#version 300 es
    precision highp float; in vec2 uv; out vec4 o; uniform sampler2D vel; uniform sampler2D p; uniform sampler2D mask; uniform vec2 px; 
    void main(){ vec2 l=uv-vec2(px.x,0), r=uv+vec2(px.x,0), d=uv-vec2(0,px.y), u=uv+vec2(0,px.y);
      float pl=texture(p,l).x, pr=texture(p,r).x, pd=texture(p,d).x, pu=texture(p,u).x; vec2 v=texture(vel,uv).xy; float m=texture(mask,uv).r;
      vec2 g = vec2(pr-pl, pu-pd)*0.5; vec2 vc = v - g; o = vec4(mix(vc, vec2(0), m), 0, 1); }
    `,h=`#version 300 es
    precision highp float; in vec2 uv; out vec4 o; uniform sampler2D vel; uniform float nu; uniform vec2 px; 
    void main(){ vec2 l=uv-vec2(px.x,0), r=uv+vec2(px.x,0), d=uv-vec2(0,px.y), u=uv+vec2(0,px.y);
      vec2 vL=texture(vel,l).xy, vR=texture(vel,r).xy, vD=texture(vel,d).xy, vU=texture(vel,u).xy, vC=texture(vel,uv).xy; 
      vec2 lap = (vL+vR+vD+vU - 4.0*vC); o = vec4(vC + nu*lap, 0, 1); }
    `,d=`#version 300 es
    precision highp float; in vec2 uv; out vec4 o; uniform sampler2D src; uniform vec2 p; uniform float r; uniform vec3 color; 
    void main(){ float d = distance(uv, p); float s = exp(-d*d/(r*r)); vec4 c = texture(src, uv); o = c + vec4(color*s, 1); }
    `,u=`#version 300 es
  precision highp float; in vec2 uv; out vec4 o; uniform sampler2D src; uniform vec2 p; uniform float r; 
  void main(){ float d = distance(uv, p); float b = smoothstep(r, r*0.8, d); float m = 1.0 - b; float cur = texture(src, uv).r; o = vec4(max(cur, m), 0.0, 0.0, 1.0); }
  `,m=`#version 300 es
    precision highp float; in vec2 uv; out vec4 o; uniform vec4 rects[64]; uniform float rectA[64]; uniform int rectCount; uniform vec4 cir[64]; uniform int cirCount; 
    float rectSDF(vec2 p, vec2 c, vec2 hw){ vec2 d = abs(p-c)-hw; return length(max(d,0.0))+min(max(d.x,d.y),0.0);} 
    void main(){ float m=0.0; 
      for(int i=0;i<rectCount;i++){ vec4 R=rects[i]; float a = rectA[i]; float ca=cos(-a), sa=sin(-a); vec2 pc = uv - R.xy; vec2 pr = vec2(ca*pc.x - sa*pc.y, sa*pc.x + ca*pc.y) + R.xy; m=max(m, step(-0.001, -rectSDF(pr, R.xy, R.zw*0.5))); }
      for(int i=0;i<cirCount;i++){ vec4 C=cir[i]; float d=distance(uv, C.xy)-C.z; m=max(m, step(-0.001, -d)); }
      o = vec4(m,0,0,1);
    }
    `,v=`#version 300 es
    precision highp float; in vec2 uv; out vec4 o; uniform sampler2D vel; uniform float Uin; uniform vec2 px; 
    void main(){
      vec2 v = texture(vel, uv).xy;
      // Inlet: enforce horizontal inflow
      if(uv.x < 0.01) v = vec2(Uin, 0.0);
      // Outlet: zero-gradient (copy from left neighbor)
      if(uv.x > 0.99) v = texture(vel, uv - vec2(px.x, 0.0)).xy;
      o = vec4(v,0,1);
    }
    `,x=`#version 300 es
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
    `,p=`#version 300 es
    precision highp float; in vec2 uv; out vec4 o; uniform sampler2D t; uniform float k; void main(){ o = texture(t, uv)*k; }
    `;this.progCopy=n(r,s),this.progAdv=n(r,a),this.progDiv=n(r,o),this.progJac=n(r,l),this.progProj=n(r,c),this.progVis=n(r,h),this.progSplat=n(r,d),this.progMask=n(r,m),this.progForces=n(r,v),this.progPresent=n(r,x);const f=`#version 300 es
  precision highp float; in vec2 uv; out vec4 o; uniform sampler2D vel; uniform vec2 px;
  void main(){
    vec2 l=uv-vec2(px.x,0.0), r=uv+vec2(px.x,0.0), d=uv-vec2(0.0,px.y), u=uv+vec2(0.0,px.y);
    float dvy_dx = (texture(vel,r).y - texture(vel,l).y)*0.5;
    float dvx_dy = (texture(vel,u).x - texture(vel,d).x)*0.5;
    float w = dvy_dx - dvx_dy; o = vec4(w,0.0,0.0,1.0);
  }`;this.progVort=n(r,f);const g=`#version 300 es
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
  }`;this.progLIC=n(r,g);const _=`#version 300 es
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
  }`;this.progVortForce=n(r,_);const E=`#version 300 es
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
  }`;this.progNoSlip=n(r,E),this.present,this.present=()=>{const b=this.gl;b.useProgram(this.progPresent),b.uniform1i(b.getUniformLocation(this.progPresent,"overlayMode"),this.overlayMode==="dye"?0:this.overlayMode==="velocity"?1:this.overlayMode==="pressure"?2:this.overlayMode==="vorticity"?3:4),b.activeTexture(b.TEXTURE0),b.bindTexture(b.TEXTURE_2D,this.texVel),b.uniform1i(b.getUniformLocation(this.progPresent,"vel"),0),b.activeTexture(b.TEXTURE1),b.bindTexture(b.TEXTURE_2D,this.texDye),b.uniform1i(b.getUniformLocation(this.progPresent,"dye"),1),b.activeTexture(b.TEXTURE2),b.bindTexture(b.TEXTURE_2D,this.texMask),b.uniform1i(b.getUniformLocation(this.progPresent,"mask"),2),b.activeTexture(b.TEXTURE3),b.bindTexture(b.TEXTURE_2D,this.texPressure),b.uniform1i(b.getUniformLocation(this.progPresent,"pressure"),3),b.activeTexture(b.TEXTURE4),b.bindTexture(b.TEXTURE_2D,this.texVorticity),b.uniform1i(b.getUniformLocation(this.progPresent,"vorticity"),4),b.activeTexture(b.TEXTURE5),b.bindTexture(b.TEXTURE_2D,this.texStream),b.uniform1i(b.getUniformLocation(this.progPresent,"stream"),5),b.uniform1f(b.getUniformLocation(this.progPresent,"zoom"),this.zoom),b.uniform2fv(b.getUniformLocation(this.progPresent,"ofs"),this.ofs),b.uniform1f(b.getUniformLocation(this.progPresent,"pressureScale"),this.pressureScale),b.drawArrays(b.TRIANGLES,0,6),this.drawDebugOverlay()},this.progFade=n(r,p),this.progPaint=n(r,u);const C=0;t.enableVertexAttribArray(C),t.vertexAttribPointer(C,2,t.FLOAT,!1,0,0),this.fbo=t.createFramebuffer(),this.rebuild()}createTex(t,e,n=this.gl.RG16F){const r=this.gl,s=r.createTexture();r.bindTexture(r.TEXTURE_2D,s),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE);let a=r.RG;return n===r.R16F?a=r.RED:n===r.RG16F?a=r.RG:n===r.RGBA16F&&(a=r.RGBA),r.texImage2D(r.TEXTURE_2D,0,n,t,e,0,a,r.HALF_FLOAT,null),s}createNoiseTex(t,e){const n=this.gl,r=n.createTexture();n.bindTexture(n.TEXTURE_2D,r),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.REPEAT),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.REPEAT);const s=new Uint8Array(t*e*4);for(let a=0;a<t*e*4;a++)s[a]=Math.floor(Math.random()*256);return n.texImage2D(n.TEXTURE_2D,0,n.RGBA,t,e,0,n.RGBA,n.UNSIGNED_BYTE,s),r}rebuild(){const t=this.gl,e=this.W||Math.floor(this.canvas.clientWidth*this.dpr)||512,n=this.H||Math.floor(this.canvas.clientHeight*this.dpr)||512,r=this.N,s=Math.max(2,Math.floor(r*n/e));this.Ny=s,this.W=e,this.H=n;const a=o=>{o&&t.deleteTexture(o)};a(this.texVel),a(this.texVelTmp),a(this.texPr),a(this.texPrTmp),a(this.texDiv),a(this.texDye),a(this.texDyeTmp),a(this.texMask),a(this.texVorticity),a(this.texStream),a(this.texNoise),this.texVel=this.createTex(r,s,this.gl.RG16F),this.texVelTmp=this.createTex(r,s,this.gl.RG16F),this.texPr=this.createTex(r,s,this.gl.R16F),this.texPrTmp=this.createTex(r,s,this.gl.R16F),this.texDiv=this.createTex(r,s,this.gl.R16F),this.texDye=this.createTex(r,s,this.gl.RGBA16F),this.texDyeTmp=this.createTex(r,s,this.gl.RGBA16F),this.texMask=this.createTex(r,s,this.gl.R16F),this.texVorticity=this.createTex(r,s,this.gl.R16F),this.texStream=this.createTex(r,s,this.gl.RGBA16F),this.texNoise=this.createNoiseTex(r,s),this.texPressure=this.texPr,this.syncObstacles(),this.log("Initializing dye and velocity textures with bright colors"),this.drawTo(this.texDye,this.progSplat,o=>{this.bindTexture(0,this.texDye),o.uniform1i(o.getUniformLocation(this.progSplat,"src"),0),o.uniform2f(o.getUniformLocation(this.progSplat,"p"),.5,.5),o.uniform1f(o.getUniformLocation(this.progSplat,"r"),.8),o.uniform3f(o.getUniformLocation(this.progSplat,"color"),5,3,1)}),this.drawTo(this.texVel,this.progSplat,o=>{this.bindTexture(0,this.texVel),o.uniform1i(o.getUniformLocation(this.progSplat,"src"),0),o.uniform2f(o.getUniformLocation(this.progSplat,"p"),.1,.5),o.uniform1f(o.getUniformLocation(this.progSplat,"r"),.2),o.uniform3f(o.getUniformLocation(this.progSplat,"color"),4,0,0)}),this.drawTo(this.texVel,this.progSplat,o=>{this.bindTexture(0,this.texVel),o.uniform1i(o.getUniformLocation(this.progSplat,"src"),0),o.uniform2f(o.getUniformLocation(this.progSplat,"p"),.5,.8),o.uniform1f(o.getUniformLocation(this.progSplat,"r"),.15),o.uniform3f(o.getUniformLocation(this.progSplat,"color"),0,3,0)}),this.log("Dye and velocity initialization complete - should be visible")}clearFields(){const t=this.gl;t.bindFramebuffer(t.FRAMEBUFFER,this.fbo);const e=n=>{t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,n,0),t.clearColor(0,0,0,1),t.clear(t.COLOR_BUFFER_BIT)};[this.texVel,this.texVelTmp,this.texPr,this.texPrTmp,this.texDiv,this.texDye,this.texDyeTmp,this.texVorticity,this.texStream].forEach(e)}drawTo(t,e,n){const r=this.gl;r.bindFramebuffer(r.FRAMEBUFFER,this.fbo),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,t,0),r.viewport(0,0,this.N,Math.max(2,Math.floor(this.N*this.H/this.W))),r.useProgram(e),n&&n(r),r.drawArrays(r.TRIANGLES,0,6)}bindTexture(t,e){const n=this.gl;n.activeTexture(n.TEXTURE0+t),n.bindTexture(n.TEXTURE_2D,e)}c(t,e){const n=this.gl,r=n.createShader(t);if(n.shaderSource(r,e),n.compileShader(r),!n.getShaderParameter(r,n.COMPILE_STATUS))throw new Error(n.getShaderInfoLog(r)||"compile error");return r}syncObstacles(){this.gl.useProgram(this.progMask);const e=[],n=[],r=[];let s=[];for(const o of this.obstacles)o.kind==="rect"?(e.push(o.x,o.y,o.w,o.h),n.push(o.rot||0)):o.kind==="circle"?r.push(o.x,o.y,o.r,0):o.kind==="poly"&&s.push(o.points.flat());for(;e.length<64*4;)e.push(2,2,0,0);for(;n.length<64;)n.push(0);for(;r.length<64*4;)r.push(2,2,0,0);if(s.length){const o=this.N,l=this.Ny,c=new Float32Array(o*l);this.drawTo(this.texMask,this.progMask,h=>{const d=u=>h.getUniformLocation(this.progMask,u);h.uniform4fv(d("rects"),new Float32Array(e)),h.uniform1fv(d("rectA"),new Float32Array(n)),h.uniform1i(d("rectCount"),Math.min(64,this.obstacles.filter(u=>u.kind==="rect").length)),h.uniform4fv(d("cir"),new Float32Array(r)),h.uniform1i(d("cirCount"),Math.min(64,this.obstacles.filter(u=>u.kind==="circle").length))}),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.fbo),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,this.texMask,0),this.gl.readPixels(0,0,o,l,this.gl.RED,this.gl.FLOAT,c);for(const h of s)for(let d=0;d<l;++d)for(let u=0;u<o;++u){const m=u/o,v=d/l;a(m,v,h)&&(c[d*o+u]=1)}this.gl.bindTexture(this.gl.TEXTURE_2D,this.texMask),this.gl.texSubImage2D(this.gl.TEXTURE_2D,0,0,0,o,l,this.gl.RED,this.gl.FLOAT,c)}else this.drawTo(this.texMask,this.progMask,o=>{const l=c=>o.getUniformLocation(this.progMask,c);o.uniform4fv(l("rects"),new Float32Array(e)),o.uniform1fv(l("rectA"),new Float32Array(n)),o.uniform1i(l("rectCount"),Math.min(64,this.obstacles.filter(c=>c.kind==="rect").length)),o.uniform4fv(l("cir"),new Float32Array(r)),o.uniform1i(l("cirCount"),Math.min(64,this.obstacles.filter(c=>c.kind==="circle").length))});this.updateOverlay();function a(o,l,c){let h=!1;for(let d=0,u=c.length/2-1;d<c.length/2;u=d++){const m=c[2*d],v=c[2*d+1],x=c[2*u],p=c[2*u+1];v>l!=p>l&&o<(x-m)*(l-v)/(p-v+1e-12)+m&&(h=!h)}return h}}computeMetrics(){var a;const t=performance.now(),e=this.Uin*1/this.nu;let n=this.metrics.Cd,r=this.metrics.Cl,s=this.metrics.dP;if(t-this.lastSampleT>150){this.lastSampleT=t;const o=this.gl,l=this.Ny,c=this.N;o.bindFramebuffer(o.FRAMEBUFFER,this.fbo),o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,this.texVel,0);const h=new Float32Array(l*2);(a=o.readBuffer)==null||a.call(o,o.COLOR_ATTACHMENT0),o.readPixels(c-2,0,1,l,o.RG,o.FLOAT,h);let d=0;for(let V=0;V<l;V++)d+=h[V*2];d/=l,n=2*Math.max(0,this.Uin-d)/Math.max(1e-6,this.Uin),o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,this.texPr,0);const m=new Float32Array(l),v=new Float32Array(l);o.readPixels(1,0,1,l,o.RED,o.FLOAT,m),o.readPixels(c-2,0,1,l,o.RED,o.FLOAT,v);let x=0,p=0;for(let V=0;V<l;V++)x+=m[V],p+=v[V];x/=l,p/=l,s=Math.abs(x-p);const f=new Float32Array(c*l),g=new Float32Array(c*l);o.readPixels(0,0,c,l,o.RED,o.FLOAT,f),o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,this.texMask,0),o.readPixels(0,0,c,l,o.RED,o.FLOAT,g);let _=0,E=0;const C=1/c,b=1/l;o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,this.texVel,0);const w=new Float32Array(c*l*2);o.readPixels(0,0,c,l,o.RG,o.FLOAT,w);for(let V=1;V<l-1;++V)for(let J=1;J<c-1;++J){const L=V*c+J;if(g[L]<.5)continue;const N=g[L-1],k=g[L+1],Y=g[L-c],H=g[L+c];if(N>.5&&k>.5&&Y>.5&&H>.5)continue;let X=-.5*(k-N),q=-.5*(H-Y);const et=Math.hypot(X,q)||1;X/=et,q/=et;const nt=q,z=-X,$=f[L],st=.5*(C+b);_+=-$*X*st,E+=-$*q*st;const ut=L*2,ft=w[ut],At=w[ut+1],Rt=Math.hypot(X*C,q*b)||(C+b)*.5,Vt=(ft*nt+At*z)/Rt,U=this.nu*this.rho*Vt;_+=-U*nt*st,E+=-U*z*st}const W=Math.max(1e-6,this.obstacles.reduce((V,J)=>{if(J.kind==="circle")return V+Math.PI*J.r*J.r;if(J.kind==="rect")return V+J.w*J.h;if(J.kind==="poly"){let L=0;const N=J.points;for(let k=0;k<N.length;k++){const[Y,H]=N[k],[X,q]=N[(k+1)%N.length];L+=Y*q-X*H}return V+Math.abs(L)*.5}return V},0)),y=.5*this.rho*this.Uin*this.Uin,A=_/Math.max(1e-6,y*W),G=E/Math.max(1e-6,y*W);n=this.metrics.Cd*.8+A*.2,r=this.metrics.Cl*.8+G*.2,s=this.metrics.dP*.8+s*.2}this.metrics={Re:e,Cd:n,Cl:r,dP:s},this.onMetrics(this.metrics)}loop(t){Math.min(.05,(t-this.lastT)/1e3)||this.dt,this.lastT=t,this.running&&this.step(this.dt);const e=1e3/Math.max(1,performance.now()-t);this.fpsSmoothed=this.fpsSmoothed?this.fpsSmoothed*.9+e*.1:e,this.onFps(this.fpsSmoothed),this.computeMetrics(),this.raf=requestAnimationFrame(n=>this.loop(n))}step(t){const e=this.gl,n=[1/this.N,1/Math.max(2,Math.floor(this.N*this.H/this.W))];this.drawTo(this.texVelTmp,this.progForces,r=>{this.bindTexture(0,this.texVel),r.uniform1i(r.getUniformLocation(this.progForces,"vel"),0),r.uniform1f(r.getUniformLocation(this.progForces,"Uin"),this.Uin),r.uniform2f(r.getUniformLocation(this.progForces,"px"),n[0],n[1])}),[this.texVel,this.texVelTmp]=[this.texVelTmp,this.texVel],this.drawTo(this.texVelTmp,this.progVis,r=>{this.bindTexture(0,this.texVel),r.uniform1i(r.getUniformLocation(this.progVis,"vel"),0),r.uniform1f(r.getUniformLocation(this.progVis,"nu"),this.nu),r.uniform2f(r.getUniformLocation(this.progVis,"px"),n[0],n[1])}),[this.texVel,this.texVelTmp]=[this.texVelTmp,this.texVel],this.drawTo(this.texVelTmp,this.progAdv,r=>{this.bindTexture(0,this.texVel),this.bindTexture(1,this.texVel),this.bindTexture(2,this.texMask),r.uniform1i(r.getUniformLocation(this.progAdv,"vel"),0),r.uniform1i(r.getUniformLocation(this.progAdv,"src"),1),r.uniform1i(r.getUniformLocation(this.progAdv,"mask"),2),r.uniform1f(r.getUniformLocation(this.progAdv,"dt"),t),r.uniform2f(r.getUniformLocation(this.progAdv,"invRes"),1/this.N,1/Math.max(2,Math.floor(this.N*this.H/this.W)))}),[this.texVel,this.texVelTmp]=[this.texVelTmp,this.texVel],this.drawTo(this.texDyeTmp,this.progAdv,r=>{this.bindTexture(0,this.texVel),this.bindTexture(1,this.texDye),this.bindTexture(2,this.texMask),r.uniform1i(r.getUniformLocation(this.progAdv,"vel"),0),r.uniform1i(r.getUniformLocation(this.progAdv,"src"),1),r.uniform1i(r.getUniformLocation(this.progAdv,"mask"),2),r.uniform1f(r.getUniformLocation(this.progAdv,"dt"),t),r.uniform2f(r.getUniformLocation(this.progAdv,"invRes"),1/this.N,1/Math.max(2,Math.floor(this.N*this.H/this.W)))}),[this.texDye,this.texDyeTmp]=[this.texDyeTmp,this.texDye],this.drawTo(this.texDiv,this.progDiv,r=>{this.bindTexture(0,this.texVel),this.bindTexture(1,this.texMask),r.uniform1i(r.getUniformLocation(this.progDiv,"vel"),0),r.uniform1i(r.getUniformLocation(this.progDiv,"mask"),1),r.uniform2f(r.getUniformLocation(this.progDiv,"px"),n[0],n[1])});for(let r=0;r<40;r++)this.drawTo(this.texPrTmp,this.progJac,s=>{this.bindTexture(0,this.texPr),this.bindTexture(1,this.texDiv),this.bindTexture(2,this.texMask),s.uniform1i(s.getUniformLocation(this.progJac,"p"),0),s.uniform1i(s.getUniformLocation(this.progJac,"div"),1),s.uniform1i(s.getUniformLocation(this.progJac,"mask"),2),s.uniform2f(s.getUniformLocation(this.progJac,"px"),n[0],n[1])}),[this.texPr,this.texPrTmp]=[this.texPrTmp,this.texPr];this.drawTo(this.texVelTmp,this.progProj,r=>{this.bindTexture(0,this.texVel),this.bindTexture(1,this.texPr),this.bindTexture(2,this.texMask),r.uniform1i(r.getUniformLocation(this.progProj,"vel"),0),r.uniform1i(r.getUniformLocation(this.progProj,"p"),1),r.uniform1i(r.getUniformLocation(this.progProj,"mask"),2),r.uniform2f(r.getUniformLocation(this.progProj,"px"),n[0],n[1])}),[this.texVel,this.texVelTmp]=[this.texVelTmp,this.texVel],this.drawTo(this.texVorticity,this.progVort,r=>{this.bindTexture(0,this.texVel),r.uniform1i(r.getUniformLocation(this.progVort,"vel"),0),r.uniform2f(r.getUniformLocation(this.progVort,"px"),n[0],n[1])}),this.vortConf>1e-6&&(this.drawTo(this.texVelTmp,this.progVortForce,r=>{this.bindTexture(0,this.texVel),this.bindTexture(1,this.texVorticity),this.bindTexture(2,this.texMask),r.uniform1i(r.getUniformLocation(this.progVortForce,"vel"),0),r.uniform1i(r.getUniformLocation(this.progVortForce,"vort"),1),r.uniform1i(r.getUniformLocation(this.progVortForce,"mask"),2),r.uniform2f(r.getUniformLocation(this.progVortForce,"px"),n[0],n[1]),r.uniform1f(r.getUniformLocation(this.progVortForce,"eps"),this.vortConf),r.uniform1f(r.getUniformLocation(this.progVortForce,"dt"),t)}),[this.texVel,this.texVelTmp]=[this.texVelTmp,this.texVel]),this.drawTo(this.texVelTmp,this.progNoSlip,r=>{this.bindTexture(0,this.texVel),this.bindTexture(1,this.texMask),r.uniform1i(r.getUniformLocation(this.progNoSlip,"vel"),0),r.uniform1i(r.getUniformLocation(this.progNoSlip,"mask"),1),r.uniform2f(r.getUniformLocation(this.progNoSlip,"px"),n[0],n[1])}),[this.texVel,this.texVelTmp]=[this.texVelTmp,this.texVel];for(let r=0;r<3;r++){const s=.2+.6*Math.random();this.drawTo(this.texDye,this.progSplat,a=>{this.bindTexture(0,this.texDye),a.uniform1i(a.getUniformLocation(this.progSplat,"src"),0),a.uniform2f(a.getUniformLocation(this.progSplat,"p"),.02,s),a.uniform1f(a.getUniformLocation(this.progSplat,"r"),.01),a.uniform3f(a.getUniformLocation(this.progSplat,"color"),.2,.6,1.5)})}this.drawTo(this.texDyeTmp,this.progFade,r=>{this.bindTexture(0,this.texDye),r.uniform1i(r.getUniformLocation(this.progFade,"t"),0),r.uniform1f(r.getUniformLocation(this.progFade,"k"),.997)}),[this.texDye,this.texDyeTmp]=[this.texDyeTmp,this.texDye],e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,this.W,this.H),e.clearColor(.8,.3,.1,1),e.clear(e.COLOR_BUFFER_BIT),e.disable(e.DEPTH_TEST),e.enable(e.BLEND),e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA),this.log("EMERGENCY: Present with bright orange clear - you should see orange background")}installPointer(){const t=this.canvas;let e=!1,n=!1,r=[0,0];const s=a=>{const o=t.getBoundingClientRect(),l=(a.clientX-o.left)/o.width,c=(a.clientY-o.top)/o.height;return[l,c]};t.tabIndex=0,t.style.outline="none",t.addEventListener("pointerdown",a=>{var o;if(a.preventDefault(),a.stopPropagation(),t.focus(),this.log(`pointerdown - tool: ${this.tool}, button: ${a.button}`),t.setPointerCapture(a.pointerId),e=!0,r=s(a),n=a.button===2||a.shiftKey||a.button===1,n)this.log("Panning mode");else if(this.tool==="draw"){const[l,c]=this.screenToDomain(r[0],r[1]);this.log(`Draw paint START @ ${l.toFixed(3)}, ${c.toFixed(3)}, UV: ${r[0].toFixed(3)}, ${r[1].toFixed(3)}`),this.drawTo(this.texMask,this.progPaint,h=>{this.bindTexture(0,this.texMask),h.uniform1i(h.getUniformLocation(this.progPaint,"src"),0),h.uniform2f(h.getUniformLocation(this.progPaint,"p"),l,c),h.uniform1f(h.getUniformLocation(this.progPaint,"r"),.05)}),this.drawTo(this.texDye,this.progSplat,h=>{this.bindTexture(0,this.texDye),h.uniform1i(h.getUniformLocation(this.progSplat,"src"),0),h.uniform2f(h.getUniformLocation(this.progSplat,"p"),l,c),h.uniform1f(h.getUniformLocation(this.progSplat,"r"),.1),h.uniform3f(h.getUniformLocation(this.progSplat,"color"),10,5,2)})}else{const[l,c]=this.screenToDomain(r[0],r[1]),h=((o=this.obstacles.find(d=>d.kind==="circle"||d.kind==="rect"?Math.hypot(d.x-l,d.y-c)<.08:d.kind==="poly"?d.points.some(([u,m])=>Math.hypot(u-l,m-c)<.08):!1))==null?void 0:o.id)||null;this.selection={id:h,dragging:!!h,dx:0,dy:0,sizing:!1},this.updateOverlay()}}),t.addEventListener("pointermove",a=>{if(!e)return;a.preventDefault();const[o,l]=s(a),c=o-r[0],h=-(l-r[1]);if(r=[o,l],n)this.view.ofs[0]-=c/this.view.zoom,this.view.ofs[1]-=h/this.view.zoom;else if(this.tool==="draw"){const[d,u]=this.screenToDomain(o,l);this.log(`Draw drag @ ${d.toFixed(3)}, ${u.toFixed(3)}`),this.drawTo(this.texMask,this.progPaint,m=>{this.bindTexture(0,this.texMask),m.uniform1i(m.getUniformLocation(this.progPaint,"src"),0),m.uniform2f(m.getUniformLocation(this.progPaint,"p"),d,u),m.uniform1f(m.getUniformLocation(this.progPaint,"r"),.04)}),this.drawTo(this.texDye,this.progSplat,m=>{this.bindTexture(0,this.texDye),m.uniform1i(m.getUniformLocation(this.progSplat,"src"),0),m.uniform2f(m.getUniformLocation(this.progSplat,"p"),d,u),m.uniform1f(m.getUniformLocation(this.progSplat,"r"),.06),m.uniform3f(m.getUniformLocation(this.progSplat,"color"),8,4,1)})}else if(this.selection.id){const d=this.obstacles.find(u=>u.id===this.selection.id);d&&(d.kind==="circle"||d.kind==="rect"?(d.x+=c/this.view.zoom,d.y+=h/this.view.zoom):d.kind==="poly"&&(d.points=d.points.map(([u,m])=>[u+c/this.view.zoom,m+h/this.view.zoom])),this.syncObstacles())}}),t.addEventListener("pointerup",a=>{a.preventDefault(),e=!1,n=!1,t.releasePointerCapture(a.pointerId),this.selection.id=null,this.log(`pointerup - tool was: ${this.tool}`)}),t.addEventListener("wheel",a=>{a.preventDefault();const o=Math.exp(-a.deltaY*.001),l=this.view.zoom;this.view.zoom=Math.min(3,Math.max(.5,this.view.zoom*o));const c=t.getBoundingClientRect(),h=(a.clientX-c.left)/c.width,d=1-(a.clientY-c.top)/c.height;this.view.ofs[0]=h-(h-this.view.ofs[0])*(l/this.view.zoom),this.view.ofs[1]=d-(d-this.view.ofs[1])*(l/this.view.zoom)},{passive:!1}),t.addEventListener("contextmenu",a=>a.preventDefault())}domainToScreen(t,e){const n=(t-this.view.ofs[0]-.5)*this.view.zoom+.5,r=1-((e-this.view.ofs[1]-.5)*this.view.zoom+.5),s=this.canvas.clientWidth||this.W/this.dpr,a=this.canvas.clientHeight||this.H/this.dpr;return[n*s,r*a]}drawDebugOverlay(){const t=this.dbgCtx;if(!t||!this.dbgCanvas)return;const e=this.dbgCanvas.width/this.dpr,n=this.dbgCanvas.height/this.dpr;t.clearRect(0,0,e,n),t.save(),t.lineWidth=1,t.strokeStyle="rgba(80,100,130,0.25)";const r=64;for(let s=0;s<=e;s+=r)t.beginPath(),t.moveTo(s,0),t.lineTo(s,n),t.stroke();for(let s=0;s<=n;s+=r)t.beginPath(),t.moveTo(0,s),t.lineTo(e,s),t.stroke();t.restore(),t.save(),t.strokeStyle="#48e3b7",t.fillStyle="rgba(72,227,183,0.08)",t.lineWidth=2;for(const s of this.obstacles)if(s.kind==="circle"||s.kind==="rect"){const[a,o]=this.domainToScreen(s.x,s.y);if(s.kind==="circle"){const[l]=this.domainToScreen(s.x+s.r,s.y),c=Math.abs(l-a);t.beginPath(),t.arc(a,o,c,0,Math.PI*2),t.fill(),t.stroke()}else{const l=(s.w||0)/2,c=(s.h||0)/2,h=[this.domainToScreen(s.x-l,s.y-c),this.domainToScreen(s.x+l,s.y-c),this.domainToScreen(s.x+l,s.y+c),this.domainToScreen(s.x-l,s.y+c)];t.beginPath(),t.moveTo(h[0][0],h[0][1]);for(let d=1;d<h.length;d++)t.lineTo(h[d][0],h[d][1]);t.closePath(),t.fill(),t.stroke()}}else if(s.kind==="poly"){const a=s.points.map(([o,l])=>this.domainToScreen(o,l));if(a.length){t.beginPath(),t.moveTo(a[0][0],a[0][1]);for(let o=1;o<a.length;o++)t.lineTo(a[o][0],a[o][1]);t.closePath(),t.fill(),t.stroke()}}t.restore()}screenToDomain(t,e){const n=(t-.5)/this.view.zoom+.5+this.view.ofs[0],r=(1-e-.5)/this.view.zoom+.5+this.view.ofs[1];return[n,r]}initOverlay(){for(let o=0;o<16;++o){const l=document.createElement("div");l.className="polyhandle",l.style.display="none",l.style.pointerEvents="auto",l.title="Drag to move vertex. Shift+Click to remove. Double-click to add.",this.overlay.appendChild(l),this.polyHandles.push(l);let c=!1;const h=d=>{const u=this.canvas.getBoundingClientRect();return[(d.clientX-u.left)/u.width,(d.clientY-u.top)/u.height]};l.addEventListener("pointerdown",d=>{if(d.shiftKey){const u=this.obstacles.find(m=>m.id===this.selection.id);u&&u.kind==="poly"&&u.points.length>3&&(u.points.splice(o,1),this.syncObstacles(),this.updateOverlay()),d.stopPropagation(),d.preventDefault();return}c=!0,d.currentTarget.setPointerCapture(d.pointerId),h(d),d.stopPropagation(),d.preventDefault()}),l.addEventListener("pointermove",d=>{if(!c)return;const u=this.obstacles.find(m=>m.id===this.selection.id);if(u&&u.kind==="poly"){const[m,v]=h(d);o<u.points.length&&(u.points[o][0]=m,u.points[o][1]=v,this.syncObstacles(),this.updateOverlay())}d.stopPropagation(),d.preventDefault()}),l.addEventListener("pointerup",d=>{var u,m;c=!1,(m=(u=d.currentTarget).releasePointerCapture)==null||m.call(u,d.pointerId)}),l.addEventListener("dblclick",d=>{const u=this.obstacles.find(m=>m.id===this.selection.id);if(u&&u.kind==="poly"){let m=d;m instanceof PointerEvent||(m=new PointerEvent("pointerdown",d));const[v,x]=h(m);u.points.splice(o+1,0,[v,x]),this.syncObstacles(),this.updateOverlay()}d.stopPropagation(),d.preventDefault()})}const t=document.createElement("div");t.className="handle",t.style.display="none",t.style.pointerEvents="auto",this.overlay.appendChild(t),this.handle=t;let e=!1,n=[0,0];const r=o=>{const l=this.canvas.getBoundingClientRect();return[(o.clientX-l.left)/l.width,(o.clientY-l.top)/l.height]};t.addEventListener("pointerdown",o=>{e=!0,o.currentTarget.setPointerCapture(o.pointerId),n=r(o),o.stopPropagation(),o.preventDefault()});const s=o=>{if(!e||!this.selection.id)return;const[l,c]=r(o),h=l-n[0],d=-(c-n[1]);n=[l,c];const u=this.obstacles.find(m=>m.id===this.selection.id);u&&(u.kind==="circle"?u.r=Math.max(.01,u.r+(Math.abs(h)+Math.abs(d))*.5):u.kind==="rect"&&(u.w=Math.max(.02,u.w+h*2),u.h=Math.max(.02,u.h+d*2)),this.syncObstacles(),this.updateOverlay(),o.stopPropagation(),o.preventDefault())},a=o=>{var l,c;e=!1,(c=(l=o.currentTarget).releasePointerCapture)==null||c.call(l,o.pointerId)};window.addEventListener("pointermove",s),window.addEventListener("pointerup",a)}updateOverlay(){if(!this.selection.id){this.handle.style.display="none",this.polyHandles.forEach(n=>n.style.display="none");return}const t=this.obstacles.find(n=>n.id===this.selection.id);if(!t){this.handle.style.display="none",this.polyHandles.forEach(n=>n.style.display="none");return}const e=this.canvas.getBoundingClientRect();if(t.kind==="circle"){const n=t.x+t.r,r=t.y-t.r,s=this.handle.style;s.display="block",s.left=`${n*e.width-6}px`,s.top=`${(1-r)*e.height-6}px`,this.polyHandles.forEach(a=>a.style.display="none")}else if(t.kind==="rect"){const n=t.x+t.w*.5,r=t.y-t.h*.5,s=this.handle.style;s.display="block",s.left=`${n*e.width-6}px`,s.top=`${(1-r)*e.height-6}px`,this.polyHandles.forEach(a=>a.style.display="none")}else if(t.kind==="poly"){this.handle.style.display="none",t.points.forEach(([n,r],s)=>{const a=this.polyHandles[s];a&&(a.style.display="block",a.style.left=`${n*e.width-6}px`,a.style.top=`${(1-r)*e.height-6}px`)});for(let n=t.points.length;n<this.polyHandles.length;++n)this.polyHandles[n].style.display="none"}}rotateSelected(t){if(!this.selection.id)return;const e=this.obstacles.find(n=>n.id===this.selection.id);e&&e.kind==="rect"&&(e.rot=(e.rot||0)+t,this.syncObstacles(),this.updateOverlay())}addCircleAt(t,e,n){this.obstacles.push({id:Sn(),kind:"circle",x:t,y:e,w:n*2,h:n*2,r:n,rot:0}),this.syncObstacles()}addRectAt(t,e,n,r,s=0){this.obstacles.push({id:Sn(),kind:"rect",x:t,y:e,w:n,h:r,r:0,rot:s}),this.syncObstacles()}saveScene(){return JSON.stringify({obstacles:this.obstacles,params:{N:this.N,dt:this.dt,nu:this.nu,rho:this.rho,Uin:this.Uin,pressureScale:this.pressureScale,licStep:this.licStep,licContrast:this.licContrast,vortConf:this.vortConf}})}loadScene(t){try{const n=JSON.parse(t);n.params&&(this.N=n.params.N??this.N,this.dt=n.params.dt??this.dt,this.nu=n.params.nu??this.nu,this.rho=n.params.rho??this.rho,this.Uin=n.params.Uin??this.Uin,this.rebuild()),Array.isArray(n.obstacles)&&(this.obstacles=n.obstacles.map(r=>r.kind==="poly"&&r.points&&typeof r.points[0]=="number"?{...r,points:e(r.points,2)}:r),n.params&&(n.params.pressureScale!=null&&this.setPressureScale(n.params.pressureScale),n.params.licStep!=null&&this.setLicStep(n.params.licStep),n.params.licContrast!=null&&this.setLicContrast(n.params.licContrast),n.params.vortConf!=null&&this.setVorticityConfinement(n.params.vortConf)),this.syncObstacles())}catch{}function e(n,r){return Array.from({length:Math.ceil(n.length/r)},(s,a)=>n.slice(a*r,a*r+r))}}}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ps="160",hl=0,Us=1,dl=2,ha=1,ul=2,nn=3,vn=0,Re=1,sn=2,mn=0,ti=1,Is=2,Ns=3,Fs=4,fl=5,Rn=100,pl=101,ml=102,Os=103,Bs=104,gl=200,_l=201,vl=202,xl=203,ss=204,os=205,Ml=206,Sl=207,yl=208,El=209,Tl=210,bl=211,Al=212,wl=213,Rl=214,Cl=0,Ll=1,Pl=2,rr=3,Dl=4,Ul=5,Il=6,Nl=7,da=0,Fl=1,Ol=2,gn=0,Bl=1,zl=2,kl=3,Vl=4,Gl=5,Hl=6,ua=300,ii=301,ri=302,as=303,ls=304,fr=306,cs=1e3,Ge=1001,hs=1002,Ae=1003,zs=1004,Er=1005,Fe=1006,Wl=1007,Si=1008,_n=1009,Xl=1010,ql=1011,ms=1012,fa=1013,fn=1014,pn=1015,yi=1016,pa=1017,ma=1018,Ln=1020,Yl=1021,He=1023,$l=1024,jl=1025,Pn=1026,si=1027,Kl=1028,ga=1029,Zl=1030,_a=1031,va=1033,Tr=33776,br=33777,Ar=33778,wr=33779,ks=35840,Vs=35841,Gs=35842,Hs=35843,xa=36196,Ws=37492,Xs=37496,qs=37808,Ys=37809,$s=37810,js=37811,Ks=37812,Zs=37813,Js=37814,Qs=37815,to=37816,eo=37817,no=37818,io=37819,ro=37820,so=37821,Rr=36492,oo=36494,ao=36495,Jl=36283,lo=36284,co=36285,ho=36286,Ma=3e3,Dn=3001,Ql=3200,tc=3201,Sa=0,ec=1,Be="",fe="srgb",an="srgb-linear",gs="display-p3",pr="display-p3-linear",sr="linear",Jt="srgb",or="rec709",ar="p3",Nn=7680,uo=519,nc=512,ic=513,rc=514,ya=515,sc=516,oc=517,ac=518,lc=519,fo=35044,po="300 es",ds=1035,on=2e3,lr=2001;class li{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const r=this._listeners[t];if(r!==void 0){const s=r.indexOf(e);s!==-1&&r.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,t);t.target=null}}}const ge=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let mo=1234567;const ei=Math.PI/180,Ei=180/Math.PI;function ci(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(ge[i&255]+ge[i>>8&255]+ge[i>>16&255]+ge[i>>24&255]+"-"+ge[t&255]+ge[t>>8&255]+"-"+ge[t>>16&15|64]+ge[t>>24&255]+"-"+ge[e&63|128]+ge[e>>8&255]+"-"+ge[e>>16&255]+ge[e>>24&255]+ge[n&255]+ge[n>>8&255]+ge[n>>16&255]+ge[n>>24&255]).toLowerCase()}function ve(i,t,e){return Math.max(t,Math.min(e,i))}function _s(i,t){return(i%t+t)%t}function cc(i,t,e,n,r){return n+(i-t)*(r-n)/(e-t)}function hc(i,t,e){return i!==t?(e-i)/(t-i):0}function vi(i,t,e){return(1-e)*i+e*t}function dc(i,t,e,n){return vi(i,t,1-Math.exp(-e*n))}function uc(i,t=1){return t-Math.abs(_s(i,t*2)-t)}function fc(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function pc(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function mc(i,t){return i+Math.floor(Math.random()*(t-i+1))}function gc(i,t){return i+Math.random()*(t-i)}function _c(i){return i*(.5-Math.random())}function vc(i){i!==void 0&&(mo=i);let t=mo+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function xc(i){return i*ei}function Mc(i){return i*Ei}function us(i){return(i&i-1)===0&&i!==0}function Sc(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function cr(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function yc(i,t,e,n,r){const s=Math.cos,a=Math.sin,o=s(e/2),l=a(e/2),c=s((t+n)/2),h=a((t+n)/2),d=s((t-n)/2),u=a((t-n)/2),m=s((n-t)/2),v=a((n-t)/2);switch(r){case"XYX":i.set(o*h,l*d,l*u,o*c);break;case"YZY":i.set(l*u,o*h,l*d,o*c);break;case"ZXZ":i.set(l*d,l*u,o*h,o*c);break;case"XZX":i.set(o*h,l*v,l*m,o*c);break;case"YXY":i.set(l*m,o*h,l*v,o*c);break;case"ZYZ":i.set(l*v,l*m,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Zn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Te(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Cr={DEG2RAD:ei,RAD2DEG:Ei,generateUUID:ci,clamp:ve,euclideanModulo:_s,mapLinear:cc,inverseLerp:hc,lerp:vi,damp:dc,pingpong:uc,smoothstep:fc,smootherstep:pc,randInt:mc,randFloat:gc,randFloatSpread:_c,seededRandom:vc,degToRad:xc,radToDeg:Mc,isPowerOfTwo:us,ceilPowerOfTwo:Sc,floorPowerOfTwo:cr,setQuaternionFromProperEuler:yc,normalize:Te,denormalize:Zn};class Ht{constructor(t=0,e=0){Ht.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6],this.y=r[1]*e+r[4]*n+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(ve(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),r=Math.sin(e),s=this.x-t.x,a=this.y-t.y;return this.x=s*n-a*r+t.x,this.y=s*r+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class zt{constructor(t,e,n,r,s,a,o,l,c){zt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,r,s,a,o,l,c)}set(t,e,n,r,s,a,o,l,c){const h=this.elements;return h[0]=t,h[1]=r,h[2]=o,h[3]=e,h[4]=s,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,r=e.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],m=n[5],v=n[8],x=r[0],p=r[3],f=r[6],g=r[1],_=r[4],E=r[7],C=r[2],b=r[5],w=r[8];return s[0]=a*x+o*g+l*C,s[3]=a*p+o*_+l*b,s[6]=a*f+o*E+l*w,s[1]=c*x+h*g+d*C,s[4]=c*p+h*_+d*b,s[7]=c*f+h*E+d*w,s[2]=u*x+m*g+v*C,s[5]=u*p+m*_+v*b,s[8]=u*f+m*E+v*w,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*s*h+n*o*l+r*s*c-r*a*l}invert(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=h*a-o*c,u=o*l-h*s,m=c*s-a*l,v=e*d+n*u+r*m;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/v;return t[0]=d*x,t[1]=(r*c-h*n)*x,t[2]=(o*n-r*a)*x,t[3]=u*x,t[4]=(h*e-r*l)*x,t[5]=(r*s-o*e)*x,t[6]=m*x,t[7]=(n*l-c*e)*x,t[8]=(a*e-n*s)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-r*c,r*l,-r*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Lr.makeScale(t,e)),this}rotate(t){return this.premultiply(Lr.makeRotation(-t)),this}translate(t,e){return this.premultiply(Lr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let r=0;r<9;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Lr=new zt;function Ea(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function hr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Ec(){const i=hr("canvas");return i.style.display="block",i}const go={};function xi(i){i in go||(go[i]=!0,console.warn(i))}const _o=new zt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),vo=new zt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Ri={[an]:{transfer:sr,primaries:or,toReference:i=>i,fromReference:i=>i},[fe]:{transfer:Jt,primaries:or,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[pr]:{transfer:sr,primaries:ar,toReference:i=>i.applyMatrix3(vo),fromReference:i=>i.applyMatrix3(_o)},[gs]:{transfer:Jt,primaries:ar,toReference:i=>i.convertSRGBToLinear().applyMatrix3(vo),fromReference:i=>i.applyMatrix3(_o).convertLinearToSRGB()}},Tc=new Set([an,pr]),Yt={enabled:!0,_workingColorSpace:an,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!Tc.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,t,e){if(this.enabled===!1||t===e||!t||!e)return i;const n=Ri[t].toReference,r=Ri[e].fromReference;return r(n(i))},fromWorkingColorSpace:function(i,t){return this.convert(i,this._workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this._workingColorSpace)},getPrimaries:function(i){return Ri[i].primaries},getTransfer:function(i){return i===Be?sr:Ri[i].transfer}};function ni(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Pr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Fn;class Ta{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Fn===void 0&&(Fn=hr("canvas")),Fn.width=t.width,Fn.height=t.height;const n=Fn.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Fn}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=hr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const r=n.getImageData(0,0,t.width,t.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=ni(s[a]/255)*255;return n.putImageData(r,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(ni(e[n]/255)*255):e[n]=ni(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let bc=0;class ba{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:bc++}),this.uuid=ci(),this.data=t,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Dr(r[a].image)):s.push(Dr(r[a]))}else s=Dr(r);n.url=s}return e||(t.images[this.uuid]=n),n}}function Dr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Ta.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Ac=0;class Ue extends li{constructor(t=Ue.DEFAULT_IMAGE,e=Ue.DEFAULT_MAPPING,n=Ge,r=Ge,s=Fe,a=Si,o=He,l=_n,c=Ue.DEFAULT_ANISOTROPY,h=Be){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ac++}),this.uuid=ci(),this.name="",this.source=new ba(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ht(0,0),this.repeat=new Ht(1,1),this.center=new Ht(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new zt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(xi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===Dn?fe:Be),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==ua)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case cs:t.x=t.x-Math.floor(t.x);break;case Ge:t.x=t.x<0?0:1;break;case hs:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case cs:t.y=t.y-Math.floor(t.y);break;case Ge:t.y=t.y<0?0:1;break;case hs:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return xi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===fe?Dn:Ma}set encoding(t){xi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=t===Dn?fe:Be}}Ue.DEFAULT_IMAGE=null;Ue.DEFAULT_MAPPING=ua;Ue.DEFAULT_ANISOTROPY=1;class ue{constructor(t=0,e=0,n=0,r=1){ue.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,r){return this.x=t,this.y=e,this.z=n,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,r=this.z,s=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*e+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*e+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*e+a[7]*n+a[11]*r+a[15]*s,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,r,s;const l=t.elements,c=l[0],h=l[4],d=l[8],u=l[1],m=l[5],v=l[9],x=l[2],p=l[6],f=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-x)<.01&&Math.abs(v-p)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+x)<.1&&Math.abs(v+p)<.1&&Math.abs(c+m+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const _=(c+1)/2,E=(m+1)/2,C=(f+1)/2,b=(h+u)/4,w=(d+x)/4,W=(v+p)/4;return _>E&&_>C?_<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(_),r=b/n,s=w/n):E>C?E<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(E),n=b/r,s=W/r):C<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(C),n=w/s,r=W/s),this.set(n,r,s,e),this}let g=Math.sqrt((p-v)*(p-v)+(d-x)*(d-x)+(u-h)*(u-h));return Math.abs(g)<.001&&(g=1),this.x=(p-v)/g,this.y=(d-x)/g,this.z=(u-h)/g,this.w=Math.acos((c+m+f-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class wc extends li{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ue(0,0,t,e),this.scissorTest=!1,this.viewport=new ue(0,0,t,e);const r={width:t,height:e,depth:1};n.encoding!==void 0&&(xi("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Dn?fe:Be),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Fe,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new Ue(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(t,e,n=1){(this.width!==t||this.height!==e||this.depth!==n)&&(this.width=t,this.height=e,this.depth=n,this.texture.image.width=t,this.texture.image.height=e,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.texture=t.texture.clone(),this.texture.isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new ba(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Un extends wc{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Aa extends Ue{constructor(t=null,e=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=Ae,this.minFilter=Ae,this.wrapR=Ge,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Rc extends Ue{constructor(t=null,e=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=Ae,this.minFilter=Ae,this.wrapR=Ge,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ti{constructor(t=0,e=0,n=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=r}static slerpFlat(t,e,n,r,s,a,o){let l=n[r+0],c=n[r+1],h=n[r+2],d=n[r+3];const u=s[a+0],m=s[a+1],v=s[a+2],x=s[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d;return}if(o===1){t[e+0]=u,t[e+1]=m,t[e+2]=v,t[e+3]=x;return}if(d!==x||l!==u||c!==m||h!==v){let p=1-o;const f=l*u+c*m+h*v+d*x,g=f>=0?1:-1,_=1-f*f;if(_>Number.EPSILON){const C=Math.sqrt(_),b=Math.atan2(C,f*g);p=Math.sin(p*b)/C,o=Math.sin(o*b)/C}const E=o*g;if(l=l*p+u*E,c=c*p+m*E,h=h*p+v*E,d=d*p+x*E,p===1-o){const C=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=C,c*=C,h*=C,d*=C}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,r,s,a){const o=n[r],l=n[r+1],c=n[r+2],h=n[r+3],d=s[a],u=s[a+1],m=s[a+2],v=s[a+3];return t[e]=o*v+h*d+l*m-c*u,t[e+1]=l*v+h*u+c*d-o*m,t[e+2]=c*v+h*m+o*u-l*d,t[e+3]=h*v-o*d-l*u-c*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,r){return this._x=t,this._y=e,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,r=t._y,s=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(r/2),d=o(s/2),u=l(n/2),m=l(r/2),v=l(s/2);switch(a){case"XYZ":this._x=u*h*d+c*m*v,this._y=c*m*d-u*h*v,this._z=c*h*v+u*m*d,this._w=c*h*d-u*m*v;break;case"YXZ":this._x=u*h*d+c*m*v,this._y=c*m*d-u*h*v,this._z=c*h*v-u*m*d,this._w=c*h*d+u*m*v;break;case"ZXY":this._x=u*h*d-c*m*v,this._y=c*m*d+u*h*v,this._z=c*h*v+u*m*d,this._w=c*h*d-u*m*v;break;case"ZYX":this._x=u*h*d-c*m*v,this._y=c*m*d+u*h*v,this._z=c*h*v-u*m*d,this._w=c*h*d+u*m*v;break;case"YZX":this._x=u*h*d+c*m*v,this._y=c*m*d+u*h*v,this._z=c*h*v-u*m*d,this._w=c*h*d-u*m*v;break;case"XZY":this._x=u*h*d-c*m*v,this._y=c*m*d-u*h*v,this._z=c*h*v+u*m*d,this._w=c*h*d+u*m*v;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,r=Math.sin(n);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],r=e[4],s=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],d=e[10],u=n+o+d;if(u>0){const m=.5/Math.sqrt(u+1);this._w=.25/m,this._x=(h-l)*m,this._y=(s-c)*m,this._z=(a-r)*m}else if(n>o&&n>d){const m=2*Math.sqrt(1+n-o-d);this._w=(h-l)/m,this._x=.25*m,this._y=(r+a)/m,this._z=(s+c)/m}else if(o>d){const m=2*Math.sqrt(1+o-n-d);this._w=(s-c)/m,this._x=(r+a)/m,this._y=.25*m,this._z=(l+h)/m}else{const m=2*Math.sqrt(1+d-n-o);this._w=(a-r)/m,this._x=(s+c)/m,this._y=(l+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ve(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const r=Math.min(1,e/n);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,r=t._y,s=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+r*c-s*l,this._y=r*h+a*l+s*o-n*c,this._z=s*h+a*c+n*l-r*o,this._w=a*h-n*o-r*l-s*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,r=this._y,s=this._z,a=this._w;let o=a*t._w+n*t._x+r*t._y+s*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=r,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const m=1-e;return this._w=m*a+e*this._w,this._x=m*n+e*this._x,this._y=m*r+e*this._y,this._z=m*s+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),d=Math.sin((1-e)*h)/c,u=Math.sin(e*h)/c;return this._w=a*d+this._w*u,this._x=n*d+this._x*u,this._y=r*d+this._y*u,this._z=s*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=Math.random(),e=Math.sqrt(1-t),n=Math.sqrt(t),r=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(e*Math.cos(r),n*Math.sin(s),n*Math.cos(s),e*Math.sin(r))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class D{constructor(t=0,e=0,n=0){D.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(xo.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(xo.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*r,this.y=s[1]*e+s[4]*n+s[7]*r,this.z=s[2]*e+s[5]*n+s[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,r=this.z,s=t.elements,a=1/(s[3]*e+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*e+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*e+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,r=this.z,s=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*r-o*n),h=2*(o*e-s*r),d=2*(s*n-a*e);return this.x=e+l*c+a*d-o*h,this.y=n+l*h+o*c-s*d,this.z=r+l*d+s*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*r,this.y=s[1]*e+s[5]*n+s[9]*r,this.z=s[2]*e+s[6]*n+s[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,r=t.y,s=t.z,a=e.x,o=e.y,l=e.z;return this.x=r*l-s*o,this.y=s*a-n*l,this.z=n*o-r*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Ur.copy(this).projectOnVector(t),this.sub(Ur)}reflect(t){return this.sub(Ur.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(ve(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,r=this.z-t.z;return e*e+n*n+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const r=Math.sin(e)*t;return this.x=r*Math.sin(n),this.y=Math.cos(e)*t,this.z=r*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=(Math.random()-.5)*2,e=Math.random()*Math.PI*2,n=Math.sqrt(1-t**2);return this.x=n*Math.cos(e),this.y=n*Math.sin(e),this.z=t,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ur=new D,xo=new Ti;class bi{constructor(t=new D(1/0,1/0,1/0),e=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(ze.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(ze.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=ze.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,ze):ze.fromBufferAttribute(s,a),ze.applyMatrix4(t.matrixWorld),this.expandByPoint(ze);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ci.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ci.copy(n.boundingBox)),Ci.applyMatrix4(t.matrixWorld),this.union(Ci)}const r=t.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,ze),ze.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(pi),Li.subVectors(this.max,pi),On.subVectors(t.a,pi),Bn.subVectors(t.b,pi),zn.subVectors(t.c,pi),ln.subVectors(Bn,On),cn.subVectors(zn,Bn),yn.subVectors(On,zn);let e=[0,-ln.z,ln.y,0,-cn.z,cn.y,0,-yn.z,yn.y,ln.z,0,-ln.x,cn.z,0,-cn.x,yn.z,0,-yn.x,-ln.y,ln.x,0,-cn.y,cn.x,0,-yn.y,yn.x,0];return!Ir(e,On,Bn,zn,Li)||(e=[1,0,0,0,1,0,0,0,1],!Ir(e,On,Bn,zn,Li))?!1:(Pi.crossVectors(ln,cn),e=[Pi.x,Pi.y,Pi.z],Ir(e,On,Bn,zn,Li))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,ze).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(ze).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ze[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ze[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ze[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ze[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ze[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ze[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ze[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ze[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ze),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Ze=[new D,new D,new D,new D,new D,new D,new D,new D],ze=new D,Ci=new bi,On=new D,Bn=new D,zn=new D,ln=new D,cn=new D,yn=new D,pi=new D,Li=new D,Pi=new D,En=new D;function Ir(i,t,e,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){En.fromArray(i,s);const o=r.x*Math.abs(En.x)+r.y*Math.abs(En.y)+r.z*Math.abs(En.z),l=t.dot(En),c=e.dot(En),h=n.dot(En);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const Cc=new bi,mi=new D,Nr=new D;class mr{constructor(t=new D,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Cc.setFromPoints(t).getCenter(n);let r=0;for(let s=0,a=t.length;s<a;s++)r=Math.max(r,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;mi.subVectors(t,this.center);const e=mi.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),r=(n-this.radius)*.5;this.center.addScaledVector(mi,r/n),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Nr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(mi.copy(t.center).add(Nr)),this.expandByPoint(mi.copy(t.center).sub(Nr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Je=new D,Fr=new D,Di=new D,hn=new D,Or=new D,Ui=new D,Br=new D;class wa{constructor(t=new D,e=new D(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Je)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Je.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Je.copy(this.origin).addScaledVector(this.direction,e),Je.distanceToSquared(t))}distanceSqToSegment(t,e,n,r){Fr.copy(t).add(e).multiplyScalar(.5),Di.copy(e).sub(t).normalize(),hn.copy(this.origin).sub(Fr);const s=t.distanceTo(e)*.5,a=-this.direction.dot(Di),o=hn.dot(this.direction),l=-hn.dot(Di),c=hn.lengthSq(),h=Math.abs(1-a*a);let d,u,m,v;if(h>0)if(d=a*l-o,u=a*o-l,v=s*h,d>=0)if(u>=-v)if(u<=v){const x=1/h;d*=x,u*=x,m=d*(d+a*u+2*o)+u*(a*d+u+2*l)+c}else u=s,d=Math.max(0,-(a*u+o)),m=-d*d+u*(u+2*l)+c;else u=-s,d=Math.max(0,-(a*u+o)),m=-d*d+u*(u+2*l)+c;else u<=-v?(d=Math.max(0,-(-a*s+o)),u=d>0?-s:Math.min(Math.max(-s,-l),s),m=-d*d+u*(u+2*l)+c):u<=v?(d=0,u=Math.min(Math.max(-s,-l),s),m=u*(u+2*l)+c):(d=Math.max(0,-(a*s+o)),u=d>0?s:Math.min(Math.max(-s,-l),s),m=-d*d+u*(u+2*l)+c);else u=a>0?-s:s,d=Math.max(0,-(a*u+o)),m=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(Fr).addScaledVector(Di,u),m}intersectSphere(t,e){Je.subVectors(t.center,this.origin);const n=Je.dot(this.direction),r=Je.dot(Je)-n*n,s=t.radius*t.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,r,s,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(t.min.x-u.x)*c,r=(t.max.x-u.x)*c):(n=(t.max.x-u.x)*c,r=(t.min.x-u.x)*c),h>=0?(s=(t.min.y-u.y)*h,a=(t.max.y-u.y)*h):(s=(t.max.y-u.y)*h,a=(t.min.y-u.y)*h),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),d>=0?(o=(t.min.z-u.z)*d,l=(t.max.z-u.z)*d):(o=(t.max.z-u.z)*d,l=(t.min.z-u.z)*d),n>l||o>r)||((o>n||n!==n)&&(n=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,e)}intersectsBox(t){return this.intersectBox(t,Je)!==null}intersectTriangle(t,e,n,r,s){Or.subVectors(e,t),Ui.subVectors(n,t),Br.crossVectors(Or,Ui);let a=this.direction.dot(Br),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;hn.subVectors(this.origin,t);const l=o*this.direction.dot(Ui.crossVectors(hn,Ui));if(l<0)return null;const c=o*this.direction.dot(Or.cross(hn));if(c<0||l+c>a)return null;const h=-o*hn.dot(Br);return h<0?null:this.at(h/a,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class oe{constructor(t,e,n,r,s,a,o,l,c,h,d,u,m,v,x,p){oe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,r,s,a,o,l,c,h,d,u,m,v,x,p)}set(t,e,n,r,s,a,o,l,c,h,d,u,m,v,x,p){const f=this.elements;return f[0]=t,f[4]=e,f[8]=n,f[12]=r,f[1]=s,f[5]=a,f[9]=o,f[13]=l,f[2]=c,f[6]=h,f[10]=d,f[14]=u,f[3]=m,f[7]=v,f[11]=x,f[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new oe().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,r=1/kn.setFromMatrixColumn(t,0).length(),s=1/kn.setFromMatrixColumn(t,1).length(),a=1/kn.setFromMatrixColumn(t,2).length();return e[0]=n[0]*r,e[1]=n[1]*r,e[2]=n[2]*r,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,r=t.y,s=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(r),c=Math.sin(r),h=Math.cos(s),d=Math.sin(s);if(t.order==="XYZ"){const u=a*h,m=a*d,v=o*h,x=o*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=m+v*c,e[5]=u-x*c,e[9]=-o*l,e[2]=x-u*c,e[6]=v+m*c,e[10]=a*l}else if(t.order==="YXZ"){const u=l*h,m=l*d,v=c*h,x=c*d;e[0]=u+x*o,e[4]=v*o-m,e[8]=a*c,e[1]=a*d,e[5]=a*h,e[9]=-o,e[2]=m*o-v,e[6]=x+u*o,e[10]=a*l}else if(t.order==="ZXY"){const u=l*h,m=l*d,v=c*h,x=c*d;e[0]=u-x*o,e[4]=-a*d,e[8]=v+m*o,e[1]=m+v*o,e[5]=a*h,e[9]=x-u*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const u=a*h,m=a*d,v=o*h,x=o*d;e[0]=l*h,e[4]=v*c-m,e[8]=u*c+x,e[1]=l*d,e[5]=x*c+u,e[9]=m*c-v,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const u=a*l,m=a*c,v=o*l,x=o*c;e[0]=l*h,e[4]=x-u*d,e[8]=v*d+m,e[1]=d,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=m*d+v,e[10]=u-x*d}else if(t.order==="XZY"){const u=a*l,m=a*c,v=o*l,x=o*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=u*d+x,e[5]=a*h,e[9]=m*d-v,e[2]=v*d-m,e[6]=o*h,e[10]=x*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Lc,t,Pc)}lookAt(t,e,n){const r=this.elements;return Le.subVectors(t,e),Le.lengthSq()===0&&(Le.z=1),Le.normalize(),dn.crossVectors(n,Le),dn.lengthSq()===0&&(Math.abs(n.z)===1?Le.x+=1e-4:Le.z+=1e-4,Le.normalize(),dn.crossVectors(n,Le)),dn.normalize(),Ii.crossVectors(Le,dn),r[0]=dn.x,r[4]=Ii.x,r[8]=Le.x,r[1]=dn.y,r[5]=Ii.y,r[9]=Le.y,r[2]=dn.z,r[6]=Ii.z,r[10]=Le.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,r=e.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],m=n[13],v=n[2],x=n[6],p=n[10],f=n[14],g=n[3],_=n[7],E=n[11],C=n[15],b=r[0],w=r[4],W=r[8],y=r[12],A=r[1],G=r[5],V=r[9],J=r[13],L=r[2],N=r[6],k=r[10],Y=r[14],H=r[3],X=r[7],q=r[11],et=r[15];return s[0]=a*b+o*A+l*L+c*H,s[4]=a*w+o*G+l*N+c*X,s[8]=a*W+o*V+l*k+c*q,s[12]=a*y+o*J+l*Y+c*et,s[1]=h*b+d*A+u*L+m*H,s[5]=h*w+d*G+u*N+m*X,s[9]=h*W+d*V+u*k+m*q,s[13]=h*y+d*J+u*Y+m*et,s[2]=v*b+x*A+p*L+f*H,s[6]=v*w+x*G+p*N+f*X,s[10]=v*W+x*V+p*k+f*q,s[14]=v*y+x*J+p*Y+f*et,s[3]=g*b+_*A+E*L+C*H,s[7]=g*w+_*G+E*N+C*X,s[11]=g*W+_*V+E*k+C*q,s[15]=g*y+_*J+E*Y+C*et,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],r=t[8],s=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],d=t[6],u=t[10],m=t[14],v=t[3],x=t[7],p=t[11],f=t[15];return v*(+s*l*d-r*c*d-s*o*u+n*c*u+r*o*m-n*l*m)+x*(+e*l*m-e*c*u+s*a*u-r*a*m+r*c*h-s*l*h)+p*(+e*c*d-e*o*m-s*a*d+n*a*m+s*o*h-n*c*h)+f*(-r*o*h-e*l*d+e*o*u+r*a*d-n*a*u+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=t[9],u=t[10],m=t[11],v=t[12],x=t[13],p=t[14],f=t[15],g=d*p*c-x*u*c+x*l*m-o*p*m-d*l*f+o*u*f,_=v*u*c-h*p*c-v*l*m+a*p*m+h*l*f-a*u*f,E=h*x*c-v*d*c+v*o*m-a*x*m-h*o*f+a*d*f,C=v*d*l-h*x*l-v*o*u+a*x*u+h*o*p-a*d*p,b=e*g+n*_+r*E+s*C;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/b;return t[0]=g*w,t[1]=(x*u*s-d*p*s-x*r*m+n*p*m+d*r*f-n*u*f)*w,t[2]=(o*p*s-x*l*s+x*r*c-n*p*c-o*r*f+n*l*f)*w,t[3]=(d*l*s-o*u*s-d*r*c+n*u*c+o*r*m-n*l*m)*w,t[4]=_*w,t[5]=(h*p*s-v*u*s+v*r*m-e*p*m-h*r*f+e*u*f)*w,t[6]=(v*l*s-a*p*s-v*r*c+e*p*c+a*r*f-e*l*f)*w,t[7]=(a*u*s-h*l*s+h*r*c-e*u*c-a*r*m+e*l*m)*w,t[8]=E*w,t[9]=(v*d*s-h*x*s-v*n*m+e*x*m+h*n*f-e*d*f)*w,t[10]=(a*x*s-v*o*s+v*n*c-e*x*c-a*n*f+e*o*f)*w,t[11]=(h*o*s-a*d*s-h*n*c+e*d*c+a*n*m-e*o*m)*w,t[12]=C*w,t[13]=(h*x*r-v*d*r+v*n*u-e*x*u-h*n*p+e*d*p)*w,t[14]=(v*o*r-a*x*r-v*n*l+e*x*l+a*n*p-e*o*p)*w,t[15]=(a*d*r-h*o*r+h*n*l-e*d*l-a*n*u+e*o*u)*w,this}scale(t){const e=this.elements,n=t.x,r=t.y,s=t.z;return e[0]*=n,e[4]*=r,e[8]*=s,e[1]*=n,e[5]*=r,e[9]*=s,e[2]*=n,e[6]*=r,e[10]*=s,e[3]*=n,e[7]*=r,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,r))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),r=Math.sin(e),s=1-n,a=t.x,o=t.y,l=t.z,c=s*a,h=s*o;return this.set(c*a+n,c*o-r*l,c*l+r*o,0,c*o+r*l,h*o+n,h*l-r*a,0,c*l-r*o,h*l+r*a,s*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,r,s,a){return this.set(1,n,s,0,t,1,a,0,e,r,1,0,0,0,0,1),this}compose(t,e,n){const r=this.elements,s=e._x,a=e._y,o=e._z,l=e._w,c=s+s,h=a+a,d=o+o,u=s*c,m=s*h,v=s*d,x=a*h,p=a*d,f=o*d,g=l*c,_=l*h,E=l*d,C=n.x,b=n.y,w=n.z;return r[0]=(1-(x+f))*C,r[1]=(m+E)*C,r[2]=(v-_)*C,r[3]=0,r[4]=(m-E)*b,r[5]=(1-(u+f))*b,r[6]=(p+g)*b,r[7]=0,r[8]=(v+_)*w,r[9]=(p-g)*w,r[10]=(1-(u+x))*w,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,n){const r=this.elements;let s=kn.set(r[0],r[1],r[2]).length();const a=kn.set(r[4],r[5],r[6]).length(),o=kn.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),t.x=r[12],t.y=r[13],t.z=r[14],ke.copy(this);const c=1/s,h=1/a,d=1/o;return ke.elements[0]*=c,ke.elements[1]*=c,ke.elements[2]*=c,ke.elements[4]*=h,ke.elements[5]*=h,ke.elements[6]*=h,ke.elements[8]*=d,ke.elements[9]*=d,ke.elements[10]*=d,e.setFromRotationMatrix(ke),n.x=s,n.y=a,n.z=o,this}makePerspective(t,e,n,r,s,a,o=on){const l=this.elements,c=2*s/(e-t),h=2*s/(n-r),d=(e+t)/(e-t),u=(n+r)/(n-r);let m,v;if(o===on)m=-(a+s)/(a-s),v=-2*a*s/(a-s);else if(o===lr)m=-a/(a-s),v=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,r,s,a,o=on){const l=this.elements,c=1/(e-t),h=1/(n-r),d=1/(a-s),u=(e+t)*c,m=(n+r)*h;let v,x;if(o===on)v=(a+s)*d,x=-2*d;else if(o===lr)v=s*d,x=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-u,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-m,l[2]=0,l[6]=0,l[10]=x,l[14]=-v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let r=0;r<16;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const kn=new D,ke=new oe,Lc=new D(0,0,0),Pc=new D(1,1,1),dn=new D,Ii=new D,Le=new D,Mo=new oe,So=new Ti;class gr{constructor(t=0,e=0,n=0,r=gr.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,r=this._order){return this._x=t,this._y=e,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const r=t.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],h=r[9],d=r[2],u=r[6],m=r[10];switch(e){case"XYZ":this._y=Math.asin(ve(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ve(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(ve(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,m),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-ve(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,m),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(ve(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-ve(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Mo.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Mo,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return So.setFromEuler(this),this.setFromQuaternion(So,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}gr.DEFAULT_ORDER="XYZ";class Ra{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Dc=0;const yo=new D,Vn=new Ti,Qe=new oe,Ni=new D,gi=new D,Uc=new D,Ic=new Ti,Eo=new D(1,0,0),To=new D(0,1,0),bo=new D(0,0,1),Nc={type:"added"},Fc={type:"removed"};class pe extends li{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Dc++}),this.uuid=ci(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=pe.DEFAULT_UP.clone();const t=new D,e=new gr,n=new Ti,r=new D(1,1,1);function s(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new oe},normalMatrix:{value:new zt}}),this.matrix=new oe,this.matrixWorld=new oe,this.matrixAutoUpdate=pe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=pe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ra,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Vn.setFromAxisAngle(t,e),this.quaternion.multiply(Vn),this}rotateOnWorldAxis(t,e){return Vn.setFromAxisAngle(t,e),this.quaternion.premultiply(Vn),this}rotateX(t){return this.rotateOnAxis(Eo,t)}rotateY(t){return this.rotateOnAxis(To,t)}rotateZ(t){return this.rotateOnAxis(bo,t)}translateOnAxis(t,e){return yo.copy(t).applyQuaternion(this.quaternion),this.position.add(yo.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Eo,t)}translateY(t){return this.translateOnAxis(To,t)}translateZ(t){return this.translateOnAxis(bo,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Qe.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Ni.copy(t):Ni.set(t,e,n);const r=this.parent;this.updateWorldMatrix(!0,!1),gi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Qe.lookAt(gi,Ni,this.up):Qe.lookAt(Ni,gi,this.up),this.quaternion.setFromRotationMatrix(Qe),r&&(Qe.extractRotation(r.matrixWorld),Vn.setFromRotationMatrix(Qe),this.quaternion.premultiply(Vn.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.parent!==null&&t.parent.remove(t),t.parent=this,this.children.push(t),t.dispatchEvent(Nc)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Fc)),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Qe.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Qe.multiply(t.parent.matrixWorld)),t.applyMatrix4(Qe),this.add(t),t.updateWorldMatrix(!1,!0),this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,r=this.children.length;n<r;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gi,t,Uc),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gi,Ic,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,r=e.length;n<r;n++){const s=e[n];(s.matrixWorldAutoUpdate===!0||t===!0)&&s.updateMatrixWorld(t)}}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++){const o=r[s];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(t),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];s(t.shapes,d)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(t.materials,this.material[l]));r.material=o}else r.material=s(t.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),d=a(t.shapes),u=a(t.skeletons),m=a(t.animations),v=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),m.length>0&&(n.animations=m),v.length>0&&(n.nodes=v)}return n.object=r,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const r=t.children[n];this.add(r.clone())}return this}}pe.DEFAULT_UP=new D(0,1,0);pe.DEFAULT_MATRIX_AUTO_UPDATE=!0;pe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Ve=new D,tn=new D,zr=new D,en=new D,Gn=new D,Hn=new D,Ao=new D,kr=new D,Vr=new D,Gr=new D;let Fi=!1;class Oe{constructor(t=new D,e=new D,n=new D){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,r){r.subVectors(n,e),Ve.subVectors(t,e),r.cross(Ve);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(t,e,n,r,s){Ve.subVectors(r,e),tn.subVectors(n,e),zr.subVectors(t,e);const a=Ve.dot(Ve),o=Ve.dot(tn),l=Ve.dot(zr),c=tn.dot(tn),h=tn.dot(zr),d=a*c-o*o;if(d===0)return s.set(0,0,0),null;const u=1/d,m=(c*l-o*h)*u,v=(a*h-o*l)*u;return s.set(1-m-v,v,m)}static containsPoint(t,e,n,r){return this.getBarycoord(t,e,n,r,en)===null?!1:en.x>=0&&en.y>=0&&en.x+en.y<=1}static getUV(t,e,n,r,s,a,o,l){return Fi===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Fi=!0),this.getInterpolation(t,e,n,r,s,a,o,l)}static getInterpolation(t,e,n,r,s,a,o,l){return this.getBarycoord(t,e,n,r,en)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,en.x),l.addScaledVector(a,en.y),l.addScaledVector(o,en.z),l)}static isFrontFacing(t,e,n,r){return Ve.subVectors(n,e),tn.subVectors(t,e),Ve.cross(tn).dot(r)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,r){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,n,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Ve.subVectors(this.c,this.b),tn.subVectors(this.a,this.b),Ve.cross(tn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Oe.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Oe.getBarycoord(t,this.a,this.b,this.c,e)}getUV(t,e,n,r,s){return Fi===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Fi=!0),Oe.getInterpolation(t,this.a,this.b,this.c,e,n,r,s)}getInterpolation(t,e,n,r,s){return Oe.getInterpolation(t,this.a,this.b,this.c,e,n,r,s)}containsPoint(t){return Oe.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Oe.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,r=this.b,s=this.c;let a,o;Gn.subVectors(r,n),Hn.subVectors(s,n),kr.subVectors(t,n);const l=Gn.dot(kr),c=Hn.dot(kr);if(l<=0&&c<=0)return e.copy(n);Vr.subVectors(t,r);const h=Gn.dot(Vr),d=Hn.dot(Vr);if(h>=0&&d<=h)return e.copy(r);const u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(Gn,a);Gr.subVectors(t,s);const m=Gn.dot(Gr),v=Hn.dot(Gr);if(v>=0&&m<=v)return e.copy(s);const x=m*c-l*v;if(x<=0&&c>=0&&v<=0)return o=c/(c-v),e.copy(n).addScaledVector(Hn,o);const p=h*v-m*d;if(p<=0&&d-h>=0&&m-v>=0)return Ao.subVectors(s,r),o=(d-h)/(d-h+(m-v)),e.copy(r).addScaledVector(Ao,o);const f=1/(p+x+u);return a=x*f,o=u*f,e.copy(n).addScaledVector(Gn,a).addScaledVector(Hn,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Ca={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},un={h:0,s:0,l:0},Oi={h:0,s:0,l:0};function Hr(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Gt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=fe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Yt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,r=Yt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Yt.toWorkingColorSpace(this,r),this}setHSL(t,e,n,r=Yt.workingColorSpace){if(t=_s(t,1),e=ve(e,0,1),n=ve(n,0,1),e===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+e):n+e-n*e,a=2*n-s;this.r=Hr(a,s,t+1/3),this.g=Hr(a,s,t),this.b=Hr(a,s,t-1/3)}return Yt.toWorkingColorSpace(this,r),this}setStyle(t,e=fe){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=fe){const n=Ca[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ni(t.r),this.g=ni(t.g),this.b=ni(t.b),this}copyLinearToSRGB(t){return this.r=Pr(t.r),this.g=Pr(t.g),this.b=Pr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=fe){return Yt.fromWorkingColorSpace(_e.copy(this),t),Math.round(ve(_e.r*255,0,255))*65536+Math.round(ve(_e.g*255,0,255))*256+Math.round(ve(_e.b*255,0,255))}getHexString(t=fe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Yt.workingColorSpace){Yt.fromWorkingColorSpace(_e.copy(this),e);const n=_e.r,r=_e.g,s=_e.b,a=Math.max(n,r,s),o=Math.min(n,r,s);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case n:l=(r-s)/d+(r<s?6:0);break;case r:l=(s-n)/d+2;break;case s:l=(n-r)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Yt.workingColorSpace){return Yt.fromWorkingColorSpace(_e.copy(this),e),t.r=_e.r,t.g=_e.g,t.b=_e.b,t}getStyle(t=fe){Yt.fromWorkingColorSpace(_e.copy(this),t);const e=_e.r,n=_e.g,r=_e.b;return t!==fe?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(t,e,n){return this.getHSL(un),this.setHSL(un.h+t,un.s+e,un.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(un),t.getHSL(Oi);const n=vi(un.h,Oi.h,e),r=vi(un.s,Oi.s,e),s=vi(un.l,Oi.l,e);return this.setHSL(n,r,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,r=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*r,this.g=s[1]*e+s[4]*n+s[7]*r,this.b=s[2]*e+s[5]*n+s[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const _e=new Gt;Gt.NAMES=Ca;let Oc=0;class hi extends li{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Oc++}),this.uuid=ci(),this.name="",this.type="Material",this.blending=ti,this.side=vn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ss,this.blendDst=os,this.blendEquation=Rn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Gt(0,0,0),this.blendAlpha=0,this.depthFunc=rr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=uo,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Nn,this.stencilZFail=Nn,this.stencilZPass=Nn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ti&&(n.blending=this.blending),this.side!==vn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ss&&(n.blendSrc=this.blendSrc),this.blendDst!==os&&(n.blendDst=this.blendDst),this.blendEquation!==Rn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==rr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==uo&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Nn&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Nn&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Nn&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(e){const s=r(t.textures),a=r(t.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const r=e.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class La extends hi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Gt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=da,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const se=new D,Bi=new Ht;class je{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=fo,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=pn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[t+r]=e.array[n+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Bi.fromBufferAttribute(this,e),Bi.applyMatrix3(t),this.setXY(e,Bi.x,Bi.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)se.fromBufferAttribute(this,e),se.applyMatrix3(t),this.setXYZ(e,se.x,se.y,se.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)se.fromBufferAttribute(this,e),se.applyMatrix4(t),this.setXYZ(e,se.x,se.y,se.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)se.fromBufferAttribute(this,e),se.applyNormalMatrix(t),this.setXYZ(e,se.x,se.y,se.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)se.fromBufferAttribute(this,e),se.transformDirection(t),this.setXYZ(e,se.x,se.y,se.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Zn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Te(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Zn(e,this.array)),e}setX(t,e){return this.normalized&&(e=Te(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Zn(e,this.array)),e}setY(t,e){return this.normalized&&(e=Te(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Zn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Te(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Zn(e,this.array)),e}setW(t,e){return this.normalized&&(e=Te(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Te(e,this.array),n=Te(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,r){return t*=this.itemSize,this.normalized&&(e=Te(e,this.array),n=Te(n,this.array),r=Te(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this}setXYZW(t,e,n,r,s){return t*=this.itemSize,this.normalized&&(e=Te(e,this.array),n=Te(n,this.array),r=Te(r,this.array),s=Te(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==fo&&(t.usage=this.usage),t}}class Pa extends je{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Da extends je{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class we extends je{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Bc=0;const Ne=new oe,Wr=new pe,Wn=new D,Pe=new bi,_i=new bi,de=new D;class We extends li{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Bc++}),this.uuid=ci(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Ea(t)?Da:Pa)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new zt().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ne.makeRotationFromQuaternion(t),this.applyMatrix4(Ne),this}rotateX(t){return Ne.makeRotationX(t),this.applyMatrix4(Ne),this}rotateY(t){return Ne.makeRotationY(t),this.applyMatrix4(Ne),this}rotateZ(t){return Ne.makeRotationZ(t),this.applyMatrix4(Ne),this}translate(t,e,n){return Ne.makeTranslation(t,e,n),this.applyMatrix4(Ne),this}scale(t,e,n){return Ne.makeScale(t,e,n),this.applyMatrix4(Ne),this}lookAt(t){return Wr.lookAt(t),Wr.updateMatrix(),this.applyMatrix4(Wr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Wn).negate(),this.translate(Wn.x,Wn.y,Wn.z),this}setFromPoints(t){const e=[];for(let n=0,r=t.length;n<r;n++){const s=t[n];e.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new we(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new bi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,r=e.length;n<r;n++){const s=e[n];Pe.setFromBufferAttribute(s),this.morphTargetsRelative?(de.addVectors(this.boundingBox.min,Pe.min),this.boundingBox.expandByPoint(de),de.addVectors(this.boundingBox.max,Pe.max),this.boundingBox.expandByPoint(de)):(this.boundingBox.expandByPoint(Pe.min),this.boundingBox.expandByPoint(Pe.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new mr);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new D,1/0);return}if(t){const n=this.boundingSphere.center;if(Pe.setFromBufferAttribute(t),e)for(let s=0,a=e.length;s<a;s++){const o=e[s];_i.setFromBufferAttribute(o),this.morphTargetsRelative?(de.addVectors(Pe.min,_i.min),Pe.expandByPoint(de),de.addVectors(Pe.max,_i.max),Pe.expandByPoint(de)):(Pe.expandByPoint(_i.min),Pe.expandByPoint(_i.max))}Pe.getCenter(n);let r=0;for(let s=0,a=t.count;s<a;s++)de.fromBufferAttribute(t,s),r=Math.max(r,n.distanceToSquared(de));if(e)for(let s=0,a=e.length;s<a;s++){const o=e[s],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)de.fromBufferAttribute(o,c),l&&(Wn.fromBufferAttribute(t,c),de.add(Wn)),r=Math.max(r,n.distanceToSquared(de))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.array,r=e.position.array,s=e.normal.array,a=e.uv.array,o=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new je(new Float32Array(4*o),4));const l=this.getAttribute("tangent").array,c=[],h=[];for(let A=0;A<o;A++)c[A]=new D,h[A]=new D;const d=new D,u=new D,m=new D,v=new Ht,x=new Ht,p=new Ht,f=new D,g=new D;function _(A,G,V){d.fromArray(r,A*3),u.fromArray(r,G*3),m.fromArray(r,V*3),v.fromArray(a,A*2),x.fromArray(a,G*2),p.fromArray(a,V*2),u.sub(d),m.sub(d),x.sub(v),p.sub(v);const J=1/(x.x*p.y-p.x*x.y);isFinite(J)&&(f.copy(u).multiplyScalar(p.y).addScaledVector(m,-x.y).multiplyScalar(J),g.copy(m).multiplyScalar(x.x).addScaledVector(u,-p.x).multiplyScalar(J),c[A].add(f),c[G].add(f),c[V].add(f),h[A].add(g),h[G].add(g),h[V].add(g))}let E=this.groups;E.length===0&&(E=[{start:0,count:n.length}]);for(let A=0,G=E.length;A<G;++A){const V=E[A],J=V.start,L=V.count;for(let N=J,k=J+L;N<k;N+=3)_(n[N+0],n[N+1],n[N+2])}const C=new D,b=new D,w=new D,W=new D;function y(A){w.fromArray(s,A*3),W.copy(w);const G=c[A];C.copy(G),C.sub(w.multiplyScalar(w.dot(G))).normalize(),b.crossVectors(W,G);const J=b.dot(h[A])<0?-1:1;l[A*4]=C.x,l[A*4+1]=C.y,l[A*4+2]=C.z,l[A*4+3]=J}for(let A=0,G=E.length;A<G;++A){const V=E[A],J=V.start,L=V.count;for(let N=J,k=J+L;N<k;N+=3)y(n[N+0]),y(n[N+1]),y(n[N+2])}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new je(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,m=n.count;u<m;u++)n.setXYZ(u,0,0,0);const r=new D,s=new D,a=new D,o=new D,l=new D,c=new D,h=new D,d=new D;if(t)for(let u=0,m=t.count;u<m;u+=3){const v=t.getX(u+0),x=t.getX(u+1),p=t.getX(u+2);r.fromBufferAttribute(e,v),s.fromBufferAttribute(e,x),a.fromBufferAttribute(e,p),h.subVectors(a,s),d.subVectors(r,s),h.cross(d),o.fromBufferAttribute(n,v),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,p),o.add(h),l.add(h),c.add(h),n.setXYZ(v,o.x,o.y,o.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let u=0,m=e.count;u<m;u+=3)r.fromBufferAttribute(e,u+0),s.fromBufferAttribute(e,u+1),a.fromBufferAttribute(e,u+2),h.subVectors(a,s),d.subVectors(r,s),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)de.fromBufferAttribute(t,e),de.normalize(),t.setXYZ(e,de.x,de.y,de.z)}toNonIndexed(){function t(o,l){const c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h);let m=0,v=0;for(let x=0,p=l.length;x<p;x++){o.isInterleavedBufferAttribute?m=l[x]*o.data.stride+o.offset:m=l[x]*h;for(let f=0;f<h;f++)u[v++]=c[m++]}return new je(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new We,n=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=t(l,n);e.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let h=0,d=c.length;h<d;h++){const u=c[h],m=t(u,n);l.push(m)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){const m=c[d];h.push(m.toJSON(t.data))}h.length>0&&(r[l]=h,s=!0)}s&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const r=t.attributes;for(const c in r){const h=r[c];this.setAttribute(c,h.clone(e))}const s=t.morphAttributes;for(const c in s){const h=[],d=s[c];for(let u=0,m=d.length;u<m;u++)h.push(d[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,h=a.length;c<h;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const wo=new oe,Tn=new wa,zi=new mr,Ro=new D,Xn=new D,qn=new D,Yn=new D,Xr=new D,ki=new D,Vi=new Ht,Gi=new Ht,Hi=new Ht,Co=new D,Lo=new D,Po=new D,Wi=new D,Xi=new D;class $e extends pe{constructor(t=new We,e=new La){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(t,e){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(r,t);const o=this.morphTargetInfluences;if(s&&o){ki.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=o[l],d=s[l];h!==0&&(Xr.fromBufferAttribute(d,t),a?ki.addScaledVector(Xr,h):ki.addScaledVector(Xr.sub(e),h))}e.add(ki)}return e}raycast(t,e){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),zi.copy(n.boundingSphere),zi.applyMatrix4(s),Tn.copy(t.ray).recast(t.near),!(zi.containsPoint(Tn.origin)===!1&&(Tn.intersectSphere(zi,Ro)===null||Tn.origin.distanceToSquared(Ro)>(t.far-t.near)**2))&&(wo.copy(s).invert(),Tn.copy(t.ray).applyMatrix4(wo),!(n.boundingBox!==null&&Tn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Tn)))}_computeIntersections(t,e,n){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,d=s.attributes.normal,u=s.groups,m=s.drawRange;if(o!==null)if(Array.isArray(a))for(let v=0,x=u.length;v<x;v++){const p=u[v],f=a[p.materialIndex],g=Math.max(p.start,m.start),_=Math.min(o.count,Math.min(p.start+p.count,m.start+m.count));for(let E=g,C=_;E<C;E+=3){const b=o.getX(E),w=o.getX(E+1),W=o.getX(E+2);r=qi(this,f,t,n,c,h,d,b,w,W),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=p.materialIndex,e.push(r))}}else{const v=Math.max(0,m.start),x=Math.min(o.count,m.start+m.count);for(let p=v,f=x;p<f;p+=3){const g=o.getX(p),_=o.getX(p+1),E=o.getX(p+2);r=qi(this,a,t,n,c,h,d,g,_,E),r&&(r.faceIndex=Math.floor(p/3),e.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let v=0,x=u.length;v<x;v++){const p=u[v],f=a[p.materialIndex],g=Math.max(p.start,m.start),_=Math.min(l.count,Math.min(p.start+p.count,m.start+m.count));for(let E=g,C=_;E<C;E+=3){const b=E,w=E+1,W=E+2;r=qi(this,f,t,n,c,h,d,b,w,W),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=p.materialIndex,e.push(r))}}else{const v=Math.max(0,m.start),x=Math.min(l.count,m.start+m.count);for(let p=v,f=x;p<f;p+=3){const g=p,_=p+1,E=p+2;r=qi(this,a,t,n,c,h,d,g,_,E),r&&(r.faceIndex=Math.floor(p/3),e.push(r))}}}}function zc(i,t,e,n,r,s,a,o){let l;if(t.side===Re?l=n.intersectTriangle(a,s,r,!0,o):l=n.intersectTriangle(r,s,a,t.side===vn,o),l===null)return null;Xi.copy(o),Xi.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Xi);return c<e.near||c>e.far?null:{distance:c,point:Xi.clone(),object:i}}function qi(i,t,e,n,r,s,a,o,l,c){i.getVertexPosition(o,Xn),i.getVertexPosition(l,qn),i.getVertexPosition(c,Yn);const h=zc(i,t,e,n,Xn,qn,Yn,Wi);if(h){r&&(Vi.fromBufferAttribute(r,o),Gi.fromBufferAttribute(r,l),Hi.fromBufferAttribute(r,c),h.uv=Oe.getInterpolation(Wi,Xn,qn,Yn,Vi,Gi,Hi,new Ht)),s&&(Vi.fromBufferAttribute(s,o),Gi.fromBufferAttribute(s,l),Hi.fromBufferAttribute(s,c),h.uv1=Oe.getInterpolation(Wi,Xn,qn,Yn,Vi,Gi,Hi,new Ht),h.uv2=h.uv1),a&&(Co.fromBufferAttribute(a,o),Lo.fromBufferAttribute(a,l),Po.fromBufferAttribute(a,c),h.normal=Oe.getInterpolation(Wi,Xn,qn,Yn,Co,Lo,Po,new D),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new D,materialIndex:0};Oe.getNormal(Xn,qn,Yn,d.normal),h.face=d}return h}class di extends We{constructor(t=1,e=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],h=[],d=[];let u=0,m=0;v("z","y","x",-1,-1,n,e,t,a,s,0),v("z","y","x",1,-1,n,e,-t,a,s,1),v("x","z","y",1,1,t,n,e,r,a,2),v("x","z","y",1,-1,t,n,-e,r,a,3),v("x","y","z",1,-1,t,e,n,r,s,4),v("x","y","z",-1,-1,t,e,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new we(c,3)),this.setAttribute("normal",new we(h,3)),this.setAttribute("uv",new we(d,2));function v(x,p,f,g,_,E,C,b,w,W,y){const A=E/w,G=C/W,V=E/2,J=C/2,L=b/2,N=w+1,k=W+1;let Y=0,H=0;const X=new D;for(let q=0;q<k;q++){const et=q*G-J;for(let nt=0;nt<N;nt++){const z=nt*A-V;X[x]=z*g,X[p]=et*_,X[f]=L,c.push(X.x,X.y,X.z),X[x]=0,X[p]=0,X[f]=b>0?1:-1,h.push(X.x,X.y,X.z),d.push(nt/w),d.push(1-q/W),Y+=1}}for(let q=0;q<W;q++)for(let et=0;et<w;et++){const nt=u+et+N*q,z=u+et+N*(q+1),$=u+(et+1)+N*(q+1),st=u+(et+1)+N*q;l.push(nt,z,st),l.push(z,$,st),H+=6}o.addGroup(m,H,y),m+=H,u+=Y}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new di(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function oi(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const r=i[e][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=r.clone():Array.isArray(r)?t[e][n]=r.slice():t[e][n]=r}}return t}function be(i){const t={};for(let e=0;e<i.length;e++){const n=oi(i[e]);for(const r in n)t[r]=n[r]}return t}function kc(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Ua(i){return i.getRenderTarget()===null?i.outputColorSpace:Yt.workingColorSpace}const Vc={clone:oi,merge:be};var Gc=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Hc=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class In extends hi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Gc,this.fragmentShader=Hc,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=oi(t.uniforms),this.uniformsGroups=kc(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?e.uniforms[r]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[r]={type:"m4",value:a.toArray()}:e.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Ia extends pe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new oe,this.projectionMatrix=new oe,this.projectionMatrixInverse=new oe,this.coordinateSystem=on}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class De extends Ia{constructor(t=50,e=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Ei*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(ei*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ei*2*Math.atan(Math.tan(ei*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(t,e,n,r,s,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(ei*.5*this.fov)/this.zoom,n=2*e,r=this.aspect*n,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,e-=a.offsetY*n/c,r*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(s+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const $n=-90,jn=1;class Wc extends pe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new De($n,jn,t,e);r.layers=this.layers,this.add(r);const s=new De($n,jn,t,e);s.layers=this.layers,this.add(s);const a=new De($n,jn,t,e);a.layers=this.layers,this.add(a);const o=new De($n,jn,t,e);o.layers=this.layers,this.add(o);const l=new De($n,jn,t,e);l.layers=this.layers,this.add(l);const c=new De($n,jn,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,r,s,a,o,l]=e;for(const c of e)this.remove(c);if(t===on)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===lr)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),v=t.xr.enabled;t.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,r),t.render(e,s),t.setRenderTarget(n,1,r),t.render(e,a),t.setRenderTarget(n,2,r),t.render(e,o),t.setRenderTarget(n,3,r),t.render(e,l),t.setRenderTarget(n,4,r),t.render(e,c),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,r),t.render(e,h),t.setRenderTarget(d,u,m),t.xr.enabled=v,n.texture.needsPMREMUpdate=!0}}class Na extends Ue{constructor(t,e,n,r,s,a,o,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:ii,super(t,e,n,r,s,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Xc extends Un{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},r=[n,n,n,n,n,n];e.encoding!==void 0&&(xi("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),e.colorSpace=e.encoding===Dn?fe:Be),this.texture=new Na(r,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Fe}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new di(5,5,5),s=new In({name:"CubemapFromEquirect",uniforms:oi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Re,blending:mn});s.uniforms.tEquirect.value=e;const a=new $e(r,s),o=e.minFilter;return e.minFilter===Si&&(e.minFilter=Fe),new Wc(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,r){const s=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,r);t.setRenderTarget(s)}}const qr=new D,qc=new D,Yc=new zt;class An{constructor(t=new D(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,r){return this.normal.set(t,e,n),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const r=qr.subVectors(n,e).cross(qc.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(qr),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Yc.getNormalMatrix(t),r=this.coplanarPoint(qr).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const bn=new mr,Yi=new D;class vs{constructor(t=new An,e=new An,n=new An,r=new An,s=new An,a=new An){this.planes=[t,e,n,r,s,a]}set(t,e,n,r,s,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=on){const n=this.planes,r=t.elements,s=r[0],a=r[1],o=r[2],l=r[3],c=r[4],h=r[5],d=r[6],u=r[7],m=r[8],v=r[9],x=r[10],p=r[11],f=r[12],g=r[13],_=r[14],E=r[15];if(n[0].setComponents(l-s,u-c,p-m,E-f).normalize(),n[1].setComponents(l+s,u+c,p+m,E+f).normalize(),n[2].setComponents(l+a,u+h,p+v,E+g).normalize(),n[3].setComponents(l-a,u-h,p-v,E-g).normalize(),n[4].setComponents(l-o,u-d,p-x,E-_).normalize(),e===on)n[5].setComponents(l+o,u+d,p+x,E+_).normalize();else if(e===lr)n[5].setComponents(o,d,x,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),bn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),bn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(bn)}intersectsSprite(t){return bn.center.set(0,0,0),bn.radius=.7071067811865476,bn.applyMatrix4(t.matrixWorld),this.intersectsSphere(bn)}intersectsSphere(t){const e=this.planes,n=t.center,r=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const r=e[n];if(Yi.x=r.normal.x>0?t.max.x:t.min.x,Yi.y=r.normal.y>0?t.max.y:t.min.y,Yi.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(Yi)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Fa(){let i=null,t=!1,e=null,n=null;function r(s,a){e(s,a),n=i.requestAnimationFrame(r)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(r),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){i=s}}}function $c(i,t){const e=t.isWebGL2,n=new WeakMap;function r(c,h){const d=c.array,u=c.usage,m=d.byteLength,v=i.createBuffer();i.bindBuffer(h,v),i.bufferData(h,d,u),c.onUploadCallback();let x;if(d instanceof Float32Array)x=i.FLOAT;else if(d instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(e)x=i.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else x=i.UNSIGNED_SHORT;else if(d instanceof Int16Array)x=i.SHORT;else if(d instanceof Uint32Array)x=i.UNSIGNED_INT;else if(d instanceof Int32Array)x=i.INT;else if(d instanceof Int8Array)x=i.BYTE;else if(d instanceof Uint8Array)x=i.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)x=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:v,type:x,bytesPerElement:d.BYTES_PER_ELEMENT,version:c.version,size:m}}function s(c,h,d){const u=h.array,m=h._updateRange,v=h.updateRanges;if(i.bindBuffer(d,c),m.count===-1&&v.length===0&&i.bufferSubData(d,0,u),v.length!==0){for(let x=0,p=v.length;x<p;x++){const f=v[x];e?i.bufferSubData(d,f.start*u.BYTES_PER_ELEMENT,u,f.start,f.count):i.bufferSubData(d,f.start*u.BYTES_PER_ELEMENT,u.subarray(f.start,f.start+f.count))}h.clearUpdateRanges()}m.count!==-1&&(e?i.bufferSubData(d,m.offset*u.BYTES_PER_ELEMENT,u,m.offset,m.count):i.bufferSubData(d,m.offset*u.BYTES_PER_ELEMENT,u.subarray(m.offset,m.offset+m.count)),m.count=-1),h.onUploadCallback()}function a(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const h=n.get(c);h&&(i.deleteBuffer(h.buffer),n.delete(c))}function l(c,h){if(c.isGLBufferAttribute){const u=n.get(c);(!u||u.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const d=n.get(c);if(d===void 0)n.set(c,r(c,h));else if(d.version<c.version){if(d.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(d.buffer,c,h),d.version=c.version}}return{get:a,remove:o,update:l}}class xs extends We{constructor(t=1,e=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:r};const s=t/2,a=e/2,o=Math.floor(n),l=Math.floor(r),c=o+1,h=l+1,d=t/o,u=e/l,m=[],v=[],x=[],p=[];for(let f=0;f<h;f++){const g=f*u-a;for(let _=0;_<c;_++){const E=_*d-s;v.push(E,-g,0),x.push(0,0,1),p.push(_/o),p.push(1-f/l)}}for(let f=0;f<l;f++)for(let g=0;g<o;g++){const _=g+c*f,E=g+c*(f+1),C=g+1+c*(f+1),b=g+1+c*f;m.push(_,E,b),m.push(E,C,b)}this.setIndex(m),this.setAttribute("position",new we(v,3)),this.setAttribute("normal",new we(x,3)),this.setAttribute("uv",new we(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new xs(t.width,t.height,t.widthSegments,t.heightSegments)}}var jc=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Kc=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Zc=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Jc=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Qc=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,th=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,eh=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,nh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ih=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,rh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,sh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,oh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ah=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,lh=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,ch=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,hh=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,dh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,uh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,fh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ph=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,mh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,gh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,_h=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,vh=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,xh=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Mh=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Sh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,yh=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Eh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Th=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,bh="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ah=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,wh=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Rh=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Ch=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Lh=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ph=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Dh=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Uh=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ih=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Nh=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Fh=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Oh=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Bh=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,zh=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,kh=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Vh=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Gh=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Hh=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Wh=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Xh=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,qh=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Yh=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,$h=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,jh=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Kh=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Zh=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Jh=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Qh=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,td=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,ed=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,nd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,id=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,rd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,sd=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,od=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ad=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ld=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,cd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,hd=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,dd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,ud=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,fd=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,pd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,md=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,gd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,_d=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,vd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,xd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Md=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Sd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,yd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ed=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Td=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,bd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ad=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,wd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Rd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Cd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Ld=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,Pd=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Dd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Ud=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Id=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Nd=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Fd=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Od=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Bd=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,zd=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,kd=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Vd=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Gd=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Hd=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Wd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Xd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,qd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Yd=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const $d=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,jd=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Kd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Zd=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Qd=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,tu=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,eu=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,nu=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,iu=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,ru=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,su=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ou=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,au=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,lu=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,cu=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hu=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,du=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,uu=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,fu=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,pu=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,mu=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,gu=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,_u=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vu=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,xu=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Mu=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Su=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yu=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Eu=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Tu=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,bu=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Au=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,wu=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ut={alphahash_fragment:jc,alphahash_pars_fragment:Kc,alphamap_fragment:Zc,alphamap_pars_fragment:Jc,alphatest_fragment:Qc,alphatest_pars_fragment:th,aomap_fragment:eh,aomap_pars_fragment:nh,batching_pars_vertex:ih,batching_vertex:rh,begin_vertex:sh,beginnormal_vertex:oh,bsdfs:ah,iridescence_fragment:lh,bumpmap_pars_fragment:ch,clipping_planes_fragment:hh,clipping_planes_pars_fragment:dh,clipping_planes_pars_vertex:uh,clipping_planes_vertex:fh,color_fragment:ph,color_pars_fragment:mh,color_pars_vertex:gh,color_vertex:_h,common:vh,cube_uv_reflection_fragment:xh,defaultnormal_vertex:Mh,displacementmap_pars_vertex:Sh,displacementmap_vertex:yh,emissivemap_fragment:Eh,emissivemap_pars_fragment:Th,colorspace_fragment:bh,colorspace_pars_fragment:Ah,envmap_fragment:wh,envmap_common_pars_fragment:Rh,envmap_pars_fragment:Ch,envmap_pars_vertex:Lh,envmap_physical_pars_fragment:Gh,envmap_vertex:Ph,fog_vertex:Dh,fog_pars_vertex:Uh,fog_fragment:Ih,fog_pars_fragment:Nh,gradientmap_pars_fragment:Fh,lightmap_fragment:Oh,lightmap_pars_fragment:Bh,lights_lambert_fragment:zh,lights_lambert_pars_fragment:kh,lights_pars_begin:Vh,lights_toon_fragment:Hh,lights_toon_pars_fragment:Wh,lights_phong_fragment:Xh,lights_phong_pars_fragment:qh,lights_physical_fragment:Yh,lights_physical_pars_fragment:$h,lights_fragment_begin:jh,lights_fragment_maps:Kh,lights_fragment_end:Zh,logdepthbuf_fragment:Jh,logdepthbuf_pars_fragment:Qh,logdepthbuf_pars_vertex:td,logdepthbuf_vertex:ed,map_fragment:nd,map_pars_fragment:id,map_particle_fragment:rd,map_particle_pars_fragment:sd,metalnessmap_fragment:od,metalnessmap_pars_fragment:ad,morphcolor_vertex:ld,morphnormal_vertex:cd,morphtarget_pars_vertex:hd,morphtarget_vertex:dd,normal_fragment_begin:ud,normal_fragment_maps:fd,normal_pars_fragment:pd,normal_pars_vertex:md,normal_vertex:gd,normalmap_pars_fragment:_d,clearcoat_normal_fragment_begin:vd,clearcoat_normal_fragment_maps:xd,clearcoat_pars_fragment:Md,iridescence_pars_fragment:Sd,opaque_fragment:yd,packing:Ed,premultiplied_alpha_fragment:Td,project_vertex:bd,dithering_fragment:Ad,dithering_pars_fragment:wd,roughnessmap_fragment:Rd,roughnessmap_pars_fragment:Cd,shadowmap_pars_fragment:Ld,shadowmap_pars_vertex:Pd,shadowmap_vertex:Dd,shadowmask_pars_fragment:Ud,skinbase_vertex:Id,skinning_pars_vertex:Nd,skinning_vertex:Fd,skinnormal_vertex:Od,specularmap_fragment:Bd,specularmap_pars_fragment:zd,tonemapping_fragment:kd,tonemapping_pars_fragment:Vd,transmission_fragment:Gd,transmission_pars_fragment:Hd,uv_pars_fragment:Wd,uv_pars_vertex:Xd,uv_vertex:qd,worldpos_vertex:Yd,background_vert:$d,background_frag:jd,backgroundCube_vert:Kd,backgroundCube_frag:Zd,cube_vert:Jd,cube_frag:Qd,depth_vert:tu,depth_frag:eu,distanceRGBA_vert:nu,distanceRGBA_frag:iu,equirect_vert:ru,equirect_frag:su,linedashed_vert:ou,linedashed_frag:au,meshbasic_vert:lu,meshbasic_frag:cu,meshlambert_vert:hu,meshlambert_frag:du,meshmatcap_vert:uu,meshmatcap_frag:fu,meshnormal_vert:pu,meshnormal_frag:mu,meshphong_vert:gu,meshphong_frag:_u,meshphysical_vert:vu,meshphysical_frag:xu,meshtoon_vert:Mu,meshtoon_frag:Su,points_vert:yu,points_frag:Eu,shadow_vert:Tu,shadow_frag:bu,sprite_vert:Au,sprite_frag:wu},rt={common:{diffuse:{value:new Gt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new zt},alphaMap:{value:null},alphaMapTransform:{value:new zt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new zt}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new zt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new zt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new zt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new zt},normalScale:{value:new Ht(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new zt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new zt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new zt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new zt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Gt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Gt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new zt},alphaTest:{value:0},uvTransform:{value:new zt}},sprite:{diffuse:{value:new Gt(16777215)},opacity:{value:1},center:{value:new Ht(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new zt},alphaMap:{value:null},alphaMapTransform:{value:new zt},alphaTest:{value:0}}},Ye={basic:{uniforms:be([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.fog]),vertexShader:Ut.meshbasic_vert,fragmentShader:Ut.meshbasic_frag},lambert:{uniforms:be([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,rt.lights,{emissive:{value:new Gt(0)}}]),vertexShader:Ut.meshlambert_vert,fragmentShader:Ut.meshlambert_frag},phong:{uniforms:be([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,rt.lights,{emissive:{value:new Gt(0)},specular:{value:new Gt(1118481)},shininess:{value:30}}]),vertexShader:Ut.meshphong_vert,fragmentShader:Ut.meshphong_frag},standard:{uniforms:be([rt.common,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.roughnessmap,rt.metalnessmap,rt.fog,rt.lights,{emissive:{value:new Gt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ut.meshphysical_vert,fragmentShader:Ut.meshphysical_frag},toon:{uniforms:be([rt.common,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.gradientmap,rt.fog,rt.lights,{emissive:{value:new Gt(0)}}]),vertexShader:Ut.meshtoon_vert,fragmentShader:Ut.meshtoon_frag},matcap:{uniforms:be([rt.common,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,{matcap:{value:null}}]),vertexShader:Ut.meshmatcap_vert,fragmentShader:Ut.meshmatcap_frag},points:{uniforms:be([rt.points,rt.fog]),vertexShader:Ut.points_vert,fragmentShader:Ut.points_frag},dashed:{uniforms:be([rt.common,rt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ut.linedashed_vert,fragmentShader:Ut.linedashed_frag},depth:{uniforms:be([rt.common,rt.displacementmap]),vertexShader:Ut.depth_vert,fragmentShader:Ut.depth_frag},normal:{uniforms:be([rt.common,rt.bumpmap,rt.normalmap,rt.displacementmap,{opacity:{value:1}}]),vertexShader:Ut.meshnormal_vert,fragmentShader:Ut.meshnormal_frag},sprite:{uniforms:be([rt.sprite,rt.fog]),vertexShader:Ut.sprite_vert,fragmentShader:Ut.sprite_frag},background:{uniforms:{uvTransform:{value:new zt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ut.background_vert,fragmentShader:Ut.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Ut.backgroundCube_vert,fragmentShader:Ut.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ut.cube_vert,fragmentShader:Ut.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ut.equirect_vert,fragmentShader:Ut.equirect_frag},distanceRGBA:{uniforms:be([rt.common,rt.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ut.distanceRGBA_vert,fragmentShader:Ut.distanceRGBA_frag},shadow:{uniforms:be([rt.lights,rt.fog,{color:{value:new Gt(0)},opacity:{value:1}}]),vertexShader:Ut.shadow_vert,fragmentShader:Ut.shadow_frag}};Ye.physical={uniforms:be([Ye.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new zt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new zt},clearcoatNormalScale:{value:new Ht(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new zt},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new zt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new zt},sheen:{value:0},sheenColor:{value:new Gt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new zt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new zt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new zt},transmissionSamplerSize:{value:new Ht},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new zt},attenuationDistance:{value:0},attenuationColor:{value:new Gt(0)},specularColor:{value:new Gt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new zt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new zt},anisotropyVector:{value:new Ht},anisotropyMap:{value:null},anisotropyMapTransform:{value:new zt}}]),vertexShader:Ut.meshphysical_vert,fragmentShader:Ut.meshphysical_frag};const $i={r:0,b:0,g:0};function Ru(i,t,e,n,r,s,a){const o=new Gt(0);let l=s===!0?0:1,c,h,d=null,u=0,m=null;function v(p,f){let g=!1,_=f.isScene===!0?f.background:null;_&&_.isTexture&&(_=(f.backgroundBlurriness>0?e:t).get(_)),_===null?x(o,l):_&&_.isColor&&(x(_,1),g=!0);const E=i.xr.getEnvironmentBlendMode();E==="additive"?n.buffers.color.setClear(0,0,0,1,a):E==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||g)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),_&&(_.isCubeTexture||_.mapping===fr)?(h===void 0&&(h=new $e(new di(1,1,1),new In({name:"BackgroundCubeMaterial",uniforms:oi(Ye.backgroundCube.uniforms),vertexShader:Ye.backgroundCube.vertexShader,fragmentShader:Ye.backgroundCube.fragmentShader,side:Re,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(C,b,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(h)),h.material.uniforms.envMap.value=_,h.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=f.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,h.material.toneMapped=Yt.getTransfer(_.colorSpace)!==Jt,(d!==_||u!==_.version||m!==i.toneMapping)&&(h.material.needsUpdate=!0,d=_,u=_.version,m=i.toneMapping),h.layers.enableAll(),p.unshift(h,h.geometry,h.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new $e(new xs(2,2),new In({name:"BackgroundMaterial",uniforms:oi(Ye.background.uniforms),vertexShader:Ye.background.vertexShader,fragmentShader:Ye.background.fragmentShader,side:vn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,c.material.toneMapped=Yt.getTransfer(_.colorSpace)!==Jt,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),(d!==_||u!==_.version||m!==i.toneMapping)&&(c.material.needsUpdate=!0,d=_,u=_.version,m=i.toneMapping),c.layers.enableAll(),p.unshift(c,c.geometry,c.material,0,0,null))}function x(p,f){p.getRGB($i,Ua(i)),n.buffers.color.setClear($i.r,$i.g,$i.b,f,a)}return{getClearColor:function(){return o},setClearColor:function(p,f=1){o.set(p),l=f,x(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(p){l=p,x(o,l)},render:v}}function Cu(i,t,e,n){const r=i.getParameter(i.MAX_VERTEX_ATTRIBS),s=n.isWebGL2?null:t.get("OES_vertex_array_object"),a=n.isWebGL2||s!==null,o={},l=p(null);let c=l,h=!1;function d(L,N,k,Y,H){let X=!1;if(a){const q=x(Y,k,N);c!==q&&(c=q,m(c.object)),X=f(L,Y,k,H),X&&g(L,Y,k,H)}else{const q=N.wireframe===!0;(c.geometry!==Y.id||c.program!==k.id||c.wireframe!==q)&&(c.geometry=Y.id,c.program=k.id,c.wireframe=q,X=!0)}H!==null&&e.update(H,i.ELEMENT_ARRAY_BUFFER),(X||h)&&(h=!1,W(L,N,k,Y),H!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(H).buffer))}function u(){return n.isWebGL2?i.createVertexArray():s.createVertexArrayOES()}function m(L){return n.isWebGL2?i.bindVertexArray(L):s.bindVertexArrayOES(L)}function v(L){return n.isWebGL2?i.deleteVertexArray(L):s.deleteVertexArrayOES(L)}function x(L,N,k){const Y=k.wireframe===!0;let H=o[L.id];H===void 0&&(H={},o[L.id]=H);let X=H[N.id];X===void 0&&(X={},H[N.id]=X);let q=X[Y];return q===void 0&&(q=p(u()),X[Y]=q),q}function p(L){const N=[],k=[],Y=[];for(let H=0;H<r;H++)N[H]=0,k[H]=0,Y[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:k,attributeDivisors:Y,object:L,attributes:{},index:null}}function f(L,N,k,Y){const H=c.attributes,X=N.attributes;let q=0;const et=k.getAttributes();for(const nt in et)if(et[nt].location>=0){const $=H[nt];let st=X[nt];if(st===void 0&&(nt==="instanceMatrix"&&L.instanceMatrix&&(st=L.instanceMatrix),nt==="instanceColor"&&L.instanceColor&&(st=L.instanceColor)),$===void 0||$.attribute!==st||st&&$.data!==st.data)return!0;q++}return c.attributesNum!==q||c.index!==Y}function g(L,N,k,Y){const H={},X=N.attributes;let q=0;const et=k.getAttributes();for(const nt in et)if(et[nt].location>=0){let $=X[nt];$===void 0&&(nt==="instanceMatrix"&&L.instanceMatrix&&($=L.instanceMatrix),nt==="instanceColor"&&L.instanceColor&&($=L.instanceColor));const st={};st.attribute=$,$&&$.data&&(st.data=$.data),H[nt]=st,q++}c.attributes=H,c.attributesNum=q,c.index=Y}function _(){const L=c.newAttributes;for(let N=0,k=L.length;N<k;N++)L[N]=0}function E(L){C(L,0)}function C(L,N){const k=c.newAttributes,Y=c.enabledAttributes,H=c.attributeDivisors;k[L]=1,Y[L]===0&&(i.enableVertexAttribArray(L),Y[L]=1),H[L]!==N&&((n.isWebGL2?i:t.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](L,N),H[L]=N)}function b(){const L=c.newAttributes,N=c.enabledAttributes;for(let k=0,Y=N.length;k<Y;k++)N[k]!==L[k]&&(i.disableVertexAttribArray(k),N[k]=0)}function w(L,N,k,Y,H,X,q){q===!0?i.vertexAttribIPointer(L,N,k,H,X):i.vertexAttribPointer(L,N,k,Y,H,X)}function W(L,N,k,Y){if(n.isWebGL2===!1&&(L.isInstancedMesh||Y.isInstancedBufferGeometry)&&t.get("ANGLE_instanced_arrays")===null)return;_();const H=Y.attributes,X=k.getAttributes(),q=N.defaultAttributeValues;for(const et in X){const nt=X[et];if(nt.location>=0){let z=H[et];if(z===void 0&&(et==="instanceMatrix"&&L.instanceMatrix&&(z=L.instanceMatrix),et==="instanceColor"&&L.instanceColor&&(z=L.instanceColor)),z!==void 0){const $=z.normalized,st=z.itemSize,ut=e.get(z);if(ut===void 0)continue;const ft=ut.buffer,At=ut.type,Rt=ut.bytesPerElement,St=n.isWebGL2===!0&&(At===i.INT||At===i.UNSIGNED_INT||z.gpuType===fa);if(z.isInterleavedBufferAttribute){const Vt=z.data,U=Vt.stride,Se=z.offset;if(Vt.isInstancedInterleavedBuffer){for(let vt=0;vt<nt.locationSize;vt++)C(nt.location+vt,Vt.meshPerAttribute);L.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=Vt.meshPerAttribute*Vt.count)}else for(let vt=0;vt<nt.locationSize;vt++)E(nt.location+vt);i.bindBuffer(i.ARRAY_BUFFER,ft);for(let vt=0;vt<nt.locationSize;vt++)w(nt.location+vt,st/nt.locationSize,At,$,U*Rt,(Se+st/nt.locationSize*vt)*Rt,St)}else{if(z.isInstancedBufferAttribute){for(let Vt=0;Vt<nt.locationSize;Vt++)C(nt.location+Vt,z.meshPerAttribute);L.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=z.meshPerAttribute*z.count)}else for(let Vt=0;Vt<nt.locationSize;Vt++)E(nt.location+Vt);i.bindBuffer(i.ARRAY_BUFFER,ft);for(let Vt=0;Vt<nt.locationSize;Vt++)w(nt.location+Vt,st/nt.locationSize,At,$,st*Rt,st/nt.locationSize*Vt*Rt,St)}}else if(q!==void 0){const $=q[et];if($!==void 0)switch($.length){case 2:i.vertexAttrib2fv(nt.location,$);break;case 3:i.vertexAttrib3fv(nt.location,$);break;case 4:i.vertexAttrib4fv(nt.location,$);break;default:i.vertexAttrib1fv(nt.location,$)}}}}b()}function y(){V();for(const L in o){const N=o[L];for(const k in N){const Y=N[k];for(const H in Y)v(Y[H].object),delete Y[H];delete N[k]}delete o[L]}}function A(L){if(o[L.id]===void 0)return;const N=o[L.id];for(const k in N){const Y=N[k];for(const H in Y)v(Y[H].object),delete Y[H];delete N[k]}delete o[L.id]}function G(L){for(const N in o){const k=o[N];if(k[L.id]===void 0)continue;const Y=k[L.id];for(const H in Y)v(Y[H].object),delete Y[H];delete k[L.id]}}function V(){J(),h=!0,c!==l&&(c=l,m(c.object))}function J(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:d,reset:V,resetDefaultState:J,dispose:y,releaseStatesOfGeometry:A,releaseStatesOfProgram:G,initAttributes:_,enableAttribute:E,disableUnusedAttributes:b}}function Lu(i,t,e,n){const r=n.isWebGL2;let s;function a(h){s=h}function o(h,d){i.drawArrays(s,h,d),e.update(d,s,1)}function l(h,d,u){if(u===0)return;let m,v;if(r)m=i,v="drawArraysInstanced";else if(m=t.get("ANGLE_instanced_arrays"),v="drawArraysInstancedANGLE",m===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[v](s,h,d,u),e.update(d,s,u)}function c(h,d,u){if(u===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let v=0;v<u;v++)this.render(h[v],d[v]);else{m.multiDrawArraysWEBGL(s,h,0,d,0,u);let v=0;for(let x=0;x<u;x++)v+=d[x];e.update(v,s,1)}}this.setMode=a,this.render=o,this.renderInstances=l,this.renderMultiDraw=c}function Pu(i,t,e){let n;function r(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){const w=t.get("EXT_texture_filter_anisotropic");n=i.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(w){if(w==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&i.constructor.name==="WebGL2RenderingContext";let o=e.precision!==void 0?e.precision:"highp";const l=s(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);const c=a||t.has("WEBGL_draw_buffers"),h=e.logarithmicDepthBuffer===!0,d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),u=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_TEXTURE_SIZE),v=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),x=i.getParameter(i.MAX_VERTEX_ATTRIBS),p=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),f=i.getParameter(i.MAX_VARYING_VECTORS),g=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),_=u>0,E=a||t.has("OES_texture_float"),C=_&&E,b=a?i.getParameter(i.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:c,getMaxAnisotropy:r,getMaxPrecision:s,precision:o,logarithmicDepthBuffer:h,maxTextures:d,maxVertexTextures:u,maxTextureSize:m,maxCubemapSize:v,maxAttributes:x,maxVertexUniforms:p,maxVaryings:f,maxFragmentUniforms:g,vertexTextures:_,floatFragmentTextures:E,floatVertexTextures:C,maxSamples:b}}function Du(i){const t=this;let e=null,n=0,r=!1,s=!1;const a=new An,o=new zt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const m=d.length!==0||u||n!==0||r;return r=u,n=d.length,m},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,m){const v=d.clippingPlanes,x=d.clipIntersection,p=d.clipShadows,f=i.get(d);if(!r||v===null||v.length===0||s&&!p)s?h(null):c();else{const g=s?0:n,_=g*4;let E=f.clippingState||null;l.value=E,E=h(v,u,_,m);for(let C=0;C!==_;++C)E[C]=e[C];f.clippingState=E,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=g}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,m,v){const x=d!==null?d.length:0;let p=null;if(x!==0){if(p=l.value,v!==!0||p===null){const f=m+x*4,g=u.matrixWorldInverse;o.getNormalMatrix(g),(p===null||p.length<f)&&(p=new Float32Array(f));for(let _=0,E=m;_!==x;++_,E+=4)a.copy(d[_]).applyMatrix4(g,o),a.normal.toArray(p,E),p[E+3]=a.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,p}}function Uu(i){let t=new WeakMap;function e(a,o){return o===as?a.mapping=ii:o===ls&&(a.mapping=ri),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===as||o===ls)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Xc(l.height/2);return c.fromEquirectangularTexture(i,a),t.set(a,c),a.addEventListener("dispose",r),e(c.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}class Oa extends Ia{constructor(t=-1,e=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-t,a=n+t,o=r+e,l=r-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Jn=4,Do=[.125,.215,.35,.446,.526,.582],Cn=20,Yr=new Oa,Uo=new Gt;let $r=null,jr=0,Kr=0;const wn=(1+Math.sqrt(5))/2,Kn=1/wn,Io=[new D(1,1,1),new D(-1,1,1),new D(1,1,-1),new D(-1,1,-1),new D(0,wn,Kn),new D(0,wn,-Kn),new D(Kn,0,wn),new D(-Kn,0,wn),new D(wn,Kn,0),new D(-wn,Kn,0)];class No{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,r=100){$r=this._renderer.getRenderTarget(),jr=this._renderer.getActiveCubeFace(),Kr=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,n,r,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Bo(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Oo(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget($r,jr,Kr),t.scissorTest=!1,ji(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ii||t.mapping===ri?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),$r=this._renderer.getRenderTarget(),jr=this._renderer.getActiveCubeFace(),Kr=this._renderer.getActiveMipmapLevel();const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Fe,minFilter:Fe,generateMipmaps:!1,type:yi,format:He,colorSpace:an,depthBuffer:!1},r=Fo(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Fo(t,e,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Iu(s)),this._blurMaterial=Nu(s,t,e)}return r}_compileMaterial(t){const e=new $e(this._lodPlanes[0],t);this._renderer.compile(e,Yr)}_sceneToCubeUV(t,e,n,r){const o=new De(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,u=h.toneMapping;h.getClearColor(Uo),h.toneMapping=gn,h.autoClear=!1;const m=new La({name:"PMREM.Background",side:Re,depthWrite:!1,depthTest:!1}),v=new $e(new di,m);let x=!1;const p=t.background;p?p.isColor&&(m.color.copy(p),t.background=null,x=!0):(m.color.copy(Uo),x=!0);for(let f=0;f<6;f++){const g=f%3;g===0?(o.up.set(0,l[f],0),o.lookAt(c[f],0,0)):g===1?(o.up.set(0,0,l[f]),o.lookAt(0,c[f],0)):(o.up.set(0,l[f],0),o.lookAt(0,0,c[f]));const _=this._cubeSize;ji(r,g*_,f>2?_:0,_,_),h.setRenderTarget(r),x&&h.render(v,o),h.render(t,o)}v.geometry.dispose(),v.material.dispose(),h.toneMapping=u,h.autoClear=d,t.background=p}_textureToCubeUV(t,e){const n=this._renderer,r=t.mapping===ii||t.mapping===ri;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Bo()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Oo());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new $e(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=t;const l=this._cubeSize;ji(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,Yr)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Io[(r-1)%Io.length];this._blur(t,r-1,r,s,a)}e.autoClear=n}_blur(t,e,n,r,s){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,r,"latitudinal",s),this._halfBlur(a,t,n,n,r,"longitudinal",s)}_halfBlur(t,e,n,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new $e(this._lodPlanes[r],c),u=c.uniforms,m=this._sizeLods[n]-1,v=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*Cn-1),x=s/v,p=isFinite(s)?1+Math.floor(h*x):Cn;p>Cn&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Cn}`);const f=[];let g=0;for(let w=0;w<Cn;++w){const W=w/x,y=Math.exp(-W*W/2);f.push(y),w===0?g+=y:w<p&&(g+=2*y)}for(let w=0;w<f.length;w++)f[w]=f[w]/g;u.envMap.value=t.texture,u.samples.value=p,u.weights.value=f,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:_}=this;u.dTheta.value=v,u.mipInt.value=_-n;const E=this._sizeLods[r],C=3*E*(r>_-Jn?r-_+Jn:0),b=4*(this._cubeSize-E);ji(e,C,b,3*E,2*E),l.setRenderTarget(e),l.render(d,Yr)}}function Iu(i){const t=[],e=[],n=[];let r=i;const s=i-Jn+1+Do.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);e.push(o);let l=1/o;a>i-Jn?l=Do[a-i+Jn-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],m=6,v=6,x=3,p=2,f=1,g=new Float32Array(x*v*m),_=new Float32Array(p*v*m),E=new Float32Array(f*v*m);for(let b=0;b<m;b++){const w=b%3*2/3-1,W=b>2?0:-1,y=[w,W,0,w+2/3,W,0,w+2/3,W+1,0,w,W,0,w+2/3,W+1,0,w,W+1,0];g.set(y,x*v*b),_.set(u,p*v*b);const A=[b,b,b,b,b,b];E.set(A,f*v*b)}const C=new We;C.setAttribute("position",new je(g,x)),C.setAttribute("uv",new je(_,p)),C.setAttribute("faceIndex",new je(E,f)),t.push(C),r>Jn&&r--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Fo(i,t,e){const n=new Un(i,t,e);return n.texture.mapping=fr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ji(i,t,e,n,r){i.viewport.set(t,e,n,r),i.scissor.set(t,e,n,r)}function Nu(i,t,e){const n=new Float32Array(Cn),r=new D(0,1,0);return new In({name:"SphericalGaussianBlur",defines:{n:Cn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Ms(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:mn,depthTest:!1,depthWrite:!1})}function Oo(){return new In({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ms(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:mn,depthTest:!1,depthWrite:!1})}function Bo(){return new In({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ms(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:mn,depthTest:!1,depthWrite:!1})}function Ms(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Fu(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===as||l===ls,h=l===ii||l===ri;if(c||h)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let d=t.get(o);return e===null&&(e=new No(i)),d=c?e.fromEquirectangular(o,d):e.fromCubemap(o,d),t.set(o,d),d.texture}else{if(t.has(o))return t.get(o).texture;{const d=o.image;if(c&&d&&d.height>0||h&&d&&r(d)){e===null&&(e=new No(i));const u=c?e.fromEquirectangular(o):e.fromCubemap(o);return t.set(o,u),o.addEventListener("dispose",s),u.texture}else return null}}}return o}function r(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function Ou(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return t[n]=r,r}return{has:function(n){return e(n)!==null},init:function(n){n.isWebGL2?(e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance")):(e("WEBGL_depth_texture"),e("OES_texture_float"),e("OES_texture_half_float"),e("OES_texture_half_float_linear"),e("OES_standard_derivatives"),e("OES_element_index_uint"),e("OES_vertex_array_object"),e("ANGLE_instanced_arrays")),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture")},get:function(n){const r=e(n);return r===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function Bu(i,t,e,n){const r={},s=new WeakMap;function a(d){const u=d.target;u.index!==null&&t.remove(u.index);for(const v in u.attributes)t.remove(u.attributes[v]);for(const v in u.morphAttributes){const x=u.morphAttributes[v];for(let p=0,f=x.length;p<f;p++)t.remove(x[p])}u.removeEventListener("dispose",a),delete r[u.id];const m=s.get(u);m&&(t.remove(m),s.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function o(d,u){return r[u.id]===!0||(u.addEventListener("dispose",a),r[u.id]=!0,e.memory.geometries++),u}function l(d){const u=d.attributes;for(const v in u)t.update(u[v],i.ARRAY_BUFFER);const m=d.morphAttributes;for(const v in m){const x=m[v];for(let p=0,f=x.length;p<f;p++)t.update(x[p],i.ARRAY_BUFFER)}}function c(d){const u=[],m=d.index,v=d.attributes.position;let x=0;if(m!==null){const g=m.array;x=m.version;for(let _=0,E=g.length;_<E;_+=3){const C=g[_+0],b=g[_+1],w=g[_+2];u.push(C,b,b,w,w,C)}}else if(v!==void 0){const g=v.array;x=v.version;for(let _=0,E=g.length/3-1;_<E;_+=3){const C=_+0,b=_+1,w=_+2;u.push(C,b,b,w,w,C)}}else return;const p=new(Ea(u)?Da:Pa)(u,1);p.version=x;const f=s.get(d);f&&t.remove(f),s.set(d,p)}function h(d){const u=s.get(d);if(u){const m=d.index;m!==null&&u.version<m.version&&c(d)}else c(d);return s.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function zu(i,t,e,n){const r=n.isWebGL2;let s;function a(m){s=m}let o,l;function c(m){o=m.type,l=m.bytesPerElement}function h(m,v){i.drawElements(s,v,o,m*l),e.update(v,s,1)}function d(m,v,x){if(x===0)return;let p,f;if(r)p=i,f="drawElementsInstanced";else if(p=t.get("ANGLE_instanced_arrays"),f="drawElementsInstancedANGLE",p===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[f](s,v,o,m*l,x),e.update(v,s,x)}function u(m,v,x){if(x===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let f=0;f<x;f++)this.render(m[f]/l,v[f]);else{p.multiDrawElementsWEBGL(s,v,0,o,m,0,x);let f=0;for(let g=0;g<x;g++)f+=v[g];e.update(f,s,1)}}this.setMode=a,this.setIndex=c,this.render=h,this.renderInstances=d,this.renderMultiDraw=u}function ku(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(s/3);break;case i.LINES:e.lines+=o*(s/2);break;case i.LINE_STRIP:e.lines+=o*(s-1);break;case i.LINE_LOOP:e.lines+=o*s;break;case i.POINTS:e.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:n}}function Vu(i,t){return i[0]-t[0]}function Gu(i,t){return Math.abs(t[1])-Math.abs(i[1])}function Hu(i,t,e){const n={},r=new Float32Array(8),s=new WeakMap,a=new ue,o=[];for(let c=0;c<8;c++)o[c]=[c,0];function l(c,h,d){const u=c.morphTargetInfluences;if(t.isWebGL2===!0){const v=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,x=v!==void 0?v.length:0;let p=s.get(h);if(p===void 0||p.count!==x){let N=function(){J.dispose(),s.delete(h),h.removeEventListener("dispose",N)};var m=N;p!==void 0&&p.texture.dispose();const _=h.morphAttributes.position!==void 0,E=h.morphAttributes.normal!==void 0,C=h.morphAttributes.color!==void 0,b=h.morphAttributes.position||[],w=h.morphAttributes.normal||[],W=h.morphAttributes.color||[];let y=0;_===!0&&(y=1),E===!0&&(y=2),C===!0&&(y=3);let A=h.attributes.position.count*y,G=1;A>t.maxTextureSize&&(G=Math.ceil(A/t.maxTextureSize),A=t.maxTextureSize);const V=new Float32Array(A*G*4*x),J=new Aa(V,A,G,x);J.type=pn,J.needsUpdate=!0;const L=y*4;for(let k=0;k<x;k++){const Y=b[k],H=w[k],X=W[k],q=A*G*4*k;for(let et=0;et<Y.count;et++){const nt=et*L;_===!0&&(a.fromBufferAttribute(Y,et),V[q+nt+0]=a.x,V[q+nt+1]=a.y,V[q+nt+2]=a.z,V[q+nt+3]=0),E===!0&&(a.fromBufferAttribute(H,et),V[q+nt+4]=a.x,V[q+nt+5]=a.y,V[q+nt+6]=a.z,V[q+nt+7]=0),C===!0&&(a.fromBufferAttribute(X,et),V[q+nt+8]=a.x,V[q+nt+9]=a.y,V[q+nt+10]=a.z,V[q+nt+11]=X.itemSize===4?a.w:1)}}p={count:x,texture:J,size:new Ht(A,G)},s.set(h,p),h.addEventListener("dispose",N)}let f=0;for(let _=0;_<u.length;_++)f+=u[_];const g=h.morphTargetsRelative?1:1-f;d.getUniforms().setValue(i,"morphTargetBaseInfluence",g),d.getUniforms().setValue(i,"morphTargetInfluences",u),d.getUniforms().setValue(i,"morphTargetsTexture",p.texture,e),d.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}else{const v=u===void 0?0:u.length;let x=n[h.id];if(x===void 0||x.length!==v){x=[];for(let E=0;E<v;E++)x[E]=[E,0];n[h.id]=x}for(let E=0;E<v;E++){const C=x[E];C[0]=E,C[1]=u[E]}x.sort(Gu);for(let E=0;E<8;E++)E<v&&x[E][1]?(o[E][0]=x[E][0],o[E][1]=x[E][1]):(o[E][0]=Number.MAX_SAFE_INTEGER,o[E][1]=0);o.sort(Vu);const p=h.morphAttributes.position,f=h.morphAttributes.normal;let g=0;for(let E=0;E<8;E++){const C=o[E],b=C[0],w=C[1];b!==Number.MAX_SAFE_INTEGER&&w?(p&&h.getAttribute("morphTarget"+E)!==p[b]&&h.setAttribute("morphTarget"+E,p[b]),f&&h.getAttribute("morphNormal"+E)!==f[b]&&h.setAttribute("morphNormal"+E,f[b]),r[E]=w,g+=w):(p&&h.hasAttribute("morphTarget"+E)===!0&&h.deleteAttribute("morphTarget"+E),f&&h.hasAttribute("morphNormal"+E)===!0&&h.deleteAttribute("morphNormal"+E),r[E]=0)}const _=h.morphTargetsRelative?1:1-g;d.getUniforms().setValue(i,"morphTargetBaseInfluence",_),d.getUniforms().setValue(i,"morphTargetInfluences",r)}}return{update:l}}function Wu(i,t,e,n){let r=new WeakMap;function s(l){const c=n.render.frame,h=l.geometry,d=t.get(l,h);if(r.get(d)!==c&&(t.update(d),r.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),r.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const u=l.skeleton;r.get(u)!==c&&(u.update(),r.set(u,c))}return d}function a(){r=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:s,dispose:a}}class Ba extends Ue{constructor(t,e,n,r,s,a,o,l,c,h){if(h=h!==void 0?h:Pn,h!==Pn&&h!==si)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Pn&&(n=fn),n===void 0&&h===si&&(n=Ln),super(null,r,s,a,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:Ae,this.minFilter=l!==void 0?l:Ae,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const za=new Ue,ka=new Ba(1,1);ka.compareFunction=ya;const Va=new Aa,Ga=new Rc,Ha=new Na,zo=[],ko=[],Vo=new Float32Array(16),Go=new Float32Array(9),Ho=new Float32Array(4);function ui(i,t,e){const n=i[0];if(n<=0||n>0)return i;const r=t*e;let s=zo[r];if(s===void 0&&(s=new Float32Array(r),zo[r]=s),t!==0){n.toArray(s,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(s,o)}return s}function ae(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function le(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function _r(i,t){let e=ko[t];e===void 0&&(e=new Int32Array(t),ko[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Xu(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function qu(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ae(e,t))return;i.uniform2fv(this.addr,t),le(e,t)}}function Yu(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ae(e,t))return;i.uniform3fv(this.addr,t),le(e,t)}}function $u(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ae(e,t))return;i.uniform4fv(this.addr,t),le(e,t)}}function ju(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ae(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),le(e,t)}else{if(ae(e,n))return;Ho.set(n),i.uniformMatrix2fv(this.addr,!1,Ho),le(e,n)}}function Ku(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ae(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),le(e,t)}else{if(ae(e,n))return;Go.set(n),i.uniformMatrix3fv(this.addr,!1,Go),le(e,n)}}function Zu(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ae(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),le(e,t)}else{if(ae(e,n))return;Vo.set(n),i.uniformMatrix4fv(this.addr,!1,Vo),le(e,n)}}function Ju(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Qu(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ae(e,t))return;i.uniform2iv(this.addr,t),le(e,t)}}function tf(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ae(e,t))return;i.uniform3iv(this.addr,t),le(e,t)}}function ef(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ae(e,t))return;i.uniform4iv(this.addr,t),le(e,t)}}function nf(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function rf(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ae(e,t))return;i.uniform2uiv(this.addr,t),le(e,t)}}function sf(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ae(e,t))return;i.uniform3uiv(this.addr,t),le(e,t)}}function of(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ae(e,t))return;i.uniform4uiv(this.addr,t),le(e,t)}}function af(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);const s=this.type===i.SAMPLER_2D_SHADOW?ka:za;e.setTexture2D(t||s,r)}function lf(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTexture3D(t||Ga,r)}function cf(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTextureCube(t||Ha,r)}function hf(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTexture2DArray(t||Va,r)}function df(i){switch(i){case 5126:return Xu;case 35664:return qu;case 35665:return Yu;case 35666:return $u;case 35674:return ju;case 35675:return Ku;case 35676:return Zu;case 5124:case 35670:return Ju;case 35667:case 35671:return Qu;case 35668:case 35672:return tf;case 35669:case 35673:return ef;case 5125:return nf;case 36294:return rf;case 36295:return sf;case 36296:return of;case 35678:case 36198:case 36298:case 36306:case 35682:return af;case 35679:case 36299:case 36307:return lf;case 35680:case 36300:case 36308:case 36293:return cf;case 36289:case 36303:case 36311:case 36292:return hf}}function uf(i,t){i.uniform1fv(this.addr,t)}function ff(i,t){const e=ui(t,this.size,2);i.uniform2fv(this.addr,e)}function pf(i,t){const e=ui(t,this.size,3);i.uniform3fv(this.addr,e)}function mf(i,t){const e=ui(t,this.size,4);i.uniform4fv(this.addr,e)}function gf(i,t){const e=ui(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function _f(i,t){const e=ui(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function vf(i,t){const e=ui(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function xf(i,t){i.uniform1iv(this.addr,t)}function Mf(i,t){i.uniform2iv(this.addr,t)}function Sf(i,t){i.uniform3iv(this.addr,t)}function yf(i,t){i.uniform4iv(this.addr,t)}function Ef(i,t){i.uniform1uiv(this.addr,t)}function Tf(i,t){i.uniform2uiv(this.addr,t)}function bf(i,t){i.uniform3uiv(this.addr,t)}function Af(i,t){i.uniform4uiv(this.addr,t)}function wf(i,t,e){const n=this.cache,r=t.length,s=_r(e,r);ae(n,s)||(i.uniform1iv(this.addr,s),le(n,s));for(let a=0;a!==r;++a)e.setTexture2D(t[a]||za,s[a])}function Rf(i,t,e){const n=this.cache,r=t.length,s=_r(e,r);ae(n,s)||(i.uniform1iv(this.addr,s),le(n,s));for(let a=0;a!==r;++a)e.setTexture3D(t[a]||Ga,s[a])}function Cf(i,t,e){const n=this.cache,r=t.length,s=_r(e,r);ae(n,s)||(i.uniform1iv(this.addr,s),le(n,s));for(let a=0;a!==r;++a)e.setTextureCube(t[a]||Ha,s[a])}function Lf(i,t,e){const n=this.cache,r=t.length,s=_r(e,r);ae(n,s)||(i.uniform1iv(this.addr,s),le(n,s));for(let a=0;a!==r;++a)e.setTexture2DArray(t[a]||Va,s[a])}function Pf(i){switch(i){case 5126:return uf;case 35664:return ff;case 35665:return pf;case 35666:return mf;case 35674:return gf;case 35675:return _f;case 35676:return vf;case 5124:case 35670:return xf;case 35667:case 35671:return Mf;case 35668:case 35672:return Sf;case 35669:case 35673:return yf;case 5125:return Ef;case 36294:return Tf;case 36295:return bf;case 36296:return Af;case 35678:case 36198:case 36298:case 36306:case 35682:return wf;case 35679:case 36299:case 36307:return Rf;case 35680:case 36300:case 36308:case 36293:return Cf;case 36289:case 36303:case 36311:case 36292:return Lf}}class Df{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=df(e.type)}}class Uf{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Pf(e.type)}}class If{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(t,e[o.id],n)}}}const Zr=/(\w+)(\])?(\[|\.)?/g;function Wo(i,t){i.seq.push(t),i.map[t.id]=t}function Nf(i,t,e){const n=i.name,r=n.length;for(Zr.lastIndex=0;;){const s=Zr.exec(n),a=Zr.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){Wo(e,c===void 0?new Df(o,i,t):new Uf(o,i,t));break}else{let d=e.map[o];d===void 0&&(d=new If(o),Wo(e,d)),e=d}}}class nr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const s=t.getActiveUniform(e,r),a=t.getUniformLocation(e,s.name);Nf(s,a,this)}}setValue(t,e,n,r){const s=this.map[e];s!==void 0&&s.setValue(t,n,r)}setOptional(t,e,n){const r=e[n];r!==void 0&&this.setValue(t,n,r)}static upload(t,e,n,r){for(let s=0,a=e.length;s!==a;++s){const o=e[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,r)}}static seqWithValue(t,e){const n=[];for(let r=0,s=t.length;r!==s;++r){const a=t[r];a.id in e&&n.push(a)}return n}}function Xo(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const Ff=37297;let Of=0;function Bf(i,t){const e=i.split(`
`),n=[],r=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let a=r;a<s;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}function zf(i){const t=Yt.getPrimaries(Yt.workingColorSpace),e=Yt.getPrimaries(i);let n;switch(t===e?n="":t===ar&&e===or?n="LinearDisplayP3ToLinearSRGB":t===or&&e===ar&&(n="LinearSRGBToLinearDisplayP3"),i){case an:case pr:return[n,"LinearTransferOETF"];case fe:case gs:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function qo(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=i.getShaderInfoLog(t).trim();if(n&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return e.toUpperCase()+`

`+r+`

`+Bf(i.getShaderSource(t),a)}else return r}function kf(i,t){const e=zf(t);return`vec4 ${i}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function Vf(i,t){let e;switch(t){case Bl:e="Linear";break;case zl:e="Reinhard";break;case kl:e="OptimizedCineon";break;case Vl:e="ACESFilmic";break;case Hl:e="AgX";break;case Gl:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function Gf(i){return[i.extensionDerivatives||i.envMapCubeUVHeight||i.bumpMap||i.normalMapTangentSpace||i.clearcoatNormalMap||i.flatShading||i.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(i.extensionFragDepth||i.logarithmicDepthBuffer)&&i.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",i.extensionDrawBuffers&&i.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(i.extensionShaderTextureLOD||i.envMap||i.transmission)&&i.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Qn).join(`
`)}function Hf(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Qn).join(`
`)}function Wf(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Xf(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(t,r),a=s.name;let o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),e[a]={type:s.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function Qn(i){return i!==""}function Yo(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function $o(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const qf=/^[ \t]*#include +<([\w\d./]+)>/gm;function fs(i){return i.replace(qf,$f)}const Yf=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function $f(i,t){let e=Ut[t];if(e===void 0){const n=Yf.get(t);if(n!==void 0)e=Ut[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return fs(e)}const jf=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function jo(i){return i.replace(jf,Kf)}function Kf(i,t,e,n){let r="";for(let s=parseInt(t);s<parseInt(e);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Ko(i){let t="precision "+i.precision+` float;
precision `+i.precision+" int;";return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Zf(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===ha?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===ul?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===nn&&(t="SHADOWMAP_TYPE_VSM"),t}function Jf(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case ii:case ri:t="ENVMAP_TYPE_CUBE";break;case fr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Qf(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case ri:t="ENVMAP_MODE_REFRACTION";break}return t}function tp(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case da:t="ENVMAP_BLENDING_MULTIPLY";break;case Fl:t="ENVMAP_BLENDING_MIX";break;case Ol:t="ENVMAP_BLENDING_ADD";break}return t}function ep(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function np(i,t,e,n){const r=i.getContext(),s=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=Zf(e),c=Jf(e),h=Qf(e),d=tp(e),u=ep(e),m=e.isWebGL2?"":Gf(e),v=Hf(e),x=Wf(s),p=r.createProgram();let f,g,_=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(Qn).join(`
`),f.length>0&&(f+=`
`),g=[m,"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(Qn).join(`
`),g.length>0&&(g+=`
`)):(f=[Ko(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors&&e.isWebGL2?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Qn).join(`
`),g=[m,Ko(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==gn?"#define TONE_MAPPING":"",e.toneMapping!==gn?Ut.tonemapping_pars_fragment:"",e.toneMapping!==gn?Vf("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ut.colorspace_pars_fragment,kf("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Qn).join(`
`)),a=fs(a),a=Yo(a,e),a=$o(a,e),o=fs(o),o=Yo(o,e),o=$o(o,e),a=jo(a),o=jo(o),e.isWebGL2&&e.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,f=[v,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,g=["precision mediump sampler2DArray;","#define varying in",e.glslVersion===po?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===po?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const E=_+f+a,C=_+g+o,b=Xo(r,r.VERTEX_SHADER,E),w=Xo(r,r.FRAGMENT_SHADER,C);r.attachShader(p,b),r.attachShader(p,w),e.index0AttributeName!==void 0?r.bindAttribLocation(p,0,e.index0AttributeName):e.morphTargets===!0&&r.bindAttribLocation(p,0,"position"),r.linkProgram(p);function W(V){if(i.debug.checkShaderErrors){const J=r.getProgramInfoLog(p).trim(),L=r.getShaderInfoLog(b).trim(),N=r.getShaderInfoLog(w).trim();let k=!0,Y=!0;if(r.getProgramParameter(p,r.LINK_STATUS)===!1)if(k=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,p,b,w);else{const H=qo(r,b,"vertex"),X=qo(r,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(p,r.VALIDATE_STATUS)+`

Program Info Log: `+J+`
`+H+`
`+X)}else J!==""?console.warn("THREE.WebGLProgram: Program Info Log:",J):(L===""||N==="")&&(Y=!1);Y&&(V.diagnostics={runnable:k,programLog:J,vertexShader:{log:L,prefix:f},fragmentShader:{log:N,prefix:g}})}r.deleteShader(b),r.deleteShader(w),y=new nr(r,p),A=Xf(r,p)}let y;this.getUniforms=function(){return y===void 0&&W(this),y};let A;this.getAttributes=function(){return A===void 0&&W(this),A};let G=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return G===!1&&(G=r.getProgramParameter(p,Ff)),G},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(p),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Of++,this.cacheKey=t,this.usedTimes=1,this.program=p,this.vertexShader=b,this.fragmentShader=w,this}let ip=0;class rp{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,r=this._getShaderStage(e),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new sp(t),e.set(t,n)),n}}class sp{constructor(t){this.id=ip++,this.code=t,this.usedTimes=0}}function op(i,t,e,n,r,s,a){const o=new Ra,l=new rp,c=[],h=r.isWebGL2,d=r.logarithmicDepthBuffer,u=r.vertexTextures;let m=r.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(y){return y===0?"uv":`uv${y}`}function p(y,A,G,V,J){const L=V.fog,N=J.geometry,k=y.isMeshStandardMaterial?V.environment:null,Y=(y.isMeshStandardMaterial?e:t).get(y.envMap||k),H=Y&&Y.mapping===fr?Y.image.height:null,X=v[y.type];y.precision!==null&&(m=r.getMaxPrecision(y.precision),m!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",m,"instead."));const q=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,et=q!==void 0?q.length:0;let nt=0;N.morphAttributes.position!==void 0&&(nt=1),N.morphAttributes.normal!==void 0&&(nt=2),N.morphAttributes.color!==void 0&&(nt=3);let z,$,st,ut;if(X){const ye=Ye[X];z=ye.vertexShader,$=ye.fragmentShader}else z=y.vertexShader,$=y.fragmentShader,l.update(y),st=l.getVertexShaderID(y),ut=l.getFragmentShaderID(y);const ft=i.getRenderTarget(),At=J.isInstancedMesh===!0,Rt=J.isBatchedMesh===!0,St=!!y.map,Vt=!!y.matcap,U=!!Y,Se=!!y.aoMap,vt=!!y.lightMap,Ct=!!y.bumpMap,pt=!!y.normalMap,Qt=!!y.displacementMap,It=!!y.emissiveMap,T=!!y.metalnessMap,M=!!y.roughnessMap,F=y.anisotropy>0,Q=y.clearcoat>0,K=y.iridescence>0,tt=y.sheen>0,mt=y.transmission>0,lt=F&&!!y.anisotropyMap,ht=Q&&!!y.clearcoatMap,yt=Q&&!!y.clearcoatNormalMap,Nt=Q&&!!y.clearcoatRoughnessMap,j=K&&!!y.iridescenceMap,qt=K&&!!y.iridescenceThicknessMap,kt=tt&&!!y.sheenColorMap,wt=tt&&!!y.sheenRoughnessMap,_t=!!y.specularMap,dt=!!y.specularColorMap,Dt=!!y.specularIntensityMap,Wt=mt&&!!y.transmissionMap,ee=mt&&!!y.thicknessMap,Ot=!!y.gradientMap,it=!!y.alphaMap,R=y.alphaTest>0,ot=!!y.alphaHash,at=!!y.extensions,Tt=!!N.attributes.uv1,xt=!!N.attributes.uv2,$t=!!N.attributes.uv3;let jt=gn;return y.toneMapped&&(ft===null||ft.isXRRenderTarget===!0)&&(jt=i.toneMapping),{isWebGL2:h,shaderID:X,shaderType:y.type,shaderName:y.name,vertexShader:z,fragmentShader:$,defines:y.defines,customVertexShaderID:st,customFragmentShaderID:ut,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:m,batching:Rt,instancing:At,instancingColor:At&&J.instanceColor!==null,supportsVertexTextures:u,outputColorSpace:ft===null?i.outputColorSpace:ft.isXRRenderTarget===!0?ft.texture.colorSpace:an,map:St,matcap:Vt,envMap:U,envMapMode:U&&Y.mapping,envMapCubeUVHeight:H,aoMap:Se,lightMap:vt,bumpMap:Ct,normalMap:pt,displacementMap:u&&Qt,emissiveMap:It,normalMapObjectSpace:pt&&y.normalMapType===ec,normalMapTangentSpace:pt&&y.normalMapType===Sa,metalnessMap:T,roughnessMap:M,anisotropy:F,anisotropyMap:lt,clearcoat:Q,clearcoatMap:ht,clearcoatNormalMap:yt,clearcoatRoughnessMap:Nt,iridescence:K,iridescenceMap:j,iridescenceThicknessMap:qt,sheen:tt,sheenColorMap:kt,sheenRoughnessMap:wt,specularMap:_t,specularColorMap:dt,specularIntensityMap:Dt,transmission:mt,transmissionMap:Wt,thicknessMap:ee,gradientMap:Ot,opaque:y.transparent===!1&&y.blending===ti,alphaMap:it,alphaTest:R,alphaHash:ot,combine:y.combine,mapUv:St&&x(y.map.channel),aoMapUv:Se&&x(y.aoMap.channel),lightMapUv:vt&&x(y.lightMap.channel),bumpMapUv:Ct&&x(y.bumpMap.channel),normalMapUv:pt&&x(y.normalMap.channel),displacementMapUv:Qt&&x(y.displacementMap.channel),emissiveMapUv:It&&x(y.emissiveMap.channel),metalnessMapUv:T&&x(y.metalnessMap.channel),roughnessMapUv:M&&x(y.roughnessMap.channel),anisotropyMapUv:lt&&x(y.anisotropyMap.channel),clearcoatMapUv:ht&&x(y.clearcoatMap.channel),clearcoatNormalMapUv:yt&&x(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Nt&&x(y.clearcoatRoughnessMap.channel),iridescenceMapUv:j&&x(y.iridescenceMap.channel),iridescenceThicknessMapUv:qt&&x(y.iridescenceThicknessMap.channel),sheenColorMapUv:kt&&x(y.sheenColorMap.channel),sheenRoughnessMapUv:wt&&x(y.sheenRoughnessMap.channel),specularMapUv:_t&&x(y.specularMap.channel),specularColorMapUv:dt&&x(y.specularColorMap.channel),specularIntensityMapUv:Dt&&x(y.specularIntensityMap.channel),transmissionMapUv:Wt&&x(y.transmissionMap.channel),thicknessMapUv:ee&&x(y.thicknessMap.channel),alphaMapUv:it&&x(y.alphaMap.channel),vertexTangents:!!N.attributes.tangent&&(pt||F),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,vertexUv1s:Tt,vertexUv2s:xt,vertexUv3s:$t,pointsUvs:J.isPoints===!0&&!!N.attributes.uv&&(St||it),fog:!!L,useFog:y.fog===!0,fogExp2:L&&L.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,skinning:J.isSkinnedMesh===!0,morphTargets:N.morphAttributes.position!==void 0,morphNormals:N.morphAttributes.normal!==void 0,morphColors:N.morphAttributes.color!==void 0,morphTargetsCount:et,morphTextureStride:nt,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&G.length>0,shadowMapType:i.shadowMap.type,toneMapping:jt,useLegacyLights:i._useLegacyLights,decodeVideoTexture:St&&y.map.isVideoTexture===!0&&Yt.getTransfer(y.map.colorSpace)===Jt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===sn,flipSided:y.side===Re,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionDerivatives:at&&y.extensions.derivatives===!0,extensionFragDepth:at&&y.extensions.fragDepth===!0,extensionDrawBuffers:at&&y.extensions.drawBuffers===!0,extensionShaderTextureLOD:at&&y.extensions.shaderTextureLOD===!0,extensionClipCullDistance:at&&y.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()}}function f(y){const A=[];if(y.shaderID?A.push(y.shaderID):(A.push(y.customVertexShaderID),A.push(y.customFragmentShaderID)),y.defines!==void 0)for(const G in y.defines)A.push(G),A.push(y.defines[G]);return y.isRawShaderMaterial===!1&&(g(A,y),_(A,y),A.push(i.outputColorSpace)),A.push(y.customProgramCacheKey),A.join()}function g(y,A){y.push(A.precision),y.push(A.outputColorSpace),y.push(A.envMapMode),y.push(A.envMapCubeUVHeight),y.push(A.mapUv),y.push(A.alphaMapUv),y.push(A.lightMapUv),y.push(A.aoMapUv),y.push(A.bumpMapUv),y.push(A.normalMapUv),y.push(A.displacementMapUv),y.push(A.emissiveMapUv),y.push(A.metalnessMapUv),y.push(A.roughnessMapUv),y.push(A.anisotropyMapUv),y.push(A.clearcoatMapUv),y.push(A.clearcoatNormalMapUv),y.push(A.clearcoatRoughnessMapUv),y.push(A.iridescenceMapUv),y.push(A.iridescenceThicknessMapUv),y.push(A.sheenColorMapUv),y.push(A.sheenRoughnessMapUv),y.push(A.specularMapUv),y.push(A.specularColorMapUv),y.push(A.specularIntensityMapUv),y.push(A.transmissionMapUv),y.push(A.thicknessMapUv),y.push(A.combine),y.push(A.fogExp2),y.push(A.sizeAttenuation),y.push(A.morphTargetsCount),y.push(A.morphAttributeCount),y.push(A.numDirLights),y.push(A.numPointLights),y.push(A.numSpotLights),y.push(A.numSpotLightMaps),y.push(A.numHemiLights),y.push(A.numRectAreaLights),y.push(A.numDirLightShadows),y.push(A.numPointLightShadows),y.push(A.numSpotLightShadows),y.push(A.numSpotLightShadowsWithMaps),y.push(A.numLightProbes),y.push(A.shadowMapType),y.push(A.toneMapping),y.push(A.numClippingPlanes),y.push(A.numClipIntersection),y.push(A.depthPacking)}function _(y,A){o.disableAll(),A.isWebGL2&&o.enable(0),A.supportsVertexTextures&&o.enable(1),A.instancing&&o.enable(2),A.instancingColor&&o.enable(3),A.matcap&&o.enable(4),A.envMap&&o.enable(5),A.normalMapObjectSpace&&o.enable(6),A.normalMapTangentSpace&&o.enable(7),A.clearcoat&&o.enable(8),A.iridescence&&o.enable(9),A.alphaTest&&o.enable(10),A.vertexColors&&o.enable(11),A.vertexAlphas&&o.enable(12),A.vertexUv1s&&o.enable(13),A.vertexUv2s&&o.enable(14),A.vertexUv3s&&o.enable(15),A.vertexTangents&&o.enable(16),A.anisotropy&&o.enable(17),A.alphaHash&&o.enable(18),A.batching&&o.enable(19),y.push(o.mask),o.disableAll(),A.fog&&o.enable(0),A.useFog&&o.enable(1),A.flatShading&&o.enable(2),A.logarithmicDepthBuffer&&o.enable(3),A.skinning&&o.enable(4),A.morphTargets&&o.enable(5),A.morphNormals&&o.enable(6),A.morphColors&&o.enable(7),A.premultipliedAlpha&&o.enable(8),A.shadowMapEnabled&&o.enable(9),A.useLegacyLights&&o.enable(10),A.doubleSided&&o.enable(11),A.flipSided&&o.enable(12),A.useDepthPacking&&o.enable(13),A.dithering&&o.enable(14),A.transmission&&o.enable(15),A.sheen&&o.enable(16),A.opaque&&o.enable(17),A.pointsUvs&&o.enable(18),A.decodeVideoTexture&&o.enable(19),y.push(o.mask)}function E(y){const A=v[y.type];let G;if(A){const V=Ye[A];G=Vc.clone(V.uniforms)}else G=y.uniforms;return G}function C(y,A){let G;for(let V=0,J=c.length;V<J;V++){const L=c[V];if(L.cacheKey===A){G=L,++G.usedTimes;break}}return G===void 0&&(G=new np(i,A,y,s),c.push(G)),G}function b(y){if(--y.usedTimes===0){const A=c.indexOf(y);c[A]=c[c.length-1],c.pop(),y.destroy()}}function w(y){l.remove(y)}function W(){l.dispose()}return{getParameters:p,getProgramCacheKey:f,getUniforms:E,acquireProgram:C,releaseProgram:b,releaseShaderCache:w,programs:c,dispose:W}}function ap(){let i=new WeakMap;function t(s){let a=i.get(s);return a===void 0&&(a={},i.set(s,a)),a}function e(s){i.delete(s)}function n(s,a,o){i.get(s)[a]=o}function r(){i=new WeakMap}return{get:t,remove:e,update:n,dispose:r}}function lp(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Zo(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Jo(){const i=[];let t=0;const e=[],n=[],r=[];function s(){t=0,e.length=0,n.length=0,r.length=0}function a(d,u,m,v,x,p){let f=i[t];return f===void 0?(f={id:d.id,object:d,geometry:u,material:m,groupOrder:v,renderOrder:d.renderOrder,z:x,group:p},i[t]=f):(f.id=d.id,f.object=d,f.geometry=u,f.material=m,f.groupOrder=v,f.renderOrder=d.renderOrder,f.z=x,f.group=p),t++,f}function o(d,u,m,v,x,p){const f=a(d,u,m,v,x,p);m.transmission>0?n.push(f):m.transparent===!0?r.push(f):e.push(f)}function l(d,u,m,v,x,p){const f=a(d,u,m,v,x,p);m.transmission>0?n.unshift(f):m.transparent===!0?r.unshift(f):e.unshift(f)}function c(d,u){e.length>1&&e.sort(d||lp),n.length>1&&n.sort(u||Zo),r.length>1&&r.sort(u||Zo)}function h(){for(let d=t,u=i.length;d<u;d++){const m=i[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:n,transparent:r,init:s,push:o,unshift:l,finish:h,sort:c}}function cp(){let i=new WeakMap;function t(n,r){const s=i.get(n);let a;return s===void 0?(a=new Jo,i.set(n,[a])):r>=s.length?(a=new Jo,s.push(a)):a=s[r],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function hp(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new D,color:new Gt};break;case"SpotLight":e={position:new D,direction:new D,color:new Gt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new D,color:new Gt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new D,skyColor:new Gt,groundColor:new Gt};break;case"RectAreaLight":e={color:new Gt,position:new D,halfWidth:new D,halfHeight:new D};break}return i[t.id]=e,e}}}function dp(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ht};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ht};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ht,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let up=0;function fp(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function pp(i,t){const e=new hp,n=dp(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)r.probe.push(new D);const s=new D,a=new oe,o=new oe;function l(h,d){let u=0,m=0,v=0;for(let V=0;V<9;V++)r.probe[V].set(0,0,0);let x=0,p=0,f=0,g=0,_=0,E=0,C=0,b=0,w=0,W=0,y=0;h.sort(fp);const A=d===!0?Math.PI:1;for(let V=0,J=h.length;V<J;V++){const L=h[V],N=L.color,k=L.intensity,Y=L.distance,H=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)u+=N.r*k*A,m+=N.g*k*A,v+=N.b*k*A;else if(L.isLightProbe){for(let X=0;X<9;X++)r.probe[X].addScaledVector(L.sh.coefficients[X],k);y++}else if(L.isDirectionalLight){const X=e.get(L);if(X.color.copy(L.color).multiplyScalar(L.intensity*A),L.castShadow){const q=L.shadow,et=n.get(L);et.shadowBias=q.bias,et.shadowNormalBias=q.normalBias,et.shadowRadius=q.radius,et.shadowMapSize=q.mapSize,r.directionalShadow[x]=et,r.directionalShadowMap[x]=H,r.directionalShadowMatrix[x]=L.shadow.matrix,E++}r.directional[x]=X,x++}else if(L.isSpotLight){const X=e.get(L);X.position.setFromMatrixPosition(L.matrixWorld),X.color.copy(N).multiplyScalar(k*A),X.distance=Y,X.coneCos=Math.cos(L.angle),X.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),X.decay=L.decay,r.spot[f]=X;const q=L.shadow;if(L.map&&(r.spotLightMap[w]=L.map,w++,q.updateMatrices(L),L.castShadow&&W++),r.spotLightMatrix[f]=q.matrix,L.castShadow){const et=n.get(L);et.shadowBias=q.bias,et.shadowNormalBias=q.normalBias,et.shadowRadius=q.radius,et.shadowMapSize=q.mapSize,r.spotShadow[f]=et,r.spotShadowMap[f]=H,b++}f++}else if(L.isRectAreaLight){const X=e.get(L);X.color.copy(N).multiplyScalar(k),X.halfWidth.set(L.width*.5,0,0),X.halfHeight.set(0,L.height*.5,0),r.rectArea[g]=X,g++}else if(L.isPointLight){const X=e.get(L);if(X.color.copy(L.color).multiplyScalar(L.intensity*A),X.distance=L.distance,X.decay=L.decay,L.castShadow){const q=L.shadow,et=n.get(L);et.shadowBias=q.bias,et.shadowNormalBias=q.normalBias,et.shadowRadius=q.radius,et.shadowMapSize=q.mapSize,et.shadowCameraNear=q.camera.near,et.shadowCameraFar=q.camera.far,r.pointShadow[p]=et,r.pointShadowMap[p]=H,r.pointShadowMatrix[p]=L.shadow.matrix,C++}r.point[p]=X,p++}else if(L.isHemisphereLight){const X=e.get(L);X.skyColor.copy(L.color).multiplyScalar(k*A),X.groundColor.copy(L.groundColor).multiplyScalar(k*A),r.hemi[_]=X,_++}}g>0&&(t.isWebGL2?i.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=rt.LTC_FLOAT_1,r.rectAreaLTC2=rt.LTC_FLOAT_2):(r.rectAreaLTC1=rt.LTC_HALF_1,r.rectAreaLTC2=rt.LTC_HALF_2):i.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=rt.LTC_FLOAT_1,r.rectAreaLTC2=rt.LTC_FLOAT_2):i.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=rt.LTC_HALF_1,r.rectAreaLTC2=rt.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=u,r.ambient[1]=m,r.ambient[2]=v;const G=r.hash;(G.directionalLength!==x||G.pointLength!==p||G.spotLength!==f||G.rectAreaLength!==g||G.hemiLength!==_||G.numDirectionalShadows!==E||G.numPointShadows!==C||G.numSpotShadows!==b||G.numSpotMaps!==w||G.numLightProbes!==y)&&(r.directional.length=x,r.spot.length=f,r.rectArea.length=g,r.point.length=p,r.hemi.length=_,r.directionalShadow.length=E,r.directionalShadowMap.length=E,r.pointShadow.length=C,r.pointShadowMap.length=C,r.spotShadow.length=b,r.spotShadowMap.length=b,r.directionalShadowMatrix.length=E,r.pointShadowMatrix.length=C,r.spotLightMatrix.length=b+w-W,r.spotLightMap.length=w,r.numSpotLightShadowsWithMaps=W,r.numLightProbes=y,G.directionalLength=x,G.pointLength=p,G.spotLength=f,G.rectAreaLength=g,G.hemiLength=_,G.numDirectionalShadows=E,G.numPointShadows=C,G.numSpotShadows=b,G.numSpotMaps=w,G.numLightProbes=y,r.version=up++)}function c(h,d){let u=0,m=0,v=0,x=0,p=0;const f=d.matrixWorldInverse;for(let g=0,_=h.length;g<_;g++){const E=h[g];if(E.isDirectionalLight){const C=r.directional[u];C.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),C.direction.sub(s),C.direction.transformDirection(f),u++}else if(E.isSpotLight){const C=r.spot[v];C.position.setFromMatrixPosition(E.matrixWorld),C.position.applyMatrix4(f),C.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),C.direction.sub(s),C.direction.transformDirection(f),v++}else if(E.isRectAreaLight){const C=r.rectArea[x];C.position.setFromMatrixPosition(E.matrixWorld),C.position.applyMatrix4(f),o.identity(),a.copy(E.matrixWorld),a.premultiply(f),o.extractRotation(a),C.halfWidth.set(E.width*.5,0,0),C.halfHeight.set(0,E.height*.5,0),C.halfWidth.applyMatrix4(o),C.halfHeight.applyMatrix4(o),x++}else if(E.isPointLight){const C=r.point[m];C.position.setFromMatrixPosition(E.matrixWorld),C.position.applyMatrix4(f),m++}else if(E.isHemisphereLight){const C=r.hemi[p];C.direction.setFromMatrixPosition(E.matrixWorld),C.direction.transformDirection(f),p++}}}return{setup:l,setupView:c,state:r}}function Qo(i,t){const e=new pp(i,t),n=[],r=[];function s(){n.length=0,r.length=0}function a(d){n.push(d)}function o(d){r.push(d)}function l(d){e.setup(n,d)}function c(d){e.setupView(n,d)}return{init:s,state:{lightsArray:n,shadowsArray:r,lights:e},setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function mp(i,t){let e=new WeakMap;function n(s,a=0){const o=e.get(s);let l;return o===void 0?(l=new Qo(i,t),e.set(s,[l])):a>=o.length?(l=new Qo(i,t),o.push(l)):l=o[a],l}function r(){e=new WeakMap}return{get:n,dispose:r}}class gp extends hi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ql,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class _p extends hi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const vp=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,xp=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Mp(i,t,e){let n=new vs;const r=new Ht,s=new Ht,a=new ue,o=new gp({depthPacking:tc}),l=new _p,c={},h=e.maxTextureSize,d={[vn]:Re,[Re]:vn,[sn]:sn},u=new In({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ht},radius:{value:4}},vertexShader:vp,fragmentShader:xp}),m=u.clone();m.defines.HORIZONTAL_PASS=1;const v=new We;v.setAttribute("position",new je(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new $e(v,u),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ha;let f=this.type;this.render=function(b,w,W){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||b.length===0)return;const y=i.getRenderTarget(),A=i.getActiveCubeFace(),G=i.getActiveMipmapLevel(),V=i.state;V.setBlending(mn),V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);const J=f!==nn&&this.type===nn,L=f===nn&&this.type!==nn;for(let N=0,k=b.length;N<k;N++){const Y=b[N],H=Y.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",Y,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;r.copy(H.mapSize);const X=H.getFrameExtents();if(r.multiply(X),s.copy(H.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/X.x),r.x=s.x*X.x,H.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/X.y),r.y=s.y*X.y,H.mapSize.y=s.y)),H.map===null||J===!0||L===!0){const et=this.type!==nn?{minFilter:Ae,magFilter:Ae}:{};H.map!==null&&H.map.dispose(),H.map=new Un(r.x,r.y,et),H.map.texture.name=Y.name+".shadowMap",H.camera.updateProjectionMatrix()}i.setRenderTarget(H.map),i.clear();const q=H.getViewportCount();for(let et=0;et<q;et++){const nt=H.getViewport(et);a.set(s.x*nt.x,s.y*nt.y,s.x*nt.z,s.y*nt.w),V.viewport(a),H.updateMatrices(Y,et),n=H.getFrustum(),E(w,W,H.camera,Y,this.type)}H.isPointLightShadow!==!0&&this.type===nn&&g(H,W),H.needsUpdate=!1}f=this.type,p.needsUpdate=!1,i.setRenderTarget(y,A,G)};function g(b,w){const W=t.update(x);u.defines.VSM_SAMPLES!==b.blurSamples&&(u.defines.VSM_SAMPLES=b.blurSamples,m.defines.VSM_SAMPLES=b.blurSamples,u.needsUpdate=!0,m.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new Un(r.x,r.y)),u.uniforms.shadow_pass.value=b.map.texture,u.uniforms.resolution.value=b.mapSize,u.uniforms.radius.value=b.radius,i.setRenderTarget(b.mapPass),i.clear(),i.renderBufferDirect(w,null,W,u,x,null),m.uniforms.shadow_pass.value=b.mapPass.texture,m.uniforms.resolution.value=b.mapSize,m.uniforms.radius.value=b.radius,i.setRenderTarget(b.map),i.clear(),i.renderBufferDirect(w,null,W,m,x,null)}function _(b,w,W,y){let A=null;const G=W.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(G!==void 0)A=G;else if(A=W.isPointLight===!0?l:o,i.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const V=A.uuid,J=w.uuid;let L=c[V];L===void 0&&(L={},c[V]=L);let N=L[J];N===void 0&&(N=A.clone(),L[J]=N,w.addEventListener("dispose",C)),A=N}if(A.visible=w.visible,A.wireframe=w.wireframe,y===nn?A.side=w.shadowSide!==null?w.shadowSide:w.side:A.side=w.shadowSide!==null?w.shadowSide:d[w.side],A.alphaMap=w.alphaMap,A.alphaTest=w.alphaTest,A.map=w.map,A.clipShadows=w.clipShadows,A.clippingPlanes=w.clippingPlanes,A.clipIntersection=w.clipIntersection,A.displacementMap=w.displacementMap,A.displacementScale=w.displacementScale,A.displacementBias=w.displacementBias,A.wireframeLinewidth=w.wireframeLinewidth,A.linewidth=w.linewidth,W.isPointLight===!0&&A.isMeshDistanceMaterial===!0){const V=i.properties.get(A);V.light=W}return A}function E(b,w,W,y,A){if(b.visible===!1)return;if(b.layers.test(w.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&A===nn)&&(!b.frustumCulled||n.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,b.matrixWorld);const J=t.update(b),L=b.material;if(Array.isArray(L)){const N=J.groups;for(let k=0,Y=N.length;k<Y;k++){const H=N[k],X=L[H.materialIndex];if(X&&X.visible){const q=_(b,X,y,A);b.onBeforeShadow(i,b,w,W,J,q,H),i.renderBufferDirect(W,null,J,q,b,H),b.onAfterShadow(i,b,w,W,J,q,H)}}}else if(L.visible){const N=_(b,L,y,A);b.onBeforeShadow(i,b,w,W,J,N,null),i.renderBufferDirect(W,null,J,N,b,null),b.onAfterShadow(i,b,w,W,J,N,null)}}const V=b.children;for(let J=0,L=V.length;J<L;J++)E(V[J],w,W,y,A)}function C(b){b.target.removeEventListener("dispose",C);for(const W in c){const y=c[W],A=b.target.uuid;A in y&&(y[A].dispose(),delete y[A])}}}function Sp(i,t,e){const n=e.isWebGL2;function r(){let R=!1;const ot=new ue;let at=null;const Tt=new ue(0,0,0,0);return{setMask:function(xt){at!==xt&&!R&&(i.colorMask(xt,xt,xt,xt),at=xt)},setLocked:function(xt){R=xt},setClear:function(xt,$t,jt,ce,ye){ye===!0&&(xt*=ce,$t*=ce,jt*=ce),ot.set(xt,$t,jt,ce),Tt.equals(ot)===!1&&(i.clearColor(xt,$t,jt,ce),Tt.copy(ot))},reset:function(){R=!1,at=null,Tt.set(-1,0,0,0)}}}function s(){let R=!1,ot=null,at=null,Tt=null;return{setTest:function(xt){xt?Rt(i.DEPTH_TEST):St(i.DEPTH_TEST)},setMask:function(xt){ot!==xt&&!R&&(i.depthMask(xt),ot=xt)},setFunc:function(xt){if(at!==xt){switch(xt){case Cl:i.depthFunc(i.NEVER);break;case Ll:i.depthFunc(i.ALWAYS);break;case Pl:i.depthFunc(i.LESS);break;case rr:i.depthFunc(i.LEQUAL);break;case Dl:i.depthFunc(i.EQUAL);break;case Ul:i.depthFunc(i.GEQUAL);break;case Il:i.depthFunc(i.GREATER);break;case Nl:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}at=xt}},setLocked:function(xt){R=xt},setClear:function(xt){Tt!==xt&&(i.clearDepth(xt),Tt=xt)},reset:function(){R=!1,ot=null,at=null,Tt=null}}}function a(){let R=!1,ot=null,at=null,Tt=null,xt=null,$t=null,jt=null,ce=null,ye=null;return{setTest:function(Kt){R||(Kt?Rt(i.STENCIL_TEST):St(i.STENCIL_TEST))},setMask:function(Kt){ot!==Kt&&!R&&(i.stencilMask(Kt),ot=Kt)},setFunc:function(Kt,Ee,Xe){(at!==Kt||Tt!==Ee||xt!==Xe)&&(i.stencilFunc(Kt,Ee,Xe),at=Kt,Tt=Ee,xt=Xe)},setOp:function(Kt,Ee,Xe){($t!==Kt||jt!==Ee||ce!==Xe)&&(i.stencilOp(Kt,Ee,Xe),$t=Kt,jt=Ee,ce=Xe)},setLocked:function(Kt){R=Kt},setClear:function(Kt){ye!==Kt&&(i.clearStencil(Kt),ye=Kt)},reset:function(){R=!1,ot=null,at=null,Tt=null,xt=null,$t=null,jt=null,ce=null,ye=null}}}const o=new r,l=new s,c=new a,h=new WeakMap,d=new WeakMap;let u={},m={},v=new WeakMap,x=[],p=null,f=!1,g=null,_=null,E=null,C=null,b=null,w=null,W=null,y=new Gt(0,0,0),A=0,G=!1,V=null,J=null,L=null,N=null,k=null;const Y=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,X=0;const q=i.getParameter(i.VERSION);q.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(q)[1]),H=X>=1):q.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),H=X>=2);let et=null,nt={};const z=i.getParameter(i.SCISSOR_BOX),$=i.getParameter(i.VIEWPORT),st=new ue().fromArray(z),ut=new ue().fromArray($);function ft(R,ot,at,Tt){const xt=new Uint8Array(4),$t=i.createTexture();i.bindTexture(R,$t),i.texParameteri(R,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(R,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let jt=0;jt<at;jt++)n&&(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)?i.texImage3D(ot,0,i.RGBA,1,1,Tt,0,i.RGBA,i.UNSIGNED_BYTE,xt):i.texImage2D(ot+jt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,xt);return $t}const At={};At[i.TEXTURE_2D]=ft(i.TEXTURE_2D,i.TEXTURE_2D,1),At[i.TEXTURE_CUBE_MAP]=ft(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(At[i.TEXTURE_2D_ARRAY]=ft(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),At[i.TEXTURE_3D]=ft(i.TEXTURE_3D,i.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),l.setClear(1),c.setClear(0),Rt(i.DEPTH_TEST),l.setFunc(rr),It(!1),T(Us),Rt(i.CULL_FACE),pt(mn);function Rt(R){u[R]!==!0&&(i.enable(R),u[R]=!0)}function St(R){u[R]!==!1&&(i.disable(R),u[R]=!1)}function Vt(R,ot){return m[R]!==ot?(i.bindFramebuffer(R,ot),m[R]=ot,n&&(R===i.DRAW_FRAMEBUFFER&&(m[i.FRAMEBUFFER]=ot),R===i.FRAMEBUFFER&&(m[i.DRAW_FRAMEBUFFER]=ot)),!0):!1}function U(R,ot){let at=x,Tt=!1;if(R)if(at=v.get(ot),at===void 0&&(at=[],v.set(ot,at)),R.isWebGLMultipleRenderTargets){const xt=R.texture;if(at.length!==xt.length||at[0]!==i.COLOR_ATTACHMENT0){for(let $t=0,jt=xt.length;$t<jt;$t++)at[$t]=i.COLOR_ATTACHMENT0+$t;at.length=xt.length,Tt=!0}}else at[0]!==i.COLOR_ATTACHMENT0&&(at[0]=i.COLOR_ATTACHMENT0,Tt=!0);else at[0]!==i.BACK&&(at[0]=i.BACK,Tt=!0);Tt&&(e.isWebGL2?i.drawBuffers(at):t.get("WEBGL_draw_buffers").drawBuffersWEBGL(at))}function Se(R){return p!==R?(i.useProgram(R),p=R,!0):!1}const vt={[Rn]:i.FUNC_ADD,[pl]:i.FUNC_SUBTRACT,[ml]:i.FUNC_REVERSE_SUBTRACT};if(n)vt[Os]=i.MIN,vt[Bs]=i.MAX;else{const R=t.get("EXT_blend_minmax");R!==null&&(vt[Os]=R.MIN_EXT,vt[Bs]=R.MAX_EXT)}const Ct={[gl]:i.ZERO,[_l]:i.ONE,[vl]:i.SRC_COLOR,[ss]:i.SRC_ALPHA,[Tl]:i.SRC_ALPHA_SATURATE,[yl]:i.DST_COLOR,[Ml]:i.DST_ALPHA,[xl]:i.ONE_MINUS_SRC_COLOR,[os]:i.ONE_MINUS_SRC_ALPHA,[El]:i.ONE_MINUS_DST_COLOR,[Sl]:i.ONE_MINUS_DST_ALPHA,[bl]:i.CONSTANT_COLOR,[Al]:i.ONE_MINUS_CONSTANT_COLOR,[wl]:i.CONSTANT_ALPHA,[Rl]:i.ONE_MINUS_CONSTANT_ALPHA};function pt(R,ot,at,Tt,xt,$t,jt,ce,ye,Kt){if(R===mn){f===!0&&(St(i.BLEND),f=!1);return}if(f===!1&&(Rt(i.BLEND),f=!0),R!==fl){if(R!==g||Kt!==G){if((_!==Rn||b!==Rn)&&(i.blendEquation(i.FUNC_ADD),_=Rn,b=Rn),Kt)switch(R){case ti:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Is:i.blendFunc(i.ONE,i.ONE);break;case Ns:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Fs:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",R);break}else switch(R){case ti:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Is:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Ns:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Fs:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",R);break}E=null,C=null,w=null,W=null,y.set(0,0,0),A=0,g=R,G=Kt}return}xt=xt||ot,$t=$t||at,jt=jt||Tt,(ot!==_||xt!==b)&&(i.blendEquationSeparate(vt[ot],vt[xt]),_=ot,b=xt),(at!==E||Tt!==C||$t!==w||jt!==W)&&(i.blendFuncSeparate(Ct[at],Ct[Tt],Ct[$t],Ct[jt]),E=at,C=Tt,w=$t,W=jt),(ce.equals(y)===!1||ye!==A)&&(i.blendColor(ce.r,ce.g,ce.b,ye),y.copy(ce),A=ye),g=R,G=!1}function Qt(R,ot){R.side===sn?St(i.CULL_FACE):Rt(i.CULL_FACE);let at=R.side===Re;ot&&(at=!at),It(at),R.blending===ti&&R.transparent===!1?pt(mn):pt(R.blending,R.blendEquation,R.blendSrc,R.blendDst,R.blendEquationAlpha,R.blendSrcAlpha,R.blendDstAlpha,R.blendColor,R.blendAlpha,R.premultipliedAlpha),l.setFunc(R.depthFunc),l.setTest(R.depthTest),l.setMask(R.depthWrite),o.setMask(R.colorWrite);const Tt=R.stencilWrite;c.setTest(Tt),Tt&&(c.setMask(R.stencilWriteMask),c.setFunc(R.stencilFunc,R.stencilRef,R.stencilFuncMask),c.setOp(R.stencilFail,R.stencilZFail,R.stencilZPass)),F(R.polygonOffset,R.polygonOffsetFactor,R.polygonOffsetUnits),R.alphaToCoverage===!0?Rt(i.SAMPLE_ALPHA_TO_COVERAGE):St(i.SAMPLE_ALPHA_TO_COVERAGE)}function It(R){V!==R&&(R?i.frontFace(i.CW):i.frontFace(i.CCW),V=R)}function T(R){R!==hl?(Rt(i.CULL_FACE),R!==J&&(R===Us?i.cullFace(i.BACK):R===dl?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):St(i.CULL_FACE),J=R}function M(R){R!==L&&(H&&i.lineWidth(R),L=R)}function F(R,ot,at){R?(Rt(i.POLYGON_OFFSET_FILL),(N!==ot||k!==at)&&(i.polygonOffset(ot,at),N=ot,k=at)):St(i.POLYGON_OFFSET_FILL)}function Q(R){R?Rt(i.SCISSOR_TEST):St(i.SCISSOR_TEST)}function K(R){R===void 0&&(R=i.TEXTURE0+Y-1),et!==R&&(i.activeTexture(R),et=R)}function tt(R,ot,at){at===void 0&&(et===null?at=i.TEXTURE0+Y-1:at=et);let Tt=nt[at];Tt===void 0&&(Tt={type:void 0,texture:void 0},nt[at]=Tt),(Tt.type!==R||Tt.texture!==ot)&&(et!==at&&(i.activeTexture(at),et=at),i.bindTexture(R,ot||At[R]),Tt.type=R,Tt.texture=ot)}function mt(){const R=nt[et];R!==void 0&&R.type!==void 0&&(i.bindTexture(R.type,null),R.type=void 0,R.texture=void 0)}function lt(){try{i.compressedTexImage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function ht(){try{i.compressedTexImage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function yt(){try{i.texSubImage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Nt(){try{i.texSubImage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function j(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function qt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function kt(){try{i.texStorage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function wt(){try{i.texStorage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function _t(){try{i.texImage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function dt(){try{i.texImage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Dt(R){st.equals(R)===!1&&(i.scissor(R.x,R.y,R.z,R.w),st.copy(R))}function Wt(R){ut.equals(R)===!1&&(i.viewport(R.x,R.y,R.z,R.w),ut.copy(R))}function ee(R,ot){let at=d.get(ot);at===void 0&&(at=new WeakMap,d.set(ot,at));let Tt=at.get(R);Tt===void 0&&(Tt=i.getUniformBlockIndex(ot,R.name),at.set(R,Tt))}function Ot(R,ot){const Tt=d.get(ot).get(R);h.get(ot)!==Tt&&(i.uniformBlockBinding(ot,Tt,R.__bindingPointIndex),h.set(ot,Tt))}function it(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),n===!0&&(i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null)),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},et=null,nt={},m={},v=new WeakMap,x=[],p=null,f=!1,g=null,_=null,E=null,C=null,b=null,w=null,W=null,y=new Gt(0,0,0),A=0,G=!1,V=null,J=null,L=null,N=null,k=null,st.set(0,0,i.canvas.width,i.canvas.height),ut.set(0,0,i.canvas.width,i.canvas.height),o.reset(),l.reset(),c.reset()}return{buffers:{color:o,depth:l,stencil:c},enable:Rt,disable:St,bindFramebuffer:Vt,drawBuffers:U,useProgram:Se,setBlending:pt,setMaterial:Qt,setFlipSided:It,setCullFace:T,setLineWidth:M,setPolygonOffset:F,setScissorTest:Q,activeTexture:K,bindTexture:tt,unbindTexture:mt,compressedTexImage2D:lt,compressedTexImage3D:ht,texImage2D:_t,texImage3D:dt,updateUBOMapping:ee,uniformBlockBinding:Ot,texStorage2D:kt,texStorage3D:wt,texSubImage2D:yt,texSubImage3D:Nt,compressedTexSubImage2D:j,compressedTexSubImage3D:qt,scissor:Dt,viewport:Wt,reset:it}}function yp(i,t,e,n,r,s,a){const o=r.isWebGL2,l=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap;let d;const u=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(T,M){return m?new OffscreenCanvas(T,M):hr("canvas")}function x(T,M,F,Q){let K=1;if((T.width>Q||T.height>Q)&&(K=Q/Math.max(T.width,T.height)),K<1||M===!0)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap){const tt=M?cr:Math.floor,mt=tt(K*T.width),lt=tt(K*T.height);d===void 0&&(d=v(mt,lt));const ht=F?v(mt,lt):d;return ht.width=mt,ht.height=lt,ht.getContext("2d").drawImage(T,0,0,mt,lt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+T.width+"x"+T.height+") to ("+mt+"x"+lt+")."),ht}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+T.width+"x"+T.height+")."),T;return T}function p(T){return us(T.width)&&us(T.height)}function f(T){return o?!1:T.wrapS!==Ge||T.wrapT!==Ge||T.minFilter!==Ae&&T.minFilter!==Fe}function g(T,M){return T.generateMipmaps&&M&&T.minFilter!==Ae&&T.minFilter!==Fe}function _(T){i.generateMipmap(T)}function E(T,M,F,Q,K=!1){if(o===!1)return M;if(T!==null){if(i[T]!==void 0)return i[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let tt=M;if(M===i.RED&&(F===i.FLOAT&&(tt=i.R32F),F===i.HALF_FLOAT&&(tt=i.R16F),F===i.UNSIGNED_BYTE&&(tt=i.R8)),M===i.RED_INTEGER&&(F===i.UNSIGNED_BYTE&&(tt=i.R8UI),F===i.UNSIGNED_SHORT&&(tt=i.R16UI),F===i.UNSIGNED_INT&&(tt=i.R32UI),F===i.BYTE&&(tt=i.R8I),F===i.SHORT&&(tt=i.R16I),F===i.INT&&(tt=i.R32I)),M===i.RG&&(F===i.FLOAT&&(tt=i.RG32F),F===i.HALF_FLOAT&&(tt=i.RG16F),F===i.UNSIGNED_BYTE&&(tt=i.RG8)),M===i.RGBA){const mt=K?sr:Yt.getTransfer(Q);F===i.FLOAT&&(tt=i.RGBA32F),F===i.HALF_FLOAT&&(tt=i.RGBA16F),F===i.UNSIGNED_BYTE&&(tt=mt===Jt?i.SRGB8_ALPHA8:i.RGBA8),F===i.UNSIGNED_SHORT_4_4_4_4&&(tt=i.RGBA4),F===i.UNSIGNED_SHORT_5_5_5_1&&(tt=i.RGB5_A1)}return(tt===i.R16F||tt===i.R32F||tt===i.RG16F||tt===i.RG32F||tt===i.RGBA16F||tt===i.RGBA32F)&&t.get("EXT_color_buffer_float"),tt}function C(T,M,F){return g(T,F)===!0||T.isFramebufferTexture&&T.minFilter!==Ae&&T.minFilter!==Fe?Math.log2(Math.max(M.width,M.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?M.mipmaps.length:1}function b(T){return T===Ae||T===zs||T===Er?i.NEAREST:i.LINEAR}function w(T){const M=T.target;M.removeEventListener("dispose",w),y(M),M.isVideoTexture&&h.delete(M)}function W(T){const M=T.target;M.removeEventListener("dispose",W),G(M)}function y(T){const M=n.get(T);if(M.__webglInit===void 0)return;const F=T.source,Q=u.get(F);if(Q){const K=Q[M.__cacheKey];K.usedTimes--,K.usedTimes===0&&A(T),Object.keys(Q).length===0&&u.delete(F)}n.remove(T)}function A(T){const M=n.get(T);i.deleteTexture(M.__webglTexture);const F=T.source,Q=u.get(F);delete Q[M.__cacheKey],a.memory.textures--}function G(T){const M=T.texture,F=n.get(T),Q=n.get(M);if(Q.__webglTexture!==void 0&&(i.deleteTexture(Q.__webglTexture),a.memory.textures--),T.depthTexture&&T.depthTexture.dispose(),T.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(F.__webglFramebuffer[K]))for(let tt=0;tt<F.__webglFramebuffer[K].length;tt++)i.deleteFramebuffer(F.__webglFramebuffer[K][tt]);else i.deleteFramebuffer(F.__webglFramebuffer[K]);F.__webglDepthbuffer&&i.deleteRenderbuffer(F.__webglDepthbuffer[K])}else{if(Array.isArray(F.__webglFramebuffer))for(let K=0;K<F.__webglFramebuffer.length;K++)i.deleteFramebuffer(F.__webglFramebuffer[K]);else i.deleteFramebuffer(F.__webglFramebuffer);if(F.__webglDepthbuffer&&i.deleteRenderbuffer(F.__webglDepthbuffer),F.__webglMultisampledFramebuffer&&i.deleteFramebuffer(F.__webglMultisampledFramebuffer),F.__webglColorRenderbuffer)for(let K=0;K<F.__webglColorRenderbuffer.length;K++)F.__webglColorRenderbuffer[K]&&i.deleteRenderbuffer(F.__webglColorRenderbuffer[K]);F.__webglDepthRenderbuffer&&i.deleteRenderbuffer(F.__webglDepthRenderbuffer)}if(T.isWebGLMultipleRenderTargets)for(let K=0,tt=M.length;K<tt;K++){const mt=n.get(M[K]);mt.__webglTexture&&(i.deleteTexture(mt.__webglTexture),a.memory.textures--),n.remove(M[K])}n.remove(M),n.remove(T)}let V=0;function J(){V=0}function L(){const T=V;return T>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+r.maxTextures),V+=1,T}function N(T){const M=[];return M.push(T.wrapS),M.push(T.wrapT),M.push(T.wrapR||0),M.push(T.magFilter),M.push(T.minFilter),M.push(T.anisotropy),M.push(T.internalFormat),M.push(T.format),M.push(T.type),M.push(T.generateMipmaps),M.push(T.premultiplyAlpha),M.push(T.flipY),M.push(T.unpackAlignment),M.push(T.colorSpace),M.join()}function k(T,M){const F=n.get(T);if(T.isVideoTexture&&Qt(T),T.isRenderTargetTexture===!1&&T.version>0&&F.__version!==T.version){const Q=T.image;if(Q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{st(F,T,M);return}}e.bindTexture(i.TEXTURE_2D,F.__webglTexture,i.TEXTURE0+M)}function Y(T,M){const F=n.get(T);if(T.version>0&&F.__version!==T.version){st(F,T,M);return}e.bindTexture(i.TEXTURE_2D_ARRAY,F.__webglTexture,i.TEXTURE0+M)}function H(T,M){const F=n.get(T);if(T.version>0&&F.__version!==T.version){st(F,T,M);return}e.bindTexture(i.TEXTURE_3D,F.__webglTexture,i.TEXTURE0+M)}function X(T,M){const F=n.get(T);if(T.version>0&&F.__version!==T.version){ut(F,T,M);return}e.bindTexture(i.TEXTURE_CUBE_MAP,F.__webglTexture,i.TEXTURE0+M)}const q={[cs]:i.REPEAT,[Ge]:i.CLAMP_TO_EDGE,[hs]:i.MIRRORED_REPEAT},et={[Ae]:i.NEAREST,[zs]:i.NEAREST_MIPMAP_NEAREST,[Er]:i.NEAREST_MIPMAP_LINEAR,[Fe]:i.LINEAR,[Wl]:i.LINEAR_MIPMAP_NEAREST,[Si]:i.LINEAR_MIPMAP_LINEAR},nt={[nc]:i.NEVER,[lc]:i.ALWAYS,[ic]:i.LESS,[ya]:i.LEQUAL,[rc]:i.EQUAL,[ac]:i.GEQUAL,[sc]:i.GREATER,[oc]:i.NOTEQUAL};function z(T,M,F){if(F?(i.texParameteri(T,i.TEXTURE_WRAP_S,q[M.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,q[M.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,q[M.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,et[M.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,et[M.minFilter])):(i.texParameteri(T,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(T,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,i.CLAMP_TO_EDGE),(M.wrapS!==Ge||M.wrapT!==Ge)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),i.texParameteri(T,i.TEXTURE_MAG_FILTER,b(M.magFilter)),i.texParameteri(T,i.TEXTURE_MIN_FILTER,b(M.minFilter)),M.minFilter!==Ae&&M.minFilter!==Fe&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),M.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,nt[M.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){const Q=t.get("EXT_texture_filter_anisotropic");if(M.magFilter===Ae||M.minFilter!==Er&&M.minFilter!==Si||M.type===pn&&t.has("OES_texture_float_linear")===!1||o===!1&&M.type===yi&&t.has("OES_texture_half_float_linear")===!1)return;(M.anisotropy>1||n.get(M).__currentAnisotropy)&&(i.texParameterf(T,Q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,r.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy)}}function $(T,M){let F=!1;T.__webglInit===void 0&&(T.__webglInit=!0,M.addEventListener("dispose",w));const Q=M.source;let K=u.get(Q);K===void 0&&(K={},u.set(Q,K));const tt=N(M);if(tt!==T.__cacheKey){K[tt]===void 0&&(K[tt]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,F=!0),K[tt].usedTimes++;const mt=K[T.__cacheKey];mt!==void 0&&(K[T.__cacheKey].usedTimes--,mt.usedTimes===0&&A(M)),T.__cacheKey=tt,T.__webglTexture=K[tt].texture}return F}function st(T,M,F){let Q=i.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(Q=i.TEXTURE_2D_ARRAY),M.isData3DTexture&&(Q=i.TEXTURE_3D);const K=$(T,M),tt=M.source;e.bindTexture(Q,T.__webglTexture,i.TEXTURE0+F);const mt=n.get(tt);if(tt.version!==mt.__version||K===!0){e.activeTexture(i.TEXTURE0+F);const lt=Yt.getPrimaries(Yt.workingColorSpace),ht=M.colorSpace===Be?null:Yt.getPrimaries(M.colorSpace),yt=M.colorSpace===Be||lt===ht?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,yt);const Nt=f(M)&&p(M.image)===!1;let j=x(M.image,Nt,!1,r.maxTextureSize);j=It(M,j);const qt=p(j)||o,kt=s.convert(M.format,M.colorSpace);let wt=s.convert(M.type),_t=E(M.internalFormat,kt,wt,M.colorSpace,M.isVideoTexture);z(Q,M,qt);let dt;const Dt=M.mipmaps,Wt=o&&M.isVideoTexture!==!0&&_t!==xa,ee=mt.__version===void 0||K===!0,Ot=C(M,j,qt);if(M.isDepthTexture)_t=i.DEPTH_COMPONENT,o?M.type===pn?_t=i.DEPTH_COMPONENT32F:M.type===fn?_t=i.DEPTH_COMPONENT24:M.type===Ln?_t=i.DEPTH24_STENCIL8:_t=i.DEPTH_COMPONENT16:M.type===pn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),M.format===Pn&&_t===i.DEPTH_COMPONENT&&M.type!==ms&&M.type!==fn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),M.type=fn,wt=s.convert(M.type)),M.format===si&&_t===i.DEPTH_COMPONENT&&(_t=i.DEPTH_STENCIL,M.type!==Ln&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),M.type=Ln,wt=s.convert(M.type))),ee&&(Wt?e.texStorage2D(i.TEXTURE_2D,1,_t,j.width,j.height):e.texImage2D(i.TEXTURE_2D,0,_t,j.width,j.height,0,kt,wt,null));else if(M.isDataTexture)if(Dt.length>0&&qt){Wt&&ee&&e.texStorage2D(i.TEXTURE_2D,Ot,_t,Dt[0].width,Dt[0].height);for(let it=0,R=Dt.length;it<R;it++)dt=Dt[it],Wt?e.texSubImage2D(i.TEXTURE_2D,it,0,0,dt.width,dt.height,kt,wt,dt.data):e.texImage2D(i.TEXTURE_2D,it,_t,dt.width,dt.height,0,kt,wt,dt.data);M.generateMipmaps=!1}else Wt?(ee&&e.texStorage2D(i.TEXTURE_2D,Ot,_t,j.width,j.height),e.texSubImage2D(i.TEXTURE_2D,0,0,0,j.width,j.height,kt,wt,j.data)):e.texImage2D(i.TEXTURE_2D,0,_t,j.width,j.height,0,kt,wt,j.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Wt&&ee&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Ot,_t,Dt[0].width,Dt[0].height,j.depth);for(let it=0,R=Dt.length;it<R;it++)dt=Dt[it],M.format!==He?kt!==null?Wt?e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,it,0,0,0,dt.width,dt.height,j.depth,kt,dt.data,0,0):e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,it,_t,dt.width,dt.height,j.depth,0,dt.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Wt?e.texSubImage3D(i.TEXTURE_2D_ARRAY,it,0,0,0,dt.width,dt.height,j.depth,kt,wt,dt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,it,_t,dt.width,dt.height,j.depth,0,kt,wt,dt.data)}else{Wt&&ee&&e.texStorage2D(i.TEXTURE_2D,Ot,_t,Dt[0].width,Dt[0].height);for(let it=0,R=Dt.length;it<R;it++)dt=Dt[it],M.format!==He?kt!==null?Wt?e.compressedTexSubImage2D(i.TEXTURE_2D,it,0,0,dt.width,dt.height,kt,dt.data):e.compressedTexImage2D(i.TEXTURE_2D,it,_t,dt.width,dt.height,0,dt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Wt?e.texSubImage2D(i.TEXTURE_2D,it,0,0,dt.width,dt.height,kt,wt,dt.data):e.texImage2D(i.TEXTURE_2D,it,_t,dt.width,dt.height,0,kt,wt,dt.data)}else if(M.isDataArrayTexture)Wt?(ee&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Ot,_t,j.width,j.height,j.depth),e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,j.width,j.height,j.depth,kt,wt,j.data)):e.texImage3D(i.TEXTURE_2D_ARRAY,0,_t,j.width,j.height,j.depth,0,kt,wt,j.data);else if(M.isData3DTexture)Wt?(ee&&e.texStorage3D(i.TEXTURE_3D,Ot,_t,j.width,j.height,j.depth),e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,j.width,j.height,j.depth,kt,wt,j.data)):e.texImage3D(i.TEXTURE_3D,0,_t,j.width,j.height,j.depth,0,kt,wt,j.data);else if(M.isFramebufferTexture){if(ee)if(Wt)e.texStorage2D(i.TEXTURE_2D,Ot,_t,j.width,j.height);else{let it=j.width,R=j.height;for(let ot=0;ot<Ot;ot++)e.texImage2D(i.TEXTURE_2D,ot,_t,it,R,0,kt,wt,null),it>>=1,R>>=1}}else if(Dt.length>0&&qt){Wt&&ee&&e.texStorage2D(i.TEXTURE_2D,Ot,_t,Dt[0].width,Dt[0].height);for(let it=0,R=Dt.length;it<R;it++)dt=Dt[it],Wt?e.texSubImage2D(i.TEXTURE_2D,it,0,0,kt,wt,dt):e.texImage2D(i.TEXTURE_2D,it,_t,kt,wt,dt);M.generateMipmaps=!1}else Wt?(ee&&e.texStorage2D(i.TEXTURE_2D,Ot,_t,j.width,j.height),e.texSubImage2D(i.TEXTURE_2D,0,0,0,kt,wt,j)):e.texImage2D(i.TEXTURE_2D,0,_t,kt,wt,j);g(M,qt)&&_(Q),mt.__version=tt.version,M.onUpdate&&M.onUpdate(M)}T.__version=M.version}function ut(T,M,F){if(M.image.length!==6)return;const Q=$(T,M),K=M.source;e.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+F);const tt=n.get(K);if(K.version!==tt.__version||Q===!0){e.activeTexture(i.TEXTURE0+F);const mt=Yt.getPrimaries(Yt.workingColorSpace),lt=M.colorSpace===Be?null:Yt.getPrimaries(M.colorSpace),ht=M.colorSpace===Be||mt===lt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ht);const yt=M.isCompressedTexture||M.image[0].isCompressedTexture,Nt=M.image[0]&&M.image[0].isDataTexture,j=[];for(let it=0;it<6;it++)!yt&&!Nt?j[it]=x(M.image[it],!1,!0,r.maxCubemapSize):j[it]=Nt?M.image[it].image:M.image[it],j[it]=It(M,j[it]);const qt=j[0],kt=p(qt)||o,wt=s.convert(M.format,M.colorSpace),_t=s.convert(M.type),dt=E(M.internalFormat,wt,_t,M.colorSpace),Dt=o&&M.isVideoTexture!==!0,Wt=tt.__version===void 0||Q===!0;let ee=C(M,qt,kt);z(i.TEXTURE_CUBE_MAP,M,kt);let Ot;if(yt){Dt&&Wt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,ee,dt,qt.width,qt.height);for(let it=0;it<6;it++){Ot=j[it].mipmaps;for(let R=0;R<Ot.length;R++){const ot=Ot[R];M.format!==He?wt!==null?Dt?e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,R,0,0,ot.width,ot.height,wt,ot.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,R,dt,ot.width,ot.height,0,ot.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Dt?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,R,0,0,ot.width,ot.height,wt,_t,ot.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,R,dt,ot.width,ot.height,0,wt,_t,ot.data)}}}else{Ot=M.mipmaps,Dt&&Wt&&(Ot.length>0&&ee++,e.texStorage2D(i.TEXTURE_CUBE_MAP,ee,dt,j[0].width,j[0].height));for(let it=0;it<6;it++)if(Nt){Dt?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,0,0,j[it].width,j[it].height,wt,_t,j[it].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,dt,j[it].width,j[it].height,0,wt,_t,j[it].data);for(let R=0;R<Ot.length;R++){const at=Ot[R].image[it].image;Dt?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,R+1,0,0,at.width,at.height,wt,_t,at.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,R+1,dt,at.width,at.height,0,wt,_t,at.data)}}else{Dt?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,0,0,wt,_t,j[it]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,dt,wt,_t,j[it]);for(let R=0;R<Ot.length;R++){const ot=Ot[R];Dt?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,R+1,0,0,wt,_t,ot.image[it]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,R+1,dt,wt,_t,ot.image[it])}}}g(M,kt)&&_(i.TEXTURE_CUBE_MAP),tt.__version=K.version,M.onUpdate&&M.onUpdate(M)}T.__version=M.version}function ft(T,M,F,Q,K,tt){const mt=s.convert(F.format,F.colorSpace),lt=s.convert(F.type),ht=E(F.internalFormat,mt,lt,F.colorSpace);if(!n.get(M).__hasExternalTextures){const Nt=Math.max(1,M.width>>tt),j=Math.max(1,M.height>>tt);K===i.TEXTURE_3D||K===i.TEXTURE_2D_ARRAY?e.texImage3D(K,tt,ht,Nt,j,M.depth,0,mt,lt,null):e.texImage2D(K,tt,ht,Nt,j,0,mt,lt,null)}e.bindFramebuffer(i.FRAMEBUFFER,T),pt(M)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Q,K,n.get(F).__webglTexture,0,Ct(M)):(K===i.TEXTURE_2D||K>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Q,K,n.get(F).__webglTexture,tt),e.bindFramebuffer(i.FRAMEBUFFER,null)}function At(T,M,F){if(i.bindRenderbuffer(i.RENDERBUFFER,T),M.depthBuffer&&!M.stencilBuffer){let Q=o===!0?i.DEPTH_COMPONENT24:i.DEPTH_COMPONENT16;if(F||pt(M)){const K=M.depthTexture;K&&K.isDepthTexture&&(K.type===pn?Q=i.DEPTH_COMPONENT32F:K.type===fn&&(Q=i.DEPTH_COMPONENT24));const tt=Ct(M);pt(M)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,tt,Q,M.width,M.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,tt,Q,M.width,M.height)}else i.renderbufferStorage(i.RENDERBUFFER,Q,M.width,M.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,T)}else if(M.depthBuffer&&M.stencilBuffer){const Q=Ct(M);F&&pt(M)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Q,i.DEPTH24_STENCIL8,M.width,M.height):pt(M)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Q,i.DEPTH24_STENCIL8,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,T)}else{const Q=M.isWebGLMultipleRenderTargets===!0?M.texture:[M.texture];for(let K=0;K<Q.length;K++){const tt=Q[K],mt=s.convert(tt.format,tt.colorSpace),lt=s.convert(tt.type),ht=E(tt.internalFormat,mt,lt,tt.colorSpace),yt=Ct(M);F&&pt(M)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,yt,ht,M.width,M.height):pt(M)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,yt,ht,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,ht,M.width,M.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Rt(T,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,T),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(M.depthTexture).__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),k(M.depthTexture,0);const Q=n.get(M.depthTexture).__webglTexture,K=Ct(M);if(M.depthTexture.format===Pn)pt(M)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0);else if(M.depthTexture.format===si)pt(M)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function St(T){const M=n.get(T),F=T.isWebGLCubeRenderTarget===!0;if(T.depthTexture&&!M.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");Rt(M.__webglFramebuffer,T)}else if(F){M.__webglDepthbuffer=[];for(let Q=0;Q<6;Q++)e.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[Q]),M.__webglDepthbuffer[Q]=i.createRenderbuffer(),At(M.__webglDepthbuffer[Q],T,!1)}else e.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer=i.createRenderbuffer(),At(M.__webglDepthbuffer,T,!1);e.bindFramebuffer(i.FRAMEBUFFER,null)}function Vt(T,M,F){const Q=n.get(T);M!==void 0&&ft(Q.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),F!==void 0&&St(T)}function U(T){const M=T.texture,F=n.get(T),Q=n.get(M);T.addEventListener("dispose",W),T.isWebGLMultipleRenderTargets!==!0&&(Q.__webglTexture===void 0&&(Q.__webglTexture=i.createTexture()),Q.__version=M.version,a.memory.textures++);const K=T.isWebGLCubeRenderTarget===!0,tt=T.isWebGLMultipleRenderTargets===!0,mt=p(T)||o;if(K){F.__webglFramebuffer=[];for(let lt=0;lt<6;lt++)if(o&&M.mipmaps&&M.mipmaps.length>0){F.__webglFramebuffer[lt]=[];for(let ht=0;ht<M.mipmaps.length;ht++)F.__webglFramebuffer[lt][ht]=i.createFramebuffer()}else F.__webglFramebuffer[lt]=i.createFramebuffer()}else{if(o&&M.mipmaps&&M.mipmaps.length>0){F.__webglFramebuffer=[];for(let lt=0;lt<M.mipmaps.length;lt++)F.__webglFramebuffer[lt]=i.createFramebuffer()}else F.__webglFramebuffer=i.createFramebuffer();if(tt)if(r.drawBuffers){const lt=T.texture;for(let ht=0,yt=lt.length;ht<yt;ht++){const Nt=n.get(lt[ht]);Nt.__webglTexture===void 0&&(Nt.__webglTexture=i.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&T.samples>0&&pt(T)===!1){const lt=tt?M:[M];F.__webglMultisampledFramebuffer=i.createFramebuffer(),F.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let ht=0;ht<lt.length;ht++){const yt=lt[ht];F.__webglColorRenderbuffer[ht]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,F.__webglColorRenderbuffer[ht]);const Nt=s.convert(yt.format,yt.colorSpace),j=s.convert(yt.type),qt=E(yt.internalFormat,Nt,j,yt.colorSpace,T.isXRRenderTarget===!0),kt=Ct(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,kt,qt,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ht,i.RENDERBUFFER,F.__webglColorRenderbuffer[ht])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(F.__webglDepthRenderbuffer=i.createRenderbuffer(),At(F.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(K){e.bindTexture(i.TEXTURE_CUBE_MAP,Q.__webglTexture),z(i.TEXTURE_CUBE_MAP,M,mt);for(let lt=0;lt<6;lt++)if(o&&M.mipmaps&&M.mipmaps.length>0)for(let ht=0;ht<M.mipmaps.length;ht++)ft(F.__webglFramebuffer[lt][ht],T,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,ht);else ft(F.__webglFramebuffer[lt],T,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0);g(M,mt)&&_(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(tt){const lt=T.texture;for(let ht=0,yt=lt.length;ht<yt;ht++){const Nt=lt[ht],j=n.get(Nt);e.bindTexture(i.TEXTURE_2D,j.__webglTexture),z(i.TEXTURE_2D,Nt,mt),ft(F.__webglFramebuffer,T,Nt,i.COLOR_ATTACHMENT0+ht,i.TEXTURE_2D,0),g(Nt,mt)&&_(i.TEXTURE_2D)}e.unbindTexture()}else{let lt=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(o?lt=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),e.bindTexture(lt,Q.__webglTexture),z(lt,M,mt),o&&M.mipmaps&&M.mipmaps.length>0)for(let ht=0;ht<M.mipmaps.length;ht++)ft(F.__webglFramebuffer[ht],T,M,i.COLOR_ATTACHMENT0,lt,ht);else ft(F.__webglFramebuffer,T,M,i.COLOR_ATTACHMENT0,lt,0);g(M,mt)&&_(lt),e.unbindTexture()}T.depthBuffer&&St(T)}function Se(T){const M=p(T)||o,F=T.isWebGLMultipleRenderTargets===!0?T.texture:[T.texture];for(let Q=0,K=F.length;Q<K;Q++){const tt=F[Q];if(g(tt,M)){const mt=T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,lt=n.get(tt).__webglTexture;e.bindTexture(mt,lt),_(mt),e.unbindTexture()}}}function vt(T){if(o&&T.samples>0&&pt(T)===!1){const M=T.isWebGLMultipleRenderTargets?T.texture:[T.texture],F=T.width,Q=T.height;let K=i.COLOR_BUFFER_BIT;const tt=[],mt=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,lt=n.get(T),ht=T.isWebGLMultipleRenderTargets===!0;if(ht)for(let yt=0;yt<M.length;yt++)e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+yt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+yt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,lt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,lt.__webglFramebuffer);for(let yt=0;yt<M.length;yt++){tt.push(i.COLOR_ATTACHMENT0+yt),T.depthBuffer&&tt.push(mt);const Nt=lt.__ignoreDepthValues!==void 0?lt.__ignoreDepthValues:!1;if(Nt===!1&&(T.depthBuffer&&(K|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&(K|=i.STENCIL_BUFFER_BIT)),ht&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,lt.__webglColorRenderbuffer[yt]),Nt===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[mt]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[mt])),ht){const j=n.get(M[yt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,j,0)}i.blitFramebuffer(0,0,F,Q,0,0,F,Q,K,i.NEAREST),c&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,tt)}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ht)for(let yt=0;yt<M.length;yt++){e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+yt,i.RENDERBUFFER,lt.__webglColorRenderbuffer[yt]);const Nt=n.get(M[yt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+yt,i.TEXTURE_2D,Nt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,lt.__webglMultisampledFramebuffer)}}function Ct(T){return Math.min(r.maxSamples,T.samples)}function pt(T){const M=n.get(T);return o&&T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function Qt(T){const M=a.render.frame;h.get(T)!==M&&(h.set(T,M),T.update())}function It(T,M){const F=T.colorSpace,Q=T.format,K=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||T.format===ds||F!==an&&F!==Be&&(Yt.getTransfer(F)===Jt?o===!1?t.has("EXT_sRGB")===!0&&Q===He?(T.format=ds,T.minFilter=Fe,T.generateMipmaps=!1):M=Ta.sRGBToLinear(M):(Q!==He||K!==_n)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),M}this.allocateTextureUnit=L,this.resetTextureUnits=J,this.setTexture2D=k,this.setTexture2DArray=Y,this.setTexture3D=H,this.setTextureCube=X,this.rebindTextures=Vt,this.setupRenderTarget=U,this.updateRenderTargetMipmap=Se,this.updateMultisampleRenderTarget=vt,this.setupDepthRenderbuffer=St,this.setupFrameBufferTexture=ft,this.useMultisampledRTT=pt}function Ep(i,t,e){const n=e.isWebGL2;function r(s,a=Be){let o;const l=Yt.getTransfer(a);if(s===_n)return i.UNSIGNED_BYTE;if(s===pa)return i.UNSIGNED_SHORT_4_4_4_4;if(s===ma)return i.UNSIGNED_SHORT_5_5_5_1;if(s===Xl)return i.BYTE;if(s===ql)return i.SHORT;if(s===ms)return i.UNSIGNED_SHORT;if(s===fa)return i.INT;if(s===fn)return i.UNSIGNED_INT;if(s===pn)return i.FLOAT;if(s===yi)return n?i.HALF_FLOAT:(o=t.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(s===Yl)return i.ALPHA;if(s===He)return i.RGBA;if(s===$l)return i.LUMINANCE;if(s===jl)return i.LUMINANCE_ALPHA;if(s===Pn)return i.DEPTH_COMPONENT;if(s===si)return i.DEPTH_STENCIL;if(s===ds)return o=t.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(s===Kl)return i.RED;if(s===ga)return i.RED_INTEGER;if(s===Zl)return i.RG;if(s===_a)return i.RG_INTEGER;if(s===va)return i.RGBA_INTEGER;if(s===Tr||s===br||s===Ar||s===wr)if(l===Jt)if(o=t.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(s===Tr)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===br)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Ar)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===wr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=t.get("WEBGL_compressed_texture_s3tc"),o!==null){if(s===Tr)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===br)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Ar)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===wr)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===ks||s===Vs||s===Gs||s===Hs)if(o=t.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(s===ks)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===Vs)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Gs)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Hs)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===xa)return o=t.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===Ws||s===Xs)if(o=t.get("WEBGL_compressed_texture_etc"),o!==null){if(s===Ws)return l===Jt?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(s===Xs)return l===Jt?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===qs||s===Ys||s===$s||s===js||s===Ks||s===Zs||s===Js||s===Qs||s===to||s===eo||s===no||s===io||s===ro||s===so)if(o=t.get("WEBGL_compressed_texture_astc"),o!==null){if(s===qs)return l===Jt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Ys)return l===Jt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===$s)return l===Jt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===js)return l===Jt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Ks)return l===Jt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Zs)return l===Jt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Js)return l===Jt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Qs)return l===Jt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===to)return l===Jt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===eo)return l===Jt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===no)return l===Jt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===io)return l===Jt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===ro)return l===Jt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===so)return l===Jt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Rr||s===oo||s===ao)if(o=t.get("EXT_texture_compression_bptc"),o!==null){if(s===Rr)return l===Jt?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===oo)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===ao)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===Jl||s===lo||s===co||s===ho)if(o=t.get("EXT_texture_compression_rgtc"),o!==null){if(s===Rr)return o.COMPRESSED_RED_RGTC1_EXT;if(s===lo)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===co)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===ho)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Ln?n?i.UNSIGNED_INT_24_8:(o=t.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):i[s]!==void 0?i[s]:null}return{convert:r}}class Tp extends De{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Ki extends pe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const bp={type:"move"};class Jr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ki,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ki,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ki,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const x of t.hand.values()){const p=e.getJointPose(x,n),f=this._getHandJoint(c,x);p!==null&&(f.matrix.fromArray(p.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=p.radius),f.visible=p!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),m=.02,v=.005;c.inputState.pinching&&u>m+v?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=m-v&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=e.getPose(t.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(bp)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Ki;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class Ap extends li{constructor(t,e){super();const n=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,m=null,v=null;const x=e.getContextAttributes();let p=null,f=null;const g=[],_=[],E=new Ht;let C=null;const b=new De;b.layers.enable(1),b.viewport=new ue;const w=new De;w.layers.enable(2),w.viewport=new ue;const W=[b,w],y=new Tp;y.layers.enable(1),y.layers.enable(2);let A=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(z){let $=g[z];return $===void 0&&($=new Jr,g[z]=$),$.getTargetRaySpace()},this.getControllerGrip=function(z){let $=g[z];return $===void 0&&($=new Jr,g[z]=$),$.getGripSpace()},this.getHand=function(z){let $=g[z];return $===void 0&&($=new Jr,g[z]=$),$.getHandSpace()};function V(z){const $=_.indexOf(z.inputSource);if($===-1)return;const st=g[$];st!==void 0&&(st.update(z.inputSource,z.frame,c||a),st.dispatchEvent({type:z.type,data:z.inputSource}))}function J(){r.removeEventListener("select",V),r.removeEventListener("selectstart",V),r.removeEventListener("selectend",V),r.removeEventListener("squeeze",V),r.removeEventListener("squeezestart",V),r.removeEventListener("squeezeend",V),r.removeEventListener("end",J),r.removeEventListener("inputsourceschange",L);for(let z=0;z<g.length;z++){const $=_[z];$!==null&&(_[z]=null,g[z].disconnect($))}A=null,G=null,t.setRenderTarget(p),m=null,u=null,d=null,r=null,f=null,nt.stop(),n.isPresenting=!1,t.setPixelRatio(C),t.setSize(E.width,E.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(z){s=z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(z){o=z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(z){c=z},this.getBaseLayer=function(){return u!==null?u:m},this.getBinding=function(){return d},this.getFrame=function(){return v},this.getSession=function(){return r},this.setSession=async function(z){if(r=z,r!==null){if(p=t.getRenderTarget(),r.addEventListener("select",V),r.addEventListener("selectstart",V),r.addEventListener("selectend",V),r.addEventListener("squeeze",V),r.addEventListener("squeezestart",V),r.addEventListener("squeezeend",V),r.addEventListener("end",J),r.addEventListener("inputsourceschange",L),x.xrCompatible!==!0&&await e.makeXRCompatible(),C=t.getPixelRatio(),t.getSize(E),r.renderState.layers===void 0||t.capabilities.isWebGL2===!1){const $={antialias:r.renderState.layers===void 0?x.antialias:!0,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(r,e,$),r.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),f=new Un(m.framebufferWidth,m.framebufferHeight,{format:He,type:_n,colorSpace:t.outputColorSpace,stencilBuffer:x.stencil})}else{let $=null,st=null,ut=null;x.depth&&(ut=x.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,$=x.stencil?si:Pn,st=x.stencil?Ln:fn);const ft={colorFormat:e.RGBA8,depthFormat:ut,scaleFactor:s};d=new XRWebGLBinding(r,e),u=d.createProjectionLayer(ft),r.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),f=new Un(u.textureWidth,u.textureHeight,{format:He,type:_n,depthTexture:new Ba(u.textureWidth,u.textureHeight,st,void 0,void 0,void 0,void 0,void 0,void 0,$),stencilBuffer:x.stencil,colorSpace:t.outputColorSpace,samples:x.antialias?4:0});const At=t.properties.get(f);At.__ignoreDepthValues=u.ignoreDepthValues}f.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),nt.setContext(r),nt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function L(z){for(let $=0;$<z.removed.length;$++){const st=z.removed[$],ut=_.indexOf(st);ut>=0&&(_[ut]=null,g[ut].disconnect(st))}for(let $=0;$<z.added.length;$++){const st=z.added[$];let ut=_.indexOf(st);if(ut===-1){for(let At=0;At<g.length;At++)if(At>=_.length){_.push(st),ut=At;break}else if(_[At]===null){_[At]=st,ut=At;break}if(ut===-1)break}const ft=g[ut];ft&&ft.connect(st)}}const N=new D,k=new D;function Y(z,$,st){N.setFromMatrixPosition($.matrixWorld),k.setFromMatrixPosition(st.matrixWorld);const ut=N.distanceTo(k),ft=$.projectionMatrix.elements,At=st.projectionMatrix.elements,Rt=ft[14]/(ft[10]-1),St=ft[14]/(ft[10]+1),Vt=(ft[9]+1)/ft[5],U=(ft[9]-1)/ft[5],Se=(ft[8]-1)/ft[0],vt=(At[8]+1)/At[0],Ct=Rt*Se,pt=Rt*vt,Qt=ut/(-Se+vt),It=Qt*-Se;$.matrixWorld.decompose(z.position,z.quaternion,z.scale),z.translateX(It),z.translateZ(Qt),z.matrixWorld.compose(z.position,z.quaternion,z.scale),z.matrixWorldInverse.copy(z.matrixWorld).invert();const T=Rt+Qt,M=St+Qt,F=Ct-It,Q=pt+(ut-It),K=Vt*St/M*T,tt=U*St/M*T;z.projectionMatrix.makePerspective(F,Q,K,tt,T,M),z.projectionMatrixInverse.copy(z.projectionMatrix).invert()}function H(z,$){$===null?z.matrixWorld.copy(z.matrix):z.matrixWorld.multiplyMatrices($.matrixWorld,z.matrix),z.matrixWorldInverse.copy(z.matrixWorld).invert()}this.updateCamera=function(z){if(r===null)return;y.near=w.near=b.near=z.near,y.far=w.far=b.far=z.far,(A!==y.near||G!==y.far)&&(r.updateRenderState({depthNear:y.near,depthFar:y.far}),A=y.near,G=y.far);const $=z.parent,st=y.cameras;H(y,$);for(let ut=0;ut<st.length;ut++)H(st[ut],$);st.length===2?Y(y,b,w):y.projectionMatrix.copy(b.projectionMatrix),X(z,y,$)};function X(z,$,st){st===null?z.matrix.copy($.matrixWorld):(z.matrix.copy(st.matrixWorld),z.matrix.invert(),z.matrix.multiply($.matrixWorld)),z.matrix.decompose(z.position,z.quaternion,z.scale),z.updateMatrixWorld(!0),z.projectionMatrix.copy($.projectionMatrix),z.projectionMatrixInverse.copy($.projectionMatrixInverse),z.isPerspectiveCamera&&(z.fov=Ei*2*Math.atan(1/z.projectionMatrix.elements[5]),z.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(u===null&&m===null))return l},this.setFoveation=function(z){l=z,u!==null&&(u.fixedFoveation=z),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=z)};let q=null;function et(z,$){if(h=$.getViewerPose(c||a),v=$,h!==null){const st=h.views;m!==null&&(t.setRenderTargetFramebuffer(f,m.framebuffer),t.setRenderTarget(f));let ut=!1;st.length!==y.cameras.length&&(y.cameras.length=0,ut=!0);for(let ft=0;ft<st.length;ft++){const At=st[ft];let Rt=null;if(m!==null)Rt=m.getViewport(At);else{const Vt=d.getViewSubImage(u,At);Rt=Vt.viewport,ft===0&&(t.setRenderTargetTextures(f,Vt.colorTexture,u.ignoreDepthValues?void 0:Vt.depthStencilTexture),t.setRenderTarget(f))}let St=W[ft];St===void 0&&(St=new De,St.layers.enable(ft),St.viewport=new ue,W[ft]=St),St.matrix.fromArray(At.transform.matrix),St.matrix.decompose(St.position,St.quaternion,St.scale),St.projectionMatrix.fromArray(At.projectionMatrix),St.projectionMatrixInverse.copy(St.projectionMatrix).invert(),St.viewport.set(Rt.x,Rt.y,Rt.width,Rt.height),ft===0&&(y.matrix.copy(St.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),ut===!0&&y.cameras.push(St)}}for(let st=0;st<g.length;st++){const ut=_[st],ft=g[st];ut!==null&&ft!==void 0&&ft.update(ut,$,c||a)}q&&q(z,$),$.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:$}),v=null}const nt=new Fa;nt.setAnimationLoop(et),this.setAnimationLoop=function(z){q=z},this.dispose=function(){}}}function wp(i,t){function e(p,f){p.matrixAutoUpdate===!0&&p.updateMatrix(),f.value.copy(p.matrix)}function n(p,f){f.color.getRGB(p.fogColor.value,Ua(i)),f.isFog?(p.fogNear.value=f.near,p.fogFar.value=f.far):f.isFogExp2&&(p.fogDensity.value=f.density)}function r(p,f,g,_,E){f.isMeshBasicMaterial||f.isMeshLambertMaterial?s(p,f):f.isMeshToonMaterial?(s(p,f),d(p,f)):f.isMeshPhongMaterial?(s(p,f),h(p,f)):f.isMeshStandardMaterial?(s(p,f),u(p,f),f.isMeshPhysicalMaterial&&m(p,f,E)):f.isMeshMatcapMaterial?(s(p,f),v(p,f)):f.isMeshDepthMaterial?s(p,f):f.isMeshDistanceMaterial?(s(p,f),x(p,f)):f.isMeshNormalMaterial?s(p,f):f.isLineBasicMaterial?(a(p,f),f.isLineDashedMaterial&&o(p,f)):f.isPointsMaterial?l(p,f,g,_):f.isSpriteMaterial?c(p,f):f.isShadowMaterial?(p.color.value.copy(f.color),p.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(p,f){p.opacity.value=f.opacity,f.color&&p.diffuse.value.copy(f.color),f.emissive&&p.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(p.map.value=f.map,e(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,e(f.alphaMap,p.alphaMapTransform)),f.bumpMap&&(p.bumpMap.value=f.bumpMap,e(f.bumpMap,p.bumpMapTransform),p.bumpScale.value=f.bumpScale,f.side===Re&&(p.bumpScale.value*=-1)),f.normalMap&&(p.normalMap.value=f.normalMap,e(f.normalMap,p.normalMapTransform),p.normalScale.value.copy(f.normalScale),f.side===Re&&p.normalScale.value.negate()),f.displacementMap&&(p.displacementMap.value=f.displacementMap,e(f.displacementMap,p.displacementMapTransform),p.displacementScale.value=f.displacementScale,p.displacementBias.value=f.displacementBias),f.emissiveMap&&(p.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,p.emissiveMapTransform)),f.specularMap&&(p.specularMap.value=f.specularMap,e(f.specularMap,p.specularMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest);const g=t.get(f).envMap;if(g&&(p.envMap.value=g,p.flipEnvMap.value=g.isCubeTexture&&g.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=f.reflectivity,p.ior.value=f.ior,p.refractionRatio.value=f.refractionRatio),f.lightMap){p.lightMap.value=f.lightMap;const _=i._useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=f.lightMapIntensity*_,e(f.lightMap,p.lightMapTransform)}f.aoMap&&(p.aoMap.value=f.aoMap,p.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,p.aoMapTransform))}function a(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,f.map&&(p.map.value=f.map,e(f.map,p.mapTransform))}function o(p,f){p.dashSize.value=f.dashSize,p.totalSize.value=f.dashSize+f.gapSize,p.scale.value=f.scale}function l(p,f,g,_){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.size.value=f.size*g,p.scale.value=_*.5,f.map&&(p.map.value=f.map,e(f.map,p.uvTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,e(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function c(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.rotation.value=f.rotation,f.map&&(p.map.value=f.map,e(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,e(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function h(p,f){p.specular.value.copy(f.specular),p.shininess.value=Math.max(f.shininess,1e-4)}function d(p,f){f.gradientMap&&(p.gradientMap.value=f.gradientMap)}function u(p,f){p.metalness.value=f.metalness,f.metalnessMap&&(p.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,p.metalnessMapTransform)),p.roughness.value=f.roughness,f.roughnessMap&&(p.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,p.roughnessMapTransform)),t.get(f).envMap&&(p.envMapIntensity.value=f.envMapIntensity)}function m(p,f,g){p.ior.value=f.ior,f.sheen>0&&(p.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),p.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(p.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,p.sheenColorMapTransform)),f.sheenRoughnessMap&&(p.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,p.sheenRoughnessMapTransform))),f.clearcoat>0&&(p.clearcoat.value=f.clearcoat,p.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(p.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,p.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(p.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Re&&p.clearcoatNormalScale.value.negate())),f.iridescence>0&&(p.iridescence.value=f.iridescence,p.iridescenceIOR.value=f.iridescenceIOR,p.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(p.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,p.iridescenceMapTransform)),f.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),f.transmission>0&&(p.transmission.value=f.transmission,p.transmissionSamplerMap.value=g.texture,p.transmissionSamplerSize.value.set(g.width,g.height),f.transmissionMap&&(p.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,p.transmissionMapTransform)),p.thickness.value=f.thickness,f.thicknessMap&&(p.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=f.attenuationDistance,p.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(p.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(p.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=f.specularIntensity,p.specularColor.value.copy(f.specularColor),f.specularColorMap&&(p.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,p.specularColorMapTransform)),f.specularIntensityMap&&(p.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,p.specularIntensityMapTransform))}function v(p,f){f.matcap&&(p.matcap.value=f.matcap)}function x(p,f){const g=t.get(f).light;p.referencePosition.value.setFromMatrixPosition(g.matrixWorld),p.nearDistance.value=g.shadow.camera.near,p.farDistance.value=g.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function Rp(i,t,e,n){let r={},s={},a=[];const o=e.isWebGL2?i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(g,_){const E=_.program;n.uniformBlockBinding(g,E)}function c(g,_){let E=r[g.id];E===void 0&&(v(g),E=h(g),r[g.id]=E,g.addEventListener("dispose",p));const C=_.program;n.updateUBOMapping(g,C);const b=t.render.frame;s[g.id]!==b&&(u(g),s[g.id]=b)}function h(g){const _=d();g.__bindingPointIndex=_;const E=i.createBuffer(),C=g.__size,b=g.usage;return i.bindBuffer(i.UNIFORM_BUFFER,E),i.bufferData(i.UNIFORM_BUFFER,C,b),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,_,E),E}function d(){for(let g=0;g<o;g++)if(a.indexOf(g)===-1)return a.push(g),g;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(g){const _=r[g.id],E=g.uniforms,C=g.__cache;i.bindBuffer(i.UNIFORM_BUFFER,_);for(let b=0,w=E.length;b<w;b++){const W=Array.isArray(E[b])?E[b]:[E[b]];for(let y=0,A=W.length;y<A;y++){const G=W[y];if(m(G,b,y,C)===!0){const V=G.__offset,J=Array.isArray(G.value)?G.value:[G.value];let L=0;for(let N=0;N<J.length;N++){const k=J[N],Y=x(k);typeof k=="number"||typeof k=="boolean"?(G.__data[0]=k,i.bufferSubData(i.UNIFORM_BUFFER,V+L,G.__data)):k.isMatrix3?(G.__data[0]=k.elements[0],G.__data[1]=k.elements[1],G.__data[2]=k.elements[2],G.__data[3]=0,G.__data[4]=k.elements[3],G.__data[5]=k.elements[4],G.__data[6]=k.elements[5],G.__data[7]=0,G.__data[8]=k.elements[6],G.__data[9]=k.elements[7],G.__data[10]=k.elements[8],G.__data[11]=0):(k.toArray(G.__data,L),L+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,V,G.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(g,_,E,C){const b=g.value,w=_+"_"+E;if(C[w]===void 0)return typeof b=="number"||typeof b=="boolean"?C[w]=b:C[w]=b.clone(),!0;{const W=C[w];if(typeof b=="number"||typeof b=="boolean"){if(W!==b)return C[w]=b,!0}else if(W.equals(b)===!1)return W.copy(b),!0}return!1}function v(g){const _=g.uniforms;let E=0;const C=16;for(let w=0,W=_.length;w<W;w++){const y=Array.isArray(_[w])?_[w]:[_[w]];for(let A=0,G=y.length;A<G;A++){const V=y[A],J=Array.isArray(V.value)?V.value:[V.value];for(let L=0,N=J.length;L<N;L++){const k=J[L],Y=x(k),H=E%C;H!==0&&C-H<Y.boundary&&(E+=C-H),V.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),V.__offset=E,E+=Y.storage}}}const b=E%C;return b>0&&(E+=C-b),g.__size=E,g.__cache={},this}function x(g){const _={boundary:0,storage:0};return typeof g=="number"||typeof g=="boolean"?(_.boundary=4,_.storage=4):g.isVector2?(_.boundary=8,_.storage=8):g.isVector3||g.isColor?(_.boundary=16,_.storage=12):g.isVector4?(_.boundary=16,_.storage=16):g.isMatrix3?(_.boundary=48,_.storage=48):g.isMatrix4?(_.boundary=64,_.storage=64):g.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",g),_}function p(g){const _=g.target;_.removeEventListener("dispose",p);const E=a.indexOf(_.__bindingPointIndex);a.splice(E,1),i.deleteBuffer(r[_.id]),delete r[_.id],delete s[_.id]}function f(){for(const g in r)i.deleteBuffer(r[g]);a=[],r={},s={}}return{bind:l,update:c,dispose:f}}class Ss{constructor(t={}){const{canvas:e=Ec(),context:n=null,depth:r=!0,stencil:s=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1}=t;this.isWebGLRenderer=!0;let u;n!==null?u=n.getContextAttributes().alpha:u=a;const m=new Uint32Array(4),v=new Int32Array(4);let x=null,p=null;const f=[],g=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=fe,this._useLegacyLights=!1,this.toneMapping=gn,this.toneMappingExposure=1;const _=this;let E=!1,C=0,b=0,w=null,W=-1,y=null;const A=new ue,G=new ue;let V=null;const J=new Gt(0);let L=0,N=e.width,k=e.height,Y=1,H=null,X=null;const q=new ue(0,0,N,k),et=new ue(0,0,N,k);let nt=!1;const z=new vs;let $=!1,st=!1,ut=null;const ft=new oe,At=new Ht,Rt=new D,St={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Vt(){return w===null?Y:1}let U=n;function Se(S,P){for(let O=0;O<S.length;O++){const B=S[O],I=e.getContext(B,P);if(I!==null)return I}return null}try{const S={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${ps}`),e.addEventListener("webglcontextlost",it,!1),e.addEventListener("webglcontextrestored",R,!1),e.addEventListener("webglcontextcreationerror",ot,!1),U===null){const P=["webgl2","webgl","experimental-webgl"];if(_.isWebGL1Renderer===!0&&P.shift(),U=Se(P,S),U===null)throw Se(P)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&U instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),U.getShaderPrecisionFormat===void 0&&(U.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let vt,Ct,pt,Qt,It,T,M,F,Q,K,tt,mt,lt,ht,yt,Nt,j,qt,kt,wt,_t,dt,Dt,Wt;function ee(){vt=new Ou(U),Ct=new Pu(U,vt,t),vt.init(Ct),dt=new Ep(U,vt,Ct),pt=new Sp(U,vt,Ct),Qt=new ku(U),It=new ap,T=new yp(U,vt,pt,It,Ct,dt,Qt),M=new Uu(_),F=new Fu(_),Q=new $c(U,Ct),Dt=new Cu(U,vt,Q,Ct),K=new Bu(U,Q,Qt,Dt),tt=new Wu(U,K,Q,Qt),kt=new Hu(U,Ct,T),Nt=new Du(It),mt=new op(_,M,F,vt,Ct,Dt,Nt),lt=new wp(_,It),ht=new cp,yt=new mp(vt,Ct),qt=new Ru(_,M,F,pt,tt,u,l),j=new Mp(_,tt,Ct),Wt=new Rp(U,Qt,Ct,pt),wt=new Lu(U,vt,Qt,Ct),_t=new zu(U,vt,Qt,Ct),Qt.programs=mt.programs,_.capabilities=Ct,_.extensions=vt,_.properties=It,_.renderLists=ht,_.shadowMap=j,_.state=pt,_.info=Qt}ee();const Ot=new Ap(_,U);this.xr=Ot,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const S=vt.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=vt.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(S){S!==void 0&&(Y=S,this.setSize(N,k,!1))},this.getSize=function(S){return S.set(N,k)},this.setSize=function(S,P,O=!0){if(Ot.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}N=S,k=P,e.width=Math.floor(S*Y),e.height=Math.floor(P*Y),O===!0&&(e.style.width=S+"px",e.style.height=P+"px"),this.setViewport(0,0,S,P)},this.getDrawingBufferSize=function(S){return S.set(N*Y,k*Y).floor()},this.setDrawingBufferSize=function(S,P,O){N=S,k=P,Y=O,e.width=Math.floor(S*O),e.height=Math.floor(P*O),this.setViewport(0,0,S,P)},this.getCurrentViewport=function(S){return S.copy(A)},this.getViewport=function(S){return S.copy(q)},this.setViewport=function(S,P,O,B){S.isVector4?q.set(S.x,S.y,S.z,S.w):q.set(S,P,O,B),pt.viewport(A.copy(q).multiplyScalar(Y).floor())},this.getScissor=function(S){return S.copy(et)},this.setScissor=function(S,P,O,B){S.isVector4?et.set(S.x,S.y,S.z,S.w):et.set(S,P,O,B),pt.scissor(G.copy(et).multiplyScalar(Y).floor())},this.getScissorTest=function(){return nt},this.setScissorTest=function(S){pt.setScissorTest(nt=S)},this.setOpaqueSort=function(S){H=S},this.setTransparentSort=function(S){X=S},this.getClearColor=function(S){return S.copy(qt.getClearColor())},this.setClearColor=function(){qt.setClearColor.apply(qt,arguments)},this.getClearAlpha=function(){return qt.getClearAlpha()},this.setClearAlpha=function(){qt.setClearAlpha.apply(qt,arguments)},this.clear=function(S=!0,P=!0,O=!0){let B=0;if(S){let I=!1;if(w!==null){const ct=w.texture.format;I=ct===va||ct===_a||ct===ga}if(I){const ct=w.texture.type,gt=ct===_n||ct===fn||ct===ms||ct===Ln||ct===pa||ct===ma,Mt=qt.getClearColor(),bt=qt.getClearAlpha(),Ft=Mt.r,Lt=Mt.g,Pt=Mt.b;gt?(m[0]=Ft,m[1]=Lt,m[2]=Pt,m[3]=bt,U.clearBufferuiv(U.COLOR,0,m)):(v[0]=Ft,v[1]=Lt,v[2]=Pt,v[3]=bt,U.clearBufferiv(U.COLOR,0,v))}else B|=U.COLOR_BUFFER_BIT}P&&(B|=U.DEPTH_BUFFER_BIT),O&&(B|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",it,!1),e.removeEventListener("webglcontextrestored",R,!1),e.removeEventListener("webglcontextcreationerror",ot,!1),ht.dispose(),yt.dispose(),It.dispose(),M.dispose(),F.dispose(),tt.dispose(),Dt.dispose(),Wt.dispose(),mt.dispose(),Ot.dispose(),Ot.removeEventListener("sessionstart",ye),Ot.removeEventListener("sessionend",Kt),ut&&(ut.dispose(),ut=null),Ee.stop()};function it(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function R(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;const S=Qt.autoReset,P=j.enabled,O=j.autoUpdate,B=j.needsUpdate,I=j.type;ee(),Qt.autoReset=S,j.enabled=P,j.autoUpdate=O,j.needsUpdate=B,j.type=I}function ot(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function at(S){const P=S.target;P.removeEventListener("dispose",at),Tt(P)}function Tt(S){xt(S),It.remove(S)}function xt(S){const P=It.get(S).programs;P!==void 0&&(P.forEach(function(O){mt.releaseProgram(O)}),S.isShaderMaterial&&mt.releaseShaderCache(S))}this.renderBufferDirect=function(S,P,O,B,I,ct){P===null&&(P=St);const gt=I.isMesh&&I.matrixWorld.determinant()<0,Mt=nl(S,P,O,B,I);pt.setMaterial(B,gt);let bt=O.index,Ft=1;if(B.wireframe===!0){if(bt=K.getWireframeAttribute(O),bt===void 0)return;Ft=2}const Lt=O.drawRange,Pt=O.attributes.position;let re=Lt.start*Ft,Ce=(Lt.start+Lt.count)*Ft;ct!==null&&(re=Math.max(re,ct.start*Ft),Ce=Math.min(Ce,(ct.start+ct.count)*Ft)),bt!==null?(re=Math.max(re,0),Ce=Math.min(Ce,bt.count)):Pt!=null&&(re=Math.max(re,0),Ce=Math.min(Ce,Pt.count));const he=Ce-re;if(he<0||he===1/0)return;Dt.setup(I,B,Mt,O,bt);let Ke,te=wt;if(bt!==null&&(Ke=Q.get(bt),te=_t,te.setIndex(Ke)),I.isMesh)B.wireframe===!0?(pt.setLineWidth(B.wireframeLinewidth*Vt()),te.setMode(U.LINES)):te.setMode(U.TRIANGLES);else if(I.isLine){let Bt=B.linewidth;Bt===void 0&&(Bt=1),pt.setLineWidth(Bt*Vt()),I.isLineSegments?te.setMode(U.LINES):I.isLineLoop?te.setMode(U.LINE_LOOP):te.setMode(U.LINE_STRIP)}else I.isPoints?te.setMode(U.POINTS):I.isSprite&&te.setMode(U.TRIANGLES);if(I.isBatchedMesh)te.renderMultiDraw(I._multiDrawStarts,I._multiDrawCounts,I._multiDrawCount);else if(I.isInstancedMesh)te.renderInstances(re,he,I.count);else if(O.isInstancedBufferGeometry){const Bt=O._maxInstanceCount!==void 0?O._maxInstanceCount:1/0,xr=Math.min(O.instanceCount,Bt);te.renderInstances(re,he,xr)}else te.render(re,he)};function $t(S,P,O){S.transparent===!0&&S.side===sn&&S.forceSinglePass===!1?(S.side=Re,S.needsUpdate=!0,wi(S,P,O),S.side=vn,S.needsUpdate=!0,wi(S,P,O),S.side=sn):wi(S,P,O)}this.compile=function(S,P,O=null){O===null&&(O=S),p=yt.get(O),p.init(),g.push(p),O.traverseVisible(function(I){I.isLight&&I.layers.test(P.layers)&&(p.pushLight(I),I.castShadow&&p.pushShadow(I))}),S!==O&&S.traverseVisible(function(I){I.isLight&&I.layers.test(P.layers)&&(p.pushLight(I),I.castShadow&&p.pushShadow(I))}),p.setupLights(_._useLegacyLights);const B=new Set;return S.traverse(function(I){const ct=I.material;if(ct)if(Array.isArray(ct))for(let gt=0;gt<ct.length;gt++){const Mt=ct[gt];$t(Mt,O,I),B.add(Mt)}else $t(ct,O,I),B.add(ct)}),g.pop(),p=null,B},this.compileAsync=function(S,P,O=null){const B=this.compile(S,P,O);return new Promise(I=>{function ct(){if(B.forEach(function(gt){It.get(gt).currentProgram.isReady()&&B.delete(gt)}),B.size===0){I(S);return}setTimeout(ct,10)}vt.get("KHR_parallel_shader_compile")!==null?ct():setTimeout(ct,10)})};let jt=null;function ce(S){jt&&jt(S)}function ye(){Ee.stop()}function Kt(){Ee.start()}const Ee=new Fa;Ee.setAnimationLoop(ce),typeof self<"u"&&Ee.setContext(self),this.setAnimationLoop=function(S){jt=S,Ot.setAnimationLoop(S),S===null?Ee.stop():Ee.start()},Ot.addEventListener("sessionstart",ye),Ot.addEventListener("sessionend",Kt),this.render=function(S,P){if(P!==void 0&&P.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),P.parent===null&&P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),Ot.enabled===!0&&Ot.isPresenting===!0&&(Ot.cameraAutoUpdate===!0&&Ot.updateCamera(P),P=Ot.getCamera()),S.isScene===!0&&S.onBeforeRender(_,S,P,w),p=yt.get(S,g.length),p.init(),g.push(p),ft.multiplyMatrices(P.projectionMatrix,P.matrixWorldInverse),z.setFromProjectionMatrix(ft),st=this.localClippingEnabled,$=Nt.init(this.clippingPlanes,st),x=ht.get(S,f.length),x.init(),f.push(x),Xe(S,P,0,_.sortObjects),x.finish(),_.sortObjects===!0&&x.sort(H,X),this.info.render.frame++,$===!0&&Nt.beginShadows();const O=p.state.shadowsArray;if(j.render(O,S,P),$===!0&&Nt.endShadows(),this.info.autoReset===!0&&this.info.reset(),qt.render(x,S),p.setupLights(_._useLegacyLights),P.isArrayCamera){const B=P.cameras;for(let I=0,ct=B.length;I<ct;I++){const gt=B[I];ws(x,S,gt,gt.viewport)}}else ws(x,S,P);w!==null&&(T.updateMultisampleRenderTarget(w),T.updateRenderTargetMipmap(w)),S.isScene===!0&&S.onAfterRender(_,S,P),Dt.resetDefaultState(),W=-1,y=null,g.pop(),g.length>0?p=g[g.length-1]:p=null,f.pop(),f.length>0?x=f[f.length-1]:x=null};function Xe(S,P,O,B){if(S.visible===!1)return;if(S.layers.test(P.layers)){if(S.isGroup)O=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(P);else if(S.isLight)p.pushLight(S),S.castShadow&&p.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||z.intersectsSprite(S)){B&&Rt.setFromMatrixPosition(S.matrixWorld).applyMatrix4(ft);const gt=tt.update(S),Mt=S.material;Mt.visible&&x.push(S,gt,Mt,O,Rt.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||z.intersectsObject(S))){const gt=tt.update(S),Mt=S.material;if(B&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Rt.copy(S.boundingSphere.center)):(gt.boundingSphere===null&&gt.computeBoundingSphere(),Rt.copy(gt.boundingSphere.center)),Rt.applyMatrix4(S.matrixWorld).applyMatrix4(ft)),Array.isArray(Mt)){const bt=gt.groups;for(let Ft=0,Lt=bt.length;Ft<Lt;Ft++){const Pt=bt[Ft],re=Mt[Pt.materialIndex];re&&re.visible&&x.push(S,gt,re,O,Rt.z,Pt)}}else Mt.visible&&x.push(S,gt,Mt,O,Rt.z,null)}}const ct=S.children;for(let gt=0,Mt=ct.length;gt<Mt;gt++)Xe(ct[gt],P,O,B)}function ws(S,P,O,B){const I=S.opaque,ct=S.transmissive,gt=S.transparent;p.setupLightsView(O),$===!0&&Nt.setGlobalState(_.clippingPlanes,O),ct.length>0&&el(I,ct,P,O),B&&pt.viewport(A.copy(B)),I.length>0&&Ai(I,P,O),ct.length>0&&Ai(ct,P,O),gt.length>0&&Ai(gt,P,O),pt.buffers.depth.setTest(!0),pt.buffers.depth.setMask(!0),pt.buffers.color.setMask(!0),pt.setPolygonOffset(!1)}function el(S,P,O,B){if((O.isScene===!0?O.overrideMaterial:null)!==null)return;const ct=Ct.isWebGL2;ut===null&&(ut=new Un(1,1,{generateMipmaps:!0,type:vt.has("EXT_color_buffer_half_float")?yi:_n,minFilter:Si,samples:ct?4:0})),_.getDrawingBufferSize(At),ct?ut.setSize(At.x,At.y):ut.setSize(cr(At.x),cr(At.y));const gt=_.getRenderTarget();_.setRenderTarget(ut),_.getClearColor(J),L=_.getClearAlpha(),L<1&&_.setClearColor(16777215,.5),_.clear();const Mt=_.toneMapping;_.toneMapping=gn,Ai(S,O,B),T.updateMultisampleRenderTarget(ut),T.updateRenderTargetMipmap(ut);let bt=!1;for(let Ft=0,Lt=P.length;Ft<Lt;Ft++){const Pt=P[Ft],re=Pt.object,Ce=Pt.geometry,he=Pt.material,Ke=Pt.group;if(he.side===sn&&re.layers.test(B.layers)){const te=he.side;he.side=Re,he.needsUpdate=!0,Rs(re,O,B,Ce,he,Ke),he.side=te,he.needsUpdate=!0,bt=!0}}bt===!0&&(T.updateMultisampleRenderTarget(ut),T.updateRenderTargetMipmap(ut)),_.setRenderTarget(gt),_.setClearColor(J,L),_.toneMapping=Mt}function Ai(S,P,O){const B=P.isScene===!0?P.overrideMaterial:null;for(let I=0,ct=S.length;I<ct;I++){const gt=S[I],Mt=gt.object,bt=gt.geometry,Ft=B===null?gt.material:B,Lt=gt.group;Mt.layers.test(O.layers)&&Rs(Mt,P,O,bt,Ft,Lt)}}function Rs(S,P,O,B,I,ct){S.onBeforeRender(_,P,O,B,I,ct),S.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),I.onBeforeRender(_,P,O,B,S,ct),I.transparent===!0&&I.side===sn&&I.forceSinglePass===!1?(I.side=Re,I.needsUpdate=!0,_.renderBufferDirect(O,P,B,I,S,ct),I.side=vn,I.needsUpdate=!0,_.renderBufferDirect(O,P,B,I,S,ct),I.side=sn):_.renderBufferDirect(O,P,B,I,S,ct),S.onAfterRender(_,P,O,B,I,ct)}function wi(S,P,O){P.isScene!==!0&&(P=St);const B=It.get(S),I=p.state.lights,ct=p.state.shadowsArray,gt=I.state.version,Mt=mt.getParameters(S,I.state,ct,P,O),bt=mt.getProgramCacheKey(Mt);let Ft=B.programs;B.environment=S.isMeshStandardMaterial?P.environment:null,B.fog=P.fog,B.envMap=(S.isMeshStandardMaterial?F:M).get(S.envMap||B.environment),Ft===void 0&&(S.addEventListener("dispose",at),Ft=new Map,B.programs=Ft);let Lt=Ft.get(bt);if(Lt!==void 0){if(B.currentProgram===Lt&&B.lightsStateVersion===gt)return Ls(S,Mt),Lt}else Mt.uniforms=mt.getUniforms(S),S.onBuild(O,Mt,_),S.onBeforeCompile(Mt,_),Lt=mt.acquireProgram(Mt,bt),Ft.set(bt,Lt),B.uniforms=Mt.uniforms;const Pt=B.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Pt.clippingPlanes=Nt.uniform),Ls(S,Mt),B.needsLights=rl(S),B.lightsStateVersion=gt,B.needsLights&&(Pt.ambientLightColor.value=I.state.ambient,Pt.lightProbe.value=I.state.probe,Pt.directionalLights.value=I.state.directional,Pt.directionalLightShadows.value=I.state.directionalShadow,Pt.spotLights.value=I.state.spot,Pt.spotLightShadows.value=I.state.spotShadow,Pt.rectAreaLights.value=I.state.rectArea,Pt.ltc_1.value=I.state.rectAreaLTC1,Pt.ltc_2.value=I.state.rectAreaLTC2,Pt.pointLights.value=I.state.point,Pt.pointLightShadows.value=I.state.pointShadow,Pt.hemisphereLights.value=I.state.hemi,Pt.directionalShadowMap.value=I.state.directionalShadowMap,Pt.directionalShadowMatrix.value=I.state.directionalShadowMatrix,Pt.spotShadowMap.value=I.state.spotShadowMap,Pt.spotLightMatrix.value=I.state.spotLightMatrix,Pt.spotLightMap.value=I.state.spotLightMap,Pt.pointShadowMap.value=I.state.pointShadowMap,Pt.pointShadowMatrix.value=I.state.pointShadowMatrix),B.currentProgram=Lt,B.uniformsList=null,Lt}function Cs(S){if(S.uniformsList===null){const P=S.currentProgram.getUniforms();S.uniformsList=nr.seqWithValue(P.seq,S.uniforms)}return S.uniformsList}function Ls(S,P){const O=It.get(S);O.outputColorSpace=P.outputColorSpace,O.batching=P.batching,O.instancing=P.instancing,O.instancingColor=P.instancingColor,O.skinning=P.skinning,O.morphTargets=P.morphTargets,O.morphNormals=P.morphNormals,O.morphColors=P.morphColors,O.morphTargetsCount=P.morphTargetsCount,O.numClippingPlanes=P.numClippingPlanes,O.numIntersection=P.numClipIntersection,O.vertexAlphas=P.vertexAlphas,O.vertexTangents=P.vertexTangents,O.toneMapping=P.toneMapping}function nl(S,P,O,B,I){P.isScene!==!0&&(P=St),T.resetTextureUnits();const ct=P.fog,gt=B.isMeshStandardMaterial?P.environment:null,Mt=w===null?_.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:an,bt=(B.isMeshStandardMaterial?F:M).get(B.envMap||gt),Ft=B.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,Lt=!!O.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),Pt=!!O.morphAttributes.position,re=!!O.morphAttributes.normal,Ce=!!O.morphAttributes.color;let he=gn;B.toneMapped&&(w===null||w.isXRRenderTarget===!0)&&(he=_.toneMapping);const Ke=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,te=Ke!==void 0?Ke.length:0,Bt=It.get(B),xr=p.state.lights;if($===!0&&(st===!0||S!==y)){const Ie=S===y&&B.id===W;Nt.setState(B,S,Ie)}let ne=!1;B.version===Bt.__version?(Bt.needsLights&&Bt.lightsStateVersion!==xr.state.version||Bt.outputColorSpace!==Mt||I.isBatchedMesh&&Bt.batching===!1||!I.isBatchedMesh&&Bt.batching===!0||I.isInstancedMesh&&Bt.instancing===!1||!I.isInstancedMesh&&Bt.instancing===!0||I.isSkinnedMesh&&Bt.skinning===!1||!I.isSkinnedMesh&&Bt.skinning===!0||I.isInstancedMesh&&Bt.instancingColor===!0&&I.instanceColor===null||I.isInstancedMesh&&Bt.instancingColor===!1&&I.instanceColor!==null||Bt.envMap!==bt||B.fog===!0&&Bt.fog!==ct||Bt.numClippingPlanes!==void 0&&(Bt.numClippingPlanes!==Nt.numPlanes||Bt.numIntersection!==Nt.numIntersection)||Bt.vertexAlphas!==Ft||Bt.vertexTangents!==Lt||Bt.morphTargets!==Pt||Bt.morphNormals!==re||Bt.morphColors!==Ce||Bt.toneMapping!==he||Ct.isWebGL2===!0&&Bt.morphTargetsCount!==te)&&(ne=!0):(ne=!0,Bt.__version=B.version);let xn=Bt.currentProgram;ne===!0&&(xn=wi(B,P,I));let Ps=!1,fi=!1,Mr=!1;const me=xn.getUniforms(),Mn=Bt.uniforms;if(pt.useProgram(xn.program)&&(Ps=!0,fi=!0,Mr=!0),B.id!==W&&(W=B.id,fi=!0),Ps||y!==S){me.setValue(U,"projectionMatrix",S.projectionMatrix),me.setValue(U,"viewMatrix",S.matrixWorldInverse);const Ie=me.map.cameraPosition;Ie!==void 0&&Ie.setValue(U,Rt.setFromMatrixPosition(S.matrixWorld)),Ct.logarithmicDepthBuffer&&me.setValue(U,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&me.setValue(U,"isOrthographic",S.isOrthographicCamera===!0),y!==S&&(y=S,fi=!0,Mr=!0)}if(I.isSkinnedMesh){me.setOptional(U,I,"bindMatrix"),me.setOptional(U,I,"bindMatrixInverse");const Ie=I.skeleton;Ie&&(Ct.floatVertexTextures?(Ie.boneTexture===null&&Ie.computeBoneTexture(),me.setValue(U,"boneTexture",Ie.boneTexture,T)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}I.isBatchedMesh&&(me.setOptional(U,I,"batchingTexture"),me.setValue(U,"batchingTexture",I._matricesTexture,T));const Sr=O.morphAttributes;if((Sr.position!==void 0||Sr.normal!==void 0||Sr.color!==void 0&&Ct.isWebGL2===!0)&&kt.update(I,O,xn),(fi||Bt.receiveShadow!==I.receiveShadow)&&(Bt.receiveShadow=I.receiveShadow,me.setValue(U,"receiveShadow",I.receiveShadow)),B.isMeshGouraudMaterial&&B.envMap!==null&&(Mn.envMap.value=bt,Mn.flipEnvMap.value=bt.isCubeTexture&&bt.isRenderTargetTexture===!1?-1:1),fi&&(me.setValue(U,"toneMappingExposure",_.toneMappingExposure),Bt.needsLights&&il(Mn,Mr),ct&&B.fog===!0&&lt.refreshFogUniforms(Mn,ct),lt.refreshMaterialUniforms(Mn,B,Y,k,ut),nr.upload(U,Cs(Bt),Mn,T)),B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(nr.upload(U,Cs(Bt),Mn,T),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&me.setValue(U,"center",I.center),me.setValue(U,"modelViewMatrix",I.modelViewMatrix),me.setValue(U,"normalMatrix",I.normalMatrix),me.setValue(U,"modelMatrix",I.matrixWorld),B.isShaderMaterial||B.isRawShaderMaterial){const Ie=B.uniformsGroups;for(let yr=0,sl=Ie.length;yr<sl;yr++)if(Ct.isWebGL2){const Ds=Ie[yr];Wt.update(Ds,xn),Wt.bind(Ds,xn)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return xn}function il(S,P){S.ambientLightColor.needsUpdate=P,S.lightProbe.needsUpdate=P,S.directionalLights.needsUpdate=P,S.directionalLightShadows.needsUpdate=P,S.pointLights.needsUpdate=P,S.pointLightShadows.needsUpdate=P,S.spotLights.needsUpdate=P,S.spotLightShadows.needsUpdate=P,S.rectAreaLights.needsUpdate=P,S.hemisphereLights.needsUpdate=P}function rl(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return b},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(S,P,O){It.get(S.texture).__webglTexture=P,It.get(S.depthTexture).__webglTexture=O;const B=It.get(S);B.__hasExternalTextures=!0,B.__hasExternalTextures&&(B.__autoAllocateDepthBuffer=O===void 0,B.__autoAllocateDepthBuffer||vt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),B.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(S,P){const O=It.get(S);O.__webglFramebuffer=P,O.__useDefaultFramebuffer=P===void 0},this.setRenderTarget=function(S,P=0,O=0){w=S,C=P,b=O;let B=!0,I=null,ct=!1,gt=!1;if(S){const bt=It.get(S);bt.__useDefaultFramebuffer!==void 0?(pt.bindFramebuffer(U.FRAMEBUFFER,null),B=!1):bt.__webglFramebuffer===void 0?T.setupRenderTarget(S):bt.__hasExternalTextures&&T.rebindTextures(S,It.get(S.texture).__webglTexture,It.get(S.depthTexture).__webglTexture);const Ft=S.texture;(Ft.isData3DTexture||Ft.isDataArrayTexture||Ft.isCompressedArrayTexture)&&(gt=!0);const Lt=It.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Lt[P])?I=Lt[P][O]:I=Lt[P],ct=!0):Ct.isWebGL2&&S.samples>0&&T.useMultisampledRTT(S)===!1?I=It.get(S).__webglMultisampledFramebuffer:Array.isArray(Lt)?I=Lt[O]:I=Lt,A.copy(S.viewport),G.copy(S.scissor),V=S.scissorTest}else A.copy(q).multiplyScalar(Y).floor(),G.copy(et).multiplyScalar(Y).floor(),V=nt;if(pt.bindFramebuffer(U.FRAMEBUFFER,I)&&Ct.drawBuffers&&B&&pt.drawBuffers(S,I),pt.viewport(A),pt.scissor(G),pt.setScissorTest(V),ct){const bt=It.get(S.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+P,bt.__webglTexture,O)}else if(gt){const bt=It.get(S.texture),Ft=P||0;U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,bt.__webglTexture,O||0,Ft)}W=-1},this.readRenderTargetPixels=function(S,P,O,B,I,ct,gt){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Mt=It.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&gt!==void 0&&(Mt=Mt[gt]),Mt){pt.bindFramebuffer(U.FRAMEBUFFER,Mt);try{const bt=S.texture,Ft=bt.format,Lt=bt.type;if(Ft!==He&&dt.convert(Ft)!==U.getParameter(U.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Pt=Lt===yi&&(vt.has("EXT_color_buffer_half_float")||Ct.isWebGL2&&vt.has("EXT_color_buffer_float"));if(Lt!==_n&&dt.convert(Lt)!==U.getParameter(U.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Lt===pn&&(Ct.isWebGL2||vt.has("OES_texture_float")||vt.has("WEBGL_color_buffer_float")))&&!Pt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}P>=0&&P<=S.width-B&&O>=0&&O<=S.height-I&&U.readPixels(P,O,B,I,dt.convert(Ft),dt.convert(Lt),ct)}finally{const bt=w!==null?It.get(w).__webglFramebuffer:null;pt.bindFramebuffer(U.FRAMEBUFFER,bt)}}},this.copyFramebufferToTexture=function(S,P,O=0){const B=Math.pow(2,-O),I=Math.floor(P.image.width*B),ct=Math.floor(P.image.height*B);T.setTexture2D(P,0),U.copyTexSubImage2D(U.TEXTURE_2D,O,0,0,S.x,S.y,I,ct),pt.unbindTexture()},this.copyTextureToTexture=function(S,P,O,B=0){const I=P.image.width,ct=P.image.height,gt=dt.convert(O.format),Mt=dt.convert(O.type);T.setTexture2D(O,0),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,O.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,O.unpackAlignment),P.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,B,S.x,S.y,I,ct,gt,Mt,P.image.data):P.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,B,S.x,S.y,P.mipmaps[0].width,P.mipmaps[0].height,gt,P.mipmaps[0].data):U.texSubImage2D(U.TEXTURE_2D,B,S.x,S.y,gt,Mt,P.image),B===0&&O.generateMipmaps&&U.generateMipmap(U.TEXTURE_2D),pt.unbindTexture()},this.copyTextureToTexture3D=function(S,P,O,B,I=0){if(_.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const ct=S.max.x-S.min.x+1,gt=S.max.y-S.min.y+1,Mt=S.max.z-S.min.z+1,bt=dt.convert(B.format),Ft=dt.convert(B.type);let Lt;if(B.isData3DTexture)T.setTexture3D(B,0),Lt=U.TEXTURE_3D;else if(B.isDataArrayTexture||B.isCompressedArrayTexture)T.setTexture2DArray(B,0),Lt=U.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,B.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,B.unpackAlignment);const Pt=U.getParameter(U.UNPACK_ROW_LENGTH),re=U.getParameter(U.UNPACK_IMAGE_HEIGHT),Ce=U.getParameter(U.UNPACK_SKIP_PIXELS),he=U.getParameter(U.UNPACK_SKIP_ROWS),Ke=U.getParameter(U.UNPACK_SKIP_IMAGES),te=O.isCompressedTexture?O.mipmaps[I]:O.image;U.pixelStorei(U.UNPACK_ROW_LENGTH,te.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,te.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,S.min.x),U.pixelStorei(U.UNPACK_SKIP_ROWS,S.min.y),U.pixelStorei(U.UNPACK_SKIP_IMAGES,S.min.z),O.isDataTexture||O.isData3DTexture?U.texSubImage3D(Lt,I,P.x,P.y,P.z,ct,gt,Mt,bt,Ft,te.data):O.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),U.compressedTexSubImage3D(Lt,I,P.x,P.y,P.z,ct,gt,Mt,bt,te.data)):U.texSubImage3D(Lt,I,P.x,P.y,P.z,ct,gt,Mt,bt,Ft,te),U.pixelStorei(U.UNPACK_ROW_LENGTH,Pt),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,re),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Ce),U.pixelStorei(U.UNPACK_SKIP_ROWS,he),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Ke),I===0&&B.generateMipmaps&&U.generateMipmap(Lt),pt.unbindTexture()},this.initTexture=function(S){S.isCubeTexture?T.setTextureCube(S,0):S.isData3DTexture?T.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?T.setTexture2DArray(S,0):T.setTexture2D(S,0),pt.unbindTexture()},this.resetState=function(){C=0,b=0,w=null,pt.reset(),Dt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return on}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===gs?"display-p3":"srgb",e.unpackColorSpace=Yt.workingColorSpace===pr?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===fe?Dn:Ma}set outputEncoding(t){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=t===Dn?fe:an}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(t){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=t}}class Cp extends Ss{}Cp.prototype.isWebGL1Renderer=!0;class Wa extends pe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e}}class ys extends hi{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Gt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const ta=new D,ea=new D,na=new oe,Qr=new wa,Zi=new mr;class Lp extends pe{constructor(t=new We,e=new ys){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let r=1,s=e.count;r<s;r++)ta.fromBufferAttribute(e,r-1),ea.fromBufferAttribute(e,r),n[r]=n[r-1],n[r]+=ta.distanceTo(ea);t.setAttribute("lineDistance",new we(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,r=this.matrixWorld,s=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Zi.copy(n.boundingSphere),Zi.applyMatrix4(r),Zi.radius+=s,t.ray.intersectsSphere(Zi)===!1)return;na.copy(r).invert(),Qr.copy(t.ray).applyMatrix4(na);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=new D,h=new D,d=new D,u=new D,m=this.isLineSegments?2:1,v=n.index,p=n.attributes.position;if(v!==null){const f=Math.max(0,a.start),g=Math.min(v.count,a.start+a.count);for(let _=f,E=g-1;_<E;_+=m){const C=v.getX(_),b=v.getX(_+1);if(c.fromBufferAttribute(p,C),h.fromBufferAttribute(p,b),Qr.distanceSqToSegment(c,h,u,d)>l)continue;u.applyMatrix4(this.matrixWorld);const W=t.ray.origin.distanceTo(u);W<t.near||W>t.far||e.push({distance:W,point:d.clone().applyMatrix4(this.matrixWorld),index:_,face:null,faceIndex:null,object:this})}}else{const f=Math.max(0,a.start),g=Math.min(p.count,a.start+a.count);for(let _=f,E=g-1;_<E;_+=m){if(c.fromBufferAttribute(p,_),h.fromBufferAttribute(p,_+1),Qr.distanceSqToSegment(c,h,u,d)>l)continue;u.applyMatrix4(this.matrixWorld);const b=t.ray.origin.distanceTo(u);b<t.near||b>t.far||e.push({distance:b,point:d.clone().applyMatrix4(this.matrixWorld),index:_,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}const ia=new D,ra=new D;class Xa extends Lp{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let r=0,s=e.count;r<s;r+=2)ia.fromBufferAttribute(e,r),ra.fromBufferAttribute(e,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+ia.distanceTo(ra);t.setAttribute("lineDistance",new we(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}const Ji=new D,Qi=new D,ts=new D,tr=new Oe;class Pp extends We{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const r=Math.pow(10,4),s=Math.cos(ei*e),a=t.getIndex(),o=t.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],h=["a","b","c"],d=new Array(3),u={},m=[];for(let v=0;v<l;v+=3){a?(c[0]=a.getX(v),c[1]=a.getX(v+1),c[2]=a.getX(v+2)):(c[0]=v,c[1]=v+1,c[2]=v+2);const{a:x,b:p,c:f}=tr;if(x.fromBufferAttribute(o,c[0]),p.fromBufferAttribute(o,c[1]),f.fromBufferAttribute(o,c[2]),tr.getNormal(ts),d[0]=`${Math.round(x.x*r)},${Math.round(x.y*r)},${Math.round(x.z*r)}`,d[1]=`${Math.round(p.x*r)},${Math.round(p.y*r)},${Math.round(p.z*r)}`,d[2]=`${Math.round(f.x*r)},${Math.round(f.y*r)},${Math.round(f.z*r)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let g=0;g<3;g++){const _=(g+1)%3,E=d[g],C=d[_],b=tr[h[g]],w=tr[h[_]],W=`${E}_${C}`,y=`${C}_${E}`;y in u&&u[y]?(ts.dot(u[y].normal)<=s&&(m.push(b.x,b.y,b.z),m.push(w.x,w.y,w.z)),u[y]=null):W in u||(u[W]={index0:c[g],index1:c[_],normal:ts.clone()})}}for(const v in u)if(u[v]){const{index0:x,index1:p}=u[v];Ji.fromBufferAttribute(o,x),Qi.fromBufferAttribute(o,p),m.push(Ji.x,Ji.y,Ji.z),m.push(Qi.x,Qi.y,Qi.z)}this.setAttribute("position",new we(m,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class Es extends We{constructor(t=1,e=32,n=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],d=new D,u=new D,m=[],v=[],x=[],p=[];for(let f=0;f<=n;f++){const g=[],_=f/n;let E=0;f===0&&a===0?E=.5/e:f===n&&l===Math.PI&&(E=-.5/e);for(let C=0;C<=e;C++){const b=C/e;d.x=-t*Math.cos(r+b*s)*Math.sin(a+_*o),d.y=t*Math.cos(a+_*o),d.z=t*Math.sin(r+b*s)*Math.sin(a+_*o),v.push(d.x,d.y,d.z),u.copy(d).normalize(),x.push(u.x,u.y,u.z),p.push(b+E,1-_),g.push(c++)}h.push(g)}for(let f=0;f<n;f++)for(let g=0;g<e;g++){const _=h[f][g+1],E=h[f][g],C=h[f+1][g],b=h[f+1][g+1];(f!==0||a>0)&&m.push(_,E,b),(f!==n-1||l<Math.PI)&&m.push(E,C,b)}this.setIndex(m),this.setAttribute("position",new we(v,3)),this.setAttribute("normal",new we(x,3)),this.setAttribute("uv",new we(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Es(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class qa extends hi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Gt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Gt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Sa,this.normalScale=new Ht(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Ya extends pe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Gt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),e}}const es=new oe,sa=new D,oa=new D;class Dp{constructor(t){this.camera=t,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ht(512,512),this.map=null,this.mapPass=null,this.matrix=new oe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new vs,this._frameExtents=new Ht(1,1),this._viewportCount=1,this._viewports=[new ue(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;sa.setFromMatrixPosition(t.matrixWorld),e.position.copy(sa),oa.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(oa),e.updateMatrixWorld(),es.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(es),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(es)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class Up extends Dp{constructor(){super(new Oa(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class $a extends Ya{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(pe.DEFAULT_UP),this.updateMatrix(),this.target=new pe,this.shadow=new Up}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class ja extends Ya{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class ns{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(ve(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Ip extends Xa{constructor(t=10,e=10,n=4473924,r=8947848){n=new Gt(n),r=new Gt(r);const s=e/2,a=t/e,o=t/2,l=[],c=[];for(let u=0,m=0,v=-o;u<=e;u++,v+=a){l.push(-o,0,v,o,0,v),l.push(v,0,-o,v,0,o);const x=u===s?n:r;x.toArray(c,m),m+=3,x.toArray(c,m),m+=3,x.toArray(c,m),m+=3,x.toArray(c,m),m+=3}const h=new We;h.setAttribute("position",new we(l,3)),h.setAttribute("color",new we(c,3));const d=new ys({vertexColors:!0,toneMapped:!1});super(h,d),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ps}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ps);class Np{constructor(t,e){Z(this,"renderer");Z(this,"scene",new Wa);Z(this,"camera",new De(60,1,.1,100));Z(this,"raf",0);Z(this,"last",0);Z(this,"fps",0);Z(this,"dpr",1);Z(this,"isPanning",!1);Z(this,"lastPos",new Ht);Z(this,"target",new D);Z(this,"dist",3);Z(this,"grid");Z(this,"_onWheel");Z(this,"_onPointerDown");Z(this,"_onPointerMove");Z(this,"_onPointerUp");this.canvas=t,this.onFps=e,this.renderer=new Ss({canvas:t,antialias:!0}),this.renderer.setClearColor(659222,1),this.camera.position.set(0,0,this.dist);const n=new Es(.6,48,36),r=new qa({color:3122431,metalness:.2,roughness:.3}),s=new $e(n,r);this.scene.add(s),this.grid=new Ip(10,20,3364215,2241348),this.grid.material.transparent=!0,this.grid.material.opacity=.25,this.grid.position.y=-.6,this.scene.add(this.grid);const a=new $a(16777215,1.2);a.position.set(2,3,4),this.scene.add(a),this.scene.add(new ja(16777215,.3)),this._mesh=s}resize(t,e,n){this.dpr=n,this.renderer.setPixelRatio(n),this.renderer.setSize(t/n,e/n,!1),this.camera.aspect=t/e,this.camera.updateProjectionMatrix()}start(){const t=this.canvas;new Ht,this._onWheel=n=>{n.preventDefault();const r=Math.exp(-n.deltaY*.001);this.dist=Cr.clamp(this.dist*r,1,10);const s=new D().subVectors(this.camera.position,this.target).normalize();this.camera.position.copy(this.target.clone().add(s.multiplyScalar(this.dist)))},this._onPointerDown=n=>{t.setPointerCapture(n.pointerId),this.isPanning=n.button===1||n.shiftKey,this.lastPos.set(n.clientX,n.clientY)},this._onPointerMove=n=>{if(n.buttons===0)return;const r=n.clientX-this.lastPos.x,s=n.clientY-this.lastPos.y;if(this.lastPos.set(n.clientX,n.clientY),this.isPanning){const a=this.dist*.002,o=new D().subVectors(this.camera.getWorldDirection(new D).cross(this.camera.up).negate(),new D(0,0,0));this.target.addScaledVector(o,r*a),this.target.addScaledVector(this.camera.up,-s*a),this.camera.position.addScaledVector(o,r*a),this.camera.position.addScaledVector(this.camera.up,-s*a)}else{const o=new D().subVectors(this.camera.position,this.target),l=new ns().setFromVector3(o);l.theta-=r*.005,l.phi=Cr.clamp(l.phi-s*.005,.1,Math.PI-.1),o.setFromSpherical(l),this.camera.position.copy(this.target.clone().add(o)),this.camera.lookAt(this.target)}},this._onPointerUp=n=>{this.isPanning=!1,t.releasePointerCapture(n.pointerId)},t.addEventListener("wheel",this._onWheel,{passive:!1}),t.addEventListener("pointerdown",this._onPointerDown),t.addEventListener("pointermove",this._onPointerMove),t.addEventListener("pointerup",this._onPointerUp),this.last=performance.now();const e=n=>{const r=n-this.last;this.last=n;const s=this._mesh;s.rotation.y+=.001*r,s.rotation.x+=6e-4*r,this.renderer.render(this.scene,this.camera),this.fps=this.fps?this.fps*.9+1e3/r*.1:1e3/r,this.onFps(this.fps),this.raf=requestAnimationFrame(e)};this.raf=requestAnimationFrame(e)}resetView(){this.target.set(0,0,0),this.dist=3,this.camera.position.set(0,0,this.dist),this.camera.lookAt(this.target)}setView(t){const e=this.dist;t==="front"&&this.camera.position.set(0,0,e),t==="back"&&this.camera.position.set(0,0,-e),t==="left"&&this.camera.position.set(-e,0,0),t==="right"&&this.camera.position.set(e,0,0),t==="top"&&this.camera.position.set(0,e,0),t==="bottom"&&this.camera.position.set(0,-e,0),this.camera.lookAt(this.target.set(0,0,0))}orbitBy(t,e){const r=new D().subVectors(this.camera.position,this.target),s=new ns().setFromVector3(r);s.theta-=t*.005,s.phi=Cr.clamp(s.phi-e*.005,.1,Math.PI-.1),r.setFromSpherical(s),this.camera.position.copy(this.target.clone().add(r)),this.camera.lookAt(this.target)}getSpherical(){const t=new D().subVectors(this.camera.position,this.target),e=new ns().setFromVector3(t);return{theta:e.theta,phi:e.phi}}getCameraQuat(){const t=this.camera.quaternion;return{x:t.x,y:t.y,z:t.z,w:t.w}}setGridVisible(t){this.grid&&(this.grid.visible=t)}dispose(){cancelAnimationFrame(this.raf);const t=this.canvas;this._onWheel&&t.removeEventListener("wheel",this._onWheel),this._onPointerDown&&t.removeEventListener("pointerdown",this._onPointerDown),this._onPointerMove&&t.removeEventListener("pointermove",this._onPointerMove),this._onPointerUp&&t.removeEventListener("pointerup",this._onPointerUp),this._onWheel=this._onPointerDown=this._onPointerMove=this._onPointerUp=void 0,this.renderer.dispose()}}class Fp{constructor(t,e,n){Z(this,"renderer");Z(this,"scene",new Wa);Z(this,"camera",new De(50,1,.1,10));Z(this,"cube");Z(this,"raf",0);Z(this,"dragging",!1);Z(this,"last",new Ht);this.host=t,this.onSnap=e,this.onOrbit=n;const r=document.createElement("canvas");r.id="nav3d",r.style.width="70px",r.style.height="70px",r.width=140,r.height=140,r.style.position="absolute",r.style.top="8px",r.style.right="8px",r.style.zIndex="30",r.style.pointerEvents="auto",this.host.appendChild(r),this.renderer=new Ss({canvas:r,antialias:!0,alpha:!0}),this.renderer.setPixelRatio(1),this.camera.position.set(0,0,2.5);const s=new di(1,1,1),a=new qa({color:3109631,roughness:.4,metalness:.1});this.cube=new $e(s,a);const o=new Xa(new Pp(s),new ys({color:16777215}));this.cube.add(o);const l=new $a(16777215,1.2);l.position.set(2,3,4),this.scene.add(l),this.scene.add(new ja(16777215,.5)),this.scene.add(this.cube),r.addEventListener("pointerdown",h=>{h.currentTarget.setPointerCapture(h.pointerId),this.dragging=!0,this.last.set(h.clientX,h.clientY)}),r.addEventListener("pointermove",h=>{if(!this.dragging)return;const d=h.clientX-this.last.x,u=h.clientY-this.last.y;this.last.set(h.clientX,h.clientY),this.onOrbit(d,u)}),r.addEventListener("pointerup",h=>{var d,u;this.dragging=!1,(u=(d=h.currentTarget).releasePointerCapture)==null||u.call(d,h.pointerId)}),r.addEventListener("click",h=>{const d=h.currentTarget.getBoundingClientRect(),u=(h.clientX-d.left)/d.width;(h.clientY-d.top)/d.height<.33?this.onSnap("top"):u<.33?this.onSnap("left"):u>.66?this.onSnap("right"):this.onSnap("front")});const c=()=>{this.renderer.setSize(r.width,r.height,!1),this.renderer.render(this.scene,this.camera),this.raf=requestAnimationFrame(c)};this.raf=requestAnimationFrame(c)}setOrientation(t){this.cube.quaternion.set(t.x,t.y,t.z,t.w).invert()}dispose(){var e;cancelAnimationFrame(this.raf);const t=this.renderer.domElement;(e=t.parentElement)==null||e.removeChild(t),this.renderer.dispose()}}let ie=null;document.addEventListener("keydown",i=>{if(!(i.ctrlKey||i.metaKey))return;const t=document.getElementById("overlay");if(!t)return;const e=document.activeElement;if(e&&e.classList&&e.classList.contains("annotation")&&i.key.toLowerCase()==="c"&&(ie={type:e.classList.contains("label")?"label":e.classList.contains("arrow")?"arrow":"text",text:e.textContent,left:e.style.left,top:e.style.top,width:e.style.width,height:e.style.height,color:e.style.color,fontSize:e.style.fontSize,background:e.style.background,borderRadius:e.style.borderRadius,padding:e.style.padding,locked:e.getAttribute("data-locked")==="1"},i.preventDefault()),i.key.toLowerCase()==="v"&&ie){const n=document.createElement("div");n.className="annotation "+ie.type,n.contentEditable=ie.type!=="arrow"&&!ie.locked?"true":"false",n.style.position="absolute";const r=parseInt(ie.left||"0",10)+24,s=parseInt(ie.top||"0",10)+24;n.style.left=r+"px",n.style.top=s+"px",n.style.minWidth="60px",n.style.minHeight="24px",n.style.color=ie.color||"#fff",n.style.background=ie.background||(ie.type==="arrow"?"none":"rgba(20,30,50,0.7)"),n.style.borderRadius=ie.borderRadius||"6px",n.style.padding=ie.padding||(ie.type==="arrow"?"0":"4px 10px"),n.style.fontSize=ie.fontSize||"18px",n.style.cursor="move",n.style.userSelect="text",n.style.zIndex="10",n.draggable=!ie.locked,ie.locked&&n.setAttribute("data-locked","1"),ie.type==="label"&&(n.textContent=ie.text||"Label"),ie.type==="text"&&(n.textContent=ie.text||"Text"),ie.type==="arrow"&&(n.innerHTML='<svg width="60" height="24"><line x1="8" y1="12" x2="52" y2="12" stroke="#fff" stroke-width="3" marker-end="url(#arrowhead)"/><defs><marker id="arrowhead" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L8,4 L0,8 L2,4 Z" fill="#fff"/></marker></defs></svg>',n.contentEditable="false",n.style.pointerEvents="auto",n.style.width="60px",n.style.height="24px",n.style.background="none",n.style.padding="0");let a=0,o=0;n.addEventListener("dragstart",l=>{a=l.offsetX,o=l.offsetY}),n.addEventListener("dragend",l=>{n.style.left=l.pageX-t.offsetLeft-a+"px",n.style.top=l.pageY-t.offsetTop-o+"px"}),n.addEventListener("dblclick",()=>n.remove()),n.addEventListener("click",l=>{l.stopPropagation(),n.getAttribute("data-locked")!=="1"&&Ka(n)}),document.addEventListener("click",l=>{n.contains(l.target)||Za()},{capture:!0,once:!0}),t.appendChild(n),ie.type!=="arrow"&&n.focus(),i.preventDefault()}});let Zt=null;function Ka(i){Zt||(Zt=document.createElement("div"),Zt.id="annotationStyleBar",Zt.style.position="fixed",Zt.style.background="#222b",Zt.style.borderRadius="8px",Zt.style.padding="6px 12px",Zt.style.display="flex",Zt.style.gap="8px",Zt.style.zIndex="2000",Zt.style.boxShadow="0 2px 12px #0008",Zt.innerHTML=`
          <label style="color:#fff;font-size:13px;">Color <input type="color" id="annColor" style="vertical-align:middle;width:28px;height:22px;border:none;background:none;"></label>
          <label style="color:#fff;font-size:13px;">Size <input type="number" id="annSize" min="10" max="48" value="18" style="width:40px;"></label>
          <button id="annLock" style="background:none;border:none;color:#fff;font-size:16px;cursor:pointer;" title="Lock/Unlock">🔒</button>
          <button id="annDelete" style="background:none;border:none;color:#f55;font-size:16px;cursor:pointer;" title="Delete">🗑️</button>
          <button id="annClose" style="background:none;border:none;color:#fff;font-size:18px;cursor:pointer;">×</button>
        `,document.body.appendChild(Zt));const t=i.getBoundingClientRect();Zt.style.left=t.left+"px",Zt.style.top=t.top-38+"px",Zt.style.display="flex";const e=Zt.querySelector("#annColor"),n=Zt.querySelector("#annSize");e.value=Op(i.style.color||"#ffffff"),n.value=parseInt(i.style.fontSize||"18",10).toString(),e.oninput=()=>{i.style.color=e.value},n.oninput=()=>{i.style.fontSize=n.value+"px"},Zt.querySelector("#annClose").onclick=()=>{Zt.style.display="none"};const r=Zt.querySelector("#annLock");function s(){r.textContent=i.getAttribute("data-locked")==="1"?"🔓":"🔒",r.title=i.getAttribute("data-locked")==="1"?"Unlock":"Lock"}s(),r.onclick=()=>{i.getAttribute("data-locked")==="1"?(i.setAttribute("data-locked","0"),i.contentEditable=i.classList.contains("arrow")?"false":"true",i.style.pointerEvents="auto",i.draggable=!0):(i.setAttribute("data-locked","1"),i.contentEditable="false",i.style.pointerEvents="none",i.draggable=!1),s(),Zt.style.display="none"},Zt.querySelector("#annDelete").onclick=()=>{i.remove(),Zt.style.display="none"}}function Za(){Zt&&(Zt.style.display="none")}function Op(i){if(i.startsWith("#"))return i;const t=i.match(/\d+/g);return t?"#"+t.slice(0,3).map(e=>(+e).toString(16).padStart(2,"0")).join(""):"#ffffff"}window.addLabel=function(){Ts("label")};window.addArrow=function(){Ts("arrow")};window.addText=function(){Ts("text")};function Ts(i){const t=document.getElementById("overlay");if(!t)return;const e=document.createElement("div");e.className="annotation "+i,e.contentEditable=i!=="arrow"?"true":"false",e.style.position="absolute",e.style.left="40%",e.style.top="40%",e.style.minWidth="60px",e.style.minHeight="24px",e.style.color="#fff",e.style.background=i==="arrow"?"none":"rgba(20,30,50,0.7)",e.style.borderRadius="6px",e.style.padding=i==="arrow"?"0":"4px 10px",e.style.fontSize="18px",e.style.cursor="move",e.style.userSelect="text",e.style.zIndex="10",e.draggable=!0,i==="label"&&(e.textContent="Label"),i==="text"&&(e.textContent="Text"),i==="arrow"&&(e.innerHTML='<svg width="60" height="24"><line x1="8" y1="12" x2="52" y2="12" stroke="#fff" stroke-width="3" marker-end="url(#arrowhead)"/><defs><marker id="arrowhead" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L8,4 L0,8 L2,4 Z" fill="#fff"/></marker></defs></svg>',e.contentEditable="false",e.style.pointerEvents="auto",e.style.width="60px",e.style.height="24px",e.style.background="none",e.style.padding="0");let n=0,r=0;e.addEventListener("dragstart",s=>{n=s.offsetX,r=s.offsetY}),e.addEventListener("dragend",s=>{e.style.left=s.pageX-t.offsetLeft-n+"px",e.style.top=s.pageY-t.offsetTop-r+"px"}),e.addEventListener("dblclick",()=>e.remove()),t.appendChild(e),i!=="arrow"&&e.focus(),e.addEventListener("click",s=>{s.stopPropagation(),e.getAttribute("data-locked")!=="1"&&Ka(e)}),document.addEventListener("click",s=>{e.contains(s.target)||Za()},{capture:!0,once:!0})}window.showHelp=function(){var t;(t=window.appLog)==null||t.call(window,"Help opened");let i=document.getElementById("helpOverlay");if(i){i.style.display="block";return}i=document.createElement("div"),i.id="helpOverlay",i.style.position="fixed",i.style.inset="0",i.style.background="rgba(10,16,25,0.96)",i.style.zIndex="1000",i.style.color="#dce6f2",i.style.fontSize="16px",i.style.overflowY="auto",i.style.padding="48px 0 0 0",i.innerHTML=`
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
  `,document.body.appendChild(i),document.getElementById("closeHelp").onclick=()=>{i.style.display="none"}};window.recordGif=function(){var t;(t=window.appLog)==null||t.call(window,"Recording started");const i=document.getElementById("glcanvas");if(i)if(typeof MediaRecorder<"u"){const e=i.captureStream?i.captureStream(30):null;if(!e){alert("Recording not supported in this browser.");return}const n=new MediaRecorder(e,{mimeType:"video/webm"}),r=[];n.ondataavailable=s=>{s.data.size>0&&r.push(s.data)},n.onstop=()=>{var l;(l=window.appLog)==null||l.call(window,"Recording stopped and saved");const s=new Blob(r,{type:"video/webm"}),a=URL.createObjectURL(s),o=document.createElement("a");o.href=a,o.download="fluidsim_recording.webm",document.body.appendChild(o),o.click(),document.body.removeChild(o),setTimeout(()=>URL.revokeObjectURL(a),500)},n.start(),alert("Recording started. Click OK to stop."),n.stop()}else alert("MediaRecorder not supported. For GIF export, use a screen recorder or try Chrome/Edge.")};window.exportImage=function(){var e;(e=window.appLog)==null||e.call(window,"Export image");const i=document.getElementById("glcanvas");if(!i)return;const t=document.createElement("a");t.download="fluidsim_view.png",t.href=i.toDataURL("image/png"),t.click()};const Bp=document.getElementById("app");Bp.innerHTML=`
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
</div>`;let qe=document.getElementById("glcanvas");const zp=document.getElementById("sidebar"),is=document.getElementById("console"),ai=document.getElementById("overlay"),xe=document.createElement("canvas");xe.id="legend";xe.width=220;xe.height=42;xe.style.position="absolute";xe.style.bottom="12px";xe.style.right="12px";xe.style.background="#0b1220cc";xe.style.border="1px solid #1f2a3a";xe.style.borderRadius="8px";xe.style.padding="6px 8px";xe.style.zIndex="15";ai.appendChild(xe);const Me=document.createElement("div");Me.id="navCube";Me.style.position="absolute";Me.style.top="10px";Me.style.right="10px";Me.style.width="70px";Me.style.height="70px";Me.style.background="#0b1220cc";Me.style.border="1px solid #1f2a3a";Me.style.borderRadius="8px";Me.style.display="grid";Me.style.gridTemplateRows="1fr auto";Me.style.zIndex="25";Me.style.userSelect="none";Me.style.pointerEvents="auto";Me.innerHTML='<canvas id="navCanvas" width="70" height="50"></canvas><div style="display:flex;gap:6px;justify-content:center;padding:4px"><button id="homeView" class="btn ghost" style="padding:4px 8px">Home</button><label style="display:flex;align-items:center;gap:6px;color:#8da2b5;font-size:12px"><input id="gridToggle" type="checkbox" checked/> Grid</label></div>';ai.appendChild(Me);let Mi;function Ja(){Mi&&(cancelAnimationFrame(Mi),Mi=void 0)}function dr(i,t){const e=document.getElementById("navCanvas");if(!e)return;const n=e.getContext("2d");if(n.clearRect(0,0,e.width,e.height),i==="3d"){if(n.lineWidth=1.2,n.strokeStyle="#4ea0ff",n.fillStyle="#173152",n.beginPath(),n.moveTo(21,12),n.lineTo(49,12),n.lineTo(55,6),n.lineTo(27,6),n.closePath(),n.fill(),n.stroke(),n.fillStyle="#132239",n.beginPath(),n.rect(21,12,2*14,2*14),n.fill(),n.stroke(),n.fillStyle="#112034",n.beginPath(),n.moveTo(49,12),n.lineTo(55,6),n.lineTo(55,34),n.lineTo(49,40),n.closePath(),n.fill(),n.stroke(),n.fillStyle="#8da2b5",n.font="10px ui-monospace, monospace",n.textAlign="center",n.fillText("3D",35,11),t){const o=t.phi,l=t.theta,c=Math.sin(o)*Math.sin(l),h=Math.cos(o),d=Math.sin(o)*Math.cos(l),u=Math.abs(c),m=Math.abs(h),v=Math.abs(d);let x="FRONT",p="#4ea0ff";v>=u&&v>=m?x=d>=0?"FRONT":"BACK":u>=m?x=c>=0?"RIGHT":"LEFT":x=h>=0?"TOP":"BOTTOM";const f=46,g=12,_=35-f/2,E=5;n.fillStyle="#0f1e34",n.strokeStyle=p,n.lineWidth=1,n.beginPath(),n.roundRect(_,E,f,g,4),n.fill(),n.stroke(),n.fillStyle="#bcd1e6",n.font="9px ui-monospace, monospace",n.fillText(x,35,E+9.5)}}else n.strokeStyle="#48e3b7",n.fillStyle="#122a23",n.lineWidth=1.5,n.strokeRect(15,10,40,30),n.fillRect(15,10,40,30),n.fillStyle="#8da2b5",n.font="10px ui-monospace, monospace",n.textAlign="center",n.fillText("2D",35,11)}dr("3d");document.getElementById("homeView").addEventListener("click",()=>{var i,t;Et&&((i=Et.resetView)==null||i.call(Et)),Xt&&((t=Xt.resetView)==null||t.call(Xt))});const er=document.getElementById("gridToggle");er==null||er.addEventListener("change",()=>{var i;Et&&((i=Et.setGridVisible)==null||i.call(Et,er.checked))});const vr=document.getElementById("navCanvas");let bs=!1,ir=[0,0];vr.addEventListener("pointerdown",i=>{bs=!0,i.currentTarget.setPointerCapture(i.pointerId),ir=[i.clientX,i.clientY]});vr.addEventListener("pointermove",i=>{var n;if(!bs||!Et)return;const t=i.clientX-ir[0],e=i.clientY-ir[1];ir=[i.clientX,i.clientY],(n=Et.orbitBy)==null||n.call(Et,t,e)});vr.addEventListener("pointerup",i=>{var t,e;bs=!1,(e=(t=i.currentTarget).releasePointerCapture)==null||e.call(t,i.pointerId)});vr.addEventListener("click",i=>{var r,s,a,o;if(!Et)return;const t=i.currentTarget.getBoundingClientRect(),e=(i.clientX-t.left)/t.width;(i.clientY-t.top)/t.height<.35?(r=Et.setView)==null||r.call(Et,"top"):e<.33?(s=Et.setView)==null||s.call(Et,"left"):e>.66?(a=Et.setView)==null||a.call(Et,"right"):(o=Et.setView)==null||o.call(Et,"front")});function kp(i){i=Math.max(0,Math.min(1,i));const t=34.61+i*(1172.33+i*(-10793.56+i*(33300.12+i*(-38394.49+i*14825.05)))),e=23.31+i*(557.33+i*(1225.33+i*(-3574.96+i*(3481.96-i*1108.04)))),n=27.2+i*(321.21+i*(-1525.77+i*(2815.57+i*(-1904.75+i*348.02)))),r=Math.round(t/255),s=Math.round(e/255),a=Math.round(n/255);return`rgb(${r}, ${s}, ${a})`}function aa(i,t,e){return i+(t-i)*e}window.updateLegend=function(i){const t=xe.getContext("2d"),e=xe.width,n=xe.height;t.clearRect(0,0,e,n);const r=(v,x,p)=>{t.fillStyle="#dce6f2",t.font="11px ui-monospace, monospace",t.textAlign="center",t.fillText(v,x,p)},s=10,a=18,o=e-20,l=10;t.fillStyle="#0b1220",t.fillRect(0,0,e,n);const c=document.querySelector("#overlayVis"),h=i||(c==null?void 0:c.value)||"dye";for(let v=0;v<o;v++){const x=v/(o-1);let p="white";if(h==="velocity")p=kp(x);else if(h==="pressure"){const f=aa(-1,1,x),g=.5+.5*f,_=.5-.5*f,E=1-Math.abs(f);p=`rgb(${Math.round(g*255)},${Math.round(_*255)},${Math.round(E*255)})`}else if(h==="vorticity"){const f=aa(-1,1,x),g=.5+.5*f,_=.5-.5*f,E=1-Math.abs(f);p=`rgb(${Math.round(g*255)},${Math.round(_*255)},${Math.round(E*255)})`}else if(h==="streamlines"){const f=Math.round(x*255);p=`rgb(${f},${f},${f})`}t.fillStyle=p,t.fillRect(s+v,a,1,l)}t.fillStyle="#dce6f2",t.font="12px ui-monospace, monospace",t.textAlign="left";let d="0",u="1",m="";if(h==="velocity")d="0",u="|v|",m="Velocity";else if(h==="pressure"){const v=document.getElementById("pScale"),x=v?parseFloat(v.value):1;d=`-${x.toFixed(1)}`,u=`+${x.toFixed(1)}`,m="Pressure"}else h==="vorticity"?(d="-1",u="+1",m="Vorticity"):h==="streamlines"&&(d="0",u="1",m="Streamlines");t.fillText(m,s,12),r(d,s,a+l+14),r(u,s+o,a+l+14),xe.style.display=h==="dye"?"none":"block"};let Xt=null,Et=null,rn=null;function ur(i){is.textContent=(is.textContent?is.textContent+`
`:"")+i}window.appLog=ur;function As(){const i=Math.min(2,window.devicePixelRatio||1),t=qe.getBoundingClientRect();qe.width=Math.floor(t.width*i),qe.height=Math.floor(t.height*i),Xt&&Xt.resize(qe.width,qe.height,i),Et&&Et.resize(qe.width,qe.height,i)}window.addEventListener("resize",As);function Qa(){const i=document.getElementById("viewport"),t=document.getElementById("glcanvas");t&&i.removeChild(t);const e=document.createElement("canvas");e.id="glcanvas",e.style.position="absolute",e.style.inset="0",e.style.width="100%",e.style.height="100%",e.style.zIndex="1",i.insertBefore(e,document.getElementById("overlay")),qe=e}function Vp(){var s,a,o,l;Et==null||Et.dispose(),Et=null,Ja(),rn&&(rn.dispose(),rn=null),Qa();const i=document.getElementById("viewport");let t=document.getElementById("emergencyTest");t||(t=document.createElement("div"),t.id="emergencyTest",t.style.position="absolute",t.style.top="50px",t.style.left="50px",t.style.width="200px",t.style.height="100px",t.style.background="red",t.style.border="5px solid yellow",t.style.zIndex="9999",t.style.color="white",t.style.fontSize="20px",t.style.padding="10px",t.textContent="EMERGENCY TEST - 2D MODE ACTIVE",i.appendChild(t)),t.style.display="block",Xt=new cl(qe,ai,ur,c=>{const h=document.getElementById("fps");h&&(h.textContent=`${c.toFixed(0)} fps`)},c=>Gp(c)),Xt.start(),As(),Xt.addCircle(),(s=Xt.setTool)==null||s.call(Xt,"draw"),(a=Xt.resetView)==null||a.call(Xt);try{const c=document.querySelector("#overlayVis");c&&(c.value="dye"),(o=Xt.setOverlayMode)==null||o.call(Xt,"dye")}catch{}const e=document.querySelector("#draw"),n=document.querySelector("#select");e&&n&&(e.classList.add("active"),n.classList.remove("active")),(l=window.updateLegend)==null||l.call(window),dr("2d"),ur("Entered 2D mode");let r=document.getElementById("modeBadge");r||(r=document.createElement("div"),r.id="modeBadge",r.style.position="absolute",r.style.top="10px",r.style.left="10px",r.style.zIndex="99",r.style.background="#0b1220cc",r.style.border="1px solid #1f2a3a",r.style.borderRadius="8px",r.style.padding="4px 8px",r.style.color="#8da2b5",ai.appendChild(r)),r.textContent="2D MODE",document.dispatchEvent(new CustomEvent("fluidsim-2d-ready"))}function tl(){Xt==null||Xt.dispose(),Xt=null,Qa();const i=document.getElementById("emergencyTest");i&&(i.style.display="none"),Et=new Np(qe,r=>{const s=document.getElementById("fps");s&&(s.textContent=`${r.toFixed(0)} fps`)}),Et.start(),As(),dr("3d"),ur("Entered 3D mode");let t=document.getElementById("modeBadge");t||(t=document.createElement("div"),t.id="modeBadge",t.style.position="absolute",t.style.top="10px",t.style.left="10px",t.style.zIndex="99",t.style.background="#0b1220cc",t.style.border="1px solid #1f2a3a",t.style.borderRadius="8px",t.style.padding="4px 8px",t.style.color="#8da2b5",ai.appendChild(t)),t.textContent="3D MODE";const e=()=>{var s;if(!Et)return;const r=(s=Et.getSpherical)==null?void 0:s.call(Et);dr("3d",r),Mi=requestAnimationFrame(e)};Ja(),Mi=requestAnimationFrame(e),rn&&(rn.dispose(),rn=null),rn=new Fp(ai,r=>{var s;(s=Et.setView)==null||s.call(Et,r)},(r,s)=>{var a;(a=Et.orbitBy)==null||a.call(Et,r,s)});const n=()=>{var s;if(!Et||!rn)return;const r=(s=Et.getCameraQuat)==null?void 0:s.call(Et);r&&rn.setOrientation(r),requestAnimationFrame(n)};requestAnimationFrame(n)}function Gp(i){document.getElementById("re").textContent=i.Re.toFixed(0),document.getElementById("cd").textContent=i.Cd.toFixed(3),document.getElementById("cl").textContent=i.Cl.toFixed(3),document.getElementById("dp").textContent=i.dP.toFixed(2)}ll(zp,{onMode:i=>{i==="2d"?Vp():tl()},get2d:()=>Xt});const la=document.getElementById("saveScene");la&&la.addEventListener("click",()=>{const i=document.getElementById("overlay"),t=Array.from((i==null?void 0:i.querySelectorAll(".annotation"))||[]).map(o=>({type:o.classList.contains("label")?"label":o.classList.contains("arrow")?"arrow":"text",text:o.textContent,left:o.style.left,top:o.style.top,width:o.style.width,height:o.style.height}));let e=null;Xt&&Xt.saveScene&&(e=JSON.parse(Xt.saveScene()));const n=JSON.stringify({...e,annotations:t}),r=new Blob([n],{type:"application/json"}),s=URL.createObjectURL(r),a=document.createElement("a");a.href=s,a.download="fluidsim_scene.json",document.body.appendChild(a),a.click(),document.body.removeChild(a),setTimeout(()=>URL.revokeObjectURL(s),500)});const ca=document.getElementById("loadScene"),rs=document.getElementById("loadFile");ca&&rs&&(ca.addEventListener("click",()=>{rs.click()}),rs.addEventListener("change",i=>{const t=i.target.files[0];if(!t)return;const e=new FileReader;e.onload=()=>{const n=e.result;let r=null;try{r=JSON.parse(n)}catch{}Xt&&Xt.loadScene&&r&&r.obstacles&&Xt.loadScene(n);const s=document.getElementById("overlay");if(s&&Array.from(s.querySelectorAll(".annotation")).forEach(a=>a.remove()),r&&Array.isArray(r.annotations)&&s)for(const a of r.annotations){const o=document.createElement("div");o.className="annotation "+a.type,o.contentEditable=a.type!=="arrow"?"true":"false",o.style.position="absolute",o.style.left=a.left,o.style.top=a.top,o.style.width=a.width,o.style.height=a.height,o.style.color="#fff",o.style.background=a.type==="arrow"?"none":"rgba(20,30,50,0.7)",o.style.borderRadius="6px",o.style.padding=a.type==="arrow"?"0":"4px 10px",o.style.fontSize="18px",o.style.cursor="move",o.style.userSelect="text",o.style.zIndex="10",o.draggable=!0,a.type==="arrow"?(o.innerHTML='<svg width="60" height="24"><line x1="8" y1="12" x2="52" y2="12" stroke="#fff" stroke-width="3" marker-end="url(#arrowhead)"/><defs><marker id="arrowhead" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L8,4 L0,8 L2,4 Z" fill="#fff"/></marker></defs></svg>',o.contentEditable="false",o.style.pointerEvents="auto",o.style.background="none",o.style.padding="0"):o.textContent=a.text;let l=0,c=0;o.addEventListener("dragstart",h=>{l=h.offsetX,c=h.offsetY}),o.addEventListener("dragend",h=>{o.style.left=h.pageX-s.offsetLeft-l+"px",o.style.top=h.pageY-s.offsetTop-c+"px"}),o.addEventListener("dblclick",()=>o.remove()),s.appendChild(o),a.type!=="arrow"&&o.focus()}},e.readAsText(t)}));tl();
