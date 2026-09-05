import os
from typing import Generator

from sqlalchemy import create_engine
from sqlalchemy.engine import make_url
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker


def _postgresql_url():
    database_url = os.getenv("DATABASE_URL")
    if not database_url:
        raise RuntimeError(
            "DATABASE_URL is required. Configure a PostgreSQL connection string."
        )

    # Some PostgreSQL providers still return the legacy postgres:// scheme.
    if database_url.startswith("postgres://"):
        database_url = "postgresql://" + database_url[len("postgres://"):]

    url = make_url(database_url)
    if url.get_backend_name() != "postgresql":
        raise RuntimeError(
            "DATABASE_URL must use PostgreSQL (postgresql:// or postgres://). "
            f"Received backend: {url.get_backend_name()}"
        )

    # This backend uses synchronous SQLAlchemy sessions and psycopg2.
    return url.set(drivername="postgresql+psycopg2")


def _positive_int(name: str, default: int) -> int:
    value = int(os.getenv(name, str(default)))
    if value < 1:
        raise RuntimeError(f"{name} must be a positive integer.")
    return value


DATABASE_URL = _postgresql_url()
POOL_SIZE = _positive_int("DB_POOL_SIZE", 5)
MAX_OVERFLOW = _positive_int("DB_MAX_OVERFLOW", 10)
POOL_TIMEOUT = _positive_int("DB_POOL_TIMEOUT", 30)
POOL_RECYCLE = _positive_int("DB_POOL_RECYCLE", 1800)
CONNECT_TIMEOUT = _positive_int("DB_CONNECT_TIMEOUT", 10)

connect_args = {
    "connect_timeout": CONNECT_TIMEOUT,
    "application_name": os.getenv(
        "DB_APPLICATION_NAME", "aniket-portfolio-fastapi"
    ),
    # Keep idle TCP connections healthy when the API runs behind a proxy.
    "keepalives": 1,
    "keepalives_idle": _positive_int("DB_KEEPALIVES_IDLE", 60),
    "keepalives_interval": _positive_int("DB_KEEPALIVES_INTERVAL", 20),
    "keepalives_count": _positive_int("DB_KEEPALIVES_COUNT", 3),
}

sslmode = os.getenv("DB_SSLMODE")
if sslmode and "sslmode" not in DATABASE_URL.query:
    connect_args["sslmode"] = sslmode

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
    pool_use_lifo=True,
    pool_size=POOL_SIZE,
    max_overflow=MAX_OVERFLOW,
    pool_timeout=POOL_TIMEOUT,
    pool_recycle=POOL_RECYCLE,
    pool_reset_on_return="rollback",
    connect_args=connect_args,
)

SessionLocal = sessionmaker(
    bind=engine,
    autocommit=False,
    autoflush=False,
    expire_on_commit=False,
)


class Base(DeclarativeBase):
    pass


def initialize_database() -> None:
    """Create missing PostgreSQL tables without modifying existing data."""
    Base.metadata.create_all(bind=engine)


def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()