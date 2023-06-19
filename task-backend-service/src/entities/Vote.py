class Vote:
    """
    Class encoding a vote.
    """

    def __init__(self, room_id: str, session_id: str, task_id: str, voted_route_number: str, timestamp: str, prolific_id: str) -> None:
        """
        Initializes the vote.
        """
        self.room_id = room_id
        self.session_id = session_id
        self.task_id = task_id
        self.voted_route_number = voted_route_number
        self.timestamp = timestamp
        self.prolific_id = prolific_id

    
    def to_json(self):
        """
        Converts the vote to a json file.
        """

        return {
            'room_id': self.room_id,
            'session_id': self.session_id,
            'task_id': self.task_id,
            'voted_route_number': self.voted_route_number,
            'timestamp': self.timestamp,
            'prolific_id': self.prolific_id
        }
    

    @staticmethod
    def create_from_json(json_obj):
        """
        Create a voting object from json.
        """
        return Vote(json_obj['room_id'], json_obj['session_id'], json_obj['task_id'], json_obj['voted_route_number'], json_obj['timestamp'], json_obj['prolific_id'])