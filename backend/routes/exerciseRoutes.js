import express from 'express';
import {
  attemptExercise,
  evaluateExercise,
  getExercise,
  getExerciseProgress,
  getUserExercises
} from '../controllers/exerciseController.js';


const router = express.Router();

// Protected routes
router.post('/attempt', attemptExercise);
router.post('/evaluate', evaluateExercise);
router.get('/:id',  getExercise);
router.get('/progress/:contentId', getExerciseProgress);
router.get('/user/:userId',  getUserExercises);

export default router;