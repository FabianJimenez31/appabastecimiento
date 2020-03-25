from django.urls import path
from . import views

urlpatterns = [
    path('', views.get, name='get'),
    path('store/', views.store, name='store'),
    path('migration/', views.migration_stores, name='migration'),
    path('stores/',views.StoreList.as_view()),
    path('products/',views.productList.as_view()),
    path('stores/status',views.StoreStatusList.as_view()),
    path('report/store',views.StoreReportList.as_view()),
    path('report/product',views.ProductReportList.as_view()),
     path('store/stock/product',views.StoreProductList.as_view()),
    
]