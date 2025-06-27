// import { TaskModel } from "../models/task.js";
// import multer from 'multer';
// import fs from 'fs';
// import path from 'path'
// const __dirname = path.dirname(import.meta.url);


// // Ensure the 'uploads/' directory exists before storing files
// const uploadDir = path.join(process.cwd(), 'uploads'); // __dirname might not work, use process.cwd()
// if (!fs.existsSync(uploadDir)) {
//   console.log("Creating 'uploads/' directory");
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// // Now continue with the multer storage setup
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     console.log("Storing file in 'uploads/'");
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     console.log("Generating unique filename for:", file.originalname);
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });

// export const upload = multer({ storage });

// // Create a new task
// export const createTask = async (req, res) => {
//   const { job, assignedTo } = req.body;
  
//   try {
//     const newTask = new TaskModel({ job, assignedTo });
//     await newTask.save();
//     res.status(201).json(newTask);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// // Update task status
// export const updateTask = async (req, res) => {
//   const { taskId } = req.params;
  
//   try {
//     const updatedTask = await TaskModel.findByIdAndUpdate(
//       taskId,
//       { ...req.body}
//     );
//     res.status(200).json(updatedTask);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// // Update task status
// export const saveTaskDocument = async (req, res) => {
//   const { taskId } = req.params;
//   const files = req.files;

//   if (!files || files.length === 0) {
//     console.error("No files uploaded");
//     return res.status(400).json({ error: "No files uploaded" });
//   }
  
//   try {
//     const updatedTask = await TaskModel.findByIdAndUpdate(
//       taskId,
//       {
//         files: files.map(file => file.path),
//         status: 'completed'
//       }
//     );
//     res.status(200).json(updatedTask);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// // Get all tasks for a job
// export const getTasksForJob = async (req, res) => {
//   const { jobId } = req.params;
  
//   try {
//     const tasks = await TaskModel.find({ job: jobId }).populate('job').populate('assignedTo');
//     res.status(200).json(tasks);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// export const getTasksForUser = async (req, res) => {
//   const { userId } = req.params;
  
//   try {
//     const tasks = await TaskModel.find({ assignedTo: userId }).populate('job').populate('assignedTo');
//     res.status(200).json(tasks);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };











import { TaskModel } from "../models/task.js";
import multer from 'multer';
import fs from 'fs';
import path from 'path';

// Configure upload directory
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

export const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];
    allowedTypes.includes(file.mimetype) 
      ? cb(null, true)
      : cb(new Error('Invalid file type. Only PDF, DOCX, and TXT files are allowed.'), false);
  }
});

// Create task
export const createTask = async (req, res) => {
  try {
    const task = new TaskModel(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({
      error: 'Task creation failed',
      details: err.message
    });
  }
};

// Update task
export const updateTask = async (req, res) => {
  try {
    const task = await TaskModel.findByIdAndUpdate(
      req.params.taskId,
      req.body,
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

// Save task documents
export const saveTaskDocument = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const updateData = {
      files: req.files.map(file => file.path.replace(/\\/g, '/')),
      status: 'completed'
    };

    // Add evaluation score if provided
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
      req.files.forEach(file => fs.unlinkSync(file.path));
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json(updatedTask);
  } catch (err) {
    // Cleanup files on error
    if (req.files) {
      req.files.forEach(file => {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      });
    }
    
    res.status(500).json({
      error: 'Failed to save task documents',
      details: err.message
    });
  }
};

// Get tasks for job
export const getTasksForJob = async (req, res) => {
  try {
    const tasks = await TaskModel.find({ job: req.params.jobId })
      .populate('job')
      .populate('assignedTo');
    res.status(200).json(tasks);
  } catch (err) {
    res.status(400).json({
      error: 'Failed to fetch tasks',
      details: err.message
    });
  }
};

// Get tasks for user
export const getTasksForUser = async (req, res) => {
  try {
    const tasks = await TaskModel.find({ assignedTo: req.params.userId })
      .populate('job')
      .populate('assignedTo');
    res.status(200).json(tasks);
  } catch (err) {
    res.status(400).json({
      error: 'Failed to fetch user tasks',
      details: err.message
    });
  }
};
