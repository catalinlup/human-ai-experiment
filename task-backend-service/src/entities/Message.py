
class Message:
    """
    Encodes a chat message.
    """

    def __init__(self, id: str, sender: str, content: str, timestamp: int, prolific_id: str) -> None:
        """
        Creates a new message.
        """
        self.id = id
        self.sender = sender
        self.content = content
        self.timestamp = timestamp
        self.prolific_id = prolific_id


    def to_json(self) -> dict:
        return {
            'id': self.id,
            'sender': self.sender,
            'content': self.content,
            'timestamp': self.timestamp,
            'prolific_id': self.prolific_id
        }
    