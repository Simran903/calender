import { Request, Response } from 'express';
import Goal from '../models/Goal';
import Task from '../models/Task';

export const getAllGoals = async (req: Request, res: Response): Promise<void> => {
  try {
    const goals = await Goal.find();
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching goals', error });
  }
};

export const getTasksByGoal = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const tasks = await Task.find({ goalId: id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
};