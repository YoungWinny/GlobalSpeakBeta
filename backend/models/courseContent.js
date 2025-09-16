// models/CourseContent.js
import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  contentID: {
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
  type: {
    type: String,
    enum: ['lesson', 'exercise', 'assessment', 'resource'],
    required: true
  },
  filePath: String,
  content: String, // For text-based content
  media: [{
    type: {
      type: String,
      enum: ['image', 'video', 'audio']
    },
    url: String,
    caption: String
  }],
  createdBy: {
    type: String,
    enum: ['admin', 'ai'],
    default: 'admin'
  },
  order: {
    type: Number,
    required: true
  },
  duration: Number, // in minutes
  objectives: [String],
  isPublished: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export default mongoose.model('CourseContent', contentSchema);