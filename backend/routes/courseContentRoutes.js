// // import express from 'express';
// // import {
// //   createContent,
// //   getContent,
// //   updateContent,
// //   deleteContent,
// //   getCourseContent,
// //   reorderContent,
// //   generateAIContent,
// //   modifyTextWithAI
// // } from '../controllers/courseContentController.js';


// // const router = express.Router();

// // // Protected routes
// // router.post('/',createContent);
// // router.get('/:id', getContent);
// // router.put('/:id', updateContent);
// // router.delete('/:id', deleteContent);
// // router.get('/course/:courseId',getCourseContent);
// // router.put('/course/:courseId/reorder', reorderContent);

// // // AI content generation routes - THESE ARE THE CRITICAL ONES
// // router.post('/ai/generate', generateAIContent);
// // router.post('/ai/modify-text', modifyTextWithAI);


// // export default router;


// import express from 'express';
// import {
//   createContent,
//   getContent,
//   updateContent,
//   deleteContent,
//   getCourseContent,
//   reorderContent,
//   generateAIContent,
//   modifyTextWithAI,
// } from '../controllers/courseContentController.js';

// console.log('=== COURSE CONTENT ROUTES LOADING ===');

// // Debug: Check if controller functions are available
// console.log('Checking controller functions:');
// try {
//   console.log('createContent:', typeof createContent);
//   console.log('getContent:', typeof getContent);
//   console.log('updateContent:', typeof updateContent);
//   console.log('deleteContent:', typeof deleteContent);
//   console.log('getCourseContent:', typeof getCourseContent);
//   console.log('reorderContent:', typeof reorderContent);
//   console.log('generateAIContent:', typeof generateAIContent);
//   console.log('modifyTextWithAI:', typeof modifyTextWithAI);
// } catch (error) {
//   console.error('Error checking controllers:', error);
// }

// const router = express.Router();

// // Add routes one by one with error handling
// try {
//   router.post('/', createContent);
//   console.log('✓ POST / route registered');
// } catch (error) {
//   console.error('✗ Failed to register POST /:', error);
// }

// try {
//   router.get('/:id', getContent);
//   console.log('✓ GET /:id route registered');
// } catch (error) {
//   console.error('✗ Failed to register GET /:id:', error);
// }

// try {
//   router.put('/:id', updateContent);
//   console.log('✓ PUT /:id route registered');
// } catch (error) {
//   console.error('✗ Failed to register PUT /:id:', error);
// }

// try {
//   router.delete('/:id', deleteContent);
//   console.log('✓ DELETE /:id route registered');
// } catch (error) {
//   console.error('✗ Failed to register DELETE /:id:', error);
// }

// try {
//   router.get('/course/:courseId', getCourseContent);
//   console.log('✓ GET /course/:courseId route registered');
// } catch (error) {
//   console.error('✗ Failed to register GET /course/:courseId:', error);
// }

// try {
//   router.put('/course/:courseId/reorder', reorderContent);
//   console.log('✓ PUT /course/:courseId/reorder route registered');
// } catch (error) {
//   console.error('✗ Failed to register PUT /course/:courseId/reorder:', error);
// }

// // AI routes - THESE ARE THE ONES WE NEED
// try {
//   router.post('/ai/generate', generateAIContent);
//   console.log('✓ POST /ai/generate route registered');
// } catch (error) {
//   console.error('✗ Failed to register POST /ai/generate:', error);
// }

// try {
//   router.post('/ai/modify-text', modifyTextWithAI);
//   console.log('✓ POST /ai/modify-text route registered');
// } catch (error) {
//   console.error('✗ Failed to register POST /ai/modify-text:', error);
// }

// // Debug routes
// try {
//   router.get('/debug/test', (req, res) => {
//     res.json({ message: 'Content routes are working!', timestamp: new Date().toISOString() });
//   });
//   console.log('✓ GET /debug/test route registered');
// } catch (error) {
//   console.error('✗ Failed to register GET /debug/test:', error);
// }

// try {
//   router.post('/debug/echo', (req, res) => {
//     res.json({ 
//       message: 'Echo received', 
//       body: req.body,
//       timestamp: new Date().toISOString()
//     });
//   });
//   console.log('✓ POST /debug/echo route registered');
// } catch (error) {
//   console.error('✗ Failed to register POST /debug/echo:', error);
// }

// console.log('=== COURSE CONTENT ROUTES LOADED ===');
// export default router;

import express from 'express';
import {
  createContent,
  getContent,
  updateContent,
  deleteContent,
  getCourseContent,
  reorderContent,
  generateAIContent,
  modifyTextWithAI,
  publishContent,
  unpublishContent,
  getContentByType,
  debugContent
} from '../controllers/courseContentController.js';

console.log('=== COURSE CONTENT ROUTES LOADING ===');

// Debug: Check if controller functions are available
console.log('Checking controller functions:');
console.log('createContent:', typeof createContent);
console.log('getContent:', typeof getContent);
console.log('updateContent:', typeof updateContent);
console.log('deleteContent:', typeof deleteContent);
console.log('getCourseContent:', typeof getCourseContent);
console.log('reorderContent:', typeof reorderContent);
console.log('generateAIContent:', typeof generateAIContent);
console.log('modifyTextWithAI:', typeof modifyTextWithAI);
console.log('publishContent:', typeof publishContent);
console.log('unpublishContent:', typeof unpublishContent);
console.log('getContentByType:', typeof getContentByType);
console.log('debugContent:', typeof debugContent);

const router = express.Router();

// Basic CRUD routes
router.post('/', createContent);
router.get('/:id', getContent);
router.put('/:id', updateContent);
router.delete('/:id', deleteContent);

// Course-specific routes
router.get('/course/:courseId', getCourseContent);
router.put('/course/:courseId/reorder', reorderContent);
router.get('/course/:courseId/type/:type', getContentByType);

// Publish/unpublish routes
router.patch('/:id/publish', publishContent);
router.patch('/:id/unpublish', unpublishContent);

// AI routes
router.post('/ai/generate', generateAIContent);
router.post('/ai/modify-text', modifyTextWithAI);

// Debug routes
router.get('/debug/test', debugContent);
router.post('/debug/echo', (req, res) => {
  res.json({ 
    message: 'Echo received', 
    body: req.body,
    timestamp: new Date().toISOString()
  });
});

console.log('=== COURSE CONTENT ROUTES LOADED ===');
export default router;