import mongoose from 'mongoose';
import { Goal, Concept, Quiz, Section, Step, Resource } from '../models/index.js';
import { logger } from '../utils/logger.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ucad_ia';

// Sections fondamentales
const coreSections = [
  {
    title: "Foundations",
    description: "Bases mathématiques et programmation pour l'IA",
    order: 1,
    icon: "brain"
  },
  {
    title: "Machine Learning",
    description: "Algorithmes classiques et apprentissage statistique",
    order: 2,
    icon: "code"
  },
  {
    title: "Deep Learning",
    description: "Réseaux de neurones et architectures avancées",
    order: 3,
    icon: "bot"
  },
  {
    title: "Large Language Models",
    description: "Modèles de langage et traitement du texte",
    order: 4,
    icon: "book"
  }
];

// Concepts fondamentaux
const coreConcepts = [
  {
    name: "Mathématiques pour l'IA",
    description: "Fondements mathématiques essentiels pour l'IA",
    category: "mathematics",
    level: "basic",
    prerequisites: []
  },
  {
    name: "Algèbre Linéaire Avancée",
    description: "Concepts avancés d'algèbre linéaire pour le ML",
    category: "mathematics",
    level: "intermediate",
    prerequisites: ["Mathématiques pour l'IA"]
  },
  {
    name: "Python Programming",
    description: "Programmation Python pour le ML",
    category: "programming",
    level: "basic",
    prerequisites: []
  },
  {
    name: "ML Fundamentals",
    description: "Concepts fondamentaux du Machine Learning",
    category: "ml",
    level: "basic",
    prerequisites: ["Mathématiques pour l'IA", "Python Programming"]
  },
  {
    name: "Deep Learning Basics",
    description: "Introduction aux réseaux de neurones",
    category: "dl",
    level: "intermediate",
    prerequisites: ["ML Fundamentals", "Algèbre Linéaire Avancée"]
  },
  {
    name: "NLP Fundamentals",
    description: "Bases du traitement du langage naturel",
    category: "nlp",
    level: "intermediate",
    prerequisites: ["ML Fundamentals"]
  }
];

