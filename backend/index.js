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

// Configure paths and environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProduction = process.env.NODE_ENV === 'production';
const UPLOADS_DIR = path.join(__dirname, 'uploads');

// MongoDB connection
try {
    // const dbUrl = "mongodb+srv://lilndabose:xzLuzkg1MlkvIrqA@cluster0.mnivnpc.mongodb.net/global-speak";
  const dbUrlLocal = "mongodb://127.0.0.1:27017/global-speak";
  await mongoose.connect(dbUrlLocal);
  console.log('MongoDB connected');
} catch (err) {
  console.error('Connection to database failed!!', err.message);
  process.exit(1);
}

const app = express();

// Enhanced static file serving with security headers
app.use('/uploads', express.static(UPLOADS_DIR, {
  setHeaders: (res, filePath) => {
    // Security headers
    res.set('Access-Control-Allow-Origin', [
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      'http://localhost:8001',
      'http://127.0.0.1:8001'
    ]);
    res.set('Cross-Origin-Resource-Policy', 'cross-origin');
    
    // Cache control for production
    if (isProduction) {
      const ext = path.extname(filePath).toLowerCase();
      if (['.png', '.jpg', '.jpeg', '.gif'].includes(ext)) {
        res.set('Cache-Control', 'public, max-age=31536000, immutable');
      }
    }
  }
}));

// Security middleware to prevent directory traversal
app.use((req, res, next) => {
  if (req.url.includes('../') || req.url.includes('..\\')) {
    return res.status(400).json({ error: 'Invalid request path' });
  }
  next();
});

// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:8001',
    'http://127.0.0.1:8001'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'x-requested-with']
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/auth', router);
app.use('/api', jobRoutes);
app.use('/api', examRoutes);
app.use('/api', applicationRoutes);
app.use('/api', taskRoutes);
app.use('/api', aiRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', dbStatus: mongoose.connection.readyState });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] Error:`, err.stack);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: isProduction ? 'Something went wrong' : err.message,
    ...(!isProduction && { stack: err.stack })
  });
});

// Debug route listing (development only)
if (!isProduction) {
  console.log("\n=== REGISTERED ROUTES ===");
  const routeList = [];
  app._router.stack.forEach((layer) => {
    if (layer.route) {
      const methods = Object.keys(layer.route.methods).join(', ').toUpperCase();
      routeList.push(`${methods.padEnd(6)} ${layer.route.path}`);
    } else if (layer.name === 'router') {
      layer.handle.stack.forEach((sublayer) => {
        if (sublayer.route) {
          const methods = Object.keys(sublayer.route.methods).join(', ').toUpperCase();
          routeList.push(`${methods.padEnd(6)} /api${sublayer.route.path}`);
        }
      });
    }
  });
  console.log(routeList.join('\n'));
  console.log("=== END OF ROUTES ===\n");
}

// Server startup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`
  Server is running on port ${PORT}
  Environment: ${isProduction ? 'Production' : 'Development'}
  Uploads directory: ${UPLOADS_DIR}
  Database: ${mongoose.connection.host}/${mongoose.connection.name}
  `);
});