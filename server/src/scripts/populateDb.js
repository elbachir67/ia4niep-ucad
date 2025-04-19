import mongoose from 'mongoose';
import { Section, Step, Resource, LearnerProfile, User } from '../models/index.js';
import { logger } from '../utils/logger.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ucad_ia';

// Données initiales
const sections = [
  {
    title: "Foundations",
    description: "Bases mathématiques et programmation pour l'IA",
    order: 1,
    icon: "brain"
  },
  {
    title: "Data Science",
    description: "Analyse et traitement des données",
    order: 2,
    icon: "database"
  },
  {
    title: "Machine Learning",
    description: "Algorithmes d'apprentissage automatique",
    order: 3,
    icon: "code"
  },
  {
    title: "Deep Learning",
    description: "Réseaux de neurones et architectures avancées",
    order: 4,
    icon: "bot"
  }
];

const steps = [
  // Foundations steps
  {
    sectionTitle: "Foundations",
    title: "Mathématiques pour l'IA",
    description: "Bases mathématiques essentielles pour l'IA",
    duration: "8 semaines",
    details: "Algèbre linéaire, calcul différentiel, probabilités",
    fullDetails: "Maîtrisez les fondements mathématiques nécessaires pour comprendre et implémenter les algorithmes d'IA.",
    prerequisites: ["Mathématiques niveau terminale"],
    learningObjectives: [
      "Comprendre les opérations matricielles",
      "Maîtriser le calcul différentiel",
      "Appliquer les probabilités"
    ],
    order: 1,
    difficulty: "intermediate"
  },
  {
    sectionTitle: "Foundations",
    title: "Programmation Python",
    description: "Fondamentaux de la programmation Python",
    duration: "6 semaines",
    details: "Python, NumPy, Pandas, visualisation",
    fullDetails: "Développez une expertise en Python et ses bibliothèques essentielles pour la data science.",
    prerequisites: ["Aucun prérequis"],
    learningObjectives: [
      "Maîtriser la syntaxe Python",
      "Utiliser NumPy et Pandas",
      "Créer des visualisations"
    ],
    order: 2,
    difficulty: "beginner"
  },
  // Data Science steps
  {
    sectionTitle: "Data Science",
    title: "Analyse Exploratoire",
    description: "Techniques d'analyse et visualisation de données",
    duration: "6 semaines",
    details: "EDA, feature engineering, visualisation",
    fullDetails: "Maîtrisez l'art de l'analyse exploratoire des données.",
    prerequisites: ["Python", "Statistiques de base"],
    learningObjectives: [
      "Maîtriser les techniques d'EDA",
      "Créer des visualisations pertinentes"
    ],
    order: 1,
    difficulty: "intermediate"
  },
  // Machine Learning steps
  {
    sectionTitle: "Machine Learning",
    title: "Apprentissage Supervisé",
    description: "Algorithmes fondamentaux du ML",
    duration: "8 semaines",
    details: "Régression, classification, validation",
    fullDetails: "Découvrez les algorithmes fondamentaux du machine learning supervisé.",
    prerequisites: ["Mathématiques pour l'IA", "Python"],
    learningObjectives: [
      "Comprendre les algorithmes de ML",
      "Évaluer les modèles"
    ],
    order: 1,
    difficulty: "intermediate"
  },
  // Deep Learning steps
  {
    sectionTitle: "Deep Learning",
    title: "Réseaux de Neurones",
    description: "Fondamentaux du deep learning",
    duration: "8 semaines",
    details: "Architecture, optimisation, régularisation",
    fullDetails: "Maîtrisez les concepts fondamentaux des réseaux de neurones.",
    prerequisites: ["Apprentissage Supervisé"],
    learningObjectives: [
      "Comprendre l'architecture des réseaux",
      "Implémenter des modèles DL"
    ],
    order: 1,
    difficulty: "advanced"
  }
];

const resources = [
  // Math resources
  {
    stepTitle: "Mathématiques pour l'IA",
    title: "Khan Academy - Algèbre Linéaire",
    description: "Cours complet d'algèbre linéaire avec exercices interactifs",
    url: "https://fr.khanacademy.org/math/linear-algebra",
    type: "course",
    level: "basic",
    duration: "20 heures",
    language: "fr",
    isPremium: false
  },
  {
    stepTitle: "Mathématiques pour l'IA",
    title: "Mathematics for Machine Learning",