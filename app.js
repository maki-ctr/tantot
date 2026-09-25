// Tantôt — app logic. No build step, no dependencies.
(() => {
"use strict";
const D = window.DATA;
const KEY = "tantot-v1";
const $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const todayStr = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; };
const addDays = (s, n) => { const d = new Date(s + "T12:00:00"); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); };
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const PLAY = '<svg viewBox="0 0 10 10" aria-hidden="true"><path d="M2 1l7 4-7 4z"/></svg>';

// ── State ──────────────────────────────────────────
function fresh() {
  return {
    settings: { apiKey: "", model: "claude-sonnet-5", rate: 0.9, voice: "", vocabDir: "en-fr" },
    done: {}, answers: {}, drills: {}, cards: {}, streak: { last: "", count: 0 },
    errors: D.seedErrors.map(([wrong, right, rule]) => ({ wrong, right, rule, date: "diagnostic" }))
  };
}
let S;
try { const raw = localStorage.getItem(KEY); S = raw ? Object.assign(fresh(), JSON.parse(raw)) : fresh(); }
catch { S = fresh(); }
S.settings = Object.assign(fresh().settings, S.settings);
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch { toast("Progress couldn't be saved on this device."); } };
function touch() {
  const t = todayStr();
  if (S.streak.last === t) return;
  S.streak.count = S.streak.last === addDays(t, -1) ? S.streak.count + 1 : 1;
  S.streak.last = t; save();
}

// ── Toast ──────────────────────────────────────────
let toastT;
function toast(msg) {
  let el = $(".toast"); if (!el) { el = document.createElement("div"); el.className = "toast"; el.setAttribute("role", "status"); document.body.appendChild(el); }
  el.textContent = msg; clearTimeout(toastT); toastT = setTimeout(() => el.remove(), 3200);
}

// ── Speech ─────────────────────────────────────────
const synth = window.speechSynthesis;
function frVoices() { return synth ? synth.getVoices().filter(v => /^fr/i.test(v.lang)) : []; }
function pickVoice() {
  const vs = frVoices(); if (!vs.length) return null;
  return vs.find(v => v.voiceURI === S.settings.voice) || vs.find(v => /fr[-_]BE/i.test(v.lang)) || vs.find(v => /fr[-_]FR/i.test(v.lang)) || vs[0];
}
function speak(text, onend) {
  if (!synth) { toast("Audio isn't supported in this browser."); return; }
  synth.cancel();
  const parts = Array.isArray(text) ? text : [text];
  let i = 0;
  const next = () => {
    if (i >= parts.length) { onend && onend(); return; }
    const u = new SpeechSynthesisUtterance(parts[i++]);
    const v = pickVoice(); if (v) { u.voice = v; u.lang = v.lang; } else u.lang = "fr-BE";
    u.rate = S.settings.rate; u.onend = next; synth.speak(u);
  };
  next();
}
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
function listen(target) {
  if (!SR) { toast("Dictation isn't available here. Use your keyboard's mic button instead."); return; }
  const r = new SR(); r.lang = "fr-BE"; r.interimResults = false;
  r.onresult = e => { const t = e.results[0][0].transcript; target.value = (target.value ? target.value + " " : "") + t; target.dispatchEvent(new Event("input", { bubbles: true })); };
  r.onerror = () => toast("Couldn't hear you. Check microphone permission.");
  r.start(); toast("Parlez maintenant…");
}

// ── Claude API ─────────────────────────────────────
async function claude(system, messages, max_tokens = 1500) {
  if (!S.settings.apiKey) throw new Error("NOKEY");
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": S.settings.apiKey,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true"
    },
    body: JSON.stringify({ model: S.settings.model, max_tokens, system, messages })
  });
  if (!r.ok) {
    let msg = `Error ${r.status}`;
    try { const j = await r.json(); msg += `: ${j.error?.message || ""}`; } catch {}
    throw new Error(msg);
  }
  const d = await r.json();
  return (d.content || []).filter(b => b.type === "text").map(b => b.text).join("\n");
}
const parseJSON = t => JSON.parse(t.replace(/```json|```/g, "").trim().replace(/^[^{]*/, "").replace(/[^}]*$/, ""));
const TEACHER = `Tu es un professeur de français langue étrangère, spécialisé dans le français professionnel en Belgique.
Élève : ${D.profile.summary}
Erreurs récurrentes connues : ${D.profile.knownErrors}`;
const CORRECT_FORMAT = `Réponds UNIQUEMENT avec un objet JSON valide, sans texte autour :
{"corrige":"le texte de l'élève corrigé, en gardant ses idées et son niveau","erreurs":[{"faux":"extrait fautif","correct":"correction","regle":"règle courte en anglais"}],"naturel":"une version plus naturelle, comme la dirait un chef de projet belge francophone","niveau":"A2, A2+, B1, B1+ ou B2","conseil":"un conseil prioritaire en anglais, une phrase"}
Signale chaque erreur réelle, pas les choix de style. Si le texte ne répond pas à la consigne, dis-le dans le conseil.`;