// Objectifs d'apprentissage spécifiques
const learningGoals = [
  {
    title: "ML Engineer - Computer Vision",
    description: "Spécialisation en vision par ordinateur avec les algorithmes classiques",
    category: "computer_vision",
    level: "intermediate",
    estimatedDuration: 12,
    prerequisites: [
      {
        category: "math",
        skills: [
          { name: "Algèbre linéaire", level: "intermediate" },
          { name: "Calcul différentiel", level: "basic" }
        ]
      },
      {
        category: "programming",
        skills: [
          { name: "Python", level: "intermediate" },
          { name: "OpenCV", level: "basic" }
        ]
      }
    ],
    modules: [
      {
        title: "Vision par Ordinateur Classique",
        description: "Techniques traditionnelles de traitement d'images",
        duration: 25,
        skills: [
          { name: "OpenCV", level: "intermediate" },
          { name: "Scikit-image", level: "intermediate" }
        ],
        resources: [
          {
            title: "Computer Vision Fundamentals",
            type: "tutorial",
            url: "https://www.coursera.org/learn/computer-vision-basics",
            duration: 120
          }
        ],
        validationCriteria: [
          "Maîtriser les techniques de base du traitement d'images",
          "Implémenter des algorithmes de détection de caractéristiques"
        ]
      }
    ],
    careerOpportunities: [
      {
        title: "Computer Vision Engineer",
        description: "Développement d'algorithmes de vision par ordinateur",
        averageSalary: "45-65k€/an",
        companies: ["Valeo", "Thales", "Safran"]
      }
    ]
  },
  {
    title: "ML Engineer - Time Series",
    description: "Spécialisation en analyse et prédiction de séries temporelles",
    category: "ml",
    level: "advanced",
    estimatedDuration: 14,
    prerequisites: [
      {
        category: "math",
        skills: [
          { name: "Statistiques", level: "advanced" },
          { name: "Probabilités", level: "intermediate" }
        ]
      },
      {
        category: "programming",
        skills: [
          { name: "Python", level: "intermediate" },
          { name: "Pandas", level: "intermediate" }
        ]
      }
    ],
    modules: [
      {
        title: "Analyse de Séries Temporelles",
        description: "Techniques avancées d'analyse de séries temporelles",
        duration: 30,
        skills: [
          { name: "Prophet", level: "advanced" },
          { name: "Statsmodels", level: "advanced" }
        ],
        resources: [
          {
            title: "Time Series Analysis with Python",
            type: "tutorial",
            url: "https://www.coursera.org/learn/time-series-analysis",
            duration: 150
          }
        ],
        validationCriteria: [
          "Maîtriser les modèles ARIMA et ses variantes",
          "Implémenter des modèles de prédiction avancés"
        ]
      }
    ],
    careerOpportunities: [
      {
        title: "Time Series Specialist",
        description: "Analyse et prédiction de données temporelles",
        averageSalary: "50-75k€/an",
        companies: ["Bloomberg", "Trading Firms", "EDF"]
      }
    ]
  },
  {
    title: "Deep Learning Researcher - GANs",
    description: "Spécialisation en réseaux antagonistes génératifs",
    category: "dl",
    level: "advanced",
    estimatedDuration: 16,
    prerequisites: [
      {
        category: "math",
        skills: [
          { name: "Algèbre linéaire", level: "advanced" },
          { name: "Optimisation", level: "advanced" }
        ]
      },
      {
        category: "programming",
        skills: [
          { name: "PyTorch", level: "advanced" },
          { name: "Python", level: "advanced" }
        ]
      }
    ],
    modules: [
      {
        title: "Architectures GAN Avancées",
        description: "Étude des architectures GAN modernes",
        duration: 40,
        skills: [
          { name: "GANs", level: "advanced" },
          { name: "PyTorch", level: "advanced" }
        ],
        resources: [
          {
            title: "Advanced GAN Architectures",
            type: "tutorial",
            url: "https://www.coursera.org/learn/advanced-gans",
            duration: 180
          }
        ],
        validationCriteria: [
          "Implémenter des architectures GAN complexes",
          "Optimiser la stabilité de l'entraînement"
        ]
      }
    ],
    careerOpportunities: [
      {
        title: "AI Research Scientist",
        description: "R&D en génération d'images",
        averageSalary: "60-90k€/an",
        companies: ["Stability AI", "Midjourney", "Adobe"]
      }
    ]
  },
  {
    title: "LLM Engineer - Fine-tuning Specialist",
    description: "Expert en adaptation et optimisation de LLMs",
    category: "nlp",
    level: "advanced",
    estimatedDuration: 14,
    prerequisites: [
      {
        category: "math",
        skills: [
          { name: "Probabilités", level: "advanced" },
          { name: "Optimisation", level: "advanced" }
        ]
      },
      {
        category: "programming",
        skills: [
          { name: "PyTorch", level: "advanced" },
          { name: "Transformers", level: "advanced" }
        ]
      }
    ],
    modules: [
      {
        title: "Fine-tuning Avancé de LLMs",
        description: "Techniques d'adaptation de grands modèles de langage",
        duration: 35,
        skills: [
          { name: "PEFT", level: "advanced" },
          { name: "LoRA", level: "advanced" }
        ],
        resources: [
          {
            title: "Advanced LLM Fine-tuning",
            type: "tutorial",
            url: "https://www.coursera.org/learn/llm-fine-tuning",
            duration: 160
          }
        ],
        validationCriteria: [
          "Maîtriser les techniques de fine-tuning efficace",
          "Optimiser les performances avec des ressources limitées"
        ]
      }
    ],
    careerOpportunities: [
      {
        title: "LLM Research Engineer",
        description: "Optimisation et adaptation de LLMs",
        averageSalary: "65-95k€/an",
        companies: ["Hugging Face", "Anthropic", "Mistral AI"]
      }
    ]
  }
];

