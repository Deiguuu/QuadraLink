import socketio

sio = socketio.Client()

@sio.event
def connect():
    print("✅ Conectado al servidor")

    # Enviar comando de prueba
    comando = {
        "accion": "mover",
        "motor": "base",
        "angulo": 90
    }

    print("📤 Enviando comando:", comando)
    sio.emit("enviar_comando", comando)

@sio.on("respuesta")
def respuesta(data):
    print("📩 Respuesta del servidor:", data)

@sio.on("estado_robot")
def estado(data):
    print("🤖 Estado del robot:", data)

@sio.on("error")
def error(data):
    print("❌ Error:", data)

@sio.event
def disconnect():
    print("🔌 Desconectado")

# Conectarse al servidor
sio.connect("http://localhost:5000")

# Mantener el cliente activo
sio.wait()