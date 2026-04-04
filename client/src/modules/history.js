/**
 * history.js — History view rendering.
 *
 * Renders:
 *  1. Streak pill + current-month activity summary
 *  2. Month-aware heatmap (days of the current calendar month — not always 30)
 *  3. Chronological EOD entry cards
 */

import { STATE } from './state.js';
import { formatDateDisplay, escapeHtml } from '../utils/date.js';

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Returns the number of days in a given month (1-indexed) of a given year */
function daysInMonth(year, month) {
  return new Date(year, month, 0).getDate(); // month here is 1-indexed
}

/** Build YYYY-MM-DD string */
function toDateStr(year, month, day) {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];

// ── Heatmap ───────────────────────────────────────────────────────────────────

function renderMonthHeatmap() {
  const grid = document.getElementById('heatmap-grid');
  if (!grid) return;

  const now   = new Date();
  const year  = now.getFullYear();
  const month = now.getMonth() + 1; // 1-indexed
  const total = daysInMonth(year, month);
  const monthName = MONTH_NAMES[month - 1];

  // Update title labels
  const titleEl = document.getElementById('history-heatmap-title');
  const labelEl = document.getElementById('history-month-label');
  if (titleEl) titleEl.textContent = `${monthName} Activity`;
  if (labelEl) labelEl.textContent = `${monthName} Activity`;

  // Count days showed up this month
  let showedCount = 0;

  grid.innerHTML = '';
  for (let day = 1; day <= total; day++) {
    const dateStr = toDateStr(year, month, day);
    const entry   = STATE.history.find(h => h.date === dateStr);
    const div     = document.createElement('div');
    div.className = 'heatmap-day';

    // Annotate day number tooltip
    const dayLabel = `${monthName} ${day}`;

    if (entry) {
      if (entry.showed === 'no') {
        div.classList.add('showed-no');
        div.setAttribute('data-tip', `${dayLabel} · Didn't show`);
      } else {
        showedCount++;
        if (entry.effort) {
          div.classList.add(`effort-${entry.effort}`);
        }
        div.setAttribute('data-tip', `${dayLabel} · Effort: ${entry.effort || '?'}/5`);
      }
    } else {
      // Future days get a subtle "future" class, past/today stay as empty
      const today = now.getDate();
      if (day > today) {
        div.classList.add('future-day');
      }
      div.setAttribute('data-tip', dayLabel);
    }

    grid.appendChild(div);
  }

  // Update month summary pill
  const monthValEl = document.getElementById('history-month-val');
  if (monthValEl) {
    monthValEl.textContent = `${showedCount} / ${total} days`;
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

  // Deduplicate by date — keep the latest entry for each date
  const byDate = new Map();
  STATE.history.forEach(entry => {
    if (!byDate.has(entry.date)) {
      byDate.set(entry.date, entry);
    }
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
    const todayBadge = isToday
      ? '<span class="history-today-badge">Today</span>'
      : '';

    return `
      <div class="history-entry${isToday ? ' history-entry--today' : ''}">
        <div class="history-entry-date-row">
          <span class="history-entry-date">${formatDateDisplay(entry.date)}</span>
          ${todayBadge}
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
