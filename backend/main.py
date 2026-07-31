import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import projects, blogs, contact, resume, github, search, newsletter, analytics
from schemas import HealthStatus

app = FastAPI(
    title="Aniket Portfolio API",
    version="0.1.0",
    description="Backend API for Aniket Paswan's portfolio",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(projects.router, prefix="/api", tags=["projects"])
app.include_router(blogs.router, prefix="/api", tags=["blogs"])
app.include_router(contact.router, prefix="/api", tags=["contact"])
app.include_router(resume.router, prefix="/api", tags=["resume"])
app.include_router(github.router, prefix="/api", tags=["github"])
app.include_router(search.router, prefix="/api", tags=["search"])
app.include_router(newsletter.router, prefix="/api", tags=["newsletter"])
app.include_router(analytics.router, prefix="/api", tags=["analytics"])


@app.get("/api/healthz", response_model=HealthStatus, tags=["health"])
def health_check():
    return {"status": "ok"}
