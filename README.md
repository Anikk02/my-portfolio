# Aniket Paswan — Portfolio

A full-stack, dark-tech portfolio website for **Aniket Paswan** (Backend Engineer).  
**FastAPI** (Python) backend + **React + Vite** (TypeScript) frontend, backed by PostgreSQL.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
- [Database & Seeding](#database--seeding)
- [API Reference](#api-reference)
- [Frontend Pages & Components](#frontend-pages--components)
- [Shared Libraries](#shared-libraries)
- [Deployment](#deployment)

---

## Tech Stack

| Layer        | Technology                                                              |
|--------------|-------------------------------------------------------------------------|
| **Backend**  | Python 3.13, FastAPI, Uvicorn, SQLAlchemy 2, Pydantic v2               |
| **Database** | PostgreSQL (Drizzle ORM for schema management, SQLAlchemy for queries)  |
| **Frontend** | React 18, Vite 7, TypeScript, Tailwind CSS, Framer Motion, Wouter      |
| **UI**       | shadcn/ui (Radix UI primitives), Lucide React, React Icons              |
| **API Hooks**| TanStack React Query + Orval-generated hooks from OpenAPI spec          |
| **Package**  | pnpm workspaces (monorepo)                                              |

---

## Folder Structure

```
workspace/
│
├── backend/                          # ── FastAPI Python backend
│   ├── main.py                       # App factory, CORS, router mounting
│   ├── database.py                   # SQLAlchemy engine + session + get_db()
│   ├── models.py                     # ORM models (Project, Blog, Contact, …)
│   ├── schemas.py                    # Pydantic request/response schemas
│   ├── requirements.txt              # Python dependencies
│   ├── seed.py                       # Seed script — real resume data
│   └── routers/
│       ├── projects.py               # GET /api/projects, /featured, /:slug
│       ├── blogs.py                  # GET /api/blogs, /api/blogs/:slug
│       ├── contact.py                # POST /api/contact
│       ├── resume.py                 # GET /api/resume/latest
│       ├── github.py                 # GET /api/github/profile + /repos
│       ├── search.py                 # GET /api/search?q=
│       ├── newsletter.py             # POST /api/newsletter
│       └── analytics.py             # POST /api/analytics/event
│
├── frontend/                         # ── React + Vite frontend
│   ├── src/
│   │   ├── App.tsx                   # Root app, QueryClient, Wouter router
│   │   ├── main.tsx                  # React entry point
│   │   ├── index.css                 # Tailwind + CSS variables (dark theme)
│   │   ├── components/
│   │   │   ├── BootSequence.tsx      # Terminal-style loading animation
│   │   │   └── layout/
│   │   │       ├── Navbar.tsx        # Sticky nav with search toggle
│   │   │       └── Footer.tsx        # Footer with social links
│   │   ├── pages/
│   │   │   ├── Home/
│   │   │   │   ├── index.tsx         # Home page assembler
│   │   │   │   ├── Hero.tsx          # Animated hero + tech badge row
│   │   │   │   ├── About.tsx         # Bio + education section
│   │   │   │   ├── Skills.tsx        # Tech skill grid with icons
│   │   │   │   ├── Projects.tsx      # Featured projects grid
│   │   │   │   ├── Experience.tsx    # Timeline / journey
│   │   │   │   ├── Blog.tsx          # Latest blog posts
│   │   │   │   └── Contact.tsx       # Contact form → POST /api/contact
│   │   │   ├── ProjectDetail.tsx     # Single project page
│   │   │   ├── BlogDetail.tsx        # Single blog post page
│   │   │   └── not-found.tsx         # 404 page
│   │   ├── hooks/
│   │   │   ├── use-debounce.ts       # Debounce hook (search bar)
│   │   │   ├── use-mobile.tsx        # Responsive breakpoint hook
│   │   │   └── use-toast.ts          # Toast notifications
│   │   ├── lib/
│   │   │   └── utils.ts              # cn() and shared helpers
│   │   └── components/ui/            # shadcn/ui component library
│   ├── package.json                  # @workspace/frontend
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── index.html
│   └── components.json
│
├── lib/                              # ── Shared workspace libraries
│   ├── api-spec/
│   │   └── openapi.yaml              # OpenAPI 3.1 contract (source of truth)
│   ├── api-client-react/             # Orval-generated React Query hooks
│   │   └── src/generated/api.ts
│   ├── api-zod/                      # Orval-generated Zod schemas
│   │   └── src/generated/
│   └── db/                           # Drizzle ORM (schema + migrations)
│       ├── drizzle.config.ts
│       └── src/schema/
│           ├── projects.ts
│           ├── blogs.ts
│           ├── contacts.ts
│           ├── resume.ts
│           ├── newsletter.ts
│           └── analytics.ts
│
├── artifacts/                        # Replit service wrappers (config only)
│   ├── portfolio/.replit-artifact/   # Routes web traffic → frontend/
│   └── api-server/.replit-artifact/  # Routes /api traffic → backend/
│
├── attached_assets/
│   └── AniketPaswan_*.pdf            # Resume PDF (served for download)
│
├── package.json                      # Root workspace config
├── pnpm-workspace.yaml               # Includes: artifacts/*, frontend, lib/*
├── tsconfig.base.json                # Shared TS compiler options
└── README.md
```

---

## Prerequisites

| Tool       | Version  | Notes                                    |
|------------|----------|------------------------------------------|
| Node.js    | ≥ 20     | LTS recommended                          |
| pnpm       | ≥ 9      | `npm install -g pnpm`                    |
| Python     | ≥ 3.11   | 3.13 used in production                  |
| PostgreSQL | ≥ 15     | Local or cloud (Neon, Supabase, etc.)    |

---

## Environment Variables

| Variable         | Required | Description                                                     |
|------------------|----------|-----------------------------------------------------------------|
| `DATABASE_URL`   | ✅ Yes   | PostgreSQL connection string, e.g. `postgresql://user:pass@host:5432/db` |
| `SESSION_SECRET` | ✅ Yes   | Secret string for session signing                               |
| `PORT`           | Optional | Frontend dev server port (Replit sets this automatically)       |
| `BASE_PATH`      | Optional | Frontend URL base path (Replit sets this automatically)         |

> On **Replit**, these are managed as Secrets and injected automatically — no `.env` file needed.

---

## Getting Started

### 1. Install dependencies

```bash
# JavaScript packages (frontend + shared libs)
pnpm install

# Python packages (backend)
pip install -r backend/requirements.txt
```

### 2. Push the database schema

```bash
pnpm --filter @workspace/db run push
```

### 3. Seed the database with real resume data

```bash
python backend/seed.py
```

This inserts:
- **3 projects** — API Security System, FastAPI Auth System, Mental Health Chatbot
- **3 blog posts** — technical write-ups matching each project
- **1 resume record** — links to the PDF in `attached_assets/`

### 4. Start both services

```bash
# Terminal A — FastAPI backend (port 8080)
cd backend
uvicorn main:app --host 0.0.0.0 --port 8080 --reload

# Terminal B — React frontend
PORT=3000 BASE_PATH=/ pnpm --filter @workspace/frontend run dev
```

Open `http://localhost:3000` for the site, `http://localhost:8080/api/healthz` to confirm the API.

---

## Database & Seeding

**Schema** is managed by [Drizzle ORM](https://orm.drizzle.team/) in `lib/db/src/schema/`.  
**Queries** are made by the FastAPI backend using SQLAlchemy (same tables).

| Table                    | Purpose                                    |
|--------------------------|--------------------------------------------|
| `projects`               | Portfolio projects with full detail        |
| `blogs`                  | Published blog posts with markdown content |
| `contacts`               | Contact form submissions                   |
| `resume_versions`        | Resume metadata and download URL           |
| `newsletter_subscribers` | Email newsletter subscribers               |
| `analytics_events`       | Page-view and interaction event log        |

### Schema commands

```bash
# Apply schema changes to the database
pnpm --filter @workspace/db run push

# Re-seed with fresh real data (clears then re-inserts)
python backend/seed.py
```

---

## API Reference

Base path: `/api` — served by FastAPI on port `8080`.  
Interactive docs: `http://localhost:8080/docs` (Swagger UI, auto-generated).

| Method | Endpoint                  | Description                             |
|--------|---------------------------|-----------------------------------------|
| GET    | `/api/healthz`            | Health check — returns `{"status":"ok"}`|
| GET    | `/api/projects`           | All projects ordered by display order   |
| GET    | `/api/projects/featured`  | Featured projects only                  |
| GET    | `/api/projects/{slug}`    | Single project by slug                  |
| GET    | `/api/blogs`              | All published blog posts (newest first) |
| GET    | `/api/blogs/{slug}`       | Single blog post by slug                |
| POST   | `/api/contact`            | Submit contact form                     |
| GET    | `/api/resume/latest`      | Latest active resume metadata           |
| GET    | `/api/github/profile`     | GitHub profile stats                    |
| GET    | `/api/github/repos`       | GitHub repository list                  |
| GET    | `/api/search?q={term}`    | Full-text search across projects + blogs|
| POST   | `/api/newsletter`         | Subscribe to newsletter                 |
| POST   | `/api/analytics/event`    | Track a page-view or interaction event  |

> **Swagger UI** is available at `/docs` when running locally — no extra setup needed.

---

## Frontend Pages & Components

| Route              | Component           | Data source                                   |
|--------------------|---------------------|-----------------------------------------------|
| `/`                | `Home/Hero.tsx`     | `GET /api/github/profile`, `GET /api/resume/latest` |
| `/`                | `Home/Projects.tsx` | `GET /api/projects/featured`                  |
| `/`                | `Home/Blog.tsx`     | `GET /api/blogs`                              |
| `/`                | `Home/Contact.tsx`  | `POST /api/contact`                           |
| `/`                | `Home/Skills.tsx`   | Static (from resume tech stack)               |
| `/`                | `Home/Experience.tsx`| Static (education + open-source timeline)    |
| `/projects/:slug`  | `ProjectDetail.tsx` | `GET /api/projects/{slug}`                    |
| `/blog/:slug`      | `BlogDetail.tsx`    | `GET /api/blogs/{slug}`                       |

All API calls use **TanStack React Query** hooks auto-generated from `lib/api-spec/openapi.yaml` via Orval.

---

## Shared Libraries

| Package                       | Role                                                         |
|-------------------------------|--------------------------------------------------------------|
| `@workspace/api-spec`         | OpenAPI 3.1 YAML — single source of truth for the API        |
| `@workspace/api-client-react` | Orval-generated React Query hooks used by `frontend/`        |
| `@workspace/api-zod`          | Orval-generated Zod schemas (kept for reference / migration) |
| `@workspace/db`               | Drizzle ORM schema + `DATABASE_URL`-based client             |

### Regenerate API client after spec changes

```bash
pnpm --filter @workspace/api-spec codegen
```

---

## Deployment

The project runs on **Replit Autoscale**:

- `backend/` → FastAPI served by Uvicorn on `/api`
- `frontend/` → Vite static build served at `/`

For other platforms (Railway, Render, Fly.io):

```bash
# Build frontend
pnpm --filter @workspace/frontend run build
# Serve frontend/dist/public as static files

# Run backend
cd backend && uvicorn main:app --host 0.0.0.0 --port 8080
```

Make sure `DATABASE_URL` and `SESSION_SECRET` are set in the environment.

---

*Aniket Paswan · Backend Engineer · anikk0208@gmail.com · GitHub: anikk0208*
