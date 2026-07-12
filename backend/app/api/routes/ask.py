"""
Visual Q&A API
"""

from fastapi import (
    APIRouter,
    Depends,
    File,
    Form,
    HTTPException,
    UploadFile,
)
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.services.storage_service import storage_service
from app.services.upload_service import upload_service
from app.services.master_orchestrator_service import get_master_orchestrator

router = APIRouter(
    prefix="/ai",
    tags=["AI"],
)

@router.post(
    "/ask",
    summary="Visual Q&A on Uploaded Image",
)
async def ask_visual(
    question: str = Form(...),
    image: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    """
    Accepts an image file and a text question, runs local BLIP model
    to caption the image, and then runs Qwen3-8B to answer the question.
    """
    try:
        # Validate & Save Image
        upload_service.validate_image(image)
        image_path = storage_service.save_image(image)

        # Get the master orchestrator instance
        from fastapi.concurrency import run_in_threadpool
        orchestrator = await run_in_threadpool(get_master_orchestrator)
        
        # Run visual_qa in a threadpool since models are synchronous
        result = await run_in_threadpool(orchestrator.visual_qa, image_path, question)

        return result
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e),
        )
