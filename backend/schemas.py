from datetime import datetime
from typing import Any
from pydantic import BaseModel, EmailStr


# ── Projects ─────────────────────────────────────────────────────────────────

class ProjectOut(BaseModel):
    id: int
    slug: str
    title: str
    description: str
    long_description: str | None = None
    cover_image: str | None = None
    technologies: list[str] = []
    github_url: str | None = None
    live_url: str | None = None
    featured: bool
    order: int
    status: str
    category: str | None = None
    metrics: str | None = None
    problem_statement: str | None = None
    solution: str | None = None
    lessons_learned: str | None = None
    created_at: datetime

    model_config = {"from_attributes": True}


# ── Blogs ─────────────────────────────────────────────────────────────────────

class BlogOut(BaseModel):
    id: int
    slug: str
    title: str
    summary: str
    content: str | None = None
    cover_image: str | None = None
    tags: list[str] = []
    published: bool
    reading_time: int | None = None
    created_at: datetime

    model_config = {"from_attributes": True}


# ── Contact ───────────────────────────────────────────────────────────────────

class ContactIn(BaseModel):
    name: str
    email: str
    company: str | None = None
    subject: str
    message: str


class ContactOut(BaseModel):
    success: bool
    message: str


# ── Resume ───────────────────────────────────────────────────────────────────

class ResumeOut(BaseModel):
    id: int
    file_name: str
    version: str
    download_url: str
    active: bool
    created_at: datetime

    model_config = {"from_attributes": True}


# ── GitHub (static) ──────────────────────────────────────────────────────────

class GithubProfile(BaseModel):
    username: str
    bio: str
    public_repos: int
    followers: int
    following: int
    avatar_url: str
    html_url: str
    total_stars: int
    total_commits: int
    top_languages: list[str]


class GithubRepo(BaseModel):
    name: str
    description: str
    url: str
    stars: int
    forks: int
    language: str
    topics: list[str]


# ── Search ───────────────────────────────────────────────────────────────────

class SearchResults(BaseModel):
    projects: list[ProjectOut]
    blogs: list[BlogOut]


# ── Newsletter ───────────────────────────────────────────────────────────────

class NewsletterIn(BaseModel):
    email: str
    name: str | None = None


class NewsletterOut(BaseModel):
    success: bool
    message: str


# ── Analytics ────────────────────────────────────────────────────────────────

class AnalyticsIn(BaseModel):
    event: str
    page: str
    metadata: dict[str, Any] | None = None


class AnalyticsOut(BaseModel):
    success: bool


# ── Health ───────────────────────────────────────────────────────────────────

class HealthStatus(BaseModel):
    status: str
