import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { Goal } from '../models/Goal.js';
import { Concept } from '../models/Concept.js';
import { ConceptAssessment } from '../models/ConceptAssessment.js';
import { LearnerProfile } from '../models/LearnerProfile.js';
import { Pathway } from '../models/Pathway.js';
import { LearningData } from '../models/LearningData.js';
import { Quiz } from '../models/Quiz.js';
import { QuizAttempt } from '../models/QuizAttempt.js';
import { Assessment } from '../models/Assessment.js';
import { Section } from '../models/Section.js';
import { Step } from '../models/Step.js';
import { Resource } from '../models/Resource.js';
import { logger } from '../utils/logger.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ucad_ia';

// Données de test pour les utilisateurs
const users = [
  {
    email: 'student1@ucad.edu.sn',
    password: 'Student123!',
    role: 'user',
    isActive: true
  },
  {
    email: 'student2@ucad.edu.sn',
    password: 'Student123!',
    role: 'user',
    isActive: true
  },
  {
    email: 'advanced@ucad.edu.sn',
    password: 'Student123!',
    role: 'user',
    isActive: true
  },
  {
    email: 'admin@ucad.edu.sn',
    password: 'Admin123!',
    role: 'admin',
    isActive: true
  }
];

// Données de test pour les sections
const sections = [
  {
    title: 'Foundations',
    description: 'Bases mathématiques et programmation pour l\'IA',
    order: 1,
    icon: 'brain'
  },
  {
    title: 'Data Science',
    description: 'Analyse et traitement des données',
    order: 2,
    icon: 'database'
  },
  {
    title: 'Machine Learning',
    description: 'Algorithmes d\'apprentissage automatique',
    order: 3,
    icon: 'code'
  },
  {
    title: 'Deep Learning',
    description: 'Réseaux de neurones et architectures avancées',
    order: 4,
    icon: 'bot'
  }
];

// Données de test pour les concepts
const concepts = [
  {
    name: 'Algèbre Linéaire',
    description: 'Fondements de l\'algèbre linéaire pour l\'IA',
    category: 'mathematics',
    level: 'basic',
    prerequisites: []
  },
  {
    name: 'Calcul Différentiel',
    description: 'Bases du calcul différentiel et optimisation',
    category: 'mathematics',
    level: 'intermediate',
    prerequisites: ['Algèbre Linéaire']
  },
  {
    name: 'Probabilités',
    description: 'Concepts fondamentaux des probabilités',
    category: 'mathematics',
    level: 'intermediate',
    prerequisites: ['Algèbre Linéaire']
  },
  {
    name: 'Python Programming',
    description: 'Programmation Python pour le ML',
    category: 'programming',
    level: 'basic',
    prerequisites: []
  },
  {
    name: 'ML Fundamentals',
    description: 'Concepts fondamentaux du Machine Learning',
    category: 'ml',
    level: 'basic',
    prerequisites: ['Mathématiques pour l\'IA', 'Python Programming']
  },
  {
    name: 'Deep Learning Basics',
    description: 'Introduction aux réseaux de neurones',
    category: 'dl',
    level: 'intermediate',
    prerequisites: ['ML Fundamentals', 'Algèbre Linéaire Avancée']
  },
  {
    name: 'NLP Fundamentals',
    description: 'Bases du traitement du langage naturel',
    category: 'nlp',
    level: 'intermediate',
    prerequisites: ['ML Fundamentals']
  },
  {
    name: 'Computer Vision Basics',
    description: 'Fondamentaux de la vision par ordinateur',
    category: 'computer_vision',
    level: 'basic',
    prerequisites: []
  }
];

