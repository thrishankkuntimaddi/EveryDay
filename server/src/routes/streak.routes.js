import { Router } from 'express';
import { getStreak, updateStreak, confirmShowUp } from '../controllers/streak.controller.js';

const router = Router();

router.get('/', getStreak);
router.post('/update', updateStreak);
router.patch('/showup', confirmShowUp);

export default router;
