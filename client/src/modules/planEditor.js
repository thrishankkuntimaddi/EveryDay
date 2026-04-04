/**
 * planEditor.js — Inline Plan Editing
 * =====================================
 * Toggles the dashboard blocks grid into an editable state.
 * No modal — edits happen directly on the cards in place.
 *
 * Usage:
 *   enterEditMode()   — switches dashboard to edit mode
 *   exitEditMode()    — reverts to view mode without saving
 *   saveEditMode()    — persists edits and reverts to view mode
 *   loadCustomPlan()  — loads saved plan from localStorage on boot
 */

import { BLOCKS } from './data.js';
import { renderBlocks, updateMasterProgress } from './blocks.js';
import { showToast } from '../utils/toast.js';

const STORAGE_KEY = 'everyday_custom_plan';
const PLAN_VERSION_KEY = 'everyday_plan_version';
const PLAN_VERSION = 'v2'; // bump this whenever the default boilerplate changes

// Working draft — populated when edit mode is entered
let _draft = [];
let _editActive = false;

// Common emoji options for picker
const EMOJI_OPTIONS = [
  '🌅','🌄','🌞','☀️','🌤','🕐','🕑','🕒',
  '💼','🚀','🧩','🌆','🌙','🌃','⭐','🔥',
  '📚','💡','🎯','✅','🏋️','🧘','🚶','🏃',
  '💻','🛠','🔬','📊','📝','🗒','📋','🗂',
  '🎵','🎨','🎤','🏆','🤝','💬','📱','🌐',
];

// ── Load / Save ──────────────────────────────────────────────────────────────

export function loadCustomPlan() {
  try {
    // Version guard — if the boilerplate version changed, wipe stale saved plan
    const savedVersion = localStorage.getItem(PLAN_VERSION_KEY);
    if (savedVersion !== PLAN_VERSION) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.setItem(PLAN_VERSION_KEY, PLAN_VERSION);
      return false; // use fresh default BLOCKS
    }

    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const saved = JSON.parse(raw);
    if (!Array.isArray(saved) || saved.length === 0) return false;
    BLOCKS.length = 0;
    saved.forEach(b => BLOCKS.push(b));
    return true;
  } catch {
    return false;
  }
}

function savePlanToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(BLOCKS));
}

// ── Edit Mode Entry / Exit ───────────────────────────────────────────────────

export function enterEditMode() {
  if (_editActive) return;
  _editActive = true;

  // Deep-clone BLOCKS so we can discard changes on cancel
  _draft = JSON.parse(JSON.stringify(BLOCKS));

  _renderEditMode();
  _updateToolbar(true);
}

export function exitEditMode() {
  if (!_editActive) return;
  _editActive = false;
  _draft = [];

  renderBlocks();           // re-render in view mode
  _updateToolbar(false);
}

export function saveEditMode() {
  if (!_editActive) return;

  // Read all current input values from the inline fields into _draft
  _syncDraftFromDOM();

  // Commit draft → live BLOCKS
  BLOCKS.length = 0;
  _draft.forEach(b => BLOCKS.push(b));

  // Persist
  savePlanToStorage();

  _editActive = false;
  _draft = [];

  renderBlocks();
  updateMasterProgress();
  _updateToolbar(false);
  showToast('✅ Plan saved!', 'success');
}

export function isEditActive() {
  return _editActive;
}

// ── Toolbar swap ─────────────────────────────────────────────────────────────

function _updateToolbar(editing) {
  const editBtn    = document.getElementById('edit-plan-btn');
  const actionsGrp = document.getElementById('inline-edit-actions');

  if (editing) {
    editBtn?.classList.add('hidden');
    actionsGrp?.classList.remove('hidden');
  } else {
    editBtn?.classList.remove('hidden');
    actionsGrp?.classList.add('hidden');
  }
}

// ── Inline Edit Renderer ─────────────────────────────────────────────────────

