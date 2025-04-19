import mongoose from 'mongoose';

const sectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    required: true
  },
  icon: {
    type: String,
    enum: ['brain', 'database', 'code', 'bot', 'book', 'sparkles'],
    required: true
  }
}, {
  timestamps: true
});

sectionSchema.index({ order: 1 });

export const Section = mongoose.model('Section', sectionSchema);