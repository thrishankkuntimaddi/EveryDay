/**
 * planEditor.js — Edit Plan Modal
 * ================================
 * Allows editing of all day blocks:
 *  - Block name, icon, time range
 *  - Tasks: add / remove / label / mark as Essential
 * Changes are saved to localStorage and refresh the dashboard in real-time.
 */

import { BLOCKS } from './data.js';
import { renderBlocks, updateMasterProgress } from './blocks.js';
import { showToast } from '../utils/toast.js';

const STORAGE_KEY = 'everyday_custom_plan';

// Common emoji icons for picker
const EMOJI_OPTIONS = [
  '🌅','🌄','🌞','☀️','🌤','🕐','🕑','🕒',
  '💼','🚀','🧩','🌆','🌙','🌃','⭐','🔥',
  '📚','💡','🎯','✅','🏋️','🧘','🚶','🏃',
  '💻','🛠','🔬','📊','📝','🗒','📋','🗂',
  '🎵','🎨','🎤','🏆','🤝','💬','📱','🌐',
];

// ── Load / Save custom plan ──────────────────────────────────────────────────

export function loadCustomPlan() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const saved = JSON.parse(raw);
    if (!Array.isArray(saved) || saved.length === 0) return false;
    // Mutate BLOCKS in-place so all other modules see the changes
    BLOCKS.length = 0;
    saved.forEach(b => BLOCKS.push(b));
    return true;
  } catch {
    return false;
  }
}

function savePlan(blocks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(blocks));
}

// ── Deep-clone BLOCKS for editing without mutating live data ─────────────────

function cloneBlocks() {
  return JSON.parse(JSON.stringify(BLOCKS));
}

// ── Open Modal ───────────────────────────────────────────────────────────────

export function openPlanEditor() {
  if (document.getElementById('plan-editor-overlay')) return; // already open

  const draft = cloneBlocks();  // working copy

  const overlay = document.createElement('div');
  overlay.id = 'plan-editor-overlay';
  overlay.className = 'plan-editor-overlay';

  overlay.innerHTML = buildModal(draft);
  document.body.appendChild(overlay);

  // Prevent body scroll
  document.body.style.overflow = 'hidden';

  // Bind all interactions
  bindModalEvents(overlay, draft);

  // Animate in
  requestAnimationFrame(() => overlay.classList.add('open'));
}

function closeEditor(overlay) {
  overlay.classList.remove('open');
  setTimeout(() => {
    overlay.remove();
    document.body.style.overflow = '';
  }, 320);
}

// ── HTML Builder ─────────────────────────────────────────────────────────────

function buildModal(draft) {
  return `
    <div class="plan-editor-modal" id="plan-editor-modal" role="dialog" aria-modal="true" aria-label="Edit Plan">
      <div class="plan-editor-header">
        <div class="plan-editor-title-row">
          <span class="plan-editor-icon-badge">📋</span>
          <div>
            <h2 class="plan-editor-title">Edit Your Day Plan</h2>
            <p class="plan-editor-subtitle">Customize blocks, time ranges, and tasks</p>
          </div>
        </div>
        <div class="plan-editor-actions">
          <button class="plan-editor-add-block-btn" id="add-block-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Add Block
          </button>
          <button class="plan-editor-save-btn" id="plan-save-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
            Save Plan
          </button>
          <button class="plan-editor-close-btn" id="plan-close-btn" aria-label="Close editor">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      </div>

      <div class="plan-editor-body" id="plan-editor-body">
        ${buildAllBlockEditors(draft)}
      </div>
    </div>
  `;
}

function buildAllBlockEditors(draft) {
  return draft.map((block, bi) => buildBlockEditor(block, bi)).join('');
}

