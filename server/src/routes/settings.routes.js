import { Router } from 'express';
import { getSettings, updateSettings, getPhase, setPhase } from '../controllers/settings.controller.js';

const router = Router();

router.get('/', getSettings);
router.patch('/', updateSettings);
router.get('/phase', getPhase);
router.patch('/phase', setPhase);

export default router;
