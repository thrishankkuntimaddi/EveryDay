import { Router } from 'express';
import { getHistory, submitReflection, getTodayReflection } from '../controllers/history.controller.js';

const router = Router();

router.get('/', getHistory);
router.get('/today', getTodayReflection);
router.post('/', submitReflection);

export default router;