function aiError(e) {
  if (e.message === "NOKEY") { toast("Add your API key in Réglages first, or use « Copier pour Claude »."); return ""; }
  return `<p class="small" style="color:var(--err)">${esc(e.message)}. Check your key and model in Réglages.</p>`;
}
function addErrors(list) {
  let n = 0;
  (list || []).forEach(x => {
    if (!x.faux || S.errors.some(e => e.wrong === x.faux)) return;
    S.errors.unshift({ wrong: x.faux, right: x.correct, rule: x.regle, date: todayStr() }); n++;
  });
  save(); return n;
}
function renderCorrection(j) {
  const rows = (j.erreurs || []).map(e => `<tr><td class="w">${esc(e.faux)}</td><td class="r">${esc(e.correct)}</td><td class="muted">${esc(e.regle)}</td></tr>`).join("");
  return `<div class="panel">
    <div class="spread"><b>Correction</b><span class="muted small">Niveau estimé : <b>${esc(j.niveau)}</b></span></div>
    <p class="fr">${esc(j.corrige)}</p>
    ${rows ? `<div class="tablewrap"><table class="err"><tbody>${rows}</tbody></table></div>` : `<p class="small" style="color:var(--ok)">Aucune erreur. Bravo.</p>`}
    ${j.naturel ? `<p class="small muted" style="margin-top:12px">Plus naturel :</p><div class="row" style="flex-wrap:nowrap;align-items:flex-start"><button class="play" data-act="say" data-text="${esc(j.naturel)}" aria-label="Écouter">${PLAY}</button><p class="fr" style="margin:0">${esc(j.naturel)}</p></div>` : ""}
    ${j.conseil ? `<p class="small" style="margin-top:12px"><b>Priorité :</b> ${esc(j.conseil)}</p>` : ""}
  </div>`;
}

// ── Leitner cards ──────────────────────────────────
const BOX_DAYS = [0, 1, 3, 7, 14, 30];
const cardState = id => S.cards[id] || { box: 0, due: "" };
const dueCards = () => D.vocab.filter(v => { const c = S.cards[v.id]; return !c || c.due <= todayStr(); });
function gradeCard(id, knew) {
  const c = cardState(id); const box = knew ? Math.min(c.box + 1, 5) : 1;
  S.cards[id] = { box, due: addDays(todayStr(), BOX_DAYS[box]) }; touch(); save();
}

// ── Drill stats ────────────────────────────────────
function drillAcc(id) {
  const d = D.drills.find(x => x.id === id); let r = 0, w = 0;
  d.items.forEach((_, i) => { const s = S.drills[`${id}:${i}`]; if (s) { r += s.r; w += s.w; } });
  return { r, w, pct: r + w ? Math.round(100 * r / (r + w)) : null };
}
function weakestDrill() {
  const scored = D.drills.map(d => ({ d, a: drillAcc(d.id) }));
  const untried = scored.find(x => x.a.pct === null);
  if (untried) return untried.d;
  return scored.sort((a, b) => a.a.pct - b.a.pct)[0].d;
}

// ── Views ──────────────────────────────────────────
const V = {};

