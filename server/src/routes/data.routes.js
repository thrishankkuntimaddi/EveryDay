import { Router } from 'express';
import { exportData, resetAllData } from '../controllers/data.controller.js';

const router = Router();

router.get('/export', exportData);
router.delete('/reset', resetAllData);

export default router;