function buildBlockEditor(block, bi) {
  return `
    <div class="pe-block" data-bi="${bi}" id="pe-block-${bi}">
      <div class="pe-block-header">
        <button class="pe-icon-btn-sm pe-emoji-picker-btn" data-bi="${bi}" title="Change icon">
          <span class="pe-block-emoji" id="pe-emoji-${bi}">${block.icon}</span>
        </button>
        <input class="pe-block-name-input" id="pe-name-${bi}" data-bi="${bi}"
               value="${escapeHtml(block.name)}" placeholder="Block name" />
        <div class="pe-time-range">
          <input class="pe-time-input" id="pe-start-${bi}" data-bi="${bi}" data-field="start"
                 type="time" value="${timeFromRange(block.time, 0)}" title="Start time" />
          <span class="pe-time-sep">–</span>
          <input class="pe-time-input" id="pe-end-${bi}" data-bi="${bi}" data-field="end"
                 type="time" value="${timeFromRange(block.time, 1)}" title="End time" />
        </div>
        <button class="pe-delete-block-btn" data-bi="${bi}" title="Remove block">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
        </button>
      </div>

      <div class="pe-task-list" id="pe-task-list-${bi}">
        ${block.tasks.map((t, ti) => buildTaskRow(t, bi, ti)).join('')}
      </div>

      <button class="pe-add-task-btn" data-bi="${bi}">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        Add task
      </button>
    </div>
  `;
}

function buildTaskRow(task, bi, ti) {
  return `
    <div class="pe-task-row" data-bi="${bi}" data-ti="${ti}" id="pe-task-${bi}-${ti}">
      <div class="pe-task-drag-handle" title="Drag to reorder">⠿</div>
      <input class="pe-task-input" data-bi="${bi}" data-ti="${ti}"
             value="${escapeHtml(task.label)}" placeholder="Task label" />
      <label class="pe-essential-toggle" title="Mark as Essential">
        <input type="checkbox" class="pe-essential-cb" data-bi="${bi}" data-ti="${ti}"
               ${task.isCore ? 'checked' : ''} />
        <span class="pe-essential-label">Essential</span>
      </label>
      <button class="pe-remove-task-btn" data-bi="${bi}" data-ti="${ti}" title="Remove task">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
  `;
}

function buildEmojiPicker(bi) {
  return `
    <div class="pe-emoji-picker-popup" id="pe-emoji-popup-${bi}">
      ${EMOJI_OPTIONS.map(e => `<button class="pe-emoji-option" data-bi="${bi}" data-emoji="${e}">${e}</button>`).join('')}
    </div>
  `;
}

// ── Event Binding ────────────────────────────────────────────────────────────

