import os
from flask import Blueprint
from APIs.config import config
from . import storage, auth
from supabase import create_client, Client

supabase_bp = Blueprint('supabase', __name__)

supabase_client: Client = create_client(config['SUPABASE_URL'], config['SUPABASE_KEY'])

@supabase_bp.route('/uploadImageToSupabase', methods=['GET', 'POST'])
def uploadImageToSupabase():
    return storage.uploadImageToSupabase(supabase_client)

@supabase_bp.route('/signUpOnSupabase', methods=["GET", "PUT", "POST"])
def signUpOnSupabase():
    return auth.signUpOnSupabase(supabase_client)
