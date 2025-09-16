// import express from 'express';
// import { 
//   createTask, 
//   updateTask, 
//   uploadInitialTaskFiles, 
//   getTasksForJob, 
//   getTasksForUser, 
//   saveTaskDocument,
//   uploadInitialFiles,
//   uploadSubmittedFiles,
//   getTaskFiles
// } from '../controllers/taskController.js';

// const router = express.Router();

// // Initial task files upload
// router.post(
//   '/tasks/initial/:jobId', 
//   uploadInitialFiles.array('files', 10), 
//   uploadInitialTaskFiles
// );

// // Task CRUD routes
// router.post('/task', createTask);
// router.patch("/task/:taskId", updateTask);
// router.get("/task/job/:jobId", getTasksForJob);
// router.get("/task/user/:userId", getTasksForUser);
// router.get("/task/files/:taskId", getTaskFiles);

// // Completed task files submission
// router.patch(
//   "/task/upload/:taskId", 
//   uploadSubmittedFiles.array('files', 10),
//   saveTaskDocument
// );

// export default router;







































// import express from 'express';
// import { 
//   createTask, 
//   updateTask, 
//   uploadInitialTaskFiles, 
//   getTasksForJob, 
//   getTasksForUser, 
//   saveTaskDocument,
//   uploadInitialFiles,
//   uploadSubmittedFiles,
//   getTaskFiles,
//   uploadInitialTaskFilesToExistingTask
// } from '../controllers/taskController.js';

// const router = express.Router();

// // Initial task files upload for a new task (creates task)
// router.post(
//   '/tasks/initial/:jobId', 
//   uploadInitialFiles.array('files', 10), 
//   uploadInitialTaskFiles
// );

// // Upload initial files to an existing task
// router.patch(
//   '/task/initial-upload/:taskId',
//   uploadInitialFiles.array('files', 10),
//   uploadInitialTaskFilesToExistingTask
// );

// // Task CRUD routes
// router.post('/task', createTask);
// router.patch("/task/:taskId", updateTask);
// router.get("/task/job/:jobId", getTasksForJob);
// router.get("/task/user/:userId", getTasksForUser);
// router.get("/task/files/:taskId", getTaskFiles);

// // Completed task files submission
// router.patch(
//   "/task/upload/:taskId", 
//   uploadSubmittedFiles.array('files', 10),
//   saveTaskDocument
// );

// export default router;











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
  getTaskFiles,
  uploadInitialTaskFilesToExistingTask,
  downloadFile
} from '../controllers/taskController.js';

const router = express.Router();

// Initial task files upload for a new task (creates task)
router.post(
  '/tasks/initial/:jobId', 
  uploadInitialFiles.array('files', 10), 
  uploadInitialTaskFiles
);

// Upload initial files to an existing task
router.patch(
  '/task/initial-upload/:taskId',
  uploadInitialFiles.array('files', 10),
  uploadInitialTaskFilesToExistingTask
);

// Task CRUD routes
router.post('/task', createTask);
router.patch("/task/:taskId", updateTask);
router.get("/task/job/:jobId", getTasksForJob);
router.get("/task/user/:userId", getTasksForUser);
router.get("/task/files/:taskId", getTaskFiles);

// File download route
router.get("/task/download/:type/:filename", downloadFile);

// Completed task files submission
router.patch(
  "/task/upload/:taskId", 
  uploadSubmittedFiles.array('files', 10),
  saveTaskDocument
);

export default router;