function _renderEditMode() {
  const container = document.getElementById('blocks-grid');
  if (!container) return;
  container.innerHTML = '';

  _draft.forEach((block, bi) => {
    const card = document.createElement('div');
    card.className = 'block-card expanded edit-mode-card';
    card.id = `block-card-${block.id}`;
    card.dataset.bi = bi;

    card.innerHTML = _buildEditCard(block, bi);
    container.appendChild(card);
  });

  _bindEditCardEvents(container);

  // "Add Block" button at the bottom
  const addEl = document.createElement('div');
  addEl.className = 'edit-add-block-row';
  addEl.innerHTML = `
    <button class="edit-add-block-btn" id="edit-add-block-btn">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
      Add Block
    </button>
  `;
  container.appendChild(addEl);

  document.getElementById('edit-add-block-btn')?.addEventListener('click', () => {
    const bi = _draft.length;
    const newBlock = {
      id: `custom-${Date.now()}`,
      name: 'New Block',
      icon: '⭐',
      time: '09:00 – 10:00',
      color: 'linear-gradient(90deg, #7c3aed, #9d64f8)',
      tasks: [{ id: `custom-${Date.now()}-1`, label: 'New task', isCore: false }]
    };
    _draft.push(newBlock);
    _renderEditMode(); // full re-render to include new block
    // Scroll to the new block & focus its name input
    const newCard = document.getElementById(`block-card-${newBlock.id}`);
    newCard?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    newCard?.querySelector('.ie-name-input')?.focus();
  });
}

function _buildEditCard(block, bi) {
  const [startTime, endTime] = _splitTime(block.time);

  return `
    <!-- Block header: icon + name + time + delete -->
    <div class="ie-card-header">
      <button class="ie-emoji-btn" data-bi="${bi}" title="Change icon" type="button">
        <span class="ie-emoji" id="ie-emoji-${bi}">${block.icon}</span>
      </button>
      <input class="ie-name-input" id="ie-name-${bi}" data-bi="${bi}"
             value="${_esc(block.name)}" placeholder="Block name" />
      <div class="ie-time-group">
        <input class="ie-time" id="ie-start-${bi}" data-bi="${bi}" data-f="start"
               type="time" value="${startTime}" />
        <span class="ie-sep">–</span>
        <input class="ie-time" id="ie-end-${bi}" data-bi="${bi}" data-f="end"
               type="time" value="${endTime}" />
      </div>
      <button class="ie-delete-block-btn" data-bi="${bi}" title="Remove block" type="button">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="3 6 5 6 21 6"/>
          <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
          <path d="M10 11v6M14 11v6M9 6V4h6v2"/>
        </svg>
      </button>
    </div>

    <!-- Task list -->
    <div class="ie-task-list" id="ie-tasks-${bi}">
      ${block.tasks.map((t, ti) => _buildTaskRow(t, bi, ti)).join('')}
    </div>

    <!-- Add task -->
    <button class="ie-add-task-btn" data-bi="${bi}" type="button">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
      Add task
    </button>
  `;
}

function _buildTaskRow(task, bi, ti) {
  return `
    <div class="ie-task-row" data-bi="${bi}" data-ti="${ti}" id="ie-task-${bi}-${ti}">
      <span class="ie-drag-handle" title="Reorder">⠿</span>
      <input class="ie-task-input" data-bi="${bi}" data-ti="${ti}"
             value="${_esc(task.label)}" placeholder="Task name" />
      <label class="ie-essential-wrap" title="Mark as Essential">
        <input type="checkbox" class="ie-essential-cb" data-bi="${bi}" data-ti="${ti}"
               ${task.isCore ? 'checked' : ''} />
        <span class="ie-essential-pill">Essential</span>
      </label>
      <button class="ie-remove-task-btn" data-bi="${bi}" data-ti="${ti}" title="Remove" type="button">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
  `;
}

// ── DOM Event Binding ─────────────────────────────────────────────────────────

