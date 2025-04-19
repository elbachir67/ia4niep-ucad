import mongoose from 'mongoose';
import { Question } from '../models/Question.js';
import { logger } from '../utils/logger.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ucad_ia';

const questions = [
  // Questions de mathématiques
  {
    text: "Quelle est la différence entre une matrice et un vecteur ?",
    category: "math",
    difficulty: "basic",
    options: [
      {
        text: "Un vecteur est unidimensionnel, une matrice est bidimensionnelle",
        isCorrect: true
      },
      {
        text: "Il n'y a aucune différence",
        isCorrect: false
      },
      {
        text: "Une matrice ne peut contenir que des nombres",
        isCorrect: false
      }
    ],
    explanation: "Un vecteur est une structure unidimensionnelle (1D) tandis qu'une matrice est bidimensionnelle (2D), organisée en lignes et colonnes."
  },
  // Questions Machine Learning
  {
    text: "Quelle est la différence entre l'apprentissage supervisé et non supervisé ?",
    category: "ml",
    difficulty: "basic",
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
  // Questions Deep Learning
  {
    text: "Qu'est-ce qu'une fonction d'activation dans un réseau de neurones ?",
    category: "dl",
    difficulty: "basic",
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
  }
];

async function populateQuestions() {
  try {
    await mongoose.connect(MONGODB_URI);
    logger.info('Connected to MongoDB');

    // Clear existing questions
    await Question.deleteMany({});
    logger.info('Cleared existing questions');

    // Insert new questions
    await Question.insertMany(questions);
    logger.info('Inserted new questions');

    logger.info('Database population completed successfully');
  } catch (error) {
    logger.error('Error populating database:', error);
    throw error;
  } finally {
    await mongoose.disconnect();
    logger.info('Disconnected from MongoDB');
  }
}

populateQuestions().catch(error => {
  logger.error('Fatal error during database population:', error);
  process.exit(1);
});