V.home = () => {
  const next = D.scenarios.find(s => !S.done[s.id]) || D.scenarios[0];
  const due = dueCards().length;
  const weak = weakestDrill(); const acc = drillAcc(weak.id);
  const doneN = Object.keys(S.done).length;
  const errs = S.errors.slice(0, 3);
  return `
  <h1>Bonjour ${esc(D.profile.name)}.</h1>
  <p class="muted">${S.streak.count > 0 ? `Série en cours : ${S.streak.count} jour${S.streak.count > 1 ? "s" : ""}.` : "Aujourd'hui, c'est le jour 1."} ${doneN} scénario${doneN > 1 ? "s" : ""} sur ${D.scenarios.length} terminé${doneN > 1 ? "s" : ""}.</p>
  <div class="level" aria-label="Niveau">
    <div><span class="small muted">Compréhension</span><b>${D.profile.level.comprehension}</b></div>
    <div><span class="small muted">Production</span><b>${D.profile.level.production}</b></div>
    <div class="target"><span class="small">Objectif</span><b>${D.profile.level.target}</b></div>
  </div>
  <h2>Le plan du jour</h2>
  <div class="panel"><div class="spread"><div><div class="small muted">Scénario</div><div class="t fr">${esc(next.title)}</div></div><a class="btn go" href="#/scenario/${next.id}">Commencer</a></div></div>
  <div class="panel"><div class="spread"><div><div class="small muted">Exercice ciblé${acc.pct !== null ? `, ${acc.pct} % de réussite` : ""}</div><div class="t">${esc(weak.title)}</div><div class="small muted">${esc(weak.why)}</div></div><a class="btn" href="#/exercices/${weak.id}">Pratiquer</a></div></div>
  <div class="panel"><div class="spread"><div><div class="small muted">Vocabulaire</div><div class="t">${due} carte${due > 1 ? "s" : ""} à réviser</div></div><a class="btn" href="#/vocabulaire/revision" ${due ? "" : "aria-disabled=\"true\""}>Réviser</a></div></div>
  ${errs.length ? `<h2>À ne plus faire</h2><div class="panel tablewrap"><table class="err"><tbody>${errs.map(e => `<tr><td class="w">${esc(e.wrong)}</td><td class="r">${esc(e.right)}</td></tr>`).join("")}</tbody></table><a class="small" href="#/erreurs">Toutes mes erreurs (${S.errors.length})</a></div>` : ""}`;
};

V.scenarios = () => {
  const group = (g, label) => `<h2>${label}</h2><div class="panel list">${D.scenarios.filter(s => s.group === g).map(s => `
    <a class="item" href="#/scenario/${s.id}"><div class="spread"><span class="t fr">${esc(s.title)}</span>${S.done[s.id] ? '<span class="done-mark">Terminé</span>' : ""}</div><div class="small muted">${esc(s.situation)}</div></a>`).join("")}</div>`;
  return `<h1>Scénarios</h1><p class="muted">Real situations from your job search and the roles you're applying for. Listen, read, then write your own answer.</p>${group("entretien", "Entretiens")}${group("travail", "Au travail")}`;
};

let RP = null; // role-play session { id, msgs: [] }
V.scenario = id => {
  const s = D.scenarios.find(x => x.id === id); if (!s) return V.notFound();
  const lines = s.lines.map(([w, fr, en], i) => `
    <div class="line ${w === "M" ? "me" : ""}"><button class="play" data-act="say-line" data-i="${i}" aria-label="Écouter">${PLAY}</button>
    <div><div class="who">${esc(D.speakers[w])}</div><div class="fr">${esc(fr)}</div><div class="en">${esc(en)}</div></div></div>`).join("");
  const phrases = s.phrases.map(([fr, en]) => `<div class="row" style="padding:6px 0;flex-wrap:nowrap"><button class="play" data-act="say" data-text="${esc(fr)}" aria-label="Écouter">${PLAY}</button><div><span class="fr">${esc(fr)}</span> <span class="muted small">${esc(en)}</span></div></div>`).join("");
  const tasks = s.tasks.map(t => `
    <div class="turn" data-task="${t.id}">
      <div class="small muted">À vous</div>
      <div class="prompt">${esc(t.prompt)}</div>
      <div class="small muted">${esc(t.hint)}</div>
      <textarea data-act-input="answer" data-task="${t.id}" placeholder="Écrivez en français, sans traducteur." aria-label="Votre réponse">${esc(S.answers[t.id] || "")}</textarea>
      <div class="row">
        <button class="btn go" data-act="correct" data-task="${t.id}">Corriger avec Claude</button>
        <button class="btn" data-act="copy" data-task="${t.id}">Copier pour Claude</button>
        <button class="btn" data-act="mic" data-task="${t.id}">Dicter</button>
        <button class="btn" data-act="model" data-task="${t.id}">Voir le modèle</button>
      </div>
      <div class="result" id="res-${t.id}"></div>
    </div>`).join("");
  const rpActive = RP && RP.id === id;
  return `
  <p class="small"><a href="#/scenarios">Scénarios</a></p>
  <h1>${esc(s.title)}</h1>
  <p class="muted">${esc(s.situation)}</p>
  <h2>Le dialogue</h2>
  <div class="row"><button class="btn primary" data-act="say-all">Tout écouter</button><button class="btn" data-act="toggle-en">Afficher l'anglais</button></div>
  <div class="panel" id="dialogue">${lines}</div>
  <h2>Expressions clés</h2>
  <div class="panel">${phrases}</div>
  <h2>À vous d'écrire</h2>
  ${tasks}
  <h2>Simulation</h2>
  <div class="panel">
    <p class="small muted">A live conversation with the character. Answer in French, by typing or dictating. At the end, you get a correction of everything you said.</p>
    <div class="chat" id="chat">${rpActive ? RP.msgs.map(m => `<div class="msg ${m.role === "user" ? "me" : "them"}">${esc(m.content)}</div>`).join("") : ""}</div>
    ${rpActive ? `
      <div class="chat-input"><input type="text" id="rp-in" placeholder="Votre réponse…" aria-label="Votre réponse"><button class="btn" data-act="rp-mic">Dicter</button><button class="btn go" data-act="rp-send">Envoyer</button></div>
      <div class="row" style="margin-top:10px"><button class="btn primary" data-act="rp-end">Terminer et évaluer</button></div>
      <div id="rp-res"></div>`
    : `<button class="btn go" data-act="rp-start" data-id="${id}">Lancer la simulation</button>`}
  </div>
  <div class="row" style="margin-top:28px">
    <button class="btn ${S.done[id] ? "" : "primary"}" data-act="done" data-id="${id}">${S.done[id] ? "Terminé le " + esc(S.done[id]) : "Marquer comme terminé"}</button>
  </div>`;
};