// Données de test pour les objectifs d'apprentissage
const goals = [
  {
    title: 'Machine Learning Engineer',
    description: 'Maîtrisez les fondamentaux du ML et développez des compétences pratiques pour concevoir et déployer des modèles en production.',
    category: 'ml',
    level: 'intermediate',
    estimatedDuration: 12,
    prerequisites: [
      {
        category: 'math',
        skills: [
          { name: 'Algèbre linéaire', level: 'intermediate' },
          { name: 'Calcul différentiel', level: 'basic' }
        ]
      },
      {
        category: 'programming',
        skills: [
          { name: 'Python', level: 'intermediate' },
          { name: 'SQL', level: 'basic' }
        ]
      }
    ],
    modules: [
      {
        title: 'Introduction au ML',
        description: 'Fondamentaux du machine learning',
        duration: 20,
        skills: [
          { name: 'Python', level: 'basic' },
          { name: 'Scikit-learn', level: 'basic' }
        ],
        resources: [
          {
            title: 'Cours ML Stanford',
            type: 'video',
            url: 'https://www.coursera.org/learn/machine-learning',
            duration: 120
          },
          {
            title: 'Hands-On Machine Learning',
            type: 'book',
            url: 'https://www.oreilly.com/library/view/hands-on-machine-learning/9781492032632/',
            duration: 180
          }
        ],
        validationCriteria: [
          'Comprendre les types d\'apprentissage',
          'Implémenter un modèle simple'
        ]
      },
      {
        title: 'Feature Engineering',
        description: 'Techniques de préparation des données',
        duration: 15,
        skills: [
          { name: 'Pandas', level: 'intermediate' },
          { name: 'NumPy', level: 'intermediate' }
        ],
        resources: [
          {
            title: 'Feature Engineering for ML',
            type: 'course',
            url: 'https://www.coursera.org/learn/feature-engineering',
            duration: 90
          }
        ],
        validationCriteria: [
          'Maîtriser les techniques de prétraitement',
          'Créer des features pertinentes'
        ]
      }
    ],
    careerOpportunities: [
      {
        title: 'ML Engineer',
        description: 'Développement de modèles ML',
        averageSalary: '45-75k€/an',
        companies: ['Google', 'Amazon', 'Meta']
      },
      {
        title: 'Data Scientist',
        description: 'Analyse de données et modélisation',
        averageSalary: '40-70k€/an',
        companies: ['IBM', 'Microsoft', 'Orange']
      }
    ],
    certification: {
      available: true,
      name: 'ML Professional Certificate',
      provider: 'UCAD AI Center',
      url: 'https://ucad.sn/certifications/ml-pro'
    }
  },
  {
    title: 'Deep Learning Specialist',
    description: 'Spécialisez-vous en deep learning et maîtrisez les architectures de réseaux de neurones avancées.',
    category: 'dl',
    level: 'advanced',
    estimatedDuration: 16,
    prerequisites: [
      {
        category: 'math',
        skills: [
          { name: 'Algèbre linéaire', level: 'advanced' },
          { name: 'Calcul différentiel', level: 'intermediate' },
          { name: 'Probabilités', level: 'intermediate' }
        ]
      },
      {
        category: 'programming',
        skills: [
          { name: 'Python', level: 'advanced' },
          { name: 'PyTorch/TensorFlow', level: 'intermediate' }
        ]
      }
    ],
    modules: [
      {
        title: 'Réseaux de Neurones',
        description: 'Fondamentaux des réseaux de neurones',
        duration: 25,
        skills: [
          { name: 'PyTorch', level: 'intermediate' },
          { name: 'Backpropagation', level: 'intermediate' }
        ],
        resources: [
          {
            title: 'Deep Learning Book',
            type: 'book',
            url: 'https://www.deeplearningbook.org/',
            duration: 180
          },
          {
            title: 'Neural Networks and Deep Learning',
            type: 'course',
            url: 'https://www.coursera.org/learn/neural-networks-deep-learning',
            duration: 120
          }
        ],
        validationCriteria: [
          'Comprendre l\'architecture des réseaux',
          'Implémenter un réseau simple'
        ]
      },
      {
        title: 'CNN et Vision par Ordinateur',
        description: 'Réseaux de neurones convolutifs',
        duration: 30,
        skills: [
          { name: 'CNN', level: 'advanced' },
          { name: 'Computer Vision', level: 'intermediate' }
        ],
        resources: [
          {
            title: 'Convolutional Neural Networks',
            type: 'course',
            url: 'https://www.coursera.org/learn/convolutional-neural-networks',
            duration: 150
          }
        ],
        validationCriteria: [
          'Comprendre l\'architecture des CNN',
          'Implémenter un modèle de classification d\'images'
        ]
      }
    ],
    careerOpportunities: [
      {
        title: 'Deep Learning Engineer',
        description: 'Conception et optimisation de réseaux de neurones',
        averageSalary: '60-90k€/an',
        companies: ['OpenAI', 'DeepMind', 'Google Brain']
      },
      {
        title: 'AI Research Scientist',
        description: 'Recherche en intelligence artificielle',
        averageSalary: '70-100k€/an',
        companies: ['FAIR', 'MILA', 'INRIA']
      }
    ],
    certification: {
      available: true,
      name: 'Deep Learning Specialization',
      provider: 'UCAD AI Center',
      url: 'https://ucad.sn/certifications/dl-specialist'
    }
  },
  {
    title: 'Computer Vision Expert',
    description: 'Maîtrisez la vision par ordinateur et le traitement d\'images',
    category: 'computer_vision',
    level: 'advanced',
    estimatedDuration: 16,
    prerequisites: [
      {
        category: 'math',
        skills: [
          { name: 'Algèbre linéaire', level: 'advanced' },
          { name: 'Calcul différentiel', level: 'intermediate' }
        ]
      },
      {
        category: 'programming',
        skills: [
          { name: 'Python', level: 'advanced' },
          { name: 'PyTorch', level: 'intermediate' }
        ]
      }
    ],
    modules: [
      {
        title: 'Traitement d\'Images Avancé',
        description: 'Techniques avancées de traitement d\'images',
        duration: 30,
        skills: [
          { name: 'OpenCV', level: 'advanced' },
          { name: 'PyTorch', level: 'intermediate' }
        ],
        resources: [
          {
            title: 'Advanced Computer Vision with Python',
            type: 'tutorial',
            url: 'https://www.coursera.org/learn/advanced-computer-vision-with-python',
            duration: 120
          }
        ],
        validationCriteria: [
          'Implémenter des algorithmes de traitement d\'images avancés',
          'Créer des pipelines de traitement d\'images complexes'
        ]
      }
    ],
    careerOpportunities: [
      {
        title: 'Computer Vision Engineer',
        description: 'Développement de solutions de vision par ordinateur',
        averageSalary: '50-80k€/an',
        companies: ['Tesla', 'NVIDIA', 'Intel', 'Valeo']
      },
      {
        title: 'AI Research Scientist',
        description: 'R&D en vision par ordinateur',
        averageSalary: '60-90k€/an',
        companies: ['DeepMind', 'OpenAI', 'Meta AI']
      }
    ],
    certification: {
      available: true,
      name: 'Computer Vision Expert Certification',
      provider: 'UCAD AI Center',
      url: 'https://ucad.sn/certifications/cv-expert'
    }
  }
];

