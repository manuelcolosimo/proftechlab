/* Prof Tech Lab · Accessibilità condivisa da tutte le app.
   Le impostazioni stanno in localStorage ("ptl-a11y") e valgono per tutto l'ecosistema.
   Si cambiano dal pannello ♿ della home; ogni app si aggiorna da sola. */
/* Lingua di aiuto: carica lingue.js dalla stessa cartella di questo file */
(function () {
  if (window.ptlLingua || document.getElementById("ptl-lingue-js")) return;
  const me = document.currentScript && document.currentScript.src;
  const s = document.createElement("script"); s.id = "ptl-lingue-js"; s.src = me ? new URL("lingue.js", me).href : "apps/lingue.js";
  document.head.appendChild(s);
})();
(function () {
  const KEY = "ptl-a11y";
  const DEF = { leggibile: false, testo: 100, interlinea: false, contrasto: false, animazioni: false, righello: false, voce: false, velocita: 1 };
  function leggi() { try { return Object.assign({}, DEF, JSON.parse(localStorage.getItem(KEY)) || {}); } catch (e) { return Object.assign({}, DEF); } }

  /* Font ad alta leggibilità e regole CSS (inserite una volta) */
  if (!document.getElementById("ptl-a11y-font")) {
    const l = document.createElement("link"); l.id = "ptl-a11y-font"; l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&display=swap";
    document.head.appendChild(l);
  }
  const st = document.createElement("style"); st.id = "ptl-a11y-css";
  st.textContent = `
html.ptl-leggibile body, html.ptl-leggibile body *:not(svg):not(svg *) { font-family: "Atkinson Hyperlegible", Verdana, sans-serif !important; letter-spacing: .03em; word-spacing: .1em; }
html.ptl-interlinea p, html.ptl-interlinea li, html.ptl-interlinea label, html.ptl-interlinea .consegna, html.ptl-interlinea td { line-height: 1.8 !important; }
html.ptl-contrasto { filter: contrast(1.3) saturate(1.15); }
html.ptl-noanim *, html.ptl-noanim *::before, html.ptl-noanim *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
#ptl-righello { position: fixed; left: 0; right: 0; height: 2.4em; pointer-events: none; z-index: 2147483000; background: rgba(245, 215, 110, .28); border-top: 2px solid rgba(31, 42, 68, .55); border-bottom: 2px solid rgba(31, 42, 68, .55); display: none; }
html.ptl-righello #ptl-righello { display: block; }
#ptl-voce-btn { position: fixed; right: 12px; bottom: 12px; z-index: 2147483001; display: none; align-items: center; gap: 6px; background: #2f4b3d; color: #f4f1e8; border: 3px solid #f5d76e; border-radius: 99px; padding: 8px 14px; font: 700 17px "Atkinson Hyperlegible", system-ui, sans-serif; cursor: pointer; box-shadow: 0 3px 0 rgba(0,0,0,.3); }
html.ptl-voce #ptl-voce-btn { display: inline-flex; }
#ptl-voce-btn.attivo { background: #f5d76e; color: #1f2a44; }
.ptl-letto { outline: 4px solid #f5d76e !important; outline-offset: 3px; border-radius: 4px; }
`;
  document.head.appendChild(st);

  /* Righello di lettura: segue il dito o il mouse */
  const righello = document.createElement("div"); righello.id = "ptl-righello"; righello.setAttribute("aria-hidden", "true");
  const posiziona = y => { righello.style.top = (y - righello.offsetHeight / 2) + "px"; };
  window.addEventListener("pointermove", e => posiziona(e.clientY), { passive: true });
  window.addEventListener("pointerdown", e => posiziona(e.clientY), { passive: true });

  /* Lettura ad alta voce */
  const btn = document.createElement("button"); btn.id = "ptl-voce-btn"; btn.type = "button";
  btn.innerHTML = '<span aria-hidden="true">🔊</span> Leggi';
  btn.setAttribute("aria-label", "Leggi ad alta voce: seleziona un testo oppure tocca il pulsante e poi il testo da ascoltare");
  let attesaTocco = false, evidenziato = null;
  function parla(testo) {
    if (!("speechSynthesis" in window) || !testo) return false;
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(testo.replace(/\s+/g, " ").trim());
      u.lang = "it-IT"; u.rate = leggi().velocita || 1;
      const v = speechSynthesis.getVoices().find(x => /^it/i.test(x.lang)); if (v) u.voice = v;
      u.onend = () => { if (evidenziato) evidenziato.classList.remove("ptl-letto"); evidenziato = null; };
      let partita = false; u.onstart = () => { partita = true; };
      speechSynthesis.speak(u);
      setTimeout(() => { if (!partita && !speechSynthesis.speaking) avvisoVoce(); }, 2000);
      return true;
    } catch (e) { return false; }
  }
  window.ptlParla = parla;
  function avvisoVoce() {
    if (evidenziato) { evidenziato.classList.remove("ptl-letto"); evidenziato = null; }
    btn.innerHTML = '<span aria-hidden="true">🔊</span> Leggi';
    let a = document.getElementById("ptl-voce-avviso");
    if (!a) {
      a = document.createElement("div"); a.id = "ptl-voce-avviso"; a.setAttribute("role", "status");
      a.style.cssText = "position:fixed;right:12px;bottom:66px;max-width:340px;z-index:2147483002;background:#fff2cc;color:#1f2a44;border:2px solid #b8860b;border-radius:12px;padding:10px 12px;font:15px/1.4 system-ui,sans-serif;box-shadow:0 4px 14px rgba(0,0,0,.2)";
      document.body.appendChild(a);
    }
    a.innerHTML = "🔇 <b>La voce non è partita.</b> Nell'anteprima dentro Claude la lettura ad alta voce può essere bloccata. Sul sito pubblicato funziona con Chrome, Edge e Safari, se il dispositivo ha una voce italiana installata.";
    clearTimeout(avvisoVoce.t); avvisoVoce.t = setTimeout(() => a.remove(), 9000);
  }
  btn.addEventListener("click", e => {
    e.stopPropagation();
    if ("speechSynthesis" in window && speechSynthesis.speaking) { speechSynthesis.cancel(); attesaTocco = false; btn.classList.remove("attivo"); btn.innerHTML = '<span aria-hidden="true">🔊</span> Leggi'; return; }
    const sel = String(window.getSelection ? window.getSelection() : "").trim();
    if (sel) { parla(sel); return; }
    attesaTocco = !attesaTocco;
    btn.classList.toggle("attivo", attesaTocco);
    btn.innerHTML = attesaTocco ? '👆 Tocca un testo' : '<span aria-hidden="true">🔊</span> Leggi';
  });
  document.addEventListener("click", e => {
    if (!attesaTocco || e.target === btn || btn.contains(e.target)) return;
    const el = e.target.closest("p, h1, h2, h3, h4, li, label, button, td, th, .consegna, span, div, text");
    if (!el) return;
    const copia = el.cloneNode(true); copia.querySelectorAll(".ptl-tr").forEach(x => x.remove());
    const testo = (copia.innerText || copia.textContent || "").trim();
    if (!testo) return;
    e.preventDefault(); e.stopPropagation();
    attesaTocco = false; btn.classList.remove("attivo"); btn.innerHTML = '⏹ Ferma';
    if (evidenziato) evidenziato.classList.remove("ptl-letto");
    evidenziato = el; el.classList.add("ptl-letto");
    if (!parla(testo.slice(0, 1500))) { btn.innerHTML = '<span aria-hidden="true">🔊</span> Leggi'; el.classList.remove("ptl-letto"); }
    const fine = setInterval(() => { if (!speechSynthesis.speaking) { clearInterval(fine); btn.innerHTML = '<span aria-hidden="true">🔊</span> Leggi'; } }, 400);
  }, true);

  function applica() {
    const s = leggi(), h = document.documentElement;
    h.classList.toggle("ptl-leggibile", !!s.leggibile);
    h.classList.toggle("ptl-interlinea", !!s.interlinea);
    h.classList.toggle("ptl-contrasto", !!s.contrasto);
    h.classList.toggle("ptl-noanim", !!s.animazioni);
    h.classList.toggle("ptl-righello", !!s.righello);
    h.classList.toggle("ptl-voce", !!s.voce);
    const z = document.querySelector("[data-ptl-zoom]") || document.body;
    if (z) z.style.zoom = s.testo && s.testo !== 100 ? s.testo / 100 : "";
    if (!s.voce && "speechSynthesis" in window) { try { speechSynthesis.cancel(); } catch (e) {} }
  }
  window.ptlA11y = { applica, leggi, salva: v => { try { localStorage.setItem(KEY, JSON.stringify(Object.assign(leggi(), v))); } catch (e) {} applica(); } };
  function monta() { if (!document.body) return; document.body.appendChild(righello); document.body.appendChild(btn); applica(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", monta); else monta();
  window.addEventListener("storage", e => { if (e.key === KEY) applica(); });
})();

/* Prof Tech Lab · Profilo studente: le app si aprono solo con il codice del giorno,
   gli strumenti del docente non sono disponibili. Lucchetto didattico, non sicurezza. */
(function () {
  let ruolo = null, sb = {};
  try { ruolo = JSON.parse(localStorage.getItem("ptl-ruolo")); sb = JSON.parse(localStorage.getItem("ptl-sblocchi")) || {}; } catch (e) {}
  if (ruolo !== "studente" || !/\/apps\//.test(location.pathname)) return;
  const f = (location.pathname.split("/").pop() || "").replace(/\.html$/, "");
  const id = { "pista-base": "pista-codice", "pista-pro": "pista-codice" }[f] || f;
  const d = new Date(), oggi = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const docenti = ["strumenti", "banca-classe", "verifiche", "convertitore", "editor-pdf"].includes(id);
  if (!docenti && (sb[id] === oggi || sb["*"] === oggi || ((id === "mappa-concettuale" || id === "ripasso-furbo") && sb["parole-chiave"] === oggi))) {
    if (id === "ripasso-furbo") { const s = document.createElement("style"); s.textContent = "#crea-verifica, .solo-docenti { display: none !important; }"; document.head.appendChild(s); }
    return;
  }
  const blocca = () => {
    const o = document.createElement("div");
    o.setAttribute("role", "alertdialog");
    o.style.cssText = "position:fixed;inset:0;z-index:2147483646;background:#2f4b3d;color:#f4f1e8;display:grid;place-content:center;text-align:center;gap:12px;padding:24px;font:400 22px system-ui,sans-serif";
    o.innerHTML = docenti
      ? '<div style="font-size:64px">👩‍🏫</div><b style="font-size:30px">Strumento riservato ai docenti</b><span>Torna alla home per usare le app della tua classe.</span>'
      : '<div style="font-size:64px">🔒</div><b style="font-size:30px">App bloccata</b><span>Torna alla home e scrivi il codice che ti dà il docente.</span>';
    const a = document.createElement("a"); a.textContent = "⬅ Vai alla home"; a.href = location.pathname.includes("/apps/") ? "../index.html" : "index.html"; a.target = "_top";
    a.style.cssText = "justify-self:center;background:#f5d76e;color:#1f2a44;padding:8px 20px;border-radius:99px;font-weight:700;text-decoration:none";
    o.appendChild(a); document.body.appendChild(o);
  };
  if (document.body) blocca(); else document.addEventListener("DOMContentLoaded", blocca);
})();
