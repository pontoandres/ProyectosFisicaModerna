import math

def correr_simulacion(b, v0, dt, steps):
    # Constantes físicas realistas (en unidades naturales de simulación)
    Z = 79      # número atómico del núcleo (oro)
    z = 2       # número atómico de la partícula alfa
    e2 = 1.44   # MeV·fm (constante e²/4πε₀ en unidades nucleares)
    C = z * Z * e2  # Fuerza de Coulomb efectiva
    m = 1.0     # masa arbitraria (puedes ajustar luego si quieres más precisión)

    # Condiciones iniciales
    x = -5.0
    y = b
    vx = v0
    vy = 0.0

    posiciones_x = []
    posiciones_y = []
    distancias_r = []

    for _ in range(steps):
        r = math.sqrt(x ** 2 + y ** 2)
        if r == 0:
            break

        Fx = C * x / (r ** 3)
        Fy = C * y / (r ** 3)

        ax = Fx / m
        ay = Fy / m

        vx += ax * dt
        vy += ay * dt

        x += vx * dt
        y += vy * dt

        posiciones_x.append(x)
        posiciones_y.append(y)
        distancias_r.append(r)

        if x > 5 and abs(y) > 5:
            break

    theta = math.degrees(math.atan2(vy, vx))

    return {
        "x": posiciones_x,
        "y": posiciones_y,
        "r": distancias_r,
        "theta": theta
    }