// Données de test pour les quiz
const quizzes = [
  {
    moduleId: '0',
    title: 'Introduction au Machine Learning',
    description: 'Testez vos connaissances sur les concepts fondamentaux du ML',
    timeLimit: 1800,
    passingScore: 70,
    questions: [
      {
        text: 'Quelle est la différence principale entre l\'apprentissage supervisé et non supervisé ?',
        options: [
          {
            text: 'L\'apprentissage supervisé utilise des données étiquetées, l\'apprentissage non supervisé non',
            isCorrect: true
          },
          {
            text: 'L\'apprentissage supervisé est plus rapide',
            isCorrect: false
          },
          {
            text: 'L\'apprentissage non supervisé nécessite plus de données',
            isCorrect: false
          }
        ],
        explanation: 'L\'apprentissage supervisé utilise des données étiquetées pour entraîner le modèle, tandis que l\'apprentissage non supervisé trouve des patterns dans des données non étiquetées.'
      },
      {
        text: 'Qu\'est-ce que la validation croisée ?',
        options: [
          {
            text: 'Une technique pour évaluer la performance d\'un modèle sur différents sous-ensembles de données',
            isCorrect: true
          },
          {
            text: 'Une méthode pour nettoyer les données',
            isCorrect: false
          },
          {
            text: 'Un algorithme d\'optimisation',
            isCorrect: false
          }
        ],
        explanation: 'La validation croisée divise les données en plusieurs sous-ensembles pour évaluer la performance du modèle de manière plus robuste.'
      },
      {
        text: 'Quel algorithme est couramment utilisé pour la classification binaire ?',
        options: [
          {
            text: 'Régression logistique',
            isCorrect: true
          },
          {
            text: 'K-means',
            isCorrect: false
          },
          {
            text: 'PCA',
            isCorrect: false
          }
        ],
        explanation: 'La régression logistique est un algorithme couramment utilisé pour la classification binaire.'
      }
    ]
  },
  {
    moduleId: '1',
    title: 'Deep Learning Fondamental',
    description: 'Évaluez votre compréhension des concepts de base du deep learning',
    timeLimit: 2400,
    passingScore: 75,
    questions: [
      {
        text: 'Qu\'est-ce qu\'une fonction d\'activation dans un réseau de neurones ?',
        options: [
          {
            text: 'Une fonction qui introduit de la non-linéarité dans le réseau',
            isCorrect: true
          },
          {
            text: 'Une fonction qui initialise les poids',
            isCorrect: false
          },
          {
            text: 'Une fonction qui détermine la taille du réseau',
            isCorrect: false
          }
        ],
        explanation: 'La fonction d\'activation introduit de la non-linéarité dans le réseau, permettant d\'apprendre des patterns complexes.'
      },
      {
        text: 'Quel est le rôle du dropout dans un réseau de neurones ?',
        options: [
          {
            text: 'Prévenir le surapprentissage en désactivant aléatoirement des neurones',
            isCorrect: true
          },
          {
            text: 'Accélérer l\'apprentissage',
            isCorrect: false
          },
          {
            text: 'Réduire la taille du modèle',
            isCorrect: false
          }
        ],
        explanation: 'Le dropout est une technique de régularisation qui prévient le surapprentissage en désactivant aléatoirement des neurones pendant l\'entraînement.'
      }
    ]
  },
  {
    moduleId: '2',
    title: 'Computer Vision Basics',
    description: 'Testez vos connaissances en vision par ordinateur',
    timeLimit: 1800,
    passingScore: 70,
    questions: [
      {
        text: 'Quel est le rôle principal d\'une couche de convolution dans un CNN ?',
        options: [
          {
            text: 'Extraire des caractéristiques locales de l\'image',
            isCorrect: true
          },
          {
            text: 'Réduire la taille de l\'image',
            isCorrect: false
          },
          {
            text: 'Classifier l\'image',
            isCorrect: false
          }
        ],
        explanation: 'Les couches de convolution permettent d\'extraire des caractéristiques locales comme les bords, les textures et les formes dans l\'image.'
      }
    ]
  }
];

