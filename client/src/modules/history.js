import { STATE } from './state.js';
import { formatDateDisplay, escapeHtml } from '../utils/date.js';

const MONTH_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const MONTH_FULL  = ['January','February','March','April','May','June','July','August','September','October','November','December'];

// ═══════════════════════════════════════════════════════════════════════════════
// STEP 1 — Generate REAL dates (last 365 days, oldest → newest)
// Exact logic provided — DO NOT CHANGE
// ═══════════════════════════════════════════════════════════════════════════════
function generateDateRange(days = 365) {
  const dates = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    dates.push(new Date(d));
  }

  return dates;
}

// ═══════════════════════════════════════════════════════════════════════════════
// STEP 2 — Group into weeks using getDay() as slot index
// Each week is new Array(7).fill(null); date goes into week[date.getDay()]
// Saturday (6) = end of week → flush and start fresh
// Exact logic provided — DO NOT CHANGE
// ═══════════════════════════════════════════════════════════════════════════════
function groupIntoWeeks(dates) {
  const weeks = [];
  let currentWeek = new Array(7).fill(null);

  dates.forEach((date) => {
    const day = date.getDay(); // 0 = Sunday, 6 = Saturday

    currentWeek[day] = date;

    if (day === 6) {
      weeks.push(currentWeek);
      currentWeek = new Array(7).fill(null);
    }
  });

  // push last incomplete week
  if (currentWeek.some(d => d !== null)) {
    weeks.push(currentWeek);
  }

  return weeks;
}

// ═══════════════════════════════════════════════════════════════════════════════
// STEP 2b — Key and color helpers
// Exact logic provided — DO NOT CHANGE
// ═══════════════════════════════════════════════════════════════════════════════
function getDateKey(date) {
  return date.toISOString().split('T')[0];
}

function getColor(count) {
  if (!count)    return 'hm-l0';  // #2a2a2a equivalent
  if (count < 3) return 'hm-l1';  // light violet
  if (count < 6) return 'hm-l2';  // medium violet
  return             'hm-l3';     // bright violet
}

// ═══════════════════════════════════════════════════════════════════════════════
// STEP 3 — Map activity data to dates
// STATE.history: [{ date: "YYYY-MM-DD", showed: "yes"|"no", effort: 1-5, ... }]
// ═══════════════════════════════════════════════════════════════════════════════
function buildActivityMap() {
  const data = {};
  const seen = new Set();

  for (const entry of STATE.history) {
    if (!entry.date || seen.has(entry.date)) continue;
    seen.add(entry.date);
    if (entry.showed === 'yes') {
      // effort 1-5 maps to count 1-5 for getColor() thresholds
      data[entry.date] = entry.effort || 1;
    } else {
      // showed = "no" → missed day (special class)
      data[entry.date] = -1;
    }
  }

  return data;
}

// ═══════════════════════════════════════════════════════════════════════════════
// STEP 4 — Month labels: scan weeks, detect month boundary per column
// ═══════════════════════════════════════════════════════════════════════════════
function buildMonthLabels(weeks) {
  const labels = [];  // [{ colIndex, name }]
  const seen = new Set();

  weeks.forEach((week, ci) => {
    // first non-null date in this column
    const first = week.find(d => d !== null);
    if (!first) return;

    const mk = `${first.getFullYear()}-${first.getMonth()}`;
    if (!seen.has(mk)) {
      seen.add(mk);
      labels.push({ colIndex: ci, name: MONTH_SHORT[first.getMonth()] });
    }
  });

  return labels;
}

