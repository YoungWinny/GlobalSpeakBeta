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

// // Configure paths and environment
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const isProduction = process.env.NODE_ENV === 'production';
// const UPLOADS_DIR = path.join(__dirname, 'uploads');

// // MongoDB connection
// try {
//     // const dbUrl = "mongodb+srv://lilndabose:xzLuzkg1MlkvIrqA@cluster0.mnivnpc.mongodb.net/global-speak";
//   const dbUrlLocal = "mongodb://127.0.0.1:27017/global-speak";
//   await mongoose.connect(dbUrlLocal);
//   console.log('MongoDB connected');
// } catch (err) {
//   console.error('Connection to database failed!!', err.message);
//   process.exit(1);
// }

// const app = express();

// // Enhanced static file serving with security headers
// // app.use('/uploads', express.static(UPLOADS_DIR, {
// //   setHeaders: (res, filePath) => {
// //     // Security headers
// //     res.set('Access-Control-Allow-Origin', [
// //       'http://localhost:5173',
// //       'http://127.0.0.1:5173',
// //       'http://localhost:8001',
// //       'http://127.0.0.1:8001'
// //     ]);
// //     res.set('Cross-Origin-Resource-Policy', 'cross-origin');
    
// //     // Cache control for production
// //     if (isProduction) {
// //       const ext = path.extname(filePath).toLowerCase();
// //       if (['.png', '.jpg', '.jpeg', '.gif'].includes(ext)) {
// //         res.set('Cache-Control', 'public, max-age=31536000, immutable');
// //       }
// //     }
// //   }
// // }));
// // Serve all uploads directories properly
// app.use('/uploads', express.static(UPLOADS_DIR, {
//   setHeaders: (res, filePath) => {
//     res.set('Access-Control-Allow-Origin', [
//       'http://localhost:5173',
//       'http://127.0.0.1:5173',
//       'http://localhost:8001',
//       'http://127.0.0.1:8001'
//     ]);
//     res.set('Cross-Origin-Resource-Policy', 'cross-origin');
    
//     if (isProduction) {
//       const ext = path.extname(filePath).toLowerCase();
//       if (['.png', '.jpg', '.jpeg', '.gif', '.pdf', '.docx', '.doc', '.txt', '.csv', '.mp3', '.mp4', '.wav'].includes(ext)) {
//         res.set('Cache-Control', 'public, max-age=31536000, immutable');
//       }
//     }
//   }
// }));

// // Security middleware to prevent directory traversal
// app.use((req, res, next) => {
//   if (req.url.includes('../') || req.url.includes('..\\')) {
//     return res.status(400).json({ error: 'Invalid request path' });
//   }
//   next();
// });

// // CORS configuration
// const corsOptions = {
//   origin: [
//     'http://localhost:5173',
//     'http://127.0.0.1:5173',
//     'http://localhost:8001',
//     'http://127.0.0.1:8001'
//   ],
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'x-requested-with']
// };
// app.use(cors(corsOptions));
// app.options('*', cors(corsOptions));

// // Body parsers
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// // Routes
// app.use('/auth', router);
// app.use('/api', jobRoutes);
// app.use('/api', examRoutes);
// app.use('/api', applicationRoutes);
// app.use('/api', taskRoutes);
// app.use('/api', aiRoutes);

// // Health check endpoint
// app.get('/api/health', (req, res) => {
//   res.status(200).json({ status: 'OK', dbStatus: mongoose.connection.readyState });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(`[${new Date().toISOString()}] Error:`, err.stack);
//   res.status(500).json({ 
//     error: 'Internal Server Error',
//     message: isProduction ? 'Something went wrong' : err.message,
//     ...(!isProduction && { stack: err.stack })
//   });
// });

