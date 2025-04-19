// ... (code précédent inchangé jusqu'aux goals)

// Données pour les objectifs d'apprentissage
const goals = [
  {
    title: 'Régression Linéaire et Logistique',
    description: 'Maîtrisez les fondamentaux de la régression pour la prédiction et la classification binaire.',
    category: 'ml',
    level: 'beginner',
    estimatedDuration: 4,
    prerequisites: [
      {
        category: 'math',
        skills: [
          { name: 'Algèbre linéaire', level: 'basic' },
          { name: 'Calcul différentiel', level: 'basic' }
        ]
      },
      {
        category: 'programming',
        skills: [
          { name: 'Python', level: 'basic' },
          { name: 'NumPy', level: 'basic' }
        ]
      }
    ],
    modules: [
      {
        title: 'Régression Linéaire',
        description: 'Comprendre et implémenter la régression linéaire',
        duration: 10,
        skills: [
          { name: 'Scikit-learn', level: 'basic' },
          { name: 'Optimisation', level: 'basic' }
        ],
        resources: [
          {
            title: 'Linear Regression from Scratch',
            type: 'tutorial',
            url: 'https://scikit-learn.org/stable/modules/linear_model.html',
            duration: 60
          }
        ],
        validationCriteria: [
          'Implémenter une régression linéaire from scratch',
          'Utiliser scikit-learn pour la régression'
        ]
      },
      {
        title: 'Régression Logistique',
        description: 'Classification binaire avec la régression logistique',
        duration: 10,
        skills: [
          { name: 'Classification', level: 'basic' },
          { name: 'Métriques', level: 'basic' }
        ],
        resources: [
          {
            title: 'Logistic Regression Tutorial',
            type: 'tutorial',
            url: 'https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression',
            duration: 60
          }
        ],
        validationCriteria: [
          'Implémenter une régression logistique',
          'Évaluer un modèle de classification'
        ]
      }
    ],
    careerOpportunities: [
      {
        title: 'Data Analyst',
        description: 'Analyse prédictive et modélisation statistique',
        averageSalary: '35-50k€/an',
        companies: ['Orange', 'BNP Paribas', 'Société Générale']
      }
    ]
  },
  {
    title: 'Réseaux de Neurones Récurrents (RNN/LSTM)',
    description: 'Maîtrisez les architectures de réseaux de neurones pour le traitement de séquences.',
    category: 'dl',
    level: 'intermediate',
    estimatedDuration: 6,
    prerequisites: [
      {
        category: 'math',
        skills: [
          { name: 'Calcul différentiel', level: 'intermediate' },
          { name: 'Probabilités', level: 'intermediate' }
        ]
      },
      {
        category: 'programming',
        skills: [
          { name: 'PyTorch', level: 'intermediate' },
          { name: 'Python', level: 'intermediate' }
        ]
      }
    ],
    modules: [
      {
        title: 'RNN Fondamentaux',
        description: 'Architecture et entraînement des RNNs',
        duration: 15,
        skills: [
          { name: 'PyTorch', level: 'intermediate' },
          { name: 'Backpropagation', level: 'intermediate' }
        ],
        resources: [
          {
            title: 'Understanding RNNs',
            type: 'tutorial',
            url: 'https://pytorch.org/tutorials/intermediate/char_rnn_classification_tutorial.html',
            duration: 90
          }
        ],
        validationCriteria: [
          'Implémenter un RNN simple',
          'Comprendre la backpropagation through time'
        ]
      },
      {
        title: 'LSTM et GRU',
        description: 'Architectures avancées pour les séquences longues',
        duration: 15,
        skills: [
          { name: 'LSTM', level: 'intermediate' },
          { name: 'GRU', level: 'intermediate' }
        ],
        resources: [
          {
            title: 'LSTM Networks',
            type: 'tutorial',
            url: 'https://pytorch.org/tutorials/beginner/nlp/sequence_models_tutorial.html',
            duration: 90
          }
        ],
        validationCriteria: [
          'Implémenter un LSTM',
          'Comparer RNN, LSTM et GRU'
        ]
      }
    ],
    careerOpportunities: [
      {
        title: 'NLP Engineer',
        description: 'Développement de modèles de traitement de séquences',
        averageSalary: '45-70k€/an',
        companies: ['Hugging Face', 'DeepMind', 'OpenAI']
      }
    ]
  },
  {
    title: 'Transformers et Attention',
    description: 'Maîtrisez l\'architecture Transformer et le mécanisme d\'attention.',
    category: 'dl',
    level: 'advanced',
    estimatedDuration: 8,
    prerequisites: [
      {
        category: 'math',
        skills: [
          { name: 'Algèbre linéaire', level: 'advanced' },
          { name: 'Probabilités', level: 'advanced' }
        ]
      },
      {
        category: 'programming',
        skills: [
          { name: 'PyTorch', level: 'advanced' },
          { name: 'Python', level: 'advanced' }
        ]
      }
    ],
    modules: [
      {
        title: 'Mécanisme d\'Attention',
        description: 'Comprendre et implémenter l\'attention',
        duration: 20,
        skills: [
          { name: 'PyTorch', level: 'advanced' },
          { name: 'Attention', level: 'advanced' }
        ],
        resources: [
          {
            title: 'Attention Is All You Need',
            type: 'article',
            url: 'https://arxiv.org/abs/1706.03762',
            duration: 120
          }
        ],
        validationCriteria: [
          'Implémenter l\'attention multi-têtes',
          'Comprendre le scaled dot-product attention'
        ]
      },
      {
        title: 'Architecture Transformer',
        description: 'Architecture complète et entraînement',
        duration: 20,
        skills: [
          { name: 'Transformers', level: 'advanced' },
          { name: 'Optimisation', level: 'advanced' }
        ],
        resources: [
          {
            title: 'Transformer Implementation',
            type: 'tutorial',
            url: 'https://pytorch.org/tutorials/beginner/transformer_tutorial.html',
            duration: 150
          }
        ],
        validationCriteria: [
          'Implémenter un Transformer complet',
          'Entraîner sur une tâche de NLP'
        ]
      }
    ],
    careerOpportunities: [
      {
        title: 'Research Engineer',
        description: 'R&D en architectures Transformer',
        averageSalary: '60-90k€/an',
        companies: ['Google Brain', 'DeepMind', 'Anthropic']
      }
    ]
  },
  {
    title: 'Détection d\'Objets avec YOLO',
    description: 'Maîtrisez la détection d\'objets en temps réel avec l\'architecture YOLO.',
    category: 'computer_vision',
    level: 'intermediate',
    estimatedDuration: 6,
    prerequisites: [
      {
        category: 'math',
        skills: [
          { name: 'Algèbre linéaire', level: 'intermediate' },
          { name: 'Probabilités', level: 'intermediate' }
        ]
      },
      {
        category: 'programming',
        skills: [
          { name: 'Python', level: 'intermediate' },
          { name: 'PyTorch', level: 'intermediate' }
        ]
      }
    ],
    modules: [
      {
        title: 'Architecture YOLO',
        description: 'Comprendre l\'architecture YOLO',
        duration: 15,
        skills: [
          { name: 'CNN', level: 'intermediate' },
          { name: 'PyTorch', level: 'intermediate' }
        ],
        resources: [
          {
            title: 'YOLO Explained',
            type: 'tutorial',
            url: 'https://github.com/ultralytics/yolov5',
            duration: 90
          }
        ],
        validationCriteria: [
          'Comprendre l\'architecture YOLO',
          'Implémenter la détection d\'objets'
        ]
      },
      {
        title: 'Entraînement et Déploiement',
        description: 'Entraîner et déployer YOLO',
        duration: 15,
        skills: [
          { name: 'Data Augmentation', level: 'intermediate' },
          { name: 'MLOps', level: 'intermediate' }
        ],
        resources: [
          {
            title: 'Training YOLO',
            type: 'tutorial',
            url: 'https://docs.ultralytics.com/yolov5/tutorials/train_custom_data/',
            duration: 120
          }
        ],
        validationCriteria: [
          'Entraîner sur un dataset personnalisé',
          'Déployer le modèle en production'
        ]
      }
    ],
    careerOpportunities: [
      {
        title: 'Computer Vision Engineer',
        description: 'Développement de systèmes de détection d\'objets',
        averageSalary: '45-75k€/an',
        companies: ['Tesla', 'NVIDIA', 'Intel']
      }
    ]
  }
];

// ... (reste du code inchangé)