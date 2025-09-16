import express from 'express';
import {
  attemptAssessment,
  evaluateAssessment,
  getAssessment,
  getUserAssessments,
  getAssessmentResults
} from '../controllers/assessmentController.js';


const router = express.Router();

// Protected routes
router.post('/attempt', attemptAssessment);
router.post('/evaluate', evaluateAssessment);
router.get('/:id', getAssessment);
router.get('/user/:userId',  getUserAssessments);
router.get('/results/:assessmentId',  getAssessmentResults);

export default router;