from config_params import *
import os
import json

def load_map(task_id, route_id):
    """
    Loads the maps corresponding to the provided task id
    """

    maps_path = os.path.join(DATA_FOLDER_PATH, 'maps')
    file_list = os.listdir(maps_path)
    maps_for_task = [file for file in file_list if file == f'task_{task_id}_route{route_id}.html']

    if len(maps_for_task) == 0:
        raise Exception(f'Could not find map of the provided {task_id} and {route_id}')
    

    map_for_task_path = os.path.join(maps_path, maps_for_task[0])

    return open(map_for_task_path, 'r').read()


def load_route_count(task_id):
    """
    Get the number of routes for one task
    """
    maps_path = os.path.join(DATA_FOLDER_PATH, 'maps')
    file_list = os.listdir(maps_path)

    routes_for_task = [file for file in file_list if file.startswith(f'task_{task_id}')]

    return len(routes_for_task)

def load_task_description(task_id):
    """
    Loads the task description of the provided id
    """

    task_descriptions_file_path = os.path.join(DATA_FOLDER_PATH, 'task_descriptions.json')
    task_descriptions_json = json.load(open(task_descriptions_file_path, 'r'))
    descriptions = task_descriptions_json['task_descriptions']
    target_description = list(filter(lambda d: d['task_id'] == str(task_id), descriptions))

    if len(target_description) == 0:
        raise Exception('Could not find data for task id!')
    
    return target_description[0]
