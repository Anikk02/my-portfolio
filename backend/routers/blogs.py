from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Blog
from schemas import BlogOut

router = APIRouter()


@router.get("/blogs", response_model=list[BlogOut])
def list_blogs(db: Session = Depends(get_db)):
    return (
        db.query(Blog)
        .filter(Blog.published == True)
        .order_by(Blog.created_at.desc())
        .all()
    )


@router.get("/blogs/{slug}", response_model=BlogOut)
def get_blog(slug: str, db: Session = Depends(get_db)):
    blog = db.query(Blog).filter(Blog.slug == slug).first()
    if not blog:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return blog
