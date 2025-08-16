const exerciseSchema = new mongoose.Schema({
  lesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true },
  type: { type: String, enum: ['mcq', 'fill-blank', 'translation', 'matching'], required: true },
  question: { type: String, required: true },
  options: [{ 
    text: String,
    isCorrect: Boolean 
  }],
  explanation: String,
  aiGenerated: { type: Boolean, default: false },
  difficulty: { type: Number, min: 1, max: 5, default: 3 }
});
