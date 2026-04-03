/**
 * EveryDay — Discipline. Progression. Execution.
 * ================================================
 * Full app logic: state management, rendering,
 * localStorage persistence, daily reset, streaks,
 * focus mode, timer, notifications, and more.
 *
 * localStorage keys:
 *   nista_tasks     — daily task completion state
 *   nista_progress  — current day progress snapshot
 *   nista_phase     — current growth phase
 *   nista_streak    — streak data { count, lastDate, longest }
 *   nista_history   — array of daily reflections
 *   nista_settings  — user identity + reminders
 *   nista_last_date — last known date (for daily reset)
 */

'use strict';

// ════════════════════════════════════════════════
// 1. DATA — BLOCKS & TASKS DEFINITION
// ════════════════════════════════════════════════

/**
 * isMinimum: true = shown in minimum mode ONLY
 * isCore:    true = shown in both modes (essential)
 * (tasks without isMinimum true are non-essential in min mode)
 */
const BLOCKS = [
  {
    id: 'morning',
    name: 'Morning Block',
    icon: '🌅',
    time: '05:30 – 08:00',
    color: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
    tasks: [
      { id: 'morning-1', label: 'Meditation (10 min)', isCore: true },
      { id: 'morning-2', label: 'Workout / Physical Movement', isCore: true },
      { id: 'morning-3', label: 'Cold shower & grooming', isCore: false },
      { id: 'morning-4', label: 'Morning walk / Sunlight', isCore: false },
      { id: 'morning-5', label: 'Plan the day (top 3 priorities)', isCore: true },
    ]
  },
  {
    id: 'work1',
    name: 'Work Block 1 — Resume & Job',
    icon: '💼',
    time: '09:00 – 12:00',
    color: 'linear-gradient(90deg, #7c3aed, #9d64f8)',
    tasks: [
      { id: 'work1-1', label: 'Resume update / polish', isCore: true },
      { id: 'work1-2', label: 'Apply to 5+ jobs', isCore: true },
      { id: 'work1-3', label: 'Network / LinkedIn outreach', isCore: false },
      { id: 'work1-4', label: 'Interview prep (1 mock Q)', isCore: false },
    ]
  },
  {
    id: 'work2',
    name: 'Work Block 2 — Chttrix',
    icon: '🚀',
    time: '13:00 – 16:00',
    color: 'linear-gradient(90deg, #06b6d4, #22d3ee)',
    tasks: [
      { id: 'work2-1', label: 'Implement planned feature', isCore: true },
      { id: 'work2-2', label: 'Fix known bugs / issues', isCore: false },
      { id: 'work2-3', label: 'Code review & clean-up', isCore: false },
      { id: 'work2-4', label: 'Document progress', isCore: false },
    ]
  },
  {
    id: 'work3',
    name: 'Work Block 3 — DSA / CS',
    icon: '🧩',
    time: '16:00 – 18:00',
    color: 'linear-gradient(90deg, #10b981, #34d399)',
    tasks: [
      { id: 'work3-1', label: 'Solve 1 DSA problem (LeetCode)', isCore: true },
      { id: 'work3-2', label: 'CS fundamentals study (30 min)', isCore: false },
      { id: 'work3-3', label: 'Review yesterday\'s solution', isCore: false },
    ]
  },
  {
    id: 'evening',
    name: 'Evening Block',
    icon: '🌆',
    time: '18:00 – 20:00',
    color: 'linear-gradient(90deg, #f43f5e, #fb7185)',
    tasks: [
      { id: 'evening-1', label: 'Communication practice (spoken)', isCore: true },
      { id: 'evening-2', label: 'Reading (20 min)', isCore: true },
      { id: 'evening-3', label: 'Walk / low-intensity movement', isCore: false },
    ]
  },
  {
    id: 'night',
    name: 'Night Block — AI / Deep Work',
    icon: '🌙',
    time: '20:00 – 22:00',
    color: 'linear-gradient(90deg, #4f46e5, #7c3aed)',
    tasks: [
      { id: 'night-1', label: 'AI / LLM project exploration', isCore: true },
      { id: 'night-2', label: 'Deep reading / research', isCore: false },
      { id: 'night-3', label: 'Journal / reflection (5 min)', isCore: true },
    ]
  }
];

// ════════════════════════════════════════════════
// 2. PHASE DATA
// ════════════════════════════════════════════════

