from django.contrib import admin
from django.urls import path, include
from .apps.api.admin import adm

urlpatterns = [
    path('admin/', adm.urls),
    path('api/', include('AppAbastecernos.apps.api.urls'))
]