// Quiz spécifiques et détaillés
const quizzes = [
  {
    moduleId: "math_basics",
    title: "Mathématiques pour l'IA",
    description: "Évaluez vos connaissances en mathématiques pour l'IA",
    timeLimit: 1800,
    passingScore: 70,
    questions: [
      {
        text: "Quelle est l'utilité principale des vecteurs propres en ML ?",
        options: [
          {
            text: "Réduction de dimensionnalité et analyse de composantes principales",
            isCorrect: true
          },
          {
            text: "Optimisation des fonctions de perte",
            isCorrect: false
          },
          {
            text: "Normalisation des données",
            isCorrect: false
          }
        ],
        explanation: "Les vecteurs propres sont essentiels pour PCA et la réduction de dimensionnalité, permettant de trouver les directions de variance maximale dans les données."
      },
      {
        text: "Pourquoi utilise-t-on la dérivée partielle en deep learning ?",
        options: [
          {
            text: "Pour calculer les gradients nécessaires à la rétropropagation",
            isCorrect: true
          },
          {
            text: "Pour normaliser les données",
            isCorrect: false
          },
          {
            text: "Pour initialiser les poids",
            isCorrect: false
          }
        ],
        explanation: "Les dérivées partielles sont fondamentales pour calculer les gradients lors de la rétropropagation, permettant d'ajuster les poids du réseau."
      }
    ]
  },
  {
    moduleId: "ml_cv",
    title: "Vision par Ordinateur Classique",
    description: "Testez vos connaissances en vision par ordinateur traditionnelle",
    timeLimit: 1800,
    passingScore: 70,
    questions: [
      {
        text: "Quelle est la différence entre le filtre de Sobel et le filtre de Laplace ?",
        options: [
          {
            text: "Sobel détecte les gradients directionnels, Laplace détecte tous les bords",
            isCorrect: true
          },
          {
            text: "Sobel est plus rapide à calculer",
            isCorrect: false
          },
          {
            text: "Laplace est plus précis",
            isCorrect: false
          }
        ],
        explanation: "Le filtre de Sobel calcule les gradients dans des directions spécifiques (x ou y), tandis que le Laplacien détecte les changements dans toutes les directions."
      }
    ]
  },
  {
    moduleId: "dl_gans",
    title: "Architectures GAN",
    description: "Évaluez votre compréhension des GANs",
    timeLimit: 2400,
    passingScore: 75,
    questions: [
      {
        text: "Pourquoi utilise-t-on la Wasserstein distance dans les W-GANs ?",
        options: [
          {
            text: "Pour une meilleure stabilité de l'entraînement et éviter le mode collapse",
            isCorrect: true
          },
          {
            text: "Pour accélérer l'entraînement",
            isCorrect: false
          },
          {
            text: "Pour réduire la mémoire utilisée",
            isCorrect: false
          }
        ],
        explanation: "La Wasserstein distance fournit un gradient plus stable et aide à éviter les problèmes courants des GANs comme le mode collapse."
      }
    ]
  }
];

async function populateCoherentData() {
  try {
    await mongoose.connect(MONGODB_URI);
    logger.info('Connected to MongoDB');

    // Nettoyer la base de données
    await Promise.all([
      Section.deleteMany({}),
      Concept.deleteMany({}),
      Goal.deleteMany({}),
      Quiz.deleteMany({})
    ]);
    logger.info('Cleaned existing data');

    // Créer les sections
    const sections = await Section.insertMany(coreSections);
    logger.info('Created sections');

    // Créer les concepts
    const conceptMap = new Map();
    for (const conceptData of coreConcepts) {
      const concept = await Concept.create({
        ...conceptData,
        prerequisites: []
      });
      conceptMap.set(concept.name, concept._id);
      logger.info(`Created concept: ${concept.name}`);
    }

    // Mettre à jour les prérequis des concepts
    for (const conceptData of coreConcepts) {
      if (conceptData.prerequisites.length > 0) {
        const concept = await Concept.findOne({ name: conceptData.name });
        concept.prerequisites = conceptData.prerequisites.map(name => conceptMap.get(name));
        await concept.save();
        logger.info(`Updated prerequisites for: ${concept.name}`);
      }
    }

    // Créer les objectifs
    for (const goalData of learningGoals) {
      const goal = await Goal.create({
        ...goalData,
        requiredConcepts: coreConcepts
          .filter(c => c.category === goalData.category)
          .map(c => conceptMap.get(c.name))
      });
      logger.info(`Created goal: ${goal.title}`);
    }

    // Créer les quiz
    for (const quizData of quizzes) {
      const quiz = await Quiz.create(quizData);
      logger.info(`Created quiz: ${quiz.title}`);
    }

    logger.info('Successfully populated all data');
  } catch (error) {
    logger.error('Error populating data:', error);
    throw error;
  } finally {
    await mongoose.disconnect();
    logger.info('Disconnected from MongoDB');
  }
}

// Exécuter le script
populateCoherentData().catch(error => {
  logger.error('Fatal error during data population:', error);
  process.exit(1);
});