/**
 * EveryDay — API Server
 * =====================
 * Express REST API for the EveryDay discipline tracking system.
 *
 * Architecture:
 *   server/index.js          — Entry point, app bootstrap
 *   src/routes/              — Route definitions per domain
 *   src/controllers/         — Business logic per domain
 *   src/db/store.js          — Persistence layer (swap for any DB)
 *   src/middleware/          — Global middleware (error, 404)
 *   src/utils/               — Shared utilities
 *
 * API Base: http://localhost:4000/api
 *
 * Routes:
 *   GET    /api/tasks              — Today's task completion state
 *   PATCH  /api/tasks/:taskId      — Toggle/set task done
 *   DELETE /api/tasks/today        — Reset today's tasks
 *
 *   GET    /api/streak             — Current streak data
 *   POST   /api/streak/update      — Check daily reset + update streak
 *   PATCH  /api/streak/showup      — Confirm show-up (from EOD)
 *
 *   GET    /api/history            — All history entries
 *   GET    /api/history/today      — Today's EOD entry
 *   POST   /api/history            — Submit/overwrite today's EOD
 *
 *   GET    /api/settings           — User identity + reminders
 *   PATCH  /api/settings           — Update settings (partial)
 *   GET    /api/settings/phase     — Current growth phase
 *   PATCH  /api/settings/phase     — Set growth phase
 *
 *   GET    /api/data/export        — Full data export (JSON download)
 *   DELETE /api/data/reset         — Wipe all data (requires confirm header)
 *
 *   GET    /api/health             — Health check
 */

import 'dotenv/config';   // load .env before anything else
import express from 'express';
import cors from 'cors';
import { initStore } from './src/db/store.js';
import { errorHandler, notFound } from './src/middleware/errorHandler.js';

import tasksRoutes    from './src/routes/tasks.routes.js';
import streakRoutes   from './src/routes/streak.routes.js';
import historyRoutes  from './src/routes/history.routes.js';
import settingsRoutes from './src/routes/settings.routes.js';
import dataRoutes     from './src/routes/data.routes.js';
import authRoutes     from './src/routes/auth.routes.js';

const PORT = process.env.PORT || 4000;

// ── Initialize persistence store ────────────────────────────────────────────
initStore();

// ── Create Express app ────────────────────────────────────────────────────────
const app = express();

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'X-Confirm-Reset'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Request logger ────────────────────────────────────────────────────────────
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// ── API Routes ────────────────────────────────────────────────────────────────
app.use('/api/tasks',    tasksRoutes);
app.use('/api/streak',   streakRoutes);
app.use('/api/history',  historyRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/data',     dataRoutes);
app.use('/api/auth',     authRoutes);   // Brevo email verification

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime(), time: new Date().toISOString() });
});

// ── 404 + Error handlers ──────────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ── Boot ──────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 EveryDay API Server running at http://localhost:${PORT}`);
  console.log(`   Health:   http://localhost:${PORT}/api/health`);
  console.log(`   Tasks:    http://localhost:${PORT}/api/tasks`);
  console.log(`   Streak:   http://localhost:${PORT}/api/streak`);
  console.log(`   History:  http://localhost:${PORT}/api/history`);
  console.log(`   Settings: http://localhost:${PORT}/api/settings\n`);
});
