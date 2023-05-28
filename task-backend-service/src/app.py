from flask import Flask, request, jsonify
from flask_socketio import SocketIO, join_room, leave_room, send, emit
from flask import g
from http import HTTPStatus
from werkzeug.exceptions import BadRequest
from flasgger import Swagger, swag_from
import logging
from .config_params import *
from google.cloud import firestore
from google.oauth2 import service_account
from .utils import get_uuid, get_current_utc_timestamp
from .entities.Message import Message
from .database.save_entities import save_message
from .database.get_entities import get_messages
from http import HTTPStatus
import logging

# configure the application
    
app = Flask(__name__)
socketio = SocketIO(app)


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



## CHAT ENDPOINTS



@app.route('/chat/send/<task_id>', methods=['POST'])
def chat_send_message(task_id):
    """
    Handles the case when the user sends a chat message.
    """

    # build the message
    message = request.json['message']
    message_content = message['message']
    message_sender = message['sender']
    message = Message(get_uuid(), message_sender, message_content, get_current_utc_timestamp())

    # save the message
    save_message(g.database_client, message, task_id)
    
    # confirm that the message was sent succesfully
    return jsonify(message.to_json()), HTTPStatus.OK


@app.route('/chat/get_all/<task_id>', methods=['GET'])
def get_all_messages(task_id):
    """
    Returns all the messages corresponding to the provided task.
    """

    # get the messages
    messages = get_messages(g.database_client, task_id)

    # return the retrieved messages
    return jsonify({'messages': [m.to_json() for m in messages]}), HTTPStatus.OK


@socketio.on('connect')
def test_connect(auth):
    emit('my response', {'data': 'Connected'})

# HANDLE THE CHAT SOCKET IO CONNECTION
@socketio.on('join')
def on_join(data):
    room = data['room']
    join_room(room)

    logging.getLogger().warn(f'Joined room {room}')

    task_id = room
    collection_ref = g.database_client.collection(CHAT_COLLECTION).document(task_id).collection(TASK_MESSAGES_COLLECTION)

    def on_snapshot(col_snapshot, changes, read_time):
        for doc_snapshot in col_snapshot:
            # Emit the document ID and data to the WebSocket clients
            document_data = {
                'id': doc_snapshot.id,
                'data': doc_snapshot.to_dict()
            }
            send(document_data, to=room)

    # configure the connection to firestore
    collection_watch = collection_ref.on_snapshot(on_snapshot)
    # send(username + ' has entered the room.', to=room)

# @socketio.on("connect", namespace="/chat/<task_id>")


## END CHAT ENDPOINTS CONFIGURATION

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
    socketio.run(app)