const PHASES = [
  {
    id: 'stabilization',
    name: 'Stabilization',
    emoji: '🌱',
    number: 'Phase 1',
    color: '#06b6d4',
    gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)',
    intensity: 40,
    description: 'You\'re building the foundation. Consistency is more important than volume. Show up every single day, even imperfectly. The goal is to make execution a reflex.',
    hints: [
      'Focus on core tasks only — don\'t overload',
      'Missing a day is okay. Two in a row is the enemy.',
      'Effort matters more than output right now',
      'Morning routine is non-negotiable'
    ]
  },
  {
    id: 'control',
    name: 'Control',
    emoji: '🎯',
    number: 'Phase 2',
    color: '#7c3aed',
    gradient: 'linear-gradient(135deg, #7c3aed, #5b21b6)',
    intensity: 60,
    description: 'You have the habit. Now sharpen the execution. You\'re in control of your blocks — no longer reactive. Track quality, not just completion.',
    hints: [
      'Start eliminating low-impact tasks',
      'Block external distractions during work blocks',
      'Push your DSA difficulty one level up',
      'Begin tracking your productivity patterns'
    ]
  },
  {
    id: 'intensity',
    name: 'Intensity',
    emoji: '⚡',
    number: 'Phase 3',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
    intensity: 85,
    description: 'You\'re no longer building discipline — you\'re deploying it. This phase is about maximum output, deliberate practice, and pushing hard every single day.',
    hints: [
      'All tasks, no excuses — minimum mode rarely used',
      'Increase workout intensity significantly',
      'Apply to more jobs, build in public',
      'Deep work blocks are sacred — protect them'
    ]
  },
  {
    id: 'expansion',
    name: 'Expansion',
    emoji: '🌊',
    number: 'Phase 4',
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981, #059669)',
    intensity: 100,
    description: 'You\'ve earned this. Your system is solid. Now you expand — new domains, higher standards, compound growth. This isn\'t about survival anymore. It\'s about dominance.',
    hints: [
      'Add new learning tracks beyond current blocks',
      'Mentor others or build in public consistently',
      'Chttrix should be shipping features weekly',
      'Your morning block should feel automatic'
    ]
  }
];

// ════════════════════════════════════════════════
// 3. STATE
// ════════════════════════════════════════════════

const STATE = {
  tasks: {},          // { taskId: boolean }
  phase: 'stabilization',
  streak: { count: 0, lastDate: null, longest: 0 },
  history: [],        // array of daily reflection objects
  settings: { name: '', goal: '', reminders: {} },
  eod: { showed: null, effort: 0, notes: '' },
  minimumMode: false,
  currentView: 'dashboard',
  focusBlock: null,
  timerInterval: null,
  timerSeconds: 25 * 60,
  timerRunning: false,
  notificationsEnabled: false,
};

// ════════════════════════════════════════════════
// 4. STORAGE HELPERS
// ════════════════════════════════════════════════

const LS = {
  get: (key, fallback = null) => {
    try {
      const val = localStorage.getItem(key);
      return val !== null ? JSON.parse(val) : fallback;
    } catch { return fallback; }
  },
  set: (key, val) => {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { console.warn('LS write failed', e); }
  }
};

// ════════════════════════════════════════════════
// 5. DATE HELPERS
// ════════════════════════════════════════════════

/**
 * Returns today's date string as "YYYY-MM-DD"
 */
function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Returns display-friendly date string
 */
function todayDisplay() {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric'
  });
}

/**
 * Check if a date string is yesterday
 */
function isYesterday(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  const y = new Date();
  y.setDate(y.getDate() - 1);
  return d.toISOString().slice(0, 10) === y.toISOString().slice(0, 10);
}

// ════════════════════════════════════════════════
// 6. DAILY RESET LOGIC
// ════════════════════════════════════════════════

/**
 * On every app load, check if it's a new day.
 * If yes, archive previous day's EOD data and reset tasks.
 */
function checkDailyReset() {
  const lastDate = LS.get('nista_last_date');
  const today = todayKey();

  if (lastDate !== today) {
    console.log('[EveryDay] New day detected — resetting tasks.');

    // Reset task state for the new day
    STATE.tasks = {};
    LS.set('nista_tasks', {});
    LS.set('nista_last_date', today);

    // Reset EOD state (fresh start)
    STATE.eod = { showed: null, effort: 0, notes: '' };

    // Update streak on new day
    updateStreak(lastDate);
  }
}

// ════════════════════════════════════════════════
// 7. STREAK LOGIC
// ════════════════════════════════════════════════

function updateStreak(lastDate) {
  const streak = LS.get('nista_streak', { count: 0, lastDate: null, longest: 0 });

  if (lastDate && isYesterday(lastDate)) {
    // Consecutive day — increment streak
    streak.count += 1;
    if (streak.count > streak.longest) streak.longest = streak.count;
  } else if (lastDate && lastDate !== todayKey()) {
    // Missed day — reset streak
    streak.count = 0;
  }

  streak.lastDate = todayKey();
  STATE.streak = streak;
  LS.set('nista_streak', streak);
}

// ════════════════════════════════════════════════
// 8. LOAD STATE FROM LOCALSTORAGE
// ════════════════════════════════════════════════

