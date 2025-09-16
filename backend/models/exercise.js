// models/Exercise.js
import mongoose from 'mongoose';

const optionSchema = new mongoose.Schema({
  id: String,
  text: String,
  isCorrect: Boolean
});

const exerciseSchema = new mongoose.Schema({
  exerciseID: {
    type: String,
    required: true,
    unique: true
  },
  contentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CourseContent',
    required: true
  },
  courseID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  type: {
    type: String,
    enum: ['mcq', 'fill-blank', 'translation', 'transcription', 'matching'],
    required: true
  },
  question: {
    type: String,
    required: true
  },
  sourceText: String, // For translation/transcription exercises
  targetLanguage: String, // For translation exercises
  options: [optionSchema],
  answer: String, // For fill-in-the-blank exercises
  explanation: String,
  hint: String,
  points: {
    type: Number,
    default: 10
  },
  audio: String, // URL to audio file
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  }
}, {
  timestamps: true
});

export default mongoose.model('Exercise', exerciseSchema);