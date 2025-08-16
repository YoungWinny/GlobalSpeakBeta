import fs from 'fs/promises';
import PDFParser from 'pdf2json';
import mammoth from 'mammoth';
import logger from './logger.js';

const parsePDF = (buffer) => new Promise((resolve, reject) => {
  const pdfParser = new PDFParser(null, 1);
  
  // Timeout after 15 seconds
  const timeout = setTimeout(() => {
    pdfParser.destroy();
    reject(new Error('PDF parsing timeout'));
  }, 15000);

  pdfParser.on('pdfParser_dataError', (err) => {
    clearTimeout(timeout);
    reject(new Error(`PDF parsing failed: ${err.parserError}`));
  });

  pdfParser.on('pdfParser_dataReady', () => {
    clearTimeout(timeout);
    try {
      const text = pdfParser.getRawTextContent() || '';
      resolve(text.trim());
    } catch (error) {
      reject(new Error('Failed to extract PDF text'));
    }
  });

  try {
    pdfParser.parseBuffer(buffer);
  } catch (parseError) {
    clearTimeout(timeout);
    reject(parseError);
  }
});

const parseDOCX = async (buffer) => {
  try {
    const { value } = await mammoth.extractText({ buffer });
    return value.trim();
  } catch (error) {
    throw new Error(`DOCX parsing failed: ${error.message}`);
  }
};

const parseTextFile = async (buffer) => {
  const encodings = ['utf8', 'utf16le', 'latin1'];
  
  for (const encoding of encodings) {
    try {
      const text = buffer.toString(encoding);
      if (text && text.trim()) return text.trim();
    } catch (error) {
      continue;
    }
  }
  throw new Error('Failed to decode text file with supported encodings');
};

export const extractTextFromFile = async (filePath, mimeType) => {
  try {
    const buffer = await fs.readFile(filePath);
    
    if (mimeType === 'application/pdf') {
      return await parsePDF(buffer);
    }

    if (mimeType.includes('wordprocessingml.document')) {
      return await parseDOCX(buffer);
    }

    if (mimeType.includes('text/plain') || mimeType === 'application/octet-stream') {
      return await parseTextFile(buffer);
    }

    throw new Error(`Unsupported file type: ${mimeType}`);
  } catch (error) {
    logger.error(`File parsing error: ${error.message}`);
    throw new Error(`Failed to parse file: ${error.message}`);
  }
};