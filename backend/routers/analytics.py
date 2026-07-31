from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from database import get_db
from models import AnalyticsEvent
from schemas import AnalyticsIn, AnalyticsOut

router = APIRouter()


@router.post("/analytics/event", response_model=AnalyticsOut)
def track_event(body: AnalyticsIn, request: Request, db: Session = Depends(get_db)):
    event = AnalyticsEvent(
        event=body.event,
        page=body.page,
        event_metadata=body.metadata,
        ip=request.client.host if request.client else None,
        user_agent=request.headers.get("user-agent"),
    )
    db.add(event)
    db.commit()
    return {"success": True}
