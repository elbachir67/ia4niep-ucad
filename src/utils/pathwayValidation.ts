import { Pathway, ModuleProgress } from '../types';

export function canAccessModule(pathway: Pathway, moduleIndex: number): boolean {
  if (moduleIndex === 0) return true;
  
  // Check if previous module exists
  const previousModule = pathway.moduleProgress[moduleIndex - 1];
  if (!previousModule) return false;

  // Previous module must be completed
  if (!previousModule.completed) return false;

  // Check quiz completion and passing score
  if (!previousModule.quiz.completed || (previousModule.quiz.score || 0) < 70) {
    return false;
  }

  // Check if all resources are completed
  const allResourcesCompleted = previousModule.resources.every(r => r.completed);
  if (!allResourcesCompleted) return false;

  return true;
}

export function calculateModuleCompletion(moduleProgress: ModuleProgress): boolean {
  // All resources must be completed
  const resourcesCompleted = moduleProgress.resources.every(r => r.completed);
  
  // Quiz must be completed with passing score
  const quizPassed = moduleProgress.quiz.completed && (moduleProgress.quiz.score || 0) >= 70;
  
  return resourcesCompleted && quizPassed;
}

export function getNextAvailableModule(pathway: Pathway): number {
  for (let i = 0; i < pathway.moduleProgress.length; i++) {
    if (!pathway.moduleProgress[i].completed) {
      return i;
    }
  }
  return pathway.moduleProgress.length - 1;
}

export function validateModuleAccess(pathway: Pathway, moduleIndex: number): string | null {
  if (!canAccessModule(pathway, moduleIndex)) {
    return 'Vous devez compléter le module précédent avant d\'accéder à celui-ci';
  }
  return null;
}