
import { TaskModel } from "../models/task.js";
import multer from 'multer';
import fs from 'fs';
import path from 'path';

// Configure upload directories
const uploadDir = path.join(process.cwd(), 'uploads');
const initialUploadDir = path.join(uploadDir, 'initial');
const submittedUploadDir = path.join(uploadDir, 'submitted');

// Create directories if they don't exist
[uploadDir, initialUploadDir, submittedUploadDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Common file filter configuration
const ALLOWED_EXTENSIONS = [
  '.pdf', '.docx', '.doc', '.txt', '.csv', '.jpg', '.jpeg', '.png'
];

const ALLOWED_MIMETYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/msword',
  'text/plain',
  'text/csv',
  'image/jpeg',
  'image/png'
];

// Multer configurations (unchanged)
export const uploadInitialFiles = multer({
  storage: multer.diskStorage({
    destination: initialUploadDir,
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
      cb(null, uniqueName);
    }
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ALLOWED_EXTENSIONS.includes(ext) && ALLOWED_MIMETYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type. Only ${ALLOWED_EXTENSIONS.join(', ')} files are allowed.`), false);
    }
  }
});

export const uploadSubmittedFiles = multer({
  storage: multer.diskStorage({
    destination: submittedUploadDir,
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
      cb(null, uniqueName);
    }
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ALLOWED_EXTENSIONS.includes(ext) && ALLOWED_MIMETYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type. Only ${ALLOWED_EXTENSIONS.join(', ')} files are allowed.`), false);
    }
  }
});

// Get task files
export const getTaskFiles = async (req, res) => {
  try {
    const task = await TaskModel.findById(req.params.taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.status(200).json({
      initialFiles: task.initialFiles || [],
      submittedFiles: task.submittedFiles || []
    });
  } catch (err) {
    res.status(500).json({
      error: 'Failed to fetch task files',
      details: err.message
    });
  }
};

// Controller for initial task file upload
export const uploadInitialTaskFiles = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ 
        error: 'No files uploaded',
        details: 'Please upload at least one file'
      });
    }

    const task = new TaskModel({
      initialFiles: req.files.map(file => 
        path.join('initial', file.filename).replace(/\\/g, '/')
      ),
      job: req.params.jobId,
      status: 'pending',
      createdBy: req.user?._id
    });

    await task.save();

    res.status(201).json({
      task: {
        _id: task._id,
        initialFiles: task.initialFiles,
        job: task.job,
        status: task.status
      }
    });

  } catch (err) {
    // Cleanup uploaded files on error
    if (req.files) {
      req.files.forEach(file => {
        const filePath = path.join(initialUploadDir, file.filename);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      });
    }

    res.status(400).json({
      error: 'Initial task upload failed',
      details: err.message
    });
  }
};

// Controller for submitting completed task files
export const saveTaskDocument = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const updateData = {
      submittedFiles: req.files.map(file => 
        path.join('submitted', file.filename).replace(/\\/g, '/')
      ),
      status: 'completed'
    };

    if (req.body.evaluationScore) {
      updateData.evaluationScore = req.body.evaluationScore;
    }

    const updatedTask = await TaskModel.findByIdAndUpdate(
      req.params.taskId,
      updateData,
      { new: true }
    );

    if (!updatedTask) {
      // Cleanup uploaded files if task not found
      req.files.forEach(file => {
        const filePath = path.join(submittedUploadDir, file.filename);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      });
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json(updatedTask);
  } catch (err) {
    // Cleanup files on error
    if (req.files) {
      req.files.forEach(file => {
        const filePath = path.join(submittedUploadDir, file.filename);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      });
    }
    
    res.status(500).json({
      error: 'Failed to save task documents',
      details: err.message
    });
  }
};

// Other controller functions (updated to handle new file structure)
export const createTask = async (req, res) => {
  try {
    const task = new TaskModel({
      ...req.body,
      initialFiles: req.body.initialFiles || [],
      submittedFiles: req.body.submittedFiles || []
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({
      error: 'Task creation failed',
      details: err.message
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await TaskModel.findByIdAndUpdate(
      req.params.taskId,
      {
        ...req.body,
        // Prevent accidental overwrite of files
        initialFiles: req.body.initialFiles || undefined,
        submittedFiles: req.body.submittedFiles || undefined
      },
      { new: true, runValidators: true }
    );
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({
      error: 'Task update failed',
      details: err.message
    });
  }
};

export const getTasksForJob = async (req, res) => {
  try {
    const tasks = await TaskModel.find({ job: req.params.jobId })
      .populate('job')
      .populate('assignedTo')
      .populate('createdBy');
    res.status(200).json(tasks);
  } catch (err) {
    res.status(400).json({
      error: 'Failed to fetch tasks',
      details: err.message
    });
  }
};

export const getTasksForUser = async (req, res) => {
  try {
    const tasks = await TaskModel.find({ assignedTo: req.params.userId })
      .populate('job')
      .populate('assignedTo')
      .populate('createdBy');
    res.status(200).json(tasks);
  } catch (err) {
    res.status(400).json({
      error: 'Failed to fetch user tasks',
      details: err.message
    });
  }
};