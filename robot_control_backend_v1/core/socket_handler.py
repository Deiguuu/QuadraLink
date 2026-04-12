from flask_socketio import emit
from services.command_service import CommandService
from utils.logger import log_info

class SocketHandler:

    def __init__(self, socketio, mqtt_client):
        self.socketio = socketio
        self.command_service = CommandService(mqtt_client)
        self.register_events()

    def register_events(self):

        @self.socketio.on("connect")
        def connect():
            log_info("Cliente conectado")
            emit("respuesta", {"status": "conectado"})

        @self.socketio.on("disconnect")
        def disconnect():
            log_info("Cliente desconectado")

        @self.socketio.on("enviar_comando")
        def handle_command(data):

            log_info(f"Comando recibido: {data}")

            success, msg = self.command_service.process(data)

            if success:
                emit("respuesta", {"status": msg})
            else:
                emit("error", {"error": msg})