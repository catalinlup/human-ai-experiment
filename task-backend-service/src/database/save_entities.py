
from google.cloud import firestore
from ..entities.Message import Message
from ..config_params import *

def save_message(client: firestore.Client, message: Message, task_id: str):
    """
    Saves a message to the database.
    """

    chat_task = client.collection(CHAT_COLLECTION).document(task_id)
    task_messages_collection = chat_task.collection(TASK_MESSAGES_COLLECTION)
    task_messages_collection.add(message.to_json())
