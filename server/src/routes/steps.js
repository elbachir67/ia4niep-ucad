import express from 'express';
import { body } from 'express-validator';
import { Step } from '../models/Step.js';
import { auth, adminAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { logger } from '../utils/logger.js';

const router = express.Router();

// Get all steps
router.get('/', async (req, res) => {
  try {
    const steps = await Step.find()
      .populate('section')
      .sort('order');
    res.json(steps);
  } catch (error) {
    logger.error('Steps fetch error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get steps by section
router.get('/section/:sectionId', async (req, res) => {
  try {
    const steps = await Step.find({ section: req.params.sectionId })
      .populate('section')
      .sort('order');
    res.json(steps);
  } catch (error) {
    logger.error('Section steps fetch error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get step by ID
router.get('/:id', async (req, res) => {
  try {
    const step = await Step.findById(req.params.id)
      .populate('section');
    if (!step) {
      return res.status(404).json({ error: 'Step not found' });
    }
    res.json(step);
  } catch (error) {
    logger.error('Step fetch error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create step (admin only)
router.post('/',
  adminAuth,
  [
    body('section').isMongoId(),
    body('title').notEmpty(),
    body('description').notEmpty(),
    body('duration').notEmpty(),
    body('details').notEmpty(),
    body('fullDetails').notEmpty(),
    body('order').isInt({ min: 1 }),
    body('difficulty').isIn(['beginner', 'intermediate', 'advanced'])
  ],
  validate,
  async (req, res) => {
    try {
      const step = new Step(req.body);
      await step.save();
      logger.info(`New step created: ${step.title}`);
      res.status(201).json(step);
    } catch (error) {
      logger.error('Step creation error:', error);
      res.status(400).json({ error: error.message });
    }
  }
);

// Update step (admin only)
router.put('/:id',
  adminAuth,
  [
    body('section').isMongoId(),
    body('title').notEmpty(),
    body('description').notEmpty(),
    body('duration').notEmpty(),
    body('details').notEmpty(),
    body('fullDetails').notEmpty(),
    body('order').isInt({ min: 1 }),
    body('difficulty').isIn(['beginner', 'intermediate', 'advanced'])
  ],
  validate,
  async (req, res) => {
    try {
      const step = await Step.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!step) {
        return res.status(404).json({ error: 'Step not found' });
      }
      logger.info(`Step updated: ${step.title}`);
      res.json(step);
    } catch (error) {
      logger.error('Step update error:', error);
      res.status(400).json({ error: error.message });
    }
  }
);

// Delete step (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const step = await Step.findByIdAndDelete(req.params.id);
    if (!step) {
      return res.status(404).json({ error: 'Step not found' });
    }
    logger.info(`Step deleted: ${step.title}`);
    res.json({ message: 'Step deleted successfully' });
  } catch (error) {
    logger.error('Step deletion error:', error);
    res.status(500).json({ error: error.message });
  }
});

export const stepRoutes = router;