// // models/CourseContent.js
// import mongoose from 'mongoose';

// const contentSchema = new mongoose.Schema({
//   course: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Course',
//     required: true
//   },
//   title: {
//     type: String,
//     required: true
//   },
//   type: {
//     type: String,
//     enum: ['lesson', 'exercise', 'assessment', 'resource'],
//     required: true
//   },
//   filePath: String,
//   content: String, // For text-based content
//   media: [{
//     type: {
//       type: String,
//       enum: ['image', 'video', 'audio']
//     },
//     url: String,
//     caption: String
//   }],
//   createdBy: {
//     type: String,
//     enum: ['admin', 'ai'],
//     default: 'admin'
//   },
//   order: {
//     type: Number,
//     required: true
//   },
//   duration: Number, // in minutes
//   objectives: [String],
//   isPublished: {
//     type: Boolean,
//     default: false
//   }
// }, {
//   timestamps: true
// });

// export default mongoose.model('CourseContent', contentSchema);



import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['image', 'video', 'audio']
  },
  url: String,
  caption: String
});

const contentSchema = new mongoose.Schema({
  contentID: { 
    type: String, 
    unique: true,
    sparse: true  // <-- ADD THIS LINE
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['lesson', 'exercise', 'assessment', 'resource'],
    required: true
  },
  content: String,
  media: [mediaSchema],
  createdBy: {
    type: String,
    enum: ['admin', 'ai'],
    default: 'admin'
  },
  order: {
    type: Number,
    required: true
  },
  duration: Number,
  objectives: [String],
  isPublished: {
    type: Boolean,
    default: false
  },
  // For exercises and assessments
  questions: [{
    type: {
      type: String,
      enum: ['mcq', 'fill-blank', 'translation', 'transcription', 'essay', 'short-answer']
    },
    question: String,
    options: [{
      text: String,
      isCorrect: Boolean
    }],
    answer: String,
    points: { type: Number, default: 1 },
    explanation: String
  }],
  passingScore: { type: Number, default: 70 },
  timeLimit: Number
}, {
  timestamps: true
});

export default mongoose.model('CourseContent', contentSchema);