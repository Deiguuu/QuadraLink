class CommandModel:

    def __init__(self, data):
        self.accion = data.get("accion")

        self.base = data.get("base")
        self.hombro = data.get("hombro")
        self.codo = data.get("codo")
        self.pinza = data.get("pinza")

        self.motor = data.get("motor")
        self.angulo = data.get("angulo")

        self.velocidad = data.get("velocidad", 5)

    def to_dict(self):
        return self.__dict__