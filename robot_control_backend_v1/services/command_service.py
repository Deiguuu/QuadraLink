from utils.validators import validate_command
from models.command_model import CommandModel
from utils.logger import log_info, log_error

class CommandService:

    def __init__(self, mqtt_client):
        self.mqtt_client = mqtt_client

    def process(self, data):

        valid, msg = validate_command(data)

        if not valid:
            log_error(msg)
            return False, msg

        try:
            command = CommandModel(data)

            log_info(f"Procesando comando: {command.to_dict()}")

            # Aquí puedes transformar lógica si quieres
            self.mqtt_client.publish(
                "robot/brazo/comandos",
                command.to_dict()
            )

            return True, "Comando enviado"

        except Exception as e:
            log_error(str(e))
            return False, str(e)