function bindModalEvents(overlay, draft) {
  const modal = overlay.querySelector('#plan-editor-modal');

  // Close on backdrop click
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeEditor(overlay);
  });

  // Close button
  overlay.querySelector('#plan-close-btn').addEventListener('click', () => closeEditor(overlay));

  // Escape key
  const onKey = e => { if (e.key === 'Escape') { closeEditor(overlay); document.removeEventListener('keydown', onKey); } };
  document.addEventListener('keydown', onKey);

  // Save button
  overlay.querySelector('#plan-save-btn').addEventListener('click', () => {
    commitDraftToBlocks(draft);
    savePlan(BLOCKS);
    renderBlocks();
    updateMasterProgress();
    closeEditor(overlay);
    showToast('✅ Plan saved! Dashboard updated.', 'success');
  });

  // Add block
  overlay.querySelector('#add-block-btn').addEventListener('click', () => {
    const bi = draft.length;
    const newBlock = {
      id: `custom-${Date.now()}`,
      name: 'New Block',
      icon: '⭐',
      time: '09:00 – 10:00',
      color: 'linear-gradient(90deg, #7c3aed, #9d64f8)',
      tasks: [
        { id: `custom-${Date.now()}-1`, label: 'New task', isCore: false }
      ]
    };
    draft.push(newBlock);
    const body = overlay.querySelector('#plan-editor-body');
    body.insertAdjacentHTML('beforeend', buildBlockEditor(newBlock, bi));
    rebindBody(overlay, draft);
    // Scroll new block into view
    const newEl = overlay.querySelector(`#pe-block-${bi}`);
    newEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  rebindBody(overlay, draft);
}

function rebindBody(overlay, draft) {
  const body = overlay.querySelector('#plan-editor-body');

  // — Block name inputs —
  body.querySelectorAll('.pe-block-name-input').forEach(input => {
    input.oninput = () => {
      const bi = +input.dataset.bi;
      draft[bi].name = input.value;
    };
  });

  // — Time inputs —
  body.querySelectorAll('.pe-time-input').forEach(input => {
    input.oninput = () => {
      const bi = +input.dataset.bi;
      const field = input.dataset.field;
      const startEl = overlay.querySelector(`#pe-start-${bi}`);
      const endEl = overlay.querySelector(`#pe-end-${bi}`);
      const start = startEl?.value || '00:00';
      const end = endEl?.value || '00:00';
      draft[bi].time = `${start} – ${end}`;
    };
  });

  // — Task label inputs —
  body.querySelectorAll('.pe-task-input').forEach(input => {
    input.oninput = () => {
      const bi = +input.dataset.bi;
      const ti = +input.dataset.ti;
      if (draft[bi]?.tasks[ti]) draft[bi].tasks[ti].label = input.value;
    };
  });

  // — Essential checkboxes —
  body.querySelectorAll('.pe-essential-cb').forEach(cb => {
    cb.onchange = () => {
      const bi = +cb.dataset.bi;
      const ti = +cb.dataset.ti;
      if (draft[bi]?.tasks[ti]) draft[bi].tasks[ti].isCore = cb.checked;
    };
  });

  // — Remove task —
  body.querySelectorAll('.pe-remove-task-btn').forEach(btn => {
    btn.onclick = () => {
      const bi = +btn.dataset.bi;
      const ti = +btn.dataset.ti;
      draft[bi].tasks.splice(ti, 1);
      refreshBlockTasks(overlay, draft, bi);
    };
  });

  // — Add task —
  body.querySelectorAll('.pe-add-task-btn').forEach(btn => {
    btn.onclick = () => {
      const bi = +btn.dataset.bi;
      const newTask = {
        id: `${draft[bi].id}-task-${Date.now()}`,
        label: '',
        isCore: false
      };
      draft[bi].tasks.push(newTask);
      refreshBlockTasks(overlay, draft, bi);
      // Focus new task input
      const taskList = overlay.querySelector(`#pe-task-list-${bi}`);
      const newInput = taskList?.querySelector('.pe-task-row:last-child .pe-task-input');
      newInput?.focus();
    };
  });

  // — Delete block —
  body.querySelectorAll('.pe-delete-block-btn').forEach(btn => {
    btn.onclick = () => {
      const bi = +btn.dataset.bi;
      if (draft.length === 1) { showToast('⚠️ You need at least one block', 'error'); return; }
      if (!confirm(`Remove block "${draft[bi].name}"?`)) return;
      draft.splice(bi, 1);
      // Full re-render of editor body
      overlay.querySelector('#plan-editor-body').innerHTML = buildAllBlockEditors(draft);
      rebindBody(overlay, draft);
    };
  });

  // — Emoji picker —
  body.querySelectorAll('.pe-emoji-picker-btn').forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const bi = +btn.dataset.bi;
      // Close any open picker
      document.querySelectorAll('.pe-emoji-picker-popup').forEach(p => p.remove());
      const popup = document.createElement('div');
      popup.innerHTML = buildEmojiPicker(bi);
      const pickerEl = popup.firstElementChild;
      btn.parentElement.style.position = 'relative';
      btn.parentElement.appendChild(pickerEl);

      pickerEl.querySelectorAll('.pe-emoji-option').forEach(opt => {
        opt.onclick = () => {
          const emoji = opt.dataset.emoji;
          draft[bi].icon = emoji;
          overlay.querySelector(`#pe-emoji-${bi}`).textContent = emoji;
          pickerEl.remove();
        };
      });

      // Close picker on outside click
      const closePicker = (ev) => {
        if (!pickerEl.contains(ev.target) && ev.target !== btn) {
          pickerEl.remove();
          document.removeEventListener('click', closePicker);
        }
      };
      setTimeout(() => document.addEventListener('click', closePicker), 0);
    };
  });
}

function refreshBlockTasks(overlay, draft, bi) {
  const taskList = overlay.querySelector(`#pe-task-list-${bi}`);
  if (!taskList) return;
  taskList.innerHTML = draft[bi].tasks.map((t, ti) => buildTaskRow(t, bi, ti)).join('');
  rebindBody(overlay, draft);
}

// ── Commit draft → live BLOCKS array ────────────────────────────────────────

function commitDraftToBlocks(draft) {
  BLOCKS.length = 0;
  draft.forEach(b => BLOCKS.push(b));
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * parseTimeRange('09:00 – 12:00', 0) → '09:00'
 * parseTimeRange('09:00 – 12:00', 1) → '12:00'
 */
function timeFromRange(timeStr, idx) {
  const parts = timeStr.split(/\s*[–-]\s*/);
  return (parts[idx] || '00:00').trim();
}
