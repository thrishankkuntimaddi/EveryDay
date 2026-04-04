import { STATE } from './state.js';
import { formatDateDisplay, escapeHtml } from '../utils/date.js';

const MONTH_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function pad(n) { return String(n).padStart(2, '0'); }
function toDateStr(d) { return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`; }

// ── Rolling 365-day contribution heatmap ───────────────────────────────────────
//
//  Layout (CSS grid):
//    Row 1          = month name labels
//    Rows 2–8       = Sun, Mon, Tue, Wed, Thu, Fri, Sat  (one cell per day)
//    Columns        = one per week (Monday=start of column?, NO — Sun=row2)
//
//  Every cell gets EXPLICIT gridColumn + gridRow so auto-flow never runs.
//  Month labels live in row 1 at their week's column, text overflows right.
//  The natural ~4–5 wide columns per month create the visual cluster gap.
// ─────────────────────────────────────────────────────────────────────────────

function renderYearHeatmap() {
  const grid     = document.getElementById('heatmap-grid');
  const scrollEl = document.getElementById('gh-scrollable');
  if (!grid) return;

  /* ── Date math ──────────────────────────────────────────────────────── */
  const now   = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // 365-day window: [windowStart … today]
  const windowStart = new Date(today);
  windowStart.setDate(today.getDate() - 364);

  // Grid starts at the Sunday of windowStart's week
  const gridStart = new Date(windowStart);
  gridStart.setDate(windowStart.getDate() - windowStart.getDay()); // getDay()==0 → Sun

  // Grid ends at the Saturday of today's week
  const gridEnd = new Date(today);
  gridEnd.setDate(today.getDate() + (6 - today.getDay()));

  /* ── Build flat day array (always a multiple of 7) ─────────────────── */
  const days = [];
  for (let d = new Date(gridStart); d <= gridEnd; d.setDate(d.getDate() + 1)) {
    days.push(new Date(d));
  }
  const numWeeks = days.length / 7; // guaranteed integer (Sun→Sat span)

  /* ── Set up grid ────────────────────────────────────────────────────── */
  // Row 1 (height --lbl-h) = month labels
  // Rows 2-8 (height --cell each) = Sun through Sat
  grid.style.display             = 'grid';
  grid.style.gridTemplateColumns = `repeat(${numWeeks}, var(--cell))`;
  grid.style.gridTemplateRows    = `var(--lbl-h, 18px) repeat(7, var(--cell))`;
  grid.style.columnGap           = 'var(--cell-gap)';
  grid.style.rowGap              = 'var(--cell-gap)';
  grid.innerHTML                 = '';

  /* ── Month labels (grid row 1) ──────────────────────────────────────── */
  // Rule A: label the month of the very first in-window day (no day-of-month filter)
  // Rule B: label any month whose 1st day falls inside the window
  // This ensures e.g. Apr shows even when Apr 1 is before the window start.

  const labeledMonths = new Set(); // "YYYY-MM" keys to avoid duplicates

  function addLabel(weekIdx, date) {
    const key = `${date.getFullYear()}-${pad(date.getMonth() + 1)}`;
    if (labeledMonths.has(key)) return;
    labeledMonths.add(key);

    const lbl = document.createElement('span');
    lbl.className        = 'gh-month-lbl-item';
    lbl.textContent      = MONTH_SHORT[date.getMonth()];
    lbl.style.gridColumn = String(weekIdx + 1);
    lbl.style.gridRow    = '1';
    grid.appendChild(lbl);
  }

  // Rule A — first in-window month
  let ruleADone = false;
  outer:
  for (let w = 0; w < numWeeks; w++) {
    for (let r = 0; r < 7; r++) {
      const day = days[w * 7 + r];
      if (day >= windowStart && day <= today) {
        addLabel(w, day);
        ruleADone = true;
        break outer;
      }
    }
  }

  // Rule B — every day-1 in the window
  for (let w = 0; w < numWeeks; w++) {
    for (let r = 0; r < 7; r++) {
      const day = days[w * 7 + r];
      if (day >= windowStart && day <= today && day.getDate() === 1) {
        addLabel(w, day);
      }
    }
  }

  /* ── Day cells (grid rows 2–8) ──────────────────────────────────────── */
  // r=0 → Sun → gridRow 2
  // r=1 → Mon → gridRow 3
  // ...
  // r=6 → Sat → gridRow 8
  let showedCount = 0;
  const todayStr = toDateStr(today);

  for (let w = 0; w < numWeeks; w++) {
    for (let r = 0; r < 7; r++) {
      const day  = days[w * 7 + r];
      const div  = document.createElement('div');

      // ALWAYS set explicit placement — no auto-flow ever
      div.style.gridColumn = String(w + 1);
      div.style.gridRow    = String(r + 2);

      const inWindow = day >= windowStart && day <= today;

      if (!inWindow) {
        div.className = 'heatmap-cell heatmap-cell--empty';
        grid.appendChild(div);
        continue;
      }

      div.className = 'heatmap-cell';
      const ds      = toDateStr(day);
      const tip     = `${MONTH_SHORT[day.getMonth()]} ${day.getDate()}`;
      const entry   = STATE.history.find(h => h.date === ds);

      if (ds === todayStr) div.classList.add('heatmap-cell--today');

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
    }
  }

  /* ── Stats ──────────────────────────────────────────────────────────── */
  const lcCount = document.getElementById('gh-lc-count');
  const lcTotal = document.getElementById('gh-lc-total');
  if (lcCount) lcCount.textContent = String(showedCount);
  if (lcTotal) lcTotal.textContent = String(showedCount);

  /* ── Scroll to today ────────────────────────────────────────────────── */
  if (scrollEl) requestAnimationFrame(() => { scrollEl.scrollLeft = scrollEl.scrollWidth; });
}

/* ── Streak ─────────────────────────────────────────────────────────────────── */
function renderStreakPill() {
  const count  = STATE.streak?.count ?? 0;
  const oldEl  = document.getElementById('history-streak-val');
  const lcEl   = document.getElementById('gh-lc-streak');
  if (oldEl) oldEl.textContent = `${count} days`;
  if (lcEl)  lcEl.textContent  = String(count);
}

/* ── Entry cards ────────────────────────────────────────────────────────────── */
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
  renderYearHeatmap();
  renderEntryCards();
}
