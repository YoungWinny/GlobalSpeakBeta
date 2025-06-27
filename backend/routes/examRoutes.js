import express from 'express';
import { createExam, getAllExams, getOneExamsByJob } from '../controllers/examController.js';

const router = express.Router();

router.post('/exam', createExam);
router.get("/exam", getAllExams)
router.get("/exam/:id", getOneExamsByJob)


export default router;