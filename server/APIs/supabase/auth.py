from flask import jsonify, request

def signUpOnSupabase(supabase_client):
    email = request.args.get('arg1')
    password = request.args.get('arg2')

    if not email or not password:
        return jsonify({"error": "Email or password is missing"}), 400
    
    response = supabase_client.auth.sign_up(
        {"email": email, "password": password}
    )

    if response.user is None:
        return jsonify({"error": "could not sign up user"}), 500

    return jsonify({"result": "User signed up successfully!"}), 200
    