function _bindEditCardEvents(container) {
  // Block name
  container.querySelectorAll('.ie-name-input').forEach(el => {
    el.oninput = () => { _draft[+el.dataset.bi].name = el.value; };
  });

  // Time inputs
  container.querySelectorAll('.ie-time').forEach(el => {
    el.oninput = () => {
      const bi = +el.dataset.bi;
      const s = document.getElementById(`ie-start-${bi}`)?.value || '00:00';
      const e = document.getElementById(`ie-end-${bi}`)?.value   || '00:00';
      _draft[bi].time = `${s} – ${e}`;
    };
  });

  // Task label inputs
  container.querySelectorAll('.ie-task-input').forEach(el => {
    el.oninput = () => {
      const bi = +el.dataset.bi, ti = +el.dataset.ti;
      if (_draft[bi]?.tasks[ti]) _draft[bi].tasks[ti].label = el.value;
    };
  });

  // Essential checkboxes
  container.querySelectorAll('.ie-essential-cb').forEach(el => {
    el.onchange = () => {
      const bi = +el.dataset.bi, ti = +el.dataset.ti;
      if (_draft[bi]?.tasks[ti]) _draft[bi].tasks[ti].isCore = el.checked;
    };
  });

  // Remove task
  container.querySelectorAll('.ie-remove-task-btn').forEach(btn => {
    btn.onclick = () => {
      const bi = +btn.dataset.bi, ti = +btn.dataset.ti;
      _draft[bi].tasks.splice(ti, 1);
      _refreshTaskList(container, bi);
    };
  });

  // Add task
  container.querySelectorAll('.ie-add-task-btn').forEach(btn => {
    btn.onclick = () => {
      const bi = +btn.dataset.bi;
      _draft[bi].tasks.push({
        id: `${_draft[bi].id}-t-${Date.now()}`,
        label: '',
        isCore: false
      });
      _refreshTaskList(container, bi);
      // Focus the newly added input
      const taskList = document.getElementById(`ie-tasks-${bi}`);
      taskList?.querySelector('.ie-task-row:last-child .ie-task-input')?.focus();
    };
  });

  // Delete block
  container.querySelectorAll('.ie-delete-block-btn').forEach(btn => {
    btn.onclick = () => {
      const bi = +btn.dataset.bi;
      if (_draft.length === 1) { showToast('⚠️ Need at least one block', 'error'); return; }
      if (!confirm(`Remove block "${_draft[bi].name}"?`)) return;
      _draft.splice(bi, 1);
      _renderEditMode();
    };
  });

  // Emoji picker
  container.querySelectorAll('.ie-emoji-btn').forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const bi = +btn.dataset.bi;
      document.querySelectorAll('.ie-emoji-popup').forEach(p => p.remove());

      const popup = document.createElement('div');
      popup.className = 'ie-emoji-popup';
      popup.innerHTML = EMOJI_OPTIONS.map(em =>
        `<button class="ie-emoji-opt" data-bi="${bi}" data-em="${em}" type="button">${em}</button>`
      ).join('');

      btn.style.position = 'relative';
      btn.appendChild(popup);

      popup.querySelectorAll('.ie-emoji-opt').forEach(opt => {
        opt.onclick = () => {
          _draft[+opt.dataset.bi].icon = opt.dataset.em;
          document.getElementById(`ie-emoji-${opt.dataset.bi}`).textContent = opt.dataset.em;
          popup.remove();
        };
      });

      const closePicker = (ev) => {
        if (!popup.contains(ev.target) && ev.target !== btn) {
          popup.remove();
          document.removeEventListener('click', closePicker);
        }
      };
      setTimeout(() => document.addEventListener('click', closePicker), 0);
    };
  });
}

function _refreshTaskList(container, bi) {
  // Sync current inputs into draft before refreshing
  _syncDraftFromDOM();
  const taskList = document.getElementById(`ie-tasks-${bi}`);
  if (!taskList) return;
  taskList.innerHTML = _draft[bi].tasks.map((t, ti) => _buildTaskRow(t, bi, ti)).join('');
  _bindEditCardEvents(container);
}

// ── Sync DOM → Draft ─────────────────────────────────────────────────────────
// Called just before saving so any typed values are captured

function _syncDraftFromDOM() {
  document.querySelectorAll('.ie-name-input').forEach(el => {
    const bi = +el.dataset.bi;
    if (_draft[bi]) _draft[bi].name = el.value;
  });

  document.querySelectorAll('.ie-task-input').forEach(el => {
    const bi = +el.dataset.bi, ti = +el.dataset.ti;
    if (_draft[bi]?.tasks[ti]) _draft[bi].tasks[ti].label = el.value;
  });

  document.querySelectorAll('.ie-essential-cb').forEach(el => {
    const bi = +el.dataset.bi, ti = +el.dataset.ti;
    if (_draft[bi]?.tasks[ti]) _draft[bi].tasks[ti].isCore = el.checked;
  });

  document.querySelectorAll('.ie-time[data-f="start"]').forEach(el => {
    const bi = +el.dataset.bi;
    const s = el.value || '00:00';
    const eEl = document.getElementById(`ie-end-${bi}`);
    const e = eEl?.value || '00:00';
    if (_draft[bi]) _draft[bi].time = `${s} – ${e}`;
  });
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function _esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function _splitTime(timeStr) {
  const parts = (timeStr || '').split(/\s*[–-]\s*/);
  return [
    (parts[0] || '00:00').trim().padStart(5, '0'),
    (parts[1] || '00:00').trim().padStart(5, '0'),
  ];
}