// ═══════════════════════════════════════════════════════════════════════════════
// STEP 5 — Render: columns (weeks) × rows (day index 0–6)
// ═══════════════════════════════════════════════════════════════════════════════
function renderCalendarHeatmap() {
  const container = document.getElementById('heatmap-grid');
  if (!container) return;

  // STEP 1: real dates
  const dates = generateDateRange(365);

  // STEP 2: map data
  const data = buildActivityMap();

  // STEP 3: group into weeks
  const weeks = groupIntoWeeks(dates);

  // today's key for highlight ring
  const todayKey = getDateKey(new Date());

  // ── Stats ────────────────────────────────────────────────────────────────────
  let activeDays = 0;
  dates.forEach(d => {
    const k = getDateKey(d);
    if (data[k] && data[k] > 0) activeDays++;
  });

  // ── Month labels (STEP 5) ─────────────────────────────────────────────────────
  const monthLabels = buildMonthLabels(weeks);

  // ── Layout constants ─────────────────────────────────────────────────────────
  const CELL  = 13;  // px — cell width & height
  const GAP   =  3;  // px — gap between cells and weeks
  const STEP  = CELL + GAP;  // px — per-column offset

  // Month row HTML (absolute-positioned spans)
  const monthRowHTML = monthLabels.map(({ colIndex, name }) =>
    `<span class="hm-month-label" style="left:${colIndex * STEP}px">${name}</span>`
  ).join('');

  // Grid HTML — one .hm-week div per column, 7 .hm-cell divs per week (rows = day index)
  const gridHTML = weeks.map((week) => {
    const cellsHTML = week.map((date, rowIndex) => {
      // null slot → invisible placeholder (preserves grid shape)
      if (!date) {
        return `<div class="hm-cell hm-cell--empty"></div>`;
      }

      const key     = getDateKey(date);   // exact logic from provided code
      const count   = data[key] || 0;
      const isMiss  = data[key] === -1;
      const isToday = key === todayKey;

      const colorClass = isMiss ? 'hm-miss' : getColor(count);
      const todayCls   = isToday ? ' hm-today' : '';

      // Tooltip: "April 3, 2026 — 3 activities"
      const friendly  = `${MONTH_FULL[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
      const countText = isMiss
        ? 'missed day'
        : count > 0
          ? `effort ${count}/5`
          : 'no activity';

      return `<div class="hm-cell ${colorClass}${todayCls}" title="${friendly} — ${countText}" data-date="${key}"></div>`;
    }).join('');

    return `<div class="hm-week">${cellsHTML}</div>`;
  }).join('');

  const totalWidth = weeks.length * STEP - GAP;

  container.innerHTML = `
    <div class="hm-root" style="--hm-cell:${CELL}px;--hm-gap:${GAP}px;">
      <div class="hm-month-row" style="position:relative;width:${totalWidth}px;height:20px;margin-bottom:4px;">
        ${monthRowHTML}
      </div>
      <div class="hm-grid-body">
        ${gridHTML}
      </div>
    </div>
  `;

  // ── Update header counters ────────────────────────────────────────────────────
  const countEl  = document.getElementById('gh-lc-count');
  const totalEl  = document.getElementById('gh-lc-total');
  const subEl    = document.querySelector('.gh-lc-sub');
  const streakEl = document.getElementById('gh-lc-streak');
  const rangeEl  = document.getElementById('gh-year-range');

  if (countEl)  countEl.textContent  = String(activeDays);
  if (totalEl)  totalEl.textContent  = String(activeDays);
  if (subEl)    subEl.textContent    = ' days active in the past year';
  if (streakEl) streakEl.textContent = String(STATE.streak?.count ?? 0);
  if (rangeEl)  rangeEl.textContent  = '';
}

// ─── Entry Cards ──────────────────────────────────────────────────────────────
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

  const todayKey = getDateKey(new Date());
  grid.innerHTML = sorted.map(entry => {
    const stars  = Array.from({ length: 5 }, (_, i) =>
      `<span class="history-star${i < entry.effort ? '' : ' empty'}">★</span>`).join('');
    const showed = entry.showed === 'yes'
      ? '<span class="showed-yes">✓ Showed up</span>'
      : `<span class="showed-no">✗ Didn't show</span>`;
    const done = entry.tasksCompleted != null
      ? `<div class="history-completed">⚡ ${entry.tasksCompleted}% tasks done</div>` : '';
    const isToday = entry.date === todayKey;
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

// ─── Streak pill ──────────────────────────────────────────────────────────────
function renderStreakPill() {
  const count = STATE.streak?.count ?? 0;
  const oldEl = document.getElementById('history-streak-val');
  const lcEl  = document.getElementById('gh-lc-streak');
  if (oldEl) oldEl.textContent = `${count} days`;
  if (lcEl)  lcEl.textContent  = String(count);
}

// ─── Public ───────────────────────────────────────────────────────────────────
export function renderHistory() {
  renderStreakPill();
  renderCalendarHeatmap();
  renderEntryCards();
}