function loadState() {
  STATE.tasks    = LS.get('nista_tasks', {});
  STATE.phase    = LS.get('nista_phase', 'stabilization');
  STATE.streak   = LS.get('nista_streak', { count: 0, lastDate: null, longest: 0 });
  STATE.history  = LS.get('nista_history', []);
  STATE.settings = LS.get('nista_settings', { name: '', goal: '', reminders: {} });
}

// ════════════════════════════════════════════════
// 9. SAVE STATE
// ════════════════════════════════════════════════

function saveTasks()   { LS.set('nista_tasks', STATE.tasks); }
function savePhase()   { LS.set('nista_phase', STATE.phase); }
function saveHistory() { LS.set('nista_history', STATE.history); }

// ════════════════════════════════════════════════
// 10. PROGRESS CALCULATIONS
// ════════════════════════════════════════════════

/**
 * Get overall task progress
 */
function getOverallProgress() {
  let total = 0, done = 0;

  BLOCKS.forEach(block => {
    block.tasks.forEach(task => {
      if (STATE.minimumMode && !task.isCore) return;
      total++;
      if (STATE.tasks[task.id]) done++;
    });
  });

  return { total, done, pct: total > 0 ? Math.round((done / total) * 100) : 0 };
}

/**
 * Get block-level progress
 */
function getBlockProgress(block) {
  let total = 0, done = 0;

  block.tasks.forEach(task => {
    if (STATE.minimumMode && !task.isCore) return;
    total++;
    if (STATE.tasks[task.id]) done++;
  });

  return { total, done, pct: total > 0 ? Math.round((done / total) * 100) : 0 };
}

// ════════════════════════════════════════════════
// 11. RENDER — DASHBOARD BLOCKS
// ════════════════════════════════════════════════

function renderBlocks() {
  const container = document.getElementById('blocks-grid');
  container.innerHTML = '';

  BLOCKS.forEach((block, idx) => {
    const { done, total, pct } = getBlockProgress(block);
    const isCompleted = total > 0 && done === total;

    const card = document.createElement('div');
    card.className = `block-card${isCompleted ? ' completed' : ''}`;
    card.id = `block-card-${block.id}`;

    card.innerHTML = `
      <div class="block-header" id="block-header-${block.id}" role="button"
           aria-expanded="false" aria-controls="block-body-${block.id}" tabindex="0">
        <div class="block-header-left">
          <div class="block-icon">${block.icon}</div>
          <div class="block-info">
            <div class="block-name">${block.name}</div>
            <div class="block-time">${block.time}</div>
          </div>
        </div>
        <div class="block-header-right">
          <span class="block-pct">${pct}%</span>
          <svg class="block-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
      </div>
      <div class="block-progress">
        <div class="block-progress-fill" style="width: ${pct}%; background: ${block.color}"></div>
      </div>
      <div class="block-body" id="block-body-${block.id}">
        <div class="block-inner">
          <div class="task-list" id="task-list-${block.id}">
            ${renderTaskList(block)}
          </div>
          <button class="block-focus-btn" data-block="${block.id}" aria-label="Enter focus mode for ${block.name}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
            </svg>
            Focus Mode
          </button>
        </div>
      </div>
    `;

    // Apply CSS variable for top border color
    card.style.setProperty('--block-color', block.color);

    container.appendChild(card);
  });

  attachBlockListeners();
}

function renderTaskList(block) {
  return block.tasks.map(task => {
    const done = !!STATE.tasks[task.id];
    const isHidden = STATE.minimumMode && !task.isCore;
    const badgeHtml = task.isCore
      ? '<span class="task-badge badge-min">Essential</span>'
      : '';

    return `
      <div class="task-item${done ? ' done' : ''}${isHidden ? ' hidden-task' : ''}"
           id="task-${task.id}"
           data-task="${task.id}"
           role="checkbox"
           aria-checked="${done}"
           tabindex="0"
           style="${isHidden ? 'display:none' : ''}">
        <div class="custom-checkbox"></div>
        <span class="task-label">${task.label}</span>
        ${badgeHtml}
      </div>
    `;
  }).join('');
}

// ════════════════════════════════════════════════
// 12. ATTACH BLOCK EVENT LISTENERS
// ════════════════════════════════════════════════

function attachBlockListeners() {
  // Block expand/collapse
  document.querySelectorAll('.block-header').forEach(header => {
    const blockId = header.id.replace('block-header-', '');
    header.addEventListener('click', () => toggleBlock(blockId));
    header.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleBlock(blockId); }
    });
  });

  // Task checkboxes
  document.querySelectorAll('.task-item').forEach(item => {
    item.addEventListener('click', () => toggleTask(item.dataset.task));
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleTask(item.dataset.task); }
    });
  });

  // Focus mode buttons
  document.querySelectorAll('.block-focus-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      openFocusMode(btn.dataset.block);
    });
  });
}

