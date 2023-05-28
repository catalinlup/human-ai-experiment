
from typing import List
from google.cloud import firestore
from ..entities.Message import Message
from ..config_params import *

def get_messages(client: firestore.Client, task_id: str) -> List[Message]:
    """
    Returns the list of all messages.
    """

    # retrieve all the messages from the firestore database
    chat_task = client.collection(CHAT_COLLECTION).document(task_id)
    task_messages_collection = chat_task.collection(TASK_MESSAGES_COLLECTION)
    messages = task_messages_collection.get()


    # parse the messages to message objects
    message_list = []

    for message in messages:
        message_dict = message.to_dict()
        message_list.append(Message(message_dict['id'], message_dict['sender'], message_dict['content'], message_dict['timestamp']))


    # return the parsed messages.
    return message_list

