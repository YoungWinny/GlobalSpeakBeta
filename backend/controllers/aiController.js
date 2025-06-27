// import fs from 'fs';
// import PDFParser from 'pdf2json';
// import mammoth from 'mammoth';
// import fetch from 'node-fetch';
// import { FormData } from 'formdata-node';
// import { fileURLToPath } from 'url';
// import path from 'path';

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

// const extractTextFromFile = async (filePath, mimetype) => {
//   try {
//     const fileBuffer = fs.readFileSync(filePath);

//     if (mimetype === 'application/pdf') {
//       return new Promise((resolve, reject) => {
//         const pdfParser = new PDFParser();
//         pdfParser.on("pdfParser_dataError", err => reject(err));
//         pdfParser.on("pdfParser_dataReady", () => {
//           resolve(pdfParser.getRawTextContent() || "");
//         });
//         pdfParser.parseBuffer(fileBuffer);
//       });
//     }

//     if (mimetype.includes('wordprocessingml.document')) {
//       const result = await mammoth.extractText({ buffer: fileBuffer });
//       return result.value || "";
//     }

//     return fileBuffer.toString('utf-8');
//   } catch (error) {
//     throw new Error(`Text extraction failed: ${error.message}`);
//   }
// };

// export const evaluateUploadedFile = async (req, res) => {
//   if (!req.file || !req.body.sourceText) {
//     return res.status(400).json({ error: "Missing file or source text" });
//   }

//   try {
//     // 1. Extract text from uploaded file
//     const submissionText = await extractTextFromFile(req.file.path, req.file.mimetype);
    
//     // 2. Prepare FormData for FastAPI
//     const formData = new FormData();
//     formData.append('source_text', req.body.sourceText);
//     formData.append('translated_file', new Blob([submissionText]), req.file.originalname);

//     // 3. Send to AI evaluator
//     const response = await fetch('http://127.0.0.1:8001/evaluate', {
//       method: 'POST',
//       body: formData,
//     });

//     if (!response.ok) {
//       const error = await response.text();
//       throw new Error(error);
//     }

//     const result = await response.json();
//     res.json(result);
//   } catch (error) {
//     console.error('Evaluation error:', error);
//     res.status(500).json({ error: error.message });
//   } finally {
//     // Cleanup uploaded file
//     try {
//       if (req.file?.path) fs.unlinkSync(req.file.path);
//     } catch (cleanupError) {
//       console.warn('File cleanup failed:', cleanupError.message);
//     }
//   }
// };










// import fs from 'fs';
// import PDFParser from 'pdf2json';
// import mammoth from 'mammoth';
// import FormData from 'form-data';
// import fetch from 'node-fetch';
// import path from 'path';
// import { fileURLToPath } from 'url';

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

// // Robust PDF text extraction with multiple fallbacks
// const extractTextFromPDF = async (fileBuffer) => {
//   return new Promise((resolve, reject) => {
//     const pdfParser = new PDFParser(null, 1);
    
//     const timeout = setTimeout(() => {
//       pdfParser.destroy();
//       reject(new Error("PDF parsing took too long"));
//     }, 15000);

//     pdfParser.on("pdfParser_dataError", (err) => {
//       clearTimeout(timeout);
//       console.warn("PDF parsing error:", err);
//       // Fallback 1: Try direct text extraction
//       try {
//         const text = fileBuffer.toString('utf-8') || fileBuffer.toString('latin1');
//         if (text.trim().length > 0) return resolve(text);
//         throw new Error("Empty text extracted");
//       } catch (error) {
//         reject(new Error("Could not extract text from PDF"));
//       }
//     });

//     pdfParser.on("pdfParser_dataReady", () => {
//       clearTimeout(timeout);
//       try {
//         const text = pdfParser.getRawTextContent();
//         if (text && text.trim().length > 0) return resolve(text);
//         throw new Error("Empty PDF content");
//       } catch (error) {
//         reject(new Error("Could not get text from parsed PDF"));
//       }
//     });

//     try {
//       pdfParser.parseBuffer(fileBuffer);
//     } catch (parseError) {
//       clearTimeout(timeout);
//       reject(new Error("Failed to parse PDF"));
//     }
//   });
// };

// const extractTextFromFile = async (filePath, mimetype) => {
//   try {
//     if (!fs.existsSync(filePath)) {
//       throw new Error("File not found on server");
//     }

//     const fileBuffer = fs.readFileSync(filePath);

//     if (mimetype === 'application/pdf') {
//       return await extractTextFromPDF(fileBuffer);
//     }

