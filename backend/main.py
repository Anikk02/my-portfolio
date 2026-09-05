from contextlib import asynccontextmanager
import logging
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, initialize_database
from routers import projects, blogs, contact, resume, github, search, newsletter, analytics
from schemas import HealthStatus
from seed import seed_if_empty

logger = logging.getLogger("uvicorn.error")


@asynccontextmanager
async def lifespan(_app: FastAPI):
    initialize_database()
    logger.info("PostgreSQL tables are ready")

    auto_seed = os.getenv("AUTO_SEED_DATA", "true").lower() in {
        "1",
        "true",
        "yes",
        "on",
    }
    if auto_seed and seed_if_empty():
        logger.info("Inserted initial portfolio data")

    yield
    engine.dispose()


app = FastAPI(
    title="Aniket Portfolio API",
    version="0.1.0",
    description="Backend API for Aniket Paswan's portfolio",
    lifespan=lifespan,
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