from sentence_transformers import SentenceTransformer, util
from functools import lru_cache
import PyPDF2
from io import BytesIO
import docx
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@lru_cache(maxsize=1)
def load_model():
    """Cache the model loading to improve performance"""
    logger.info("Loading sentence transformer model")
    return SentenceTransformer("sentence-transformers/LaBSE")

def extract_text_from_pdf(file_bytes):
    """Extract text content from PDF bytes"""
    try:
        reader = PyPDF2.PdfReader(BytesIO(file_bytes))
        text = "\n".join([page.extract_text() for page in reader.pages])
        if not text.strip():
            raise ValueError("PDF appears to be empty or scanned (no text content)")
        return text
    except Exception as e:
        logger.error(f"PDF extraction failed: {str(e)}")
        raise ValueError(f"PDF processing error: {str(e)}")

def extract_text_from_docx(file_bytes):
    """Extract text content from DOCX bytes"""
    try:
        doc = docx.Document(BytesIO(file_bytes))
        text = "\n".join([para.text for para in doc.paragraphs if para.text.strip()])
        if not text:
            raise ValueError("DOCX appears to be empty")
        return text
    except Exception as e:
        logger.error(f"DOCX extraction failed: {str(e)}")
        raise ValueError(f"DOCX processing error: {str(e)}")

def evaluate_translation(source: str, submission: str) -> tuple[float, str]:
    """
    Evaluate translation quality using LaBSE model
    Returns:
        tuple: (score: float, feedback: str)
    """
    if not source or not submission:
        raise ValueError("Source and submission texts cannot be empty")
    
    try:
        model = load_model()
        source_emb = model.encode(source, convert_to_tensor=True)
        subm_emb = model.encode(submission, convert_to_tensor=True)
        similarity = float(util.cos_sim(source_emb, subm_emb)[0][0])
        score = round(similarity * 10, 2)  # Scale to 0-10 range

        feedback = (
            "Excellent translation with high fidelity." if score > 8 else
            "Good translation, but could use slight improvements." if score > 6 else
            "Fair attempt. Some meaning may be lost." if score > 4 else
            "Poor translation. Major differences from source."
        )
        
        logger.info(f"Evaluation completed - Score: {score}")
        return score, feedback
        
    except Exception as e:
        logger.error(f"Evaluation failed: {str(e)}")
        raise ValueError(f"Evaluation error: {str(e)}")