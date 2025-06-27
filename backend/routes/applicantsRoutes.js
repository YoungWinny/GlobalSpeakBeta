import express from 'express';
import { createApplication, getAllApplications, updateApplication, upload, getApplicationsForJob, deleteApplications, getApplicationsForUser} from '../controllers/applicationController.js';

const router = express.Router();

router.post('/applications', upload.array('files', 10), createApplication);
router.get("/application", getAllApplications)
router.get("/application/job/:jobId", getApplicationsForJob)
router.get("/application/user/:userId", getApplicationsForUser)
router.delete("/application/:id", deleteApplications)
router.patch("/application/:applicationId", updateApplication)


export default router;