function toggleBlock(blockId) {
  const card = document.getElementById(`block-card-${blockId}`);
  const header = document.getElementById(`block-header-${blockId}`);
  const isExpanded = card.classList.contains('expanded');

  // Close all others
  document.querySelectorAll('.block-card.expanded').forEach(c => {
    c.classList.remove('expanded');
    c.querySelector('.block-header').setAttribute('aria-expanded', 'false');
  });

  if (!isExpanded) {
    card.classList.add('expanded');
    header.setAttribute('aria-expanded', 'true');
  }
}

// ════════════════════════════════════════════════
// 13. TASK TOGGLE
// ════════════════════════════════════════════════

function toggleTask(taskId) {
  STATE.tasks[taskId] = !STATE.tasks[taskId];
  saveTasks();

  // Update task UI
  const item = document.getElementById(`task-${taskId}`);
  if (item) {
    item.classList.toggle('done', STATE.tasks[taskId]);
    item.setAttribute('aria-checked', STATE.tasks[taskId]);
  }

  // Find block for this task
  const block = BLOCKS.find(b => b.tasks.some(t => t.id === taskId));
  if (block) updateBlockProgress(block);

  updateMasterProgress();
  updateHeaderStreak();

  // Micro-feedback
  if (STATE.tasks[taskId]) {
    // Completed task — subtle animation
    item?.animate([
      { transform: 'scale(1)' },
      { transform: 'scale(1.03)' },
      { transform: 'scale(1)' }
    ], { duration: 200, easing: 'ease-out' });
  }
}

function updateBlockProgress(block) {
  const { done, total, pct } = getBlockProgress(block);
  const card = document.getElementById(`block-card-${block.id}`);
  if (!card) return;

  // Update % label
  const pctEl = card.querySelector('.block-pct');
  if (pctEl) pctEl.textContent = `${pct}%`;

  // Update fill
  const fill = card.querySelector('.block-progress-fill');
  if (fill) fill.style.width = `${pct}%`;

  // Add completed class
  const isCompleted = total > 0 && done === total;
  card.classList.toggle('completed', isCompleted);
}

function updateMasterProgress() {
  const { total, done, pct } = getOverallProgress();

  const fill = document.getElementById('master-progress-fill');
  const label = document.getElementById('master-progress-label');
  const valEl = document.getElementById('overall-progress-val');

  if (fill) fill.style.width = `${pct}%`;
  if (label) label.textContent = `${done} / ${total} tasks`;
  if (valEl) valEl.textContent = `${pct}%`;
}

// ════════════════════════════════════════════════
// 14. MINIMUM MODE
// ════════════════════════════════════════════════

function applyMinimumMode() {
  BLOCKS.forEach(block => {
    block.tasks.forEach(task => {
      const el = document.getElementById(`task-${task.id}`);
      if (!el) return;

      if (STATE.minimumMode && !task.isCore) {
        el.style.display = 'none';
      } else {
        el.style.display = '';
      }
    });

    updateBlockProgress(block);
  });

  updateMasterProgress();
}

// ════════════════════════════════════════════════
// 15. FOCUS MODE
// ════════════════════════════════════════════════

