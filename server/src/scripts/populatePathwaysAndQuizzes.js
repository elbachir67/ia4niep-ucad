import mongoose from 'mongoose';
import { Goal } from '../models/Goal.js';
import { User } from '../models/User.js';
import { Quiz } from '../models/Quiz.js';
import { Pathway } from '../models/Pathway.js';
import { logger } from '../utils/logger.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ucad_ia';

// Données de test pour les quiz
const quizData = [
  {
    title: "Introduction au Machine Learning",
    description: "Testez vos connaissances sur les concepts fondamentaux du ML",
    timeLimit: 1800, // 30 minutes
    passingScore: 70,
    questions: [
      {
        text: "Quelle est la différence principale entre l'apprentissage supervisé et non supervisé ?",
        options: [
          {
            text: "L'apprentissage supervisé utilise des données étiquetées, l'apprentissage non supervisé non",
            isCorrect: true
          },
          {
            text: "L'apprentissage supervisé est plus rapide",
            isCorrect: false
          },
          {
            text: "L'apprentissage non supervisé nécessite plus de données",
            isCorrect: false
          }
        ],
        explanation: "L'apprentissage supervisé utilise des données étiquetées pour entraîner le modèle, tandis que l'apprentissage non supervisé trouve des patterns dans des données non étiquetées."
      },
      {
        text: "Qu'est-ce que la validation croisée ?",
        options: [
          {
            text: "Une technique pour évaluer la performance d'un modèle sur différents sous-ensembles de données",
            isCorrect: true
          },
          {
            text: "Une méthode pour nettoyer les données",
            isCorrect: false
          },
          {
            text: "Un algorithme d'optimisation",
            isCorrect: false
          }
        ],
        explanation: "La validation croisée divise les données en plusieurs sous-ensembles pour évaluer la performance du modèle de manière plus robuste."
      }
    ]
  },
  {
    title: "Deep Learning Fondamental",
    description: "Évaluez votre compréhension des concepts de base du deep learning",
    timeLimit: 2400, // 40 minutes
    passingScore: 75,
    questions: [
      {
        text: "Qu'est-ce qu'une fonction d'activation dans un réseau de neurones ?",
        options: [
          {
            text: "Une fonction qui introduit de la non-linéarité dans le réseau",
            isCorrect: true
          },
          {
            text: "Une fonction qui initialise les poids",
            isCorrect: false
          },
          {
            text: "Une fonction qui détermine la taille du réseau",
            isCorrect: false
          }
        ],
        explanation: "La fonction d'activation introduit de la non-linéarité dans le réseau, permettant d'apprendre des patterns complexes."
      },
      {
        text: "Quel est le rôle du dropout dans un réseau de neurones ?",
        options: [
          {
            text: "Prévenir le surapprentissage en désactivant aléatoirement des neurones",
            isCorrect: true
          },
          {
            text: "Accélérer l'apprentissage",
            isCorrect: false
          },
          {
            text: "Réduire la taille du modèle",
            isCorrect: false
          }
        ],
        explanation: "Le dropout est une technique de régularisation qui prévient le surapprentissage en désactivant aléatoirement des neurones pendant l'entraînement."
      }
    ]
  },
  {
    title: "Computer Vision Basics",
    description: "Testez vos connaissances en vision par ordinateur",
    timeLimit: 1800,
    passingScore: 70,
    questions: [
      {
        text: "Quel est le rôle principal d'une couche de convolution dans un CNN ?",
        options: [
          {
            text: "Extraire des caractéristiques locales de l'image",
            isCorrect: true
          },
          {
            text: "Réduire la taille de l'image",
            isCorrect: false
          },
          {
            text: "Classifier l'image",
            isCorrect: false
          }
        ],
        explanation: "Les couches de convolution permettent d'extraire des caractéristiques locales comme les bords, les textures et les formes dans l'image."
      }
    ]
  },
  {
    title: "NLP Fundamentals",
    description: "Évaluez vos connaissances en traitement du langage naturel",
    timeLimit: 1800,
    passingScore: 70,
    questions: [
      {
        text: "Qu'est-ce que le word embedding ?",
        options: [
          {
            text: "Une représentation vectorielle des mots",
            isCorrect: true
          },
          {
            text: "Une méthode de traduction automatique",
            isCorrect: false
          },
          {
            text: "Un algorithme de correction orthographique",
            isCorrect: false
          }
        ],
        explanation: "Le word embedding est une technique qui convertit les mots en vecteurs denses, capturant leurs relations sémantiques."
      }
    ]
  }
];

