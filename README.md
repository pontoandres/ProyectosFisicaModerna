# 📡 Simulación de Dispersión de Rutherford

Este proyecto modela la trayectoria de una partícula alfa al acercarse a un núcleo mediante la ley de Coulomb. Incluye un backend en Django y un frontend en React para mostrar la simulación en tiempo real.

---
## Autores

- Ponto Andres Moreno – 202224525  
- Nicolas Gomez – 202024568  
- Veronica Ayala – 201921857


---

## 🚀 ¿Cómo ejecutar el proyecto?

Necesitas **python 3.12 y dos terminales abiertas al mismo tiempo**. Para abrir una terminal en windows presiona "windows key" + "R" y luego escribe cmd y presiona "enter". Necesitas dos terminales porque es una para el backend y otra para el frontend.  
En **cada terminal**, asegúrate de navegar primero a la carpeta donde clonaste el repositorio usando el comando `cd`.

Por ejemplo:
```bash
cd C:\Users\TU_USUARIO\Documentos\carpeta-del-proyecto
```

---

### Backend (Django)

```bash
cd backend                     # navega a la carpeta del repositorio del backend
python -m venv env             # Solo la primera vez
env\Scripts\activate           # Activa el entorno virtual (en Windows)
pip install -r ../requirements.txt  # Instala dependencias
python manage.py runserver     # Levanta el servidor en localhost:8000
```

Si ya tenías el entorno creado, solo haz: 
```bash
cd backend 
env\Scripts\activate 
python manage.py runserver
```
### Frontend(React)
```bash
cd frontend   # navega a la carpeta del repositorio del frontend
npm install   # Solo la primera vez
npm start     # Abre en localhost:3000
```