V.drills = () => `<h1>Exercices</h1><p class="muted">Targeted at the errors from your diagnostic. Weakest first.</p>
  <div class="panel list">${D.drills.map(d => { const a = drillAcc(d.id); return `
  <a class="item" href="#/exercices/${d.id}"><div class="spread"><span class="t">${esc(d.title)}</span><span class="small muted">${a.pct === null ? "Pas encore fait" : a.pct + " %"}</span></div>
  <div class="small muted">${esc(d.why)}</div>${a.pct !== null ? `<div class="bar"><i style="width:${a.pct}%"></i></div>` : ""}</a>`; }).join("")}</div>`;

let DR = null; // drill session
V.drill = id => {
  const d = D.drills.find(x => x.id === id); if (!d) return V.notFound();
  if (!DR || DR.id !== id) DR = { id, order: shuffle(d.items.map((_, i) => i)), pos: 0, right: 0, answered: false };
  if (DR.pos >= DR.order.length) {
    const total = DR.order.length;
    return `<p class="small"><a href="#/exercices">Exercices</a></p><h1>${esc(d.title)}</h1>
      <div class="panel card"><div class="big">${DR.right} / ${total}</div><p class="muted">${DR.right === total ? "Parfait." : DR.right >= total * .7 ? "Bien. Refaites-le demain pour fixer la règle." : "Relisez les explications, puis recommencez."}</p>
      <div class="row"><button class="btn go" data-act="drill-restart">Recommencer</button><a class="btn" href="#/exercices">Autres exercices</a></div></div>`;
  }
  const idx = DR.order[DR.pos]; const it = d.items[idx];
  const input = it.options
    ? `<div class="opts">${it.options.map(o => `<button class="opt" data-act="drill-pick" data-v="${esc(o)}">${esc(o)}</button>`).join("")}</div>`
    : `<div class="row" style="flex-wrap:nowrap"><input type="text" id="drill-in" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Réponse"><button class="btn go" data-act="drill-check">Vérifier</button></div>`;
  return `<p class="small"><a href="#/exercices">Exercices</a></p>
    <div class="spread"><h1 style="font-size:1.4rem">${esc(d.title)}</h1><span class="small muted">${DR.pos + 1} / ${DR.order.length}</span></div>
    <div class="bar"><i style="width:${100 * DR.pos / DR.order.length}%"></i></div>
    <div class="panel"><div class="q">${esc(it.q)}</div>${input}<div id="drill-fb"></div></div>`;
};

V.vocab = () => {
  const cats = [...new Set(D.vocab.map(v => v.cat))];
  const due = dueCards().length;
  return `<h1>Vocabulaire</h1>
  <div class="panel"><div class="spread"><div><div class="t">${due} carte${due > 1 ? "s" : ""} à réviser</div><div class="small muted">Cards you know come back less often.</div></div><a class="btn go" href="#/vocabulaire/revision">Réviser</a></div>
  <div class="row small" style="margin-top:10px"><span class="muted">Sens :</span>
    <label><input type="radio" name="dir" value="en-fr" data-act-input="dir" ${S.settings.vocabDir === "en-fr" ? "checked" : ""}> anglais → français</label>
    <label><input type="radio" name="dir" value="fr-en" data-act-input="dir" ${S.settings.vocabDir === "fr-en" ? "checked" : ""}> français → anglais</label></div></div>
  ${cats.map(c => `<h2>${esc(c)}</h2><div class="panel">${D.vocab.filter(v => v.cat === c).map(v => `
    <div class="row" style="padding:6px 0;flex-wrap:nowrap"><button class="play" data-act="say" data-text="${esc(v.fr)}" aria-label="Écouter">${PLAY}</button><div><span class="fr">${esc(v.fr)}</span> <span class="small muted">${esc(v.en)}</span></div></div>`).join("")}</div>`).join("")}`;
};

