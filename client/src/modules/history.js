/**
 * history.js — History view rendering.
 *
 * Renders:
 *  1. Streak pill + current-month activity summary
 *  2. GitHub-style monthly heatmap (week columns × day-of-week rows)
 *  3. Chronological EOD entry cards
 */

import { STATE } from './state.js';
import { formatDateDisplay, escapeHtml } from '../utils/date.js';

// ── Helpers ───────────────────────────────────────────────────────────────────

function daysInMonth(year, month1) {
  // month1 is 1-indexed
  return new Date(year, month1, 0).getDate();
}

function toDateStr(year, month1, day) {
  return `${year}-${String(month1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];

// ── GitHub-style Heatmap ──────────────────────────────────────────────────────

function renderMonthHeatmap() {
  const grid = document.getElementById('heatmap-grid');
  if (!grid) return;

  const now      = new Date();
  const year     = now.getFullYear();
  const monthIdx = now.getMonth();           // 0-indexed
  const month1   = monthIdx + 1;             // 1-indexed
  const monthName = MONTH_NAMES[monthIdx];
  const total    = daysInMonth(year, month1);
  const todayMidnight = new Date(year, monthIdx, now.getDate());

  // Update labels
  const titleEl = document.getElementById('history-heatmap-title');
  const labelEl = document.getElementById('history-month-label');
  if (titleEl) titleEl.textContent = `${monthName} ${year}`;
  if (labelEl) labelEl.textContent = `${monthName} Activity`;

  // First day of month: 0=Sun … 6=Sat
  const firstDow = new Date(year, monthIdx, 1).getDay();

  // Build cells array in ROW-MAJOR order:
  //   index 0 = Sun of week-1, index 1 = Mon of week-1, … index 6 = Sat of week-1
  //   index 7 = Sun of week-2, etc.
  // null = padding cell (before 1st or after last day)
  const cells = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);        // leading padding
  for (let d = 1; d <= total; d++) cells.push(toDateStr(year, month1, d));
  while (cells.length % 7 !== 0) cells.push(null);             // trailing padding

  // With CSS `grid-auto-flow: column` and `grid-template-rows: repeat(7, …)`,
  // DOM items fill top→bottom in col-0, then top→bottom in col-1, etc.
  // Our cells[] is already in the correct order (Sun…Sat per week).
  const numWeeks = cells.length / 7;

  let showedCount = 0;
  grid.innerHTML = '';
  grid.style.gridAutoColumns = 'var(--cell)';

  cells.forEach(dateStr => {
    const div = document.createElement('div');

    if (!dateStr) {
      div.className = 'heatmap-cell heatmap-cell--empty';
      grid.appendChild(div);
      return;
    }

    div.className = 'heatmap-cell';
    const dayNum   = parseInt(dateStr.split('-')[2], 10);
    const entry    = STATE.history.find(h => h.date === dateStr);
    const cellDate = new Date(year, monthIdx, dayNum);
    const dayLabel = `${monthName} ${dayNum}`;
    const isFuture = cellDate > todayMidnight;

    if (isFuture) {
      div.classList.add('heatmap-cell--future');
      div.setAttribute('data-tip', dayLabel);
    } else if (entry) {
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
      // Past day, no entry yet
      div.setAttribute('data-tip', dayLabel);
    }

    grid.appendChild(div);
  });

  // Month summary pill
  const monthValEl = document.getElementById('history-month-val');
  if (monthValEl) monthValEl.textContent = `${showedCount} / ${total} days`;
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
  renderMonthHeatmap();
  renderEntryCards();
}
