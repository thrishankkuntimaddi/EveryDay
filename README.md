# EveryDay — Discipline. Progression. Execution.

> A personal discipline execution system designed for **sustainable long-term transformation** — not motivation, but relentless daily systems.

---

## 📌 Description

**EveryDay** is a full-stack personal productivity and discipline tracker built around the concept of **time-blocked execution**. It structures your entire day into clearly defined work blocks — Morning, Work, Evening, Night — and tracks task completion, streaks, end-of-day reflections, and growth phases across time.

**The problem it solves:** Generic to-do apps don't enforce time structure or habit continuity. EveryDay ties your tasks to real clock-based blocks, locks them during execution windows, and unlocks an end-of-day reflection only when you've *earned* it — building accountability into the system itself.

**Why it exists:** Built as a personal operating system for a developer actively job hunting, building a side project (Chttrix), and developing daily discipline habits — simultaneously.

---

## 🚀 Live Demo

> 🌐 **Deployed on GitHub Pages**
> **URL:** [https://thrishankkuntimaddi.github.io/EveryDay/](https://thrishankkuntimaddi.github.io/EveryDay/)
> **Platform:** GitHub Pages (static client) + Firebase Firestore (live data)

---

## 🔐 Authentication

EveryDay uses **Firebase Authentication** with email/password sign-in and a **custom email verification flow** powered by Brevo SMTP.

- Sign up with any email + password
- A verification email is sent via Brevo (custom token, 24h expiry)
- Clicking the email link verifies your account and unlocks the app
- **Dev bypass:** Email verification is automatically skipped on `localhost` — the app boots directly with a console warning

> ⚠️ There are no shared demo credentials — the app is personal by design. Register with any email to explore.

---

## 🧩 Features

### ✅ Core Execution

| Feature | Description |
|---|---|
| **Time-Blocked Task System** | 6 day-blocks (Morning, Work×3, Evening, Night) each with precise start/end times |
| **Time-Locked Tasks** | Tasks are locked 🔒 during a block's active window — mark them only after the block ends |
| **Optimistic UI Updates** | Task toggles update instantly with automatic server rollback on failure |
| **Sub-tasks with Weighted Progress** | Parent tasks cascade to sub-tasks; each sub-task carries a configurable point weight |
| **Task Descriptions** | Add personal notes to any task (auto-saved to Firestore) |
| **Minimum Mode** | Toggle to show only `isCore` essential tasks — reduces decision fatigue on hard days |
| **Drag-and-Drop Block Reordering** | Re-sequence blocks by dragging without losing state |

### 🔥 Streak Tracking

- Consecutive daily streaks auto-calculated on first boot each day
- **Longest streak** record preserved
- Show-up confirmed via EOD reflection (not just task completion)
- Streak resets gracefully if a day is missed

### 🌙 End-of-Day Reflection (EOD)

- Unlocks when: **≥80% tasks complete** OR **5:00 PM** has passed
- Prompts: Did you show up? (Yes/No) + Effort rating (1–5 ⭐) + Free-form notes
- **Auto-suggestion:** Pre-fills effort rating and a motivational note based on current task completion %
- Submitted once per day; day locks post-submission until 4:00 AM
- Stores reflection history for all-time review

### 📅 Tomorrow's Plan

- Plan your next day's tasks before sleeping — pre-filled template from today's blocks
- Saved to Firestore; loads automatically on next-day boot

### 🎯 Focus Mode

- Full-screen distraction-free overlay per block
- **Countdown timer** tied to the block's actual end time (not a free timer)
- Live progress bar showing elapsed block time
- Color shifts from violet → amber → red as time runs low
- **Wake Lock API** — keeps your screen on during focus
- **Browser Notifications** — fires on start, at block midpoint, and on completion
- Live browser tab title shows countdown: `🌅 1:23:45 — Morning Block`
- Keyboard shortcut: `Escape` to exit

### 📊 History & Heatmap

- Full EOD history log with date, effort score, show-up status, and notes
- Calendar heatmap showing daily activity (inferred from history data)

### 🌱 Growth Phases

Four progression phases — each with intensity level, description, and actionable hints:

| Phase | Emoji | Intensity | Focus |
|---|---|---|---|
| Stabilization | 🌱 | 40% | Build consistency, show up daily |
| Control | 🎯 | 60% | Sharpen execution, eliminate low-impact work |
| Intensity | ⚡ | 85% | Maximum output, no excuses |
| Expansion | 🌊 | 100% | Compound growth, mentor, ship publicly |

Phase selection persisted to Firestore; visible in the dashboard header badge.

### ⚙️ Settings & Account

- **Identity**: Save your name and personal goal
- **Block Reminders**: Per-block notification times (12h picker) with enable/disable toggles
- **Export Data**: Download full JSON backup of all tasks, history, streaks, and settings
- **Import Data**: Restore from any backup JSON file
- **Hard Refresh**: Force re-fetch from Firestore and re-render
- **Change Password**: Inline form with re-authentication
- **Delete Account**: Double-confirmed, wipes Firestore before deleting Firebase auth user

### 🔄 Real-Time Cross-Device Sync

- Firestore `onSnapshot` listener fires on remote changes (other device/tab)
- Latest-write-wins conflict resolution via `lastUpdated` timestamp comparison
- Stale out-of-order snapshots are silently rejected
- Reminders automatically rescheduled when settings change remotely
- Only the **currently active view** re-renders on remote updates — no jarring full-page reloads

### 📲 Notifications

- Browser Notification API with user permission flow
- Per-block reminder scheduling from Settings
- Focus Mode fires start, midpoint (50%), and completion notifications

### 🗓️ Immediate Tasks

- A dedicated view for urgent/ad-hoc tasks outside the normal block structure
- Separate from the block system — useful for inbox-style capture

---

## 🏗️ Tech Stack

### Frontend
| Technology | Role |
|---|---|
| **Vanilla JavaScript (ES Modules)** | All client logic — no framework overhead |
| **Vite 5** | Dev server, HMR, production bundling |
| **Vanilla CSS** | Full custom design system (`style.css`, ~143KB) |
| **Firebase JS SDK v12** | Firestore + Auth (client-side) |

### Backend
| Technology | Role |
|---|---|
| **Node.js + Express 4** | REST API server |
| **Nodemon** | Dev auto-restart |
| **CORS** | Cross-origin policy for client↔server communication |
| **dotenv** | Environment variable management |
| **Nodemailer + Brevo SMTP** | Transactional email (verification emails) |
| **UUID** | Token generation for email verification |

### Database / Persistence
| Technology | Role |
|---|---|
| **Google Firestore** | Primary live data store (per-user document) |
| **JSON file (`data.json`)** | Server-side flat-file store (swappable layer) |

### Tooling
| Tool | Role |
|---|---|
| **concurrently** | Runs server + client simultaneously in one terminal |
| **GitHub Pages** | Static client deployment |
| **Firebase Analytics** | Usage tracking (passive) |

---

## 📂 Project Structure

```
EveryDay/
│
├── package.json                  # Root orchestrator — runs both server + client
│
├── client/                       # Vite + Vanilla JS frontend (port 5173)
│   ├── index.html                # Single-page app shell with all views
│   ├── vite.config.js            # Vite config — dev proxy + GitHub Pages base path
│   └── src/
│       ├── main.js               # Boot sequence, auth gate, view navigation
│       ├── style.css             # Complete design system (dark theme, animations)
│       ├── api/
│       │   └── api.js            # Firestore-backed data client (tasks/streak/history/settings)
│       ├── lib/
│       │   ├── auth.js           # Firebase Auth helpers (login/logout/verify/change-password)
│       │   ├── db.js             # Firestore read/write with in-memory cache
│       │   └── firebase.js       # Firebase app initialization
│       ├── modules/
│       │   ├── data.js           # BLOCKS and PHASES config (client-side structural data)
│       │   ├── state.js          # Global STATE object (in-memory session state)
│       │   ├── blocks.js         # Block rendering, task toggling, progress calculations
│       │   ├── blockTimer.js     # Real-time block lock/unlock based on clock
│       │   ├── eod.js            # End-of-Day reflection module
│       │   ├── focusMode.js      # Full-screen focus overlay with countdown + Wake Lock
│       │   ├── header.js         # Streak counter + phase badge in header
│       │   ├── history.js        # History log + activity heatmap
│       │   ├── immediate.js      # Immediate/ad-hoc task capture
│       │   ├── notifications.js  # Browser notification scheduling
│       │   ├── planEditor.js     # Inline block plan editor (add/edit/remove tasks)
│       │   ├── progression.js    # Growth phase selector and detail panel
│       │   ├── settings.js       # Settings view (identity, reminders, data, account)
│       │   ├── tomorrowPlan.js   # Plan-for-Tomorrow card
│       │   ├── dragSort.js       # Drag-and-drop block reordering
│       │   └── login.js          # Login/signup screen + email verification UI
│       └── utils/
│           ├── date.js           # Date key helpers
│           └── toast.js          # Toast notification utility
│
└── server/                       # Express REST API (port 4000)
    ├── index.js                  # Entry point — app bootstrap, all routes mounted
    ├── .env                      # Environment variables (SMTP, PORT, CLIENT_URL)
    └── src/
        ├── routes/               # Route definitions (tasks, streak, history, settings, data, auth)
        ├── controllers/          # Business logic per domain
        ├── services/             # Service layer (email sending etc.)
        ├── middleware/
        │   └── errorHandler.js   # Global error handler + 404
        ├── utils/
        │   └── date.js           # Server-side date helpers
        └── db/
            ├── store.js          # JSON file persistence (swap for any DB)
            └── data.json         # Runtime data file (auto-created on first boot)
```

---

## ⚙️ Installation & Setup

### Prerequisites
- **Node.js** v18+ 
- **npm** v9+
- A **Firebase project** with Firestore and Authentication enabled
- A **Brevo account** for transactional email (optional — verification emails)

### 1. Clone the Repository

```bash
git clone https://github.com/thrishankkuntimaddi/EveryDay.git
cd EveryDay
```

### 2. Install All Dependencies

```bash
npm run install:all
```

This installs dependencies for both `server/` and `client/` in one command.

### 3. Configure Environment Variables

Create `server/.env`:

```env
# Brevo SMTP (for email verification)
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=your_brevo_smtp_user
SMTP_PASS=your_brevo_smtp_password
EMAIL_FROM=your@email.com

# App
CLIENT_URL=http://localhost:5173
PORT=4000
```

### 4. Configure Firebase

Update `client/src/lib/firebase.js` with your own Firebase project credentials:

```js
const firebaseConfig = {
  apiKey:            'YOUR_API_KEY',
  authDomain:        'YOUR_PROJECT.firebaseapp.com',
  projectId:         'YOUR_PROJECT_ID',
  storageBucket:     'YOUR_PROJECT.firebasestorage.app',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId:             'YOUR_APP_ID',
  measurementId:     'YOUR_MEASUREMENT_ID',
};
```

> Enable **Email/Password** authentication and **Firestore Database** in your Firebase Console.

### 5. Run Locally

```bash
npm run dev
```

Both services launch simultaneously:

| Service | URL |
|---|---|
| **API Server** | `http://localhost:4000` |
| **Client App** | `http://localhost:5173` |

> 💡 On localhost, email verification is automatically bypassed — the app boots directly after sign-in.

---

## 🔑 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `PORT` | Yes | Express server port (default: `4000`) |
| `CLIENT_URL` | Yes | Allowed CORS origin for the client app |
| `SMTP_HOST` | Yes* | Brevo SMTP relay hostname |
| `SMTP_PORT` | Yes* | SMTP port (typically `587`) |
| `SMTP_USER` | Yes* | Brevo SMTP username |
| `SMTP_PASS` | Yes* | Brevo SMTP password |
| `EMAIL_FROM` | Yes* | Sender email address for verification emails |

> *Required only if using email verification in production. Dev mode bypasses this entirely.

---

## 🧠 How It Works

### Boot Sequence

```
1. Firebase Auth listener fires → user detected
2. loadUserData(uid) — full Firestore document loaded into in-memory cache
3. Email verification check (Firebase flag OR custom Brevo token)
4. boot() runs:
   a. Streak update for today (resets tasks if new day)
   b. All state hydrated: tasks, history, settings, phase
   c. UI renders: blocks, header, streak, EOD, tomorrow plan
   d. listenToUserData() — Firestore onSnapshot for real-time cross-device sync
```

### Data Flow

```
User Action
    │
    ▼
Optimistic UI Update (instant)
    │
    ▼
api.js → patchUserData() → Firestore write
    │
    ▼
onSnapshot fires on ALL signed-in devices
    │
    ▼
_handleRemoteUpdate() → STATE sync → view re-render
```

### Key Design Principles

- **Firestore is the single source of truth** — no localStorage, no server-side state for the client
- **Optimistic UI** — task toggles apply instantly; server errors trigger a rollback with a toast notification
- **Block-time locking** — tasks within an active/upcoming block are locked; `blockTimer.js` evaluates real clock time
- **EOD gating** — reflection only unlocks at ≥80% task completion or 5PM, preventing premature sign-off
- **Swappable DB layer** — `server/src/db/store.js` is the only file that knows about JSON persistence; swap its internals for MongoDB, Postgres, or SQLite without touching any other file
- **Dev/prod parity** — Vite proxies `/api/*` to `:4000` in dev; configure nginx or similar in production

### Cross-Device Sync Strategy

Remote Firestore snapshots include a `lastUpdated` timestamp. The client maintains `_lastKnownUpdate` and rejects any snapshot strictly older than what it already has — preventing stale out-of-order writes from overwriting fresh local state (latest-write-wins).

---

## 🚧 Challenges & Solutions

| Challenge | Solution |
|---|---|
| **Double Firestore read on every login** | Introduced `_bootWithSyncNoPrefetch()` — auth gate pre-loads data once, boot skips redundant second fetch |
| **Stale remote snapshot overwrites** | `_lastKnownUpdate` timestamp guard rejects genuinely older snapshots |
| **Firestore 1MiB document limit** | Task history older than 30 days is automatically pruned on each new-day boot |
| **Task toggles during focus causing jarring re-renders** | Only the currently active view re-renders on remote updates; other views update STATE silently and render correctly when switched to |
| **Screen going dark during focus sessions** | Wake Lock API (`navigator.wakeLock`) keeps the screen alive; gracefully re-acquires on tab visibility change |
| **Email verification in dev slowing iteration** | Localhost hostname detection triggers a dev bypass with a loud, styled console warning |
| **EOD gating preventing premature reflection** | Dual unlock condition: ≥80% task completion OR 5PM — whichever comes first |

---

## 🔮 Future Improvements

- [ ] **PWA / Service Worker** — offline-first support and installability
- [ ] **Weekly/Monthly Analytics** — charts showing productivity trends, streak patterns, and phase progression over time
- [ ] **Custom Block Creation** — allow users to define their own blocks instead of the hardcoded default schedule
- [ ] **Shared Plans** — export/share a daily block template with others
- [ ] **Pomodoro Mode** — optional Pomodoro cycles within a Focus Mode session
- [ ] **Mobile App** — React Native or Capacitor wrapper for native iOS/Android
- [ ] **AI Reflection Insights** — analyse EOD notes over time for patterns and suggest improvements
- [ ] **Calendar Integration** — sync blocks to Google Calendar
- [ ] **Multi-user Accountability** — pair up with a buddy for shared streak challenges

---

## 📸 UI Overview

The interface is built around a **dark-first, premium design system** with these views:

| View | Description |
|---|---|
| **Dashboard** | Master progress ring, all time-blocks, EOD reflection, tomorrow plan |
| **Immediate** | Ad-hoc urgent task capture outside block structure |
| **History** | Full EOD log + calendar activity heatmap |
| **Settings** | Identity, block reminders, data management, account |
| **Focus Mode** | Full-screen overlay with live block countdown, task list, wake lock |
| **Phase Panel** | Inline phase selector (Stabilization → Expansion) with intensity bar |

Navigation uses a persistent top tab bar (desktop) and a bottom navigation bar (mobile).

---

## 🤝 Contributing

This is a personal-use project, but contributions are welcome.

```bash
# 1. Fork the repository
# 2. Create a feature branch
git checkout -b feature/your-feature-name

# 3. Make your changes
# 4. Run locally and verify
npm run dev

# 5. Commit with a descriptive message
git commit -m "feat: add X feature"

# 6. Push and open a Pull Request
git push origin feature/your-feature-name
```

### Guidelines

- Keep the **server/src/db/store.js** abstraction clean — no raw `fs` calls outside this file
- New client modules go in `client/src/modules/`
- All data reads/writes from client must go through `api.js` → `db.js` → Firestore
- Don't introduce CSS frameworks — the project uses a hand-crafted design system

---

## 📜 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2025 Thrishank Kuntimaddi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

## 👤 Author

**Thrishank Kuntimaddi**

> *"Discipline isn't about motivation. It's about building a system that doesn't give you a choice."*

---

<div align="center">
  <strong>EveryDay — Show up. Execute. Compound.</strong>
</div>
