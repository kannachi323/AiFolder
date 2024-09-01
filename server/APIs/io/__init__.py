from flask import Blueprint
from . import file

io_bp = Blueprint('io', __name__)

@io_bp.route('/buildJsonFileTree', methods=['GET', 'PUT', 'POST'])
def buildJsonFileTree():
    return file.buildJsonFileTree()