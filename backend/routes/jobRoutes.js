import express from 'express';
const router = express.Router();
import { createJob, getAllJobs, updateJob, deleteJob,getJobById } from '../controllers/jobController.js';



// CRUD operations
// router.post('/jobs', createJob);
router.post('/jobs', createJob);
router.get('/jobs', getAllJobs);
router.get('/getjobs/:id', getJobById);
router.put('/updatejobs/:id', updateJob);
router.delete('/deletejobs/:id', deleteJob);

export default router;