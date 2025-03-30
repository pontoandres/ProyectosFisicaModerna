# 📡 Simulación de Dispersión de Rutherford

Este proyecto modela la trayectoria de una partícula alfa al acercarse a un núcleo mediante la ley de Coulomb. Incluye un backend en Django y un frontend en React para mostrar la simulación en tiempo real.

---

##  ¿Cómo ejecutar el proyecto?

Necesitas **dos terminales abiertas al mismo tiempo**, una para el backend y otra para el frontend.

---

### Backend (Django)

```bash
cd backend
python -m venv env             # Solo la primera vez
env\Scripts\activate           # Activa el entorno virtual (en Windows)
pip install -r ../requirements.txt  # Instala dependencias
python manage.py runserver     # Levanta el servidor en localhost:8000
```

Si ya tenías el entorno creado, solo haz: cd backend, env\Scripts\activate, python manage.py runserver

### Frontend(React)
```bash
cd frontend
npm install   # Solo la primera vez
npm start     # Abre en localhost:3000
```