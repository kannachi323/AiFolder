from flask import jsonify
from APIs.config import config
from openai import OpenAI

#OpenAI/ChatGPT
openai_client = OpenAI(api_key=config["OPENAI_API_KEY"])

MODEL = "gpt-3.5-turbo"

folder_structure = """
Here is the current folder structure of my project:

/project
    /docs
        overview.pdf
        readme.md
    /scripts
        data_cleaning.py
        analysis.py
    /images
        logo.png
        chart.png
    /archive
        old_report.zip
    notes.txt
    todo_list.txt

How can I organize these files and folders for better management?
"""


def callChatGPT():
    response = openai_client.chat.completions.create(
        model=MODEL,
        messages=[
            {"role": "system", "content": "You are an expert at organizing files and folders."},
            {"role": "user", "content": folder_structure}, 
        ],
        temperature=0,
        max_tokens=100
    )
    message_content = response.choices[0].message.content
    print(message_content)

    
    return jsonify({"result": message_content})
    


 