function openFocusMode(blockId) {
  const block = BLOCKS.find(b => b.id === blockId);
  if (!block) return;

  STATE.focusBlock = blockId;

  const overlay = document.getElementById('focus-overlay');
  const titleEl = document.getElementById('focus-block-title');
  const tasksEl = document.getElementById('focus-tasks');

  titleEl.textContent = `${block.icon} ${block.name}`;

  tasksEl.innerHTML = block.tasks.map(task => {
    const done = !!STATE.tasks[task.id];
    return `
      <div class="task-item${done ? ' done' : ''}"
           id="focus-task-${task.id}"
           data-task="${task.id}"
           role="checkbox"
           aria-checked="${done}"
           tabindex="0">
        <div class="custom-checkbox"></div>
        <span class="task-label">${task.label}</span>
      </div>
    `;
  }).join('');

  // Attach listeners for focus tasks
  tasksEl.querySelectorAll('.task-item').forEach(item => {
    item.addEventListener('click', () => {
      toggleTask(item.dataset.task);
      // Sync focus task UI
      const focusItem = document.getElementById(`focus-task-${item.dataset.task}`);
      if (focusItem) {
        focusItem.classList.toggle('done', !!STATE.tasks[item.dataset.task]);
        focusItem.setAttribute('aria-checked', !!STATE.tasks[item.dataset.task]);
      }
    });
  });

  // Reset timer
  resetTimer();

  overlay.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeFocusMode() {
  const overlay = document.getElementById('focus-overlay');
  overlay.hidden = true;
  document.body.style.overflow = '';
  STATE.focusBlock = null;
  stopTimer();
}

// ════════════════════════════════════════════════
// 16. POMODORO TIMER
// ════════════════════════════════════════════════

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function startTimer() {
  if (STATE.timerRunning) return;
  STATE.timerRunning = true;

  const startBtn = document.getElementById('timer-start');
  if (startBtn) startBtn.textContent = '⏸ Pause';

  STATE.timerInterval = setInterval(() => {
    if (STATE.timerSeconds <= 0) {
      stopTimer();
      showToast('⏰ Focus session complete! Time to take a break.');
      return;
    }
    STATE.timerSeconds--;
    const timerEl = document.getElementById('focus-timer');
    if (timerEl) timerEl.textContent = formatTime(STATE.timerSeconds);
  }, 1000);
}

function pauseTimer() {
  clearInterval(STATE.timerInterval);
  STATE.timerRunning = false;
  const startBtn = document.getElementById('timer-start');
  if (startBtn) startBtn.textContent = '▶ Start';
}

function resetTimer() {
  pauseTimer();
  STATE.timerSeconds = 25 * 60;
  const timerEl = document.getElementById('focus-timer');
  if (timerEl) timerEl.textContent = '25:00';
}

function stopTimer() {
  pauseTimer();
  const startBtn = document.getElementById('timer-start');
  if (startBtn) startBtn.textContent = '▶ Start';
}

// ════════════════════════════════════════════════
// 17. END OF DAY REFLECTION
// ════════════════════════════════════════════════

function renderEOD() {
  // Check if already submitted today
  const today = todayKey();
  const existing = STATE.history.find(h => h.date === today);
  if (existing) {
    showEODSubmitted(existing);
    return;
  }
  // Render fresh EOD form
  resetEODUI();
}

function resetEODUI() {
  const badge = document.getElementById('eod-submitted-badge');
  const body  = document.getElementById('eod-body');
  if (badge) badge.hidden = true;
  if (body) body.style.opacity = '1';
}

function showEODSubmitted(entry) {
  const badge = document.getElementById('eod-submitted-badge');
  const body  = document.getElementById('eod-body');

  if (badge) badge.hidden = false;

  // Pre-fill the form with submitted data (read-only feel)
  const yesBtn = document.getElementById('eod-yes');
  const noBtn  = document.getElementById('eod-no');

  if (yesBtn && noBtn) {
    yesBtn.classList.toggle('selected-yes', entry.showed === 'yes');
    noBtn.classList.toggle('selected-no', entry.showed === 'no');
  }

  // Stars
  document.querySelectorAll('.star-btn').forEach((btn, i) => {
    btn.classList.toggle('active', i < entry.effort);
  });

  const notes = document.getElementById('eod-notes');
  if (notes) notes.value = entry.notes || '';
}

// ════════════════════════════════════════════════
// 18. HISTORY VIEW
// ════════════════════════════════════════════════

function renderHistory() {
  const grid  = document.getElementById('history-grid');
  const empty = document.getElementById('history-empty');
  if (!grid) return;

  const sorted = [...STATE.history].sort((a, b) => b.date.localeCompare(a.date));

  if (sorted.length === 0) {
    grid.innerHTML = '';
    if (empty) empty.hidden = false;
    return;
  }

  if (empty) empty.hidden = true;

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

    return `
      <div class="history-entry">
        <div class="history-entry-date">${formatDateDisplay(entry.date)}</div>
        <div class="history-entry-showed">${showedDisplay}</div>
        <div class="history-effort">${starsHtml}</div>
        ${completedHtml}
        <div class="history-notes">${escapeHtml(entry.notes || '')}</div>
      </div>
    `;
  }).join('');
}

function formatDateDisplay(dateStr) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
  });
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// ════════════════════════════════════════════════
// 19. PROGRESSION VIEW
// ════════════════════════════════════════════════

function renderProgression() {
  renderPhaseSelector();
  renderPhaseDetail();
  renderHeatmap();
}

function renderPhaseSelector() {
  const grid = document.getElementById('phase-selector-grid');
  if (!grid) return;

  grid.innerHTML = PHASES.map(phase => `
    <div class="phase-option${STATE.phase === phase.id ? ' active' : ''}"
         data-phase="${phase.id}"
         id="phase-option-${phase.id}"
         role="radio"
         aria-checked="${STATE.phase === phase.id}"
         tabindex="0"
         style="--phase-color: ${phase.color}; --phase-gradient: ${phase.gradient}">
      <span class="phase-emoji">${phase.emoji}</span>
      <div class="phase-option-name">${phase.name}</div>
      <div class="phase-number">${phase.number}</div>
    </div>
  `).join('');

  // Listeners
  grid.querySelectorAll('.phase-option').forEach(opt => {
    opt.addEventListener('click', () => selectPhase(opt.dataset.phase));
    opt.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectPhase(opt.dataset.phase); }
    });
  });
}

function selectPhase(phaseId) {
  STATE.phase = phaseId;
  savePhase();

  // Update selector UI
  document.querySelectorAll('.phase-option').forEach(opt => {
    const active = opt.dataset.phase === phaseId;
    opt.classList.toggle('active', active);
    opt.setAttribute('aria-checked', active);
  });

  renderPhaseDetail();
  updatePhaseBadge();
  showToast(`Phase set to ${PHASES.find(p => p.id === phaseId)?.name}`);
}

