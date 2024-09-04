from flask import Blueprint
from . import gpt


ai_bp = Blueprint('ai', __name__)

@ai_bp.route('/callChatGPT', methods=['GET', 'POST'])
def callChatGPT():  
    return gpt.callChatGPT()
