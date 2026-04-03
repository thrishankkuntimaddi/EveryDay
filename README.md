# EveryDay — Discipline. Progression. Execution.

A personal discipline, progression, and execution tracking system — not a to-do app. Built to help you transform through structured progression in phases of growth.

## 🧠 Core Philosophy

- **Progression over perfection**
- **Consistency over intensity**
- **Execution over planning**

## ⚙️ Features

- **Dashboard** — Daily execution in 6 structured blocks (Morning, Work ×3, Evening, Night)
- **Checklist System** — Checkboxes with localStorage persistence + auto-daily reset
- **Minimum Mode** — Bad day? Show only essential (core) tasks
- **Growth Phase System** — Stabilization → Control → Intensity → Expansion
- **End-of-Day Reflection** — Log if you showed up, effort (1–5), notes
- **Streak Tracker** — Consecutive day counter with visual display
- **30-Day Activity Heatmap** — Visual execution history
- **Focus Mode** — Distraction-free single-block view with Pomodoro timer
- **Browser Notifications** — Reminders for each block
- **Data Export** — Download your history as JSON

## 🚀 Running Locally

```bash
npx serve . -p 3000
```

Open [http://localhost:3000](http://localhost:3000)

## 📦 Tech Stack

- Pure HTML / CSS / Vanilla JS
- Zero dependencies
- localStorage only (no backend)

## 🗂 localStorage Keys

| Key | Purpose |
|-----|---------|
| `nista_tasks` | Daily task completion state |
| `nista_phase` | Current growth phase |
| `nista_streak` | Streak count + dates |
| `nista_history` | Array of daily reflections |
| `nista_settings` | User identity + reminder times |
| `nista_last_date` | Last active date (for daily reset) |
