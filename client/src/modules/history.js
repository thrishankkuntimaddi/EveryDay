/**
 * history.js — History view rendering.
 * Deduplicates entries by date — one card per day, latest entry wins.
 */

import { STATE } from './state.js';
import { formatDateDisplay, escapeHtml } from '../utils/date.js';

export function renderHistory() {
  const grid  = document.getElementById('history-grid');
  const empty = document.getElementById('history-empty');
  if (!grid) return;

  // Deduplicate by date — keep the latest entry for each date
  const byDate = new Map();
  STATE.history.forEach(entry => {
    const existing = byDate.get(entry.date);
    // Keep whichever was added later (higher array index = more recent save)
    if (!existing) {
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
