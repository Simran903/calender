import express from 'express';
import { getAllGoals, getTasksByGoal } from '../controllers/goalController';

const router = express.Router();

router.get('/', getAllGoals);
router.get('/:id/tasks', getTasksByGoal);

export default router;