// // Debug route listing (development only)
// if (!isProduction) {
//   console.log("\n=== REGISTERED ROUTES ===");
//   const routeList = [];
//   app._router.stack.forEach((layer) => {
//     if (layer.route) {
//       const methods = Object.keys(layer.route.methods).join(', ').toUpperCase();
//       routeList.push(`${methods.padEnd(6)} ${layer.route.path}`);
//     } else if (layer.name === 'router') {
//       layer.handle.stack.forEach((sublayer) => {
//         if (sublayer.route) {
//           const methods = Object.keys(sublayer.route.methods).join(', ').toUpperCase();
//           routeList.push(`${methods.padEnd(6)} /api${sublayer.route.path}`);
//         }
//       });
//     }
//   });
//   console.log(routeList.join('\n'));
//   console.log("=== END OF ROUTES ===\n");
// }

// // Server startup
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`
//   Server is running on port ${PORT}
//   Environment: ${isProduction ? 'Production' : 'Development'}
//   Uploads directory: ${UPLOADS_DIR}
//   Database: ${mongoose.connection.host}/${mongoose.connection.name}
//   `);
// });



















// import express from 'express';
// import dotenv from 'dotenv';
// import bcrypt from 'bcrypt';
// import cors from 'cors';
// import mongoose from 'mongoose';
// import path from 'path';
// import fs from 'fs';
// import { fileURLToPath } from 'url';
// import router from './routes/user.js';
// import jobRoutes from './routes/jobRoutes.js';
// import examRoutes from './routes/examRoutes.js';
// import applicationRoutes from './routes/applicantsRoutes.js';
// import taskRoutes from './routes/taskRoutes.js';
// import aiRoutes from './routes/aiRoutes.js';
// import CourseRoutes from'./routes/courseRoutes.js';
// import CourseContentRoutes from'./routes/courseContentRoutes.js';
// import exerciseRoutes from'./routes/exerciseRoutes.js';
// import assessmentRoutes from './routes/assessmentRoutes.js';
// import certificateRoutes from './routes/certificateRoute.js';
// import { AIService } from './services/aiServices.js';
// dotenv.config();

// // Debug: Check if API key is loaded
// console.log('GROQ_API_KEY exists:', !!process.env.GROQ_API_KEY);
// if (process.env.GROQ_API_KEY) {
//   console.log('GROQ_API_KEY length:', process.env.GROQ_API_KEY.length);
//   console.log('GROQ_API_KEY starts with:', process.env.GROQ_API_KEY.substring(0, 6) + '...');
// }


// // Configure paths and environment
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const isProduction = process.env.NODE_ENV === 'production';
// const UPLOADS_DIR = path.join(__dirname, 'uploads');

// // MongoDB connection
// try {
//     // const dbUrl = "mongodb+srv://lilndabose:xzLuzkg1MlkvIrqA@cluster0.mnivnpc.mongodb.net/global-speak";
//   const dbUrlLocal = "mongodb://127.0.0.1:27017/global-speak";
//   await mongoose.connect(dbUrlLocal);
//   console.log('MongoDB connected');
//   console.log('GROQ_API_KEY configured:', !!process.env.GROQ_API_KEY);
// } catch (err) {
//   console.error('Connection to database failed!!', err.message);
//   process.exit(1);
// }

// const app = express();

// // Check upload directories permissions
// const checkUploadDirs = () => {
//   const dirs = [UPLOADS_DIR, path.join(UPLOADS_DIR, 'initial'), path.join(UPLOADS_DIR, 'submitted')];
  
//   dirs.forEach(dir => {
//     if (!fs.existsSync(dir)) {
//       fs.mkdirSync(dir, { recursive: true });
//     }
    
//     // Try to create a test file to check permissions
//     const testFile = path.join(dir, 'test.txt');
//     try {
//       fs.writeFileSync(testFile, 'test');
//       fs.unlinkSync(testFile);
//       console.log(`✓ Write permissions OK for: ${dir}`);
//     } catch (error) {
//       console.error(`✗ Write permissions FAILED for: ${dir}`, error);
//     }
//   });
// };

// checkUploadDirs();