//     if (mimetype.includes('wordprocessingml.document')) {
//       const { value } = await mammoth.extractText({ buffer: fileBuffer });
//       return value || "";
//     }

//     // For text files, try multiple encodings
//     const encodings = ['utf-8', 'utf16le', 'latin1'];
//     for (const encoding of encodings) {
//       try {
//         const text = fileBuffer.toString(encoding);
//         if (text && text.trim().length > 0) return text;
//       } catch {}
//     }
//     return fileBuffer.toString('latin1'); // Final fallback
//   } catch (error) {
//     console.error("File processing error:", error);
//     throw new Error(`Could not process file: ${error.message}`);
//   }
// };

// export const evaluateUploadedFile = async (req, res) => {
//   const { sourceText } = req.body;
//   const file = req.file;

//   if (!file || !sourceText) {
//     return res.status(400).json({ 
//       success: false,
//       error: "Missing required files",
//       details: "Please provide both source text and translation file"
//     });
//   }

//   try {
//     // First validate we can extract text
//     const submissionText = await extractTextFromFile(file.path, file.mimetype);
//     if (!submissionText || submissionText.trim().length === 0) {
//       throw new Error("File appears to be empty or unreadable");
//     }

//     const form = new FormData();
//     form.append('source_text', sourceText);
//     form.append('translated_file', fs.createReadStream(file.path), {
//       filename: file.originalname,
//       contentType: file.mimetype
//     });

//     const response = await fetch('http://127.0.0.1:8001/evaluate', {
//       method: 'POST',
//       body: form,
//       headers: form.getHeaders(),
//       timeout: 30000
//     });

//     if (!response.ok) {
//       const error = await response.json().catch(() => ({}));
//       throw new Error(error.detail || error.message || 'Evaluation service failed');
//     }

//     const result = await response.json();
    
//     res.json({
//       success: true,
//       score: result.score ?? 0,
//       feedback: result.feedback ?? "No detailed feedback available",
//       textSample: submissionText.substring(0, 200) + (submissionText.length > 200 ? "..." : "")
//     });

//   } catch (error) {
//     console.error('Evaluation error:', error);
    
//     let userMessage = "Evaluation failed";
//     let details = "";
//     let troubleshooting = [];

//     if (error.message.includes('PDF') || error.message.includes('parse')) {
//       userMessage = "PDF Processing Error";
//       details = "The PDF may be scanned, password protected, or contain unsupported elements";
//       troubleshooting = [
//         "Try converting to DOCX format",
//         "Ensure text is selectable in the PDF",
//         "Check for password protection"
//       ];
//     } else if (error.message.includes('encoding') || error.message.includes('decode')) {
//       userMessage = "File Encoding Issue";
//       details = "The file contains characters that couldn't be decoded";
//       troubleshooting = [
//         "Save as UTF-8 text file",
//         "Try DOCX format instead",
//         "Check for special characters"
//       ];
//     } else {
//       details = error.message;
//     }

//     res.status(400).json({
//       success: false,
//       error: userMessage,
//       details: details,
//       troubleshooting,
//       supportedFormats: ["PDF (text-based)", "DOCX", "TXT (UTF-8)"]
//     });
//   } finally {
//     try {
//       if (req.file?.path && fs.existsSync(req.file.path)) {
//         fs.unlinkSync(req.file.path);
//       }
//     } catch (cleanupError) {
//       console.warn('File cleanup failed:', cleanupError.message);
//     }
//   }
// };

// export default {
//   evaluateUploadedFile
// };








import fs from 'fs';
import PDFParser from 'pdf2json';
import mammoth from 'mammoth';
import FormData from 'form-data';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configuration
const EVALUATION_SERVICE_URL = 'http://127.0.0.1:8001/evaluate';
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain'
];
const REQUEST_TIMEOUT = 30000; // 30 seconds

// Helper function for consistent error responses
const createErrorResponse = (error, additionalInfo = {}) => {
    const errorTypes = {
        'PDF': {
            message: "PDF Processing Error",
            tips: ["Try converting to DOCX", "Check if text is selectable"],
            status: 400
        },
        'encoding': {
            message: "Encoding Issue", 
            tips: ["Save as UTF-8 text", "Try DOCX format"],
            status: 400
        },
        'request failed': {
            message: "Evaluation Service Unavailable",
            tips: ["Try again later", "Check service status"],
            status: 503
        },
        'default': {
            message: "Processing Error",
            tips: [],
            status: 500
        }
    };

    const matchedError = Object.entries(errorTypes).find(([key]) => 
        error.message.toLowerCase().includes(key.toLowerCase())
    ) || ['default', errorTypes.default];

    return {
        ...additionalInfo,
        success: false,
        error: matchedError[1].message,
        details: error.message,
        troubleshooting: matchedError[1].tips,
        statusCode: matchedError[1].status
    };
};

