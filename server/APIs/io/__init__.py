from flask import Blueprint
from . import file, com

io_bp = Blueprint('io', __name__)

@io_bp.route('/buildJsonFileTree', methods=['GET', 'PUT', 'POST'])
def buildJsonFileTree():
    return file.buildJsonFileTree()

@io_bp.route('/isValidDir', methods=['GET'])
def isValidDir():
    return file.isValidDir()

@io_bp.route('/createTempFolderAndCopyFiles', methods=['GET', 'PUT', 'POST'])
def createTempFolderAndCopyFiles():
    return file.createTempFolderAndCopyFiles()

@io_bp.route('/runCom', methods=['GET', 'PUT', 'POST'])
def runCom():
    return com.runCom()