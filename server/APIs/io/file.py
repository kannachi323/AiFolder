import os
from flask import request, jsonify
import json

def buildJsonFileTree(max_depth=5, ignores=[]):
    start_dir = request.args.get('arg1')
    ignore_mp = set(ignores)

    print(start_dir)
    
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