from sanic import Sanic
from sanic.response import json
from sanic_cors import CORS

app = Sanic()
datos = []

def post_handler(request):
    name = request.json.get('Name')
    datos.append(name)
    return json(datos)

def get_handler(request):
    return json({ 'data': datos })

CORS(app)
app.add_route(post_handler, '/backend/post', methods=["POST", "GET"])
app.add_route(get_handler, '/backend/get', methods=["GET"])

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80)
