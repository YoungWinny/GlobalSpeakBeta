import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  jobSeeker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // References the Job Seeker receiving the payment
    required: true,
  },
  recruiter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // References the Recruiter making the payment
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending',
  }
}, {
  timestamps: true
});

const PaymentModel = mongoose.model('Payment', PaymentSchema);
export { PaymentModel as Payment };
