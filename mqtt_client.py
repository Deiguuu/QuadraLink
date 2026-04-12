import paho.mqtt.client as mqtt
import json
from config import Config

class MQTTClient:
    def __init__(self, socketio):
        self.client = mqtt.Client()
        self.socketio = socketio

        self.client.on_connect = self.on_connect
        self.client.on_message = self.on_message
        self.client.on_disconnect = self.on_disconnect

    def connect(self):
        try:
            print("[MQTT] Conectando al broker...")
            self.client.connect(Config.MQTT_BROKER, Config.MQTT_PORT, 60)
            self.client.loop_start()
        except Exception as e:
            print(f"[MQTT ERROR] {e}")

    def on_connect(self, client, userdata, flags, rc):
        print(f"[MQTT] Conectado con código {rc}")
        client.subscribe(Config.MQTT_TOPIC_STATUS)

    def on_message(self, client, userdata, msg):
        try:
            payload = msg.payload.decode()
            print(f"[MQTT] Mensaje recibido: {payload}")

            data = json.loads(payload)

            # Reenviar a clientes WebSocket
            self.socketio.emit("estado_robot", data)

        except Exception as e:
            print(f"[MQTT ERROR] Procesando mensaje: {e}")

    def on_disconnect(self, client, userdata, rc):
        print("[MQTT] Desconectado. Intentando reconectar...")
        self.connect()

    def publish(self, topic, message):
        try:
            payload = json.dumps(message)
            self.client.publish(topic, payload)
            print(f"[MQTT] Enviado: {payload}")
        except Exception as e:
            print(f"[MQTT ERROR] Publicando mensaje: {e}")