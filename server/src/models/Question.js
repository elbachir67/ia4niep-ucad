import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['math', 'programming', 'ml', 'dl', 'computer_vision', 'nlp', 'mlops']
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['basic', 'intermediate', 'advanced']
  },
  options: [{
    text: {
      type: String,
      required: true
    },
    isCorrect: {
      type: Boolean,
      required: true
    }
  }],
  explanation: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

questionSchema.index({ category: 1, difficulty: 1 });

export const Question = mongoose.model('Question', questionSchema);