// Données de test pour les évaluations
const assessments = [
  {
    title: 'Évaluation Mathématiques Fondamentales',
    category: 'math',
    difficulty: 'basic',
    questions: [
      {
        text: 'Quelle est la différence entre une matrice et un vecteur ?',
        options: [
          {
            text: 'Un vecteur est unidimensionnel, une matrice est bidimensionnelle',
            isCorrect: true
          },
          {
            text: 'Il n\'y a aucune différence',
            isCorrect: false
          },
          {
            text: 'Une matrice ne peut contenir que des nombres',
            isCorrect: false
          }
        ],
        explanation: 'Un vecteur est une structure unidimensionnelle (1D) tandis qu\'une matrice est bidimensionnelle (2D), organisée en lignes et colonnes.'
      }
    ]
  },
  {
    title: 'Évaluation Machine Learning Fondamental',
    category: 'ml',
    difficulty: 'basic',
    questions: [
      {
        text: 'Quelle est la différence entre l\'apprentissage supervisé et non supervisé ?',
        options: [
          {
            text: 'L\'apprentissage supervisé utilise des données étiquetées, l\'apprentissage non supervisé non',
            isCorrect: true
          },
          {
            text: 'L\'apprentissage supervisé est plus rapide',
            isCorrect: false
          },
          {
            text: 'L\'apprentissage non supervisé nécessite plus de données',
            isCorrect: false
          }
        ],
        explanation: 'L\'apprentissage supervisé utilise des données étiquetées pour entraîner le modèle, tandis que l\'apprentissage non supervisé trouve des patterns dans des données non étiquetées.'
      }
    ]
  },
  {
    title: 'Évaluation Deep Learning Fondamental',
    category: 'dl',
    difficulty: 'basic',
    questions: [
      {
        text: 'Qu\'est-ce qu\'une fonction d\'activation dans un réseau de neurones ?',
        options: [
          {
            text: 'Une fonction qui introduit de la non-linéarité dans le réseau',
            isCorrect: true
          },
          {
            text: 'Une fonction qui initialise les poids',
            isCorrect: false
          },
          {
            text: 'Une fonction qui détermine la taille du réseau',
            isCorrect: false
          }
        ],
        explanation: 'La fonction d\'activation introduit de la non-linéarité dans le réseau, permettant d\'apprendre des patterns complexes.'
      }
    ]
  },
  {
    title: 'Évaluation Computer Vision',
    category: 'computer_vision',
    difficulty: 'basic',
    questions: [
      {
        text: 'Quel est le rôle principal d\'une couche de convolution dans un CNN ?',
        options: [
          {
            text: 'Extraire des caractéristiques locales de l\'image',
            isCorrect: true
          },
          {
            text: 'Réduire la taille de l\'image',
            isCorrect: false
          },
          {
            text: 'Classifier l\'image',
            isCorrect: false
          }
        ],
        explanation: 'Les couches de convolution permettent d\'extraire des caractéristiques locales comme les bords, les textures et les formes dans l\'image.'
      }
    ]
  }
];

