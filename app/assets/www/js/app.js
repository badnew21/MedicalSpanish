/* Medical Spanish: lesson engine, progress tracking and UI. */
(function () {
  'use strict';

  var Native = window.Android || null;
  var appEl = document.getElementById('app');
  var modalEl = document.getElementById('modal');
  var toastEl = document.getElementById('toast');

  // ------------------------------------------------------------------ utils

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function sample(a, n) { return shuffle(a).slice(0, n); }
  function rand(a) { return a[Math.floor(Math.random() * a.length)]; }
  function dayKey(d) {
    d = d || new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  function daysAgo(n) { var d = new Date(); d.setDate(d.getDate() - n); return dayKey(d); }
  function stripAccents(s) { return s.normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  // Lowercase, drop punctuation, collapse whitespace. Keeps accents.
  function clean(s) {
    return String(s).toLowerCase().replace(/[¿?¡!.,;:"()…]/g, ' ').replace(/\s+/g, ' ').trim();
  }
  function loose(s) { return stripAccents(clean(s)).replace(/ñ/g, 'n'); }
  function lev(a, b) {
    var m = a.length, n = b.length, d = [], i, j;
    for (i = 0; i <= m; i++) d[i] = [i];
    for (j = 0; j <= n; j++) d[0][j] = j;
    for (i = 1; i <= m; i++) for (j = 1; j <= n; j++) {
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    return d[m][n];
  }
  function similarity(a, b) {
    a = loose(a); b = loose(b);
    if (!a.length && !b.length) return 1;
    return 1 - lev(a, b) / Math.max(a.length, b.length);
  }
  function stripArticle(s) { return s.replace(/^(el|la|los|las|un|una) /, ''); }
  function tokens(s) {
    return String(s).replace(/[¿?¡!.,;:"]/g, ' ').split(/\s+/).filter(Boolean);
  }

  // ---------------------------------------------------------------- content

  var UNITS = window.UNITS;
  var SCENARIOS = window.SCENARIOS;
  var ITEMS = {};

  UNITS.forEach(function (u, ui) {
    u.index = ui;
    u.words = (u.words || []).map(function (w, i) {
      var p = w.split('|');
      return reg({ key: u.id + ':w' + i, kind: 'word', es: p[0], en: p[1], unit: u });
    });
    u.sentences = (u.sentences || []).map(function (w, i) {
      var p = w.split('|');
      return reg({ key: u.id + ':s' + i, kind: 'sent', es: p[0], en: p[1], unit: u });
    });
    u.drills = (u.drills || []).map(function (w, i) {
      var p = w.split('|');
      return reg({
        key: u.id + ':d' + i, kind: 'drill', q: p[0], a: p[1], wrong: p[2].split(','), en: p[3],
        es: (p[0].indexOf(' = ') >= 0 ? p[0].split(' = ')[1] : p[0]).replace('___', p[1]).replace(/\s*\([^)]*\)\s*$/, ''), unit: u
      });
    });
    u.lessons = [];
    chunk(u.words, 6).forEach(function (c, i, all) {
      u.lessons.push({ kind: 'words', items: c, title: 'Vocabulary' + (all.length > 1 ? ' ' + (i + 1) : '') });
    });
    chunk(u.drills, 5).forEach(function (c, i, all) {
      u.lessons.push({ kind: 'drills', items: c, title: 'Grammar drills' + (all.length > 1 ? ' ' + (i + 1) : '') });
    });
    chunk(u.sentences, 4).forEach(function (c, i, all) {
      u.lessons.push({ kind: 'sentences', items: c, title: 'Phrases' + (all.length > 1 ? ' ' + (i + 1) : '') });
    });
    u.lessons.push({ kind: 'review', items: u.words.concat(u.sentences, u.drills), title: 'Unit review' });
    u.lessons.forEach(function (l, i) { l.unit = u; l.index = i; });
  });

  function reg(item) { ITEMS[item.key] = item; return item; }
  // Splits into groups of about `size`, never leaving a tiny last group.
  function chunk(a, size) {
    if (!a.length) return [];
    var n = Math.max(1, Math.round(a.length / size)), out = [];
    var per = Math.ceil(a.length / n);
    for (var i = 0; i < a.length; i += per) out.push(a.slice(i, i + per));
    return out;
  }

  // ------------------------------------------------------------------ state

  var DEFAULTS = {
    v: 1, xp: 0, daily: {}, streak: 0, best: 0, lastDay: null,
    done: {}, items: {}, scen: {}, ach: {},
    stats: { answered: 0, correct: 0, lessons: 0, perfect: 0, practice: 0, spoken: 0 },
    settings: { goal: 30, rate: 0.85, listen: true, speak: true, sfx: true, unlockAll: false }
  };
  var S = load();

  function load() {
    var raw = '';
    try { raw = Native ? Native.loadState() : localStorage.getItem('medspanish'); } catch (e) { raw = ''; }
    var s;
    try { s = raw ? JSON.parse(raw) : null; } catch (e) { s = null; }
    s = s || {};
    var d = JSON.parse(JSON.stringify(DEFAULTS));
    for (var k in d) if (!(k in s)) s[k] = d[k];
    for (k in d.stats) if (!(k in s.stats)) s.stats[k] = d.stats[k];
    for (k in d.settings) if (!(k in s.settings)) s.settings[k] = d.settings[k];
    return s;
  }
  function save() {
    var json = JSON.stringify(S);
    try { if (Native) Native.saveState(json); else localStorage.setItem('medspanish', json); } catch (e) { /* storage full or blocked */ }
  }

  function currentStreak() {
    if (S.lastDay === dayKey() || S.lastDay === daysAgo(1)) return S.streak;
    return 0;
  }
  function addXp(n) {
    var today = dayKey();
    if (S.lastDay !== today) {
      S.streak = S.lastDay === daysAgo(1) ? S.streak + 1 : 1;
      S.lastDay = today;
      S.best = Math.max(S.best, S.streak);
    }
    S.xp += n;
    S.daily[today] = (S.daily[today] || 0) + n;
    // keep 60 days of history
    var keys = Object.keys(S.daily).sort();
    while (keys.length > 60) delete S.daily[keys.shift()];
  }

  var TITLES = ['Estudiante', 'Estudiante', 'Interno', 'Interno', 'Residente', 'Residente',
    'Residente mayor', 'Residente mayor', 'Médico adjunto', 'Médico adjunto', 'Jefe de urgencias',
    'Jefe de urgencias', 'Jefe de urgencias', 'Leyenda bilingüe'];
  function levelOf(xp) { var n = 1; while (xp >= 25 * n * (n + 1)) n++; return n; }
  function levelStart(n) { return 25 * (n - 1) * n; }
  function titleOf(n) { return TITLES[Math.min(n, TITLES.length) - 1]; }

  // Spaced repetition: strength 0..6 with growing review intervals (hours).
  var INTERVALS = [0, 4, 24, 72, 168, 384, 840];
  function grade(item, ok) {
    if (!item || !item.key) return;
    var r = S.items[item.key] || (S.items[item.key] = { s: 0, d: 0, c: 0, w: 0 });
    if (ok) { r.s = Math.min(r.s + 1, 6); r.c++; } else { r.s = Math.max(r.s - 2, 0); r.w++; }
    r.d = Date.now() + INTERVALS[r.s] * 3600e3;
  }
  function learnedKeys() { return Object.keys(S.items).filter(function (k) { return ITEMS[k]; }); }
  function dueKeys() {
    var now = Date.now();
    return learnedKeys().filter(function (k) { return S.items[k].d <= now; });
  }
  function masteredCount() { return learnedKeys().filter(function (k) { return S.items[k].s >= 4; }).length; }

  function lessonsDone(u) { return S.done[u.id] || 0; }
  function unitComplete(u) { return lessonsDone(u) >= u.lessons.length; }
  function unitUnlocked(u) { return S.settings.unlockAll || u.index === 0 || unitComplete(UNITS[u.index - 1]); }
  function scenarioUnlocked(sc) {
    var u = UNITS.filter(function (x) { return x.id === sc.after; })[0];
    return S.settings.unlockAll || !u || unitComplete(u);
  }
  function nextLesson() {
    for (var i = 0; i < UNITS.length; i++) {
      var u = UNITS[i];
      if (!unitUnlocked(u)) return null;
      if (!unitComplete(u)) return u.lessons[lessonsDone(u)];
    }
    return null;
  }

  // ----------------------------------------------------------- achievements

  var ACHIEVEMENTS = [
    { id: 'first', e: '🌱', name: 'First Steps', desc: 'Finish your first lesson', test: function () { return S.stats.lessons >= 1; } },
    { id: 'perfect', e: '💯', name: 'Flawless', desc: 'Finish a lesson with no mistakes', test: function () { return S.stats.perfect >= 1; } },
    { id: 's3', e: '🔥', name: 'On Fire', desc: '3-day streak', test: function () { return S.best >= 3; } },
    { id: 's7', e: '📅', name: 'Week Strong', desc: '7-day streak', test: function () { return S.best >= 7; } },
    { id: 's30', e: '🏆', name: 'Habit Formed', desc: '30-day streak', test: function () { return S.best >= 30; } },
    { id: 'w50', e: '📗', name: 'Vocabulario', desc: 'Learn 50 words & phrases', test: function () { return learnedKeys().length >= 50; } },
    { id: 'w200', e: '📚', name: 'Bookworm', desc: 'Learn 200 words & phrases', test: function () { return learnedKeys().length >= 200; } },
    { id: 'm100', e: '🧠', name: 'Long-Term Memory', desc: 'Master 100 items', test: function () { return masteredCount() >= 100; } },
    { id: 'l5', e: '🩺', name: 'Residente', desc: 'Reach level 5', test: function () { return levelOf(S.xp) >= 5; } },
    { id: 'l10', e: '🏥', name: 'Jefe', desc: 'Reach level 11', test: function () { return levelOf(S.xp) >= 11; } },
    { id: 'talk1', e: '💬', name: 'Bedside Manner', desc: 'Complete a conversation', test: function () { return Object.keys(S.scen).length >= 1; } },
    { id: 'talkAll', e: '🗣️', name: 'Fluent in the ED', desc: 'Complete every conversation', test: function () { return Object.keys(S.scen).length >= SCENARIOS.length; } },
    { id: 'speak10', e: '🎤', name: 'Out Loud', desc: 'Say 10 phrases correctly', test: function () { return S.stats.spoken >= 10; } },
    { id: 'prac5', e: '🔁', name: 'Review Regular', desc: 'Finish 5 practice sessions', test: function () { return S.stats.practice >= 5; } },
    { id: 'med', e: '🚑', name: 'ED Ready', desc: 'Complete every medical unit', test: function () {
      return UNITS.every(function (u) { return u.track !== 'medical' || unitComplete(u); });
    } },
    { id: 'all', e: '🎓', name: 'Graduado', desc: 'Complete the whole course', test: function () { return UNITS.every(unitComplete); } }
  ];
  function checkAchievements() {
    var fresh = [];
    ACHIEVEMENTS.forEach(function (a) {
      if (!S.ach[a.id] && a.test()) { S.ach[a.id] = Date.now(); fresh.push(a); }
    });
    return fresh;
  }

  // ------------------------------------------------------------------ audio

  var ttsOk = false;
  function hasTTS() {
    if (Native) { try { return Native.isTtsReady(); } catch (e) { return false; } }
    return 'speechSynthesis' in window;
  }
  function audioOn() { return S.settings.listen && (ttsOk || hasTTS()); }
  function speak(text, slow) {
    var rate = S.settings.rate * (slow ? 0.6 : 1);
    if (Native) { try { Native.speak(text, rate); } catch (e) { } return; }
    if (!('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text);
    u.lang = 'es-MX'; u.rate = rate;
    var v = speechSynthesis.getVoices().filter(function (v) { return /^es/i.test(v.lang); });
    if (v.length) u.voice = v.filter(function (x) { return /MX|US|419/.test(x.lang); })[0] || v[0];
    speechSynthesis.speak(u);
  }
  window.onTtsReady = function (ok) { ttsOk = ok; if (view.screen === 'home') render(); };

  var speechCb = null;
  var BrowserRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  function canListen() {
    if (Native) { try { return Native.canListen(); } catch (e) { return false; } }
    return !!BrowserRec;
  }
  var speakSnoozedUntil = 0;
  function speakOn() { return S.settings.speak && Date.now() > speakSnoozedUntil && canListen(); }
  function listen(prompt, cb) {
    speechCb = cb;
    if (Native) { Native.listen(prompt); return; }
    var r = new BrowserRec();
    r.lang = 'es-MX'; r.maxAlternatives = 5;
    r.onresult = function (e) {
      var out = [];
      for (var i = 0; i < e.results[0].length; i++) out.push(e.results[0][i].transcript);
      window.onSpeechResult(out);
    };
    r.onerror = function (e) { window.onSpeechError(e.error); };
    r.start();
  }
  window.onSpeechResult = function (arr) { var cb = speechCb; speechCb = null; if (cb) cb(arr || []); };
  window.onSpeechError = function () { var cb = speechCb; speechCb = null; if (cb) cb(null); };

  var actx = null;
  function sfx(ok) {
    if (!S.settings.sfx) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      var notes = ok ? [660, 880] : [220, 180];
      notes.forEach(function (f, i) {
        var o = actx.createOscillator(), g = actx.createGain();
        o.type = ok ? 'sine' : 'square';
        o.frequency.value = f;
        var t = actx.currentTime + i * 0.1;
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(ok ? 0.2 : 0.06, t + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
        o.connect(g); g.connect(actx.destination);
        o.start(t); o.stop(t + 0.18);
      });
    } catch (e) { /* audio unavailable */ }
  }

  // ------------------------------------------------------------ UI helpers

  var view = { screen: 'home', tab: 'learn', unit: null, refTab: 'phrases', query: '' };

  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.remove('hidden');
    clearTimeout(toast.t);
    toast.t = setTimeout(function () { toastEl.classList.add('hidden'); }, 2200);
  }
  function modal(html) {
    modalEl.innerHTML = '<div class="box">' + html + '</div>';
    modalEl.classList.remove('hidden');
  }
  function closeModal() { modalEl.classList.add('hidden'); modalEl.innerHTML = ''; }
  modalEl.addEventListener('click', function (e) { if (e.target === modalEl) closeModal(); });
  function confirmBox(title, body, okLabel, onOk, danger) {
    modal('<h3>' + esc(title) + '</h3><p class="muted">' + esc(body) + '</p>' +
      '<button class="btn ' + (danger ? 'danger' : '') + '" data-act="modal-ok">' + esc(okLabel) + '</button>' +
      '<button class="btn ghost" data-act="modal-close">Cancel</button>');
    actions['modal-ok'] = function () { closeModal(); onOk(); };
  }
  function spk(text) {
    return audioOn() ? '<button class="speak-btn" data-act="say" data-t="' + esc(text) + '">🔊</button>' : '';
  }

  var actions = {};
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-act]');
    if (!t) return;
    var fn = actions[t.dataset.act];
    if (fn) fn(t.dataset, t, e);
  });
  actions.say = function (d) { speak(d.t, d.slow === '1'); };
  actions['modal-close'] = closeModal;
  actions.tab = function (d) { view.tab = d.tab; view.screen = 'home'; render(); window.scrollTo(0, 0); };

  // ---------------------------------------------------------------- screens

  function render() {
    if (view.screen === 'home') renderHome();
    else if (view.screen === 'unit') renderUnit();
  }

  function topbar() {
    var lvl = levelOf(S.xp), st = currentStreak();
    return '<div class="topbar"><div class="title">Medical Spanish</div>' +
      '<span class="chip streak ' + (st ? '' : 'off') + '">🔥 ' + st + '</span>' +
      '<span class="chip xp">⭐ ' + S.xp + '</span>' +
      '<span class="chip lvl">Lv ' + lvl + '</span></div>';
  }
  function tabs() {
    var due = dueKeys().length;
    var t = [['learn', '🏠', 'Learn'], ['practice', '🔁', 'Practice'], ['talk', '💬', 'Talk'], ['ref', '📖', 'Phrases'], ['me', '👤', 'Me']];
    return '<nav class="tabs">' + t.map(function (x) {
      var badge = x[0] === 'practice' && due ? '<span class="badge">' + Math.min(due, 99) + '</span>' : '';
      return '<button class="' + (view.tab === x[0] ? 'on' : '') + '" data-act="tab" data-tab="' + x[0] + '"><span class="ic">' + x[1] + '</span>' + x[2] + badge + '</button>';
    }).join('') + '</nav>';
  }

  function renderHome() {
    var body = { learn: learnTab, practice: practiceTab, talk: talkTab, ref: refTab, me: meTab }[view.tab]();
    appEl.innerHTML = topbar() + '<div class="content">' + body + '</div>' + tabs();
    if (view.tab === 'ref') bindSearch();
  }

  function voiceBanner() {
    if (!Native || hasTTS()) return '';
    return '<div class="banner">🔇 No Spanish voice found, so listening exercises are off. <button data-act="install-voice">Install a Spanish voice</button> in your phone\'s text-to-speech settings, then reopen the app.</div>';
  }
  actions['install-voice'] = function () { if (Native) Native.installVoices(); };

  function learnTab() {
    var today = S.daily[dayKey()] || 0, goal = S.settings.goal;
    var pct = Math.min(100, Math.round(today / goal * 100));
    var next = nextLesson();
    var h = voiceBanner();
    h += '<div class="card goal"><div class="ring" style="--p:' + pct + '"><span>' + pct + '%</span></div>' +
      '<div class="grow"><b>Daily goal</b><div class="muted small">' + today + ' / ' + goal + ' XP today</div>' +
      (next ? '<button class="btn small" data-act="start-lesson" data-u="' + next.unit.index + '" data-l="' + next.index + '">' +
        (S.stats.lessons ? 'Continue' : 'Start') + ': ' + esc(next.unit.title) + '</button>' : '') + '</div></div>';
    var lastTrack = null;
    UNITS.forEach(function (u) {
      var done = lessonsDone(u), total = u.lessons.length;
      var locked = !unitUnlocked(u), complete = unitComplete(u);
      h += '<div class="card unit ' + (locked ? 'locked' : '') + (complete ? ' complete' : '') + '" data-act="open-unit" data-u="' + u.index + '">' +
        '<div class="icon">' + (locked ? '🔒' : u.icon) + '</div><div class="grow">' +
        '<div class="row"><span class="name grow">' + esc(u.title) + '</span><span class="tag ' + u.track + '">' + u.track + '</span></div>' +
        '<div class="bar"><i style="width:' + Math.round(Math.min(done, total) / total * 100) + '%"></i></div>' +
        '<div class="muted small">' + (complete ? 'Complete ✓' : Math.min(done, total) + ' / ' + total + ' lessons') + '</div></div></div>';
      lastTrack = u.track;
    });
    return h;
  }

  actions['open-unit'] = function (d) {
    var u = UNITS[+d.u];
    if (!unitUnlocked(u)) {
      var prev = UNITS[u.index - 1];
      modal('<h3>🔒 ' + esc(u.title) + '</h3><p class="muted">Finish <b>' + esc(prev.title) + '</b> to unlock this unit. Already know the basics? You can open every unit right now.</p>' +
        '<button class="btn" data-act="unlock-all">Unlock all units</button><button class="btn ghost" data-act="modal-close">Not now</button>');
      return;
    }
    view.screen = 'unit'; view.unit = u; render(); window.scrollTo(0, 0);
  };
  actions['unlock-all'] = function () { S.settings.unlockAll = true; save(); closeModal(); render(); toast('All units unlocked'); };

  function renderUnit() {
    var u = view.unit, done = lessonsDone(u);
    var h = '<div class="topbar"><button class="x" data-act="home" style="font-size:22px">←</button><div class="title">' + u.icon + ' ' + esc(u.title) + '</div></div><div class="content">';
    h += '<div class="card tip"><b>📝 Notes</b>' + u.tip + '</div>';
    h += '<div class="card">';
    u.lessons.forEach(function (l, i) {
      var cls = i < done ? 'done' : (i === done ? 'next' : '');
      var avail = i <= done || S.settings.unlockAll;
      h += '<div class="lesson-row ' + cls + '"><div class="dot">' + (i < done ? '★' : i + 1) + '</div><div class="grow"><b>' + esc(l.title) + '</b>' +
        '<div class="muted small">' + lessonDesc(l) + '</div></div>' +
        (avail ? '<button class="btn" data-act="start-lesson" data-u="' + u.index + '" data-l="' + i + '">' + (i < done ? 'Redo' : 'Start') + '</button>' : '<span>🔒</span>') + '</div>';
    });
    h += '</div>';
    h += '<h2>All words & phrases</h2><div class="card">' + u.words.concat(u.sentences).map(phraseRow).join('') + '</div>';
    h += '</div>';
    appEl.innerHTML = h;
  }
  function lessonDesc(l) {
    if (l.kind === 'review') return 'Mixed quiz on the whole unit';
    var ex = l.items.slice(0, 3).map(function (i) { return i.kind === 'drill' ? i.a : i.es; });
    return esc(ex.join(', ')) + (l.items.length > 3 ? '…' : '');
  }
  function phraseRow(i) {
    return '<div class="phrase"><div class="grow"><div class="es">' + esc(i.es) + '</div><div class="en">' + esc(i.en) + '</div></div>' + spk(i.es) + '</div>';
  }
  actions.home = function () { view.screen = 'home'; render(); window.scrollTo(0, 0); };

  function practiceTab() {
    var learned = learnedKeys().length, due = dueKeys().length;
    var h = '<h1>Practice</h1>';
    h += '<div class="card"><div class="row"><div class="grow"><b>🧠 Smart review</b><div class="muted small">' +
      (learned ? due + ' item' + (due === 1 ? '' : 's') + ' due · spaced repetition picks what you\'re about to forget' : 'Finish a lesson to start building your review deck') +
      '</div></div></div><button class="btn" data-act="practice" data-mode="smart" ' + (learned ? '' : 'disabled') + '>Start review</button></div>';
    h += '<div class="card"><b>❌ Weak spots</b><div class="muted small">Items you\'ve missed the most</div>' +
      '<button class="btn ghost" data-act="practice" data-mode="weak" ' + (weakKeys().length ? '' : 'disabled') + '>Practice mistakes</button></div>';
    h += '<div class="card"><b>👂 Listening</b><div class="muted small">Hear it, pick it, type it</div>' +
      '<button class="btn ghost" data-act="practice" data-mode="listen" ' + (learned && audioOn() ? '' : 'disabled') + '>Listening drill</button></div>';
    h += '<div class="card"><b>🎤 Speaking</b><div class="muted small">Say phrases out loud and get checked by speech recognition</div>' +
      '<button class="btn ghost" data-act="practice" data-mode="speak" ' + (learned && canListen() && S.settings.speak ? '' : 'disabled') + '>Speaking drill</button>' +
      (canListen() ? '' : '<div class="muted small" style="margin-top:6px">Speech recognition isn\'t available on this device.</div>') + '</div>';
    h += '<div class="card"><b>⚡ Medical rapid-fire</b><div class="muted small">Random questions from every medical unit you\'ve unlocked</div>' +
      '<button class="btn ghost" data-act="practice" data-mode="medical">Rapid-fire</button></div>';
    return h;
  }
  function weakKeys() {
    return learnedKeys().filter(function (k) { return S.items[k].w > 0; })
      .sort(function (a, b) { return (S.items[b].w - S.items[b].c / 3) - (S.items[a].w - S.items[a].c / 3); });
  }

  function talkTab() {
    var h = '<h1>Talk</h1><p class="muted">Role-play real ED encounters. Read or listen to the patient, then choose (or say) what you\'d answer.</p>';
    SCENARIOS.forEach(function (sc, i) {
      var open = scenarioUnlocked(sc), best = S.scen[sc.id];
      var after = UNITS.filter(function (u) { return u.id === sc.after; })[0];
      h += '<div class="card unit ' + (open ? '' : 'locked') + '" data-act="start-scenario" data-i="' + i + '">' +
        '<div class="icon">' + (open ? sc.icon : '🔒') + '</div><div class="grow"><div class="name">' + esc(sc.title) + '</div>' +
        '<div class="muted small">' + esc(sc.desc) + '</div>' +
        '<div class="small" style="margin-top:4px">' + (open ? (best != null ? '🏅 Best: ' + best + '%' : 'Not tried yet') : 'Unlocks after: ' + esc(after.title)) + '</div></div></div>';
    });
    return h;
  }

  function refTab() {
    var h = '<div class="seg"><button class="' + (view.refTab === 'phrases' ? 'on' : '') + '" data-act="reftab" data-t="phrases">Phrasebook</button>' +
      '<button class="' + (view.refTab === 'grammar' ? 'on' : '') + '" data-act="reftab" data-t="grammar">Grammar notes</button></div>';
    if (view.refTab === 'phrases') {
      h += '<input class="search" id="search" placeholder="Search Spanish or English…" value="' + esc(view.query) + '">';
      h += '<div id="ref-list">' + refList() + '</div>';
    } else {
      UNITS.forEach(function (u) {
        h += '<details class="card group tip"><summary>' + u.icon + ' ' + esc(u.title) + '</summary>' + u.tip + '</details>';
      });
    }
    return h;
  }
  function refList() {
    var q = loose(view.query), h = '';
    UNITS.forEach(function (u) {
      var rows = u.words.concat(u.sentences).filter(function (i) {
        return !q || loose(i.es).indexOf(q) >= 0 || loose(i.en).indexOf(q) >= 0;
      });
      if (!rows.length) return;
      h += '<details class="card group" ' + (q ? 'open' : '') + '><summary>' + u.icon + ' ' + esc(u.title) + ' <span class="muted small">(' + rows.length + ')</span></summary>' +
        rows.map(phraseRow).join('') + '</details>';
    });
    return h || '<p class="muted">No matches.</p>';
  }
  function bindSearch() {
    var s = document.getElementById('search');
    if (!s) return;
    s.addEventListener('input', function () {
      view.query = s.value;
      document.getElementById('ref-list').innerHTML = refList();
    });
  }
  actions.reftab = function (d) { view.refTab = d.t; render(); };

  function meTab() {
    var lvl = levelOf(S.xp), a = levelStart(lvl), b = levelStart(lvl + 1);
    var acc = S.stats.answered ? Math.round(S.stats.correct / S.stats.answered * 100) : 0;
    var h = '<div class="card" style="text-align:center"><div style="font-size:44px">🩺</div><h1 style="margin:4px 0">Level ' + lvl + '</h1>' +
      '<div class="muted"><b>' + titleOf(lvl) + '</b></div><div class="bar" style="height:12px;margin-top:12px"><i style="width:' + Math.round((S.xp - a) / (b - a) * 100) + '%"></i></div>' +
      '<div class="muted small" style="margin-top:4px">' + (S.xp - a) + ' / ' + (b - a) + ' XP to level ' + (lvl + 1) + '</div></div>';
    var unitsDone = UNITS.filter(unitComplete).length;
    h += '<div class="grid2">' +
      stat('🔥', currentStreak(), 'Day streak') + stat('🏅', S.best, 'Best streak') +
      stat('⭐', S.xp, 'Total XP') + stat('🎯', acc + '%', 'Accuracy') +
      stat('📗', learnedKeys().length, 'Words & phrases seen') + stat('🧠', masteredCount(), 'Mastered') +
      stat('✅', S.stats.lessons, 'Lessons done') + stat('📘', unitsDone + '/' + UNITS.length, 'Units complete') +
      '</div>';
    h += '<h2>Last 7 days</h2><div class="card"><div class="chart">';
    var vals = [], max = S.settings.goal;
    for (var i = 6; i >= 0; i--) { var v = S.daily[daysAgo(i)] || 0; vals.push(v); max = Math.max(max, v); }
    var names = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    vals.forEach(function (v, j) {
      var d = new Date(); d.setDate(d.getDate() - (6 - j));
      h += '<div class="col ' + (j === 6 ? 'today' : '') + '"><span>' + (v || '') + '</span><i style="height:' + Math.round(v / max * 85) + '%"></i>' + names[d.getDay()] + '</div>';
    });
    h += '</div></div>';
    h += '<h2>Achievements</h2><div class="achs">' + ACHIEVEMENTS.map(function (x) {
      return '<div class="ach ' + (S.ach[x.id] ? '' : 'off') + '"><span class="e">' + x.e + '</span><b>' + esc(x.name) + '</b><div class="muted">' + esc(x.desc) + '</div></div>';
    }).join('') + '</div>';
    h += '<h2>Settings</h2><div class="card">' +
      '<div class="setting"><span>Daily goal</span><select id="goal">' + [10, 20, 30, 50, 80].map(function (g) {
        return '<option value="' + g + '" ' + (S.settings.goal === g ? 'selected' : '') + '>' + g + ' XP</option>';
      }).join('') + '</select></div>' +
      '<div class="setting"><span>Voice speed</span><input type="range" id="rate" min="0.5" max="1.2" step="0.05" value="' + S.settings.rate + '"></div>' +
      toggle('listen', 'Listening exercises') + toggle('speak', 'Speaking exercises') + toggle('sfx', 'Sound effects') +
      toggle('unlockAll', 'Unlock all units') +
      (Native ? '<div class="setting"><span>Spanish voice' + (hasTTS() ? ' ✓' : ' (missing)') + '</span><button class="btn small ghost" style="width:auto" data-act="install-voice">Voice settings</button></div>' : '') +
      '<div class="setting"><span>Test the voice</span><button class="btn small ghost" style="width:auto" data-act="say" data-t="Hola, soy su enfermera. ¿Dónde le duele?">🔊 Play</button></div>' +
      '</div><button class="btn danger" data-act="reset">Reset all progress</button>' +
      '<p class="muted small" style="margin-top:16px">For learning and rapport only. Use a qualified medical interpreter for consent, bad news and complex discussions.</p>';
    setTimeout(bindSettings, 0);
    return h;
  }
  function stat(e, v, label) { return '<div class="stat"><b>' + e + ' ' + v + '</b><span>' + label + '</span></div>'; }
  function toggle(key, label) {
    return '<div class="setting"><span>' + label + '</span><button class="switch ' + (S.settings[key] ? 'on' : '') + '" data-act="toggle" data-k="' + key + '"></button></div>';
  }
  function bindSettings() {
    var g = document.getElementById('goal'), r = document.getElementById('rate');
    if (g) g.onchange = function () { S.settings.goal = +g.value; save(); };
    if (r) r.onchange = function () { S.settings.rate = +r.value; save(); speak('Respire profundo, por favor.'); };
  }
  actions.toggle = function (d, t) { S.settings[d.k] = !S.settings[d.k]; t.classList.toggle('on'); save(); };
  actions.reset = function () {
    confirmBox('Reset progress?', 'This erases your XP, streak, lessons and review history. It can\'t be undone.', 'Reset everything', function () {
      var keep = S.settings;
      S = JSON.parse(JSON.stringify(DEFAULTS));
      S.settings = keep;
      save(); render(); toast('Progress reset');
    }, true);
  };

  // ---------------------------------------------------- exercise generation

  var PRAISE = ['¡Muy bien!', '¡Excelente!', '¡Perfecto!', '¡Así se hace!', '¡Correcto!', '¡Bien hecho!'];

  function pool(item) {
    // same-kind items from this unit, padded with neighbours if the unit is small
    var u = item.unit, list = sameKind(u, item.kind), k = 1;
    while (list.length < 6 && (u.index - k >= 0 || u.index + k < UNITS.length)) {
      if (UNITS[u.index - k]) list = list.concat(sameKind(UNITS[u.index - k], item.kind));
      if (UNITS[u.index + k]) list = list.concat(sameKind(UNITS[u.index + k], item.kind));
      k++;
    }
    return list.filter(function (x) { return x !== item; });
  }
  function sameKind(u, kind) { return kind === 'word' ? u.words : kind === 'sent' ? u.sentences : u.drills; }
  function distractors(item, field, n) {
    var seen = {}, out = [];
    seen[loose(item[field])] = 1;
    shuffle(pool(item)).forEach(function (x) {
      var v = x[field], k = loose(v);
      if (out.length < n && !seen[k]) { seen[k] = 1; out.push(v); }
    });
    return out;
  }

  function ex(type, item, extra) { var e = { t: type, item: item }; for (var k in extra) e[k] = extra[k]; return e; }

  function mcqEsEn(item) {
    return ex('mcq', item, { instr: 'What does this mean?', prompt: item.es, audio: item.es, options: shuffle([item.en].concat(distractors(item, 'en', 3))), answer: item.en });
  }
  function mcqEnEs(item) {
    return ex('mcq', item, { instr: 'How do you say this in Spanish?', prompt: item.en, options: shuffle([item.es].concat(distractors(item, 'es', 3))), answer: item.es, optAudio: true });
  }
  function listenMcq(item) {
    return ex('mcq', item, { instr: 'What do you hear?', audio: item.es, hidePrompt: true, options: shuffle([item.es].concat(distractors(item, 'es', 3))), answer: item.es });
  }
  function typeEs(item) {
    return ex('type', item, { instr: 'Write this in Spanish', prompt: item.en, answer: item.es });
  }
  function dictation(item) {
    return ex('type', item, { instr: 'Type what you hear', audio: item.es, hidePrompt: true, answer: item.es });
  }
  function buildEx(item, lang, listenOnly) {
    var target = lang === 'es' ? item.es : item.en;
    var other = [];
    pool(item).forEach(function (x) { other = other.concat(tokens(lang === 'es' ? x.es : x.en)); });
    var have = {};
    tokens(target).forEach(function (t) { have[t.toLowerCase()] = 1; });
    var extra = [];
    shuffle(other).forEach(function (t) {
      if (extra.length < 3 && !have[t.toLowerCase()]) { have[t.toLowerCase()] = 1; extra.push(t); }
    });
    return ex('build', item, {
      instr: listenOnly ? 'Tap what you hear' : lang === 'es' ? 'Translate into Spanish' : 'Translate into English',
      prompt: listenOnly ? null : (lang === 'es' ? item.en : item.es),
      audio: lang === 'en' || listenOnly ? item.es : null, hidePrompt: listenOnly,
      answer: target, bank: shuffle(tokens(target).concat(extra))
    });
  }
  function speakEx(item) { return ex('speak', item, { instr: 'Say this in Spanish', text: item.es, en: item.en }); }
  function fillEx(item) { return ex('fill', item, { instr: 'Fill in the blank', options: shuffle([item.a].concat(item.wrong)), answer: item.a }); }
  function matchEx(items) {
    return { t: 'match', items: items, left: shuffle(items), right: shuffle(items) };
  }

  // A "hard" exercise for review: production rather than recognition.
  function reviewEx(item, mode) {
    if (item.kind === 'drill') return fillEx(item);
    var opts = [];
    if (mode === 'listen') {
      opts = [listenMcq, dictation];
      if (item.kind === 'sent') opts.push(function (i) { return buildEx(i, 'es', true); });
    } else if (mode === 'speak') {
      opts = [speakEx];
    } else {
      opts = [mcqEnEs, mcqEsEn];
      if (item.kind === 'word' && item.es.length < 22) opts.push(typeEs);
      if (item.kind === 'sent' && tokens(item.es).length <= 9) opts.push(function (i) { return buildEx(i, 'es'); }, function (i) { return buildEx(i, 'en'); });
      if (audioOn()) opts.push(listenMcq);
      if (audioOn() && tokens(item.es).length <= 6) opts.push(dictation);
      if (speakOn()) opts.push(speakEx);
    }
    return rand(opts)(item);
  }

  function buildLesson(lesson) {
    var q = [], items = lesson.items;
    if (lesson.kind === 'words') {
      items.forEach(function (it) {
        q.push(ex('intro', it, {}));
        q.push(audioOn() && Math.random() < 0.4 ? listenMcq(it) : mcqEsEn(it));
      });
      if (items.length >= 4) q.push(matchEx(sample(items, Math.min(5, items.length))));
      var second = items.map(function (it) {
        var o = [mcqEnEs];
        if (it.es.length < 22) o.push(typeEs);
        if (audioOn() && it.es.length < 22) o.push(dictation);
        if (speakOn()) o.push(speakEx);
        return rand(o)(it);
      });
      q = q.concat(shuffle(second.concat(reviewFromEarlier(lesson, 2))));
    } else if (lesson.kind === 'sentences') {
      items.forEach(function (it) {
        q.push(ex('intro', it, {}));
        q.push(tokens(it.en).length <= 10 ? buildEx(it, 'en') : mcqEsEn(it));
      });
      var more = items.map(function (it) {
        var o = [];
        if (tokens(it.es).length <= 9) o.push(function (i) { return buildEx(i, 'es'); });
        else o.push(mcqEnEs);
        if (audioOn() && tokens(it.es).length <= 9) o.push(function (i) { return buildEx(i, 'es', true); });
        if (speakOn()) o.push(speakEx);
        return rand(o)(it);
      });
      q = q.concat(shuffle(more.concat(reviewFromEarlier(lesson, 2))));
    } else if (lesson.kind === 'drills') {
      q = shuffle(items).map(fillEx);
      // second pass on a couple of drills, then some unit vocabulary
      q = q.concat(sample(items, Math.min(2, items.length)).map(fillEx));
      q = q.concat(reviewFromEarlier(lesson, 3));
    } else {
      // unit review
      var pick = sample(items, 12);
      var words = items.filter(function (i) { return i.kind === 'word'; });
      q = pick.map(function (i) { return reviewEx(i); });
      if (words.length >= 5) q.splice(4, 0, matchEx(sample(words, 5)));
    }
    return q;
  }
  // Earlier material from this unit (or the previous one) to mix in.
  function reviewFromEarlier(lesson, n) {
    var u = lesson.unit, prior = [];
    for (var i = 0; i < lesson.index; i++) prior = prior.concat(u.lessons[i].items);
    if (prior.length < n && u.index > 0) prior = prior.concat(UNITS[u.index - 1].words, UNITS[u.index - 1].sentences);
    prior = prior.filter(function (x) { return lesson.items.indexOf(x) < 0; });
    return sample(prior, n).map(function (i) { return reviewEx(i); });
  }

  function buildPractice(mode) {
    var keys;
    if (mode === 'smart') {
      var now = Date.now();
      keys = learnedKeys().sort(function (a, b) {
        var A = S.items[a], B = S.items[b];
        var ad = A.d <= now, bd = B.d <= now;
        if (ad !== bd) return ad ? -1 : 1;
        return A.s - B.s || A.d - B.d;
      }).slice(0, 12);
    } else if (mode === 'weak') {
      keys = weakKeys().slice(0, 12);
    } else if (mode === 'medical') {
      var pool = [];
      UNITS.forEach(function (u) { if (u.track === 'medical' && unitUnlocked(u)) pool = pool.concat(u.words, u.sentences); });
      return sample(pool, 12).map(function (i) { return reviewEx(i); });
    } else {
      keys = sample(learnedKeys().filter(function (k) { return ITEMS[k].kind !== 'drill'; }), 10);
    }
    return shuffle(keys).map(function (k) { return reviewEx(ITEMS[k], mode); });
  }

  // ---------------------------------------------------------- lesson runner

  var L = null; // active session

  actions['start-lesson'] = function (d) {
    var lesson = UNITS[+d.u].lessons[+d.l];
    view.unit = lesson.unit;
    startSession({ kind: 'lesson', lesson: lesson, queue: buildLesson(lesson) });
  };
  actions.practice = function (d) {
    var q = buildPractice(d.mode);
    if (!q.length) { toast('Nothing to practice yet'); return; }
    startSession({ kind: 'practice', mode: d.mode, queue: q });
  };

  function startSession(s) {
    s.queue.forEach(function (e, i) { e.uid = i; });
    s.total = s.queue.length; s.doneUids = {}; s.mistakes = 0; s.firstTry = 0; s.graded = 0;
    s.start = Date.now(); s.level0 = levelOf(S.xp);
    L = s;
    view.screen = 'lesson';
    showExercise();
  }

  function progressPct() { return Math.round(Object.keys(L.doneUids).length / L.total * 100); }

  function lessonShell(inner, footer) {
    appEl.innerHTML = '<div class="lesson"><div class="lesson-top"><button class="x" data-act="quit">✕</button>' +
      '<div class="bar"><i style="width:' + progressPct() + '%"></i></div></div>' +
      '<div class="lesson-body">' + inner + '</div><div class="lesson-foot" id="foot">' + (footer || '') + '</div></div>';
    window.scrollTo(0, 0);
  }

  actions.quit = function () {
    confirmBox('Quit this lesson?', 'Your progress in this lesson will be lost.', 'Quit', endSessionEarly, true);
  };
  function endSessionEarly() {
    var fb = document.querySelector('.feedback');
    if (fb) fb.remove();
    L = null; S0 = null; view.screen = 'home'; render();
  }

  var S0 = null; // per-exercise UI state

  function showExercise() {
    if (!L.queue.length) return finishSession();
    var e = L.queue[0];
    S0 = { e: e, sel: null, built: [], answered: false };
    ({ intro: showIntro, mcq: showMcq, build: showBuild, type: showType, match: showMatch, speak: showSpeak, fill: showFill })[e.t](e);
  }

  function audioControls(text) {
    if (!audioOn()) return '';
    return '<div class="audio-row"><button class="big-audio" data-act="say" data-t="' + esc(text) + '">🔊</button>' +
      '<button class="big-audio slow" data-act="say" data-slow="1" data-t="' + esc(text) + '">🐢</button></div>';
  }
  function checkBtn(disabled) {
    return '<button class="btn" id="check" data-act="check" ' + (disabled ? 'disabled' : '') + '>Check</button>';
  }
  function enableCheck(on) { var b = document.getElementById('check'); if (b) b.disabled = !on; }

  function showIntro(e) {
    var it = e.item;
    lessonShell('<div class="card intro-card"><span class="new-pill">NEW ' + (it.kind === 'word' ? 'WORD' : 'PHRASE') + '</span>' +
      '<div class="es">' + esc(it.es) + '</div><div class="en">' + esc(it.en) + '</div>' + audioControls(it.es) + '</div>',
      '<button class="btn" data-act="intro-next">Got it</button>');
    if (audioOn()) setTimeout(function () { speak(it.es); }, 250);
  }
  actions['intro-next'] = function () {
    grade(S0.e.item, true);
    L.doneUids[S0.e.uid] = 1;
    L.queue.shift();
    save();
    showExercise();
  };

  function showMcq(e) {
    var h = '<div class="instr">' + esc(e.instr) + '</div>';
    if (e.hidePrompt) h += audioControls(e.audio);
    else h += '<div class="prompt">' + (e.audio && audioOn() ? '<button class="speak-btn" data-act="say" data-t="' + esc(e.audio) + '">🔊</button>' : '') +
      '<div class="bubble">' + esc(e.prompt) + '</div></div>';
    h += '<div class="options">' + e.options.map(function (o, i) {
      return '<button class="opt" data-act="pick" data-i="' + i + '">' + esc(o) + '</button>';
    }).join('') + '</div>';
    lessonShell(h, checkBtn(true));
    if (e.audio && audioOn()) setTimeout(function () { speak(e.audio); }, 250);
  }
  actions.pick = function (d, t) {
    if (S0.answered) return;
    document.querySelectorAll('.opt').forEach(function (o) { o.classList.remove('sel'); });
    t.classList.add('sel');
    S0.sel = +d.i;
    if (S0.e.optAudio && audioOn()) speak(S0.e.options[S0.sel]);
    enableCheck(true);
  };

  function showFill(e) {
    var it = e.item;
    var q = esc(it.q).replace('___', '<span class="blank" id="blank">&nbsp;</span>');
    var h = '<div class="instr">' + esc(e.instr) + '</div><div class="fill-q">' + q + '</div>' +
      '<div class="muted" style="margin-bottom:16px">' + esc(it.en) + '</div>' +
      '<div class="options">' + e.options.map(function (o, i) {
        return '<button class="opt" data-act="pick-fill" data-i="' + i + '">' + esc(o) + '</button>';
      }).join('') + '</div>' +
      '<button class="btn ghost small" style="margin-top:16px" data-act="show-tip">📝 Grammar notes</button>';
    lessonShell(h, checkBtn(true));
  }
  actions['pick-fill'] = function (d, t) {
    actions.pick(d, t);
    document.getElementById('blank').textContent = S0.e.options[+d.i];
  };
  actions['show-tip'] = function () {
    modal('<h3>' + esc(S0.e.item.unit.title) + '</h3><div class="tip">' + S0.e.item.unit.tip + '</div><button class="btn" data-act="modal-close">Close</button>');
  };

  function showBuild(e) {
    var h = '<div class="instr">' + esc(e.instr) + '</div>';
    if (e.hidePrompt) h += audioControls(e.audio);
    else h += '<div class="prompt">' + (e.audio && audioOn() ? '<button class="speak-btn" data-act="say" data-t="' + esc(e.audio) + '">🔊</button>' : '') +
      '<div class="bubble">' + esc(e.prompt) + '</div></div>';
    h += '<div class="answer-area" id="area"></div><div class="bank">' + e.bank.map(function (t, i) {
      return '<button class="tok" data-act="tok" data-i="' + i + '">' + esc(t) + '</button>';
    }).join('') + '</div>';
    lessonShell(h, checkBtn(true));
    if (e.audio && audioOn()) setTimeout(function () { speak(e.audio); }, 250);
  }
  actions.tok = function (d, t) {
    if (S0.answered) return;
    var i = +d.i;
    S0.built.push(i);
    t.classList.add('used');
    renderArea();
  };
  actions.untok = function (d) {
    if (S0.answered) return;
    var i = +d.i;
    S0.built = S0.built.filter(function (x) { return x !== i; });
    document.querySelector('.tok[data-i="' + i + '"][data-act="tok"]').classList.remove('used');
    renderArea();
  };
  function renderArea() {
    document.getElementById('area').innerHTML = S0.built.map(function (i) {
      return '<button class="tok" data-act="untok" data-i="' + i + '">' + esc(S0.e.bank[i]) + '</button>';
    }).join('');
    enableCheck(S0.built.length > 0);
  }

  function showType(e) {
    var h = '<div class="instr">' + esc(e.instr) + '</div>';
    if (e.hidePrompt) h += audioControls(e.audio);
    else h += '<div class="prompt"><div class="bubble">' + esc(e.prompt) + '</div></div>';
    h += '<textarea class="type" id="typed" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Type in Spanish"></textarea>' +
      '<div class="accents">' + ['á', 'é', 'í', 'ó', 'ú', 'ñ', 'ü', '¿', '¡'].map(function (c) {
        return '<button data-act="accent" data-c="' + c + '">' + c + '</button>';
      }).join('') + '</div>';
    lessonShell(h, checkBtn(true));
    var ta = document.getElementById('typed');
    ta.addEventListener('input', function () { enableCheck(ta.value.trim().length > 0); });
    ta.addEventListener('keydown', function (ev) {
      if (ev.key === 'Enter') { ev.preventDefault(); if (ta.value.trim()) actions.check(); }
    });
    if (e.audio && audioOn()) setTimeout(function () { speak(e.audio); }, 250);
    else setTimeout(function () { ta.focus(); }, 50);
  }
  actions.accent = function (d) {
    var ta = document.getElementById('typed');
    var s = ta.selectionStart, en = ta.selectionEnd;
    ta.value = ta.value.slice(0, s) + d.c + ta.value.slice(en);
    ta.selectionStart = ta.selectionEnd = s + 1;
    ta.focus();
    enableCheck(true);
  };

  function showMatch(e) {
    S0.left = null; S0.right = null; S0.matched = 0; S0.miss = 0;
    var h = '<div class="instr">Tap the matching pairs</div><div class="match"><div class="options">' +
      e.left.map(function (it, i) { return '<button class="opt" data-act="m" data-side="l" data-i="' + i + '">' + esc(it.es) + '</button>'; }).join('') +
      '</div><div class="options">' +
      e.right.map(function (it, i) { return '<button class="opt" data-act="m" data-side="r" data-i="' + i + '">' + esc(it.en) + '</button>'; }).join('') +
      '</div></div>';
    lessonShell(h, '');
  }
  actions.m = function (d, t) {
    if (t.classList.contains('gone')) return;
    var e = S0.e, side = d.side;
    document.querySelectorAll('.opt[data-side="' + side + '"]').forEach(function (o) { o.classList.remove('sel'); });
    t.classList.add('sel');
    if (side === 'l') { S0.left = +d.i; if (audioOn()) speak(e.left[S0.left].es); } else S0.right = +d.i;
    if (S0.left == null || S0.right == null) return;
    var a = e.left[S0.left], b = e.right[S0.right];
    var lb = document.querySelector('.opt[data-side="l"][data-i="' + S0.left + '"]');
    var rb = document.querySelector('.opt[data-side="r"][data-i="' + S0.right + '"]');
    if (a === b) {
      lb.classList.add('right', 'gone'); rb.classList.add('right', 'gone');
      lb.classList.remove('sel'); rb.classList.remove('sel');
      grade(a, true);
      S0.matched++;
      sfx(true);
      if (S0.matched === e.items.length) {
        L.graded++; S.stats.answered++;
        if (!S0.miss) { L.firstTry++; S.stats.correct++; }
        L.doneUids[e.uid] = 1;
        L.queue.shift();
        save();
        setTimeout(showExercise, 450);
      }
    } else {
      S0.miss++; L.mistakes++;
      grade(a, false);
      sfx(false);
      [lb, rb].forEach(function (x) { x.classList.add('wrong', 'shake'); });
      setTimeout(function () { [lb, rb].forEach(function (x) { x.classList.remove('wrong', 'shake', 'sel'); }); }, 500);
    }
    S0.left = S0.right = null;
  };

  function showSpeak(e) {
    var h = '<div class="instr">' + esc(e.instr) + '</div><div class="prompt">' +
      (audioOn() ? '<button class="speak-btn" data-act="say" data-t="' + esc(e.text) + '">🔊</button>' : '') +
      '<div class="bubble"><b>' + esc(e.text) + '</b><div class="muted small">' + esc(e.en) + '</div></div></div>' +
      '<button class="mic" id="mic" data-act="mic">🎤</button><div class="heard" id="heard">Tap the microphone and speak</div>';
    lessonShell(h, '<button class="btn ghost" data-act="skip-speak">Can\'t speak now</button>');
  }
  actions.mic = function () {
    var mic = document.getElementById('mic'), heard = document.getElementById('heard');
    mic.classList.add('listening');
    heard.textContent = 'Listening…';
    listen(S0.e.text, function (results) {
      mic.classList.remove('listening');
      if (!results || !results.length) { heard.textContent = 'Didn\'t catch that. Try again.'; return; }
      var best = results.reduce(function (b, r) { return similarity(r, S0.e.text) > similarity(b, S0.e.text) ? r : b; }, results[0]);
      var score = similarity(best, S0.e.text);
      heard.textContent = '"' + best + '"';
      var ok = score >= 0.72;
      if (ok) S.stats.spoken++;
      resolve(ok, ok ? (score < 0.95 ? 'Close enough! Heard: "' + best + '"' : '') : 'Heard: "' + best + '"', S0.e.text);
    });
  };
  actions['skip-speak'] = function () {
    speakSnoozedUntil = Date.now() + 15 * 60e3;
    toast('Speaking exercises paused for 15 minutes');
    L.doneUids[S0.e.uid] = 1;
    L.queue.shift();
    showExercise();
  };

  actions.check = function () {
    if (S0.answered) return;
    var e = S0.e;
    if (e.t === 'mcq' || e.t === 'fill') {
      if (S0.sel == null) return;
      var ok = e.options[S0.sel] === e.answer;
      document.querySelectorAll('.opt').forEach(function (o, i) {
        o.disabled = true;
        if (e.options[i] === e.answer) o.classList.add('right');
        else if (i === S0.sel) o.classList.add('wrong');
      });
      var reveal = e.t === 'fill' ? e.item.es : e.answer;
      resolve(ok, '', reveal);
    } else if (e.t === 'build') {
      var got = S0.built.map(function (i) { return e.bank[i]; }).join(' ');
      var ok2 = clean(got) === clean(e.answer);
      var note = '';
      if (!ok2 && loose(got) === loose(e.answer)) { ok2 = true; note = 'Watch the accents: ' + e.answer; }
      resolve(ok2, note, e.answer);
    } else if (e.t === 'type') {
      var typed = document.getElementById('typed').value;
      var r = gradeTyped(typed, e.answer);
      resolve(r.ok, r.note, e.answer);
    }
  };

  function gradeTyped(typed, answer) {
    var a = clean(answer), t = clean(typed);
    if (t === a) return { ok: true, note: '' };
    if (loose(t) === loose(a)) return { ok: true, note: 'Watch the accents: ' + answer };
    if (stripArticle(loose(t)) === stripArticle(loose(a))) return { ok: true, note: 'Remember the article: ' + answer };
    var dist = lev(loose(t), loose(a));
    if (a.length >= 6 && dist === 1) return { ok: true, note: 'Small typo. Correct spelling: ' + answer };
    return { ok: false, note: '' };
  }

  function resolve(ok, note, reveal) {
    var e = S0.e;
    S0.answered = true;
    L.graded++;
    S.stats.answered++;
    if (ok) { S.stats.correct++; if (!e.retry) L.firstTry++; } else L.mistakes++;
    if (e.item) grade(e.item, ok);
    sfx(ok);
    if (ok) L.doneUids[e.uid] = 1;
    L.queue.shift();
    if (!ok) {
      var again = {}; for (var k in e) again[k] = e[k];
      again.retry = true;
      if (again.options) again.options = shuffle(again.options);
      if (again.bank) again.bank = shuffle(again.bank);
      L.queue.push(again);
    }
    save();
    var item = e.item;
    var meaning = item && item.kind !== 'drill' && reveal === item.es ? item.en : (item && item.kind === 'drill' ? item.en : '');
    var foot = document.getElementById('foot');
    foot.innerHTML = '';
    var fb = document.createElement('div');
    fb.className = 'feedback ' + (ok ? 'ok' : 'no');
    fb.innerHTML = '<div class="inner"><div class="head">' + (ok ? '✅ ' + rand(PRAISE) : '❌ Correct answer:') +
      (item && item.es && audioOn() ? ' <button class="speak-btn" data-act="say" data-t="' + esc(item.es) + '">🔊</button>' : '') + '</div>' +
      (!ok || e.t === 'fill' ? '<div class="detail"><b>' + esc(reveal) + '</b>' + (meaning ? '<div class="muted">' + esc(meaning) + '</div>' : '') + '</div>' : '') +
      (note ? '<div class="note">' + esc(note) + '</div>' : '') +
      '<button class="btn ' + (ok ? 'good' : 'danger') + '" data-act="next">Continue</button></div>';
    document.body.appendChild(fb);
    var bar = document.querySelector('.lesson-top .bar > i');
    if (bar) bar.style.width = progressPct() + '%';
    if (item && item.es && audioOn() && (ok || e.t !== 'speak')) setTimeout(function () { speak(item.es); }, 200);
  }
  actions.next = function () {
    var fb = document.querySelector('.feedback');
    if (fb) fb.remove();
    showExercise();
  };

  function finishSession() {
    var s = L, perfect = s.mistakes === 0, xp;
    if (s.kind === 'lesson') {
      xp = s.lesson.kind === 'review' ? 15 : 10;
      if (perfect) xp += 5;
      var u = s.lesson.unit;
      var before = unitComplete(u);
      S.done[u.id] = Math.max(lessonsDone(u), s.lesson.index + 1);
      S.stats.lessons++;
      s.unitDone = !before && unitComplete(u);
    } else {
      xp = 10 + (perfect ? 5 : 0);
      S.stats.practice++;
    }
    if (perfect && s.graded > 0) S.stats.perfect++;
    addXp(xp);
    var fresh = checkAchievements();
    save();
    var acc = s.graded ? Math.round(s.firstTry / s.graded * 100) : 100;
    var secs = Math.round((Date.now() - s.start) / 1000);
    var lvl = levelOf(S.xp);
    var h = '<div class="results"><div class="trophy">' + (s.unitDone ? '🏆' : perfect ? '🌟' : '🎉') + '</div>' +
      '<h1>' + (s.unitDone ? 'Unit complete!' : s.kind === 'lesson' ? 'Lesson complete!' : 'Practice complete!') + '</h1>' +
      '<div class="stat-row">' + stat('⭐', '+' + xp, 'XP') + stat('🎯', acc + '%', 'Accuracy') +
      stat('⏱', Math.floor(secs / 60) + ':' + String(secs % 60).padStart(2, '0'), 'Time') + '</div>' +
      '<div class="muted">🔥 ' + currentStreak() + '-day streak · ' + (S.daily[dayKey()] || 0) + '/' + S.settings.goal + ' XP today</div>';
    if (lvl > s.level0) h += '<div class="levelup">⬆️ Level up! You are now level ' + lvl + ': ' + titleOf(lvl) + '</div>';
    fresh.forEach(function (a) { h += '<div class="ach-new">' + a.e + ' Achievement unlocked: ' + esc(a.name) + '</div>'; });
    if (s.unitDone) {
      var unlocked = SCENARIOS.filter(function (sc) { return sc.after === s.lesson.unit.id; });
      unlocked.forEach(function (sc) { h += '<div class="ach-new">💬 New conversation unlocked: ' + esc(sc.title) + '</div>'; });
    }
    h += '<button class="btn" data-act="done" style="margin-top:24px">Continue</button></div>';
    appEl.innerHTML = h;
    L = null;
    S0 = null;
    window.scrollTo(0, 0);
  }
  actions.done = function () {
    if (view.unit && !unitComplete(view.unit)) view.screen = 'unit';
    else view.screen = 'home';
    render();
    window.scrollTo(0, 0);
  };

  // ---------------------------------------------------------- conversations

  var C = null;
  actions['start-scenario'] = function (d) {
    var sc = SCENARIOS[+d.i];
    if (!scenarioUnlocked(sc)) {
      var u = UNITS.filter(function (x) { return x.id === sc.after; })[0];
      modal('<h3>🔒 ' + esc(sc.title) + '</h3><p class="muted">Complete <b>' + esc(u.title) + '</b> to unlock this conversation, or unlock everything now.</p>' +
        '<button class="btn" data-act="unlock-all">Unlock all</button><button class="btn ghost" data-act="modal-close">Not now</button>');
      return;
    }
    C = { sc: sc, i: 0, log: [], right: 0, asked: 0, showTr: false, wrongThisTurn: false, start: Date.now(), level0: levelOf(S.xp) };
    view.screen = 'talk';
    renderTalk();
  };

  function renderTalk() {
    var sc = C.sc, turn = sc.turns[C.i];
    var h = '<div class="lesson"><div class="lesson-top"><button class="x" data-act="quit-talk">✕</button>' +
      '<div class="bar"><i style="width:' + Math.round(C.i / sc.turns.length * 100) + '%"></i></div>' +
      '<button class="speak-btn" data-act="tr-toggle" title="Translations">' + (C.showTr ? '🇺🇸' : '🔤') + '</button></div>' +
      '<div class="lesson-body"><div class="muted small" style="margin-bottom:8px">' + sc.icon + ' ' + esc(sc.desc) + '</div><div class="chat" id="chat">';
    C.log.forEach(function (m) {
      h += '<div class="msg ' + m.who + '"><div class="who">' + (m.who === 'pt' ? 'Patient' : 'You') + '</div>' + esc(m.es) +
        (audioOn() ? ' <button class="speak-btn" data-act="say" data-t="' + esc(m.es) + '" style="font-size:15px">🔊</button>' : '') +
        (C.showTr ? '<div class="tr">' + esc(m.en) + '</div>' : '') + '</div>';
    });
    h += '</div><div class="scenario-panel" id="panel">';
    if (!turn) {
      h += '</div></div></div>';
      appEl.innerHTML = h;
      return finishTalk();
    }
    if (turn.p) {
      // Patient speaks: show the bubble, then ask what it meant.
      C.opts = C.opts || shuffle([turn.en].concat(turn.w));
      h += '<div class="msg pt"><div class="who">Patient</div>' + esc(turn.p) +
        (audioOn() ? ' <button class="speak-btn" data-act="say" data-t="' + esc(turn.p) + '" style="font-size:15px">🔊</button>' : '') + '</div>' +
        '<div class="task">What did the patient say?</div><div class="options">' +
        C.opts.map(function (o, i) { return '<button class="opt" data-act="talk-pick" data-i="' + i + '">' + esc(o) + '</button>'; }).join('') + '</div>';
    } else {
      C.opts = C.opts || shuffle([turn.a].concat(turn.w));
      h += '<div class="task">🎯 ' + esc(turn.d) + '</div><div class="options">' +
        C.opts.map(function (o, i) { return '<button class="opt" data-act="talk-pick" data-i="' + i + '">' + esc(o) + '</button>'; }).join('') + '</div>' +
        (speakOn() ? '<button class="btn ghost" data-act="talk-mic" style="margin-top:10px">🎤 Say it instead</button><div class="heard" id="heard"></div>' : '');
    }
    h += '</div></div></div>';
    appEl.innerHTML = h;
    window.scrollTo(0, document.body.scrollHeight);
    if (turn.p && audioOn() && !C.spoken) { C.spoken = true; setTimeout(function () { speak(turn.p); }, 300); }
  }
  actions['tr-toggle'] = function () { C.showTr = !C.showTr; renderTalk(); };
  actions['quit-talk'] = function () {
    confirmBox('Leave this conversation?', 'You\'ll have to start it over.', 'Leave', function () { C = null; view.screen = 'home'; render(); }, true);
  };
  actions['talk-pick'] = function (d, t) {
    var turn = C.sc.turns[C.i], correct = turn.p ? turn.en : turn.a;
    var choice = C.opts[+d.i];
    if (choice === correct) {
      t.classList.add('right');
      sfx(true);
      talkAdvance(true);
    } else {
      t.classList.add('wrong', 'shake');
      t.disabled = true;
      sfx(false);
      C.wrongThisTurn = true;
    }
  };
  actions['talk-mic'] = function () {
    var turn = C.sc.turns[C.i], heard = document.getElementById('heard');
    heard.textContent = 'Listening…';
    listen(turn.a, function (results) {
      if (!results || !results.length) { heard.textContent = 'Didn\'t catch that. Try again or tap an answer.'; return; }
      var best = results.reduce(function (b, r) { return similarity(r, turn.a) > similarity(b, turn.a) ? r : b; }, results[0]);
      if (similarity(best, turn.a) >= 0.65) { S.stats.spoken++; sfx(true); talkAdvance(true); }
      else { heard.textContent = 'Heard "' + best + '". Try again or tap an answer.'; sfx(false); C.wrongThisTurn = true; }
    });
  };
  function talkAdvance() {
    var turn = C.sc.turns[C.i];
    C.asked++;
    if (!C.wrongThisTurn) C.right++;
    S.stats.answered++;
    if (!C.wrongThisTurn) S.stats.correct++;
    if (turn.p) C.log.push({ who: 'pt', es: turn.p, en: turn.en });
    else { C.log.push({ who: 'dr', es: turn.a, en: turn.d }); if (audioOn()) speak(turn.a); }
    C.i++; C.opts = null; C.wrongThisTurn = false; C.spoken = false;
    setTimeout(renderTalk, turn.p ? 250 : 900);
  }
  function finishTalk() {
    var pct = Math.round(C.right / Math.max(1, C.asked) * 100);
    var xp = 10 + Math.round(C.right * 1.5);
    var prev = S.scen[C.sc.id];
    S.scen[C.sc.id] = Math.max(prev || 0, pct);
    addXp(xp);
    var fresh = checkAchievements();
    save();
    var lvl = levelOf(S.xp);
    var panel = document.getElementById('panel');
    var h = '<div class="card" style="text-align:center;margin-top:12px"><div style="font-size:54px">' + (pct >= 90 ? '🌟' : pct >= 70 ? '👏' : '💪') + '</div>' +
      '<h2 style="margin:4px 0">Conversation complete</h2><div class="stat-row">' + stat('⭐', '+' + xp, 'XP') + stat('🎯', pct + '%', 'First try') + '</div>' +
      (lvl > C.level0 ? '<div class="levelup">⬆️ Level up! Level ' + lvl + ': ' + titleOf(lvl) + '</div>' : '');
    fresh.forEach(function (a) { h += '<div class="ach-new">' + a.e + ' Achievement unlocked: ' + esc(a.name) + '</div>'; });
    h += '<button class="btn" data-act="talk-done">Done</button><button class="btn ghost" data-act="talk-again">Try again</button></div>';
    panel.innerHTML = h;
    window.scrollTo(0, document.body.scrollHeight);
  }
  actions['talk-done'] = function () { C = null; view.screen = 'home'; view.tab = 'talk'; render(); };
  actions['talk-again'] = function () {
    var i = SCENARIOS.indexOf(C.sc);
    actions['start-scenario']({ i: i });
  };

  // ------------------------------------------------------------- back button

  window.handleBack = function () {
    if (!modalEl.classList.contains('hidden')) { closeModal(); return true; }
    if (view.screen === 'lesson' && L) { actions.quit(); return true; }
    if (view.screen === 'talk' && C) { actions['quit-talk'](); return true; }
    if (view.screen !== 'home') { actions.done(); return true; }
    if (view.tab !== 'learn') { view.tab = 'learn'; render(); return true; }
    return false;
  };

  // test hook
  window.__ms = { S: function () { return S; }, cur: function () { return S0 && S0.e; }, talk: function () { return C; }, UNITS: UNITS, ITEMS: ITEMS, gradeTyped: gradeTyped, levelOf: levelOf };

  if ('speechSynthesis' in window) speechSynthesis.getVoices();
  render();
})();