let VR = null; // vocab review
V.review = () => {
  if (!VR) VR = { queue: shuffle(dueCards()).slice(0, 20), pos: 0, shown: false };
  if (!VR.queue.length || VR.pos >= VR.queue.length) {
    const n = VR.queue.length; VR = null;
    return `<p class="small"><a href="#/vocabulaire">Vocabulaire</a></p><div class="panel card"><div class="big">${n ? "Révision terminée." : "Rien à réviser."}</div><p class="muted">${n ? `${n} cartes revues.` : "Come back tomorrow."}</p><a class="btn" href="#/">Retour</a></div>`;
  }
  const v = VR.queue[VR.pos]; const enFirst = S.settings.vocabDir === "en-fr";
  const front = enFirst ? v.en : v.fr, back = enFirst ? v.fr : v.en;
  return `<p class="small"><a href="#/vocabulaire">Vocabulaire</a></p>
  <div class="spread"><span class="small muted">${esc(v.cat)}</span><span class="small muted">${VR.pos + 1} / ${VR.queue.length}</span></div>
  <div class="panel card">
    <div class="big ${enFirst ? "" : "fr"}">${esc(front)}</div>
    ${VR.shown ? `<div class="row" style="justify-content:center"><button class="play" data-act="say" data-text="${esc(v.fr)}" aria-label="Écouter">${PLAY}</button><span class="big" style="font-size:1.3rem">${esc(back)}</span></div>
      <div class="row" style="justify-content:center"><button class="btn" data-act="card" data-k="0">À revoir</button><button class="btn go" data-act="card" data-k="1">Je savais</button></div>`
    : `<p class="muted small">${enFirst ? "Say it in French out loud, then check." : "What does it mean?"}</p><button class="btn primary" data-act="card-show">Montrer</button>`}
  </div>`;
};

V.errors = () => `<h1>Mes erreurs</h1>
  <p class="muted">Seeded from your diagnostic. Every correction from Claude adds the new errors here.</p>
  <div class="row"><button class="btn go" data-act="err-copy">Copier : exercices sur mes erreurs</button></div>
  <div class="panel tablewrap"><table class="err"><tbody>${S.errors.map((e, i) => `<tr><td class="w">${esc(e.wrong)}</td><td class="r">${esc(e.right)}</td><td class="muted small">${esc(e.rule)}</td><td><button class="btn small" data-act="err-del" data-i="${i}" aria-label="Supprimer">Retirer</button></td></tr>`).join("")}</tbody></table>
  ${S.errors.length ? "" : '<p class="muted">No errors saved. Correct an answer to start the list.</p>'}</div>`;

V.settings = () => {
  const vs = frVoices();
  return `<h1>Réglages</h1>
  <h2>Clé API Claude</h2>
  <div class="panel">
    <p class="small muted">Needed for « Corriger avec Claude » and the simulations. The key is saved only in this browser, on this device. Never put it on GitHub. Set a monthly spend limit in the Anthropic Console.</p>
    <label class="small" for="k">Clé API</label>
    <input type="password" id="k" value="${esc(S.settings.apiKey)}" placeholder="sk-ant-…" autocomplete="off" data-act-input="key">
    <label class="small" for="m" style="display:block;margin-top:10px">Modèle</label>
    <select id="m" data-act-input="model">
      ${["claude-sonnet-5", "claude-haiku-4-5-20251001", "claude-opus-5-5"].map(m => `<option ${S.settings.model === m ? "selected" : ""}>${m}</option>`).join("")}
    </select>
    <p class="small muted">Sonnet is the best balance. Haiku is cheaper, Opus the most thorough.</p>
    <div class="row"><button class="btn go" data-act="test-key">Tester la clé</button><button class="btn" data-act="clear-key">Effacer la clé</button></div>
    <div id="key-res"></div>
  </div>
  <h2>Audio</h2>
  <div class="panel">
    ${vs.length ? `<label class="small" for="vo">Voix</label><select id="vo" data-act-input="voice"><option value="">Automatique (belge si disponible)</option>${vs.map(v => `<option value="${esc(v.voiceURI)}" ${S.settings.voice === v.voiceURI ? "selected" : ""}>${esc(v.name)} (${esc(v.lang)})</option>`).join("")}</select>`
      : `<p class="small muted">No French voice found yet. On iPhone: Settings, Accessibility, Spoken Content, Voices, French. Then reload.</p>`}
    <label class="small" for="ra" style="display:block;margin-top:10px">Vitesse : <b id="ra-v">${S.settings.rate}</b></label>
    <input type="range" id="ra" min="0.6" max="1.3" step="0.05" value="${S.settings.rate}" data-act-input="rate" style="width:100%">
    <button class="btn" data-act="say" data-text="Bonjour à tous. Je vous propose de faire le point sur le projet.">Tester la voix</button>
  </div>
  <h2>Progression</h2>
  <div class="panel">
    <p class="small muted">Progress lives in this browser. Export it to move it to another device.</p>
    <div class="row"><button class="btn" data-act="export">Exporter</button><label class="btn">Importer<input type="file" accept="application/json" data-act-input="import" hidden></label><button class="btn" data-act="reset">Tout réinitialiser</button></div>
  </div>`;
};

