---
name: Backend architecture
description: Project structure — FastAPI in backend/, React in frontend/, artifacts/ are Replit config wrappers only
---

## Rule
Source code lives in `backend/` (Python/FastAPI) and `frontend/` (React+Vite).
The `artifacts/` directories only contain `.replit-artifact/artifact.toml` — no source code.

**Why:** User explicitly requested backend/ and frontend/ as top-level directories.
Replit artifact routing still works because artifact.toml run commands reference the real paths.

## How to apply
- Backend changes → edit files in `backend/`
- Frontend changes → edit files in `frontend/`
- Artifact routing config → edit via `verifyAndReplaceArtifactToml()` on `artifacts/*/. replit-artifact/artifact.toml`
- `pnpm-workspace.yaml` includes `frontend` as a workspace package (`@workspace/frontend`)

## Key files
- `backend/main.py` — FastAPI app factory
- `backend/database.py` — SQLAlchemy engine + `get_db()` dependency
- `backend/models.py` — ORM models (match existing Drizzle-managed tables)
- `backend/schemas.py` — Pydantic request/response schemas
- `backend/seed.py` — populates DB with real resume data (clears first)
- `frontend/vite.config.ts` — note: `@assets` alias is `../attached_assets` (one level up from frontend/, not two)
- `frontend/tsconfig.json` — extends `../tsconfig.base.json`, references `../lib/api-client-react`
