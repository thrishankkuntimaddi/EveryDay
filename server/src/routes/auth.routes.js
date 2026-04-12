/**
 * auth.routes.js — Authentication email endpoints
 * =================================================
 * POST /api/auth/send-verification  — send verification email via Brevo SMTP
 * POST /api/auth/resend-verification — resend (same logic, alias)
 */

import express from 'express';
import { sendVerificationEmail } from '../services/mailer.js';

const router = express.Router();

// ── POST /api/auth/send-verification ─────────────────────────────────────────

router.post('/send-verification', async (req, res) => {
  const { email, uid, token } = req.body;

  // Basic validation
  if (!email || !uid || !token) {
    return res.status(400).json({ error: 'Missing required fields: email, uid, token' });
  }

  // Basic email format check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  // Token must look like a UUID (security sanity check)
  if (!/^[0-9a-f-]{36}$/i.test(token)) {
    return res.status(400).json({ error: 'Invalid verification token format' });
  }

  try {
    await sendVerificationEmail({ to: email, uid, token });
    return res.json({ success: true, message: `Verification email sent to ${email}` });
  } catch (err) {
    console.error('[Auth Routes] Failed to send verification email:', err.message);
    return res.status(500).json({ error: 'Email delivery failed: ' + err.message });
  }
});

// Alias for resend
router.post('/resend-verification', async (req, res) => {
  req.url = '/send-verification';
  return router.handle(req, res, () => {});
});

export default router;
