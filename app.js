/* Urordle — Game logic */
(function () {
  'use strict';

  const MAX_GUESSES = 6;
  const MAX_SKIPS = 2;
  const STORAGE_KEY = 'urordle.state.v1';
  const STATS_KEY = 'urordle.stats.v1';
  const HISTORY_KEY = 'urordle.history.v1';
  // Calendar-day math anchored at Jan 1, 2026 local. We compute via Date.UTC
  // on local-y/m/d so DST transitions don't introduce off-by-one errors.
  const EPOCH_YEAR = 2026, EPOCH_MONTH = 0, EPOCH_DAY = 1;

  // ----- Helpers -----

  function normalize(s) {
    return (s || '')
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[^\p{L}\p{N}\s]/gu, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function todayIndex() {
    const now = new Date();
    const todayUtc = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
    const epochUtc = Date.UTC(EPOCH_YEAR, EPOCH_MONTH, EPOCH_DAY);
    return Math.max(0, Math.round((todayUtc - epochUtc) / 86400000));
  }

  function dateForDay(dayNumber) {
    // dayNumber is 1-indexed: Day 1 = local Jan 1, 2026.
    const d = new Date(EPOCH_YEAR, EPOCH_MONTH, EPOCH_DAY);
    d.setDate(d.getDate() + (dayNumber - 1));
    return d;
  }

  function formatDate(d) {
    return d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
  }

  function caseForDay(cases, dayNumber) {
    const idx = (dayNumber - 1) % cases.length;
    return cases[idx];
  }

  function pickDailyCase(cases) {
    const day = todayIndex() + 1;
    return { case: caseForDay(cases, day), dayNumber: day };
  }

  function pickPracticeCase(cases, excludeId) {
    const pool = excludeId != null ? cases.filter(c => c.id !== excludeId) : cases;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  // Damerau-Levenshtein distance (simple iterative version)
  function editDistance(a, b) {
    if (a === b) return 0;
    const al = a.length, bl = b.length;
    if (al === 0) return bl;
    if (bl === 0) return al;
    const v0 = new Array(bl + 1);
    const v1 = new Array(bl + 1);
    for (let i = 0; i <= bl; i++) v0[i] = i;
    for (let i = 0; i < al; i++) {
      v1[0] = i + 1;
      for (let j = 0; j < bl; j++) {
        const cost = a[i] === b[j] ? 0 : 1;
        v1[j + 1] = Math.min(
          v1[j] + 1,
          v0[j + 1] + 1,
          v0[j] + cost
        );
      }
      for (let j = 0; j <= bl; j++) v0[j] = v1[j];
    }
    return v1[bl];
  }

  function matchType(guessRaw, theCase) {
    const guess = normalize(guessRaw);
    if (!guess) return 'invalid';
    for (const alias of theCase.aliases) {
      if (guess === alias) return 'correct';
    }
    // Token-containment check — e.g., "renal cell" matches "renal cell carcinoma"
    for (const alias of theCase.aliases) {
      const aliasTokens = alias.split(' ');
      const guessTokens = guess.split(' ');
      if (guessTokens.length >= 2 && aliasTokens.length >= 2) {
        const overlap = guessTokens.filter(t => aliasTokens.includes(t)).length;
        if (overlap >= Math.min(aliasTokens.length, 2) && overlap / aliasTokens.length >= 0.6) {
          return 'correct';
        }
      }
    }
    // Fuzzy match (typo tolerance) — tighter threshold on shorter strings
    let bestDistance = Infinity;
    let bestAlias = null;
    for (const alias of theCase.aliases) {
      const d = editDistance(guess, alias);
      if (d < bestDistance) { bestDistance = d; bestAlias = alias; }
    }
    const tolerance = Math.max(1, Math.floor((bestAlias || '').length * 0.15));
    if (bestDistance <= tolerance) return 'correct';
    // "Close" — same first significant token (e.g., "renal" matches "renal cell carcinoma")
    if (bestDistance <= Math.max(3, tolerance + 2)) return 'close';
    return 'wrong';
  }

  // Build searchable diagnosis index for autocomplete
  function buildIndex(cases) {
    const set = new Map();
    cases.forEach(c => {
      // Canonical
      set.set(c.dx.toLowerCase(), c.dx);
      // Add common notable aliases as suggestions (skip very short ones)
      c.aliases.forEach(a => {
        if (a.length >= 4 && !set.has(a)) {
          // Title-case the alias for display
          const display = a.replace(/\b\w/g, ch => ch.toUpperCase());
          set.set(a, display);
        }
      });
    });
    return Array.from(set.entries())
      .map(([key, label]) => ({ key, label }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }

  function suggest(index, query) {
    const q = normalize(query);
    if (!q || q.length < 2) return [];
    const starts = [];
    const contains = [];
    const fuzzy = [];
    for (const item of index) {
      if (item.key.startsWith(q)) starts.push(item);
      else if (item.key.includes(q)) contains.push(item);
      else if (q.length >= 4) {
        const d = editDistance(q, item.key.slice(0, q.length));
        if (d <= 1) fuzzy.push(item);
      }
    }
    return [...starts, ...contains, ...fuzzy].slice(0, 6);
  }

  // ----- State / persistence -----

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) { return null; }
  }
  function saveState(s) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch (e) {}
  }
  function loadStats() {
    try {
      const raw = localStorage.getItem(STATS_KEY);
      return raw ? JSON.parse(raw) : defaultStats();
    } catch (e) { return defaultStats(); }
  }
  function saveStats(s) {
    try { localStorage.setItem(STATS_KEY, JSON.stringify(s)); } catch (e) {}
  }
  function defaultStats() {
    return {
      played: 0, won: 0, streak: 0, maxStreak: 0,
      distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
      lastDayCompleted: -1
    };
  }

  function loadHistory() {
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) { return {}; }
  }
  function saveHistory(h) {
    try { localStorage.setItem(HISTORY_KEY, JSON.stringify(h)); } catch (e) {}
  }
  function recordHistory(dayNumber, result) {
    const h = loadHistory();
    // Don't overwrite a prior completed result with a worse/replay one.
    if (h[dayNumber] && h[dayNumber].won) return;
    h[dayNumber] = result;
    saveHistory(h);
  }

  // ----- Game state -----

  const state = {
    mode: 'daily', // 'daily' | 'practice' | 'archive'
    case: null,
    dayNumber: null,
    guesses: [], // [{ text, kind: 'correct'|'close'|'wrong'|'skip' }]
    cluesShown: 1, // 1..6
    skipsUsed: 0,
    finished: false,
    won: false
  };

  let CASES = [];
  let INDEX = [];
  let activeAutocompleteIndex = -1;

  // ----- DOM helpers -----
  const $ = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));

  function render() {
    // Case meta
    const backLink = $('#back-to-today');
    if (state.mode === 'daily') {
      $('#case-number').textContent = `Case #${state.dayNumber}`;
      backLink.classList.add('hidden');
    } else if (state.mode === 'archive') {
      $('#case-number').textContent = `Archive · Case #${state.dayNumber} · ${formatDate(dateForDay(state.dayNumber))}`;
      backLink.classList.remove('hidden');
    } else {
      $('#case-number').textContent = `Practice case`;
      backLink.classList.remove('hidden');
    }
    $('#case-category').textContent = state.case.category || 'Urology';

    // Clues — supports plain string clues OR { text, image, alt } objects.
    const clueList = $('#clue-list');
    clueList.innerHTML = '';
    for (let i = 0; i < state.cluesShown; i++) {
      const li = document.createElement('li');
      const clue = state.case.clues[i];
      if (typeof clue === 'string') {
        li.textContent = clue;
      } else {
        if (clue.text) {
          const p = document.createElement('p');
          p.className = 'clue-text';
          p.textContent = clue.text;
          li.appendChild(p);
        }
        if (clue.image) {
          const figure = document.createElement('figure');
          figure.className = 'clue-figure';
          const img = document.createElement('img');
          img.src = clue.image;
          img.alt = clue.alt || '';
          img.loading = 'lazy';
          img.decoding = 'async';
          figure.appendChild(img);
          if (clue.caption) {
            const cap = document.createElement('figcaption');
            cap.textContent = clue.caption;
            figure.appendChild(cap);
          }
          li.appendChild(figure);
        }
      }
      clueList.appendChild(li);
    }

    // Guesses
    const gWrap = $('#guesses');
    gWrap.innerHTML = '';
    state.guesses.forEach(g => {
      const row = document.createElement('div');
      row.className = `guess-row ${g.kind}`;
      const pill = document.createElement('span');
      pill.className = 'pill';
      pill.textContent =
        g.kind === 'correct' ? 'Correct' :
        g.kind === 'close' ? 'Close' :
        g.kind === 'skip' ? 'Skipped' : 'Miss';
      const txt = document.createElement('span');
      txt.className = 'text';
      txt.textContent = g.text;
      row.appendChild(pill);
      row.appendChild(txt);
      gWrap.appendChild(row);
    });

    // Hint
    const wrongGuesses = state.guesses.filter(g => g.kind === 'wrong' || g.kind === 'close').length;
    const remaining = MAX_GUESSES - wrongGuesses;
    const skipsLeft = MAX_SKIPS - state.skipsUsed;
    if (!state.finished) {
      $('#guess-hint').textContent =
        `${remaining} guess${remaining === 1 ? '' : 'es'} left · ${skipsLeft} skip${skipsLeft === 1 ? '' : 's'} left`;
      $('#btn-skip').disabled = skipsLeft <= 0 || state.cluesShown >= state.case.clues.length;
    }

    // Result
    const resEl = $('#result');
    if (state.finished) {
      $('#input-area').classList.add('hidden');
      resEl.classList.remove('hidden');
      resEl.classList.toggle('win', state.won);
      resEl.classList.toggle('lose', !state.won);
      $('#result-title').textContent = state.won
        ? (wrongGuesses === 0 ? 'Brilliant!' : wrongGuesses <= 1 ? 'Excellent!' : wrongGuesses <= 3 ? 'Nice work.' : 'Got it!')
        : 'Out of guesses';
      $('#result-dx').textContent = state.case.dx;
      $('#result-teaching').textContent = state.case.teaching || '';
      renderShareGrid();
      $('#next-hint').textContent = state.mode === 'daily'
        ? 'Come back tomorrow for a new case.'
        : 'Try another practice case below.';
    } else {
      $('#input-area').classList.remove('hidden');
      resEl.classList.add('hidden');
    }
  }

  function renderShareGrid() {
    const grid = $('#result-share-grid');
    grid.innerHTML = '';
    // Order: each guess (correct=green, close=amber, wrong=gray), plus skip cells (amber)
    const cells = [];
    state.guesses.forEach(g => {
      if (g.kind === 'correct') cells.push('win');
      else if (g.kind === 'close') cells.push('skip');
      else if (g.kind === 'skip') cells.push('skip');
      else cells.push('miss');
    });
    // Pad to MAX_GUESSES with empty cells if won early
    const wrongCount = state.guesses.filter(g => g.kind !== 'skip').length;
    while (cells.filter(c => c !== 'skip').length < (state.won ? wrongCount : MAX_GUESSES)) {
      cells.push('empty');
    }
    cells.forEach(c => {
      const cell = document.createElement('span');
      cell.className = `share-cell ${c}`;
      cell.textContent = c === 'win' ? '✓' : c === 'miss' ? '✗' : c === 'skip' ? '~' : '';
      grid.appendChild(cell);
    });
  }

  function buildShareText() {
    const wrongCount = state.guesses.filter(g => g.kind === 'wrong' || g.kind === 'close').length;
    const scoreLine = state.won ? `${wrongCount + 1}/${MAX_GUESSES}` : `X/${MAX_GUESSES}`;
    let pattern = '';
    state.guesses.forEach(g => {
      if (g.kind === 'correct') pattern += '🟩';
      else if (g.kind === 'close') pattern += '🟨';
      else if (g.kind === 'skip') pattern += '🟧';
      else pattern += '⬛';
    });
    const header = state.mode === 'daily'
      ? `Urordle #${state.dayNumber} — ${scoreLine}`
      : `Urordle (practice) — ${scoreLine}`;
    return `${header}\n${pattern}\nhttps://urordle.com`;
  }

  // ----- Stats -----

  function recordResult() {
    const wrongCount = state.guesses.filter(g => g.kind === 'wrong' || g.kind === 'close').length;

    // Archive mode: record per-day history only (no stats/streak change).
    if (state.mode === 'archive') {
      recordHistory(state.dayNumber, {
        won: state.won,
        guesses: state.won ? wrongCount + 1 : null,
        replayed: true
      });
      return;
    }
    if (state.mode !== 'daily') return;

    const stats = loadStats();
    const today = todayIndex();
    if (stats.lastDayCompleted === today) return; // already recorded

    stats.played += 1;
    if (state.won) {
      stats.won += 1;
      const slot = Math.min(MAX_GUESSES, wrongCount + 1);
      stats.distribution[slot] = (stats.distribution[slot] || 0) + 1;
      const continued = stats.lastDayCompleted === today - 1 || stats.lastDayCompleted === -1;
      stats.streak = continued ? stats.streak + 1 : 1;
      stats.maxStreak = Math.max(stats.maxStreak, stats.streak);
    } else {
      stats.streak = 0;
    }
    stats.lastDayCompleted = today;
    saveStats(stats);

    // Also write to history so this day appears in the archive after it rolls over.
    recordHistory(state.dayNumber, {
      won: state.won,
      guesses: state.won ? wrongCount + 1 : null
    });
  }

  function renderStats() {
    const stats = loadStats();
    $('#stat-played').textContent = stats.played;
    $('#stat-winrate').textContent = stats.played > 0
      ? `${Math.round((stats.won / stats.played) * 100)}%`
      : '0%';
    $('#stat-streak').textContent = stats.streak;
    $('#stat-maxstreak').textContent = stats.maxStreak;
    const hist = $('#stat-hist');
    hist.innerHTML = '';
    const max = Math.max(1, ...Object.values(stats.distribution));
    const winCountThisCase = state.won ? state.guesses.filter(g => g.kind === 'wrong' || g.kind === 'close').length + 1 : -1;
    for (let i = 1; i <= MAX_GUESSES; i++) {
      const count = stats.distribution[i] || 0;
      const row = document.createElement('div');
      row.className = 'hist-row' + (i === winCountThisCase ? ' highlight' : '');
      row.innerHTML = `
        <span class="h-label">${i}</span>
        <div class="h-bar">
          <div class="h-fill" style="width:${Math.max(8, (count / max) * 100)}%">${count}</div>
        </div>
      `;
      hist.appendChild(row);
    }
  }

  // ----- Event handlers -----

  function submitGuess() {
    const input = $('#guess-input');
    const raw = input.value;
    if (!raw.trim()) return;
    if (state.finished) return;

    const kind = matchType(raw, state.case);
    if (kind === 'invalid') return;

    state.guesses.push({ text: raw.trim(), kind });

    if (kind === 'correct') {
      state.finished = true;
      state.won = true;
      // Reveal all clues for learning
      state.cluesShown = state.case.clues.length;
      recordResult();
    } else {
      // Reveal next clue
      if (state.cluesShown < state.case.clues.length) state.cluesShown += 1;
      const wrongCount = state.guesses.filter(g => g.kind === 'wrong' || g.kind === 'close').length;
      if (wrongCount >= MAX_GUESSES) {
        state.finished = true;
        state.won = false;
        state.cluesShown = state.case.clues.length;
        recordResult();
      }
    }

    input.value = '';
    closeAutocomplete();
    if (state.mode === 'daily') saveState(snapshot());
    render();
  }

  function skipClue() {
    if (state.finished) return;
    if (state.skipsUsed >= MAX_SKIPS) return;
    if (state.cluesShown >= state.case.clues.length) return;
    state.skipsUsed += 1;
    state.cluesShown += 1;
    state.guesses.push({ text: '(clue revealed)', kind: 'skip' });
    if (state.mode === 'daily') saveState(snapshot());
    render();
  }

  function snapshot() {
    return {
      dayNumber: state.dayNumber,
      caseId: state.case.id,
      guesses: state.guesses,
      cluesShown: state.cluesShown,
      skipsUsed: state.skipsUsed,
      finished: state.finished,
      won: state.won
    };
  }

  function tryResumeDaily() {
    const saved = loadState();
    if (!saved) return false;
    if (saved.dayNumber !== state.dayNumber) return false;
    if (saved.caseId !== state.case.id) return false;
    state.guesses = saved.guesses || [];
    state.cluesShown = saved.cluesShown || 1;
    state.skipsUsed = saved.skipsUsed || 0;
    state.finished = !!saved.finished;
    state.won = !!saved.won;
    return true;
  }

  function startDaily() {
    const picked = pickDailyCase(CASES);
    state.mode = 'daily';
    state.case = picked.case;
    state.dayNumber = picked.dayNumber;
    state.guesses = [];
    state.cluesShown = 1;
    state.skipsUsed = 0;
    state.finished = false;
    state.won = false;
    tryResumeDaily();
    render();
  }

  function startPractice() {
    const c = pickPracticeCase(CASES, state.case && state.case.id);
    state.mode = 'practice';
    state.case = c;
    state.dayNumber = null;
    state.guesses = [];
    state.cluesShown = 1;
    state.skipsUsed = 0;
    state.finished = false;
    state.won = false;
    render();
  }

  function startArchive(dayNumber) {
    state.mode = 'archive';
    state.case = caseForDay(CASES, dayNumber);
    state.dayNumber = dayNumber;
    state.guesses = [];
    state.cluesShown = 1;
    state.skipsUsed = 0;
    state.finished = false;
    state.won = false;
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderArchive() {
    const list = $('#archive-list');
    const summary = $('#archive-summary');
    list.innerHTML = '';
    summary.innerHTML = '';

    const history = loadHistory();
    const today = todayIndex() + 1; // 1-indexed day number
    const lastArchivable = today - 1;

    if (lastArchivable < 1) {
      list.innerHTML = '<li class="muted" style="padding:12px;text-align:center;">No past puzzles yet — check back tomorrow.</li>';
      return;
    }

    // Summary chips
    let played = 0, won = 0;
    for (let d = 1; d <= lastArchivable; d++) {
      if (history[d]) {
        played += 1;
        if (history[d].won) won += 1;
      }
    }
    summary.innerHTML = `
      <span class="chip"><strong>${lastArchivable}</strong>past puzzles</span>
      <span class="chip"><strong>${played}</strong>played</span>
      <span class="chip"><strong>${won}</strong>solved</span>
    `;

    // List rows, newest first
    for (let d = lastArchivable; d >= 1; d--) {
      const result = history[d];
      const theCase = caseForDay(CASES, d);
      const li = document.createElement('li');
      li.className = 'archive-item';
      li.setAttribute('role', 'button');
      li.tabIndex = 0;

      const resClass = result ? (result.won ? 'won' : 'lost') : 'unplayed';
      const resText = result
        ? (result.won ? `${result.guesses}/${MAX_GUESSES}` : 'X/6')
        : 'Play';

      // Only reveal diagnosis on already-completed days.
      const dxLine = result
        ? `<div class="a-dx">${theCase.dx}</div>`
        : '';

      li.innerHTML = `
        <div class="a-day">#${d}</div>
        <div class="a-meta">
          <div class="a-date">${formatDate(dateForDay(d))}</div>
          ${dxLine}
        </div>
        <span class="a-result ${resClass}">${resText}</span>
      `;
      li.addEventListener('click', () => {
        closeModal('modal-archive');
        startArchive(d);
      });
      li.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); li.click(); }
      });
      list.appendChild(li);
    }
  }

  // ----- Autocomplete -----

  function renderAutocomplete(items) {
    const list = $('#autocomplete-list');
    list.innerHTML = '';
    activeAutocompleteIndex = -1;
    if (!items.length) { list.classList.remove('open'); return; }
    items.forEach((it, idx) => {
      const li = document.createElement('li');
      li.textContent = it.label;
      li.setAttribute('role', 'option');
      li.dataset.value = it.label;
      li.addEventListener('mousedown', (e) => {
        e.preventDefault();
        $('#guess-input').value = it.label;
        closeAutocomplete();
      });
      list.appendChild(li);
    });
    list.classList.add('open');
  }

  function closeAutocomplete() {
    $('#autocomplete-list').classList.remove('open');
    activeAutocompleteIndex = -1;
  }

  function moveAutocomplete(delta) {
    const list = $('#autocomplete-list');
    const items = Array.from(list.querySelectorAll('li'));
    if (!items.length) return;
    activeAutocompleteIndex = (activeAutocompleteIndex + delta + items.length) % items.length;
    items.forEach((li, i) => li.setAttribute('aria-selected', i === activeAutocompleteIndex ? 'true' : 'false'));
    items[activeAutocompleteIndex].scrollIntoView({ block: 'nearest' });
  }

  function commitAutocomplete() {
    const list = $('#autocomplete-list');
    const items = Array.from(list.querySelectorAll('li'));
    if (activeAutocompleteIndex >= 0 && items[activeAutocompleteIndex]) {
      $('#guess-input').value = items[activeAutocompleteIndex].dataset.value;
      closeAutocomplete();
      return true;
    }
    return false;
  }

  // ----- Modals -----

  function openModal(id) { $('#' + id).classList.remove('hidden'); }
  function closeModal(id) { $('#' + id).classList.add('hidden'); }

  // ----- Init -----

  function init() {
    CASES = window.URORDLE_CASES || [];
    if (!CASES.length) {
      document.getElementById('case-category').textContent = 'No cases loaded.';
      return;
    }
    INDEX = buildIndex(CASES);

    startDaily();

    // Input
    const input = $('#guess-input');
    input.addEventListener('input', e => {
      renderAutocomplete(suggest(INDEX, e.target.value));
    });
    input.addEventListener('focus', e => {
      if (e.target.value) renderAutocomplete(suggest(INDEX, e.target.value));
    });
    input.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown') { e.preventDefault(); moveAutocomplete(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); moveAutocomplete(-1); }
      else if (e.key === 'Enter') {
        e.preventDefault();
        commitAutocomplete();
        submitGuess();
      } else if (e.key === 'Escape') {
        closeAutocomplete();
      }
    });
    input.addEventListener('blur', () => {
      // Slight delay so click events on items can fire
      setTimeout(closeAutocomplete, 120);
    });

    // Buttons
    $('#btn-submit').addEventListener('click', submitGuess);
    $('#btn-skip').addEventListener('click', skipClue);
    $('#btn-replay').addEventListener('click', startPractice);
    $('#btn-share').addEventListener('click', async () => {
      const text = buildShareText();
      try {
        if (navigator.share) {
          await navigator.share({ title: 'Urordle', text });
        } else if (navigator.clipboard) {
          await navigator.clipboard.writeText(text);
          const btn = $('#btn-share');
          const orig = btn.textContent;
          btn.textContent = 'Copied!';
          setTimeout(() => { btn.textContent = orig; }, 1400);
        } else {
          prompt('Copy your result:', text);
        }
      } catch (e) { /* user dismissed */ }
    });

    $('#btn-help').addEventListener('click', () => openModal('modal-help'));
    $('#btn-stats').addEventListener('click', () => { renderStats(); openModal('modal-stats'); });
    $('#btn-archive').addEventListener('click', () => { renderArchive(); openModal('modal-archive'); });
    $('#back-to-today').addEventListener('click', e => { e.preventDefault(); startDaily(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
    $('#btn-reset').addEventListener('click', () => {
      if (confirm('Reset all statistics? This cannot be undone.')) {
        saveStats(defaultStats());
        renderStats();
      }
    });

    // Generic close-on-click for modals
    $$('.modal').forEach(m => {
      m.addEventListener('click', e => {
        if (e.target === m || e.target.dataset.close !== undefined) {
          m.classList.add('hidden');
        }
      });
    });

    // Show help on very first visit
    if (!localStorage.getItem('urordle.seen')) {
      openModal('modal-help');
      localStorage.setItem('urordle.seen', '1');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
