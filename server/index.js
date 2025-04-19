import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { sectionRoutes } from './routes/sections.js';
import { stepRoutes } from './routes/steps.js';
import { resourceRoutes } from './routes/resources.js';
import { authRoutes } from './routes/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
app.use(cors({
  origin: [
    'http://localhost:5173',  // Dev server
    'http://localhost:4173',  // Preview server
    'https://ucad-center-staging.netlify.app', // Votre domaine Netlify actuel
    'https://ucad-ia-roadmap.netlify.app', // Domaine Netlify production
    /\.netlify\.app$/, // Tous les sous-domaines Netlify
    /\.netlify\.live$/ // Netlify deploy previews
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ucad_ia')
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sections', sectionRoutes);
app.use('/api/steps', stepRoutes);
app.use('/api/resources', resourceRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});