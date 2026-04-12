from flask_socketio import emit
from config import Config

class SocketHandler:

    def __init__(self, socketio, mqtt_client):
        self.socketio = socketio
        self.mqtt_client = mqtt_client
        self.register_events()

    # =========================
    # VALIDACIÓN PRO
    # =========================
    def validate_command(self, data):

        if "accion" not in data:
            return False, "Falta accion"

        if data["accion"] == "mover_todo":

            required = ["base", "hombro", "codo", "pinza"]

            for r in required:
                if r not in data:
                    return False, f"Falta {r}"

                if not isinstance(data[r], (int, float)):
                    return False, f"{r} debe ser numérico"

            # Validar rangos
            for r in required:
                if not (0 <= data[r] <= 180):
                    return False, f"{r} fuera de rango (0-180)"

        elif data["accion"] == "mover":

            if "motor" not in data or "angulo" not in data:
                return False, "Faltan campos"

        else:
            return False, "Acción no válida"

        return True, "OK"

    # =========================
    # EVENTOS
    # =========================
    def register_events(self):

        @self.socketio.on("connect")
        def handle_connect():
            print("[Socket] Cliente conectado")
            emit("respuesta", {"status": "conectado"})

        @self.socketio.on("enviar_comando")
        def handle_command(data):

            print("[Socket] Recibido:", data)

            valid, msg = self.validate_command(data)

            if not valid:
                emit("error", {"error": msg})
                return

            try:
                # 🔥 Enviar directo a MQTT
                self.mqtt_client.publish(
                    Config.MQTT_TOPIC_COMMANDS,
                    data
                )

                emit("respuesta", {"status": "enviado"})

            except Exception as e:
                emit("error", {"error": str(e)})