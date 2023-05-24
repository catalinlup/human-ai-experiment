from flask import Flask, request, jsonify
from flask import g
from http import HTTPStatus
from werkzeug.exceptions import BadRequest
from flasgger import Swagger, swag_from
import logging
from .config_params import *

# configure the application
    
app = Flask(__name__)

# configure the database client

# configure the document info service client

# configure the authorizer


# store the dependencies as application configs
# app.config.update(
#     database_client = APP_DATABASE_CLIENT,
#     document_info_service_client = APP_DOCUMENT_INFO_SERVICE_CLIENT,
#     authorizer = APP_AUTHORIZER
# )

# configure swagger (for input validation and documentation)
swagger = Swagger(app, template={
    "swagger" : "2.0",
    "info": {
        "title": "Task Backend Service",
    },
})


@app.before_request
def init():
    pass
    # g.database_client = app.config['database_client']
    # g.document_info_service_client = app.config['document_info_service_client']
    # g.authorizer = app.config['authorizer']


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