import socketio

sio = socketio.Client()

@sio.event
def connect():
    print("✅ Conectado al servidor")

    comando = {
        "accion": "mover_todo",
        "base": 90,
        "hombro": 120,
        "codo": 80,
        "pinza": 40,
        "velocidad": 5
    }

    print("📤 Enviando comando:", comando)
    sio.emit("enviar_comando", comando)

@sio.on("respuesta")
def respuesta(data):
    print("📩 Respuesta:", data)

@sio.on("estado_robot")
def estado(data):
    print("🤖 Estado del robot:", data)

@sio.on("error")
def error(data):
    print("❌ Error:", data)

sio.connect("http://localhost:5000")
sio.wait()