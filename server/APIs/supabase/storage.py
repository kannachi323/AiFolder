from flask import jsonify, request



def uploadImageToSupabase(supabase_client):
    file = request.files['file']
    
    path_on_supastorage = f"public/{file.filename}"

    file_content = file.read()
    response = supabase_client.storage.from_('Images').upload(file=file_content,path=path_on_supastorage);

    if response.status_code != 200:
        return jsonify({"error": "Failed to upload file"}), 500

    return jsonify({"result": "File uploaded successfully"}), 200
    
    

