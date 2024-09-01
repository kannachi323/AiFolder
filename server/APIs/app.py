from flask import Flask
from flask_cors import CORS


def create_app():

    app = Flask(__name__)
    CORS(app)

    from APIs.ai import ai_bp
    from APIs.supabase import supabase_bp
    from APIs.io import io_bp

    app.register_blueprint(ai_bp, url_prefix='/api')
    app.register_blueprint(supabase_bp, url_prefix='/api')
    app.register_blueprint(io_bp, url_prefix='/api')

    return app