function renderPhaseDetail() {
  const phase = PHASES.find(p => p.id === STATE.phase);
  const card  = document.getElementById('phase-detail-card');
  if (!phase || !card) return;

  card.style.setProperty('--phase-color', phase.color);
  card.style.borderColor = `${phase.color}33`;

  card.innerHTML = `
    <div class="phase-detail-header">
      <div class="phase-detail-icon">${phase.emoji}</div>
      <div>
        <div class="phase-detail-name" style="color: ${phase.color}">${phase.name}</div>
        <div class="phase-detail-sub">${phase.number} — Identity Evolution</div>
      </div>
    </div>
    <p class="phase-detail-desc">${phase.description}</p>
    <div class="phase-intensity-bar">
      <span class="phase-intensity-label">Intensity</span>
      <div class="phase-intensity-track">
        <div class="phase-intensity-fill" style="width: ${phase.intensity}%; background: ${phase.gradient}"></div>
      </div>
      <span style="font-size: 0.8rem; font-weight: 700; color: ${phase.color}; font-family: 'JetBrains Mono', monospace">${phase.intensity}%</span>
    </div>
    <div class="phase-hints">
      ${phase.hints.map(h => `
        <div class="phase-hint">
          <div class="phase-hint-dot" style="background: ${phase.color}"></div>
          <span>${h}</span>
        </div>
      `).join('')}
    </div>
  `;
}

function renderHeatmap() {
  const grid = document.getElementById('heatmap-grid');
  if (!grid) return;

  grid.innerHTML = '';

  // Generate last 30 days
  const days = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }

  days.forEach(dateStr => {
    const entry = STATE.history.find(h => h.date === dateStr);
    const div = document.createElement('div');
    div.className = 'heatmap-day';

    if (entry) {
      if (entry.showed === 'no') {
        div.classList.add('showed-no');
      } else if (entry.effort) {
        div.classList.add(`effort-${entry.effort}`);
      }
      div.setAttribute('data-tip', `${formatDateDisplay(dateStr)} · Effort: ${entry.effort || '?'}/5`);
    } else {
      div.setAttribute('data-tip', formatDateDisplay(dateStr));
    }

    grid.appendChild(div);
  });
}

// ════════════════════════════════════════════════
// 20. SETTINGS VIEW
// ════════════════════════════════════════════════

function renderSettings() {
  const nameInput = document.getElementById('user-name');
  const goalInput = document.getElementById('user-goal');

  if (nameInput) nameInput.value = STATE.settings.name || '';
  if (goalInput) goalInput.value = STATE.settings.goal || '';

  const reminders = STATE.settings.reminders || {};
  if (reminders.morning)  document.getElementById('remind-morning').value  = reminders.morning;
  if (reminders.work1)    document.getElementById('remind-work1').value    = reminders.work1;
  if (reminders.evening)  document.getElementById('remind-evening').value  = reminders.evening;
  if (reminders.night)    document.getElementById('remind-night').value    = reminders.night;
}

// ════════════════════════════════════════════════
// 21. HEADER / TOP UI UPDATES
// ════════════════════════════════════════════════

function updateHeaderStreak() {
  const countEl = document.getElementById('streak-count-header');
  const valEl   = document.getElementById('streak-value');

  if (countEl) countEl.textContent = STATE.streak.count;
  if (valEl)   valEl.textContent   = `${STATE.streak.count} days`;
}

function updatePhaseBadge() {
  const phase = PHASES.find(p => p.id === STATE.phase);
  const badgeEl  = document.getElementById('phase-badge-header');
  const displayEl = document.getElementById('phase-display');

  if (badgeEl)   badgeEl.textContent  = phase?.name || 'Stabilization';
  if (displayEl) displayEl.textContent = phase?.name || 'Stabilization';
}

function updateTodayDate() {
  const el = document.getElementById('today-date');
  if (el) el.textContent = todayDisplay();
}

// ════════════════════════════════════════════════
// 22. NOTIFICATIONS
// ════════════════════════════════════════════════

/**
 * Request browser notification permission
 */
async function requestNotifications() {
  if (!('Notification' in window)) {
    showToast('Browser notifications not supported');
    return;
  }

  const perm = await Notification.requestPermission();
  STATE.notificationsEnabled = perm === 'granted';

  if (STATE.notificationsEnabled) {
    showToast('🔔 Notifications enabled!');
    scheduleReminders();
  } else {
    showToast('Notifications blocked. Enable in browser settings.');
  }
}

/**
 * Schedule timed notifications based on settings
 */
