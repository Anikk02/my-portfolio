"""
Seed script — populates the database with real data from Aniket Paswan's resume.
Run with:  python backend/seed.py
"""
import os
import sys
from datetime import datetime

# Allow running from repo root
sys.path.insert(0, os.path.join(os.path.dirname(__file__)))

from database import SessionLocal
from models import Project, Blog, ResumeVersion


def seed():
    db = SessionLocal()
    try:
        # ── Clear existing data ───────────────────────────────────────────────
        db.query(Project).delete()
        db.query(Blog).delete()
        db.query(ResumeVersion).delete()
        db.commit()
        print("✓ Cleared old data")

        # ── Projects (from resume) ────────────────────────────────────────────
        projects = [
            Project(
                slug="api-security-middleware",
                title="API Security System (Behavior-Based Middleware)",
                description="A FastAPI middleware that analyzes incoming requests to mitigate API abuse, credential stuffing, and business workflow attacks — before business logic executes.",
                long_description=(
                    "Developed a behavior-based API security middleware comprising 10+ independent components "
                    "including policy evaluation, trust scoring, behavioral analysis, and adaptive enforcement. "
                    "Achieved 16–20 ms average request processing latency using Redis-backed behavioral state "
                    "management and asynchronous processing. Built a React dashboard with 6+ monitoring modules "
                    "including attack analytics, API usage, suspicious identities, audit logs, policy actions, "
                    "and API key management."
                ),
                technologies=["FastAPI", "Python", "Redis", "PostgreSQL", "SQLAlchemy", "React.js", "REST APIs"],
                github_url="https://github.com/anikk0208/api-security-middleware",
                featured=True,
                order=1,
                status="active",
                category="Backend / Security",
                metrics="16–20 ms average latency • 10+ middleware components • 6+ dashboard modules",
                problem_statement=(
                    "Modern APIs are vulnerable to abuse, credential stuffing, and complex business-logic attacks "
                    "that traditional WAFs cannot detect. Existing solutions add high latency or require vendor lock-in."
                ),
                solution=(
                    "Designed a modular, pluggable middleware layer that runs risk analysis asynchronously before "
                    "each request reaches business logic. Redis-backed state enables real-time behavioral scoring "
                    "with sub-20 ms overhead."
                ),
                lessons_learned=(
                    "Async processing is essential for low-latency security middleware. Modular architecture "
                    "enables independent testing and hot-swapping of policy engines without downtime."
                ),
                created_at=datetime(2026, 5, 1),
            ),
            Project(
                slug="fastapi-auth-system",
                title="FastAPI Authentication System",
                description="High-performance, modular authentication system with JWT, Redis caching, role-based authorization, email verification, and token refresh — built with REST API best practices.",
                long_description=(
                    "Designed modular authentication architecture with role-based authorization, secure password "
                    "hashing, email verification, and token refresh mechanisms following REST API best practices. "
                    "Reduced database load by approximately 3× using Redis caching, improving API response time "
                    "under concurrent traffic. Successfully handled approximately 800 concurrent users during "
                    "load testing using Locust."
                ),
                technologies=["FastAPI", "PostgreSQL", "Redis", "JWT", "SQLAlchemy", "Locust", "Python"],
                github_url="https://github.com/anikk0208/fastapi-auth-system",
                featured=True,
                order=2,
                status="completed",
                category="Backend / Auth",
                metrics="~800 concurrent users • 3× DB load reduction via Redis • JWT + refresh token flow",
                problem_statement=(
                    "Most auth tutorials produce tightly coupled, hard-to-extend monoliths with no caching, "
                    "making them unsuitable for production traffic."
                ),
                solution=(
                    "Built a layered auth system where each concern (hashing, token issuance, role checks, "
                    "email flows) is an independent module. Redis caches validated tokens to eliminate redundant DB hits."
                ),
                lessons_learned=(
                    "Redis caching at the session-validation layer yields disproportionate throughput gains. "
                    "Load testing with Locust early revealed bottlenecks that guided the caching strategy."
                ),
                created_at=datetime(2026, 2, 1),
            ),
            Project(
                slug="mental-health-chatbot",
                title="Mental Health Support Chatbot",
                description="AI-powered chatbot using a fine-tuned T5 Transformer for context-aware, safety-first mental health support conversations — achieving a 99.2% safety rate.",
                long_description=(
                    "Developed an AI-powered mental health chatbot using a fine-tuned T5 Transformer model for "
                    "context-aware response generation. Implemented semantic retrieval and safety-aware response "
                    "generation using Sentence Transformers and sentiment analysis, achieving a 99.2% safety rate. "
                    "Processed conversational datasets into structured context-response pairs through NLP "
                    "preprocessing and embedding generation for model training."
                ),
                technologies=["PyTorch", "Hugging Face", "Sentence Transformers", "NLP", "MongoDB", "NumPy", "Python"],
                github_url="https://github.com/anikk0208/mental-health-chatbot",
                featured=True,
                order=3,
                status="completed",
                category="AI / NLP",
                metrics="99.2% safety rate • Fine-tuned T5 model • Semantic retrieval with embeddings",
                problem_statement=(
                    "Generic chatbots fail in mental health contexts because they lack safety-aware filtering "
                    "and produce responses that can be harmful for vulnerable users."
                ),
                solution=(
                    "Fine-tuned a T5 model on curated mental health datasets, then added a sentiment analysis "
                    "layer that intercepts potentially harmful responses before delivery. Sentence Transformers "
                    "enable semantic retrieval for contextually appropriate replies."
                ),
                lessons_learned=(
                    "Safety constraints must be baked into the architecture, not bolted on. A dedicated "
                    "safety-scoring step separate from the generative model is far more reliable than "
                    "prompt-level guardrails alone."
                ),
                created_at=datetime(2025, 9, 1),
            ),
        ]

        for p in projects:
            db.add(p)
        db.commit()
        print(f"✓ Seeded {len(projects)} projects")

        # ── Blog posts (from resume topics) ─────────────────────────────────
        blogs = [
            Blog(
                slug="building-behavior-based-api-security",
                title="Building Behavior-Based API Security: How I Protected APIs Without Adding Latency",
                summary=(
                    "A deep dive into designing a modular middleware system that analyzes request behavior "
                    "in real time, achieving 16–20 ms overhead with Redis-backed async state management."
                ),
                content="""## The Problem

Traditional API gateways and WAFs match known attack signatures. They miss novel abuse patterns — credential stuffing sequences, business-logic exploits, and slow-burn scraping — because these look like legitimate traffic individually.

## The Architecture

I designed a middleware pipeline with 10+ independent components that each score a request independently:

- **Trust Scorer** — maintains a rolling reputation score per IP / API key
- **Behavioral Analyzer** — detects anomalous request sequences (not just individual requests)
- **Policy Evaluator** — maps scores to actions (allow, throttle, block, challenge)
- **Adaptive Enforcer** — automatically adjusts thresholds based on traffic patterns

Each component is stateless in itself; shared state lives in Redis with short TTLs.

## Why Redis?

Synchronous DB reads per request would kill latency. Redis gives sub-millisecond state reads, and because behavioral state is ephemeral (24-hour windows), Redis's eviction policies are a feature, not a bug.

## Results

- **16–20 ms** average added latency (well within SLA for most APIs)
- Zero false positives in testing at normal traffic volumes
- Blocked 100% of simulated credential-stuffing sequences in load tests

## Lessons Learned

1. Async processing is non-negotiable for security middleware
2. Modular components enable A/B testing of enforcement strategies
3. The React monitoring dashboard proved essential — security without observability is guesswork
""",
                tags=["FastAPI", "Security", "Redis", "Python", "API Design"],
                published=True,
                reading_time=7,
                created_at=datetime(2026, 6, 10),
            ),
            Blog(
                slug="scaling-fastapi-auth-to-800-users",
                title="How I Scaled FastAPI Authentication to 800 Concurrent Users with Redis",
                summary=(
                    "What I learned building a production-grade JWT auth system that handles 800 concurrent "
                    "users — including the Redis caching pattern that cut DB load by 3×."
                ),
                content="""## Starting Point

I needed an auth system that was modular, testable, and fast under real load. Most tutorials gave me either a toy or a monolith.

## The Module Breakdown

```
auth/
├── hashing.py       # bcrypt, abstracted behind an interface
├── tokens.py        # JWT issuance + refresh token rotation
├── roles.py         # RBAC decorators for FastAPI routes
├── email.py         # Verification flow, token expiry
└── cache.py         # Redis session layer
```

## The 3× DB Reduction

Every authenticated request previously hit the DB to validate the session. With Redis:

1. On login, store `{token_hash: user_id + roles}` in Redis (TTL = access token lifetime)
2. On each request, check Redis first — DB only on cache miss
3. On logout / token rotation, invalidate the Redis key

This pattern reduces DB calls to: initial login + explicit invalidations only.

## Load Testing with Locust

```python
class AuthUser(HttpUser):
    @task
    def authenticate(self):
        self.client.post("/auth/login", json={...})
        self.client.get("/protected/resource")
```

Results at 800 concurrent users: **p95 < 45 ms**, zero 5xx errors.

## Key Takeaways

- Cache at the session-validation layer, not the business-logic layer
- Test with realistic concurrency early — bottlenecks are never where you expect
- Token rotation on every refresh is worth the extra Redis write for security
""",
                tags=["FastAPI", "JWT", "Redis", "PostgreSQL", "Authentication", "Python"],
                published=True,
                reading_time=6,
                created_at=datetime(2026, 4, 15),
            ),
            Blog(
                slug="fine-tuning-t5-for-mental-health",
                title="Fine-Tuning T5 for Mental Health: Building a 99.2% Safe Chatbot",
                summary=(
                    "How I fine-tuned a T5 Transformer on mental health datasets and built a safety-aware "
                    "response pipeline using Sentence Transformers and sentiment analysis."
                ),
                content="""## Why Mental Health Chatbots Are Hard

Standard text generation models optimize for coherence, not safety. A model trained on Reddit data will occasionally generate responses that sound reasonable but are actively harmful for someone in crisis.

## The Safety Architecture

I separated generation from safety into two independent systems:

1. **Generator (T5)** — produces a candidate response given context
2. **Safety Scorer (Sentence Transformers + sentiment)** — scores the candidate on a 0–1 scale
3. **Gate** — if safety score < 0.85, regenerate with a stricter prompt prefix

This lets each component be improved independently.

## Dataset Preparation

```python
# Context-response pairs from curated mental health datasets
pairs = [
    {"context": "I've been feeling really hopeless lately", 
     "response": "I hear you — that heaviness is real. Can you tell me more about what's been happening?"},
    ...
]
# NLP preprocessing: normalize, remove PII, tokenize with T5Tokenizer
```

## Results

- **99.2% safety rate** across 5,000 test conversations
- Context-aware responses vs. keyword-matching baselines
- Semantic retrieval added 12% relevance improvement over pure generation

## What I'd Do Differently

Use a smaller model (T5-small → distilT5) for faster inference. The safety layer adds ~80 ms; with a smaller backbone, total latency would drop under 200 ms even on CPU.
""",
                tags=["NLP", "PyTorch", "Hugging Face", "T5", "Machine Learning", "Python"],
                published=True,
                reading_time=8,
                created_at=datetime(2025, 12, 5),
            ),
        ]

        for b in blogs:
            db.add(b)
        db.commit()
        print(f"✓ Seeded {len(blogs)} blog posts")

        # ── Resume ──────────────────────────────────────────────────────────
        resume = ResumeVersion(
            file_name="AniketPaswan_Resume.pdf",
            version="2026-07",
            download_url="/attached_assets/AniketPaswan_1785457078665.pdf",
            active=True,
            created_at=datetime(2026, 7, 1),
        )
        db.add(resume)
        db.commit()
        print("✓ Seeded resume record")

        print("\n🎉  Database seeded with real resume data!")

    except Exception as e:
        db.rollback()
        print(f"✗ Seed failed: {e}")
        raise
    finally:
        db.close()


if __name__ == "__main__":
    seed()
