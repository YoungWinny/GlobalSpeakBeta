

import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  status: {
    type: String,
    enum: ['pending', 'assigned', 'in progress', 'completed', 'reviewed'],
    default: 'pending'
  },
  initialFiles: [{  // Files uploaded by recruiter (task instructions)
    type: String,
  }],
  submittedFiles: [{  // Files submitted by job seeker (completed work)
    type: String,
  }],
  payment: {
    amount: String,
    message: String
  },
  rating: {
    type: Number, 
    min: 1,
    max: 5,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

const TaskModel = mongoose.model('Task', TaskSchema);
export { TaskModel };