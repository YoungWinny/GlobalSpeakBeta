import Job from "../models/job.js";
import { ExamModel } from "../models/exam.js";
import path from 'path';

// Get a single job by ID
export const getJobById = async (req, res) => {
  const { id } = req.params;
  console.log("Job id:", id);

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

export const createJob = async (req, res) => {
  const { userId, title, description, category, salary, location, jobType, experience } = req.body;

  try {
    const newJob = await Job.create({
      userId,
      title,
      description,
      category,
      salary,
      location,
      jobType,
      experience
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

// Get all jobs with exam information
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    const jobList = [];
    
    for(const job of jobs){
      // Check if exam exists for this job
      const exam = await ExamModel.find({ job: job?._id });
      jobList.push({
        ...job._doc,
        examSet: exam.length > 0,
        exam: exam.length > 0 ? exam : null
      });
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
