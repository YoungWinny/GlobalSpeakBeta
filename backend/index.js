// import express from 'express';
// import dotenv from 'dotenv';
// import bcrypt from 'bcrypt';
// import cors from 'cors';
// import mongoose from 'mongoose';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import router from './routes/user.js';
// import jobRoutes from './routes/jobRoutes.js';
// import examRoutes from './routes/examRoutes.js';
// import applicationRoutes from './routes/applicantsRoutes.js';
// import taskRoutes from './routes/taskRoutes.js';
// import aiRoutes from './routes/aiRoutes.js';
// dotenv.config();

// // Correctly handle __dirname in ES module
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // MongoDB connection
// try {
//   const dbUrlLocal = "mongodb://127.0.0.1:27017/global-speak";
//   await mongoose.connect(dbUrlLocal).then(() => {
//     console.log('MongoDB connected');
//   });
// } catch (err) {
//   console.log('Connection to database failed!!');
//   console.error(err.message);
//   process.exit(1);
// }

// const app = express();

// // Serve static files from the "uploads" folder
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Middleware to handle CORS properly
// app.use(cors({
//   origin: [
//     'http://localhost:5173',
//     'http://127.0.0.1:5173',
//     'http://localhost:8001',
//     'http://127.0.0.1:8001'
//   ],
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Added PATCH and OPTIONS
//   allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'x-requested-with'],
// }));

// // Handle preflight requests (important for PATCH/DELETE)
// app.options('*', cors()); // Enable preflight for all routes

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Routes
// app.use('/auth', router);
// app.use('/api', jobRoutes);
// app.use('/api', examRoutes);
// app.use('/api', applicationRoutes);
// app.use('/api', taskRoutes);
// app.use('/api', aiRoutes);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });





import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import router from './routes/user.js';
import jobRoutes from './routes/jobRoutes.js';
import examRoutes from './routes/examRoutes.js';
import applicationRoutes from './routes/applicantsRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import aiRoutes from './routes/aiRoutes.js';

dotenv.config();

// Security and performance best practices
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB connection with improved error handling
const connectDB = async () => {
  try {
    const dbUrl = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/global-speak";
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  }
};

await connectDB();

const app = express();

// Security middleware
app.use(helmet());
app.use(limiter);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:8001',
    'http://127.0.0.1:8001'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

// Static files with custom 404 handler
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  setHeaders: (res) => {
    res.set('Cache-Control', 'public, max-age=3600');
  },
  fallthrough: false
}));

app.use((err, req, res, next) => {
  if (err.status === 404 && req.originalUrl.startsWith('/uploads')) {
    return res.status(404).json({ error: 'File not found' });
  }
  next(err);
});

// Routes
app.use('/auth', router);
app.use('/api', jobRoutes);
app.use('/api', examRoutes);
app.use('/api', applicationRoutes);
app.use('/api', taskRoutes);
app.use('/api', aiRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});