// PDF Text Extraction
const extractTextFromPDF = async (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const pdfParser = new PDFParser(null, 1);
        const timeout = setTimeout(() => {
            pdfParser.destroy();
            reject(new Error("PDF parsing timeout (15s exceeded)"));
        }, 15000);

        pdfParser.on("pdfParser_dataError", (err) => {
            clearTimeout(timeout);
            try {
                const text = fileBuffer.toString('utf-8') || fileBuffer.toString('latin1');
                if (text.trim().length > 0) return resolve(text);
                throw new Error("Empty text extracted from PDF");
            } catch (error) {
                reject(new Error(`PDF parsing failed: ${err.message}`));
            }
        });

        pdfParser.on("pdfParser_dataReady", () => {
            clearTimeout(timeout);
            try {
                const text = pdfParser.getRawTextContent();
                if (text && text.trim().length > 0) return resolve(text);
                throw new Error("Empty PDF content");
            } catch (error) {
                reject(new Error("Failed to extract PDF text"));
            }
        });

        try {
            pdfParser.parseBuffer(fileBuffer);
        } catch (parseError) {
            clearTimeout(timeout);
            reject(new Error(`PDF parse error: ${parseError.message}`));
        }
    });
};

// File Text Extraction
const extractTextFromFile = async (filePath, mimetype) => {
    try {
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }

        const fileBuffer = fs.readFileSync(filePath);

        // Handle PDFs
        if (mimetype === 'application/pdf') {
            return await extractTextFromPDF(fileBuffer);
        }

        // Handle Word documents
        if (mimetype.includes('wordprocessingml.document')) {
            const { value } = await mammoth.extractText({ buffer: fileBuffer });
            if (!value || value.trim().length === 0) {
                throw new Error("DOCX appears to be empty");
            }
            return value;
        }

        // For text files - try multiple encodings
        const encodings = ['utf-8', 'utf16le', 'latin1'];
        let bestText = '';
        
        for (const encoding of encodings) {
            try {
                const text = fileBuffer.toString(encoding);
                if (text.trim().length > bestText.trim().length) {
                    bestText = text;
                }
            } catch (error) {
                console.debug(`Encoding ${encoding} failed: ${error.message}`);
            }
        }

        if (!bestText.trim()) {
            throw new Error("Could not decode text content");
        }

        return bestText;
    } catch (error) {
        console.error("File processing error:", error);
        throw new Error(`File processing failed: ${error.message}`);
    }
};

// Main Evaluation Function
export const evaluateUploadedFile = async (req, res) => {
    try {
        // Validate extracted text
        const submissionText = await extractTextFromFile(req.file.path, req.file.mimetype);
        
        if (submissionText.trim().length < 10) {
            throw new Error("Minimum 10 characters required");
        }

        // Prepare evaluation request
        const form = new FormData();
        form.append('source_text', req.body.sourceText);
        form.append('translated_file', fs.createReadStream(req.file.path), {
            filename: req.file.originalname,
            contentType: req.file.mimetype
        });

        // Send to evaluation service
        const response = await fetch(EVALUATION_SERVICE_URL, {
            method: 'POST',
            body: form,
            headers: form.getHeaders(),
            timeout: REQUEST_TIMEOUT
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.error || error.detail || 'Evaluation service error');
        }

        // Return results
        const result = await response.json();
        res.json({
            success: true,
            score: result.score ?? 0,
            feedback: result.feedback ?? "No feedback provided",
            textSample: submissionText.substring(0, 200) + (submissionText.length > 200 ? "..." : ""),
            metrics: {
                sourceLength: result.source_length,
                translationLength: result.translation_length
            }
        });

    } catch (error) {
        console.error('Evaluation error:', error);
        const errorResponse = createErrorResponse(error, {
            supportedFormats: ["PDF (text)", "DOCX", "TXT (UTF-8)"]
        });
        res.status(errorResponse.statusCode).json(errorResponse);
    } finally {
        // Cleanup uploaded file
        try {
            if (req.file?.path && fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path);
            }
        } catch (cleanupError) {
            console.warn('File cleanup failed:', cleanupError.message);
        }
    }
};