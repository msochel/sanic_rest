from sanic import Sanic
from sanic.response import json
from sanic_cors import CORS

app = Sanic()
datos = []

def post_handler(request):
    if request.method == "POST":
        name = request.json.get('Name')
        datos.append(name)
        return json(datos)
    return json({ })

def get_handler(request):
    if request.method == "GET":
        return json({ 'data': datos })
    return json({ })

CORS(app)
app.add_route(post_handler, '/backend/post', methods=["POST", "OPTIONS"])
app.add_route(get_handler, '/backend/get', methods=["GET", "OPTIONS"])

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80)