async function populatePathwaysAndQuizzes() {
  try {
    await mongoose.connect(MONGODB_URI);
    logger.info('Connected to MongoDB');

    // Nettoyer les collections existantes
    await Promise.all([
      Quiz.deleteMany({}),
      Pathway.deleteMany({})
    ]);
    logger.info('Cleaned existing quiz and pathway data');

    // Récupérer les utilisateurs et les objectifs
    const users = await User.find({ role: 'user' });
    const goals = await Goal.find();

    if (users.length === 0 || goals.length === 0) {
      throw new Error('No users or goals found. Please run populateDB.js first.');
    }

    // Créer les quiz
    const createdQuizzes = await Quiz.insertMany(quizData);
    logger.info(`Created ${createdQuizzes.length} quizzes`);

    // Créer des parcours pour chaque utilisateur
    for (const user of users) {
      // Sélectionner un objectif aléatoire pour chaque utilisateur
      const randomGoal = goals[Math.floor(Math.random() * goals.length)];
      
      // Créer un parcours avec progression aléatoire
      const pathway = new Pathway({
        userId: user._id,
        goalId: randomGoal._id,
        status: 'active',
        progress: Math.floor(Math.random() * 100),
        currentModule: 0,
        moduleProgress: randomGoal.modules.map((module, index) => ({
          moduleIndex: index,
          completed: Math.random() > 0.5,
          resources: module.resources.map(resource => ({
            resourceId: resource._id || `resource-${Math.random()}`,
            completed: Math.random() > 0.5,
            completedAt: new Date(Date.now() - Math.random() * 1000000000)
          })),
          quiz: {
            completed: Math.random() > 0.5,
            score: Math.floor(Math.random() * 40) + 60, // Score entre 60 et 100
            completedAt: new Date(Date.now() - Math.random() * 1000000000)
          }
        })),
        startedAt: new Date(Date.now() - Math.random() * 2592000000), // Dans les 30 derniers jours
        lastAccessedAt: new Date(),
        estimatedCompletionDate: new Date(Date.now() + Math.random() * 7776000000), // Dans les 90 prochains jours
        adaptiveRecommendations: [
          {
            type: 'resource',
            description: 'Ressource recommandée basée sur vos progrès',
            priority: 'high',
            status: 'pending'
          },
          {
            type: 'practice',
            description: 'Exercice pratique recommandé',
            priority: 'medium',
            status: 'pending'
          }
        ]
      });

      await pathway.save();
      logger.info(`Created pathway for user: ${user.email}`);

      // Créer un parcours complété pour certains utilisateurs
      if (Math.random() > 0.5) {
        const completedGoal = goals.find(g => g._id !== randomGoal._id);
        if (completedGoal) {
          const completedPathway = new Pathway({
            userId: user._id,
            goalId: completedGoal._id,
            status: 'completed',
            progress: 100,
            currentModule: completedGoal.modules.length - 1,
            moduleProgress: completedGoal.modules.map((module, index) => ({
              moduleIndex: index,
              completed: true,
              resources: module.resources.map(resource => ({
                resourceId: resource._id || `resource-${Math.random()}`,
                completed: true,
                completedAt: new Date(Date.now() - Math.random() * 2592000000)
              })),
              quiz: {
                completed: true,
                score: Math.floor(Math.random() * 20) + 80, // Score entre 80 et 100
                completedAt: new Date(Date.now() - Math.random() * 2592000000)
              }
            })),
            startedAt: new Date(Date.now() - 5184000000), // Il y a 60 jours
            lastAccessedAt: new Date(Date.now() - Math.random() * 604800000), // Dans les 7 derniers jours
            estimatedCompletionDate: new Date(Date.now() - 2592000000), // Il y a 30 jours
            adaptiveRecommendations: []
          });

          await completedPathway.save();
          logger.info(`Created completed pathway for user: ${user.email}`);
        }
      }
    }

    logger.info('Successfully populated pathways and quizzes');
  } catch (error) {
    logger.error('Error populating pathways and quizzes:', error);
    throw error;
  } finally {
    await mongoose.disconnect();
    logger.info('Disconnected from MongoDB');
  }
}

// Exécuter le script
populatePathwaysAndQuizzes().catch(error => {
  logger.error('Fatal error during data population:', error);
  process.exit(1);
});