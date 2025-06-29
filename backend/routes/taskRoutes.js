import express from 'express';
import { 
  createTask, 
  updateTask, 
  uploadInitialTaskFiles, 
  getTasksForJob, 
  getTasksForUser, 
  saveTaskDocument,
  uploadInitialFiles,
  uploadSubmittedFiles,
  getTaskFiles
} from '../controllers/taskController.js';

const router = express.Router();

// Initial task files upload
router.post(
  '/tasks/initial/:jobId', 
  uploadInitialFiles.array('files', 10), 
  uploadInitialTaskFiles
);

// Task CRUD routes
router.post('/task', createTask);
router.patch("/task/:taskId", updateTask);
router.get("/task/job/:jobId", getTasksForJob);
router.get("/task/user/:userId", getTasksForUser);
router.get("/task/files/:taskId", getTaskFiles);

// Completed task files submission
router.patch(
  "/task/upload/:taskId", 
  uploadSubmittedFiles.array('files', 10),
  saveTaskDocument
);

export default router;