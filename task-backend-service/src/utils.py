import uuid
from datetime import datetime
from entities.RoomEvent import RoomEvent, RoomEventType


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


def get_task_id_by_room_event(room_event: RoomEvent):
    if room_event.event_type == RoomEventType.CREATED:
        raise Exception('The room has not started yet, not active task id')
    
    if room_event.event_type == RoomEventType.STARTED:
        return 0
    
    if room_event.event_type == RoomEventType.TASK_FINISHED:
        return int(room_event.event_arg) + 1
    
    raise Exception('Room no longer active')