// Fonction pour créer les étapes et ressources
async function createStepsAndResources(sectionsMap) {
  const steps = [
    // Foundations steps
    {
      section: sectionsMap.get('Foundations'),
      title: 'Mathématiques pour l\'IA',
      description: 'Bases mathématiques essentielles pour l\'IA',
      duration: '8 semaines',
      details: 'Algèbre linéaire, calcul différentiel, probabilités',
      fullDetails: 'Maîtrisez les fondements mathématiques nécessaires pour comprendre et implémenter les algorithmes d\'IA.',
      prerequisites: ['Mathématiques niveau terminale'],
      learningObjectives: ['Comprendre les opérations matricielles', 'Maîtriser le calcul différentiel', 'Appliquer les probabilités'],
      order: 1,
      difficulty: 'intermediate'
    },
    {
      section: sectionsMap.get('Data Science'),
      title: 'Analyse Exploratoire',
      description: 'Techniques d\'analyse et visualisation de données',
      duration: '6 semaines',
      details: 'EDA, feature engineering, visualisation',
      fullDetails: 'Maîtrisez l\'art de l\'analyse exploratoire des données.',
      prerequisites: ['Python', 'Statistiques de base'],
      learningObjectives: ['Maîtriser les techniques d\'EDA', 'Créer des visualisations pertinentes'],
      order: 1,
      difficulty: 'intermediate'
    },
    {
      section: sectionsMap.get('Machine Learning'),
      title: 'Apprentissage Supervisé',
      description: 'Algorithmes fondamentaux du ML',
      duration: '8 semaines',
      details: 'Régression, classification, validation',
      fullDetails: 'Découvrez les algorithmes fondamentaux du machine learning supervisé.',
      prerequisites: ['Mathématiques pour l\'IA', 'Python'],
      learningObjectives: ['Comprendre les algorithmes de ML', 'Évaluer les modèles'],
      order: 1,
      difficulty: 'intermediate'
    },
    {
      section: sectionsMap.get('Deep Learning'),
      title: 'Réseaux de Neurones',
      description: 'Fondamentaux du deep learning',
      duration: '8 semaines',
      details: 'Architecture, optimisation, régularisation',
      fullDetails: 'Maîtrisez les concepts fondamentaux des réseaux de neurones.',
      prerequisites: ['Apprentissage Supervisé'],
      learningObjectives: ['Comprendre l\'architecture des réseaux', 'Implémenter des modèles DL'],
      order: 1,
      difficulty: 'advanced'
    }
  ];

  const createdSteps = [];
  for (const stepData of steps) {
    const step = new Step(stepData);
    await step.save();
    createdSteps.push(step);
  }

  // Créer les ressources pour chaque étape
  const resources = [
    {
      step: createdSteps[0]._id, // Mathématiques pour l'IA
      title: 'Khan Academy - Algèbre Linéaire',
      description: 'Cours complet d\'algèbre linéaire avec exercices interactifs',
      url: 'https://fr.khanacademy.org/math/linear-algebra',
      type: 'course',
      level: 'basic',
      duration: '20 heures',
      language: 'fr',
      isPremium: false
    },
    {
      step: createdSteps[1]._id, // Analyse Exploratoire
      title: 'Python Data Science Handbook',
      description: 'Guide complet sur l\'analyse de données avec Python',
      url: 'https://jakevdp.github.io/PythonDataScienceHandbook/',
      type: 'book',
      level: 'intermediate',
      duration: '25 heures',
      language: 'en',
      isPremium: false
    },
    {
      step: createdSteps[2]._id, // Apprentissage Supervisé
      title: 'Scikit-learn Tutorials',
      description: 'Tutoriels officiels de scikit-learn',
      url: 'https://scikit-learn.org/stable/tutorial/',
      type: 'course',
      level: 'intermediate',
      duration: '15 heures',
      language: 'en',
      isPremium: false
    },
    {
      step: createdSteps[3]._id, // Réseaux de Neurones
      title: 'Deep Learning Book',
      description: 'Le livre de référence sur le deep learning',
      url: 'https://www.deeplearningbook.org/',
      type: 'book',
      level: 'advanced',
      duration: '40 heures',
      language: 'en',
      isPremium: false
    }
  ];

  for (const resourceData of resources) {
    const resource = new Resource(resourceData);
    await resource.save();
  }

  return createdSteps;
}

// Fonction pour créer les parcours d'apprentissage
async function createPathways(users, goals) {
  const pathways = [];
  
  // Créer un parcours actif pour le premier utilisateur
  const activePathway = new Pathway({
    userId: users[0]._id,
    goalId: goals[0]._id,
    status: 'active',
    progress: 35,
    currentModule: 0,
    moduleProgress: goals[0].modules.map((module, index) => ({
      moduleIndex: index,
      completed: index === 0,
      resources: module.resources.map((resource, resIndex) => ({
        resourceId: `resource-${index}-${resIndex}`,
        completed: index === 0 || (index === 1 && resIndex === 0),
        completedAt: index === 0 ? new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) : null,
        type: resource.type
      })),
      quiz: {
        completed: index === 0,
        score: index === 0 ? 85 : null,
        completedAt: index === 0 ? new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) : null
      }
    })),
    startedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    lastAccessedAt: new Date(),
    estimatedCompletionDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    adaptiveRecommendations: [
      {
        type: 'resource',
        description: 'Ressource recommandée sur les techniques de validation croisée',
        priority: 'high',
        status: 'pending'
      },
      {
        type: 'practice',
        description: 'Exercice pratique sur la régression linéaire',
        priority: 'medium',
        status: 'pending'
      }
    ]
  });
  
  await activePathway.save();
  pathways.push(activePathway);
  
  // Créer un parcours complété pour le deuxième utilisateur
  const completedPathway = new Pathway({
    userId: users[1]._id,
    goalId: goals[1]._id,
    status: 'completed',
    progress: 100,
    currentModule: goals[1].modules.length - 1,
    moduleProgress: goals[1].modules.map((module, index) => ({
      moduleIndex: index,
      completed: true,
      resources: module.resources.map((resource, resIndex) => ({
        resourceId: `resource-${index}-${resIndex}`,
        completed: true,
        completedAt: new Date(Date.now() - (30 - index * 7) * 24 * 60 * 60 * 1000),
        type: resource.type
      })),
      quiz: {
        completed: true,
        score: 90 - index * 5,
        completedAt: new Date(Date.now() - (25 - index * 7) * 24 * 60 * 60 * 1000)
      }
    })),
    startedAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
    lastAccessedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    estimatedCompletionDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    adaptiveRecommendations: []
  });
  
  await completedPathway.save();
  pathways.push(completedPathway);
  
  // Créer un parcours en pause pour le troisième utilisateur
  const pausedPathway = new Pathway({
    userId: users[2]._id,
    goalId: goals[2]._id,
    status: 'paused',
    progress: 65,
    currentModule: 0,
    moduleProgress: goals[2].modules.map((module, index) => ({
      moduleIndex: index,
      completed: index === 0,
      resources: module.resources.map((resource, resIndex) => ({
        resourceId: `resource-${index}-${resIndex}`,
        completed: index === 0,
        completedAt: index === 0 ? new Date(Date.now() - 15 * 24 * 60 * 60 * 1000) : null,
        type: resource.type
      })),
      quiz: {
        completed: index === 0,
        score: index === 0 ? 78 : null,
        completedAt: index === 0 ? new Date(Date.now() - 14 * 24 * 60 * 60 * 1000) : null
      }
    })),
    startedAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
    lastAccessedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    estimatedCompletionDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    adaptiveRecommendations: [
      {
        type: 'review',
        description: 'Révision des concepts de traitement d\'images',
        priority: 'high',
        status: 'pending'
      }
    ]
  });
  
  await pausedPathway.save();
  pathways.push(pausedPathway);
  
  return pathways;
}

