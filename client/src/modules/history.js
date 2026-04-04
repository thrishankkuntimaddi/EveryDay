import { STATE } from './state.js';
import { formatDateDisplay, escapeHtml } from '../utils/date.js';

const MONTH_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function pad(n) { return String(n).padStart(2, '0'); }
function toDateStr(d) { return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`; }

// ─────────────────────────────────────────────────────────────────────────────
//  SVG-based heatmap — identical technique to LeetCode's contribution graph.
//
//  LeetCode uses:
//    cell = 8.86px,  inner-gap = 2.66px,  month-extra-gap = 4.47px
//    labels as <text> elements BELOW the grid at y ≈ 97px
//
//  We use:
//    C = 11px,  G = 2px,  MG = 6px  (proportionally same visual)
//    PITCH (within month) = C + G = 13px
//    Between months x-jump = PITCH + MG = 19px
// ─────────────────────────────────────────────────────────────────────────────

const C  = 11;          // cell size (px)
const G  = 2;           // gap between cells
const MG = 6;           // EXTRA gap added between month groups
const P  = C + G;       // within-month x pitch = 13

function renderYearHeatmap() {
  const container = document.getElementById('heatmap-grid');
  const scrollEl  = document.getElementById('gh-scrollable');
  if (!container) return;

  /* ── Date math ──────────────────────────────────────────────────────── */
  const now   = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const todayStr = toDateStr(today);

  const windowStart = new Date(today);
  windowStart.setDate(today.getDate() - 364);           // 365-day rolling window

  const gridStart = new Date(windowStart);
  gridStart.setDate(windowStart.getDate() - windowStart.getDay()); // back to Sunday

  const gridEnd = new Date(today);
  gridEnd.setDate(today.getDate() + (6 - today.getDay())); // forward to Saturday

  /* ── Build flat day array (always multiple of 7) ─────────────────── */
  const days = [];
  for (let d = new Date(gridStart); d <= gridEnd; d.setDate(d.getDate() + 1)) {
    days.push(new Date(d));
  }
  const W = days.length / 7;  // total week columns

  /* ── Detect month label positions ──────────────────────────────────── */
  // Rule A: label the first in-window month at the week containing its first in-window day.
  // Rule B: label every month whose day-1 falls inside the window.
  const labels = []; // [{ wi, month }]  sorted by wi
  const seenKey = new Set();

  // Rule A
  outer:
  for (let w = 0; w < W; w++) {
    for (let r = 0; r < 7; r++) {
      const d = days[w * 7 + r];
      if (d >= windowStart && d <= today) {
        const key = `${d.getFullYear()}-${d.getMonth()}`;
        seenKey.add(key);
        labels.push({ wi: w, month: d.getMonth() });
        break outer;
      }
    }
  }

  // Rule B
  for (let w = 0; w < W; w++) {
    for (let r = 0; r < 7; r++) {
      const d = days[w * 7 + r];
      if (d >= windowStart && d <= today && d.getDate() === 1) {
        const key = `${d.getFullYear()}-${d.getMonth()}`;
        if (!seenKey.has(key)) {
          seenKey.add(key);
          labels.push({ wi: w, month: d.getMonth() });
        }
      }
    }
  }
  labels.sort((a, b) => a.wi - b.wi);

  /* ── Compute SVG x position of each week column ─────────────────── */
  // Between months we add MG extra pixels; within a month just P pitch.
  const boundarySet = new Set(labels.map(l => l.wi));
  const weekX = new Float32Array(W);
  weekX[0] = 0;
  for (let w = 1; w < W; w++) {
    weekX[w] = weekX[w-1] + P + (boundarySet.has(w) ? MG : 0);
  }

  /* ── SVG dimensions ─────────────────────────────────────────────── */
  const svgW   = W > 0 ? weekX[W-1] + C : 0;    // total width
  const gridH  = 7 * C + 6 * G;                  // 7×11 + 6×2 = 89px
  const labelY = gridH + 14;                      // 103px — below the grid
  const svgH   = labelY + 13;                     // 116px total SVG height

  /* ── Build entries map ───────────────────────────────────────────── */
  const entMap = new Map();
  STATE.history.forEach(e => { if (!entMap.has(e.date)) entMap.set(e.date, e); });

  /* ── Render SVG ─────────────────────────────────────────────────── */
  let showedCount = 0;
  const parts = [];

  for (let w = 0; w < W; w++) {
    const x = weekX[w].toFixed(2);

    for (let r = 0; r < 7; r++) {
      const day    = days[w * 7 + r];
      const y      = (r * P).toFixed(2);
      const inWin  = day >= windowStart && day <= today;

      if (!inWin) {
        // Out-of-window cells: transparent placeholder (keeps geometry correct)
        parts.push(`<rect x="${x}" y="${y}" width="${C}" height="${C}" fill="transparent" rx="2"/>`);
        continue;
      }

      const ds     = toDateStr(day);
      const isToday = ds === todayStr;
      const tip    = `${MONTH_SHORT[day.getMonth()]} ${day.getDate()}`;
      const entry  = entMap.get(ds);

      let fill   = 'var(--heat-0)';
      let stroke = isToday ? 'var(--heat-ring)' : 'none';
      let sw     = isToday ? '1.5' : '0';

      if (entry) {
        if (entry.showed === 'no') {
          fill = 'var(--heat-miss)';
        } else {
          showedCount++;
          const e = Math.min(Math.max(entry.effort || 1, 1), 5);
          fill = `var(--heat-${e})`;
        }
      }

      parts.push(
        `<rect x="${x}" y="${y}" width="${C}" height="${C}" ` +
        `fill="${fill}" rx="2" stroke="${stroke}" stroke-width="${sw}" ` +
        `class="hm-cell"><title>${tip}</title></rect>`
      );
    }
  }

  // Month labels — <text> elements below the grid (y = labelY)
  labels.forEach(({ wi, month }) => {
    const x = weekX[wi].toFixed(2);
    parts.push(`<text x="${x}" y="${labelY}" class="hm-label">${MONTH_SHORT[month]}</text>`);
  });

  /* ── Inject SVG ─────────────────────────────────────────────────── */
  // Clear any lingering grid inline styles from previous renders
  container.removeAttribute('style');
  container.innerHTML =
    `<svg viewBox="0 0 ${svgW} ${svgH}" width="${svgW}" class="hm-svg">${parts.join('')}</svg>`;

  /* ── Year-range label ────────────────────────────────────────────── */
  const rangeEl = document.getElementById('gh-year-range');
  if (rangeEl) {
    const wsMonth = MONTH_SHORT[windowStart.getMonth()];
    const wsYear  = windowStart.getFullYear();
    const teMonth = MONTH_SHORT[today.getMonth()];
    const teYear  = today.getFullYear();
    rangeEl.textContent = `${wsMonth} ${wsYear} – ${teMonth} ${teYear}`;
  }

  /* ── Debug: log per-month cell counts to console ─────────────────── */
  if (import.meta.env.DEV) {
    const monthDayCounts = new Map();
    for (let w = 0; w < W; w++) {
      for (let r = 0; r < 7; r++) {
        const day = days[w * 7 + r];
        if (day >= windowStart && day <= today) {
          const key = `${MONTH_SHORT[day.getMonth()]} ${day.getFullYear()}`;
          monthDayCounts.set(key, (monthDayCounts.get(key) || 0) + 1);
        }
      }
    }
    console.debug('[Heatmap] Days per month in window:');
    monthDayCounts.forEach((count, key) => console.debug(`  ${key}: ${count} days`));
  }

  /* ── Stats ───────────────────────────────────────────────────────── */
  const lcCount = document.getElementById('gh-lc-count');
  const lcTotal = document.getElementById('gh-lc-total');
  if (lcCount) lcCount.textContent = String(showedCount);
  if (lcTotal) lcTotal.textContent = String(showedCount);

  /* ── Scroll to today ─────────────────────────────────────────────── */
  if (scrollEl) requestAnimationFrame(() => { scrollEl.scrollLeft = scrollEl.scrollWidth; });
}

/* ── Streak ─────────────────────────────────────────────────────────────────── */
function renderStreakPill() {
  const count = STATE.streak?.count ?? 0;
  const oldEl = document.getElementById('history-streak-val');
  const lcEl  = document.getElementById('gh-lc-streak');
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
