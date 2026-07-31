---
name: SQLAlchemy reserved attribute names
description: "metadata" is reserved in SQLAlchemy DeclarativeBase — causes InvalidRequestError at class definition time
---

## Rule
Never use `metadata` as a mapped column attribute name on a SQLAlchemy DeclarativeBase model.

**Why:** SQLAlchemy's `DeclarativeBase` uses `metadata` internally for `MetaData`. Defining it as a `Mapped` column raises `InvalidRequestError: Attribute name 'metadata' is reserved`.

## How to apply
Use a different Python attribute name and map it to the real DB column name explicitly:

```python
# WRONG
metadata: Mapped[dict | None] = mapped_column(JSON)

# CORRECT
event_metadata: Mapped[dict | None] = mapped_column("metadata", JSON)
```

The second argument to `mapped_column()` is the actual DB column name, so the schema stays unchanged.
Also update any code that sets this attribute (e.g. `event.event_metadata = body.metadata`).
