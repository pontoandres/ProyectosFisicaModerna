from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .simulacion import correr_simulacion

@csrf_exempt
def simular_rutherford(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            b = float(data["b"])
            v0 = float(data["v0"])
            dt = float(data["dt"])
            steps = int(data["steps"])

            resultado = correr_simulacion(b, v0, dt, steps)
            return JsonResponse(resultado)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
