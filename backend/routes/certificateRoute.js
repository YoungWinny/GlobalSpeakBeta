import express from 'express';
import {
  generateCertificate,
  verifyCertificate,
  getUserCertificates,
  downloadCertificate
} from '../controllers/certificateController.js';


const router = express.Router();

// Public routes
router.get('/verify/:code', verifyCertificate);

// Protected routes
router.post('/generate',  generateCertificate);
router.get('/user/:userId',  getUserCertificates);
router.get('/download/:certificateId', downloadCertificate);

export default router;