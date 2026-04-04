import { STATE } from './state.js';
import { formatDateDisplay, escapeHtml } from '../utils/date.js';

const MONTH_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function pad(n) { return String(n).padStart(2, '0'); }
function toDateStr(d) { return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`; }

// ─── 30-day activity strip ────────────────────────────────────────────────────
function render30DayStrip() {
  const container = document.getElementById('heatmap-grid');
  if (!container) return;

  const now   = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // Build last-30 days array (oldest → newest)
  const days = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    days.push(d);
  }

  // Entry lookup
  const entMap = new Map();
  STATE.history.forEach(e => { if (!entMap.has(e.date)) entMap.set(e.date, e); });

  let showedCount = 0;
  const todayStr = toDateStr(today);

  const cells = days.map(day => {
    const ds      = toDateStr(day);
    const isToday = ds === todayStr;
    const entry   = entMap.get(ds);
    const label   = `${MONTH_SHORT[day.getMonth()]} ${day.getDate()}`;

    let cls = 'day-cell';
    if (isToday) cls += ' day-cell--today';

    if (entry) {
      if (entry.showed === 'no') {
        cls += ' day-cell--miss';
      } else {
        showedCount++;
        const e = Math.min(Math.max(entry.effort || 1, 1), 5);
        cls += ` day-cell--e${e}`;
      }
    }

    return `<div class="${cls}" title="${label}"></div>`;
  }).join('');

  container.innerHTML = `<div class="day-strip">${cells}</div>`;

  // Update header count
  const countEl = document.getElementById('gh-lc-count');
  const totalEl = document.getElementById('gh-lc-total');
  if (countEl) countEl.textContent = String(showedCount);
  if (totalEl) totalEl.textContent = String(showedCount);

  // Update range label
  const rangeEl = document.getElementById('gh-year-range');
  if (rangeEl) {
    const first = days[0];
    rangeEl.textContent = `Last 30 days`;
  }
}

/* ── Streak ──────────────────────────────────────────────────────────────────── */
function renderStreakPill() {
  const count = STATE.streak?.count ?? 0;
  const oldEl = document.getElementById('history-streak-val');
  const lcEl  = document.getElementById('gh-lc-streak');
  if (oldEl) oldEl.textContent = `${count} days`;
  if (lcEl)  lcEl.textContent  = String(count);
}

/* ── Entry cards ─────────────────────────────────────────────────────────────── */
function renderEntryCards() {
  const grid  = document.getElementById('history-grid');
  const empty = document.getElementById('history-empty');
  if (!grid) return;

  const byDate = new Map();
  STATE.history.forEach(e => { if (!byDate.has(e.date)) byDate.set(e.date, e); });
  const sorted = [...byDate.values()].sort((a, b) => b.date.localeCompare(a.date));

  if (!sorted.length) {
    grid.innerHTML = '';
    if (empty) empty.hidden = false;
    return;
  }
  if (empty) empty.hidden = true;

  const todayStr = toDateStr(new Date());
  grid.innerHTML = sorted.map(entry => {
    const stars = Array.from({ length: 5 }, (_, i) =>
      `<span class="history-star${i < entry.effort ? '' : ' empty'}">★</span>`).join('');
    const showed = entry.showed === 'yes'
      ? '<span class="showed-yes">✓ Showed up</span>'
      : '<span class="showed-no">✗ Didn\'t show</span>';
    const done = entry.tasksCompleted != null
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
  render30DayStrip();
  renderEntryCards();
}
