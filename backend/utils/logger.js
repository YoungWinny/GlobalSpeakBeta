import winston from 'winston';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

// Create transports
const transports = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.printf(
        ({ level, message, timestamp, stack }) => 
          `${timestamp} ${level}: ${stack || message}`
      )
    )
  }),
  new winston.transports.File({
    filename: path.join(__dirname, '../../logs/combined.log'),
    level: 'info'
  }),
  new winston.transports.File({
    filename: path.join(__dirname, '../../logs/errors.log'),
    level: 'error',
    handleExceptions: true
  })
];

// Main logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: logFormat,
  transports,
  exitOnError: false
});

// Stream for Express morgan
logger.stream = {
  write: (message) => logger.info(message.trim())
};

export default logger;