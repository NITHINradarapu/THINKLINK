"""
Worker Report API

Allows workers to manually report unsafe
machine conditions by uploading:

- Machine ID
- Worker ID
- Image
- Audio (optional)
- Remarks (optional)
"""

from typing import Optional

from fastapi import (
    APIRouter,
    Depends,
    File,
    Form,
    UploadFile,
    HTTPException,
)

from sqlalchemy.orm import Session

from app.database.session import get_db

from app.schemas.report import ReportResponse

from app.services.report_service import report_service

router = APIRouter(

    prefix="/report",

    tags=["Worker Report"],

)


@router.post(

    "/",

    response_model=ReportResponse,

    summary="Worker Incident Report",

)

async def create_report(

    device_id: str = Form(...),

    worker_id: str = Form(...),

    remarks: Optional[str] = Form(None),

    image: UploadFile = File(...),

    audio: Optional[UploadFile] = File(None),

    db: Session = Depends(get_db),

):

    """
    Worker submits:

    • Machine

    • Image

    • Audio (optional)

    • Remarks

    Backend automatically:

    • Stores files

    • Retrieves latest telemetry

    • Runs AI

    • Creates incident

    • Sends notification
    """

    try:

        result = report_service.create_report(

            db=db,

            device_id=device_id,

            worker_id=worker_id,

            image=image,

            audio=audio,

            remarks=remarks,

        )

        return ReportResponse(

            success=result["success"],

            incident_id=result["incident_id"],

            risk_level=result["risk_level"],

            summary=result["summary"],

            notification_sent=result["notification_sent"],

        )

    except Exception as e:

        raise HTTPException(

            status_code=500,

            detail=str(e),

        )