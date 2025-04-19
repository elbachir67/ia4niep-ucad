// ... (début du fichier inchangé jusqu'aux goals)

// Ajout des débouchés et certifications aux objectifs existants
goals.forEach(goal => {
  // Ajout des débouchés selon la catégorie
  switch (goal.category) {
    case "ml":
      goal.careerOpportunities = [
        {
          title: "Machine Learning Engineer",
          description: "Conception et déploiement de modèles ML en production",
          averageSalary: "45-75k€/an",
          companies: ["Orange", "Thales", "Criteo", "Dataiku"]
        },
        {
          title: "Data Scientist",
          description: "Analyse de données et développement de solutions ML",
          averageSalary: "40-65k€/an",
          companies: ["BNP Paribas", "Société Générale", "Ubisoft", "Rakuten"]
        }
      ];
      goal.certification = {
        available: true,
        name: "UCAD ML Professional Certificate",
        provider: "UCAD AI Center",
        url: "https://ucad.sn/certifications/ml-pro"
      };
      break;

    case "computer_vision":
      goal.careerOpportunities = [
        {
          title: "Computer Vision Engineer",
          description: "Développement de solutions de vision par ordinateur",
          averageSalary: "45-70k€/an",
          companies: ["Valeo", "Renault", "Safran", "Yseop"]
        },
        {
          title: "AI Research Engineer",
          description: "R&D en vision par ordinateur et deep learning",
          averageSalary: "50-80k€/an",
          companies: ["INRIA", "CEA", "Huawei", "Samsung"]
        }
      ];
      goal.certification = {
        available: true,
        name: "UCAD Computer Vision Expert",
        provider: "UCAD AI Center",
        url: "https://ucad.sn/certifications/cv-expert"
      };
      break;

    case "nlp":
      goal.careerOpportunities = [
        {
          title: "NLP Engineer",
          description: "Développement de solutions de traitement du langage",
          averageSalary: "45-75k€/an",
          companies: ["Systran", "Qwant", "Sinequa", "LightOn"]
        },
        {
          title: "AI Solutions Architect",
          description: "Conception de solutions NLP pour les entreprises",
          averageSalary: "55-85k€/an",
          companies: ["IBM", "Microsoft", "SAP", "Orange"]
        }
      ];
      goal.certification = {
        available: true,
        name: "UCAD NLP Specialist",
        provider: "UCAD AI Center",
        url: "https://ucad.sn/certifications/nlp-specialist"
      };
      break;

    case "mlops":
      goal.careerOpportunities = [
        {
          title: "MLOps Engineer",
          description: "Déploiement et maintenance de modèles ML en production",
          averageSalary: "50-80k€/an",
          companies: ["OVHcloud", "Datadog", "Contentsquare", "Doctolib"]
        },
        {
          title: "DevOps AI Specialist",
          description: "Automatisation et monitoring de pipelines ML",
          averageSalary: "55-85k€/an",
          companies: ["Google", "Amazon", "Microsoft", "Scale AI"]
        }
      ];
      goal.certification = {
        available: true,
        name: "UCAD MLOps Professional",
        provider: "UCAD AI Center",
        url: "https://ucad.sn/certifications/mlops-pro"
      };
      break;

    case "dl":
      goal.careerOpportunities = [
        {
          title: "Deep Learning Engineer",
          description: "Conception et optimisation de réseaux de neurones",
          averageSalary: "45-75k€/an",
          companies: ["DeepMind", "Meta AI", "Tesla", "NVIDIA"]
        },
        {
          title: "AI Research Scientist",
          description: "R&D en deep learning et architectures avancées",
          averageSalary: "50-90k€/an",
          companies: ["FAIR", "Google Brain", "OpenAI", "DeepMind"]
        }
      ];
      goal.certification = {
        available: true,
        name: "UCAD Deep Learning Expert",
        provider: "UCAD AI Center",
        url: "https://ucad.sn/certifications/dl-expert"
      };
      break;

    case "robotics":
      goal.careerOpportunities = [
        {
          title: "Robotics AI Engineer",
          description: "Développement de solutions IA pour la robotique",
          averageSalary: "45-75k€/an",
          companies: ["Boston Dynamics", "PAL Robotics", "SoftBank Robotics", "ABB"]
        },
        {
          title: "Autonomous Systems Engineer",
          description: "Conception de systèmes robotiques autonomes",
          averageSalary: "50-80k€/an",
          companies: ["Airbus", "Thales", "Dassault", "Naval Group"]
        }
      ];
      goal.certification = {
        available: true,
        name: "UCAD Robotics AI Specialist",
        provider: "UCAD AI Center",
        url: "https://ucad.sn/certifications/robotics-ai"
      };
      break;

    case "quantum_ml":
      goal.careerOpportunities = [
        {
          title: "Quantum ML Researcher",
          description: "R&D en apprentissage automatique quantique",
          averageSalary: "60-100k€/an",
          companies: ["IBM Quantum", "Google Quantum", "Atos", "IQM"]
        },
        {
          title: "Quantum Computing Engineer",
          description: "Développement d'algorithmes quantiques pour l'IA",
          averageSalary: "55-95k€/an",
          companies: ["Pasqal", "Quandela", "Xanadu", "D-Wave"]
        }
      ];
      goal.certification = {
        available: true,
        name: "UCAD Quantum ML Pioneer",
        provider: "UCAD AI Center",
        url: "https://ucad.sn/certifications/quantum-ml"
      };
      break;
  }
});

// ... (reste du fichier inchangé)