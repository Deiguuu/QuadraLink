# 🤖 DOF4 Robot Control System

Sistema de control para un brazo robótico de **4 grados de libertad (DOF4)**, desarrollado con una arquitectura distribuida basada en **React + Flask + MQTT + ESP32**.

Permite controlar un brazo robótico en tiempo real mediante una interfaz web moderna, con comunicación eficiente y sincronización bidireccional.

---

## 🚀 Características

- 🎮 Control en tiempo real mediante sliders
- 🔄 Sincronización entre interfaz y robot físico
- 📡 Comunicación con MQTT (publish/subscribe)
- ⚡ Uso de WebSockets para baja latencia
- 🤖 Control de múltiples servos con PCA9685
- 🧠 Movimiento suave mediante interpolación
- 🔌 Arquitectura modular y escalable

---

## 🧱 Arquitectura del Sistema
[ React Frontend ]
│
│ WebSockets (Socket.IO)
▼
[ Flask Backend ]
│
│ MQTT (Pub/Sub)
▼
[ ESP32 + PCA9685 ]
│
▼
[ Servomotores ]

---

## 🛠️ Tecnologías utilizadas

### Frontend
- React + TypeScript
- Zustand
- Socket.IO Client
- TailwindCSS

### Backend
- Python + Flask
- Flask-SocketIO
- Paho MQTT

### Hardware
- ESP32
- PCA9685 (Driver PWM)
- Servomotores (x4)
- Fuente externa 5V (≥ 2A recomendado)

---

## 📂 Estructura del Proyecto
robot-dof4/
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── hooks/
│ │ ├── store/
│ │ └── ...
│
├── backend/
│ ├── core/
│ ├── config/
│ └── app.py
│
├── esp32/
│ └── dof4_controller.ino
│
└── README.md


---

## ⚙️ Instalación y Ejecución

### 1. Backend

bash
cd backend
pip install -r requirements.txt
python app.py

Servidor disponible en:

http://localhost:5000

2. Frontend
cd frontend
npm install
npm run dev
3. MQTT (Mosquitto)

Ejecutar broker local:

mosquitto -v

Puerto:

1883
4. ESP32
Configurar credenciales WiFi
Configurar IP del broker MQTT
Subir código desde Arduino IDE
🔌 Conexiones Hardware
ESP32 ↔ PCA9685 (I2C)
ESP32	PCA9685
21	SDA
22	SCL
GND	GND
3.3V	VCC
PCA9685 ↔ Servos
Canal	Servo
0	Base
1	Hombro
3	Codo
4	Pinza
⚡ Alimentación
Fuente externa: 5V / mínimo 2A
IMPORTANTE: compartir GND con el ESP32
📡 Comunicación MQTT
Tópicos
robot/brazo/comandos
robot/brazo/estado
Ejemplo de comando
{
  "accion": "mover_todo",
  "base": 90,
  "hombro": 45,
  "codo": 45,
  "pinza": 10,
  "velocidad": 5
}
🎮 Control del Robot

El sistema permite:

Control individual de cada servo
Movimiento simultáneo coordinado
Visualización en tiempo real
Interfaz interactiva
🧠 Lógica de Movimiento

Se utiliza interpolación lineal para generar movimientos suaves:

Se calcula la diferencia entre posiciones
Se generan pasos intermedios
Se actualizan todos los servos simultáneamente
🧪 Pruebas realizadas
Conectividad WiFi
Comunicación MQTT
Sincronización frontend ↔ robot
Respuesta en tiempo real
Movimiento físico de servos
Estabilidad bajo múltiples comandos
⚠️ Problemas comunes
Servos no se mueven
Verificar fuente de alimentación
Revisar conexiones I2C
Confirmar dirección del PCA9685 (0x40)
MQTT no conecta
Revisar IP del broker
Verificar puerto 1883
Comprobar firewall
Movimiento incorrecto
Revisar mapeo de canales PWM
Verificar correspondencia frontend ↔ ESP32
🚀 Trabajo Futuro
Control por voz
Integración con inteligencia artificial
Sensores de retroalimentación
Simulación 3D en tiempo real
Seguridad (TLS + autenticación MQTT)
Soporte para múltiples robots
👨‍💻 Autor

Diego Tercero
Ingeniería Cibernética Electrónica
Universidad Tecnológica La Salle – León

⭐ Nota

Este proyecto implementa conceptos de:

Sistemas distribuidos
IoT
Comunicación en tiempo real
Integración hardware-software
