import mongoose from 'mongoose';

const stepSchema = new mongoose.Schema({
  section: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Section',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  fullDetails: {
    type: String,
    required: true
  },
  prerequisites: [{
    type: String
  }],
  learningObjectives: [{
    type: String
  }],
  order: {
    type: Number,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true
  }
}, {
  timestamps: true
});

stepSchema.index({ section: 1, order: 1 });

export const Step = mongoose.model('Step', stepSchema);