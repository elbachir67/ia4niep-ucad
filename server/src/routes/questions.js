import express from 'express';
import { Question } from '../models/Question.js';
import { logger } from '../utils/logger.js';

const router = express.Router();

// Get questions by category and difficulty
router.get('/', async (req, res) => {
  try {
    const { category, difficulty } = req.query;
    let query = {};

    if (category) {
      query.category = category.toLowerCase();
    }
    if (difficulty) {
      query.difficulty = difficulty;
    }

    const questions = await Question.find(query)
      .select('-createdAt -updatedAt -__v')
      .sort({ difficulty: 1 });

    res.json(questions);
  } catch (error) {
    logger.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Error fetching questions' });
  }
});

export const questionRoutes = router;