import express from 'express';
import { body } from 'express-validator';
import { Resource } from '../models/Resource.js';
import { auth, adminAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { logger } from '../utils/logger.js';

const router = express.Router();

// Get all resources
router.get('/', async (req, res) => {
  try {
    const resources = await Resource.find()
      .populate({
        path: 'step',
        populate: { path: 'section' }
      });
    res.json(resources);
  } catch (error) {
    logger.error('Resources fetch error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get resources by step
router.get('/step/:stepId', async (req, res) => {
  try {
    const resources = await Resource.find({ step: req.params.stepId })
      .populate('step');
    res.json(resources);
  } catch (error) {
    logger.error('Step resources fetch error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create resource (admin only)
router.post('/',
  adminAuth,
  [
    body('step').isMongoId(),
    body('title').notEmpty(),
    body('description').notEmpty(),
    body('url').isURL(),
    body('type').isIn(['article', 'video', 'course', 'book', 'use_case']),
    body('level').isIn(['basic', 'intermediate', 'advanced']),
    body('duration').notEmpty(),
    body('language').isIn(['fr', 'en'])
  ],
  validate,
  async (req, res) => {
    try {
      const resource = new Resource(req.body);
      await resource.save();
      logger.info(`New resource created: ${resource.title}`);
      res.status(201).json(resource);
    } catch (error) {
      logger.error('Resource creation error:', error);
      res.status(400).json({ error: error.message });
    }
  }
);

// Update resource (admin only)
router.put('/:id',
  adminAuth,
  [
    body('step').isMongoId(),
    body('title').notEmpty(),
    body('description').notEmpty(),
    body('url').isURL(),
    body('type').isIn(['article', 'video', 'course', 'book', 'use_case']),
    body('level').isIn(['basic', 'intermediate', 'advanced']),
    body('duration').notEmpty(),
    body('language').isIn(['fr', 'en'])
  ],
  validate,
  async (req, res) => {
    try {
      const resource = await Resource.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!resource) {
        return res.status(404).json({ error: 'Resource not found' });
      }
      logger.info(`Resource updated: ${resource.title}`);
      res.json(resource);
    } catch (error) {
      logger.error('Resource update error:', error);
      res.status(400).json({ error: error.message });
    }
  }
);

// Delete resource (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id);
    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }
    logger.info(`Resource deleted: ${resource.title}`);
    res.json({ message: 'Resource deleted successfully' });
  } catch (error) {
    logger.error('Resource deletion error:', error);
    res.status(500).json({ error: error.message });
  }
});

export const resourceRoutes = router;