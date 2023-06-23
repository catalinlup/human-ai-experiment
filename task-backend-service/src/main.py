from flask import Flask, request, jsonify, render_template, send_file
from flask_socketio import SocketIO, join_room, leave_room, send, emit
from flask import g
from http import HTTPStatus
from werkzeug.exceptions import BadRequest
from flasgger import Swagger, swag_from
import logging
from config_params import *
from google.cloud import firestore
from google.oauth2 import service_account
from utils import get_uuid, get_current_utc_timestamp, get_task_id_by_room_event
from entities.Message import Message
from database.save_entities import *
from database.get_entities import *
from http import HTTPStatus
import logging
from data_loaders import *
from flask_cors import CORS
import time
import sys
from io import StringIO
from PIL import Image
from flask_apscheduler import APScheduler
# configure the application

class Config:
    SCHEDULER_API_ENABLED = True
    
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
app.config.from_object(Config())
CORS(app,resources={r"/*":{"origins":"*"}})
socketio = SocketIO(app,cors_allowed_origins="*")


scheduler = APScheduler()
scheduler.init_app(app)
scheduler.start()


# configure the database client

# configure the document info service client

# configure the authorizer


# store the dependencies as application configs

app.config.update(
    database_client = firestore.Client(
        project=PROJECT_ID,
        credentials=service_account.Credentials.from_service_account_file(SERVICE_KEY_PATH)),
)

# configure swagger (for input validation and documentation)
swagger = Swagger(app, template={
    "swagger" : "2.0",
    "info": {
        "title": "Task Backend Service",
    },
})


@app.before_request
def init():
    g.database_client = app.config['database_client']


def get_user_id() -> str:
    """
    Retrieve the owner id from the request header.
    Raises an exception in case the owner id cannot be retrieved.
    """
    if not ('Authorization' in request.headers.keys()):
        raise BadRequest('Missing authorization header')
    authorization_header_vals = request.headers['Authorization'].split(' ')

    if len(authorization_header_vals) != 2:
        raise BadRequest('Invalid authorization header')
    
    if authorization_header_vals[0] != 'Basic':
        raise BadRequest('Invalid authorization header')
    
    return authorization_header_vals[1]



def remove_hex_prefix(hash: str) -> str:
    """
    Removes the hex prefix from the hash, if the hash has one
    """

    if '0x' in hash:
        return hash[2:]
    
    return hash


@app.route('/test', methods=['GET'])
def fetch_all_extracted_data():
    """fetch all the extracted data for the user
    """

    return 'Hello World', HTTPStatus.OK


@app.route('/')
def index():
    return render_template('socket.html')



# TASK DATA ENDPOINTS
@app.route('/task/maps/<task_id>/<route_id>', methods=['GET'])
def get_maps(task_id, route_id):
    """
    Returns the maps corresponding to the provided task id.
    """
    loaded_map = load_map(task_id, route_id)

    return loaded_map, HTTPStatus.OK

@app.route('/task/features/<task_id>/<route_id>', methods=['GET'])
def get_features(task_id, route_id):
    """
    Return the features corrsponding to this route.
    """
    img_path = os.path.join(DATA_FOLDER_PATH, 'features', f'task_{task_id}_route_{route_id}.png')

    return send_file(img_path, mimetype='image/png')


    # return send_file(img_path, mimetype='image/png')



@app.route('/task/route_count/<task_id>', methods=['GET'])
def get_route_count(task_id):
    """
    Return the number of routes coreesponding to this task.
    """

    count = load_route_count(task_id)

    return jsonify({'route_count': count}), HTTPStatus.OK

@app.route('/task/description/<task_id>', methods=['GET'])
def get_description(task_id):
    """
    Returns the maps corresponding to the provided task id.
    """
    description = load_task_description(task_id)

    return jsonify(description), HTTPStatus.OK


@app.route('/task/get_ai_route/<task_id>', methods=['GET'])
def get_ai_route(task_id):

    if task_id == '30':
        return jsonify({'route': 4}), HTTPStatus.OK
    
    if task_id == '31':
        return jsonify({'route': 1}), HTTPStatus.OK
    
    if task_id == '32':
        return jsonify({'route': 2}), HTTPStatus.OK
    
    if task_id == '33':
        return jsonify({'route': 2}), HTTPStatus.OK
    
    return jsonify({'route': 3}), HTTPStatus.OK




