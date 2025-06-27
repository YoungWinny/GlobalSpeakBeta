import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // References the Job Seeker who is assigned the task
    required: true,
  },
  status: {
    type: String,
    enum: ['in progress', 'completed'],
    default: 'in progress',
  },
  files: [
    { 
      type: String,
    }
  ],
  payment: {
    amount:{
      type: String
    },
    message: {
      type: String
    }
  },
  rating: {
    type: Number, 
    min: 1,
    max: 5,
  }
}, {
  timestamps: true
});

const TaskModel = mongoose.model('Task', TaskSchema);
export { TaskModel };
