import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User, Goal, Assessment, Quiz, Pathway } from '../models/index.js';
import { logger } from '../utils/logger.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ucad_ia';

const initialData = {
  users: [
    {
      email: 'student@ucad.edu.sn',
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
  ],

  goals: [
    {
      title: 'Machine Learning Engineer',
      description: 'Master the fundamentals of ML and develop practical skills',
      category: 'ml',
      level: 'intermediate',
      estimatedDuration: 12,
      prerequisites: [
        {
          category: 'math',
          skills: [{ name: 'Linear Algebra', level: 'intermediate' }]
        },
        {
          category: 'programming',
          skills: [{ name: 'Python', level: 'intermediate' }]
        }
      ],
      modules: [
        {
          title: 'Introduction to ML',
          description: 'ML fundamentals',
          duration: 20,
          skills: [
            { name: 'Python', level: 'basic' },
            { name: 'Scikit-learn', level: 'basic' }
          ],
          resources: [
            {
              title: 'ML Course',
              type: 'course',
              url: 'https://example.com/ml-course',
              duration: 120
            }
          ],
          validationCriteria: ['Understand ML types', 'Implement basic models']
        }
      ],
      careerOpportunities: [
        {
          title: 'ML Engineer',
          description: 'ML model development',
          averageSalary: '45-75k€/year',
          companies: ['Google', 'Amazon', 'Meta']
        }
      ]
    },
    {
      title: 'Deep Learning Specialist',
      description: 'Master neural networks and advanced architectures',
      category: 'dl',
      level: 'advanced',
      estimatedDuration: 16,
      prerequisites: [
        {
          category: 'math',
          skills: [{ name: 'Calculus', level: 'advanced' }]
        },
        {
          category: 'programming',
          skills: [{ name: 'PyTorch', level: 'intermediate' }]
        }
      ],
      modules: [
        {
          title: 'Neural Networks',
          description: 'NN fundamentals',
          duration: 25,
          skills: [{ name: 'PyTorch', level: 'intermediate' }],
          resources: [
            {
              title: 'Deep Learning Book',
              type: 'book',
              url: 'https://example.com/dl-book',
              duration: 180
            }
          ],
          validationCriteria: ['Understand NN architecture', 'Implement basic networks']
        }
      ],
      careerOpportunities: [
        {
          title: 'DL Engineer',
          description: 'Neural network design',
          averageSalary: '60-90k€/year',
          companies: ['OpenAI', 'DeepMind', 'Google Brain']
        }
      ]
    }
  ],

  assessments: [
    {
      title: 'ML Fundamentals Assessment',
      category: 'ml',
      difficulty: 'basic',
      questions: [
        {
          text: 'What is the main difference between supervised and unsupervised learning?',
          options: [
            { text: 'Supervised learning uses labeled data', isCorrect: true },
            { text: 'Supervised learning is faster', isCorrect: false }
          ],
          explanation: 'Supervised learning uses labeled data for training'
        }
      ]
    },
    {
      title: 'Deep Learning Assessment',
      category: 'dl',
      difficulty: 'intermediate',
      questions: [
        {
          text: 'What is a neural network activation function?',
          options: [
            { text: 'A function that adds non-linearity', isCorrect: true },
            { text: 'A function that initializes weights', isCorrect: false }
          ],
          explanation: 'Activation functions add non-linearity to neural networks'
        }
      ]
    }
  ],

  quizzes: [
    {
      moduleId: '1',
      title: 'Introduction to Machine Learning',
      description: 'Test your knowledge of ML fundamentals',
      timeLimit: 1800,
      passingScore: 70,
      questions: [
        {
          text: 'What is cross-validation?',
          options: [
            {
              text: 'A technique to evaluate model performance on different data subsets',
              isCorrect: true
            },
            {
              text: 'A data cleaning method',
              isCorrect: false
            }
          ],
          explanation: 'Cross-validation helps evaluate model performance on different data subsets'
        }
      ]
    }
  ]
};

async function populateDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    logger.info('Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Goal.deleteMany({}),
      Assessment.deleteMany({}),
      Quiz.deleteMany({}),
      Pathway.deleteMany({})
    ]);
    logger.info('Cleared existing data');

    // Create users
    const createdUsers = await Promise.all(
      initialData.users.map(async userData => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);
        
        const user = new User({
          ...userData,
          password: hashedPassword
        });
        
        const savedUser = await user.save();
        logger.info(`Created user: ${savedUser.email}`);
        return savedUser;
      })
    );

    // Create goals
    const createdGoals = await Promise.all(
      initialData.goals.map(async goalData => {
        const goal = new Goal(goalData);
        const savedGoal = await goal.save();
        logger.info(`Created goal: ${savedGoal.title}`);
        return savedGoal;
      })
    );

    // Create assessments
    await Promise.all(
      initialData.assessments.map(async assessmentData => {
        const assessment = new Assessment(assessmentData);
        await assessment.save();
        logger.info(`Created assessment: ${assessment.title}`);
      })
    );

    // Create quizzes
    await Promise.all(
      initialData.quizzes.map(async quizData => {
        const quiz = new Quiz(quizData);
        await quiz.save();
        logger.info(`Created quiz: ${quiz.title}`);
      })
    );

    // Create a sample pathway
    const student = createdUsers.find(u => u.role === 'user');
    const mlGoal = createdGoals.find(g => g.title === 'Machine Learning Engineer');

    if (student && mlGoal) {
      const pathway = new Pathway({
        userId: student._id,
        goalId: mlGoal._id,
        status: 'active',
        progress: 35,
        currentModule: 0,
        moduleProgress: [{
          moduleIndex: 0,
          completed: false,
          resources: [
            {
              resourceId: '1',
              completed: true,
              completedAt: new Date()
            }
          ],
          quiz: {
            completed: false
          }
        }],
        startedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        lastAccessedAt: new Date(),
        estimatedCompletionDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
      });

      await pathway.save();
      logger.info(`Created pathway for user: ${student.email}`);
    }

    logger.info('Database population completed successfully');
  } catch (error) {
    logger.error('Error populating database:', error);
    throw error;
  } finally {
    await mongoose.disconnect();
    logger.info('Disconnected from MongoDB');
  }
}

// Execute the script
populateDatabase().catch(error => {
  logger.error('Fatal error during database population:', error);
  process.exit(1);
});