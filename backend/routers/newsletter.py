from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from database import get_db
from models import NewsletterSubscriber
from schemas import NewsletterIn, NewsletterOut

router = APIRouter()


@router.post("/newsletter", response_model=NewsletterOut)
def subscribe_newsletter(body: NewsletterIn, db: Session = Depends(get_db)):
    subscriber = NewsletterSubscriber(email=body.email, name=body.name)
    db.add(subscriber)
    try:
        db.commit()
        return {"success": True, "message": "Successfully subscribed to newsletter!"}
    except IntegrityError:
        db.rollback()
        return {"success": True, "message": "You're already subscribed!"}
