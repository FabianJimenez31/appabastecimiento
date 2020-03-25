from django.urls import path
from . import views

urlpatterns = [
    path('', views.get, name='get'),
    path('store/', views.store, name='store'),
    path('migration/', views.migration_stores, name='migration'),
    path('stores/',views.StoreList.as_view())
]