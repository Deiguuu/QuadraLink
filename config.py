import os

class Config:
    # Flask
    SECRET_KEY = os.getenv("SECRET_KEY", "supersecretkey")

    # MQTT
    MQTT_BROKER = os.getenv("MQTT_BROKER", "localhost")
    MQTT_PORT = int(os.getenv("MQTT_PORT", 1883))
    MQTT_TOPIC_COMMANDS = "robot/brazo/comandos"
    MQTT_TOPIC_STATUS = "robot/brazo/estado"

    # SocketIO
    SOCKET_CORS = "*"