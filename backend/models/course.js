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

// import mongoose from 'mongoose';

// const courseSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   duration: { type: Number, default: 0 },
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
//   outline: String,
//   price: { type: Number, default: 0 },
//   tags: [String],
//   rating: {
//     average: { type: Number, default: 0 },
//     count: { type: Number, default: 0 }
//   },
//   lessons: [{
//     title: String,
//     content: String,
//     order: Number,
//     duration: Number,
//     objectives: [String],
//     isPublished: { type: Boolean, default: false }
//   }]
// }, {
//   timestamps: true
// });

// export default mongoose.model('Course', courseSchema);

import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  courseID: { 
    type: String, 
    unique: true,
    sparse: true // This allows null values but maintains uniqueness for non-null values
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, default: 0 },
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
  outline: String,
  price: { type: Number, default: 0 },
  tags: [String],
  rating: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  },
  lessons: [{
    title: String,
    content: String,
    order: Number,
    duration: Number,
    objectives: [String],
    isPublished: { type: Boolean, default: false }
  }]
}, {
  timestamps: true
});

// Pre-save middleware to generate courseID if not provided
courseSchema.pre('save', function(next) {
  if (!this.courseID) {
    // Generate a unique courseID using timestamp and random string
    this.courseID = `course_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  next();
});

export default mongoose.model('Course', courseSchema);