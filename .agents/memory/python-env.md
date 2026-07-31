---
name: Python environment
description: How Python packages are installed and referenced in this Replit NixOS environment
---

## Rule
Use `installLanguagePackages({ language: "python", packages: [...] })` in CodeExecution — never `pip install` directly in a shell command (NixOS blocks it).

**Why:** The NixOS filesystem is immutable. `pip install` at the shell level hits PEP 668 / externally-managed-environment error.

## How to apply
- Installed packages land in `/home/runner/workspace/.pythonlibs/`
- Uvicorn binary path: `/home/runner/workspace/.pythonlibs/bin/uvicorn`
- Use the full path in artifact.toml run commands so the correct venv is used
- Python interpreter: `/home/runner/workspace/.pythonlibs/bin/python` (or system python3 — both resolve the venv)

## Workflow run command pattern
```
cd /home/runner/workspace/backend && /home/runner/workspace/.pythonlibs/bin/uvicorn main:app --host 0.0.0.0 --port 8080 --reload
```
