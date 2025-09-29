// import express from 'express';
// import {
//   createCourse,
//   getCourses,
//   getCourse,
//   updateCourse,
//   deleteCourse,
//   getCourseContent,
//   enrollCourse,
//   getEnrolledCourses,
//   // testToken 
// } from '../controllers/courseController.js';


// const router = express.Router();

// // Public routes
// router.get('/', getCourses);
// router.get('/:id', getCourse);

// // // Test route for debugging
// // router.get('/debug/token', testToken); // Add this route

// // Protected routes
// router.post('/', createCourse);
// router.patch('/:id', updateCourse);
// router.delete('/:id', deleteCourse);
// router.get('/:id/content',  getCourseContent);
// router.post('/:id/enroll',  enrollCourse);
// router.get('/user/enrolled',  getEnrolledCourses);

// export default router;


import express from 'express';
import {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
  publishCourse,
  unpublishCourse,
  getCreatorCourses,
  enrollCourse,
  getEnrolledCourses,
  getCourseContent,
  archiveCourse,
  restoreCourse,
  getCourseStats
} from '../controllers/courseController.js';

const router = express.Router();

// Public routes
router.get('/', getCourses);
router.get('/:id', getCourse);
router.get('/:id/content', getCourseContent);
router.post('/:id/enroll', enrollCourse);
router.get('/user/enrolled', getEnrolledCourses);

// Creator routes (protected)
router.post('/', createCourse);
router.patch('/:id', updateCourse);
router.delete('/:id', deleteCourse);
router.patch('/:id/publish', publishCourse);
router.patch('/:id/unpublish', unpublishCourse);
router.patch('/:id/archive', archiveCourse);
router.patch('/:id/restore', restoreCourse);
router.get('/creator/:userId', getCreatorCourses);
router.get('/:id/stats', getCourseStats);

export default router;