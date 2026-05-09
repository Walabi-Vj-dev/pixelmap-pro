/* PixelMap Pro — Rediseño v2
   Un solo archivo. Agregar al final del <body> en index.html:
   <script src="redesign.js"></script>
   No tocar nada más. ¡Listo!
*/
(function () {
"use strict";

/* ── CSS ─────────────────────────────────────────────────────── */
var styleEl = document.createElement('style');
styleEl.textContent = `
#sidebar {
  flex-direction:row !important;
  width:calc(58px + 300px) !important;
  min-width:calc(58px + 300px) !important;
  overflow:hidden !important;
  flex-shrink:0 !important;
}
.sb-tabs {
  flex-direction:column !important;
  width:58px !important;
  min-width:58px !important;
  flex-shrink:0 !important;
  border-bottom:none !important;
  border-right:1px solid var(--b1) !important;
  overflow:hidden auto !important;
  scrollbar-width:none !important;
  padding:8px 0 !important;
  gap:2px !important;
  align-items:center !important;
  box-sizing:border-box !important;
}
.sb-tabs::-webkit-scrollbar { display:none !important; }
.sb-tab {
  width:42px !important; min-width:42px !important;
  height:42px !important; min-height:42px !important;
  flex:none !important;
  border:none !important;
  border-left:2px solid transparent !important;
  border-radius:8px !important;
  padding:4px 2px !important;
  display:flex !important;
  flex-direction:column !important;
  align-items:center !important;
  justify-content:center !important;
  gap:3px !important;
  font-size:7px !important;
  cursor:pointer !important;
  transition:background .15s,color .15s,border-left-color .15s !important;
  white-space:nowrap !important;
}
.sb-tab:hover { background:rgba(255,255,255,.05) !important; color:var(--txt2) !important; }
.sb-tab.active {
  background:rgba(0,212,255,.1) !important;
  color:var(--cyan) !important;
  border-left-color:var(--cyan) !important;
  border-radius:0 8px 8px 0 !important;
}
.sb-tab svg { width:18px !important; height:18px !important; color:inherit !important; flex-shrink:0 !important; }
.sb-sep { width:26px; height:1px; background:var(--b1); margin:5px auto; flex-shrink:0; }
.sb-spacer { flex:1; min-height:4px; }
.sb-pane {
  display:none !important;
  width:300px !important; min-width:300px !important; max-width:300px !important;
  flex-shrink:0 !important; overflow:hidden auto !important; box-sizing:border-box !important;
}
.sb-pane.active { display:flex !important; }

.topbar { position:relative !important; }
#rd-proj-badge {
  position:absolute; left:50%; transform:translateX(-50%);
  display:flex; align-items:center; gap:6px;
  background:var(--s2); border:1px solid var(--b1); border-radius:7px;
  padding:5px 13px; font-size:12px; color:var(--txt2);
  pointer-events:none; white-space:nowrap; z-index:1;
}
#rd-proj-badge b { color:var(--txt); font-weight:500; }

#rd-stats-bar {
  display:flex; align-items:center; gap:7px;
  padding:0 14px; height:46px; flex-shrink:0;
  background:var(--s1); border-bottom:1px solid var(--b1);
  overflow-x:auto; scrollbar-width:none;
}
#rd-stats-bar::-webkit-scrollbar { display:none; }
.rd-stat {
  display:flex; flex-direction:column; justify-content:center;
  padding:0 10px; height:34px;
  background:var(--s2); border:1px solid var(--b1); border-radius:7px; flex-shrink:0;
}
.rd-stat-val { font-size:13px; font-weight:600; color:var(--txt); line-height:1; }
.rd-stat-val.cyan  { color:var(--cyan) !important; }
.rd-stat-val.amber { color:var(--gold) !important; }
.rd-stat-val.green { color:var(--green) !important; }
.rd-stat-lbl { font-size:8px; color:var(--txt3); text-transform:uppercase; letter-spacing:.07em; margin-top:3px; }

.map-header { display:none !important; }

#infobar, .infobar {
  height:28px !important; flex-shrink:0 !important;
  background:var(--s1) !important; border-top:1px solid var(--b1) !important;
  font-size:10px !important; color:var(--txt3) !important;
  display:flex !important; align-items:center !important;
  padding:0 14px !important; gap:16px !important;
}
#scr-tabs-bar { background:var(--s1) !important; border-bottom:1px solid var(--b1) !important; padding:6px 8px !important; }
.scr-tab {
  border-radius:7px !important; border:1px solid var(--b1) !important;
  background:var(--s2) !important; font-size:10px !important;
  padding:4px 9px !important; color:var(--txt2) !important; height:auto !important;
}
.scr-tab.active {
  border-color:rgba(0,212,255,.4) !important;
  background:rgba(0,212,255,.08) !important; color:var(--cyan) !important;
}
.stat-grid { display:grid !important; grid-template-columns:1fr 1fr !important; gap:6px !important; }
.stat { background:var(--s2) !important; border:1px solid var(--b1) !important; border-radius:7px !important; padding:8px 10px !important; }
.sv { font-size:15px !important; font-weight:600 !important; color:var(--cyan) !important; }
.sv.ok   { color:var(--green) !important; }
.sv.warn { color:var(--gold) !important; }
.sv.err  { color:var(--red) !important; }
.sl { font-size:8.5px !important; text-transform:uppercase !important; letter-spacing:.06em !important; color:var(--txt3) !important; margin-top:2px !important; }


`;
document.head.appendChild(styleEl);

/* ── Íconos ──────────────────────────────────────────────────── */
var TABS = [
  {id:'sbt-screens',lbl:'Pantallas',svg:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>'},
  {id:'sbt-cfg',    lbl:'Config',   svg:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>'},
  {id:'sbt-prj',    lbl:'Proyecto', svg:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>'},
  {id:'sbt-pts',    lbl:'Puertos',  svg:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></svg>'},
  {id:'sbt-exp',    lbl:'Exportar', svg:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>'},
  {id:'sbt-proc',   lbl:'Proc.',    svg:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>'},
  {id:'sbt-ai',     lbl:'AI',       svg:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>'},
  {id:'sbt-saves',  lbl:'Guardados',svg:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>'},
  {id:'sbt-elec',   lbl:'Elec.',    svg:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9z"/></svg>'},
  {id:'sbt-colors', lbl:'Colores',  svg:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="9" cy="9" r="1.5" fill="currentColor" stroke="none"/><circle cx="15" cy="9" r="1.5" fill="currentColor" stroke="none"/><circle cx="12" cy="15" r="1.5" fill="currentColor" stroke="none"/></svg>'},
  {id:'sbt-calc',   lbl:'Calc',     svg:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="10" y2="10"/><line x1="14" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="10" y2="14"/><line x1="14" y1="14" x2="16" y2="14"/><line x1="8" y1="18" x2="10" y2="18"/><line x1="14" y1="18" x2="16" y2="18"/></svg>'},
  {id:'sbt-soon',   lbl:'Próx.',    svg:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'},
];

function applyIcons() {
  TABS.forEach(function(t) {
    var b = document.getElementById(t.id);
    if (b) b.innerHTML = t.svg + '<span style="font-size:6.5px;letter-spacing:.04em;text-transform:uppercase;line-height:1">' + t.lbl + '</span>';
  });
}

function applySeparators() {
  document.querySelectorAll('.sb-sep,.sb-spacer').forEach(function(e){ e.remove(); });
  function sep()    { var d=document.createElement('div'); d.className='sb-sep'; return d; }
  function spacer() { var d=document.createElement('div'); d.className='sb-spacer'; return d; }
  var exp = document.getElementById('sbt-exp');
  if (exp) exp.after(sep());
  var saves = document.getElementById('sbt-saves');
  if (saves) { saves.before(spacer()); saves.before(sep()); }
}

function applyBadge() {
  var prev = document.getElementById('rd-proj-badge');
  if (prev) prev.remove();
  var topbar = document.querySelector('.topbar');
  if (!topbar) return;
  var inp = document.getElementById('cf-prj-title') || document.getElementById('cf-prj-name');
  var name = inp ? (inp.value || 'Sin título') : 'Mi proyecto';
  var badge = document.createElement('div');
  badge.id = 'rd-proj-badge';
  badge.innerHTML =
    '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>' +
    '<b id="rd-proj-name">' + name + '</b>' +
    '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';
  topbar.appendChild(badge);
  if (inp) inp.addEventListener('input', function() {
    var el = document.getElementById('rd-proj-name');
    if (el) el.textContent = inp.value || 'Sin título';
  });
}

function buildStatsBar() {
  var prev = document.getElementById('rd-stats-bar');
  if (prev) prev.remove();

  var svEls = document.querySelectorAll('.sv');
  var pitchInp = document.getElementById('cf-pitch');
  var pitchVal = pitchInp ? (pitchInp.value || 'P?') : 'P?';
  var pxPortInp = document.querySelector('#cf-pxport, [id*="pxport"]');
  var pxPortVal = pxPortInp ? pxPortInp.value : (svEls[4] ? svEls[4].textContent.trim() : '—');

  var stats = [
    { val: svEls[0] ? svEls[0].textContent.trim() : '—', lbl:'Resolución',  cls:'cyan'  },
    { val: svEls[1] ? svEls[1].textContent.trim() : '—', lbl:'Paneles',     cls:''      },
    { val: svEls[2] ? svEls[2].textContent.trim() : '—', lbl:'Px / panel',  cls:''      },
    { val: svEls[3] ? svEls[3].textContent.trim() : '—', lbl:'Cables',      cls:'green' },
    { val: pxPortVal,                                     lbl:'Px / puerto', cls:'amber' },
    { val: pitchVal,                                      lbl:'Pitch',       cls:''      },
  ];

  var bar = document.createElement('div');
  bar.id = 'rd-stats-bar';
  bar.innerHTML = stats.map(function(s) {
    return '<div class="rd-stat"><span class="rd-stat-val ' + s.cls + '">' + s.val +
           '</span><span class="rd-stat-lbl">' + s.lbl + '</span></div>';
  }).join('');

  // Insertar en .map-area antes del .toolbar
  var mapArea = document.querySelector('.map-area');
  var toolbar = mapArea ? mapArea.querySelector('.toolbar') : document.querySelector('.toolbar');
  if (toolbar && toolbar.parentElement) {
    toolbar.parentElement.insertBefore(bar, toolbar);
  }
}

function watchStats() {
  var target = document.querySelector('.stat-grid');
  if (!target) return;
  new MutationObserver(buildStatsBar).observe(target, { childList:true, subtree:true, characterData:true });
}

/* ── Init ────────────────────────────────────────────────────── */
function run() {
  applyIcons();
  applySeparators();
  applyBadge();
  buildStatsBar();
  watchStats();
}

function init() {
  var app = document.getElementById('s-app');
  if (app && app.classList.contains('active')) {
    setTimeout(run, 150);
    return;
  }
  new MutationObserver(function(_, obs) {
    var a = document.getElementById('s-app');
    if (a && a.classList.contains('active')) {
      obs.disconnect();
      setTimeout(run, 150);
    }
  }).observe(document.body, { attributes:true, subtree:true, attributeFilter:['class'] });
}

document.readyState === 'loading'
  ? document.addEventListener('DOMContentLoaded', init)
  : init();

})();
