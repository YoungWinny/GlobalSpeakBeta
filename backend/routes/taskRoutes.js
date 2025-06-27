// import express from 'express';
// import { createTask, updateTask, getTasksForJob, getTasksForUser, saveTaskDocument, upload } from '../controllers/taskController.js';

// const router = express.Router();

// router.post('/task', createTask);
// router.patch("/task/:taskId", updateTask)
// router.get("/task/job/:jobId", getTasksForJob)
// router.get("/task/user/:userId", getTasksForUser)
// router.patch("/task/upload/:taskId",upload.array('files', 10), saveTaskDocument)


// export default router;



import express from 'express';
import { createTask, updateTask, getTasksForJob, getTasksForUser, saveTaskDocument, upload } from '../controllers/taskController.js';

const router = express.Router();

// Task CRUD routes
router.post('/task', createTask);
router.patch("/task/:taskId", updateTask);
router.get("/task/job/:jobId", getTasksForJob);
router.get("/task/user/:userId", getTasksForUser);

// File upload route with multer middleware
router.patch(
  "/task/upload/:taskId", 
  upload.array('files', 10), // Allow up to 10 files
  saveTaskDocument
);

export default router;