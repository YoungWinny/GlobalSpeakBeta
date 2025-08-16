// // evaluator.js
// import { pipeline } from '@xenova/transformers';
// import { PDFParser } from 'pdf2json';
// import mammoth from 'mammoth';
// import fs from 'fs';

// // Initialize the LaBSE model (cached)
// let model;
// let similarity;

// const loadModel = async () => {
//   if (!model) {
//     console.log("Loading LaBSE model...");
//     model = await pipeline(
//       'feature-extraction',
//       'Xenova/LaBSE',
//       { quantized: false } // Disable for better accuracy
//     );
//     similarity = await pipeline(
//       'text-similarity',
//       'Xenova/LaBSE'
//     );
//   }
//   return { model, similarity };
// };

// // Text extraction (same as your existing code)
// const extractTextFromPDF = async (fileBuffer) => { /* ... */ };
// const extractTextFromDOCX = async (fileBuffer) => { /* ... */ };

// // Translation evaluation (Node.js version)
// export const evaluateTranslation = async (source, submission) => {
//   if (!source || !submission) {
//     throw new Error("Source and submission texts cannot be empty");
//   }

//   try {
//     const { model, similarity } = await loadModel();
    
//     // Encode texts
//     const sourceEmbedding = await model(source);
//     const submissionEmbedding = await model(submission);
    
//     // Calculate similarity (0-1 scale)
//     const score = await similarity(source, submission);
//     const scaledScore = Math.round(score.score * 10 * 100) / 100; // Scale to 0-10

//     const feedback = (
//       scaledScore > 8 ? "Excellent translation with high fidelity." :
//       scaledScore > 6 ? "Good translation, but could use slight improvements." :
//       scaledScore > 4 ? "Fair attempt. Some meaning may be lost." :
//       "Poor translation. Major differences from source."
//     );

//     return { score: scaledScore, feedback };
//   } catch (error) {
//     console.error("Evaluation error:", error);
//     throw new Error(`Evaluation failed: ${error.message}`);
//   }
// };




import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Correct PDFParser import
const { PDFParser } = require('pdf2json');

// Transformers import
const { pipeline } = require('@xenova/transformers');

// ES Modules imports
import mammoth from 'mammoth';
import fs from 'fs/promises';

// Model cache
let similarityModel;

const loadModel = async () => {
  if (!similarityModel) {
    console.log("Loading LaBSE model...");
    similarityModel = await pipeline(
      'feature-extraction',
      'Xenova/LaBSE',
      { quantized: false }
    );
  }
  return similarityModel;
};

export const extractTextFromPDF = async (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();
    
    pdfParser.on('pdfParser_dataError', err => {
      reject(new Error(`PDF parsing failed: ${err.data}`));
    });

    pdfParser.on('pdfParser_dataReady', () => {
      try {
        const text = pdfParser.getRawTextContent() || '';
        resolve(text.trim());
      } catch (error) {
        reject(new Error(`Text extraction failed: ${error.message}`));
      }
    });

    pdfParser.parseBuffer(fileBuffer);
  });
};

export const extractTextFromDOCX = async (fileBuffer) => {
  try {
    const { value } = await mammoth.extractText({ buffer: fileBuffer });
    return value || '';
  } catch (error) {
    throw new Error(`DOCX extraction failed: ${error.message}`);
  }
};

export const evaluateTranslation = async (source, submission) => {
  if (!source || !submission) {
    throw new Error("Both texts are required");
  }

  try {
    const model = await loadModel();
    const { score } = await model(source, submission);
    const scaledScore = Math.round(score * 10 * 100) / 100;

    const feedback = 
      scaledScore > 8 ? "Excellent translation with high fidelity." :
      scaledScore > 6 ? "Good translation, but could use slight improvements." :
      scaledScore > 4 ? "Fair attempt. Some meaning may be lost." :
      "Poor translation. Major differences from source.";

    return { score: scaledScore, feedback };
  } catch (error) {
    console.error("Evaluation error:", error);
    throw new Error(`Evaluation failed: ${error.message}`);
  }
};