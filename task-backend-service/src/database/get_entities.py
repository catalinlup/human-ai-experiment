
from typing import List
from google.cloud import firestore
from entities.Message import Message
from entities.Room import Room
from entities.RoomEvent import RoomEvent
from entities.RoomEvent import RoomEventType
from entities.Vote import Vote
from config_params import *

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
        message_list.append(Message(message_dict['id'], message_dict['sender'], message_dict['content'], message_dict['timestamp'], message_dict['prolific_id']))


    # return the parsed messages.
    return message_list


def get_room_by_id(client: firestore.Client, room_id: str) -> Room:
    """
    Return a room by its id.
    """

    room_collection = client.collection(ROOM_COLLECTION)
    rooms = list(room_collection.where("room_id", "==", room_id).stream())
    rooms = [r.to_dict() for r in rooms]

    if len(rooms) == 0:
        return None
    
    return Room(rooms[0]['room_id'], rooms[0]['task_ids'], rooms[0]['user_session_ids'])


def get_room_by_session_id(client: firestore.Client, session_id: str) -> Room:
    """
    Get the room to which the user with the provided session id is part of.
    """

    room_collection = client.collection(ROOM_COLLECTION)
    rooms = list(room_collection.where('user_session_ids', 'array_contains', session_id).stream())
    rooms = [r.to_dict() for r in rooms]

    if len(rooms) == 0:
        return None
    
    return Room(rooms[0]['room_id'], rooms[0]['task_ids'], rooms[0]['user_session_ids'])


def get_room_last_event(client: firestore.Client, room_id: str) -> RoomEvent:
    """
    Return the latest room event of the room having the provided id.
    """

    room_event_collection = client.collection(ROOM_EVENTS_COLLECTION)
    room_events = list(room_event_collection.where('room_id', '==', room_id).stream())
    room_events = [r.to_dict() for r in room_events]

    if len(room_events) == 0:
        return None

    sorted_room_events = sorted(room_events, key=lambda r: r['timestamp'])
    
    last_room_event = sorted_room_events[-1]

    return RoomEvent.create_from_json(last_room_event)


def get_votes_by_room_and_task(client: firestore.Client, room_id: str, task_id: str) -> List[Vote]:
    """
    Return the list of cast votes for the specified room and task.
    """

    votes_collection = client.collection(VOTE_COLLECTION)
    votes = list(votes_collection.where('room_id', '==', room_id).where('task_id', '==', int(task_id)).stream())
    votes = [v.to_dict() for v in votes]
    votes = [Vote.create_from_json(v) for v in votes]

    return votes


def get_preliminary_votes_by_room_and_task(client: firestore.Client, room_id: str, task_id: str) -> List[Vote]:
    """
    Return the list of cast preliminary votes for the specified room and task.
    """
    votes_collection = client.collection(PRELIMNARY_VOTE_COLLECTION)
    votes = list(votes_collection.where('room_id', '==', room_id).where('task_id', '==', int(task_id)).stream())
    votes = [v.to_dict() for v in votes]
    votes = [Vote.create_from_json(v) for v in votes]

    return votes
    


def get_available_rooms(client: firestore.Client) -> List[Room]:

    room_collection = client.collection(ROOM_COLLECTION)
    room_collection_stream = room_collection.stream()

    available_rooms = []

    for room_doc in room_collection_stream:
        room = Room.create_from_json(room_doc.to_dict())
        room_event = get_room_last_event(client, room.room_id)

        if room_event == None:
            continue

        if room_event.event_type == RoomEventType.CREATED:
            available_rooms.append(room)

    available_rooms = sorted(available_rooms, key=lambda r: len(r.user_session_ids), reverse=True)
    return available_rooms



