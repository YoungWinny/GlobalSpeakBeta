// // models/Certificate.js
// const mongoose = require('mongoose');

// const certificateSchema = new mongoose.Schema({
//   certificateID: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   course: {
//     type: String,
//     ref: 'Course',
//     required: true
//   },
//   learner: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   issueDate: {
//     type: Date,
//     default: Date.now
//   },
//   score: {
//     type: Number,
//     required: true
//   },
//   verificationCode: {
//     type: String,
//     unique: true
//   }
// }, {
//   timestamps: true
// });

// // Generate certificateID and verificationCode before saving
// certificateSchema.pre('save', async function(next) {
//   if (!this.certificateID) {
//     const count = await mongoose.model('Certificate').countDocuments();
//     this.certificateID = `CERT${(count + 1).toString().padStart(4, '0')}`;
//   }
  
//   if (!this.verificationCode) {
//     this.verificationCode = Math.random().toString(36).substring(2, 10).toUpperCase();
//   }
//   next();
// });

// module.exports = mongoose.model('Certificate', certificateSchema);









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