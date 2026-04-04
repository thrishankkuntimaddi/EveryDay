/**
 * history.js — History view rendering.
 *
 * Renders:
 *  1. Streak + year activity stats pills
 *  2. GitHub-style FULL YEAR heatmap (Jan 1 → Dec 31 of current year)
 *     – week columns from left (Jan) to right (Dec)
 *     – month labels row at top, day-of-week labels on left
 *  3. Chronological EOD entry cards
 */

import { STATE } from './state.js';
import { formatDateDisplay, escapeHtml } from '../utils/date.js';

// ── Constants ─────────────────────────────────────────────────────────────────

const MONTH_SHORT = ['Jan','Feb','Mar','Apr','May','Jun',
                     'Jul','Aug','Sep','Oct','Nov','Dec'];

// ── Helpers ───────────────────────────────────────────────────────────────────

function isLeapYear(y) {
  return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
}

function totalDaysInYear(y) {
  return isLeapYear(y) ? 366 : 365;
}

function toDateStr(year, month1, day) {
  return `${year}-${String(month1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
}

// ── Full-Year GitHub-style Heatmap ────────────────────────────────────────────

function renderYearHeatmap() {
  const grid         = document.getElementById('heatmap-grid');
  const monthLblEl  = document.getElementById('gh-month-labels');
  const scrollEl    = document.getElementById('gh-scrollable');
  if (!grid) return;

  const now     = new Date();
  const year    = now.getFullYear();                       // e.g. 2026
  const totalDays = totalDaysInYear(year);
  const todayMidnight = new Date(year, now.getMonth(), now.getDate());
  const todayStr = now.toISOString().slice(0, 10);

  // Day-of-week the year starts on (0=Sun … 6=Sat)
  const firstDow = new Date(year, 0, 1).getDay();

  // ── Build flat cells[] in ROW-MAJOR order ──
  // With grid-auto-flow:column + 7 rows, the DOM order maps:
  //   item[i] → col = ⌊i/7⌋, row = i%7
  // So cells[0] = Sun of week 1, cells[1] = Mon of week 1, …
  //    cells[7] = Sun of week 2, etc.
  const cells = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);             // leading padding

  for (let d = 0; d < totalDays; d++) {
    const date = new Date(year, 0, d + 1);
    cells.push(toDateStr(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    ));
  }
  while (cells.length % 7 !== 0) cells.push(null);                  // trailing padding

  const numWeeks = cells.length / 7;

  // ── Month labels (one per week column) ──
  // Build a numWeeks-length array: label string or empty
  const weekLabels = new Array(numWeeks).fill('');
  cells.forEach((dateStr, idx) => {
    if (!dateStr) return;
    const d = new Date(dateStr);
    if (d.getDate() === 1) {
      const col = Math.floor(idx / 7);
      weekLabels[col] = MONTH_SHORT[d.getMonth()];
    }
  });

  if (monthLblEl) {
    monthLblEl.style.gridTemplateColumns = `repeat(${numWeeks}, var(--cell))`;
    monthLblEl.style.columnGap = 'var(--cell-gap)';
    monthLblEl.innerHTML = '';
    weekLabels.forEach(label => {
      const span = document.createElement('span');
      span.textContent = label;
      monthLblEl.appendChild(span);
    });
  }

  // ── Render cells ──
  let yearShowedCount = 0;
  grid.innerHTML = '';

  cells.forEach(dateStr => {
    const div = document.createElement('div');

    if (!dateStr) {
      div.className = 'heatmap-cell heatmap-cell--empty';
      grid.appendChild(div);
      return;
    }

    div.className = 'heatmap-cell';
    const cellDate = new Date(dateStr);
    const isFuture  = cellDate > todayMidnight;
    const isToday   = dateStr === todayStr;
    const entry     = STATE.history.find(h => h.date === dateStr);
    const dayLabel  = `${MONTH_SHORT[cellDate.getMonth()]} ${cellDate.getDate()}`;

    if (isToday) div.classList.add('heatmap-cell--today');

    if (isFuture) {
      div.classList.add('heatmap-cell--future');
      div.setAttribute('data-tip', dayLabel);
    } else if (entry) {
      if (entry.showed === 'no') {
        div.classList.add('heatmap-cell--miss');
        div.setAttribute('data-tip', `${dayLabel} · Missed`);
      } else {
        yearShowedCount++;
        const e = Math.min(Math.max(entry.effort || 1, 1), 5);
        div.classList.add(`heatmap-cell--e${e}`);
        div.setAttribute('data-tip', `${dayLabel} · Effort ${e}/5`);
      }
    } else {
      div.setAttribute('data-tip', dayLabel);
    }

    grid.appendChild(div);
  });

  // ── Update stats ──
  const monthValEl = document.getElementById('history-month-val');
  const monthLbEl  = document.getElementById('history-month-label');
  if (monthValEl) monthValEl.textContent = `${yearShowedCount} days`;
  if (monthLbEl)  monthLbEl.textContent  = `${year} Activity`;

  // ── Scroll to show today's column (on initial render) ──
  if (scrollEl) {
    requestAnimationFrame(() => {
      // Find today's cell and scroll it into view horizontally
      const todayCell = grid.querySelector('.heatmap-cell--today');
      if (todayCell) {
        const cellLeft   = todayCell.offsetLeft;
        const viewWidth  = scrollEl.offsetWidth;
        // Center today in the visible area
        scrollEl.scrollLeft = Math.max(0, cellLeft - viewWidth / 2);
      }
    });
  }
}

// ── Streak ────────────────────────────────────────────────────────────────────

function renderStreakPill() {
  const el = document.getElementById('history-streak-val');
  if (!el) return;
  const count = STATE.streak?.count ?? 0;
  el.textContent = `${count} ${count === 1 ? 'day' : 'days'}`;
}

// ── Entry Cards ───────────────────────────────────────────────────────────────

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
