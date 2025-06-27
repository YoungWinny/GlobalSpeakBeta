import express from 'express';
const router = express.Router();
import { createJob, getAllJobs, updateJob, deleteJob,upload,getJobById } from '../controllers/jobController.js';



// CRUD operations
// router.post('/jobs', createJob);
router.post('/jobs', upload.array('files', 10), createJob);
router.get('/jobs', getAllJobs);
router.get('/getjobs/:id', getJobById);
router.put('/updatejobs/:id', updateJob);
router.delete('/deletejobs/:id', deleteJob);

//routes
//CREATE JOB || POST
// router.post('/create-job',)

export default router;