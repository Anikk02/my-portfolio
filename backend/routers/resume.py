from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import ResumeVersion
from schemas import ResumeOut

router = APIRouter()


@router.get("/resume/latest", response_model=ResumeOut)
def get_latest_resume(db: Session = Depends(get_db)):
    resume = (
        db.query(ResumeVersion)
        .filter(ResumeVersion.active == True)
        .order_by(ResumeVersion.created_at.desc())
        .first()
    )
    if not resume:
        raise HTTPException(status_code=404, detail="No resume available")
    return resume