// Fonction pour créer les tentatives de quiz
async function createQuizAttempts(users, quizzes, pathways) {
  const attempts = [];
  
  // Créer des tentatives pour le premier utilisateur
  const userAttempt1 = new QuizAttempt({
    userId: users[0]._id,
    quizId: quizzes[0]._id,
    pathwayId: pathways[0]._id,
    moduleId: '0',
    score: 85,
    answers: [
      {
        questionId: quizzes[0].questions[0]._id,
        selectedOption: quizzes[0].questions[0].options[0]._id,
        isCorrect: true,
        timeSpent: 45
      },
      {
        questionId: quizzes[0].questions[1]._id,
        selectedOption: quizzes[0].questions[1].options[0]._id,
        isCorrect: true,
        timeSpent: 60
      },
      {
        questionId: quizzes[0].questions[2]._id,
        selectedOption: quizzes[0].questions[2].options[0]._id,
        isCorrect: true,
        timeSpent: 50
      }
    ],
    totalTimeSpent: 155,
    completed: true,
    completedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
  });
  
  await userAttempt1.save();
  attempts.push(userAttempt1);
  
  // Créer des tentatives pour le deuxième utilisateur
  const userAttempt2 = new QuizAttempt({
    userId: users[1]._id,
    quizId: quizzes[1]._id,
    pathwayId: pathways[1]._id,
    moduleId: '1',
    score: 90,
    answers: [
      {
        questionId: quizzes[1].questions[0]._id,
        selectedOption: quizzes[1].questions[0].options[0]._id,
        isCorrect: true,
        timeSpent: 40
      },
      {
        questionId: quizzes[1].questions[1]._id,
        selectedOption: quizzes[1].questions[1].options[0]._id,
        isCorrect: true,
        timeSpent: 35
      }
    ],
    totalTimeSpent: 75,
    completed: true,
    completedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000)
  });
  
  await userAttempt2.save();
  attempts.push(userAttempt2);
  
  return attempts;
}

// Fonction pour créer les données d'apprentissage
async function createLearningData(users, pathways, goals) {
  const learningDataEntries = [];
  
  // Créer des données d'apprentissage pour le premier utilisateur
  const learningData1 = new LearningData({
    learnerId: users[0]._id,
    pathwayId: pathways[0]._id,
    goalId: goals[0]._id,
    initialAssessment: new Map([
      ['math', 65],
      ['programming', 70],
      ['ml_basics', 60]
    ]),
    finalAssessment: new Map([
      ['math', 75],
      ['programming', 85],
      ['ml_basics', 80]
    ]),
    timeToComplete: 45 * 24 * 60 * 60, // 45 jours en secondes
    successRate: 85,
    difficulties: ['feature_engineering', 'model_evaluation']
  });
  
  await learningData1.save();
  learningDataEntries.push(learningData1);
  
  // Créer des données d'apprentissage pour le deuxième utilisateur
  const learningData2 = new LearningData({
    learnerId: users[1]._id,
    pathwayId: pathways[1]._id,
    goalId: goals[1]._id,
    initialAssessment: new Map([
      ['math', 75],
      ['programming', 80],
      ['dl_basics', 65]
    ]),
    finalAssessment: new Map([
      ['math', 85],
      ['programming', 90],
      ['dl_basics', 85]
    ]),
    timeToComplete: 60 * 24 * 60 * 60, // 60 jours en secondes
    successRate: 90,
    difficulties: ['backpropagation', 'hyperparameter_tuning']
  });
  
  await learningData2.save();
  learningDataEntries.push(learningData2);
  
  return learningDataEntries;
}