// // Enhanced static file serving with security headers
// app.use('/uploads', express.static(UPLOADS_DIR, {
//   setHeaders: (res, filePath) => {
//     // Security headers
//     res.set('Access-Control-Allow-Origin', [
//       'http://localhost:5173',
//       'http://127.0.0.1:5173',
//       'http://localhost:8001',
//       'http://127.0.0.1:8001'
//     ]);
//     res.set('Cross-Origin-Resource-Policy', 'cross-origin');
    
//     // Cache control for production
//     if (isProduction) {
//       const ext = path.extname(filePath).toLowerCase();
//       if (['.png', '.jpg', '.jpeg', '.gif', '.pdf', '.docx', '.doc', '.txt', '.csv', '.mp3', '.mp4', '.wav'].includes(ext)) {
//         res.set('Cache-Control', 'public, max-age=31536000, immutable');
//       }
//     }
//   }
// }));

// // File access debug middleware (remove in production)
// if (!isProduction) {
//   app.use('/uploads', (req, res, next) => {
//     console.log(`File access: ${req.path}`);
//     next();
//   });
// }

// // Security middleware to prevent directory traversal
// app.use((req, res, next) => {
//   if (req.url.includes('../') || req.url.includes('..\\')) {
//     return res.status(400).json({ error: 'Invalid request path' });
//   }
//   next();
// });

// // CORS configuration
// const corsOptions = {
//   origin: [
//     'http://localhost:5173',
//     'http://127.0.0.1:5173',
//     'http://localhost:8001',
//     'http://127.0.0.1:8001'
//   ],
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'x-requested-with']
// };
// app.use(cors(corsOptions));
// app.options('*', cors(corsOptions));

// // Body parsers
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// // Routes
// app.use('/auth', router);
// app.use('/api', jobRoutes);
// app.use('/api', examRoutes);
// app.use('/api', applicationRoutes);
// app.use('/api', taskRoutes);
// app.use('/api', aiRoutes);
// app.use('/api/courses', CourseRoutes);
// app.use('/api/content', CourseContentRoutes);
// app.use('/api/exercises', exerciseRoutes);
// app.use('/api/assessments', assessmentRoutes);
// app.use('/api/certificates', certificateRoutes);

// // Health check endpoint
// app.get('/api/health', (req, res) => {
//   res.status(200).json({ status: 'OK', dbStatus: mongoose.connection.readyState });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(`[${new Date().toISOString()}] Error:`, err.stack);
//   res.status(500).json({ 
//     error: 'Internal Server Error',
//     message: isProduction ? 'Something went wrong' : err.message,
//     ...(!isProduction && { stack: err.stack })
//   });
// });
// // Health check
// app.get('/health', (req, res) => {
//   res.status(200).json({ 
//     message: 'Server is running!',
//     groqConfigured: !!process.env.GROQ_API_KEY
//   });
// });

// // Test AI endpoint
// app.get('/test-ai', async (req, res) => {
//   try {
//     // Simple test without using the API key directly
//     res.json({ 
//       message: 'AI service test',
//       groqConfigured: !!process.env.GROQ_API_KEY,
//       hasApiKey: process.env.GROQ_API_KEY ? true : false
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Something went wrong!' });
// });

// // 404 handler
// app.use('*', (req, res) => {
//   res.status(404).json({ message: 'Route not found' });
// });

// // Debug route listing (development only)
// if (!isProduction) {
//   console.log("\n=== REGISTERED ROUTES ===");
//   const routeList = [];
//   app._router.stack.forEach((layer) => {
//     if (layer.route) {
//       const methods = Object.keys(layer.route.methods).join(', ').toUpperCase();
//       routeList.push(`${methods.padEnd(6)} ${layer.route.path}`);
//     } else if (layer.name === 'router') {
//       layer.handle.stack.forEach((sublayer) => {
//         if (sublayer.route) {
//           const methods = Object.keys(sublayer.route.methods).join(', ').toUpperCase();
//           routeList.push(`${methods.padEnd(6)} /api${sublayer.route.path}`);
//         }
//       });
//     }
//   });
//   console.log(routeList.join('\n'));
//   console.log("=== END OF ROUTES ===\n");
// }

