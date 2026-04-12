from flask import Flask
from flask_socketio import SocketIO
from config import Config
from mqtt_client import MQTTClient
from socket_handler import SocketHandler

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = Config.SECRET_KEY

    socketio = SocketIO(app, cors_allowed_origins=Config.SOCKET_CORS)

    # MQTT
    mqtt_client = MQTTClient(socketio)
    mqtt_client.connect()

    # WebSockets
    SocketHandler(socketio, mqtt_client)

    return app, socketio

if __name__ == "__main__":
    app, socketio = create_app()

    print("🚀 Servidor iniciado en http://localhost:5000")
    socketio.run(app, host="0.0.0.0", port=5000)