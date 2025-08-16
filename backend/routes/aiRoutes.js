import express from 'express';
import { evaluateUploadedFile } from '../controllers/aiController.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (/\.(pdf|docx|txt)$/i.test(file.originalname)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, DOCX or TXT files allowed!'));
    }
  }
});

router.post('/evaluate-upload', upload.single('file'), evaluateUploadedFile);

export default router;




// import express from 'express';
// // import { evaluateUploadedFile } from '../controllers/aiController.js';
// import multer from 'multer';
// import path from 'path';
// import fs from 'fs';
// import axios from 'axios'; // Missing import
// // import protect from '../middleware/authMiddleware.js'; // Missing import
// import authMiddleware from '../middlewares/authMiddlware.js';

// import { 
//   evaluateUploadedFile,
//   getAssessments,
//   getAssessmentById 
// } from '../controllers/aiController.js';

// // Configure upload directory
// const uploadsDir = path.join(process.cwd(), 'uploads');
// if (!fs.existsSync(uploadsDir)) {
//     fs.mkdirSync(uploadsDir, { recursive: true });
// }

// // Configure multer storage
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, uploadsDir);
//     },
//     filename: (req, file, cb) => {
//         const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, uniqueSuffix + '-' + safeName);
//     }
// });

// // File type validation
// const fileFilter = (req, file, cb) => {
//     const allowedTypes = [
//         'application/pdf',
//         'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
//         'text/plain'
//     ];
    
//     if (allowedTypes.includes(file.mimetype)) {
//         cb(null, true);
//     } else {
//         cb(new Error(
//             `Invalid file type (${file.mimetype}). ` +
//             'Only PDF, DOCX, and plain text files are supported'
//         ), false);
//     }
// };

// // Configure multer middleware
// const upload = multer({ 
//     storage,
//     limits: { 
//         fileSize: 10 * 1024 * 1024, // 10MB
//         files: 1
//     },
//     fileFilter
// });

// const router = express.Router();

// // Evaluation endpoint with validation middleware
// router.post('/evaluate-upload', 
//     upload.single('file'),
//     (req, res, next) => {
//         // Validate file presence
//         if (!req.file) {
//             return res.status(400).json({
//                 success: false,
//                 error: "No file uploaded",
//                 details: "Please provide a translation file",
//                 supportedFormats: ["PDF", "DOCX", "TXT"]
//             });
//         }
        
//         // Validate source text
//         if (!req.body.sourceText || req.body.sourceText.trim().length === 0) {
//             // Cleanup uploaded file if validation fails
//             if (req.file?.path && fs.existsSync(req.file.path)) {
//                 fs.unlinkSync(req.file.path);
//             }
//             return res.status(400).json({
//                 success: false,
//                 error: "Missing source text",
//                 details: "Please provide the original text to compare against"
//             });
//         }
        
//         next();
//     },
//     evaluateUploadedFile
// );

// router.post('/generate-outline', authMiddleware, async (req, res) => {
//     try {
//         const response = await axios.post('http://ai-service:8000/generate-outline', {
//             prompt: req.body.prompt
//         });
//         res.json(response.data);
//     } catch (error) {
//         console.error('AI Service error:', error.message);
//         res.status(500).json({ error: 'AI Service unavailable' });
//     }
// });

// router.post('/generate-questions', authMiddleware , async(req, res) => {
//     try {
//         const response = await axios.post('http://ai-service:8000/generate-questions', {
//             context: req.body.context
//         });
//         res.json(response.data);
//     } catch (error) {
//         console.error('AI Service error:', error.message);
//         res.status(500).json({ error: 'AI Service unavailable' });
//     }
// });

// // Add these new routes to aiRoutes.js
// router.post('/ai/simplify-text', authMiddleware, async (req, res) => {
//     try {
//         const response = await axios.post('http://ai-service:8000/ai/simplify-text', {
//             context: req.body.context
//         });
//         res.json(response.data);
//     } catch (error) {
//         console.error('AI Service error:', error.message);
//         res.status(500).json({ error: 'Text simplification service unavailable' });
//     }
// });

// router.post('/ai/assist', authMiddleware, async (req, res) => {
//     try {
//         // Route to handle general assistance requests
//         const { message, context } = req.body;
        
//         // Determine which AI service to call based on message content
//         let endpoint, data;
//         if (message.toLowerCase().includes('outline')) {
//             endpoint = 'generate-outline';
//             data = { prompt: message };
//         } else if (message.toLowerCase().includes('question')) {
//             endpoint = 'generate-questions';
//             data = { context: context || message };
//         } else {
//             endpoint = 'generate-outline';
//             data = { prompt: message };
//         }

//         const response = await axios.post(`http://ai-service:8000/ai/${endpoint}`, data);
//         res.json(response.data);
//     } catch (error) {
//         console.error('AI Assistance error:', error.message);
//         res.status(500).json({ error: 'AI assistance unavailable' });
//     }
// });

// router.get('/assessments', getAssessments);
// router.get('/assessments/:id', getAssessmentById);

// export default router;