// Fonction pour créer les évaluations de concepts
async function createConceptAssessments(concepts) {
  const conceptAssessments = [];
  
  // Créer une évaluation pour le concept d'algèbre linéaire
  const algebraAssessment = new ConceptAssessment({
    conceptId: concepts[0]._id,
    questions: [
      {
        text: 'Qu\'est-ce qu\'une matrice orthogonale ?',
        options: [
          {
            text: 'Une matrice carrée dont les colonnes sont orthogonales entre elles',
            isCorrect: true
          },
          {
            text: 'Une matrice dont tous les éléments sont égaux à 0 ou 1',
            isCorrect: false
          },
          {
            text: 'Une matrice qui ne contient que des nombres pairs',
            isCorrect: false
          }
        ],
        explanation: 'Une matrice orthogonale est une matrice carrée dont les colonnes (et les lignes) forment un ensemble orthonormal.'
      },
      {
        text: 'Quelle est la propriété principale des vecteurs propres d\'une matrice ?',
        options: [
          {
            text: 'Ils ne changent que d\'échelle lorsqu\'ils sont multipliés par la matrice',
            isCorrect: true
          },
          {
            text: 'Ils sont toujours perpendiculaires entre eux',
            isCorrect: false
          },
          {
            text: 'Ils ont toujours une norme égale à 1',
            isCorrect: false
          }
        ],
        explanation: 'Un vecteur propre d\'une matrice A est un vecteur non nul v tel que Av = λv, où λ est la valeur propre associée.'
      }
    ],
    passingScore: 70,
    timeLimit: 1200,
    difficulty: 'basic'
  });
  
  await algebraAssessment.save();
  conceptAssessments.push(algebraAssessment);
  
  // Créer une évaluation pour le concept de ML Fundamentals
  const mlAssessment = new ConceptAssessment({
    conceptId: concepts[4]._id,
    questions: [
      {
        text: 'Quelle métrique est la plus appropriée pour évaluer un modèle de classification avec des classes déséquilibrées ?',
        options: [
          {
            text: 'F1-score',
            isCorrect: true
          },
          {
            text: 'Accuracy',
            isCorrect: false
          },
          {
            text: 'Mean Squared Error',
            isCorrect: false
          }
        ],
        explanation: 'Le F1-score est particulièrement utile pour les problèmes de classification déséquilibrée car il prend en compte à la fois la précision et le rappel.'
      },
      {
        text: 'Qu\'est-ce que le surapprentissage (overfitting) ?',
        options: [
          {
            text: 'Le modèle apprend trop bien les données d\'entraînement et généralise mal',
            isCorrect: true
          },
          {
            text: 'Le modèle n\'apprend pas assez des données d\'entraînement',
            isCorrect: false
          },
          {
            text: 'Le modèle prend trop de temps à s\'entraîner',
            isCorrect: false
          }
        ],
        explanation: 'Le surapprentissage se produit lorsqu\'un modèle apprend trop spécifiquement les données d\'entraînement et perd en capacité de généralisation.'
      }
    ],
    passingScore: 75,
    timeLimit: 1500,
    difficulty: 'intermediate'
  });
  
  await mlAssessment.save();
  conceptAssessments.push(mlAssessment);
  
  return conceptAssessments;
}

// Fonction pour créer les profils d'apprenants
async function createLearnerProfiles(users) {
  const profiles = [];
  
  // Profil pour le premier utilisateur (débutant)
  const profile1 = new LearnerProfile({
    userId: users[0]._id,
    learningStyle: 'visual',
    preferences: {
      mathLevel: 'beginner',
      programmingLevel: 'intermediate',
      preferredDomain: 'ml'
    },
    assessments: [
      {
        category: 'ml',
        score: 65,
        responses: [],
        recommendations: [
          {
            category: 'ml_basics',
            score: 65,
            recommendations: [
              'Renforcez vos connaissances en algorithmes de classification',
              'Pratiquez régulièrement avec des exercices de base'
            ]
          }
        ],
        completedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      }
    ]
  });
  
  await profile1.save();
  profiles.push(profile1);
  
  // Profil pour le deuxième utilisateur (intermédiaire)
  const profile2 = new LearnerProfile({
    userId: users[1]._id,
    learningStyle: 'reading',
    preferences: {
      mathLevel: 'intermediate',
      programmingLevel: 'intermediate',
      preferredDomain: 'dl'
    },
    assessments: [
      {
        category: 'dl',
        score: 75,
        responses: [],
        recommendations: [
          {
            category: 'dl_basics',
            score: 75,
            recommendations: [
              'Approfondissez vos connaissances avec des projets pratiques',
              'Explorez les interconnexions entre les différents concepts'
            ]
          }
        ],
        completedAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000)
      }
    ]
  });
  
  await profile2.save();
  profiles.push(profile2);
  
  // Profil pour le troisième utilisateur (avancé)
  const profile3 = new LearnerProfile({
    userId: users[2]._id,
    learningStyle: 'kinesthetic',
    preferences: {
      mathLevel: 'advanced',
      programmingLevel: 'advanced',
      preferredDomain: 'computer_vision'
    },
    assessments: [
      {
        category: 'computer_vision',
        score: 85,
        responses: [],
        recommendations: [
          {
            category: 'computer_vision',
            score: 85,
            recommendations: [
              'Concentrez-vous sur des cas d\'usage avancés',
              'Participez à des projets de recherche ou open source'
            ]
          }
        ],
        completedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)
      }
    ]
  });
  
  await profile3.save();
  profiles.push(profile3);
  
  return profiles;
}

