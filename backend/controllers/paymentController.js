import { Payment } from '../models/Payment.js';

// Create a new payment
export const createPayment = async (req, res) => {
  const { amount, jobSeeker, recruiter, status } = req.body;
  
  try {
    const newPayment = new Payment({ amount, jobSeeker, recruiter, status });
    await newPayment.save();
    res.status(201).json(newPayment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update payment status
export const updatePaymentStatus = async (req, res) => {
  const { paymentId } = req.params;
  const { status } = req.body;
  
  try {
    const updatedPayment = await Payment.findByIdAndUpdate(paymentId, { status }, { new: true });
    res.status(200).json(updatedPayment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get payments for a job seeker
export const getPaymentsForJobSeeker = async (req, res) => {
  const { jobSeekerId } = req.params;
  
  try {
    const payments = await Payment.find({ jobSeeker: jobSeekerId });
    res.status(200).json(payments);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