function scheduleReminders() {
  if (!STATE.notificationsEnabled) return;

  const reminders = STATE.settings.reminders || {};
  const now = new Date();

  const schedule = [
    { key: 'morning',  time: reminders.morning || '06:00',  label: '🌅 Time to start your Morning Block!', body: 'Meditation → Workout → Plan the day' },
    { key: 'work1',    time: reminders.work1   || '09:00',  label: '💼 Work Block 1 starting!', body: 'Resume. Applications. Momentum.' },
    { key: 'evening',  time: reminders.evening || '18:00',  label: '🌆 Evening Block time!', body: 'Communication + Reading. Stay consistent.' },
    { key: 'night',    time: reminders.night   || '22:00',  label: '🌙 Night Reflection time.', body: 'Log your day. Build your streak.' },
  ];

  schedule.forEach(({ label, time, body }) => {
    const [h, m] = time.split(':').map(Number);
    const notifTime = new Date();
    notifTime.setHours(h, m, 0, 0);

    const delay = notifTime - now;
    if (delay > 0) {
      setTimeout(() => {
        new Notification(label, { body, icon: 'favicon.png' });
      }, delay);
    }
  });
}

// ════════════════════════════════════════════════
// 23. TOAST
// ════════════════════════════════════════════════

let toastTimeout;
function showToast(msg, duration = 3000) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = msg;
  toast.classList.add('show');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('show'), duration);
}

// ════════════════════════════════════════════════
// 24. VIEW NAVIGATION
// ════════════════════════════════════════════════

function switchView(viewId) {
  // Hide all views
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));

  // Show target
  const view = document.getElementById(`view-${viewId}`);
  const tab  = document.getElementById(`tab-${viewId}`);

  if (view) view.classList.add('active');
  if (tab)  tab.classList.add('active');

  STATE.currentView = viewId;

  // Render view-specific content
  if (viewId === 'history')     renderHistory();
  if (viewId === 'progression') renderProgression();
  if (viewId === 'settings')    renderSettings();
}

// ════════════════════════════════════════════════
// 25. EXPORT DATA
// ════════════════════════════════════════════════

function exportData() {
  const data = {
    tasks:    STATE.tasks,
    phase:    STATE.phase,
    streak:   STATE.streak,
    history:  STATE.history,
    settings: STATE.settings,
    exported: new Date().toISOString(),
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');

  a.href = url;
  a.download = `everyday-backup-${todayKey()}.json`;
  a.click();

  URL.revokeObjectURL(url);
  showToast('📤 Data exported successfully!');
}

// ════════════════════════════════════════════════
// 26. RESET DATA
// ════════════════════════════════════════════════

function resetAllData() {
  if (!confirm('⚠️ This will permanently delete ALL your data including history and streaks. Are you absolutely sure?')) return;
  if (!confirm('Last warning — this cannot be undone. Confirm?')) return;

  ['nista_tasks','nista_progress','nista_phase','nista_streak','nista_history','nista_settings','nista_last_date']
    .forEach(k => localStorage.removeItem(k));

  showToast('🗑 All data cleared. Refreshing...');
  setTimeout(() => location.reload(), 1500);
}

// ════════════════════════════════════════════════
// 27. EVENT LISTENERS (GLOBAL)
// ════════════════════════════════════════════════

function attachGlobalListeners() {

  // ── Nav tabs ──
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => switchView(tab.dataset.view));
  });

  // ── Focus mode toggle (header) ──
  document.getElementById('focus-mode-toggle')?.addEventListener('click', () => {
    // Open focus mode for the first non-completed block
    const firstBlock = BLOCKS.find(b => {
      const { total, done } = getBlockProgress(b);
      return done < total;
    }) || BLOCKS[0];
    openFocusMode(firstBlock.id);
  });

  // ── Focus overlay exit ──
  document.getElementById('focus-exit-btn')?.addEventListener('click', closeFocusMode);

  // ── Timer controls ──
  document.getElementById('timer-start')?.addEventListener('click', () => {
    if (STATE.timerRunning) pauseTimer();
    else startTimer();
  });
  document.getElementById('timer-reset')?.addEventListener('click', resetTimer);

  // ── Minimum mode ──
  document.getElementById('min-mode-toggle')?.addEventListener('change', (e) => {
    STATE.minimumMode = e.target.checked;
    applyMinimumMode();
    showToast(STATE.minimumMode ? '🛡 Minimum Mode ON — essential tasks shown' : 'Full mode restored');
  });

  // ── EOD: showed up buttons ──
  document.getElementById('eod-yes')?.addEventListener('click', () => {
    STATE.eod.showed = 'yes';
    document.getElementById('eod-yes')?.classList.add('selected-yes');
    document.getElementById('eod-no')?.classList.remove('selected-no');
  });

  document.getElementById('eod-no')?.addEventListener('click', () => {
    STATE.eod.showed = 'no';
    document.getElementById('eod-no')?.classList.add('selected-no');
    document.getElementById('eod-yes')?.classList.remove('selected-yes');
  });

  // ── EOD: stars ──
  document.querySelectorAll('.star-btn').forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      STATE.eod.effort = parseInt(btn.dataset.val);
      document.querySelectorAll('.star-btn').forEach((b, i) => {
        b.classList.toggle('active', i <= idx);
      });
    });

    btn.addEventListener('mouseenter', () => {
      document.querySelectorAll('.star-btn').forEach((b, i) => {
        b.style.color = i <= idx ? 'var(--accent-amber)' : '';
      });
    });

    btn.addEventListener('mouseleave', () => {
      document.querySelectorAll('.star-btn').forEach((b, i) => {
        b.style.color = i < STATE.eod.effort ? 'var(--accent-amber)' : '';
      });
    });
  });

  // ── EOD: submit ──
  document.getElementById('eod-submit')?.addEventListener('click', submitEOD);

  // ── Notification button ──
  document.getElementById('notify-btn')?.addEventListener('click', requestNotifications);

  // ── Settings: save identity ──
  document.getElementById('save-identity')?.addEventListener('click', () => {
    STATE.settings.name = document.getElementById('user-name')?.value?.trim() || '';
    STATE.settings.goal = document.getElementById('user-goal')?.value?.trim() || '';
    LS.set('nista_settings', STATE.settings);
    showToast('✅ Identity saved!');
  });

  // ── Settings: save reminders ──
  document.getElementById('save-reminders')?.addEventListener('click', () => {
    STATE.settings.reminders = {
      morning: document.getElementById('remind-morning')?.value,
      work1:   document.getElementById('remind-work1')?.value,
      evening: document.getElementById('remind-evening')?.value,
      night:   document.getElementById('remind-night')?.value,
    };
    LS.set('nista_settings', STATE.settings);
    showToast('✅ Reminders saved!');
    if (STATE.notificationsEnabled) scheduleReminders();
  });

  // ── Export / Reset ──
  document.getElementById('export-data')?.addEventListener('click', exportData);
  document.getElementById('reset-data')?.addEventListener('click', resetAllData);

  // ── Keyboard: Escape to close focus ──
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !document.getElementById('focus-overlay')?.hidden) {
      closeFocusMode();
    }
  });
}

