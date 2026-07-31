from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_
from database import get_db
from models import Project, Blog
from schemas import SearchResults

router = APIRouter()


@router.get("/search", response_model=SearchResults)
def global_search(q: str = Query(..., min_length=1), db: Session = Depends(get_db)):
    term = f"%{q}%"

    projects = (
        db.query(Project)
        .filter(
            or_(
                Project.title.ilike(term),
                Project.description.ilike(term),
            )
        )
        .limit(10)
        .all()
    )

    blogs = (
        db.query(Blog)
        .filter(
            Blog.published == True,
            or_(
                Blog.title.ilike(term),
                Blog.summary.ilike(term),
            ),
        )
        .limit(10)
        .all()
    )

    return {"projects": projects, "blogs": blogs}