// // Server startup
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`
//   Server is running on port ${PORT}
//   Environment: ${isProduction ? 'Production' : 'Development'}
//   Uploads directory: ${UPLOADS_DIR}
//   Database: ${mongoose.connection.host}/${mongoose.connection.name}
//   `);
// });











import express from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import router from './routes/user.js';
import jobRoutes from './routes/jobRoutes.js';
import examRoutes from './routes/examRoutes.js';
import applicationRoutes from './routes/applicantsRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import CourseRoutes from'./routes/courseRoutes.js';
import CourseContentRoutes from'./routes/courseContentRoutes.js';
import exerciseRoutes from'./routes/exerciseRoutes.js';
import assessmentRoutes from './routes/assessmentRoutes.js';
import certificateRoutes from './routes/certificateRoute.js';

// Load environment variables FIRST
dotenv.config();

// Debug: Check if API key is loaded
console.log('GROQ_API_KEY exists:', !!process.env.GROQ_API_KEY);
if (process.env.GROQ_API_KEY) {
  console.log('GROQ_API_KEY length:', process.env.GROQ_API_KEY.length);
  console.log('GROQ_API_KEY starts with:', process.env.GROQ_API_KEY.substring(0, 6) + '...');
}

// Configure paths and environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProduction = process.env.NODE_ENV === 'production';
const UPLOADS_DIR = path.join(__dirname, 'uploads');

// MongoDB connection
try {
  const dbUrlLocal = "mongodb://127.0.0.1:27017/global-speak";
  await mongoose.connect(dbUrlLocal);
  console.log('MongoDB connected');
  console.log('GROQ_API_KEY configured:', !!process.env.GROQ_API_KEY);
} catch (err) {
  console.error('Connection to database failed!!', err.message);
  process.exit(1);
}

const app = express();

// Check upload directories permissions
const checkUploadDirs = () => {
  const dirs = [UPLOADS_DIR, path.join(UPLOADS_DIR, 'initial'), path.join(UPLOADS_DIR, 'submitted')];
  
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    const testFile = path.join(dir, 'test.txt');
    try {
      fs.writeFileSync(testFile, 'test');
      fs.unlinkSync(testFile);
      console.log(`✓ Write permissions OK for: ${dir}`);
    } catch (error) {
      console.error(`✗ Write permissions FAILED for: ${dir}`, error);
    }
  });
};

checkUploadDirs();

// Enhanced static file serving with security headers
app.use('/uploads', express.static(UPLOADS_DIR, {
  setHeaders: (res, filePath) => {
    res.set('Access-Control-Allow-Origin', [
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      'http://localhost:8001',
      'http://127.0.0.1:8001'
    ]);
    res.set('Cross-Origin-Resource-Policy', 'cross-origin');
    
    if (isProduction) {
      const ext = path.extname(filePath).toLowerCase();
      if (['.png', '.jpg', '.jpeg', '.gif', '.pdf', '.docx', '.doc', '.txt', '.csv', '.mp3', '.mp4', '.wav'].includes(ext)) {
        res.set('Cache-Control', 'public, max-age=31536000, immutable');
      }
    }
  }
}));

// File access debug middleware
if (!isProduction) {
  app.use('/uploads', (req, res, next) => {
    console.log(`File access: ${req.path}`);
    next();
  });
}

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

// Debug middleware to log all API requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// ROUTES - REORDERED TO FIX THE ISSUE

// 1. First, add specific routes that might conflict with generic ones
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    dbStatus: mongoose.connection.readyState,
    groqConfigured: !!process.env.GROQ_API_KEY
  });
});

