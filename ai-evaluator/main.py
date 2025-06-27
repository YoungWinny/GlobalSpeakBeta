from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from evaluator import evaluate_translation, extract_text_from_pdf, extract_text_from_docx
from typing import Optional
import os
import logging
from fastapi.responses import JSONResponse

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Translation Evaluation API")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

async def extract_file_content(file: UploadFile) -> str:
    """Extract text content from uploaded file based on its type"""
    MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB
    
    try:
        contents = await file.read()
        
        # Validate file size
        if len(contents) > MAX_FILE_SIZE:
            raise ValueError(f"File size exceeds {MAX_FILE_SIZE//(1024*1024)}MB limit")
        
        file_ext = os.path.splitext(file.filename)[1].lower()
        logger.info(f"Processing {file_ext} file: {file.filename}")

        if file_ext == '.pdf':
            text = extract_text_from_pdf(contents)
        elif file_ext == '.docx':
            text = extract_text_from_docx(contents)
        elif file_ext == '.txt':
            try:
                text = contents.decode('utf-8')
            except UnicodeDecodeError:
                raise ValueError("Text file could not be decoded as UTF-8")
        else:
            raise ValueError("Unsupported file type")
        
        if not text or not text.strip():
            raise ValueError("File appears to be empty or unreadable")
            
        return text
        
    except ValueError as ve:
        logger.warning(f"Validation error: {str(ve)}")
        raise ve
    except Exception as e:
        logger.error(f"File processing failed: {str(e)}")
        raise ValueError(f"File processing error: {str(e)}")

@app.post("/evaluate")
async def evaluate_translation_endpoint(
    source_text: str = Form(..., description="Original source text"),
    translated_file: UploadFile = File(..., description="Translated file (PDF, DOCX, or TXT)")
):
    """
    Evaluate the quality of a translated document against source text
    """
    try:
        # Validate inputs
        if not source_text.strip():
            raise ValueError("Source text cannot be empty")
        
        # Extract text from uploaded file
        submission_text = await extract_file_content(translated_file)
        
        # Evaluate translation quality
        score, feedback = evaluate_translation(source_text, submission_text)
        
        return JSONResponse({
            "success": True,
            "score": score,
            "feedback": feedback,
            "source_length": len(source_text),
            "translation_length": len(submission_text)
        })
        
    except ValueError as ve:
        logger.warning(f"Client error: {str(ve)}")
        return JSONResponse(
            {"success": False, "error": str(ve)},
            status_code=400
        )
    except Exception as e:
        logger.error(f"Server error: {str(e)}")
        return JSONResponse(
            {"success": False, "error": "Internal server error"},
            status_code=500
        )

@app.get("/health")
async def health_check():
    """Endpoint for health checks"""
    return {"status": "healthy"}