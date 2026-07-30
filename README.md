# Aniket Paswan — Portfolio

A full-stack, dark-tech portfolio website for **Aniket Paswan** (Backend Engineer).  
Built with React + Vite (frontend) and Express (backend) in a **pnpm monorepo**, backed by a PostgreSQL database.

---

## Table of Contents

- [Live Preview](#live-preview)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
- [Database](#database)
- [API Reference](#api-reference)
- [Frontend Pages & Components](#frontend-pages--components)
- [Shared Libraries](#shared-libraries)
- [Scripts](#scripts)
- [Deployment](#deployment)

---

## Live Preview

| Service    | URL (local dev)              |
|------------|------------------------------|
| Portfolio  | `http://localhost:<PORT>/`   |
| API Server | `http://localhost:8080/api/` |

---

## Tech Stack

| Layer        | Technology                                                         |
|--------------|--------------------------------------------------------------------|
| Frontend     | React 18, Vite 7, TypeScript, Tailwind CSS, Framer Motion, Wouter |
| UI Components| shadcn/ui (Radix UI primitives), Lucide React, React Icons         |
| Backend      | Node.js, Express 5, TypeScript, Pino (structured logging)          |
| Database     | PostgreSQL via Drizzle ORM                                         |
| API Contract | OpenAPI 3.1 → Orval codegen → Zod schemas + React Query hooks      |
| Package Mgr  | pnpm workspaces (monorepo)                                         |

---

## Folder Structure

```
workspace/
├── artifacts/                        # Runnable services (apps)
│   ├── portfolio/                    # ── Frontend (React + Vite)
│   │   ├── src/
│   │   │   ├── App.tsx               # Root app, QueryClient, router
│   │   │   ├── main.tsx              # React entry point
│   │   │   ├── index.css             # Tailwind + CSS variables (dark theme)
│   │   │   ├── components/
│   │   │   │   ├── BootSequence.tsx  # Animated loading screen
│   │   │   │   └── layout/
│   │   │   │       ├── Navbar.tsx    # Sticky nav with search toggle
│   │   │   │       └── Footer.tsx    # Footer with social links
│   │   │   ├── pages/
│   │   │   │   ├── Home/
│   │   │   │   │   ├── index.tsx     # Home page assembler
│   │   │   │   │   ├── Hero.tsx      # Animated hero section
│   │   │   │   │   ├── About.tsx     # About / bio section
│   │   │   │   │   ├── Skills.tsx    # Tech skill grid
│   │   │   │   │   ├── Projects.tsx  # Featured projects grid
│   │   │   │   │   ├── Experience.tsx# Timeline / work history
│   │   │   │   │   ├── Blog.tsx      # Latest blog posts
│   │   │   │   │   └── Contact.tsx   # Contact form
│   │   │   │   ├── ProjectDetail.tsx # Single project page
│   │   │   │   ├── BlogDetail.tsx    # Single blog post page
│   │   │   │   └── not-found.tsx     # 404 page
│   │   │   ├── hooks/
│   │   │   │   ├── use-debounce.ts   # Debounce hook (search)
│   │   │   │   ├── use-mobile.tsx    # Responsive breakpoint hook
│   │   │   │   └── use-toast.ts      # Toast notifications
│   │   │   ├── lib/
│   │   │   │   └── utils.ts          # cn() and shared helpers
│   │   │   └── components/ui/        # shadcn/ui component library
│   │   ├── package.json
│   │   ├── vite.config.ts
│   │   └── tsconfig.json
│   │
│   ├── api-server/                   # ── Backend (Express API)
│   │   ├── src/
│   │   │   ├── index.ts              # Server bootstrap (port, listen)
│   │   │   ├── app.ts                # Express app factory (CORS, middleware)
│   │   │   ├── lib/
│   │   │   │   ├── logger.ts         # Pino logger setup
│   │   │   │   └── serialize.ts      # serializeDates() — Drizzle→Zod compat
│   │   │   ├── middlewares/          # (reserved for future middleware)
│   │   │   └── routes/
│   │   │       ├── index.ts          # Mounts all routers at /api
│   │   │       ├── health.ts         # GET /api/healthz
│   │   │       ├── projects.ts       # GET /api/projects, /featured, /:slug
│   │   │       ├── blogs.ts          # GET /api/blogs, /api/blogs/:slug
│   │   │       ├── contact.ts        # POST /api/contact
│   │   │       ├── resume.ts         # GET /api/resume/latest
│   │   │       ├── github.ts         # GET /api/github/profile + /repos (static)
│   │   │       ├── search.ts         # GET /api/search?q=
│   │   │       ├── newsletter.ts     # POST /api/newsletter
│   │   │       └── analytics.ts      # POST /api/analytics/event
│   │   ├── build.mjs                 # esbuild bundler script
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── mockup-sandbox/               # ── Design sandbox (internal tooling)
│       └── ...                       # Used by Replit Agent for UI prototyping
│
├── lib/                              # Shared workspace libraries
│   ├── api-spec/
│   │   └── openapi.yaml              # OpenAPI 3.1 contract (source of truth)
│   ├── api-client-react/             # Auto-generated React Query hooks (Orval)
│   │   └── src/generated/api.ts
│   ├── api-zod/                      # Auto-generated Zod schemas (Orval)
│   │   └── src/generated/
│   │       ├── api.ts                # All schemas
│   │       └── types/                # Per-resource type files
│   └── db/                           # Database layer (Drizzle ORM)
│       ├── drizzle.config.ts         # DB connection + schema path
│       └── src/
│           ├── index.ts              # Re-exports db client
│           └── schema/
│               ├── index.ts          # Barrel export
│               ├── projects.ts       # projects table
│               ├── blogs.ts          # blogs table
│               ├── contacts.ts       # contacts table
│               ├── resume.ts         # resume table
│               ├── newsletter.ts     # newsletter_subscribers table
│               └── analytics.ts      # analytics_events table
│
├── scripts/                          # Workspace utility scripts
│   ├── post-merge.sh                 # Runs after task-agent merges
│   └── src/hello.ts
│
├── package.json                      # Root workspace config
├── pnpm-workspace.yaml               # pnpm workspace glob patterns
├── pnpm-lock.yaml
├── tsconfig.json                     # Root TypeScript project references
├── tsconfig.base.json                # Shared TS compiler options
└── README.md                         # ← You are here
```

---

## Prerequisites

| Tool       | Version  | Notes                                   |
|------------|----------|-----------------------------------------|
| Node.js    | ≥ 20     | LTS recommended                         |
| pnpm       | ≥ 9      | `npm install -g pnpm`                   |
| PostgreSQL | ≥ 15     | Local or cloud instance (Neon, Supabase) |

---

## Environment Variables

Create a `.env` file at the repo root **or** set these in your hosting environment.

| Variable       | Required | Description                                         |
|----------------|----------|-----------------------------------------------------|
| `DATABASE_URL` | ✅ Yes   | Full PostgreSQL connection string. Example: `postgresql://user:pass@host:5432/dbname` |
| `SESSION_SECRET` | ✅ Yes  | Secret string used for session signing              |
| `PORT`         | Optional | Port the API server binds to (default: `8080`)      |
| `NODE_ENV`     | Optional | `development` or `production`                       |

> **Note:** On Replit these are managed as Secrets and are automatically injected — you do not need a `.env` file.

---

## Getting Started

```bash
# 1. Clone and install
git clone <repo-url>
cd workspace
pnpm install

# 2. Set your DATABASE_URL (see Environment Variables above)

# 3. Push the database schema (creates all tables)
pnpm --filter @workspace/db run push

# 4. Start both services in separate terminals

# Terminal A — API server (port 8080)
pnpm --filter @workspace/api-server run dev

# Terminal B — Portfolio frontend
pnpm --filter @workspace/portfolio run dev
```

Open `http://localhost:<VITE_PORT>/` for the site and `http://localhost:8080/api/healthz` to confirm the API is up.

---

## Database

Drizzle ORM manages all schema migrations. Tables are:

| Table                  | Purpose                                    |
|------------------------|--------------------------------------------|
| `projects`             | Portfolio project entries                  |
| `blogs`                | Blog posts with markdown content           |
| `contacts`             | Submissions from the contact form          |
| `resume`               | Resume file metadata / download URL        |
| `newsletter_subscribers` | Email subscribers                        |
| `analytics_events`     | Page-view / interaction event log          |

### Common DB commands

```bash
# Push schema changes to the database (dev)
pnpm --filter @workspace/db run push

# Force-push (drops conflicting constraints — use with caution)
pnpm --filter @workspace/db run push-force
```

---

## API Reference

Base path: `/api`  
Full schema: [`lib/api-spec/openapi.yaml`](lib/api-spec/openapi.yaml)

| Method | Endpoint                  | Description                        |
|--------|---------------------------|------------------------------------|
| GET    | `/healthz`                | Health check                       |
| GET    | `/projects`               | All projects (ordered)             |
| GET    | `/projects/featured`      | Featured projects only             |
| GET    | `/projects/:slug`         | Single project by slug             |
| GET    | `/blogs`                  | All blog posts                     |
| GET    | `/blogs/:slug`            | Single blog post by slug           |
| POST   | `/contact`                | Submit contact form                |
| GET    | `/resume/latest`          | Latest resume metadata             |
| GET    | `/github/profile`         | GitHub profile (static)            |
| GET    | `/github/repos`           | GitHub repos (static)              |
| GET    | `/search?q=<term>`        | Full-text search across projects + blogs |
| POST   | `/newsletter`             | Subscribe to newsletter            |
| POST   | `/analytics/event`        | Track an analytics event           |

### Codegen

The API client and Zod schemas are generated from the OpenAPI spec using **Orval**.  
After changing `lib/api-spec/openapi.yaml`, regenerate:

```bash
pnpm --filter @workspace/api-client-react run generate
pnpm --filter @workspace/api-zod run generate
```

---

## Frontend Pages & Components

| Route              | Component           | Data source                               |
|--------------------|---------------------|-------------------------------------------|
| `/`                | `Home/index.tsx`    | Assembles all sections below              |
| `/`                | `Hero.tsx`          | Static + GitHub profile API               |
| `/`                | `About.tsx`         | Static content                            |
| `/`                | `Skills.tsx`        | Static skill list with tech icons         |
| `/`                | `Projects.tsx`      | `GET /api/projects/featured`              |
| `/`                | `Experience.tsx`    | Static timeline                           |
| `/`                | `Blog.tsx`          | `GET /api/blogs`                          |
| `/`                | `Contact.tsx`       | `POST /api/contact`                       |
| `/projects/:slug`  | `ProjectDetail.tsx` | `GET /api/projects/:slug`                 |
| `/blog/:slug`      | `BlogDetail.tsx`    | `GET /api/blogs/:slug`                    |

**Layout components:**
- `Navbar.tsx` — sticky top bar, smooth-scroll links, search toggle
- `Footer.tsx` — social links, copyright
- `BootSequence.tsx` — terminal-style loading animation on first visit

---

## Shared Libraries

| Package                    | Role                                                    |
|----------------------------|---------------------------------------------------------|
| `@workspace/api-spec`      | OpenAPI 3.1 YAML — single source of truth for the API   |
| `@workspace/api-client-react` | Orval-generated React Query hooks consumed by the frontend |
| `@workspace/api-zod`       | Orval-generated Zod schemas used by the API server for request/response validation |
| `@workspace/db`            | Drizzle ORM client + all table schemas                  |

---

## Scripts

```bash
# Type-check the entire monorepo
pnpm run typecheck

# Build everything
pnpm run build

# Build only the API server
pnpm --filter @workspace/api-server run build

# Build only the portfolio (static output)
pnpm --filter @workspace/portfolio run build
```

---

## Deployment

The project is configured for **Replit Deployments** (autoscale).

1. Set all environment variables as Replit Secrets (`DATABASE_URL`, `SESSION_SECRET`).
2. Click **Deploy** in the Replit workspace — both workflows start automatically.
3. The portfolio is served at the deployment's root URL.
4. The API server is proxied behind the same domain at `/api/`.

For other platforms (Railway, Render, Fly.io, etc.):
- Build the API: `pnpm --filter @workspace/api-server run build` → serve `dist/index.mjs`
- Build the frontend: `pnpm --filter @workspace/portfolio run build` → serve `dist/` as static files
- Ensure `DATABASE_URL` and `SESSION_SECRET` are set in the environment.

---

*Built with ❤️ using React, Express, Drizzle ORM, and Framer Motion.*