app.get('/api/test-ai', async (req, res) => {
  try {
    res.json({ 
      message: 'AI service test',
      groqConfigured: !!process.env.GROQ_API_KEY,
      hasApiKey: !!process.env.GROQ_API_KEY,
      apiKeyLength: process.env.GROQ_API_KEY ? process.env.GROQ_API_KEY.length : 0
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/test-ai-advanced', async (req, res) => {
  try {
    if (!process.env.GROQ_API_KEY) {
      return res.status(400).json({
        success: false,
        message: 'GROQ_API_KEY not configured',
        usingMock: true
      });
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant."
          },
          {
            role: "user",
            content: "Hello! Please respond with a short test message to verify the API connection is working."
          }
        ],
        model: "mixtral-8x7b-32768",
        temperature: 0.7,
        max_tokens: 50
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    res.json({
      success: true,
      message: 'AI API connection successful',
      response: data.choices[0]?.message?.content || 'No response content'
    });
  } catch (error) {
    console.error('AI test failed:', error);
    res.status(500).json({
      success: false,
      message: error.message,
      usingMock: true,
      mockResponse: "This is a mock AI response. The actual AI service is currently unavailable."
    });
  }
});

// 2. Then add route-specific middleware
app.use('/auth', router);
app.use('/api/content', CourseContentRoutes); // FIXED: Changed from '/api/' to '/api/content'
app.use('/api/courses', CourseRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/assessments', assessmentRoutes);
app.use('/api/certificates', certificateRoutes);

// 3. Finally add generic API routes (these might have :id params)
app.use('/api', jobRoutes);
app.use('/api', examRoutes);
app.use('/api', applicationRoutes);
app.use('/api', taskRoutes);
app.use('/api', aiRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    message: 'Server is running!',
    groqConfigured: !!process.env.GROQ_API_KEY,
    timestamp: new Date().toISOString()
  });
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

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  console.log(`404 - API route not found: ${req.originalUrl}`);
  res.status(404).json({ 
    message: 'API endpoint not found',
    path: req.originalUrl,
    timestamp: new Date().toISOString()
  });
});

// 404 handler for all other routes
app.use('*', (req, res) => {
  console.log(`404 - Route not found: ${req.originalUrl}`);
  res.status(404).json({ 
    message: 'Route not found',
    path: req.originalUrl,
    timestamp: new Date().toISOString()
  });
});

// Debug route listing (development only)
if (!isProduction) {
  setTimeout(() => {
    console.log("\n=== REGISTERED ROUTES ===");
    const routeList = [];
    
    const printRoutes = (stack, prefix = '') => {
      stack.forEach((layer) => {
        if (layer.route) {
          const methods = Object.keys(layer.route.methods).join(', ').toUpperCase();
          routeList.push(`${methods.padEnd(6)} ${prefix}${layer.route.path}`);
        } else if (layer.name === 'router' && layer.handle.stack) {
          const routerPrefix = layer.regexp.toString().match(/\/\^(\/?[^]*?)\\\//);
          let basePath = '';
          if (routerPrefix && routerPrefix[1]) {
            basePath = routerPrefix[1].replace(/\\\//g, '/');
          }
          printRoutes(layer.handle.stack, basePath);
        }
      });
    };
    
    printRoutes(app._router.stack);
    console.log(routeList.sort().join('\n'));
    console.log("=== END OF ROUTES ===\n");
  }, 100);
}

// Server startup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`
  Server is running on port ${PORT}
  Environment: ${isProduction ? 'Production' : 'Development'}
  Uploads directory: ${UPLOADS_DIR}
  Database: ${mongoose.connection.host}/${mongoose.connection.name}
  GROQ API: ${process.env.GROQ_API_KEY ? 'Configured' : 'Not configured'}
  `);
  
  console.log('\nTesting endpoints:');
  console.log(`  GET  http://localhost:${PORT}/api/health`);
  console.log(`  GET  http://localhost:${PORT}/api/content/debug/test`);
  console.log(`  POST http://localhost:${PORT}/api/content/ai/generate`);
});