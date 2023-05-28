import os
from dotenv import load_dotenv

load_dotenv()
SERVICE_KEY_PATH=os.environ['SERVICE_KEY_PATH']
PROJECT_ID=os.environ['PROJECT_ID']
CHAT_COLLECTION=os.environ['CHAT_COLLECTION']
TASK_MESSAGES_COLLECTION=os.environ['TASK_MESSAGES_COLLECTION']