## CHAT ENDPOINTS

@app.route('/chat/send/<room_id>', methods=['POST'])
def chat_send_message(room_id):
    """
    Handles the case when the user sends a chat message.
    """

    # build the message
    message = request.json['message']
    message_content = message['content']
    prolific_id = message['prolific_id']

    message_sender = message['sender']
    message = Message(get_uuid(), message_sender, message_content, get_current_utc_timestamp(), prolific_id)

    # save the message
    save_message(g.database_client, message, room_id)

    emit("data",{'data':message.to_json(), 'id':request.sid}, broadcast=True)
    
    # confirm that the message was sent succesfully
    return jsonify(message.to_json()), HTTPStatus.OK


@app.route('/chat/get_all/<room_id>', methods=['GET'])
def get_all_messages(room_id):
    """
    Returns all the messages corresponding to the provided task.
    """

    # get the messages
    messages = get_messages(g.database_client, room_id)

    json_msgs = [m.to_json() for m in messages]

    # logging.getLogger().warning([m.to_json() for m in messages])

    # return the retrieved messages
    return jsonify({'messages': json_msgs}), HTTPStatus.OK



# ROOM MANAGEMENT

@app.route('/room/get/<session_id>')
def get_room(session_id):
    """
    Get information about the room you have been assigned to.
    If you haven't been assigned to a room before, you will automatically get assigned to one.
    """
    room_obj = get_room_by_session_id(g.database_client, session_id)

    logging.getLogger().warning(room_obj)

    # in case the user is not part of a room, add the user to the room
    if room_obj is None:
        # add the user to an availale room, or create a new room, if no room is available.
        available_rooms = get_available_rooms(g.database_client)
        # logging.getLogger().warning(available_rooms)

        # create a new available room and add the user to that room
        if len(available_rooms) == 0:
            new_room = create_room(g.database_client, Room.create_new())
            room_obj = add_user_to_room(g.database_client, new_room.room_id, session_id)

        else:
            # fetch the first available room and add the user to it
            available_rooms = sorted(available_rooms, lambda r: len(r.user_session_ids))
            fetched_room = available_rooms[0]
            room_obj = add_user_to_room(g.database_client, fetched_room.room_id, session_id)



    return jsonify(room_obj.to_json()), HTTPStatus.OK


@app.route('/room/get_status/<room_id>')
def get_room_status(room_id):
    room_event = get_room_last_event(g.database_client, room_id)

    return jsonify(room_event.to_json()), HTTPStatus.OK


@app.route('/user/get_nickname/<session_id>')
def get_user_nickname_for_room(session_id):

    POSSIBLE_NICKNAMES=['Anonymous Beaver', 'Epic Monkey', 'Bizarre Elephant']

    room = get_room_by_session_id(g.database_client, session_id)

    if room is None:
        raise Exception('User is not part of a room')
    

    username_index = room.user_session_ids.index(session_id) % len(POSSIBLE_NICKNAMES)

    return jsonify({'user_name': POSSIBLE_NICKNAMES[username_index]}), HTTPStatus.OK




@app.route('/vote/preliminary_done/<room_id>/<task_id>', methods=['GET'])
def is_preliminary_done(room_id, task_id):
    """
    Checks if the preliminary stage of voting is done.
    """

    task_id = int(task_id)
    existing_votes = get_preliminary_votes_by_room_and_task(g.database_client, room_id, task_id)
    existing_votes_session_ids = list(set([v.session_id for v in existing_votes]))

    logging.getLogger().warning(existing_votes_session_ids)


    preliminary_done = (len(existing_votes_session_ids) >= NUM_ROOM_USERS)

    return jsonify({'preliminary_done': preliminary_done}), HTTPStatus.OK




