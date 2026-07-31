from fastapi import APIRouter
from schemas import GithubProfile, GithubRepo

router = APIRouter()

_PROFILE = GithubProfile(
    username="anikk0208",
    bio="Backend Engineer | B.Tech CSE @ AKTU | FastAPI • PostgreSQL • Redis • Docker",
    public_repos=12,
    followers=18,
    following=24,
    avatar_url="https://avatars.githubusercontent.com/u/anikk0208",
    html_url="https://github.com/anikk0208",
    total_stars=62,
    total_commits=380,
    top_languages=["Python", "SQL", "JavaScript", "Bash"],
)

_REPOS = [
    GithubRepo(
        name="api-security-middleware",
        description="Behavior-based API security middleware with 10+ independent components — policy evaluation, trust scoring, adaptive enforcement. 16–20 ms average latency using Redis.",
        url="https://github.com/anikk0208/api-security-middleware",
        stars=28,
        forks=5,
        language="Python",
        topics=["fastapi", "security", "redis", "postgresql", "middleware"],
    ),
    GithubRepo(
        name="fastapi-auth-system",
        description="Modular authentication system with JWT, Redis caching, role-based authorization, and email verification. Handles ~800 concurrent users.",
        url="https://github.com/anikk0208/fastapi-auth-system",
        stars=21,
        forks=4,
        language="Python",
        topics=["fastapi", "jwt", "redis", "postgresql", "authentication"],
    ),
    GithubRepo(
        name="mental-health-chatbot",
        description="AI-powered mental health chatbot using fine-tuned T5 Transformer with semantic retrieval, 99.2% safety rate.",
        url="https://github.com/anikk0208/mental-health-chatbot",
        stars=13,
        forks=2,
        language="Python",
        topics=["pytorch", "nlp", "mongodb", "huggingface", "transformers"],
    ),
]


@router.get("/github/profile", response_model=GithubProfile)
def get_github_profile():
    return _PROFILE


@router.get("/github/repos", response_model=list[GithubRepo])
def list_github_repos():
    return _REPOS
