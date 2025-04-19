import express from 'express';
import { body } from 'express-validator';
import { Section } from '../models/Section.js';
import { auth, adminAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { logger } from '../utils/logger.js';

const router = express.Router();

// Get all sections
router.get('/', async (req, res) => {
  try {
    const sections = await Section.find().sort('order');
    res.json(sections);
  } catch (error) {
    logger.error('Sections fetch error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get section by ID
router.get('/:id', async (req, res) => {
  try {
    const section = await Section.findById(req.params.id);
    if (!section) {
      return res.status(404).json({ error: 'Section not found' });
    }
    res.json(section);
  } catch (error) {
    logger.error('Section fetch error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create section (admin only)
router.post('/',
  adminAuth,
  [
    body('title').notEmpty(),
    body('description').notEmpty(),
    body('order').isInt({ min: 1 }),
    body('icon').isIn(['brain', 'database', 'code', 'bot', 'book', 'sparkles'])
  ],
  validate,
  async (req, res) => {
    try {
      const section = new Section(req.body);
      await section.save();
      logger.info(`New section created: ${section.title}`);
      res.status(201).json(section);
    } catch (error) {
      logger.error('Section creation error:', error);
      res.status(400).json({ error: error.message });
    }
  }
);

// Update section (admin only)
router.put('/:id',
  adminAuth,
  [
    body('title').notEmpty(),
    body('description').notEmpty(),
    body('order').isInt({ min: 1 }),
    body('icon').isIn(['brain', 'database', 'code', 'bot', 'book', 'sparkles'])
  ],
  validate,
  async (req, res) => {
    try {
      const section = await Section.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!section) {
        return res.status(404).json({ error: 'Section not found' });
      }
      logger.info(`Section updated: ${section.title}`);
      res.json(section);
    } catch (error) {
      logger.error('Section update error:', error);
      res.status(400).json({ error: error.message });
    }
  }
);

// Delete section (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const section = await Section.findByIdAndDelete(req.params.id);
    if (!section) {
      return res.status(404).json({ error: 'Section not found' });
    }
    logger.info(`Section deleted: ${section.title}`);
    res.json({ message: 'Section deleted successfully' });
  } catch (error) {
    logger.error('Section deletion error:', error);
    res.status(500).json({ error: error.message });
  }
});

export const sectionRoutes = router;