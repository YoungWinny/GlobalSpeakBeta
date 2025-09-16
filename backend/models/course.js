// import mongoose from 'mongoose';

// const courseSchema = new mongoose.Schema({
//   courseID: { type: String, required: true, unique: true },
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   duration: { type: Number, required: true }, // in hours
//   language: { type: String, required: true },
//   level: { 
//     type: String, 
//     enum: ['Beginner', 'Intermediate', 'Advanced'], 
//     required: true 
//   },
//   specialization: {
//     type: String,
//     enum: ['translation', 'transcription'],
//     required: true
//   },
//   status: { 
//     type: String, 
//     enum: ['draft', 'published', 'archived'], 
//     default: 'draft' 
//   },
//   creator: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: 'User', 
//     required: true 
//   },
//   thumbnail: String,
//   price: { type: Number, default: 0 },
//   tags: [String],
//   rating: {
//     average: { type: Number, default: 0 },
//     count: { type: Number, default: 0 }
//   }
// }, {
//   timestamps: true
// });

// export default mongoose.model('Course', courseSchema);

import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, default: 0 }, // in hours
  language: { type: String, required: true },
  level: { 
    type: String, 
    enum: ['Beginner', 'Intermediate', 'Advanced'], 
    required: true 
  },
  specialization: {
    type: String,
    enum: ['translation', 'transcription'],
    required: true
  },
  status: { 
    type: String, 
    enum: ['draft', 'published', 'archived'], 
    default: 'draft' 
  },
  creator: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  thumbnail: String,
  outline: String, // Added outline field to store generated outline
  price: { type: Number, default: 0 },
  tags: [String],
  rating: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

export default mongoose.model('Course', courseSchema);