@app.route('/vote/preliminary', methods=['POST'])
def post_preliminary_vote():
    """
    Posts a preliminary vote
    """

    body = request.json
    session_id = str(body['session_id'])
    prolific_id = str(body['prolific_id'])
    voted_route_number = body['voted_route_number']
    confidence = int(body['confidence'])

    room: Room = get_room_by_session_id(g.database_client, session_id)


    if room is None:
        raise Exception('The user has not been asigned to a room')
    
    room_id = room.room_id
    room_status: RoomEvent = get_room_last_event(g.database_client, room_id)

    logging.getLogger().warning(room_status.event_type)
    # logging.getLogger().warning(room_status)

    if room_status.event_type == RoomEventType.ENDED:
        raise Exception('Room has already ended')
    
    if room_status.event_type == RoomEventType.CREATED:
        raise Exception('Room has not started yet')


    task_id_index = get_task_id_by_room_event(room_status)
    task_id = room.task_ids[task_id_index]

    # retrieve the list of all pre-existing voting objects for this task
    existing_votes = get_preliminary_votes_by_room_and_task(g.database_client, room_id, task_id)

    num_existing_votes = len(existing_votes) + 1

    # create a voting object
    vote = Vote(room_id, session_id, task_id, voted_route_number, time.time(), prolific_id, confidence)

    # do not allow the same vote twice per task

    existing_votes_session_ids = list(set([v.session_id for v in existing_votes]))

    logging.getLogger().warning('Existing prelims', existing_votes_session_ids)

    if session_id in existing_votes_session_ids:
        raise Exception('Already voted for this task')

    # save the vorting object
    add_preliminary_vote(g.database_client, vote)

    logging.getLogger().warning(num_existing_votes)


    return vote.to_json(), HTTPStatus.OK


@app.route('/vote/perform', methods=['POST'])
def post_vote():
    
    body = request.json
    session_id = str(body['session_id'])
    prolific_id = str(body['prolific_id'])
    voted_route_number = body['voted_route_number']
    confidence = int(body['confidence'])

    room: Room = get_room_by_session_id(g.database_client, session_id)


    if room is None:
        raise Exception('The user has not been asigned to a room')
    
    room_id = room.room_id
    room_status: RoomEvent = get_room_last_event(g.database_client, room_id)

    logging.getLogger().warning(room_status.event_type)
    # logging.getLogger().warning(room_status)

    if room_status.event_type == RoomEventType.ENDED:
        raise Exception('Room has already ended')
    
    if room_status.event_type == RoomEventType.CREATED:
        raise Exception('Room has not started yet')


    task_id_index = get_task_id_by_room_event(room_status)
    task_id = room.task_ids[task_id_index]

    # retrieve the list of all pre-existing voting objects for this task
    existing_votes = get_votes_by_room_and_task(g.database_client, room_id, task_id)

    num_existing_votes = len(existing_votes) + 1

    # create a voting object
    vote = Vote(room_id, session_id, task_id, voted_route_number, time.time(), prolific_id, confidence)

    # do not allow the same vote twice per task

    existing_votes_session_ids = list(set([v.session_id for v in existing_votes]))

    if session_id in existing_votes_session_ids:
        raise Exception('Already voted for this task')

    # save the vorting object
    add_vote(g.database_client, vote)

    logging.getLogger().warning(num_existing_votes)

    # if all votes were cast, end the task
    if num_existing_votes >= NUM_ROOM_USERS:
        logging.getLogger().warning('Adding room event')
        room_event = RoomEvent(get_uuid(), room_id, RoomEventType.TASK_FINISHED, time.time(), task_id_index)
        add_room_event(g.database_client, room_event)

        if task_id_index >= NUM_TASKS_PER_ROOM - 1:
            room_event2 = RoomEvent(get_uuid(), room_id, RoomEventType.ENDED, time.time())
            add_room_event(g.database_client, room_event2)
    

    return vote.to_json(), HTTPStatus.OK


    



# @app.route('/session/get/<room_id>/<user_id>', methods=['GET'])
# def get_session(user_id):
#     """
#     Returns the session for the user of the provided id
#     """

#     if user_id == '1':
#         return jsonify({'batch_id': '1', 'task_ids': [33, 32, 31, 30], 'user_name': 'Catalin'}), HTTPStatus.OK
    
#     if user_id == '2':
#         return jsonify({'batch_id': '1', 'task_ids': [33, 32, 31, 30], 'user_name': 'Martin'}), HTTPStatus.OK
    
#     if user_id == '3':
#         return jsonify({'batch_id': '1', 'task_ids': [33, 32, 31, 30], 'user_name': 'Jeff'}), HTTPStatus.OK
    
