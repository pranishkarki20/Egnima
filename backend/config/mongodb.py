import os
from functools import lru_cache

from pymongo import MongoClient


@lru_cache(maxsize=1)
def get_mongo_client():
    """Return the shared MongoDB client, configured from MONGODB_URI."""
    uri = os.environ.get("MONGODB_URI")
    if not uri:
        raise RuntimeError("MONGODB_URI is not set. Add it to backend/.env.")

    return MongoClient(uri, serverSelectionTimeoutMS=5000)


def get_mongo_database():
    """Return the configured database from MONGODB_DATABASE."""
    database_name = os.environ.get("MONGODB_DATABASE")
    if not database_name:
        raise RuntimeError("MONGODB_DATABASE is not set. Add it to backend/.env.")

    return get_mongo_client()[database_name]


def check_mongo_connection():
    """Raise if Atlas cannot be reached or credentials are invalid."""
    get_mongo_client().admin.command("ping")
