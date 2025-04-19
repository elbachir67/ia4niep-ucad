# Documentation IA4Nieup - Plateforme d'Apprentissage en IA

## Table des matières
1. [Vue d'ensemble](#vue-densemble)
2. [Architecture technique](#architecture-technique)
3. [Fonctionnalités principales](#fonctionnalités-principales)
4. [Structure du projet](#structure-du-projet)
5. [Base de données](#base-de-données)
6. [API](#api)
7. [Sécurité](#sécurité)
8. [Déploiement](#déploiement)

## Vue d'ensemble

### Description
IA4Nieup est une plateforme d'apprentissage adaptative spécialisée dans l'Intelligence Artificielle. Elle offre des parcours personnalisés basés sur l'évaluation des compétences des apprenants et adapte dynamiquement le contenu en fonction de leur progression.

### Public cible
- Étudiants en informatique
- Professionnels en reconversion
- Chercheurs et académiques
- Professionnels souhaitant monter en compétences en IA

### Objectifs principaux
1. Fournir un apprentissage personnalisé en IA
2. Évaluer et suivre la progression des apprenants
3. Adapter dynamiquement les parcours d'apprentissage
4. Offrir des recommandations pertinentes
5. Faciliter l'acquisition de compétences pratiques

## Architecture technique

### Stack technologique
- **Frontend**: 
  - React 18.3.1
  - TypeScript 5.5.3
  - Vite 5.4.2
  - TailwindCSS 3.4.1
  - React Router 6.22.3

- **Backend**:
  - Node.js (>= 18.0.0)
  - Express 4.18.3
  - MongoDB 8.2.1
  - Mongoose 8.2.1

- **Authentification**:
  - JWT (jsonwebtoken 9.0.2)
  - bcryptjs 2.4.3

- **Outils de développement**:
  - ESLint 9.9.1
  - Vitest 1.3.1
  - TypeScript-ESLint 8.3.0

### Architecture système
```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│    Frontend     │◄───►│     Backend     │◄───►│    MongoDB      │
│    (React)      │     │    (Node.js)    │     │   Database      │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### Patterns de conception
- **Frontend**:
  - Context API pour la gestion d'état global
  - Hooks personnalisés pour la logique réutilisable
  - Components patterns pour l'UI
  - Service layer pour les appels API

- **Backend**:
  - MVC (Model-View-Controller)
  - Repository pattern pour l'accès aux données
  - Service layer pour la logique métier
  - Middleware pattern pour l'authentification et la validation

## Fonctionnalités principales

### 1. Système d'authentification
- Inscription/Connexion utilisateur
- Gestion des rôles (utilisateur/admin)
- JWT pour l'authentification
- Protection des routes

### 2. Évaluation des compétences
- Quiz adaptatif initial
- Évaluation continue
- Analyse des résultats
- Recommandations personnalisées

### 3. Parcours d'apprentissage
- Génération de parcours personnalisés
- Adaptation dynamique du contenu
- Suivi de progression
- Recommandations adaptatives

### 4. Gestion des ressources
- Multiples types de ressources (vidéos, articles, etc.)
- Différents niveaux de difficulté
- Catégorisation par domaine
- Support multilingue (FR/EN)

### 5. Tableau de bord
- Suivi de progression
- Statistiques d'apprentissage
- Recommandations personnalisées
- Historique des activités

## Structure du projet

### Frontend
```
src/
├── components/          # Composants réutilisables
├── contexts/           # Contextes React
├── hooks/              # Hooks personnalisés
├── pages/              # Pages de l'application
├── services/           # Services API
├── types/              # Types TypeScript
└── utils/              # Utilitaires
```

### Backend
```
server/
├── src/
│   ├── config/         # Configuration
│   ├── middleware/     # Middlewares
│   ├── models/         # Modèles Mongoose
│   ├── routes/         # Routes API
│   ├── services/       # Services métier
│   └── utils/          # Utilitaires
└── tests/              # Tests unitaires
```

## Base de données

### Modèles principaux

#### User
```typescript
{
  email: string;
  password: string;
  role: 'user' | 'admin';
  isActive: boolean;
  lastLogin: Date;
}
```

#### LearnerProfile
```typescript
{
  userId: ObjectId;
  learningStyle: string;
  preferences: {
    mathLevel: string;
    programmingLevel: string;
    preferredDomain: string;
  };
  assessments: [{
    category: string;
    score: number;
    completedAt: Date;
  }];
}
```

#### Goal
```typescript
{
  title: string;
  description: string;
  category: string;
  level: string;
  estimatedDuration: number;
  modules: [{
    title: string;
    description: string;
    duration: number;
    resources: Array;
  }];
}
```

#### Pathway
```typescript
{
  userId: ObjectId;
  goalId: ObjectId;
  status: string;
  progress: number;
  moduleProgress: [{
    moduleIndex: number;
    completed: boolean;
    resources: Array;
  }];
}
```

## API

### Points d'entrée principaux

#### Authentification
```
POST /api/auth/register     # Inscription
POST /api/auth/login       # Connexion
GET  /api/auth/profile     # Profil utilisateur
```

#### Évaluation
```
GET  /api/assessments/questions    # Questions d'évaluation
POST /api/assessments/submit       # Soumission des réponses
GET  /api/assessments/history      # Historique des évaluations
```

#### Parcours
```
GET  /api/pathways                 # Liste des parcours
POST /api/pathways/generate        # Génération de parcours
PUT  /api/pathways/:id/progress    # Mise à jour progression
```

#### Ressources
```
GET  /api/resources               # Liste des ressources
GET  /api/resources/:id          # Détail d'une ressource
GET  /api/resources/step/:stepId # Ressources par étape
```

## Sécurité

### Authentification
- Utilisation de JWT pour l'authentification
- Tokens stockés dans le localStorage
- Refresh tokens pour la sécurité
- Protection CSRF

### Validation des données
- Validation côté client avec TypeScript
- Validation côté serveur avec express-validator
- Sanitization des entrées utilisateur

### Protection des routes
- Middleware d'authentification
- Vérification des rôles
- Rate limiting
- Protection contre les injections

## Déploiement

### Frontend
- Hébergement: Netlify
- Build: Vite
- CI/CD: GitLab CI

### Backend
- Hébergement: Render
- Process Manager: Node.js natif
- Base de données: MongoDB Atlas

### Variables d'environnement
```env
# Frontend
VITE_API_URL=http://localhost:5000

# Backend
MONGODB_URI=mongodb://localhost:27017/ucad_ia
JWT_SECRET=ucad_ia_super_secret_key_2025
PORT=5000
```

### Processus de déploiement
1. Tests automatisés
2. Build du frontend
3. Déploiement du frontend sur Netlify
4. Déploiement du backend sur Render
5. Configuration des variables d'environnement
6. Vérification des services

### Monitoring
- Logs avec Winston
- Métriques de performance
- Alertes en cas d'erreur
- Suivi des sessions utilisateurs

## Évolutions futures

### Court terme
1. Implémentation de l'apprentissage par projet
2. Ajout de nouveaux types de ressources
3. Amélioration des recommandations
4. Support mobile amélioré

### Moyen terme
1. Intégration d'outils de collaboration
2. Système de mentorat
3. Gamification avancée
4. Support offline

### Long terme
1. IA pour l'adaptation du contenu
2. Réalité augmentée/virtuelle
3. Certification blockchain
4. Marketplace de contenu