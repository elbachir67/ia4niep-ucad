import { Goal } from '../models/Goal.js';
import { logger } from '../utils/logger.js';

class PathwayGenerationService {
  /**
   * Génère des recommandations adaptatives basées sur la progression
   */
  static async generateAdaptiveRecommendations(goalId, moduleProgress, existingRecommendations = []) {
    try {
      // Récupérer l'objectif
      const goal = await Goal.findById(goalId);
      if (!goal) {
        throw new Error('Objectif non trouvé');
      }

      const recommendations = [];

      // Analyser la progression des modules
      moduleProgress.forEach((module, index) => {
        const goalModule = goal.modules[index];
        if (!goalModule) return;

        // Recommandations basées sur les ressources non complétées
        const incompleteResources = module.resources.filter(r => !r.completed);
        if (incompleteResources.length > 0) {
          recommendations.push({
            type: 'resource',
            description: `Complétez les ressources du module "${goalModule.title}"`,
            priority: 'high',
            status: 'pending'
          });
        }

        // Recommandations basées sur les quiz
        if (!module.quiz.completed) {
          recommendations.push({
            type: 'practice',
            description: `Passez le quiz de validation pour le module "${goalModule.title}"`,
            priority: 'high',
            status: 'pending'
          });
        } else if (module.quiz.score < 70) {
          recommendations.push({
            type: 'review',
            description: `Révisez les concepts du module "${goalModule.title}" (score: ${module.quiz.score}%)`,
            priority: 'medium',
            status: 'pending'
          });
        }

        // Recommandations basées sur les compétences
        goalModule.skills.forEach(skill => {
          const relatedResources = module.resources.filter(r => 
            r.completed && r.type === 'practice'
          );

          if (relatedResources.length === 0) {
            recommendations.push({
              type: 'practice',
              description: `Pratiquez ${skill.name} avec des exercices supplémentaires`,
              priority: 'medium',
              status: 'pending'
            });
          }
        });
      });

      // Filtrer les recommandations existantes
      const newRecommendations = recommendations.filter(newRec => 
        !existingRecommendations.some(existingRec => 
          existingRec.description === newRec.description &&
          existingRec.status !== 'completed'
        )
      );

      // Limiter le nombre de recommandations actives
      return newRecommendations.slice(0, 3);

    } catch (error) {
      logger.error('Error generating recommendations:', error);
      throw error;
    }
  }

  /**
   * Génère un parcours personnalisé
   */
  static async generatePathway(userId, goalId) {
    try {
      const goal = await Goal.findById(goalId);
      if (!goal) {
        throw new Error('Objectif non trouvé');
      }

      // Adapter les modules en fonction du profil
      const adaptedModules = goal.modules.map(module => ({
        ...module,
        resources: module.resources.map(resource => ({
          resourceId: resource._id?.toString() || resource.id?.toString() || resource,
          completed: false
        }))
      }));

      // Générer les recommandations initiales
      const recommendations = await this.generateAdaptiveRecommendations(
        goalId,
        adaptedModules.map(module => ({
          resources: module.resources,
          quiz: { completed: false }
        }))
      );

      return {
        userId,
        goalId,
        adaptedModules,
        recommendations
      };

    } catch (error) {
      logger.error('Error generating pathway:', error);
      throw error;
    }
  }
}

export default PathwayGenerationService;