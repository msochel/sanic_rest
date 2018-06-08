from sanic import Sanic
from sanic.response import json
from sanic_cors import CORS
import os
from pymongo import MongoClient
from uuid import uuid4


client = MongoClient(os.getenv('DB_HOST'), 27017)
db = client['test-database']

app = Sanic()
datos = []

def post_handler(request):
    if request.method == "POST":
        name = request.json
        name['_id'] = str(uuid4())
        _id = db.records.insert_one(name)
        return json({ 'data': str(_id)})
    return json({ })

def get_handler(request):
    if request.method == "GET":
        return json({ 'data': list(db.records.find()) })
    return json({ })

def delete_handler(request, _id):
    if request.method == "DELETE":
        deleted_id = db.records.find_one_and_delete({'_id': _id})
        return json({'id': str(deleted_id)})
    return json({ })

CORS(app)
app.add_route(post_handler, '/backend/post', methods=["POST", "OPTIONS"])
app.add_route(get_handler, '/backend/get', methods=["GET", "OPTIONS"])
app.add_route(delete_handler, '/backend/delete/<_id>', methods=["DELETE", "OPTIONS"])

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80)
