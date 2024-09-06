from flask import jsonify, request
import subprocess

def runCom():
    output = request.args.get('arg1')
    link = request.args.get('arg2')

    com = f"yt-dlp.exe -o {output}/%(title)s.%(ext)s {link}"
    

    try:
        subprocess.run(com, shell=True)
        return jsonify({"result": True})
    
    except Exception as e:
        print(e)
        return jsonify({"result": False, "error": str(e)})