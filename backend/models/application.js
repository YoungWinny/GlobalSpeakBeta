import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job', // References the Job being applied for
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // References the Job being applied for
    required: true,
  },
  score: {
    type: String,
    required: true
  },
  motivation: {
    type: String,
    required: true
  },
  presentation: [{ 
    type: String,
  }],
  status: {
    type: String,
    enum: ['pending','accepted', 'rejected'],
    default: 'pending',
  }
}, {
  timestamps: true
});

const ApplicationModel = mongoose.model('Application', ApplicationSchema);
export { ApplicationModel };