V.notFound = () => `<h1>Page introuvable</h1><p><a href="#/">Retour à l'accueil</a></p>`;

// ── Router ─────────────────────────────────────────
function render() {
  const [, a = "", b = ""] = location.hash.replace(/^#/, "").split("/");
  document.querySelectorAll("nav.tabs a").forEach(x => x.classList.toggle("on", x.dataset.tab === (a === "scenario" ? "scenarios" : a)));
  const main = $("#main");
  const html =
    a === "" ? V.home() :
    a === "scenarios" ? V.scenarios() :
    a === "scenario" ? V.scenario(b) :
    a === "exercices" ? (b ? V.drill(b) : V.drills()) :
    a === "vocabulaire" ? (b === "revision" ? V.review() : V.vocab()) :
    a === "erreurs" ? V.errors() :
    a === "reglages" ? V.settings() : V.notFound();
  main.innerHTML = html;
}
let lastHash = "";
window.addEventListener("hashchange", () => {
  if (location.hash !== lastHash) { if (!location.hash.includes("revision")) VR = null; window.scrollTo(0, 0); }
  lastHash = location.hash; render();
});

// ── Actions ────────────────────────────────────────
const currentScenario = () => D.scenarios.find(s => s.id === location.hash.split("/")[2]);
const findTask = id => { for (const s of D.scenarios) { const t = s.tasks.find(t => t.id === id); if (t) return { s, t }; } };
const A = {};

A.say = b => speak(b.dataset.text);
A["say-line"] = b => speak(currentScenario().lines[+b.dataset.i][1]);
A["say-all"] = () => speak(currentScenario().lines.map(l => l[1]));
A["toggle-en"] = b => { const on = $("#dialogue").classList.toggle("show-en"); b.textContent = on ? "Masquer l'anglais" : "Afficher l'anglais"; };

A.model = b => {
  const { t } = findTask(b.dataset.task); const box = $(`#res-${t.id}`);
  if (box.querySelector(".model")) { box.innerHTML = ""; return; }
  box.innerHTML = `<div class="model fr">${esc(t.model)}</div><button class="btn" style="margin-top:8px" data-act="say" data-text="${esc(t.model)}">Écouter le modèle</button>`;
};
A.mic = b => listen($(`textarea[data-task="${b.dataset.task}"]`));
A.copy = async b => {
  const { s, t } = findTask(b.dataset.task); const ans = S.answers[t.id] || "";
  if (!ans.trim()) { toast("Write your answer first."); return; }
  const prompt = `${TEACHER}\n\nSituation : ${s.title}. ${s.situation}\nConsigne : ${t.prompt}\n\nRéponse de l'élève :\n"""\n${ans}\n"""\n\nCorrige cette réponse. Donne : 1) le texte corrigé, 2) un tableau des erreurs (faux / correct / règle en anglais), 3) une version plus naturelle, comme la dirait un chef de projet belge francophone, 4) le niveau CECR estimé, 5) une priorité à travailler.`;
  try { await navigator.clipboard.writeText(prompt); toast("Copied. Paste it into Claude."); } catch { toast("Couldn't copy. Select and copy manually."); }
};
A.correct = async b => {
  const { s, t } = findTask(b.dataset.task); const ans = (S.answers[t.id] || "").trim();
  if (!ans) { toast("Write your answer first."); return; }
  const box = $(`#res-${t.id}`); b.disabled = true; box.innerHTML = `<span class="spinner">Correction en cours…</span>`;
  try {
    const out = await claude(`${TEACHER}\n\n${CORRECT_FORMAT}`, [{ role: "user", content: `Situation : ${s.title}. ${s.situation}\nConsigne : ${t.prompt}\n\nRéponse de l'élève :\n${ans}` }]);
    const j = parseJSON(out); const n = addErrors(j.erreurs); touch();
    box.innerHTML = renderCorrection(j) + (n ? `<p class="small muted">${n} erreur${n > 1 ? "s" : ""} ajoutée${n > 1 ? "s" : ""} à « Mes erreurs ».</p>` : "");
  } catch (e) { box.innerHTML = aiError(e); }
  b.disabled = false;
};
A.done = b => { const id = b.dataset.id; if (S.done[id]) delete S.done[id]; else { S.done[id] = todayStr(); touch(); } save(); render(); };

// role-play
const rpSystem = s => `${s.roleplay}
Contexte : ${s.situation}
Ton interlocuteur est ${D.profile.summary}
Règles : parle UNIQUEMENT en français, niveau B1 (phrases courtes et claires). Une seule question ou réplique à la fois, 1 à 3 phrases. Reste dans ton rôle. Ne corrige pas son français pendant la conversation. S'il écrit en anglais, réponds en français et encourage-le à essayer en français.`;
A["rp-start"] = async b => {
  const s = currentScenario(); if (!S.settings.apiKey) { aiError(new Error("NOKEY")); return; }
  RP = { id: s.id, msgs: [] }; render(); const chat = $("#chat");
  chat.innerHTML = `<span class="spinner">…</span>`;
  try {
    const first = await claude(rpSystem(s), [{ role: "user", content: "(Commence la conversation.)" }], 400);
    RP.msgs.push({ role: "assistant", content: first.trim() }); render(); speak(first); $("#rp-in")?.focus();
  } catch (e) { RP = null; render(); $("#chat").innerHTML = aiError(e); }
};
A["rp-send"] = async () => {
  const inp = $("#rp-in"); const txt = inp.value.trim(); if (!txt || !RP) return;
  const s = currentScenario(); RP.msgs.push({ role: "user", content: txt }); render();
  $("#chat").insertAdjacentHTML("beforeend", `<span class="spinner">…</span>`);
  try {
    const msgs = [{ role: "user", content: "(Commence la conversation.)" }, ...RP.msgs];
    const reply = await claude(rpSystem(s), msgs, 400);
    RP.msgs.push({ role: "assistant", content: reply.trim() }); render(); speak(reply); touch();
  } catch (e) { RP.msgs.pop(); render(); $("#rp-in").value = txt; $("#rp-res").innerHTML = aiError(e); }
  const c = $("#chat"); if (c) c.scrollTop = c.scrollHeight; $("#rp-in")?.focus();
};
A["rp-mic"] = () => listen($("#rp-in"));
A["rp-end"] = async b => {
  if (!RP || !RP.msgs.some(m => m.role === "user")) { toast("Answer at least once before ending."); return; }
  const s = currentScenario(); b.disabled = true; $("#rp-res").innerHTML = `<span class="spinner">Évaluation en cours…</span>`;
  const transcript = RP.msgs.map(m => `${m.role === "user" ? "ÉLÈVE" : "INTERLOCUTEUR"} : ${m.content}`).join("\n");
  try {
    const out = await claude(`${TEACHER}\n\n${CORRECT_FORMAT}\nIci, "corrige" = toutes les répliques de l'élève corrigées, une par ligne. "naturel" = la meilleure réplique de l'élève réécrite de façon naturelle. "conseil" peut aussi évaluer le contenu de ses réponses (clarté, structure, ton professionnel).`,
      [{ role: "user", content: `Simulation : ${s.title}\n\n${transcript}` }], 2000);
    const j = parseJSON(out); const n = addErrors(j.erreurs); touch();
    $("#rp-res").innerHTML = renderCorrection(j) + (n ? `<p class="small muted">${n} erreur${n > 1 ? "s" : ""} ajoutée${n > 1 ? "s" : ""} à « Mes erreurs ».</p>` : "") + `<button class="btn" data-act="rp-reset">Nouvelle simulation</button>`;
  } catch (e) { $("#rp-res").innerHTML = aiError(e); }
  b.disabled = false;
};
A["rp-reset"] = () => { RP = null; render(); };

// drills
function drillAnswer(val) {
  if (!DR || DR.answered) return;
  const d = D.drills.find(x => x.id === DR.id); const idx = DR.order[DR.pos]; const it = d.items[idx];
  const norm = x => x.trim().toLowerCase().replace(/[’`]/g, "'");
  const ok = norm(val) === norm(it.a);
  const k = `${DR.id}:${idx}`; const st = S.drills[k] || { r: 0, w: 0 }; ok ? st.r++ : st.w++; S.drills[k] = st;
  if (ok) DR.right++; DR.answered = true; touch(); save();
  document.querySelectorAll(".opt").forEach(o => { o.disabled = true; if (norm(o.dataset.v) === norm(it.a)) o.classList.add("right"); else if (o.dataset.v === val) o.classList.add("wrong"); });
  const inp = $("#drill-in"); if (inp) inp.disabled = true;
  $("#drill-fb").innerHTML = `<div class="feedback"><b style="color:var(${ok ? "--ok" : "--err"})">${ok ? "Correct." : `Réponse : ${esc(it.a)}`}</b><p class="small" style="margin:.3em 0 0">${esc(it.ex)}</p></div>
    <button class="btn primary" style="margin-top:12px" data-act="drill-next">Suivant</button>`;
  $('[data-act="drill-next"]').focus();
}
A["drill-pick"] = b => drillAnswer(b.dataset.v);
A["drill-check"] = () => { const v = $("#drill-in").value; if (v.trim()) drillAnswer(v); };
A["drill-next"] = () => { DR.pos++; DR.answered = false; render(); $("#drill-in")?.focus(); };
A["drill-restart"] = () => { DR = null; render(); };

// vocab
A["card-show"] = () => { VR.shown = true; render(); if (S.settings.vocabDir === "en-fr") speak(VR.queue[VR.pos].fr); };
A.card = b => { gradeCard(VR.queue[VR.pos].id, b.dataset.k === "1"); VR.pos++; VR.shown = false; render(); };

// errors
A["err-del"] = b => { S.errors.splice(+b.dataset.i, 1); save(); render(); };
A["err-copy"] = async () => {
  const list = S.errors.slice(0, 25).map(e => `- « ${e.wrong} » → « ${e.right} » (${e.rule})`).join("\n");
  const p = `${TEACHER}\n\nVoici mes erreurs récentes :\n${list}\n\nCrée-moi 12 exercices courts (phrases à trous et phrases à corriger) sur ces erreurs, dans un contexte de travail de chef de projet en Belgique. Donne les exercices d'abord, puis attends mes réponses avant de corriger.`;
  try { await navigator.clipboard.writeText(p); toast("Copied. Paste it into Claude."); } catch { toast("Couldn't copy."); }
};

// settings
A["test-key"] = async b => {
  b.disabled = true; $("#key-res").innerHTML = `<span class="spinner">Test…</span>`;
  try { const r = await claude("Réponds en une phrase.", [{ role: "user", content: "Dis bonjour à Malick en français." }], 60); $("#key-res").innerHTML = `<p class="small" style="color:var(--ok)">Ça marche : ${esc(r)}</p>`; }
  catch (e) { $("#key-res").innerHTML = aiError(e) || ""; }
  b.disabled = false;
};
A["clear-key"] = () => { S.settings.apiKey = ""; save(); render(); toast("Key removed from this device."); };
A.export = () => {
  const blob = new Blob([JSON.stringify({ ...S, settings: { ...S.settings, apiKey: "" } }, null, 2)], { type: "application/json" });
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `tantot-progression-${todayStr()}.json`; a.click();
};
A.reset = () => { if (confirm("Delete all progress on this device? Your API key is kept.")) { const k = S.settings.apiKey; S = fresh(); S.settings.apiKey = k; save(); render(); } };

document.addEventListener("click", e => { const b = e.target.closest("[data-act]"); if (b && A[b.dataset.act]) { e.preventDefault(); A[b.dataset.act](b); } });
document.addEventListener("input", e => {
  const el = e.target, k = el.dataset.actInput; if (!k) return;
  if (k === "answer") { S.answers[el.dataset.task] = el.value; save(); }
  if (k === "key") { S.settings.apiKey = el.value.trim(); save(); }
  if (k === "model") { S.settings.model = el.value; save(); }
  if (k === "voice") { S.settings.voice = el.value; save(); }
  if (k === "rate") { S.settings.rate = +el.value; $("#ra-v").textContent = el.value; save(); }
});
document.addEventListener("change", e => {
  const el = e.target, k = el.dataset.actInput;
  if (k === "dir") { S.settings.vocabDir = el.value; save(); }
  if (k === "import" && el.files[0]) {
    el.files[0].text().then(t => { const j = JSON.parse(t); const key = S.settings.apiKey; S = Object.assign(fresh(), j); S.settings.apiKey = key; save(); render(); toast("Progress imported."); })
      .catch(() => toast("That file isn't a Tantôt export."));
  }
});
document.addEventListener("keydown", e => {
  if (e.key !== "Enter") return;
  if (e.target.id === "drill-in") { e.preventDefault(); DR && DR.answered ? A["drill-next"]() : A["drill-check"](); }
  if (e.target.id === "rp-in") { e.preventDefault(); A["rp-send"](); }
});

if (synth) synth.onvoiceschanged = () => { if (location.hash.startsWith("#/reglages")) render(); };
if ("serviceWorker" in navigator && location.protocol === "https:") navigator.serviceWorker.register("sw.js");
lastHash = location.hash; render();
})();
