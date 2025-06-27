import Job from "../models/job.js";
import multer from 'multer';
import fs from 'fs';
import path from 'path'
import { ExamModel } from "../models/exam.js";
const __dirname = path.dirname(import.meta.url);

// Get a single job by ID
export const getJobById = async (req, res) => {
  const { id } = req.params;
  console.log("Job id:",id);

  try {
    const job = await Job.findById(id)
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }
    res.status(200).json(job);
  } catch (err) {
    console.error("Error fetching job by ID:", err);
    res.status(400).json({ error: err.message });
  }
};

// Ensure the 'uploads/' directory exists before storing files
const uploadDir = path.join(process.cwd(), 'uploads'); // __dirname might not work, use process.cwd()
if (!fs.existsSync(uploadDir)) {
  console.log("Creating 'uploads/' directory");
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Now continue with the multer storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("Storing file in 'uploads/'");
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    console.log("Generating unique filename for:", file.originalname);
    cb(null, Date.now() + '-' + file.originalname);
  },
});

export const upload = multer({ storage });

export const createJob = async (req, res) => {
  const { userId, title, description, category, salary, location, jobType, experience } = req.body;
  const files = req.files; // This will hold the uploaded files

  if (!files || files.length === 0) {
    console.error("No files uploaded");
    return res.status(400).json({ error: "No files uploaded" });
  }

  try {
    const newJob = await Job.create({
      userId,
      title,
      description,
      category,
      salary,
      location,
      jobType,
      experience,
      files: files.map(file => file.path), // Save file paths in the database
    });
    console.log("Job created successfully:", newJob);
    res.status(201).json(newJob);
  } catch (err) {
    console.error("Error creating job:", err);
    res.status(400).json({ error: err.message });
  }
};

// Update a job
export const updateJob = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  try {
    const updatedJob = await Job.findByIdAndUpdate(
      id,
      { title, description, status },
      { new: true }
    );
    res.status(200).json(updatedJob);
  } catch (err) {
    console.error("Error updating job:", err);
    res.status(400).json({ error: err.message });
  }
};

// Get all jobs
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    const jobList = []
    for(const job of jobs){
      const files = job?.files?.map((filename) => {
        let filePath = '';
        if(filename){
          filePath = path.join(__dirname.replace('controllers',''), filename);
        }
  
        return filePath;
       })
  
       job.files = files;

        const val = await ExamModel.find({job: job?._id});
        jobList.push({...job?._doc, examSet: val?.length > 0 ? true: false, exam: val});
    }

    res.status(200).json(jobList);
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(400).json({ error: err.message });
  }
};

// Delete a job
export const deleteJob = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedJob = await Job.findByIdAndDelete(id);
    if (!deletedJob) return res.status(404).json({ error: "Job not found" });
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(400).json({ error: error.message });
  }
};