async function populateTestData() {
  try {
    await mongoose.connect(MONGODB_URI);
    logger.info('Connected to MongoDB');

    // Nettoyer la base de données
    await Promise.all([
      User.deleteMany({}),
      Section.deleteMany({}),
      Step.deleteMany({}),
      Resource.deleteMany({}),
      Goal.deleteMany({}),
      Concept.deleteMany({}),
      ConceptAssessment.deleteMany({}),
      LearnerProfile.deleteMany({}),
      Pathway.deleteMany({}),
      LearningData.deleteMany({}),
      Quiz.deleteMany({}),
      QuizAttempt.deleteMany({}),
      Assessment.deleteMany({})
    ]);
    logger.info('Cleaned existing data');

    // Créer les utilisateurs
    const createdUsers = [];
    for (const userData of users) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);
      
      const user = new User({
        ...userData,
        password: hashedPassword,
        lastLogin: new Date()
      });
      
      const savedUser = await user.save();
      logger.info(`Created user: ${savedUser.email}`);
      createdUsers.push(savedUser);
    }

    // Créer les sections
    const sectionsMap = new Map();
    for (const sectionData of sections) {
      const section = new Section(sectionData);
      await section.save();
      sectionsMap.set(section.title, section._id);
      logger.info(`Created section: ${section.title}`);
    }

    // Créer les étapes et ressources
    const createdSteps = await createStepsAndResources(sectionsMap);
    logger.info(`Created ${createdSteps.length} steps with resources`);

    // Créer les concepts const conceptMap = new Map();
    for (const conceptData of concepts) {
      const concept = new Concept({
        ...conceptData,
        prerequisites: []
      });
      await concept.save();
      conceptMap.set(concept.name, concept._id);
      logger.info(`Created concept: ${concept.name}`);
    }

    // Mettre à jour les prérequis des concepts
    for (const conceptData of concepts) {
      if (conceptData.prerequisites.length > 0) {
        const concept = await Concept.findOne({ name: conceptData.name });
        concept.prerequisites = conceptData.prerequisites.map(name => 
          conceptMap.get(name)
        );
        await concept.save();
        logger.info(`Updated prerequisites for concept: ${concept.name}`);
      }
    }

    // Créer les objectifs d'apprentissage
    const createdGoals = [];
    for (const goalData of goals) {
      const goal = new Goal({
        ...goalData,
        requiredConcepts: concepts
          .filter(c => c.category === goalData.category)
          .map(c => conceptMap.get(c.name))
      });
      const savedGoal = await goal.save();
      logger.info(`Created learning goal: ${savedGoal.title}`);
      createdGoals.push(savedGoal);
    }

    // Créer les quiz
    const createdQuizzes = [];
    for (const quizData of quizzes) {
      const quiz = new Quiz(quizData);
      await quiz.save();
      logger.info(`Created quiz: ${quiz.title}`);
      createdQuizzes.push(quiz);
    }

    // Créer les évaluations
    for (const assessmentData of assessments) {
      const assessment = new Assessment({
        ...assessmentData,
        recommendedGoals: createdGoals
          .filter(goal => goal.category === assessmentData.category)
          .map(goal => goal._id)
      });
      await assessment.save();
      logger.info(`Created assessment: ${assessment.title}`);
    }

    // Créer les profils d'apprenants
    const learnerProfiles = await createLearnerProfiles(createdUsers);
    logger.info(`Created ${learnerProfiles.length} learner profiles`);

    // Créer les parcours d'apprentissage
    const pathways = await createPathways(createdUsers, createdGoals);
    logger.info(`Created ${pathways.length} pathways`);

    // Créer les tentatives de quiz
    const quizAttempts = await createQuizAttempts(createdUsers, createdQuizzes, pathways);
    logger.info(`Created ${quizAttempts.length} quiz attempts`);

    // Créer les données d'apprentissage
    const learningDataEntries = await createLearningData(createdUsers, pathways, createdGoals);
    logger.info(`Created ${learningDataEntries.length} learning data entries`);

    // Créer les évaluations de concepts
    const conceptAssessments = await createConceptAssessments(
      Object.values(conceptMap).map((id, index) => ({ _id: id, ...concepts[index] }))
    );
    logger.info(`Created ${conceptAssessments.length} concept assessments`);

    logger.info('Database population completed successfully');
  } catch (error) {
    logger.error('Error populating database:', error);
    throw error;
  } finally {
    await mongoose.disconnect();
    logger.info('Disconnected from MongoDB');
  }
}

// Exécuter le script
populateTestData().catch(error => {
  logger.error('Fatal error during database population:', error);
  process.exit(1);
});