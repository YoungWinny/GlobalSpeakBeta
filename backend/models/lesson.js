const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }, // Markdown content
  examples: [{
    text: String,
    explanation: String,
    aiGenerated: { type: Boolean, default: false }
  }],
  media: [{
    url: String,
    type: { type: String, enum: ['image', 'video', 'audio'] },
    caption: String
  }],
  order: { type: Number, required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }
});