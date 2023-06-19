
from google.cloud import firestore
from entities.Message import Message
from config_params import *
from entities.Room import Room
from entities.Vote import Vote
from entities.RoomEvent import RoomEvent, RoomEventType
from .get_entities import get_room_by_id
from config_params import *
from utils import get_uuid, get_current_utc_timestamp
import time

def save_message(client: firestore.Client, message: Message, task_id: str):
    """
    Saves a message to the database.
    """

    chat_task = client.collection(CHAT_COLLECTION).document(task_id)
    task_messages_collection = chat_task.collection(TASK_MESSAGES_COLLECTION)
    task_messages_collection.add(message.to_json())


def save_room(client: firestore.Client, room: Room) -> Room:
    """
    Saves a room object to the dataabase
    """
    room_collection = client.collection(ROOM_COLLECTION)
    
    for target_room_doc in room_collection.stream():
        target_room = Room.create_from_json(target_room_doc.to_dict())

        if target_room.room_id == room.room_id:
            target_room_doc.reference.set(room.to_json())
            break

    return room

def add_room(client: firestore.Client, room: Room) -> Room:
    room_collection = client.collection(ROOM_COLLECTION)
    room_collection.add(room.to_json())

    return room

def add_vote(client: firestore.Client, vote: Vote) -> Vote:
    vote_collection = client.collection(VOTE_COLLECTION)
    vote_collection.add(vote.to_json())

    return vote

def add_room_event(client: firestore.Client, room_event: RoomEvent) -> RoomEvent:
    """
    Adds a room event to the database
    """
    room_event_collection = client.collection(ROOM_EVENTS_COLLECTION)
    room_event_collection.add(room_event.to_json())

    return room_event


def create_room(client: firestore.Client, room: Room) -> Room:
    """
    Creates a new room
    """
    new_room = add_room(client, room)
    add_room_event(client, RoomEvent(get_uuid(), room.room_id, RoomEventType.CREATED, time.time()))

    return new_room

def add_user_to_room(client: firestore.Client, room_id: str, session_id: str) -> Room:
    """
    Adds a user to an already existing room
    """
    room: Room = get_room_by_id(client, room_id)

    if room == None:
        raise Exception(f'Cannot find room of room id {room_id}')
    
    if len(room.user_session_ids) >= NUM_ROOM_USERS:
        raise Exception(f'Room already full!')
    
    if not (session_id in room.user_session_ids):
        room.user_session_ids.append(session_id)

    new_room = save_room(client, room)

    if len(room.user_session_ids) >= NUM_ROOM_USERS:
        add_room_event(client, RoomEvent(get_uuid(), room_id, RoomEventType.STARTED, time.time()))

    
    return new_room
