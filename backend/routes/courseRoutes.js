import express from 'express';
import {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
  getCourseContent,
  enrollCourse,
  getEnrolledCourses
} from '../controllers/courseController.js';


const router = express.Router();

// Public routes
router.get('/', getCourses);
router.get('/:id', getCourse);

// Protected routes
router.post('/', createCourse);
router.patch('/:id', updateCourse);
router.delete('/:id', deleteCourse);
router.get('/:id/content',  getCourseContent);
router.post('/:id/enroll',  enrollCourse);
router.get('/user/enrolled',  getEnrolledCourses);

export default router;