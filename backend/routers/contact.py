from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from database import get_db
from models import Contact
from schemas import ContactIn, ContactOut

router = APIRouter()


@router.post("/contact", response_model=ContactOut)
def submit_contact(body: ContactIn, db: Session = Depends(get_db)):
    contact = Contact(
        name=body.name,
        email=body.email,
        company=body.company,
        subject=body.subject,
        message=body.message,
    )
    db.add(contact)
    db.commit()
    return {"success": True, "message": "Message sent successfully! I'll get back to you soon."}
