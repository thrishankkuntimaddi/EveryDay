/**
 * history.js — History view rendering.
 *
 * Heatmap = rolling last 365 days (today = rightmost column),
 * exactly like GitHub's contribution graph.
 */

import { STATE } from './state.js';
import { formatDateDisplay, escapeHtml } from '../utils/date.js';

const MONTH_SHORT = ['Jan','Feb','Mar','Apr','May','Jun',
                     'Jul','Aug','Sep','Oct','Nov','Dec'];

function toDateStr(y, m1, d) {
  return `${y}-${String(m1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
}

// ── Rolling 365-day GitHub-style heatmap ──────────────────────────────────────

function renderYearHeatmap() {
  const grid       = document.getElementById('heatmap-grid');
  const monthLblEl = document.getElementById('gh-month-labels');
  const scrollEl   = document.getElementById('gh-scrollable');
  const contribEl  = document.getElementById('gh-contrib-count');
  if (!grid) return;

  const now   = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const todayStr = toDateStr(today.getFullYear(), today.getMonth() + 1, today.getDate());

  // 365-day window: 364 days ago → today (inclusive = 365 days)
  const windowStart = new Date(today);
  windowStart.setDate(windowStart.getDate() - 364);

  // Grid start = Sunday of the week that contains windowStart
  const gridStart = new Date(windowStart);
  gridStart.setDate(gridStart.getDate() - windowStart.getDay());

  // Grid end = Saturday of today's week (so today is always in the last column)
  const gridEnd = new Date(today);
  gridEnd.setDate(gridEnd.getDate() + (6 - today.getDay()));

  // Build flat cells[] in ROW-MAJOR order:
  //   idx 0 = Sun of wk0, idx 1 = Mon of wk0 … idx 6 = Sat of wk0
  //   idx 7 = Sun of wk1 … etc.
  // (With grid-auto-flow:column + grid-template-rows:repeat(7,…) this maps
  //  correctly — col = ⌊idx/7⌋, row = idx%7.)
  const cells = [];
  const cur   = new Date(gridStart);
  while (cur <= gridEnd) {
    const dateStr   = toDateStr(cur.getFullYear(), cur.getMonth() + 1, cur.getDate());
    const inWindow  = cur >= windowStart && cur <= today;
    cells.push({ dateStr, inWindow });
    cur.setDate(cur.getDate() + 1);
  }

  const numWeeks = cells.length / 7;   // always a whole number (we padded both ends)

  // ── Month labels ──────────────────────────────────────────────────────────
  // Track where each month starts so we can span labels under them
  const monthStarts = [];
  let   lastLabelCol = -6;

  cells.forEach(({ dateStr, inWindow }, idx) => {
    if (!inWindow) return;
    const d = new Date(dateStr + 'T12:00:00');
    if (d.getDate() === 1) {
      const col = Math.floor(idx / 7);
      if (col - lastLabelCol >= 4) {
        monthStarts.push({ month: d.getMonth(), col });
        lastLabelCol = col;
      }
    }
  });

  if (monthLblEl) {
    monthLblEl.style.display = 'grid';
    monthLblEl.style.gridTemplateColumns = `repeat(${numWeeks}, var(--cell))`;
    monthLblEl.style.columnGap = 'var(--cell-gap)';
    monthLblEl.innerHTML = '';

    monthStarts.forEach(({ month, col }) => {
      const span = document.createElement('span');
      span.textContent = MONTH_SHORT[month];
      // Position at the month's first week column — text overflows visually,
      // and the empty grid columns before the next month create natural spacing.
      span.style.gridColumnStart = String(col + 1);
      // No gridColumnEnd → defaults to span 1 col; text overflows visibly
      monthLblEl.appendChild(span);
    });
  }


  // ── Cell grid ─────────────────────────────────────────────────────────────
  let showedCount = 0;
  grid.innerHTML  = '';

  cells.forEach(({ dateStr, inWindow }) => {
    const div = document.createElement('div');

    if (!inWindow) {
      // Outside the 365-day window — transparent padding cell
      div.className = 'heatmap-cell heatmap-cell--empty';
      grid.appendChild(div);
      return;
    }

    div.className = 'heatmap-cell';
    const cellDate = new Date(dateStr + 'T12:00:00');
    const isToday  = dateStr === todayStr;
    const entry    = STATE.history.find(h => h.date === dateStr);
    const dayLabel = `${MONTH_SHORT[cellDate.getMonth()]} ${cellDate.getDate()}`;

    if (isToday) div.classList.add('heatmap-cell--today');

    if (entry) {
      if (entry.showed === 'no') {
        div.classList.add('heatmap-cell--miss');
        div.setAttribute('data-tip', `${dayLabel} · Missed`);
      } else {
        showedCount++;
        const e = Math.min(Math.max(entry.effort || 1, 1), 5);
        div.classList.add(`heatmap-cell--e${e}`);
        div.setAttribute('data-tip', `${dayLabel} · Effort ${e}/5`);
      }
    } else {
      div.setAttribute('data-tip', dayLabel);
    }

    grid.appendChild(div);
  });

  // ── Update stat labels ────────────────────────────────────────────────────
  const monthValEl = document.getElementById('history-month-val');
  const monthLbEl  = document.getElementById('history-month-label');
  if (monthValEl) monthValEl.textContent = `${showedCount} days`;
  if (monthLbEl)  monthLbEl.textContent  = 'Last 365 days';

  // Top contributions line: "X days showed up in the last year"
  if (contribEl) {
    contribEl.textContent =
      `${showedCount} day${showedCount !== 1 ? 's' : ''} showed up in the last year`;
  }

  // ── Scroll to rightmost (today's column) ─────────────────────────────────
  if (scrollEl) {
    requestAnimationFrame(() => {
      scrollEl.scrollLeft = scrollEl.scrollWidth;
    });
  }
}

// ── Streak pill ───────────────────────────────────────────────────────────────

function renderStreakPill() {
  const el = document.getElementById('history-streak-val');
  if (!el) return;
  const count = STATE.streak?.count ?? 0;
  el.textContent = `${count} ${count === 1 ? 'day' : 'days'}`;
}

// ── EOD Entry cards ───────────────────────────────────────────────────────────

function renderEntryCards() {
  const grid  = document.getElementById('history-grid');
  const empty = document.getElementById('history-empty');
  if (!grid) return;

  const byDate = new Map();
  STATE.history.forEach(entry => {
    if (!byDate.has(entry.date)) byDate.set(entry.date, entry);
  });

  const sorted = [...byDate.values()].sort((a, b) => b.date.localeCompare(a.date));

  if (sorted.length === 0) {
    grid.innerHTML = '';
    if (empty) empty.hidden = false;
    return;
  }
  if (empty) empty.hidden = true;

  const todayStr = new Date().toISOString().slice(0, 10);

  grid.innerHTML = sorted.map(entry => {
    const starsHtml = Array.from({ length: 5 }, (_, i) =>
      `<span class="history-star${i < entry.effort ? '' : ' empty'}">★</span>`
    ).join('');

    const showedDisplay = entry.showed === 'yes'
      ? '<span class="showed-yes">✓ Showed up</span>'
      : '<span class="showed-no">✗ Didn\'t show</span>';

    const completedHtml = entry.tasksCompleted != null
      ? `<div class="history-completed">⚡ ${entry.tasksCompleted}% tasks done</div>`
      : '';

    const isToday = entry.date === todayStr;

    return `
      <div class="history-entry${isToday ? ' history-entry--today' : ''}">
        <div class="history-entry-date-row">
          <span class="history-entry-date">${formatDateDisplay(entry.date)}</span>
          ${isToday ? '<span class="history-today-badge">Today</span>' : ''}
        </div>
        <div class="history-entry-showed">${showedDisplay}</div>
        <div class="history-effort">${starsHtml}</div>
        ${completedHtml}
        <div class="history-notes">${escapeHtml(entry.notes || '')}</div>
      </div>
    `;
  }).join('');
}

// ── Main Export ───────────────────────────────────────────────────────────────

export function renderHistory() {
  renderStreakPill();
  renderYearHeatmap();
  renderEntryCards();
}
