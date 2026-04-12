import paho.mqtt.client as mqtt
import json
from config.config import Config
from utils.logger import log_info, log_error

class MQTTClient:

    def __init__(self, socketio):
        self.client = mqtt.Client()
        self.socketio = socketio

        self.client.on_connect = self.on_connect
        self.client.on_message = self.on_message

    def connect(self):
        try:
            self.client.connect(Config.MQTT_BROKER, Config.MQTT_PORT, 60)
            self.client.loop_start()
            log_info("MQTT conectado")
        except Exception as e:
            log_error(e)

    def on_connect(self, client, userdata, flags, rc):
        log_info("Suscrito a estado")
        client.subscribe(Config.MQTT_TOPIC_STATUS)

    def on_message(self, client, userdata, msg):
        try:
            data = json.loads(msg.payload.decode())
            log_info(f"Estado recibido: {data}")

            self.socketio.emit("estado_robot", data)

        except Exception as e:
            log_error(e)

    def publish(self, topic, message):
        self.client.publish(topic, json.dumps(message))