import { STATE } from './state.js';
import { formatDateDisplay, escapeHtml } from '../utils/date.js';

const MONTH_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function toDateStr(y, m1, d) {
  return `${y}-${String(m1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
}

// ── Rolling 365-day LeetCode-style heatmap ────────────────────────────────────
function renderYearHeatmap() {
  const grid     = document.getElementById('heatmap-grid');
  const scrollEl = document.getElementById('gh-scrollable');
  if (!grid) return;

  const now      = new Date();
  const today    = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const todayStr = toDateStr(today.getFullYear(), today.getMonth() + 1, today.getDate());

  const windowStart = new Date(today);
  windowStart.setDate(windowStart.getDate() - 364);

  const gridStart = new Date(windowStart);
  gridStart.setDate(gridStart.getDate() - windowStart.getDay()); // back to Sunday

  const gridEnd = new Date(today);
  gridEnd.setDate(gridEnd.getDate() + (6 - today.getDay())); // forward to Saturday

  // Build flat cells[] — 7 per week column (Sun=0 … Sat=6)
  const cells = [];
  const cur = new Date(gridStart);
  while (cur <= gridEnd) {
    cells.push({
      dateStr  : toDateStr(cur.getFullYear(), cur.getMonth() + 1, cur.getDate()),
      inWindow : cur >= windowStart && cur <= today,
    });
    cur.setDate(cur.getDate() + 1);
  }
  const numWeeks = cells.length / 7;

  // Group into weeks
  const weeks = [];
  for (let w = 0; w < numWeeks; w++) {
    weeks.push(cells.slice(w * 7, (w + 1) * 7));
  }

  // ── Month boundaries ────────────────────────────────────────────────────────
  // Rule 1: the very first in-window day's month → label at its week
  // Rule 2: every subsequent day-1 that's in-window → label at that week
  // This ensures even if Apr 1 is before window start, "Apr" still shows
  const boundaries = []; // { wi, month, year }

  // Rule 1 — first in-window month
  outer:
  for (let wi = 0; wi < numWeeks; wi++) {
    for (const { dateStr, inWindow } of weeks[wi]) {
      if (!inWindow) continue;
      const d = new Date(dateStr + 'T12:00:00');
      boundaries.push({ wi, month: d.getMonth(), year: d.getFullYear() });
      break outer;
    }
  }

  // Rule 2 — day-1 of each subsequent month
  for (let wi = 0; wi < numWeeks; wi++) {
    for (const { dateStr, inWindow } of weeks[wi]) {
      if (!inWindow) continue;
      const d = new Date(dateStr + 'T12:00:00');
      if (d.getDate() === 1) {
        const dup = boundaries.find(b => b.month === d.getMonth() && b.year === d.getFullYear());
        if (!dup) boundaries.push({ wi, month: d.getMonth(), year: d.getFullYear() });
      }
    }
  }
  boundaries.sort((a, b) => a.wi - b.wi);

  // ── Build explicit grid-template-columns ────────────────────────────────────
  // Each week → var(--cell), separator before each boundary (except first col)
  const colDefs    = [];
  const weekColIdx = []; // weekIndex → 1-based CSS grid column
  let colIdx = 1;

  for (let wi = 0; wi < numWeeks; wi++) {
    const isBoundary = boundaries.some(b => b.wi === wi);
    if (isBoundary && wi > 0) {
      colDefs.push('var(--month-sep)'); // wider gap between month clusters
      colIdx++;
    }
    weekColIdx.push(colIdx);
    colDefs.push('var(--cell)');
    colIdx++;
  }
  const totalCols = colIdx - 1;

  // ── Set up the CSS grid ─────────────────────────────────────────────────────
  // Row 1 = month labels (--lbl-h), rows 2-8 = Sun … Sat cells
  grid.style.display             = 'grid';
  grid.style.gridTemplateColumns = colDefs.join(' ');
  grid.style.gridTemplateRows    = 'var(--lbl-h, 20px) repeat(7, var(--cell))';
  grid.style.columnGap           = 'var(--cell-gap)';
  grid.style.rowGap              = 'var(--cell-gap)';
  grid.innerHTML = '';

  // ── Month label cells (row 1) ────────────────────────────────────────────────
  boundaries.forEach(({ wi, month }, i) => {
    const startCol = weekColIdx[wi];
    const nextWi   = i + 1 < boundaries.length ? boundaries[i + 1].wi : numWeeks;
    // endCol = start of next month's separator (or past last col)
    const endCol   = nextWi < numWeeks ? weekColIdx[nextWi] : totalCols + 1;

    const lbl = document.createElement('span');
    lbl.textContent      = MONTH_SHORT[month];
    lbl.className        = 'gh-month-lbl-item';
    lbl.style.gridColumn = `${startCol} / ${endCol}`;
    lbl.style.gridRow    = '1';
    grid.appendChild(lbl);
  });

  // ── Day cells (rows 2-8) ─────────────────────────────────────────────────────
  // FIX: gridColumn + gridRow set BEFORE the inWindow check so empty cells also
  // get explicit placement — preventing CSS auto-flow from misplacing them.
  let showedCount = 0;

  for (let wi = 0; wi < numWeeks; wi++) {
    const gc = weekColIdx[wi];
    weeks[wi].forEach(({ dateStr, inWindow }, rowOff) => {
      const div = document.createElement('div');
      div.style.gridColumn = String(gc);          // ALWAYS explicit
      div.style.gridRow    = String(rowOff + 2);  // row 1 = labels, rows 2-8 = days

      if (!inWindow) {
        div.className = 'heatmap-cell heatmap-cell--empty';
        grid.appendChild(div);
        return;
      }

      div.className = 'heatmap-cell';
      const cd      = new Date(dateStr + 'T12:00:00');
      const isToday = dateStr === todayStr;
      const entry   = STATE.history.find(h => h.date === dateStr);
      const tip     = `${MONTH_SHORT[cd.getMonth()]} ${cd.getDate()}`;

      if (isToday) div.classList.add('heatmap-cell--today');

      if (entry) {
        if (entry.showed === 'no') {
          div.classList.add('heatmap-cell--miss');
          div.setAttribute('data-tip', `${tip} · Missed`);
        } else {
          showedCount++;
          const e = Math.min(Math.max(entry.effort || 1, 1), 5);
          div.classList.add(`heatmap-cell--e${e}`);
          div.setAttribute('data-tip', `${tip} · Effort ${e}/5`);
        }
      } else {
        div.setAttribute('data-tip', tip);
      }
      grid.appendChild(div);
    });
  }

  // ── Stats ────────────────────────────────────────────────────────────────────
  const lcCountEl = document.getElementById('gh-lc-count');
  const lcTotalEl = document.getElementById('gh-lc-total');
  if (lcCountEl) lcCountEl.textContent = String(showedCount);
  if (lcTotalEl) lcTotalEl.textContent = String(showedCount);

  if (scrollEl) requestAnimationFrame(() => { scrollEl.scrollLeft = scrollEl.scrollWidth; });
}

// ── Streak ───────────────────────────────────────────────────────────────────
function renderStreakPill() {
  const count = STATE.streak?.count ?? 0;
  const oldEl = document.getElementById('history-streak-val');
  const lcEl  = document.getElementById('gh-lc-streak');
  if (oldEl) oldEl.textContent = `${count} days`;
  if (lcEl)  lcEl.textContent  = String(count);
}

// ── Entry cards ──────────────────────────────────────────────────────────────
function renderEntryCards() {
  const grid  = document.getElementById('history-grid');
  const empty = document.getElementById('history-empty');
  if (!grid) return;

  const byDate = new Map();
  STATE.history.forEach(e => { if (!byDate.has(e.date)) byDate.set(e.date, e); });
  const sorted = [...byDate.values()].sort((a, b) => b.date.localeCompare(a.date));

  if (!sorted.length) { grid.innerHTML = ''; if (empty) empty.hidden = false; return; }
  if (empty) empty.hidden = true;

  const todayStr = new Date().toISOString().slice(0, 10);

  grid.innerHTML = sorted.map(entry => {
    const stars   = Array.from({ length: 5 }, (_, i) =>
      `<span class="history-star${i < entry.effort ? '' : ' empty'}">★</span>`).join('');
    const showed  = entry.showed === 'yes'
      ? '<span class="showed-yes">✓ Showed up</span>'
      : '<span class="showed-no">✗ Didn\'t show</span>';
    const done    = entry.tasksCompleted != null
      ? `<div class="history-completed">⚡ ${entry.tasksCompleted}% tasks done</div>` : '';
    const isToday = entry.date === todayStr;
    return `<div class="history-entry${isToday ? ' history-entry--today' : ''}">
      <div class="history-entry-date-row">
        <span class="history-entry-date">${formatDateDisplay(entry.date)}</span>
        ${isToday ? '<span class="history-today-badge">Today</span>' : ''}
      </div>
      <div class="history-entry-showed">${showed}</div>
      <div class="history-effort">${stars}</div>${done}
      <div class="history-notes">${escapeHtml(entry.notes || '')}</div>
    </div>`;
  }).join('');
}

export function renderHistory() {
  renderStreakPill();
  renderYearHeatmap();
  renderEntryCards();
}
