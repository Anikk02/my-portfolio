from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Project
from schemas import ProjectOut

router = APIRouter()


@router.get("/projects", response_model=list[ProjectOut])
def list_projects(db: Session = Depends(get_db)):
    return db.query(Project).order_by(Project.order.asc()).all()


@router.get("/projects/featured", response_model=list[ProjectOut])
def list_featured_projects(db: Session = Depends(get_db)):
    return (
        db.query(Project)
        .filter(Project.featured == True)
        .order_by(Project.order.asc())
        .all()
    )


@router.get("/projects/{slug}", response_model=ProjectOut)
def get_project(slug: str, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.slug == slug).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project
