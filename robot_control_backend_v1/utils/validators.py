def validate_command(data):

    if "accion" not in data:
        return False, "Falta accion"

    if data["accion"] == "mover_todo":
        required = ["base", "hombro", "codo", "pinza"]

        for r in required:
            if r not in data:
                return False, f"Falta {r}"

            if not isinstance(data[r], (int, float)):
                return False, f"{r} debe ser numérico"

    elif data["accion"] == "mover":
        if "motor" not in data or "angulo" not in data:
            return False, "Faltan campos"

    else:
        return False, "Acción inválida"

    return True, "OK"