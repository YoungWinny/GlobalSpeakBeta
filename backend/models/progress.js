const progressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  completedLessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
  exerciseScores: [{
    exercise: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' },
    score: Number,
    attempts: Number,
    lastAttempt: Date
  }],
  assessmentResults: [{
    assessment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assessment' },
    score: Number,
    passed: Boolean,
    dateCompleted: Date
  }],
  certificateEarned: { type: Boolean, default: false }
});