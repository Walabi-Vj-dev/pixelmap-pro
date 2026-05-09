/* =============================================================
   PixelMap Pro — Rediseño de interfaz
   Archivo: redesign.js
   Instrucciones: agregar este <script> al final del <body>,
   DESPUÉS de todos los scripts existentes:
   <script src="redesign.js"></script>
   ============================================================= */

(function () {
  "use strict";

  /* ── 1. Íconos SVG para cada tab del sidebar ─────────────────
     Reemplaza los emojis/texto por SVG + etiqueta legible.
     La función sbTab() original sigue funcionando igual porque
     no tocamos los id ni el onclick de los botones.
  ──────────────────────────────────────────────────────────── */
  var TAB_CONFIG = [
    {
      id: "sbt-screens",
      label: "Pantallas",
      svg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>',
    },
    {
      id: "sbt-cfg",
      label: "Config",
      svg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
    },
    {
      id: "sbt-prj",
      label: "Proyecto",
      svg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>',
    },
    {
      id: "sbt-pts",
      label: "Puertos",
      svg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></svg>',
    },
    {
      id: "sbt-exp",
      label: "Exportar",
      svg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
    },
    {
      id: "sbt-proc",
      label: "Proc.",
      svg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    },
    {
      id: "sbt-ai",
      label: "AI",
      svg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>',
    },
    {
      id: "sbt-saves",
      label: "Guardados",
      svg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>',
    },
    {
      id: "sbt-elec",
      label: "Elec.",
      svg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9z"/></svg>',
    },
    {
      id: "sbt-colors",
      label: "Colores",
      svg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="9" cy="9" r="1.5" fill="currentColor" stroke="none"/><circle cx="15" cy="9" r="1.5" fill="currentColor" stroke="none"/><circle cx="12" cy="15" r="1.5" fill="currentColor" stroke="none"/></svg>',
    },
    {
      id: "sbt-calc",
      label: "Calc",
      svg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="10" y2="10"/><line x1="14" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="10" y2="14"/><line x1="14" y1="14" x2="16" y2="14"/><line x1="8" y1="18" x2="10" y2="18"/><line x1="14" y1="18" x2="16" y2="18"/></svg>',
    },
    {
      id: "sbt-soon",
      label: "Próx.",
      svg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    },
  ];

  function applyIcons() {
    TAB_CONFIG.forEach(function (cfg) {
      var btn = document.getElementById(cfg.id);
      if (!btn) return;
      btn.innerHTML =
        cfg.svg +
        '<span style="font-size:6.5px;letter-spacing:0.04em;text-transform:uppercase;line-height:1">' +
        cfg.label +
        "</span>";
    });
  }

  /* ── 2. Separadores entre grupos de tabs ─────────────────────
     Grupo A: Pantallas, Config, Proyecto, Puertos, Exportar
     Grupo B: Proc., AI  (herramientas técnicas)
     Grupo C: Guardados, Elec., Colores, Calc, Próx.
  ──────────────────────────────────────────────────────────── */
  function applySeparators() {
    // Limpiar separadores previos por si se llama más de una vez
    document.querySelectorAll(".sb-sep, .sb-spacer").forEach(function (el) {
      el.remove();
    });

    function mkSep() {
      var d = document.createElement("div");
      d.className = "sb-sep";
      return d;
    }
    function mkSpacer() {
      var d = document.createElement("div");
      d.className = "sb-spacer";
      return d;
    }

    // Sep después de Exportar (sbt-exp)
    var expBtn = document.getElementById("sbt-exp");
    if (expBtn) expBtn.after(mkSep());

    // Spacer + sep antes de Guardados (sbt-saves) → los últimos al fondo
    var savesBtn = document.getElementById("sbt-saves");
    if (savesBtn) {
      savesBtn.before(mkSep());
      savesBtn.before(mkSpacer());
    }
  }

  /* ── 3. Badge de nombre de proyecto en el centro del topbar ──
     Lee el nombre del proyecto del input #cf-prj-name (si existe)
     o usa el título del proyecto actual.
  ──────────────────────────────────────────────────────────── */
  function applyProjectBadge() {
    // Eliminar badge anterior si existe
    var prev = document.getElementById("rd-proj-badge");
    if (prev) prev.remove();

    var topbar = document.querySelector(".topbar");
    if (!topbar) return;

    // Intentar leer nombre del proyecto
    var nameInput = document.getElementById("cf-prj-title") || document.getElementById("cf-prj-name");
    var projectName = nameInput ? (nameInput.value || "Sin título") : "Mi proyecto";

    var badge = document.createElement("div");
    badge.id = "rd-proj-badge";
    badge.innerHTML =
      '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>' +
      '<b id="rd-proj-name">' + projectName + "</b>" +
      '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';
    topbar.appendChild(badge);

    // Sincronizar badge con cambios en el input del proyecto
    if (nameInput) {
      nameInput.addEventListener("input", function () {
        var nameEl = document.getElementById("rd-proj-name");
        if (nameEl) nameEl.textContent = nameInput.value || "Sin título";
      });
    }
  }

  /* ── 4. Barra de estadísticas sobre el canvas ────────────────
     Los valores se leen dinámicamente de los elementos del DOM.
     La función updateStats() se llama al inicio y puede
     conectarse a cualquier evento de cambio de la app.
  ──────────────────────────────────────────────────────────── */
  function getStatValue(id, fallback) {
    var el = document.getElementById(id);
    if (!el) return fallback;
    return (el.textContent || el.value || fallback).trim();
  }

  function buildStatsBar() {
    // Eliminar barra anterior si existe
    var prev = document.getElementById("rd-stats-bar");
    if (prev) prev.remove();

    var bar = document.createElement("div");
    bar.id = "rd-stats-bar";

    // Definición de stats — ajustar los IDs según el DOM real de la app
    var STATS = [
      { id: "stat-res",     fallback: "—",     label: "Resolución", cls: "cyan"  },
      { id: "stat-panels",  fallback: "—",     label: "Paneles",    cls: ""      },
      { id: "stat-pxpanel", fallback: "—",     label: "Px / panel", cls: ""      },
      { id: "stat-pxport",  fallback: "—",     label: "Px / puerto",cls: "amber" },
      { id: "stat-cables",  fallback: "—",     label: "Cables",     cls: "green" },
      { id: "cf-pitch",     fallback: "P3.9",  label: "Pitch",      cls: ""      },
    ];

    // Leer resolución y paneles desde el área de estadísticas existente
    var svEls = document.querySelectorAll(".sv");
    var slEls = document.querySelectorAll(".sl");
    var dynamicStats = [];
    svEls.forEach(function (sv, i) {
      var lbl = slEls[i] ? slEls[i].textContent.trim() : "";
      var val = sv.textContent.trim();
      if (val && lbl) dynamicStats.push({ val: val, lbl: lbl });
    });

    // Si hay stats dinámicos del panel, usarlos; si no, los fallbacks
    var statsToRender = dynamicStats.length > 0
      ? dynamicStats.slice(0, 6)
      : [
          { val: "—", lbl: "Resolución"  },
          { val: "—", lbl: "Paneles"     },
          { val: "—", lbl: "Px / panel"  },
          { val: "—", lbl: "Px / puerto" },
          { val: "—", lbl: "Cables"      },
          { val: "—", lbl: "Pitch"       },
        ];

    // Colores semánticos por posición
    var colorMap = { 0: "cyan", 3: "amber", 4: "green" };

    bar.innerHTML = statsToRender
      .map(function (s, i) {
        var cls = colorMap[i] || "";
        return (
          '<div class="rd-stat">' +
          '<span class="rd-stat-val ' + cls + '">' + s.val + "</span>" +
          '<span class="rd-stat-lbl">' + s.lbl + "</span>" +
          "</div>"
        );
      })
      .join("");

    // Insertar antes del .toolbar
    var toolbar = document.querySelector(".toolbar");
    if (toolbar && toolbar.parentElement) {
      toolbar.parentElement.insertBefore(bar, toolbar);
    }
  }

  /* ── 5. Observador de cambios para mantener stats actualizados
     Escucha cambios en el pane de estadísticas y actualiza la
     barra superior automáticamente.
  ──────────────────────────────────────────────────────────── */
  function watchStats() {
    var statGrid = document.querySelector(".stat-grid");
    if (!statGrid) return;

    var observer = new MutationObserver(function () {
      buildStatsBar();
    });
    observer.observe(statGrid, { childList: true, subtree: true, characterData: true });
  }

  /* ── Init ────────────────────────────────────────────────────
     Espera a que el DOM del app (no del login) esté visible.
     #s-app es el contenedor principal post-login.
  ──────────────────────────────────────────────────────────── */
  function init() {
    var appScreen = document.getElementById("s-app");
    if (!appScreen || !appScreen.classList.contains("active")) {
      // Todavía en pantalla de login — observar hasta que aparezca
      var loginObserver = new MutationObserver(function () {
        if (appScreen && appScreen.classList.contains("active")) {
          loginObserver.disconnect();
          run();
        }
      });
      loginObserver.observe(document.body, { attributes: true, subtree: true, attributeFilter: ["class"] });
      return;
    }
    run();
  }

  function run() {
    applyIcons();
    applySeparators();
    applyProjectBadge();
    buildStatsBar();
    watchStats();
  }

  // Ejecutar cuando el DOM esté listo
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
