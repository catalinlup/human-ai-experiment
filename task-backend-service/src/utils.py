import uuid
from datetime import datetime


def get_uuid():
    """
    Generates a UUID.
    """
    return str(uuid.uuid4())


def get_current_utc_timestamp():
    """
    Returns the current UTC timestamp.
    """
    return datetime.utcnow().timestamp()