#     if user_id == '4':
#         return jsonify({'batch_id': '1', 'task_ids': [33, 32, 31, 30], 'user_name': 'Marta'}), HTTPStatus.OK
    
    
#     return jsonify({'batch_id': '1', 'task_ids': [30, 31, 32, 33], 'user_name': 'April'}), HTTPStatus.OK
    



# @socketio.on('connect')
# def test_connect(auth):
#     emit('my response', {'data': 'Connected'})

# # HANDLE THE CHAT SOCKET IO CONNECTION
# @socketio.on('join')
# def on_join(data):
#     room = data['room']
#     join_room(room)

#     logging.getLogger().warning(f'Joined room {room}')

#     task_id = room
#     database_client = firestore.Client(
#         project=PROJECT_ID,
#         credentials=service_account.Credentials.from_service_account_file(SERVICE_KEY_PATH))
    
#     collection_ref = database_client.collection(CHAT_COLLECTION).document(task_id).collection(TASK_MESSAGES_COLLECTION)

#     def on_snapshot(col_snapshot, changes, read_time):
#         for doc_snapshot in col_snapshot:
#             # Emit the document ID and data to the WebSocket clients
#             document_data = {
#                 'id': doc_snapshot.id,
#                 'data': doc_snapshot.to_dict()
#             }
#             send(document_data, to=room)

#     # configure the connection to firestore
#     collection_watch = collection_ref.on_snapshot(on_snapshot)
#     # send(username + ' has entered the room.', to=room)

# # @socketio.on("connect", namespace="/chat/<task_id>")



# @socketio.on("connect")
# def connected():
#     """event listener when client connects to the server"""
#     # logging.getLogger().warn("Connected", request.sid)
#     print(request.sid)
#     print("client has connected")
#     emit("connect",{"data":f"id: {request.sid} is connected"})

# @socketio.on('data')
# def handle_message(data):
#     """event listener when client types a message"""
#     print("data from the front end: ",str(data))
#     emit("data",{'data':data,'id':request.sid},broadcast=True)

# @socketio.on("disconnect")
# def disconnected():
#     """event listener when client disconnects to the server"""
#     print("user disconnected")
#     emit("disconnect",f"user {request.sid} disconnected",broadcast=True)


## END CHAT ENDPOINTS CONFIGURATION


# Scheduler
@scheduler.task('interval', id='task_expiration', seconds=30, misfire_grace_time=900)
def task_expiration():
    with scheduler.app.app_context():
        logging.getLogger().warning('Scheduler started')
        client = app.config['database_client']

        rooms: List[Room] = get_all_rooms(client)

        for room in rooms:
            room_id = room.room_id
            room_status: RoomEvent = get_room_last_event(client, room_id)

            # a task is not currently being processed, so nothing to timeout
            if room_status.event_type == RoomEventType.CREATED or room_status.event_type == RoomEventType.ENDED:
                continue
                
            
            # the task is not long enough to be timeouted
            if time.time() - room_status.timestamp < INACTIVITY_TIMEOUT:
                continue
            

            room_event2 = RoomEvent(get_uuid(), room_id, RoomEventType.ENDED, time.time())
            add_room_event(client, room_event2)

            # task_id_index = get_task_id_by_room_event(room_status)

            # # new task_index
            # if task_id_index >= NUM_TASKS_PER_ROOM - 1:
            #     room_event2 = RoomEvent(get_uuid(), room_id, RoomEventType.ENDED, time.time())
            #     add_room_event(client, room_event2)

            # else:
            #     room_event = RoomEvent(get_uuid(), room_id, RoomEventType.TASK_FINISHED, time.time(), task_id_index)
            #     add_room_event(client, room_event)

            



        


@app.errorhandler(BadRequest)
def handle_bad_request_error(e):
    """
    Handles a bad request error.
    """
    return str(e), HTTPStatus.BAD_REQUEST


@app.errorhandler(Exception)
def handle_generic_exception(e):
    """
    Handles a generic exception.
    """
    return str(e), HTTPStatus.INTERNAL_SERVER_ERROR


if __name__ == '__main__':
    socketio.run(app, allow_unsafe_werkzeug=True, port=sys.argv[1], debug=True, host='0.0.0.0')