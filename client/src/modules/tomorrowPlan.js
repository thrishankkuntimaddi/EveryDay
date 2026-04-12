/**
 * tomorrowPlan.js — Plan for Tomorrow: Full Block+Task Editor
 * ============================================================
 * A standalone, always-accessible editor for tomorrow's plan.
 * Saves to Firestore `planTomorrow.blocks`.
 * At midnight (00:00–03:59), planEditor.js carry-forward promotes it to today's BLOCKS.
 *
 * Public API:
 *   renderTomorrowPlan()          — seed draft + render into #tomorrow-plan-grid
 *   collectAndSaveTomorrowPlan()  — sync DOM → draft → Firestore (called by submitEOD)
 */

import { BLOCKS } from './data.js';
import { getCached, patchUserData } from '../lib/db.js';
import { showToast } from '../utils/toast.js';

// ── Module State ──────────────────────────────────────────────────────────────

let _tDraft    = [];          // Working copy of tomorrow's blocks
let _collapsed = new Map();   // blockId → boolean (true = collapsed)

// ── Persistence ───────────────────────────────────────────────────────────────

function _seedDraft() {
  const saved = getCached('planTomorrow', null);
  if (saved && Array.isArray(saved.blocks) && saved.blocks.length > 0) {
    _tDraft = JSON.parse(JSON.stringify(saved.blocks));
  } else {
    // Default: clone today's BLOCKS as a starting template
    _tDraft = JSON.parse(JSON.stringify(BLOCKS)).map(b => {
      // Strip focusNote from older format; reset tasks to same structure
      const { focusNote: _fn, ...block } = b;
      return { ...block, tasks: (block.tasks || []).map(t => ({
        ...t,
        desc: t.desc || '',
        subTasks: t.subTasks || [],
      }))};
    });
  }
  // All collapsed by default (don't reset if re-rendering after mutation)
  if (_collapsed.size === 0) {
    _tDraft.forEach(b => _collapsed.set(b.id, true));
  }
}

