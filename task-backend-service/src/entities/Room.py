from typing import List
from utils import *


class Room:
    """
    Contains all informatio defining a room.
    """

    def __init__(self, room_id: str, task_ids: List[str], user_session_ids: List[str]) -> None:
        """
        Initializes a room.
        """
        self.room_id = room_id
        self.task_ids = task_ids
        self.user_session_ids = user_session_ids

    @staticmethod
    def create_new():
        return Room(get_uuid(), [30, 31, 32, 33], [])

    @staticmethod
    def create_from_json(json_obj: dict):
        return Room(json_obj['room_id'], json_obj['task_ids'], json_obj['user_session_ids'])

    def to_json(self):
        """
        Converts the room to json.
        """

        return {
            'room_id': self.room_id,
            'task_ids': self.task_ids,
            'user_session_ids': self.user_session_ids
        }