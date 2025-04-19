import { Pathway, LearningStats } from '../types';

export function calculateLearningStats(pathways: Pathway[]): LearningStats {
  const stats: LearningStats = {
    totalHoursSpent: 0,
    completedResources: 0,
    averageQuizScore: 0,
    streakDays: 0
  };

  let totalQuizzes = 0;
  let quizScoreSum = 0;

  pathways.forEach(pathway => {
    // Calculate total time spent
    const startDate = new Date(pathway.startedAt);
    const lastDate = new Date(pathway.lastAccessedAt);
    const hoursSpent = Math.round((lastDate.getTime() - startDate.getTime()) / (1000 * 60 * 60));
    stats.totalHoursSpent += hoursSpent;

    // Count completed resources
    pathway.moduleProgress.forEach(module => {
      stats.completedResources += module.resources.filter(r => r.completed).length;

      // Calculate average quiz score
      if (module.quiz.completed && module.quiz.score) {
        quizScoreSum += module.quiz.score;
        totalQuizzes++;
      }
    });
  });

  // Calculate average quiz score
  stats.averageQuizScore = totalQuizzes > 0 ? Math.round(quizScoreSum / totalQuizzes) : 0;

  // Calculate learning streak
  stats.streakDays = calculateLearningStreak(pathways);

  return stats;
}

function calculateLearningStreak(pathways: Pathway[]): number {
  // Implementation of streak calculation
  let streak = 0;
  const today = new Date();
  const activityDates = new Set<string>();

  // Collect all activity dates
  pathways.forEach(pathway => {
    pathway.moduleProgress.forEach(module => {
      module.resources.forEach(resource => {
        if (resource.completedAt) {
          activityDates.add(resource.completedAt.toISOString().split('T')[0]);
        }
      });
      if (module.quiz.completedAt) {
        activityDates.add(module.quiz.completedAt.toISOString().split('T')[0]);
      }
    });
  });

  // Calculate current streak
  let currentDate = new Date(today);
  while (activityDates.has(currentDate.toISOString().split('T')[0])) {
    streak++;
    currentDate.setDate(currentDate.getDate() - 1);
  }

  return streak;
}

export function generateProgressData(pathway: Pathway) {
  const progressData = [];
  let currentProgress = 0;

  pathway.moduleProgress.forEach((module, index) => {
    if (module.completed) {
      currentProgress += (1 / pathway.moduleProgress.length) * 100;
      
      progressData.push({
        date: module.quiz.completedAt,
        progress: Math.round(currentProgress),
        quizScore: module.quiz.score,
        timeSpent: calculateModuleTimeSpent(module)
      });
    }
  });

  return progressData;
}

function calculateModuleTimeSpent(module: ModuleProgress): number {
  let timeSpent = 0;
  
  // Sum up time spent on resources
  module.resources.forEach(resource => {
    if (resource.completed && resource.completedAt) {
      const startDate = new Date(resource.completedAt);
      const endDate = new Date();
      timeSpent += (endDate.getTime() - startDate.getTime()) / (1000 * 60); // Convert to minutes
    }
  });

  return Math.round(timeSpent);
}