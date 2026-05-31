/* PixelMap Pro — Rediseño v3
   Agregar al final del <body> en index.html:
   <script src="redesign.js"></script>
   NO modificar el index.html para nada más.
*/
(function () {
"use strict";

var styleEl = document.createElement('style');
styleEl.textContent = `
#sidebar { flex-direction:row !important; width:calc(58px + 300px) !important; min-width:calc(58px + 300px) !important; overflow:hidden !important; flex-shrink:0 !important; }
.sb-tabs { flex-direction:column !important; width:58px !important; min-width:58px !important; flex-shrink:0 !important; border-bottom:none !important; border-right:1px solid var(--b1) !important; overflow:hidden auto !important; scrollbar-width:none !important; padding:8px 0 !important; gap:2px !important; align-items:center !important; box-sizing:border-box !important; }
.sb-tabs::-webkit-scrollbar { display:none !important; }
.sb-tab { width:42px !important; min-width:42px !important; height:42px !important; min-height:42px !important; flex:none !important; border:none !important; border-left:2px solid transparent !important; border-radius:8px !important; padding:4px 2px !important; display:flex !important; flex-direction:column !important; align-items:center !important; justify-content:center !important; gap:3px !important; font-size:7px !important; cursor:pointer !important; transition:background .15s,color .15s,border-left-color .15s !important; white-space:nowrap !important; }
.sb-tab:hover { background:rgba(255,255,255,.05) !important; color:var(--txt2) !important; }
.sb-tab.active { background:rgba(0,212,255,.1) !important; color:var(--cyan) !important; border-left-color:var(--cyan) !important; border-radius:0 8px 8px 0 !important; }
.sb-tab svg { width:18px !important; height:18px !important; color:inherit !important; flex-shrink:0 !important; }
.sb-sep { width:26px; height:1px; background:var(--b1); margin:5px auto; flex-shrink:0; }
.sb-spacer { flex:1; min-height:4px; }
.sb-pane { display:none !important; width:300px !important; min-width:300px !important; max-width:300px !important; flex-shrink:0 !important; overflow:hidden auto !important; box-sizing:border-box !important; }
.sb-pane.active { display:flex !important; }
.topbar { position:relative !important; }
#rd-proj-badge { position:absolute; left:50%; transform:translateX(-50%); display:flex; align-items:center; gap:6px; background:var(--s2); border:1px solid var(--b1); border-radius:7px; padding:5px 13px; font-size:12px; color:var(--txt2); pointer-events:none; white-space:nowrap; z-index:1; }
#rd-proj-badge b { color:var(--txt); font-weight:500; }
#rd-stats-bar { display:flex; align-items:center; gap:7px; padding:0 14px; height:46px; flex-shrink:0; background:var(--s1); border-bottom:1px solid var(--b1); overflow-x:auto; scrollbar-width:none; }
#rd-stats-bar::-webkit-scrollbar { display:none; }
.rd-stat { display:flex; flex-direction:column; justify-content:center; padding:0 10px; height:34px; background:var(--s2); border:1px solid var(--b1); border-radius:7px; flex-shrink:0; }
.rd-stat-val { font-size:13px; font-weight:600; color:var(--txt); line-height:1; }
.rd-stat-val.cyan { color:var(--cyan) !important; }
.rd-stat-val.amber { color:var(--gold) !important; }
.rd-stat-val.green { color:var(--green) !important; }
.rd-stat-lbl { font-size:8px; color:var(--txt3); text-transform:uppercase; letter-spacing:.07em; margin-top:3px; }
.map-header { display:none !important; }
#infobar,.infobar { height:28px !important; flex-shrink:0 !important; background:var(--s1) !important; border-top:1px solid var(--b1) !important; font-size:10px !important; color:var(--txt3) !important; display:flex !important; align-items:center !important; padding:0 14px !important; gap:16px !important; }
#scr-tabs-bar { background:var(--s1) !important; border-bottom:1px solid var(--b1) !important; padding:6px 8px !important; }
.scr-tab { border-radius:7px !important; border:1px solid var(--b1) !important; background:var(--s2) !important; font-size:10px !important; padding:4px 9px !important; color:var(--txt2) !important; height:auto !important; }
.scr-tab.active { border-color:rgba(0,212,255,.4) !important; background:rgba(0,212,255,.08) !important; color:var(--cyan) !important; }
.stat-grid { display:grid !important; grid-template-columns:1fr 1fr !important; gap:6px !important; }
.stat { background:var(--s2) !important; border:1px solid var(--b1) !important; border-radius:7px !important; padding:8px 10px !important; }
.sv { font-size:15px !important; font-weight:600 !important; color:var(--cyan) !important; }
.sv.ok { color:var(--green) !important; } .sv.warn { color:var(--gold) !important; } .sv.err { color:var(--red) !important; }
.sl { font-size:8.5px !important; text-transform:uppercase !important; letter-spacing:.06em !important; color:var(--txt3) !important; margin-top:2px !important; }
#rd-shape-modal { display:none; position:fixed; inset:0; z-index:9900; background:var(--bg); flex-direction:column; }
#rd-shape-modal.open { display:flex; }
`;
document.head.appendChild(styleEl);

/* Íconos */
var TABS=[
  {id:'sbt-screens',lbl:'Pantallas',svg:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>'},
  {id:'sbt-cfg',lbl:'Config',svg:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>'},
  {id:'sbt-prj',lbl:'Proyecto',svg:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>'},
  {id:'sbt-pts',lbl:'Puertos',svg:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></svg>'},
  {id:'sbt-exp',lbl:'Exportar',svg:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>'},
  {id:'sbt-proc',lbl:'Proc.',svg:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>'},
  {id:'sbt-ai',lbl:'AI',svg:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>'},
  {id:'sbt-saves',lbl:'Guardados',svg:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>'},
  {id:'sbt-elec',lbl:'Elec.',svg:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9z"/></svg>'},
  {id:'sbt-colors',lbl:'Colores',svg:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="9" cy="9" r="1.5" fill="currentColor" stroke="none"/><circle cx="15" cy="9" r="1.5" fill="currentColor" stroke="none"/><circle cx="12" cy="15" r="1.5" fill="currentColor" stroke="none"/></svg>'},
  {id:'sbt-calc',lbl:'Calc',svg:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="10" y2="10"/><line x1="14" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="10" y2="14"/><line x1="14" y1="14" x2="16" y2="14"/><line x1="8" y1="18" x2="10" y2="18"/><line x1="14" y1="18" x2="16" y2="18"/></svg>'},
  {id:'sbt-soon',lbl:'Costos',svg:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v2M12 16v2M9.5 9.5a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 3.5M12 15h.01"/></svg>'},
];

function applyIcons(){
  TABS.forEach(function(t){var b=document.getElementById(t.id);if(b)b.innerHTML=t.svg+'<span style="font-size:6.5px;letter-spacing:.04em;text-transform:uppercase;line-height:1">'+t.lbl+'</span>';});
  if(!document.getElementById('rd-sbt-editor')){
    var soon=document.getElementById('sbt-soon');
    if(soon){var e=document.createElement('button');e.className='sb-tab';e.id='rd-sbt-editor';e.title='Editor de Forma';e.style.color='#f59e0b';e.onclick=rdOpenEditor;e.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg><span style="font-size:6.5px;letter-spacing:.04em;text-transform:uppercase;line-height:1">Forma</span>';soon.after(e);}
  }
}

function applySeparators(){
  document.querySelectorAll('.sb-sep,.sb-spacer').forEach(function(e){e.remove();});
  function s(){var d=document.createElement('div');d.className='sb-sep';return d;}
  function sp(){var d=document.createElement('div');d.className='sb-spacer';return d;}
  var ex=document.getElementById('sbt-exp');if(ex)ex.after(s());
  var sv=document.getElementById('sbt-saves');if(sv){sv.before(sp());sv.before(s());}
}

function applyBadge(){
  var prev=document.getElementById('rd-proj-badge');if(prev)prev.remove();
  var tb=document.querySelector('.topbar');if(!tb)return;
  var inp=document.getElementById('cf-prj-title')||document.getElementById('cf-prj-name');
  var name=inp?(inp.value||'Sin título'):'Mi proyecto';
  var b=document.createElement('div');b.id='rd-proj-badge';
  b.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg><b id="rd-proj-name">'+name+'</b><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';
  tb.appendChild(b);
  if(inp)inp.addEventListener('input',function(){var el=document.getElementById('rd-proj-name');if(el)el.textContent=inp.value||'Sin título';});
}

function buildStatsBar(){
  var prev=document.getElementById('rd-stats-bar');if(prev)prev.remove();
  var svEls=document.querySelectorAll('.sv');
  var pi=document.getElementById('cf-pitch');var pv=pi?(pi.value||'P?'):'P?';
  var pxi=document.querySelector('#cf-pxport,[id*="pxport"]');var pxv=pxi?pxi.value:(svEls[4]?svEls[4].textContent.trim():'—');
  var stats=[
    {val:svEls[0]?svEls[0].textContent.trim():'—',lbl:'Resolución',cls:'cyan'},
    {val:svEls[1]?svEls[1].textContent.trim():'—',lbl:'Paneles',cls:''},
    {val:svEls[2]?svEls[2].textContent.trim():'—',lbl:'Px / panel',cls:''},
    {val:svEls[3]?svEls[3].textContent.trim():'—',lbl:'Cables',cls:'green'},
    {val:pxv,lbl:'Px / puerto',cls:'amber'},
    {val:pv,lbl:'Pitch',cls:''},
  ];
  var bar=document.createElement('div');bar.id='rd-stats-bar';
  bar.innerHTML=stats.map(function(s){return'<div class="rd-stat"><span class="rd-stat-val '+s.cls+'">'+s.val+'</span><span class="rd-stat-lbl">'+s.lbl+'</span></div>';}).join('');
  var ma=document.querySelector('.map-area');var tb=ma?ma.querySelector('.toolbar'):document.querySelector('.toolbar');
  if(tb&&tb.parentElement)tb.parentElement.insertBefore(bar,tb);
}

function watchStats(){
  var t=document.querySelector('.stat-grid');if(!t)return;
  new MutationObserver(buildStatsBar).observe(t,{childList:true,subtree:true,characterData:true});
}

/* Panel Costos/M² */
function buildCostPanel(){
  var pane=document.getElementById('pane-soon');if(!pane)return;
  pane.innerHTML='<div style="width:100%;overflow-y:auto"><div style="padding:12px 14px;border-bottom:1px solid var(--b1)"><div style="font-size:9px;color:var(--txt3);text-transform:uppercase;letter-spacing:.8px;margin-bottom:10px;font-weight:700">Metros cuadrados</div><div id="rd-m2-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:10px"></div><div style="background:rgba(0,212,255,.06);border:1px solid rgba(0,212,255,.2);border-radius:8px;padding:9px 12px;display:flex;justify-content:space-between;align-items:center"><span style="font-size:9px;color:var(--txt3);text-transform:uppercase;letter-spacing:.5px">Total proyecto</span><span id="rd-m2-total" style="font-family:\'Syne\',sans-serif;font-size:16px;font-weight:800;color:var(--cyan)">0.00 m\xb2</span></div></div><div style="padding:12px 14px"><div style="font-size:9px;color:var(--txt3);text-transform:uppercase;letter-spacing:.8px;margin-bottom:10px;font-weight:700">Costos de Rental</div><div style="margin-bottom:8px"><label style="font-size:10px;color:var(--txt2);display:block;margin-bottom:4px">Precio / m\xb2 / d\xeda</label><div style="display:flex;gap:4px"><select id="rd-currency" onchange="rdCalcRental()" style="width:56px;padding:5px 4px;font-size:11px;flex-shrink:0"><option>USD</option><option>EUR</option><option>ARS</option><option>BRL</option><option>MXN</option><option>CLP</option></select><input type="number" id="rd-price-m2" value="15" min="0" step="0.5" style="width:100%;padding:5px 8px;font-size:12px" oninput="rdCalcRental()"></div></div><div style="margin-bottom:8px"><label style="font-size:10px;color:var(--txt2);display:block;margin-bottom:4px">D\xedas de evento</label><input type="number" id="rd-days" value="1" min="1" step="1" style="width:100%;padding:5px 8px;font-size:12px" oninput="rdCalcRental()"></div><div style="margin-bottom:12px"><label style="font-size:10px;color:var(--txt2);display:block;margin-bottom:4px">Markup (%)</label><input type="number" id="rd-markup" value="0" min="0" max="500" step="5" style="width:100%;padding:5px 8px;font-size:12px" oninput="rdCalcRental()"></div><div id="rd-breakdown" style="margin-bottom:8px"></div><div style="height:1px;background:var(--b1);margin:8px 0"></div><div style="display:flex;justify-content:space-between;margin-bottom:5px"><span style="font-size:9px;text-transform:uppercase;color:var(--txt3)">Subtotal</span><span id="rd-subtotal" style="font-size:13px;font-weight:700;color:var(--txt2)">0.00</span></div><div style="display:flex;justify-content:space-between;margin-bottom:5px"><span style="font-size:9px;text-transform:uppercase;color:var(--txt3)">Markup</span><span id="rd-markup-amt" style="font-size:13px;font-weight:700;color:var(--gold)">+0.00</span></div><div style="background:rgba(0,230,118,.08);border:1px solid rgba(0,230,118,.25);border-radius:8px;padding:10px 12px;display:flex;justify-content:space-between;align-items:center"><span style="font-size:9px;text-transform:uppercase;color:var(--green)">TOTAL</span><span id="rd-total" style="font-family:\'Syne\',sans-serif;font-size:18px;font-weight:900;color:var(--green)">0.00</span></div></div></div>';
}

window.rdGetM2Data=function(){
  if(typeof saveCurrentScreenState==='function')saveCurrentScreenState();
  if(typeof SCREENS==='undefined')return[];
  return SCREENS.map(function(sc){var w=parseFloat(sc.w)||0,h=parseFloat(sc.h)||0;return{name:sc.name||'Pantalla',w:w,h:h,m2:w*h,color:sc.color||'var(--cyan)'};});
};
window.rdRenderM2=function(){
  var screens=rdGetM2Data();
  var grid=document.getElementById('rd-m2-grid');var tot=document.getElementById('rd-m2-total');if(!grid||!tot)return;
  var total=0,html='';
  screens.forEach(function(sc){total+=sc.m2;html+='<div style="background:var(--s2);border:1px solid var(--b1);border-left:3px solid '+sc.color+';border-radius:7px;padding:8px 10px"><div style="font-size:13px;font-weight:700;color:'+sc.color+';line-height:1">'+sc.m2.toFixed(2)+' m\xb2</div><div style="font-size:8.5px;color:var(--txt3);margin-top:2px;text-transform:uppercase">'+(sc.name.length>12?sc.name.substring(0,12)+'\u2026':sc.name)+'</div><div style="font-size:8px;color:var(--txt3)">'+sc.w+'\xd7'+sc.h+' m</div></div>';});
  if(!html)html='<div style="grid-column:1/-1;text-align:center;color:var(--txt3);font-size:11px;padding:10px">Sin pantallas configuradas</div>';
  grid.innerHTML=html;tot.textContent=total.toFixed(2)+' m\xb2';rdCalcRental();
};
window.rdCalcRental=function(){
  var screens=rdGetM2Data();
  var price=parseFloat((document.getElementById('rd-price-m2')||{}).value)||0;
  var days=parseInt((document.getElementById('rd-days')||{}).value)||1;
  var markup=parseFloat((document.getElementById('rd-markup')||{}).value)||0;
  var currency=(document.getElementById('rd-currency')||{}).value||'USD';
  var bd=document.getElementById('rd-breakdown');if(!bd)return;
  var subtotal=0,html='';
  screens.forEach(function(sc){var cost=sc.m2*price*days;subtotal+=cost;html+='<div style="display:flex;justify-content:space-between;align-items:center;padding:5px 0;border-bottom:1px solid var(--b1)"><div><div style="font-size:11px;color:var(--txt)">'+(sc.name.length>14?sc.name.substring(0,14)+'\u2026':sc.name)+'</div><div style="font-size:9px;color:var(--txt3)">'+sc.m2.toFixed(2)+' m\xb2 \xd7 '+days+' d\xeda'+(days>1?'s':'')+'</div></div><div style="font-size:12px;font-weight:700;color:var(--txt);margin-left:8px">'+currency+' '+cost.toLocaleString('es-AR',{minimumFractionDigits:2,maximumFractionDigits:2})+'</div></div>';});
  if(!html)html='<div style="text-align:center;color:var(--txt3);font-size:11px;padding:8px">Sin pantallas</div>';
  var ma=subtotal*(markup/100),total=subtotal+ma;
  bd.innerHTML=html;
  var s=function(id,v){var e=document.getElementById(id);if(e)e.textContent=v;};
  s('rd-subtotal',currency+' '+subtotal.toLocaleString('es-AR',{minimumFractionDigits:2,maximumFractionDigits:2}));
  s('rd-markup-amt','+'+currency+' '+ma.toLocaleString('es-AR',{minimumFractionDigits:2,maximumFractionDigits:2}));
  s('rd-total',currency+' '+total.toLocaleString('es-AR',{minimumFractionDigits:2,maximumFractionDigits:2}));
};

var _origSbTab=window.sbTab;
window.sbTab=function(id){if(_origSbTab)_origSbTab(id);if(id==='soon')setTimeout(window.rdRenderM2,50);};

/* Editor de Forma */
var SE={CELL:42,PS:[1.5,1.9,2.0,2.5,3.0,3.9,4.0,4.8,5.0,6.0,8.0,10.0],cols:14,rows:10,cells:[],pitch:3.9,brush:1,active:false,last:null};

function rdBuildEditorModal(){
  if(document.getElementById('rd-shape-modal'))return;
  var m=document.createElement('div');m.id='rd-shape-modal';
  m.innerHTML='<div style="height:50px;display:flex;align-items:center;gap:8px;padding:0 14px;background:var(--s1);border-bottom:1px solid var(--b1);flex-shrink:0;overflow:hidden"><button onclick="rdCloseEditor()" style="background:none;border:1px solid var(--b1);border-radius:6px;color:var(--txt2);font-size:10px;padding:5px 10px;cursor:pointer;font-family:inherit;text-transform:uppercase;flex-shrink:0">\u2190 Volver</button><div style="font-family:\'Syne\',sans-serif;font-size:14px;font-weight:900;color:var(--txt)">Pixel<span style="color:var(--cyan)">Map</span> Pro <span style="font-size:9px;color:var(--gold);font-weight:400;font-family:\'JetBrains Mono\',monospace">\xb7 Editor de Forma</span></div><div style="width:1px;height:22px;background:var(--b1);flex-shrink:0"></div><span style="font-size:9px;color:var(--txt3);text-transform:uppercase;letter-spacing:.5px">Cols</span><input type="number" id="se-cols" value="14" min="4" max="50" style="width:50px;padding:5px 6px;font-size:11px" oninput="seApplySize()"><span style="font-size:9px;color:var(--txt3);text-transform:uppercase;letter-spacing:.5px">Filas</span><input type="number" id="se-rows" value="10" min="4" max="50" style="width:50px;padding:5px 6px;font-size:11px" oninput="seApplySize()"><div style="width:1px;height:22px;background:var(--b1);flex-shrink:0"></div><button onclick="seClearAll()" style="background:rgba(255,68,68,.08);border:1px solid rgba(255,68,68,.3);border-radius:8px;color:var(--red);font-size:10px;padding:6px 10px;cursor:pointer;font-family:inherit;text-transform:uppercase;flex-shrink:0">\u2715 Limpiar</button></div><div style="display:flex;flex:1;overflow:hidden"><div style="flex:1;overflow:auto;padding:18px;background:var(--bg)"><svg id="se-svg" style="display:block;user-select:none;touch-action:none;cursor:crosshair"></svg></div><div style="width:242px;flex-shrink:0;background:var(--s1);border-left:1px solid var(--b1);display:flex;flex-direction:column;overflow-y:auto"><div style="padding:12px 14px;border-bottom:1px solid var(--b1)"><div style="font-size:9px;color:var(--txt3);text-transform:uppercase;letter-spacing:.8px;margin-bottom:10px;font-weight:700">Pincel activo</div><div style="display:flex;gap:6px;margin-bottom:8px"><button id="se-br-a" onclick="seSetBrush(1)" style="flex:1;display:flex;flex-direction:column;align-items:center;gap:5px;padding:8px 4px;border-radius:8px;border:1px solid rgba(0,212,255,.5);background:rgba(0,212,255,.08);cursor:pointer;font-family:inherit"><div style="width:28px;height:28px;border-radius:5px;background:#00d4ff;opacity:.9"></div><span style="font-size:9px;font-weight:700;color:var(--cyan);text-transform:uppercase">Tipo A</span><span style="font-size:8px;color:var(--txt3)" id="se-lbl-a">50\xd7100 cm</span></button><button id="se-br-b" onclick="seSetBrush(2)" style="flex:1;display:flex;flex-direction:column;align-items:center;gap:5px;padding:8px 4px;border-radius:8px;border:1px solid var(--b1);background:var(--s2);cursor:pointer;font-family:inherit"><div style="width:28px;height:28px;border-radius:5px;background:var(--purple);opacity:.9"></div><span style="font-size:9px;font-weight:700;color:var(--purple);text-transform:uppercase">Tipo B</span><span style="font-size:8px;color:var(--txt3)" id="se-lbl-b">50\xd750 cm</span></button><button id="se-br-e" onclick="seSetBrush(0)" style="flex:1;display:flex;flex-direction:column;align-items:center;gap:5px;padding:8px 4px;border-radius:8px;border:1px solid var(--b1);background:var(--s2);cursor:pointer;font-family:inherit"><div style="width:28px;height:28px;border-radius:5px;border:1.5px dashed #3d4558;display:flex;align-items:center;justify-content:center;font-size:14px;color:var(--txt3)">\u2715</div><span style="font-size:9px;font-weight:700;color:var(--red);text-transform:uppercase">Borrar</span><span style="font-size:8px;color:var(--txt3)">vaciar</span></button></div><div style="font-size:9px;color:var(--txt3);line-height:1.6;padding:7px 9px;background:var(--s2);border-radius:6px;border:1px solid var(--b1)">Seleccion\xe1 el tipo y pint\xe1 con click o arrastre.</div></div><div style="padding:12px 14px;border-bottom:1px solid var(--b1)"><div style="font-size:9px;color:var(--txt3);text-transform:uppercase;letter-spacing:.8px;margin-bottom:9px;font-weight:700">Pitch</div><div id="se-pitch-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px;margin-bottom:9px"></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-top:7px"><div><label style="font-size:9px;color:var(--txt3);text-transform:uppercase;display:block;margin-bottom:3px">Ancho (cm)</label><input type="number" id="se-mw" value="50" min="10" max="200" step="5" style="width:100%" oninput="seRc()"></div><div><label style="font-size:9px;color:var(--txt3);text-transform:uppercase;display:block;margin-bottom:3px">Alto A (cm)</label><input type="number" id="se-mh" value="100" min="10" max="200" step="5" style="width:100%" oninput="seRc()"></div></div><div style="margin-top:7px"><label style="font-size:9px;color:var(--txt3);text-transform:uppercase;display:block;margin-bottom:3px">Alto B \u2014 auto</label><input id="se-mhb" style="width:100%;background:var(--s2);border:1px solid var(--b1);border-radius:8px;color:var(--txt2);font-family:inherit;font-size:11px;outline:none;padding:5px 7px" readonly></div></div><div style="padding:12px 14px;border-bottom:1px solid var(--b1)"><div style="font-size:9px;color:var(--txt3);text-transform:uppercase;letter-spacing:.8px;margin-bottom:9px;font-weight:700">M\xf3dulos</div><div style="display:flex;justify-content:space-between;margin-bottom:6px"><span style="font-size:10px;color:var(--txt2)">Tipo A</span><span style="font-size:13px;font-weight:700;color:var(--cyan)" id="se-cnt-a">0</span></div><div style="display:flex;justify-content:space-between;margin-bottom:6px"><span style="font-size:10px;color:var(--txt2)">Tipo B</span><span style="font-size:13px;font-weight:700;color:var(--purple)" id="se-cnt-b">0</span></div><div style="display:flex;justify-content:space-between;margin-bottom:6px"><span style="font-size:10px;color:var(--txt2)">Total</span><span style="font-size:13px;font-weight:700;color:var(--txt)" id="se-cnt-t">0</span></div><div style="background:rgba(0,212,255,.06);border:1px solid rgba(0,212,255,.2);border-radius:8px;padding:8px 11px;display:flex;justify-content:space-between;align-items:center;margin-top:8px"><span style="font-size:9px;color:var(--txt3);text-transform:uppercase">\xc1rea usada</span><span style="font-family:\'Syne\',sans-serif;font-size:15px;font-weight:900;color:var(--cyan)" id="se-m2">0.00 m\xb2</span></div></div><div style="padding:12px 14px;border-bottom:1px solid var(--b1)"><div style="font-size:9px;color:var(--txt3);text-transform:uppercase;letter-spacing:.8px;margin-bottom:9px;font-weight:700">Resoluci\xf3n bbox</div><div style="display:flex;justify-content:space-between;margin-bottom:5px"><span style="font-size:10px;color:var(--txt2)">Cols \xd7 Filas</span><span style="font-size:12px;font-weight:700;color:var(--txt)" id="se-bb-sz">\u2014</span></div><div style="display:flex;justify-content:space-between;margin-bottom:5px"><span style="font-size:10px;color:var(--txt2)">Ancho</span><span style="font-size:12px;font-weight:700;color:var(--txt)" id="se-bb-w">\u2014</span></div><div style="display:flex;justify-content:space-between;margin-bottom:5px"><span style="font-size:10px;color:var(--txt2)">Alto</span><span style="font-size:12px;font-weight:700;color:var(--txt)" id="se-bb-h">\u2014</span></div><div style="display:flex;justify-content:space-between;margin-bottom:5px"><span style="font-size:10px;color:var(--txt2)">Resoluci\xf3n</span><span style="font-size:12px;font-weight:700;color:var(--green)" id="se-bb-r">\u2014</span></div><div style="display:flex;justify-content:space-between"><span style="font-size:10px;color:var(--txt2)">M\xb2 bbox</span><span style="font-size:12px;font-weight:700;color:var(--gold)" id="se-bb-m2">0.00 m\xb2</span></div></div><div style="padding:12px 14px;flex:1"><div style="font-size:9px;color:var(--txt3);text-transform:uppercase;letter-spacing:.8px;margin-bottom:9px;font-weight:700">Aplicar</div><button onclick="seApplyToProject()" style="width:100%;padding:10px;background:rgba(0,212,255,.1);border:1px solid rgba(0,212,255,.35);border-radius:8px;color:var(--cyan);font-size:10px;font-weight:700;cursor:pointer;font-family:inherit;text-transform:uppercase;margin-bottom:6px">\u26a1 Aplicar a pantalla activa</button><p style="font-size:9px;color:var(--txt3);line-height:1.6">Transfiere ancho, alto y pitch del bbox a la pantalla activa.</p></div></div></div>';
  document.body.appendChild(m);seBindEvents();
}

window.rdOpenEditor=function(){rdBuildEditorModal();seInitCells();seBuildPG();seUpdateHB();seSetBrush(1);seRc();document.getElementById('rd-shape-modal').classList.add('open');};
window.rdCloseEditor=function(){var m=document.getElementById('rd-shape-modal');if(m)m.classList.remove('open');};

function seInitCells(){SE.cells=[];for(var r=0;r<SE.rows;r++){SE.cells.push([]);for(var c=0;c<SE.cols;c++)SE.cells[r].push(0);}}
window.seApplySize=function(){SE.cols=Math.max(4,Math.min(50,parseInt(document.getElementById('se-cols').value)||14));SE.rows=Math.max(4,Math.min(50,parseInt(document.getElementById('se-rows').value)||10));seInitCells();seRc();};
window.seClearAll=function(){seInitCells();seRc();};

window.seSetBrush=function(v){
  SE.brush=v;
  var st=['border:1px solid rgba(0,212,255,.5);background:rgba(0,212,255,.08)','border:1px solid rgba(176,133,245,.5);background:rgba(176,133,245,.08)','border:1px solid rgba(255,68,68,.4);background:rgba(255,68,68,.06)'];
  var def='border:1px solid var(--b1);background:var(--s2)';
  [['se-br-a',0],['se-br-b',1],['se-br-e',2]].forEach(function(x){var b=document.getElementById(x[0]);if(b)b.style.cssText='flex:1;display:flex;flex-direction:column;align-items:center;gap:5px;padding:8px 4px;border-radius:8px;cursor:pointer;font-family:inherit;'+(v-0===[1,2,0][x[1]]?st[x[1]]:def);});
  var svg=document.getElementById('se-svg');if(svg)svg.style.cursor=v===0?'cell':'crosshair';
};

function seBuildPG(){var g=document.getElementById('se-pitch-grid');if(!g)return;g.innerHTML=SE.PS.map(function(p){var s=p===SE.pitch;return'<button onclick="seSetPitch('+p+')" style="background:'+(s?'rgba(0,212,255,.1)':'var(--s2)')+';border:1px solid '+(s?'var(--cyan)':'var(--b1)')+';border-radius:6px;padding:5px 2px;cursor:pointer;text-align:center;font-size:10px;color:'+(s?'var(--cyan)':'var(--txt2)')+';font-family:inherit">P'+p+'</button>';}).join('');}
window.seSetPitch=function(p){SE.pitch=p;seBuildPG();seRc();};

function seUpdateHB(){var mh=parseFloat((document.getElementById('se-mh')||{}).value)||100;var mw=parseFloat((document.getElementById('se-mw')||{}).value)||50;var hb=document.getElementById('se-mhb');if(hb)hb.value=(mh/2)+' cm';var la=document.getElementById('se-lbl-a');if(la)la.textContent=mw+'\xd7'+mh+' cm';var lb=document.getElementById('se-lbl-b');if(lb)lb.textContent=mw+'\xd7'+(mh/2)+' cm';}

function seGetBB(){var r1=SE.rows,r2=-1,c1=SE.cols,c2=-1,any=false;for(var r=0;r<SE.rows;r++)for(var c=0;c<SE.cols;c++)if(SE.cells[r][c]>0){any=true;if(r<r1)r1=r;if(r>r2)r2=r;if(c<c1)c1=c;if(c>c2)c2=c;}return any?{r1:r1,r2:r2,c1:c1,c2:c2,rows:r2-r1+1,cols:c2-c1+1}:null;}

window.seRc=function(){
  seUpdateHB();
  var mw=parseFloat((document.getElementById('se-mw')||{}).value)||50;var mhA=parseFloat((document.getElementById('se-mh')||{}).value)||100;var mhB=mhA/2;
  var mpw=Math.round((mw*10)/SE.pitch);var mphA=Math.round((mhA*10)/SE.pitch);
  var cntA=0,cntB=0,m2=0;
  for(var r=0;r<SE.rows;r++)for(var c=0;c<SE.cols;c++){if(SE.cells[r][c]===1){cntA++;m2+=(mw/100)*(mhA/100);}else if(SE.cells[r][c]===2){cntB++;m2+=(mw/100)*(mhB/100);}}
  var s=function(id,v){var e=document.getElementById(id);if(e)e.textContent=v;};
  s('se-cnt-a',cntA);s('se-cnt-b',cntB);s('se-cnt-t',cntA+cntB);s('se-m2',m2.toFixed(2)+' m\xb2');
  var bb=seGetBB();
  if(bb){s('se-bb-sz',bb.cols+'\xd7'+bb.rows);s('se-bb-w',(bb.cols*(mw/100)).toFixed(2)+' m');s('se-bb-h',(bb.rows*(mhA/100)).toFixed(2)+' m');s('se-bb-r',(bb.cols*mpw)+'\xd7'+(bb.rows*mphA));s('se-bb-m2',((bb.cols*(mw/100))*(bb.rows*(mhA/100))).toFixed(2)+' m\xb2');}
  else{['se-bb-sz','se-bb-w','se-bb-h','se-bb-r'].forEach(function(id){s(id,'\u2014');});s('se-bb-m2','0.00 m\xb2');}
  seRender();
};

function seRender(){
  var svg=document.getElementById('se-svg');if(!svg)return;
  var C=SE.CELL,W=SE.cols*C,H=SE.rows*C;
  svg.setAttribute('width',W);svg.setAttribute('height',H);svg.setAttribute('viewBox','0 0 '+W+' '+H);
  var bb=seGetBB(),p=[],nA=0,nB=0;
  p.push('<rect width="'+W+'" height="'+H+'" fill="#07080b"/>');
  if(bb)p.push('<rect x="'+(bb.c1*C)+'" y="'+(bb.r1*C)+'" width="'+(bb.cols*C)+'" height="'+(bb.rows*C)+'" fill="#0d2035" stroke="#1a4a6a" stroke-width="1.5" stroke-dasharray="5 3" rx="2"/>');
  for(var r=0;r<SE.rows;r++)for(var c=0;c<SE.cols;c++){
    var x=c*C,y=r*C,v=SE.cells[r][c];
    if(v===0){p.push('<rect x="'+x+'" y="'+y+'" width="'+C+'" height="'+C+'" fill="#0a1420" stroke="#232838" stroke-width=".5"/>');}
    else if(v===1){nA++;p.push('<rect x="'+(x+1.5)+'" y="'+(y+1.5)+'" width="'+(C-3)+'" height="'+(C-3)+'" fill="#00d4ff" opacity=".88" rx="4"/>');p.push('<text x="'+(x+C/2)+'" y="'+(y+C/2-2)+'" text-anchor="middle" font-size="10" font-weight="700" fill="#001a26" font-family="monospace">A'+nA+'</text>');p.push('<text x="'+(x+C/2)+'" y="'+(y+C/2+9)+'" text-anchor="middle" font-size="8" fill="rgba(0,26,38,.65)" font-family="monospace">A</text>');}
    else if(v===2){nB++;p.push('<rect x="'+(x+1.5)+'" y="'+(y+1.5)+'" width="'+(C-3)+'" height="'+(C-3)+'" fill="#b085f5" opacity=".88" rx="4"/>');p.push('<line x1="'+(x+5)+'" y1="'+(y+C/2)+'" x2="'+(x+C-5)+'" y2="'+(y+C/2)+'" stroke="rgba(0,0,0,.2)" stroke-width="1" stroke-dasharray="3 2"/>');p.push('<text x="'+(x+C/2)+'" y="'+(y+C/2-2)+'" text-anchor="middle" font-size="10" font-weight="700" fill="#1a0030" font-family="monospace">B'+nB+'</text>');p.push('<text x="'+(x+C/2)+'" y="'+(y+C/2+9)+'" text-anchor="middle" font-size="8" fill="rgba(26,0,48,.65)" font-family="monospace">B</text>');}
  }
  p.push('<rect width="'+W+'" height="'+H+'" fill="none" stroke="#232838" stroke-width=".5"/>');
  svg.innerHTML=p.join('');
}

function seCellFrom(e){var svg=document.getElementById('se-svg');if(!svg)return null;var rect=svg.getBoundingClientRect();var sx=(SE.cols*SE.CELL)/rect.width,sy=(SE.rows*SE.CELL)/rect.height;var x=(e.clientX-rect.left)*sx,y=(e.clientY-rect.top)*sy;var c=Math.floor(x/SE.CELL),r=Math.floor(y/SE.CELL);return(r>=0&&r<SE.rows&&c>=0&&c<SE.cols)?{r:r,c:c}:null;}
function sePaint(cell){if(!cell)return;SE.cells[cell.r][cell.c]=SE.brush;window.seRc();}

function seBindEvents(){
  document.addEventListener('mousedown',function(e){if(!e.target.closest('#se-svg'))return;e.preventDefault();SE.active=true;var cell=seCellFrom(e);SE.last=cell;sePaint(cell);});
  document.addEventListener('mousemove',function(e){if(!SE.active)return;var cell=seCellFrom(e);if(cell&&(!SE.last||cell.r!==SE.last.r||cell.c!==SE.last.c)){SE.last=cell;sePaint(cell);}});
  document.addEventListener('mouseup',function(){SE.active=false;SE.last=null;});
  document.addEventListener('touchstart',function(e){if(!e.target.closest('#se-svg'))return;e.preventDefault();SE.active=true;var cell=seCellFrom(e.touches[0]);SE.last=cell;sePaint(cell);},{passive:false});
  document.addEventListener('touchmove',function(e){if(!SE.active)return;e.preventDefault();var cell=seCellFrom(e.touches[0]);if(cell&&(!SE.last||cell.r!==SE.last.r||cell.c!==SE.last.c)){SE.last=cell;sePaint(cell);}},{passive:false});
  document.addEventListener('touchend',function(){SE.active=false;SE.last=null;});
}

window.seApplyToProject=function(){
  var mw=parseFloat((document.getElementById('se-mw')||{}).value)||50;
  var mhA=parseFloat((document.getElementById('se-mh')||{}).value)||100;
  var bb=seGetBB();if(!bb){alert('Dibuaj\xe1 al menos un m\xf3dulo primero.');return;}
  var W=(bb.cols*(mw/100)).toFixed(2),H=(bb.rows*(mhA/100)).toFixed(2);
  var fields={'cf-w':W,'cf-h':H,'cf-mw':mw,'cf-mh':mhA,'cf-pitch':SE.pitch};
  Object.keys(fields).forEach(function(id){var el=document.getElementById(id);if(el){el.value=fields[id];el.dispatchEvent(new Event('input'));}});
  if(typeof compute==='function')compute();if(typeof markUnsaved==='function')markUnsaved();
  window.rdCloseEditor();if(typeof sbTab==='function')sbTab('cfg');
};

/* Init */
function run(){applyIcons();applySeparators();applyBadge();buildStatsBar();watchStats();buildCostPanel();}
function init(){
  var app=document.getElementById('s-app');
  if(app&&app.classList.contains('active')){setTimeout(run,150);return;}
  new MutationObserver(function(_,obs){var a=document.getElementById('s-app');if(a&&a.classList.contains('active')){obs.disconnect();setTimeout(run,150);}}).observe(document.body,{attributes:true,subtree:true,attributeFilter:['class']});
}
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init):init();

})();
