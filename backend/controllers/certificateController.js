import Certificate from '../models/certificate.js';
import Course from '../models/course.js';
import {User} from '../models/user.js';
import { v4 as uuidv4 } from 'uuid';

// Generate certificate
export const generateCertificate = async (req, res) => {
  try {
    const { courseId, learnerId, score } = req.body;
    
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    const learner = await User.findById(learnerId);
    if (!learner) {
      return res.status(404).json({ message: 'Learner not found' });
    }
    
    // Check if certificate already exists
    const existingCertificate = await Certificate.findOne({
      course: courseId,
      learner: learnerId
    });
    
    if (existingCertificate) {
      return res.status(400).json({ message: 'Certificate already exists' });
    }
    
    const certificate = new Certificate({
      certificateID: `cert_${Date.now()}`,
      course: courseId,
      learner: learnerId,
      score,
      verificationCode: uuidv4(),
      expirationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year from now
    });
    
    const savedCertificate = await certificate.save();
    res.status(201).json(savedCertificate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Verify certificate
export const verifyCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findOne({
      verificationCode: req.params.code
    })
    .populate('course', 'title description')
    .populate('learner', 'name email');
    
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }
    
    if (certificate.expirationDate < new Date()) {
      return res.status(400).json({ message: 'Certificate has expired' });
    }
    
    res.json(certificate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user certificates
export const getUserCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find({ learner: req.params.userId })
      .populate('course', 'title description thumbnail')
      .sort({ issueDate: -1 });
    
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Download certificate
export const downloadCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.certificateId)
      .populate('course', 'title')
      .populate('learner', 'name');
    
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }
    
    // Check if user owns this certificate
    if (certificate.learner._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    // In a real implementation, you would generate a PDF here
    // For now, we'll just return the certificate data
    res.json({
      message: 'Certificate download',
      certificate,
      downloadUrl: `/api/certificates/${certificate._id}/pdf` // This would be the actual download endpoint
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};