// ════════════════════════════════════════════════
// 28. SUBMIT EOD REFLECTION
// ════════════════════════════════════════════════

function submitEOD() {
  if (!STATE.eod.showed) {
    showToast('Please select if you showed up today.');
    return;
  }
  if (STATE.eod.effort === 0) {
    showToast('Please rate your effort level.');
    return;
  }

  const notes = document.getElementById('eod-notes')?.value?.trim() || '';
  const { pct } = getOverallProgress();

  const entry = {
    date:           todayKey(),
    showed:         STATE.eod.showed,
    effort:         STATE.eod.effort,
    notes,
    tasksCompleted: pct,
    phase:          STATE.phase,
  };

  // Remove existing entry for today (overwrite)
  STATE.history = STATE.history.filter(h => h.date !== todayKey());
  STATE.history.push(entry);
  saveHistory();

  // Show submitted state
  showEODSubmitted(entry);
  showToast('🌙 Reflection saved. Great work today.');

  // Update streak (user showed up today explicitly)
  if (STATE.eod.showed === 'yes') {
    STATE.streak.count = Math.max(STATE.streak.count, 1);
    if (STATE.streak.count > STATE.streak.longest) STATE.streak.longest = STATE.streak.count;
    STATE.streak.lastDate = todayKey();
    LS.set('nista_streak', STATE.streak);
    updateHeaderStreak();
  }
}

// ════════════════════════════════════════════════
// 29. FIRST-OPEN DEFAULTS
// ════════════════════════════════════════════════

/**
 * Open first block by default for immediate engagement
 */
function openFirstBlock() {
  if (BLOCKS.length > 0) {
    const firstId = BLOCKS[0].id;
    const card = document.getElementById(`block-card-${firstId}`);
    const header = document.getElementById(`block-header-${firstId}`);
    if (card) { card.classList.add('expanded'); header?.setAttribute('aria-expanded', 'true'); }
  }
}

// ════════════════════════════════════════════════
// 30. BOOT
// ════════════════════════════════════════════════

function boot() {
  // 1. Load persisted state
  loadState();

  // 2. Check for new day / run reset
  checkDailyReset();

  // 3. Render UI
  renderBlocks();
  updateMasterProgress();
  updateHeaderStreak();
  updatePhaseBadge();
  updateTodayDate();
  renderEOD();

  // 4. Attach all listeners
  attachGlobalListeners();

  // 5. Open first block by default
  openFirstBlock();

  // 6. Check notification permission status
  if ('Notification' in window && Notification.permission === 'granted') {
    STATE.notificationsEnabled = true;
    scheduleReminders();
  }

  console.log('[EveryDay] Booted. Phase:', STATE.phase, '| Streak:', STATE.streak.count);
}

// ── Run when DOM is ready ──
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
