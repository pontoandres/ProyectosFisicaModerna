from django.urls import path
from .views import simular_rutherford

urlpatterns = [
    path('simular/', simular_rutherford),
]
