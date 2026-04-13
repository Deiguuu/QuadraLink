import paho.mqtt.client as mqtt
import json
import time

BROKER = "localhost"
PORT = 1883

TOPIC_COMMANDS = "robot/brazo/comandos"
TOPIC_STATUS = "robot/brazo/estado"

def on_connect(client, userdata, flags, rc):
    print("ESP32 SIMULADO conectado a MQTT")
    client.subscribe(TOPIC_COMMANDS)

def on_message(client, userdata, msg):
    try:
        data = json.loads(msg.payload.decode())
        print(f" Comando recibido: {data}")

        # Simular procesamiento
        time.sleep(1)

        # Simular respuesta del robot
        response = {
            "base": data.get("base", 90),
            "hombro": data.get("hombro", 90),
            "codo": data.get("codo", 90),
            "pinza": data.get("pinza", 90),
            "estado": "ok"
        }

        client.publish(TOPIC_STATUS, json.dumps(response))
        print(f"Estado enviado: {response}")

    except Exception as e:
        print("Error:", e)

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

client.connect(BROKER, PORT, 60)
client.loop_forever()