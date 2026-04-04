# EveryDay — Discipline. Progression. Execution.

A personal discipline and execution tracking system built for **sustainable long-term change**.

---

## Architecture

This project follows a **client-server architecture**:

```
EveryDay/
├── server/                   Express REST API (port 4000)
│   ├── index.js              Entry point
│   └── src/
│       ├── controllers/      Business logic (tasks, streak, history, settings, data)
│       ├── routes/           Express route definitions per domain
│       ├── middleware/        Error handler, 404
│       ├── db/store.js       JSON file persistence (swappable for any DB)
│       └── utils/date.js     Server date helpers
│
├── client/                   Vite + Vanilla JS frontend (port 5173)
│   ├── index.html
│   └── src/
│       ├── api/api.js        Centralized API client (all HTTP calls go here)
│       ├── modules/          Domain modules (blocks, eod, history, progression…)
│       ├── utils/            Date helpers, toast
│       ├── main.js           Boot sequence
│       └── style.css         Full design system
│
└── package.json              Root orchestrator (runs both with concurrently)
```

---

## Running Locally

### First-time setup

```bash
npm run install:all
```

### Start (both server + client simultaneously)

```bash
npm run dev
```

- **API Server** → `http://localhost:4000`
- **Client App** → `http://localhost:5173`

---

## API Reference

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/health` | Health check |
| `GET` | `/api/tasks` | Today's task completion |
| `PATCH` | `/api/tasks/:taskId` | Toggle/set a task |
| `DELETE` | `/api/tasks/today` | Reset today |
| `GET` | `/api/streak` | Current streak data |
| `POST` | `/api/streak/update` | Daily reset check |
| `PATCH` | `/api/streak/showup` | Confirm show-up |
| `GET` | `/api/history` | All EOD history |
| `GET` | `/api/history/today` | Today's entry |
| `POST` | `/api/history` | Submit reflection |
| `GET` | `/api/settings` | User settings |
| `PATCH` | `/api/settings` | Update settings |
| `GET` | `/api/settings/phase` | Current phase |
| `PATCH` | `/api/settings/phase` | Set phase |
| `GET` | `/api/data/export` | Download JSON backup |
| `DELETE` | `/api/data/reset` | Wipe all data |

---

## Key Design Decisions

- **Server is source of truth** — no localStorage. All state comes from the API on boot.
- **Optimistic UI** for task toggles — UI updates instantly, server call happens async with rollback on failure.
- **Offline fallback** — shows a warning banner if server is unreachable so the UI never hard-breaks.
- **Swappable DB** — `server/src/db/store.js` is the ONLY file that knows about persistence. Replace its internals with MongoDB, SQLite, Postgres, etc. without touching any other file.
- **Vite proxy** — client proxies all `/api/*` to `:4000` in dev. In production, configure your reverse proxy (nginx, etc.) the same way.
