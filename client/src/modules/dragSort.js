/**
 * dragSort.js — Drag-and-drop (desktop) + touch-drag (mobile) task reordering.
 *
 * Desktop fix: uses mousedown on the handle to conditionally enable dragging.
 * The HTML5 dragstart e.target is always the draggable element (wrapper),
 * NOT the child that was clicked — so we track mousedown separately.
 */

import { BLOCKS } from './data.js';

const DRAGGING_CLASS  = 'dragging';
const DRAG_OVER_CLASS = 'drag-over';

let _dragSrc     = null;
let _dragBlockId = null;
let _mouseOnHandle = false; // tracks whether mousedown was on a handle

// ── Public init ───────────────────────────────────────────────────────────────

export function initDragSort() {
  document.querySelectorAll('.task-list').forEach(list => {
    const blockCard = list.closest('.block-card');
    if (!blockCard) return;
    const blockId = blockCard.id.replace('block-card-', '');
    _injectHandles(list);
    _bindDesktop(list, blockId);
    _bindTouch(list, blockId);
  });
}

// ── Inject grip handles ───────────────────────────────────────────────────────

function _injectHandles(list) {
  list.querySelectorAll('.task-item-wrapper').forEach(wrapper => {
    // Avoid duplicate handles
    if (wrapper.querySelector('.drag-handle')) return;

    const handle = document.createElement('div');
    handle.className = 'drag-handle';
    handle.setAttribute('title', 'Drag to reorder');
    handle.setAttribute('aria-label', 'Drag to reorder');
    handle.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="9" cy="4" r="2"/><circle cx="15" cy="4" r="2"/>
      <circle cx="9" cy="12" r="2"/><circle cx="15" cy="12" r="2"/>
      <circle cx="9" cy="20" r="2"/><circle cx="15" cy="20" r="2"/>
    </svg>`;

    // Insert as first child inside the .task-item row
    const taskItem = wrapper.querySelector('.task-item');
    if (taskItem) taskItem.insertBefore(handle, taskItem.firstChild);
  });
}

// ── Desktop drag (HTML5 DnD) ──────────────────────────────────────────────────

function _bindDesktop(list, blockId) {
  list.querySelectorAll('.task-item-wrapper').forEach(wrapper => {
    // Default: NOT draggable. Only enable when mousedown is on a handle.
    wrapper.draggable = false;

    const handle = wrapper.querySelector('.drag-handle');
    if (handle) {
      handle.addEventListener('mousedown', () => {
        _mouseOnHandle = true;
        wrapper.draggable = true;
      });
    }

    // Only reset draggable if we NEVER started a drag from this mousedown
    wrapper.addEventListener('mouseup', () => {
      if (!_dragSrc) {
        // dragstart never fired — safe to reset
        _mouseOnHandle = false;
        wrapper.draggable = false;
      }
    });

    wrapper.addEventListener('dragstart', e => {
      if (!_mouseOnHandle) {
        e.preventDefault();
        return;
      }
      _dragSrc     = wrapper;
      _dragBlockId = blockId;
      wrapper.classList.add(DRAGGING_CLASS);
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', wrapper.id);
      // Reset flag after drag begins
      _mouseOnHandle = false;
    });

    wrapper.addEventListener('dragend', () => {
      wrapper.classList.remove(DRAGGING_CLASS);
      wrapper.draggable = false;
      list.querySelectorAll(`.${DRAG_OVER_CLASS}`).forEach(el => el.classList.remove(DRAG_OVER_CLASS));
      _dragSrc = null;
    });

    wrapper.addEventListener('dragover', e => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      if (_dragSrc && _dragSrc !== wrapper) {
        list.querySelectorAll(`.${DRAG_OVER_CLASS}`).forEach(el => el.classList.remove(DRAG_OVER_CLASS));
        wrapper.classList.add(DRAG_OVER_CLASS);
      }
    });

    wrapper.addEventListener('dragleave', e => {
      // Only remove if not entering a child
      if (!wrapper.contains(e.relatedTarget)) {
        wrapper.classList.remove(DRAG_OVER_CLASS);
      }
    });

    wrapper.addEventListener('drop', e => {
      e.preventDefault();
      wrapper.classList.remove(DRAG_OVER_CLASS);
      if (!_dragSrc || _dragSrc === wrapper || _dragBlockId !== blockId) return;

      const wrappers = [...list.querySelectorAll('.task-item-wrapper')];
      const fromIdx  = wrappers.indexOf(_dragSrc);
      const toIdx    = wrappers.indexOf(wrapper);
      if (fromIdx === -1 || toIdx === -1) return;

      // DOM reorder
      if (fromIdx < toIdx) {
        list.insertBefore(_dragSrc, wrapper.nextSibling);
      } else {
        list.insertBefore(_dragSrc, wrapper);
      }

      _reorderBlock(blockId, fromIdx, toIdx);
    });
  });
}

// ── Touch drag (mobile) ───────────────────────────────────────────────────────

let _touchEl    = null;
let _touchClone = null;
let _touchOX    = 0;
let _touchOY    = 0;
let _touchList  = null;
let _touchBlock = null;

function _bindTouch(list, blockId) {
  list.querySelectorAll('.drag-handle').forEach(handle => {
    handle.addEventListener('touchstart', e => {
      const wrapper = handle.closest('.task-item-wrapper');
      if (!wrapper) return;

      _touchEl    = wrapper;
      _touchList  = list;
      _touchBlock = blockId;

      const rect = wrapper.getBoundingClientRect();
      _touchOX = e.touches[0].clientX - rect.left;
      _touchOY = e.touches[0].clientY - rect.top;

      // Build a floating clone
      _touchClone = wrapper.cloneNode(true);
      Object.assign(_touchClone.style, {
        position:      'fixed',
        width:         `${rect.width}px`,
        left:          `${rect.left}px`,
        top:           `${rect.top}px`,
        zIndex:        '9999',
        pointerEvents: 'none',
        opacity:       '0.88',
        boxShadow:     '0 8px 32px rgba(0,0,0,0.55)',
        borderRadius:  '8px',
        transition:    'none',
      });
      document.body.appendChild(_touchClone);
      wrapper.style.opacity = '0.25';
    }, { passive: true });

    handle.addEventListener('touchmove', e => {
      e.preventDefault(); // prevent page scroll during drag
      if (!_touchClone) return;

      const t = e.touches[0];
      _touchClone.style.left = `${t.clientX - _touchOX}px`;
      _touchClone.style.top  = `${t.clientY - _touchOY}px`;

      // Detect wrapper under finger
      _touchClone.style.display = 'none';
      const under = document.elementFromPoint(t.clientX, t.clientY);
      _touchClone.style.display = '';

      const target = under?.closest('.task-item-wrapper');
      _touchList.querySelectorAll(`.${DRAG_OVER_CLASS}`).forEach(el => el.classList.remove(DRAG_OVER_CLASS));
      if (target && target !== _touchEl && _touchList.contains(target)) {
        target.classList.add(DRAG_OVER_CLASS);
      }
    }, { passive: false });

    handle.addEventListener('touchend', e => {
      if (!_touchClone) return;

      const t = e.changedTouches[0];
      _touchClone.style.display = 'none';
      const under = document.elementFromPoint(t.clientX, t.clientY);
      _touchClone.style.display = '';

      const target = under?.closest('.task-item-wrapper');
      if (target && target !== _touchEl && _touchList?.contains(target)) {
        const wrappers = [..._touchList.querySelectorAll('.task-item-wrapper')];
        const fromIdx  = wrappers.indexOf(_touchEl);
        const toIdx    = wrappers.indexOf(target);
        if (fromIdx !== -1 && toIdx !== -1) {
          if (fromIdx < toIdx) {
            _touchList.insertBefore(_touchEl, target.nextSibling);
          } else {
            _touchList.insertBefore(_touchEl, target);
          }
          _reorderBlock(_touchBlock, fromIdx, toIdx);
        }
      }

      // Cleanup
      _touchClone.remove();
      _touchClone = null;
      if (_touchEl) _touchEl.style.opacity = '';
      _touchList?.querySelectorAll(`.${DRAG_OVER_CLASS}`).forEach(el => el.classList.remove(DRAG_OVER_CLASS));
      _touchEl = null;
    }, { passive: true });
  });
}

// ── Sync BLOCKS data ──────────────────────────────────────────────────────────

function _reorderBlock(blockId, fromIdx, toIdx) {
  if (fromIdx === toIdx) return;
  const block = BLOCKS.find(b => b.id === blockId);
  if (!block) return;

  const tasks = block.tasks;
  const [moved] = tasks.splice(fromIdx, 1);
  tasks.splice(toIdx, 0, moved);

  try {
    localStorage.setItem('everyday_custom_plan', JSON.stringify(BLOCKS));
  } catch {}
}
