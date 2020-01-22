from flask import Flask, request
from flask_cors import CORS
import sys
import json

app = Flask(__name__)
CORS(app)

all_data = {}

@app.route('/', methods=['POST'])
def hello_world():
    data = request.get_json()
    all_data[data['name']] = data['times']
    with open('times.json', 'w') as f:
        json.dump(all_data, f)
    return ''

if __name__ == '__main__':
    app.run(threaded=False)
