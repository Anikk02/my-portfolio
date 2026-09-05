from datetime import datetime
from typing import Any
from pydantic import BaseModel, ConfigDict, EmailStr


def to_camel(value: str) -> str:
    head, *tail = value.split("_")
    return head + "".join(part.capitalize() for part in tail)


class APIModel(BaseModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        from_attributes=True,
    )


# ── Projects ─────────────────────────────────────────────────────────────────

class ProjectOut(APIModel):
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

# ── Blogs ─────────────────────────────────────────────────────────────────────

class BlogOut(APIModel):
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

# ── Contact ───────────────────────────────────────────────────────────────────

class ContactIn(APIModel):
    name: str
    email: str
    company: str | None = None
    subject: str
    message: str


class ContactOut(APIModel):
    success: bool
    message: str


# ── Resume ───────────────────────────────────────────────────────────────────

class ResumeOut(APIModel):
    id: int
    file_name: str
    version: str
    download_url: str
    active: bool
    created_at: datetime

# ── GitHub (static) ──────────────────────────────────────────────────────────

class GithubProfile(APIModel):
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


class GithubRepo(APIModel):
    name: str
    description: str
    url: str
    stars: int
    forks: int
    language: str
    topics: list[str]


# ── Search ───────────────────────────────────────────────────────────────────

class SearchResults(APIModel):
    projects: list[ProjectOut]
    blogs: list[BlogOut]


# ── Newsletter ───────────────────────────────────────────────────────────────

class NewsletterIn(APIModel):
    email: str
    name: str | None = None


class NewsletterOut(APIModel):
    success: bool
    message: str


# ── Analytics ────────────────────────────────────────────────────────────────

class AnalyticsIn(APIModel):
    event: str
    page: str
    metadata: dict[str, Any] | None = None


class AnalyticsOut(APIModel):
    success: bool


# ── Health ───────────────────────────────────────────────────────────────────

class HealthStatus(APIModel):
    status: str
