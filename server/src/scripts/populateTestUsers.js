import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { logger } from '../utils/logger.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

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
    email: 'admin@ucad.edu.sn',
    password: 'Admin123!',
    role: 'admin',
    isActive: true
  }
];

async function populateTestUsers() {
  try {
    await mongoose.connect(MONGODB_URI);
    logger.info('Connected to MongoDB');

    // Supprimer les utilisateurs existants avec ces emails
    await User.deleteMany({ email: { $in: users.map(u => u.email) } });
    logger.info('Cleaned existing users');
    
    // Créer les utilisateurs
    for (const userData of users) {
      try {
        // Créer un nouvel utilisateur avec le modèle User
        // Le hashage du mot de passe sera géré automatiquement par le middleware pre-save
        const user = new User(userData);
        
        const savedUser = await user.save();
        logger.info(`Created test user: ${savedUser.email}`);
        
        // Vérifier que l'authentification fonctionne
        const isMatch = await savedUser.comparePassword(userData.password);
        logger.info(`Test password verification for ${savedUser.email}: ${isMatch ? 'Success' : 'Failed'}`);
      } catch (error) {
        logger.error(`Error creating user ${userData.email}:`, error);
        throw error;
      }
    }

    logger.info('Test users created successfully');
  } catch (error) {
    logger.error('Error creating test users:', error);
    throw error;
  } finally {
    await mongoose.disconnect();
    logger.info('Disconnected from MongoDB');
  }
}

// Exécuter le script
populateTestUsers().catch(error => {
  logger.error('Fatal error:', error);
  process.exit(1);
});