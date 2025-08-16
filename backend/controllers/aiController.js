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




























import { evaluateTranslation, extractTextFromPDF, extractTextFromDOCX } from '../services/evaluator.js';
import fs from 'fs/promises';

export const evaluateUploadedFile = async (req, res) => {
  const { sourceText } = req.body;
  const file = req.file;

  if (!file || !sourceText) {
    return res.status(400).json({ 
      success: false,
      error: "Missing required files"
    });
  }

  try {
    const fileBuffer = await fs.readFile(file.path);
    let submissionText;

    if (file.mimetype === 'application/pdf') {
      submissionText = await extractTextFromPDF(fileBuffer);
    } else if (file.mimetype.includes('wordprocessingml.document')) {
      submissionText = await extractTextFromDOCX(fileBuffer);
    } else {
      throw new Error('Unsupported file type');
    }

    const { score, feedback } = await evaluateTranslation(sourceText, submissionText);

    res.json({
      success: true,
      score,
      feedback,
      textSample: submissionText.substring(0, 200) + "..."
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  } finally {
    try {
      if (file?.path) {
        await fs.unlink(file.path);
      }
    } catch (cleanupError) {
      console.warn('File cleanup failed:', cleanupError.message);
    }
  }
};