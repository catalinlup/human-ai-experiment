class RoomEventType:
    CREATED='room_created'
    STARTED='room_started'
    TASK_FINISHED='task_finished'
    ENDED='room_ended'

class RoomEvent:
    """
    Class encoding an event happening to the room 
    (like a room having been created, having started, the stages having been completed and, finallym the room having enced)
    """

    def __init__(self, id: str, room_id: str, event_type: str, timestamp: str, event_arg = None) -> None:
        """
        Initialize a room event object.
        """
        self.id = id
        self.room_id = room_id
        self.event_type = event_type
        self.timestamp = timestamp
        self.event_arg = event_arg

    def to_json(self):
        """
        Converts the room event to JSON
        """
        ret_obj = {
            'id': self.id,
            'room_id': self.room_id,
            'event_type': self.event_type,
            'timestamp': self.timestamp,
        }

        if self.event_arg != None:
            ret_obj['event_arg'] = self.event_arg

        return ret_obj

    @staticmethod
    def create_from_json(json_obj: dict):

        return RoomEvent(json_obj['id'], json_obj['room_id'], json_obj['event_type'], json_obj['timestamp'], json_obj.get('event_arg', None))
