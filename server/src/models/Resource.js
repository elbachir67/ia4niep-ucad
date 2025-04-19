import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
  step: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Step',
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
  url: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['article', 'video', 'course', 'book', 'use_case'],
    required: true
  },
  level: {
    type: String,
    enum: ['basic', 'intermediate', 'advanced'],
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  language: {
    type: String,
    enum: ['fr', 'en'],
    required: true
  },
  isPremium: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

resourceSchema.index({ step: 1, type: 1, level: 1 });

export const Resource = mongoose.model('Resource', resourceSchema);