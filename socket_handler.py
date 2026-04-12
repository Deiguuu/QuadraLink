from flask_socketio import emit
from config import Config

class SocketHandler:

    def __init__(self, socketio, mqtt_client):
        self.socketio = socketio
        self.mqtt_client = mqtt_client
        self.register_events()

    def validate_command(self, data):
        required_fields = ["accion", "motor"]

        for field in required_fields:
            if field not in data:
                return False, f"Falta el campo: {field}"

        if data["accion"] == "mover":
            if "angulo" not in data:
                return False, "Falta 'angulo' para accion mover"

            if not isinstance(data["angulo"], (int, float)):
                return False, "Angulo debe ser numérico"

        return True, "OK"

    def register_events(self):

        @self.socketio.on("connect")
        def handle_connect():
            print("[Socket] Cliente conectado")
            emit("respuesta", {"status": "conectado"})

        @self.socketio.on("disconnect")
        def handle_disconnect():
            print("[Socket] Cliente desconectado")

        @self.socketio.on("enviar_comando")
        def handle_command(data):
            print(f"[Socket] Comando recibido: {data}")

            valid, message = self.validate_command(data)

            if not valid:
                emit("error", {"error": message})
                return

            try:
                # Transformación si es necesaria (puedes adaptar al ESP32)
                comando_mqtt = {
                    "accion": data["accion"],
                    "motor": data["motor"],
                    "angulo": data.get("angulo", None)
                }

                self.mqtt_client.publish(
                    Config.MQTT_TOPIC_COMMANDS,
                    comando_mqtt
                )

                emit("respuesta", {"status": "comando_enviado"})

            except Exception as e:
                emit("error", {"error": str(e)})