function _save() {
  patchUserData({
    planTomorrow: {
      blocks:  JSON.parse(JSON.stringify(_tDraft)),
      savedAt: new Date().toISOString(),
    },
  }).catch(err => console.warn('[EveryDay] tomorrowPlan save failed:', err.message));
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Render the Plan-for-Tomorrow editor into #tomorrow-plan-grid.
 * Safe to call multiple times (full re-render each time).
 */
export function renderTomorrowPlan() {
  _seedDraft();
  _renderAll();
}

/**
 * resetTomorrowPlan — wipe all module-level state.
 * MUST be called on logout to prevent _tDraft leaking to the next user session.
 */
export function resetTomorrowPlan() {
  _tDraft    = [];
  _collapsed.clear();
  // Clear the rendered grid so no stale HTML is visible
  const grid = document.getElementById('tomorrow-plan-grid');
  if (grid) grid.innerHTML = '';
}

/**
 * Sync DOM → _tDraft → Firestore.
 * Called by eod.js submitEOD() so the latest inline edits are captured.
 * Returns true if there's any meaningful content worth saving.
 */
export function collectAndSaveTomorrowPlan() {
  _syncDraftFromDOM();
  const hasTasks = _tDraft.some(b => b.tasks?.some(t => t.label.trim()));
  if (hasTasks) {
    _save();
    return true;
  }
  // Nothing meaningful — clear it
  patchUserData({ planTomorrow: null }).catch(() => {});
  return false;
}

// ── Render ────────────────────────────────────────────────────────────────────

function _renderAll() {
  const container = document.getElementById('tomorrow-plan-grid');
  if (!container) return;

  container.innerHTML = [
    ..._tDraft.map((block, bi) => _buildBlockHTML(block, bi)),
    `<div class="tmp-add-block-row">
       <button class="tmp-add-block-btn" id="tmp-add-block-btn">
         <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
           <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
         </svg>
         Add Block
       </button>
     </div>`,
  ].join('');

  _bindAll(container);
}

function _buildBlockHTML(block, bi) {
  const isExpanded = _collapsed.get(block.id) === false;
  const taskCount  = (block.tasks || []).length;

  return `
    <div class="tmp-block-card${isExpanded ? ' expanded' : ''}"
         id="tmp-block-${block.id}" data-bi="${bi}">

      <!-- Block header: click to collapse/expand -->
      <div class="tmp-block-header" id="tmp-bh-${block.id}" role="button"
           tabindex="0" aria-expanded="${isExpanded}">
        <div class="tmp-bh-left">
          <div class="tmp-block-icon">${block.icon}</div>
          <div class="tmp-block-info">
            <div class="tmp-block-name">${_esc(block.name)}</div>
            <div class="tmp-block-time">${block.time}</div>
          </div>
        </div>
        <div class="tmp-bh-right">
          <span class="tmp-task-count">${taskCount} task${taskCount !== 1 ? 's' : ''}</span>
          <button class="tmp-del-block-btn" data-bi="${bi}"
                  title="Remove block" type="button" aria-label="Delete block">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
              <path d="M10 11v6M14 11v6M9 6V4h6v2"/>
            </svg>
          </button>
          <svg class="tmp-chevron" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2.2">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
      </div>

      <!-- Block body: task list -->
      <div class="tmp-block-body" id="tmp-bb-${block.id}">
        <div class="tmp-task-list" id="tmp-tasks-${bi}">
          ${(block.tasks || []).map((t, ti) => _buildTaskHTML(t, bi, ti)).join('')}
        </div>
        <button class="tmp-add-task-btn" data-bi="${bi}" type="button">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add task
        </button>
      </div>
    </div>
  `;
}

function _buildTaskHTML(task, bi, ti) {
  const desc = task.desc || '';
  const subs = task.subTasks || [];

  return `
    <div class="tmp-task-row" id="tmp-task-${bi}-${ti}" data-bi="${bi}" data-ti="${ti}">
      <div class="tmp-task-main">
        <span class="tmp-task-dot"></span>
        <input class="tmp-task-input" data-bi="${bi}" data-ti="${ti}"
               value="${_esc(task.label)}" placeholder="Task name…" />
        <label class="tmp-core-wrap" title="Mark as Essential">
          <input type="checkbox" class="tmp-core-cb" data-bi="${bi}" data-ti="${ti}"
                 ${task.isCore ? 'checked' : ''} />
          <span class="tmp-essential-pill">Essential</span>
        </label>
        <button class="tmp-desc-btn${desc ? ' has-desc' : ''}" data-bi="${bi}" data-ti="${ti}"
                title="${desc ? 'Edit description' : 'Add description'}"
                type="button" aria-label="Task description">ℹ</button>
        <button class="tmp-task-del-btn" data-bi="${bi}" data-ti="${ti}"
                title="Delete task" type="button">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      <!-- Description panel (hidden by default) -->
      <div class="tmp-desc-panel" id="tmp-dp-${bi}-${ti}" hidden>
        <textarea class="tmp-desc-ta" data-bi="${bi}" data-ti="${ti}"
                  placeholder="Describe the essence of this task for tomorrow…"
                  rows="2">${_esc(desc)}</textarea>
      </div>

      <!-- Sub-tasks -->
      <div class="tmp-sub-list" id="tmp-subs-${bi}-${ti}">
        ${subs.map((s, si) => _buildSubHTML(s, bi, ti, si)).join('')}
      </div>
      <button class="tmp-add-sub-btn" data-bi="${bi}" data-ti="${ti}" type="button">
        ↳ Add sub-task
      </button>
    </div>
  `;
}

function _buildSubHTML(sub, bi, ti, si) {
  return `
    <div class="tmp-sub-row" data-bi="${bi}" data-ti="${ti}" data-si="${si}">
      <span class="tmp-sub-bullet">↳</span>
      <input class="tmp-sub-input" data-bi="${bi}" data-ti="${ti}" data-si="${si}"
             value="${_esc(sub.label)}" placeholder="Sub-task…" />
      <button class="tmp-sub-del-btn" data-bi="${bi}" data-ti="${ti}" data-si="${si}"
              title="Remove" type="button">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2.5">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
  `;
}

// ── Event Binding ─────────────────────────────────────────────────────────────

function _bindAll(container) {

  // ── Block header collapse/expand ──────────────────────────────────────────
  container.querySelectorAll('.tmp-block-header').forEach(hdr => {
    const blockId = hdr.id.replace('tmp-bh-', '');
    const toggle  = () => {
      const card       = document.getElementById(`tmp-block-${blockId}`);
      const isExpanded = card.classList.contains('expanded');
      card.classList.toggle('expanded', !isExpanded);
      hdr.setAttribute('aria-expanded', String(!isExpanded));
      _collapsed.set(blockId, isExpanded); // isExpanded=true → now collapsing
    };
    hdr.addEventListener('click', e => {
      // Don't toggle if the click was on the delete button
      if (e.target.closest('.tmp-del-block-btn')) return;
      toggle();
    });
    hdr.addEventListener('keydown', e => {
      if ((e.key === 'Enter' || e.key === ' ') && !e.target.closest('.tmp-del-block-btn')) {
        e.preventDefault(); toggle();
      }
    });
  });

  // ── Delete block ──────────────────────────────────────────────────────────
  container.querySelectorAll('.tmp-del-block-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const bi = +btn.dataset.bi;
      if (_tDraft.length === 1) { showToast('Need at least one block', 'error'); return; }
      if (!confirm(`Remove block "${_tDraft[bi]?.name}"?`)) return;
      _syncDraftFromDOM();
      _tDraft.splice(bi, 1);
      _save();
      _renderAll();
    });
  });

  // ── Task label input ──────────────────────────────────────────────────────
  container.querySelectorAll('.tmp-task-input').forEach(el => {
    el.addEventListener('input', () => {
      const [bi, ti] = _coords(el);
      if (_tDraft[bi]?.tasks[ti]) _tDraft[bi].tasks[ti].label = el.value;
    });
    el.addEventListener('blur', _save);
    el.addEventListener('click', e => e.stopPropagation());
  });

  // ── Essential checkbox ────────────────────────────────────────────────────
  container.querySelectorAll('.tmp-core-cb').forEach(cb => {
    cb.addEventListener('change', () => {
      const [bi, ti] = _coords(cb);
      if (_tDraft[bi]?.tasks[ti]) {
        _tDraft[bi].tasks[ti].isCore = cb.checked;
        _save();
      }
    });
  });

  // ── ℹ Description toggle ─────────────────────────────────────────────────
  container.querySelectorAll('.tmp-desc-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const [bi, ti] = _coords(btn);
      const panel    = document.getElementById(`tmp-dp-${bi}-${ti}`);
      if (!panel) return;
      const opening  = panel.hidden;
      panel.hidden   = !opening;
      btn.classList.toggle('active', opening);
      if (opening) setTimeout(() => panel.querySelector('textarea')?.focus(), 50);
    });
  });

  // ── Description textarea ──────────────────────────────────────────────────
  container.querySelectorAll('.tmp-desc-ta').forEach(ta => {
    ta.addEventListener('input', () => {
      const [bi, ti] = _coords(ta);
      if (_tDraft[bi]?.tasks[ti]) {
        _tDraft[bi].tasks[ti].desc = ta.value;
        // Update ℹ indicator
        const btn = container.querySelector(`.tmp-desc-btn[data-bi="${bi}"][data-ti="${ti}"]`);
        if (btn) btn.classList.toggle('has-desc', ta.value.trim().length > 0);
      }
    });
    ta.addEventListener('blur', _save);
    ta.addEventListener('click', e => e.stopPropagation());
  });

  // ── Delete task ───────────────────────────────────────────────────────────
  container.querySelectorAll('.tmp-task-del-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const [bi, ti] = _coords(btn);
      _syncDraftFromDOM();
      _tDraft[bi]?.tasks.splice(ti, 1);
      _save();
      _refreshTaskList(container, bi);
    });
  });

  // ── Add task ──────────────────────────────────────────────────────────────
  container.querySelectorAll('.tmp-add-task-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const bi = +btn.dataset.bi;
      if (!_tDraft[bi]) return;
      _syncDraftFromDOM();
      _tDraft[bi].tasks.push({
        id: `tmpt-${Date.now()}`,
        label:    '',
        isCore:   false,
        desc:     '',
        subTasks: [],
      });
      _save();
      _refreshTaskList(container, bi);
      // Focus the new input
      const listEl = document.getElementById(`tmp-tasks-${bi}`);
      const inputs = listEl?.querySelectorAll('.tmp-task-input');
      if (inputs?.length) inputs[inputs.length - 1].focus();
    });
  });

  // ── Sub-task input ────────────────────────────────────────────────────────
  container.querySelectorAll('.tmp-sub-input').forEach(el => {
    el.addEventListener('input', () => {
      const [bi, ti, si] = _subCoords(el);
      if (_tDraft[bi]?.tasks[ti]?.subTasks?.[si]) {
        _tDraft[bi].tasks[ti].subTasks[si].label = el.value;
      }
    });
    el.addEventListener('blur', _save);
    el.addEventListener('click', e => e.stopPropagation());
  });

  // ── Delete sub-task ───────────────────────────────────────────────────────
  container.querySelectorAll('.tmp-sub-del-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const [bi, ti, si] = _subCoords(btn);
      _syncDraftFromDOM();
      _tDraft[bi]?.tasks[ti]?.subTasks?.splice(si, 1);
      _save();
      _refreshTaskList(container, bi);
    });
  });

  // ── Add sub-task ──────────────────────────────────────────────────────────
  container.querySelectorAll('.tmp-add-sub-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const [bi, ti] = _coords(btn);
      if (!_tDraft[bi]?.tasks[ti]) return;
      _syncDraftFromDOM();
      if (!_tDraft[bi].tasks[ti].subTasks) _tDraft[bi].tasks[ti].subTasks = [];
      _tDraft[bi].tasks[ti].subTasks.push({
        id:    `tmps-${Date.now()}`,
        label: '',
        isCore: false,
      });
      _save();
      _refreshTaskList(container, bi);
      // Focus new subtask
      const subList = document.getElementById(`tmp-subs-${bi}-${ti}`);
      const inputs  = subList?.querySelectorAll('.tmp-sub-input');
      if (inputs?.length) inputs[inputs.length - 1].focus();
    });
  });

  // ── Add block ─────────────────────────────────────────────────────────────
  document.getElementById('tmp-add-block-btn')?.addEventListener('click', () => {
    _syncDraftFromDOM();
    const id = `tmpb-${Date.now()}`;
    _tDraft.push({
      id,
      name:  'New Block',
      icon:  '⭐',
      time:  _nextHour(),
      color: 'linear-gradient(90deg,#7c3aed,#9d64f8)',
      tasks: [{ id: `tmpt-${Date.now()}`, label: '', isCore: false, desc: '', subTasks: [] }],
    });
    _collapsed.set(id, false); // open the new block
    _save();
    _renderAll();
    // Scroll to and focus
    setTimeout(() => {
      const card = document.getElementById(`tmp-block-${id}`);
      card?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      card?.querySelector('.tmp-task-input')?.focus();
    }, 60);
  });
}

