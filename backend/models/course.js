const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  language: { type: String, required: true },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
  description: { type: String, required: true },
  outline: { type: String },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  published: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }]
});