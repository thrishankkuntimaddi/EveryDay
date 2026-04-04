import { Router } from 'express';
import { getTasks, updateTask, resetTodayTasks } from '../controllers/tasks.controller.js';

const router = Router();

router.get('/', getTasks);
router.patch('/:taskId', updateTask);
router.delete('/today', resetTodayTasks);

export default router;
