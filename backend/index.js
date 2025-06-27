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
// import aiRoutes from './routes/aiRoutes.js'
// dotenv.config();

// // Correctly handle __dirname in ES module
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // MongoDB connection
// try {
//   // const dbUrl = "mongodb+srv://lilndabose:xzLuzkg1MlkvIrqA@cluster0.mnivnpc.mongodb.net/global-speak";
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

// app.use(express.json());
// // app.use(cors({ origin: '*' }));
// app.use(cors({
//   origin: [
//     'http://localhost:5173',
//     'http://127.0.0.1:5173',
//     'http://localhost:8001',
//     'http://127.0.0.1:8001'
//   ],
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE']
// }));
// app.use(express.urlencoded({ extended: true }));

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
import bcrypt from 'bcrypt';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import router from './routes/user.js';
import jobRoutes from './routes/jobRoutes.js';
import examRoutes from './routes/examRoutes.js';
import applicationRoutes from './routes/applicantsRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
dotenv.config();

// Correctly handle __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB connection
try {
  const dbUrlLocal = "mongodb://127.0.0.1:27017/global-speak";
  await mongoose.connect(dbUrlLocal).then(() => {
    console.log('MongoDB connected');
  });
} catch (err) {
  console.log('Connection to database failed!!');
  console.error(err.message);
  process.exit(1);
}

const app = express();

// Serve static files from the "uploads" folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware to handle CORS properly
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:8001',
    'http://127.0.0.1:8001'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Added PATCH and OPTIONS
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'x-requested-with'],
}));

// Handle preflight requests (important for PATCH/DELETE)
app.options('*', cors()); // Enable preflight for all routes

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/auth', router);
app.use('/api', jobRoutes);
app.use('/api', examRoutes);
app.use('/api', applicationRoutes);
app.use('/api', taskRoutes);
app.use('/api', aiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});