import mongoose from "mongoose";

const ExamSchema = new mongoose.Schema({
  questions: 
  [
    {
      question: {
        type: String,
        required: true,
      },
      option1: {
        type: String,
        required: true,
      },
      option2: {
        type: String,
        required: true,
      },
      option3: {
        type: String,
        required: true,
      },
      option4: {
        type: String,
        required: true,
      },
      answer: {
        type: String,
        required: true,
      }
    }
  ],
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  }
}, {
  timestamps: true
});

export const ExamModel = mongoose.model('Exam', ExamSchema);

