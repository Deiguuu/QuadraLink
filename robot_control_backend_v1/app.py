from flask import Flask
from flask_socketio import SocketIO
from config.config import Config
from core.mqtt_client import MQTTClient
from core.socket_handler import SocketHandler

def create_app():

    app = Flask(__name__)
    app.config["SECRET_KEY"] = Config.SECRET_KEY

    socketio = SocketIO(
        app,
        cors_allowed_origins=Config.SOCKET_CORS,
        async_mode="threading"
    )

    mqtt_client = MQTTClient(socketio)
    mqtt_client.connect()

    SocketHandler(socketio, mqtt_client)

    return app, socketio


if __name__ == "__main__":
    app, socketio = create_app()

    print("🚀 Backend DOF4 iniciado en http://localhost:5000")

    socketio.run(app, host="0.0.0.0", port=5000)