// models/Assessment.js
import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  id: String,
  text: String,
  type: {
    type: String,
    enum: ['mcq', 'fill-blank', 'essay', 'short-answer'],
    required: true
  },
  options: [{
    id: String,
    text: String,
    isCorrect: Boolean
  }],
  answer: String, // For fill-in-the-blank questions
  points: {
    type: Number,
    default: 1
  },
  explanation: String
});

const assessmentSchema = new mongoose.Schema({
  assessmentID: {
    type: String,
    required: true,
    unique: true
  },
  courseID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  questions: [questionSchema],
  passingScore: {
    type: Number,
    default: 70
  },
  timeLimit: {
    type: Number, // in minutes
    default: 30
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  attemptsAllowed: {
    type: Number,
    default: 3
  }
}, {
  timestamps: true
});

export default mongoose.model('Assessment', assessmentSchema);