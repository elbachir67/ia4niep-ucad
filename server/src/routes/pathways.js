import express from 'express';
import { Pathway } from '../models/Pathway.js';
import { Goal } from '../models/Goal.js';
import { auth } from '../middleware/auth.js';
import { logger } from '../utils/logger.js';
import PathwayGenerationService from '../services/PathwayGenerationService.js';

const router = express.Router();

// Mettre à jour une recommandation
router.put('/:pathwayId/recommendations/:index', auth, async (req, res) => {
  try {
    const { pathwayId, index } = req.params;
    const { action } = req.body;

    if (!['start', 'skip', 'complete'].includes(action)) {
      return res.status(400).json({ error: 'Action invalide' });
    }

    const pathway = await Pathway.findOne({
      _id: pathwayId,
      userId: req.user.id
    });

    if (!pathway) {
      return res.status(404).json({ error: 'Parcours non trouvé' });
    }

    const recommendationIndex = parseInt(index);
    if (recommendationIndex < 0 || recommendationIndex >= pathway.adaptiveRecommendations.length) {
      return res.status(400).json({ error: 'Index de recommandation invalide' });
    }

    // Mettre à jour le statut de la recommandation
    pathway.adaptiveRecommendations[recommendationIndex].status = 
      action === 'start' ? 'pending' :
      action === 'skip' ? 'skipped' : 'completed';

    // Si la recommandation est complétée, générer de nouvelles recommandations
    if (action === 'complete') {
      const newRecommendations = await PathwayGenerationService.generateAdaptiveRecommendations(
        pathway.goalId,
        pathway.moduleProgress,
        pathway.adaptiveRecommendations.filter((_, i) => i !== recommendationIndex)
      );
      
      pathway.adaptiveRecommendations = [
        ...pathway.adaptiveRecommendations.filter((_, i) => i !== recommendationIndex),
        ...newRecommendations
      ];
    }

    await pathway.save();
    res.json(pathway);
  } catch (error) {
    logger.error('Error updating recommendation:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la recommandation' });
  }
});

// Autres routes existantes...
// (Garder toutes les autres routes telles quelles)

export const pathwayRoutes = router;