
class Message:
    """
    Encodes a chat message.
    """

    def __init__(self, id: str, sender: str, content: str, timestamp: int) -> None:
        """
        Creates a new message.
        """
        self.id = id
        self.sender = sender
        self.content = content
        self.timestamp = timestamp


    def to_json(self) -> dict:
        return {
            'id': self.id,
            'sender': self.sender,
            'content': self.content,
            'timestamp': self.timestamp
        }
    