const assessmentSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  title: { type: String, required: true },
  questions: [{
    type: { type: String, enum: ['mcq', 'essay', 'short-answer'], required: true },
    text: { type: String, required: true },
    options: [{ text: String, isCorrect: Boolean }], // For MCQs
    modelAnswer: String, // For essay/short answer
    points: { type: Number, default: 1 }
  }],
  passingScore: { type: Number, default: 70 },
  timeLimit: { type: Number, default: 30 } // in minutes
});