// ── Partial refresh (task list only) ─────────────────────────────────────────

function _refreshTaskList(container, bi) {
  _syncDraftFromDOM();
  const block  = _tDraft[bi];
  if (!block) return;

  const listEl = document.getElementById(`tmp-tasks-${bi}`);
  if (listEl) {
    listEl.innerHTML = (block.tasks || [])
      .map((t, ti) => _buildTaskHTML(t, bi, ti)).join('');
  }

  // Update task count badge
  const card  = document.getElementById(`tmp-block-${block.id}`);
  const badge = card?.querySelector('.tmp-task-count');
  if (badge) {
    const n = block.tasks?.length || 0;
    badge.textContent = `${n} task${n !== 1 ? 's' : ''}`;
  }

  _bindAll(container);
}

// ── Sync DOM → Draft ─────────────────────────────────────────────────────────

function _syncDraftFromDOM() {
  _tDraft.forEach((block, bi) => {
    (block.tasks || []).forEach((task, ti) => {
      const lEl = document.querySelector(`.tmp-task-input[data-bi="${bi}"][data-ti="${ti}"]`);
      if (lEl) task.label = lEl.value;

      const dEl = document.querySelector(`.tmp-desc-ta[data-bi="${bi}"][data-ti="${ti}"]`);
      if (dEl) task.desc = dEl.value;

      (task.subTasks || []).forEach((sub, si) => {
        const sEl = document.querySelector(`.tmp-sub-input[data-bi="${bi}"][data-ti="${ti}"][data-si="${si}"]`);
        if (sEl) sub.label = sEl.value;
      });
    });
  });
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function _coords(el)    { return [+el.dataset.bi, +el.dataset.ti]; }
function _subCoords(el) { return [+el.dataset.bi, +el.dataset.ti, +el.dataset.si]; }

function _esc(str) {
  return String(str || '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/** Returns "HH:MM – HH:MM" starting 1 hour from now, spanning 1 hour */
function _nextHour() {
  const d   = new Date();
  const h   = (d.getHours() + 1) % 24;
  const e   = (h + 1) % 24;
  const fmt = n => String(n).padStart(2, '0');
  return `${fmt(h)}:00 – ${fmt(e)}:00`;
}
