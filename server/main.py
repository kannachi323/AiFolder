import os
from flask import Flask
from flask_cors import CORS
from APIs.ai import ai_bp
from APIs.supabase import supabase_bp
from APIs.io import io_bp


app = Flask(__name__)
CORS(app)
CORS(ai_bp)
CORS(supabase_bp)
CORS(io_bp)

app.register_blueprint(ai_bp, url_prefix='/api')
app.register_blueprint(supabase_bp, url_prefix='/api')
app.register_blueprint(io_bp, url_prefix='/api')


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=int(os.environ.get("PORT", 8080))) 

