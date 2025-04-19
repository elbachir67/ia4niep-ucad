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
  }
}, { timestamps: true });

export const Resource = mongoose.model('Resource', resourceSchema);