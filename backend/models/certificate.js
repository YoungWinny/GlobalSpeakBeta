// models/Certificate.js
import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
  certificateID: {
    type: String,
    required: true,
    unique: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  learner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  issueDate: {
    type: Date,
    default: Date.now
  },
  score: {
    type: Number,
    required: true
  },
  expiryDate: Date,
  verificationCode: {
    type: String,
    unique: true
  },
  downloadUrl: String
}, {
  timestamps: true
});

export default mongoose.model('Certificate', certificateSchema);