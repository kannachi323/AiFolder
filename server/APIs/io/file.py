import os
from flask import request, jsonify, make_response
import json
import shutil
import platform

#returns the actual json data from chatgpt response
def parseStructure(structure):
    try:
        start_index = structure.index('{')
        end_index = structure.rindex('}') + 1

        json_str = structure[start_index:end_index]

        data = json.loads(json_str)

        return data
    except Exception as e:
        if isinstance(e, ValueError):
            print(f"Error finding JSON boundaries: {e}")
        elif isinstance(e, json.JSONDecodeError):
            print(f"Error decoding JSON: {e}")
        else:
            print(f"An unexpected error occurred: {e}")
        return None

import os
import shutil
import platform
from flask import request, jsonify

def createTempFolderAndCopyFiles():
    folder_path = request.args.get('arg1')
    
    if platform.system() == "Windows":
        folder_path = folder_path.replace("/", "\\")

    folder_name = os.path.basename(folder_path)
    new_folder_path = os.path.join(folder_path, f"temp_{folder_name}")
    
    structure = request.args.get('arg2')
    data = parseStructure(structure)
    
    os.makedirs(new_folder_path, exist_ok=True)
    
    def copy_files(data, base_path):
        for category, files in data.items():
            category_folder = os.path.join(base_path, category)
            os.makedirs(category_folder, exist_ok=True)
            
            if isinstance(files, dict):
                # Recursively process nested folders
                copy_files(files, category_folder)
            else:
                # Handle files in the current category
                for file in files:
                    src = os.path.join(folder_path, file)
                    dst = os.path.join(category_folder, file)
                    if os.path.exists(src):
                        shutil.copyfile(src, dst)
                    else:
                        print(f"Source file does not exist: {src}")

    try:
        copy_files(data, new_folder_path)
        return jsonify({"result": True})
    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"result": False, "error": str(e)})

    

def isValidDir():

    start_dir = request.args.get('arg1')  # Assuming you're passing the directory path as a query parameter
    if not os.path.isdir(start_dir):
        return jsonify({"result": False, "message": "Invalid directory path"})
    
    return jsonify({"result": True, "message": "Valid directory path"})

def buildJsonFileTree(max_depth=5, ignores=[]):
    start_dir = request.args.get('arg1')
    
    
    
    ignore_mp = set(ignores)

    
    
    def dfs(depth, path):
        try:
            items = os.listdir(path)
        except PermissionError:
            print(f"Permission denied: {path}")
            return None
        except FileNotFoundError:
            print(f"File not found: {path}")
            return None
        
        if not items:
            return None

        node = {
            "id": os.path.basename(path),
            "label": os.path.basename(path),
            "children": []
        }

        for item in items:
            if item.startswith('.') or item in ignore_mp:  # Ignore hidden files/dirs or items in ignores
                continue

            curr_path = os.path.join(path, item)
            _, file_ext = os.path.splitext(curr_path)

            if os.path.isdir(curr_path):
                child_node = dfs(depth + 1, curr_path)
                if child_node:
                    node["children"].append(child_node)
            else:
                node["children"].append({
                    "id": item,
                    "fileType": file_ext,
                    "children": []
                })
        
        return node

    file_tree = dfs(0, start_dir)
    
    
    if file_tree is None:
        print("No file tree generated.")
        return "{}" 

    # Serialize the JSON and save it to a file
    json_string = json.dumps(file_tree)

    with open("output.json", "w") as output_file:
        output_file.write(json_string)

    return json_string