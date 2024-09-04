from flask import jsonify, request
from APIs.config import config
from openai import OpenAI

#OpenAI/ChatGPT
openai_client = OpenAI(api_key=config["OPENAI_API_KEY"])

MODEL = "gpt-3.5-turbo"


def callChatGPT():
    prompt = request.data.decode('utf-8')

    if not prompt:
        return jsonify({"error": "prompt is required"})

    response = openai_client.chat.completions.create(
        model=MODEL,
        messages=[
            {"role": "system", "content": "You are an expert at organizing files and folders."},
            {"role": "user", "content": prompt}, 
        ],
        temperature=0,
    )
    message_content = response.choices[0].message.content
    print(message_content)

    
    return jsonify({"result": message_content})
    


 
