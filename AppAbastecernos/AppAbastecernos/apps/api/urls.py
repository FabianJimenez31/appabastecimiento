from django.urls import path
from . import views

urlpatterns = [
    path('store/',views.StoreList.as_view()),
    path('store/<int:pk_store>/',views.StoreDetail.as_view()),
    path('products/',views.productList.as_view()),
    path('store/status/',views.StoreStatusList.as_view()),
    path('report/store/',views.StoreReportList.as_view()),
    path('report/product/',views.ProductReportList.as_view()),
    path('store/stock/product/',views.StoreStockProductList.as_view()),
    path('store/<slug:name>/',views.StoreListbyQuery.as_view())

    
    
]
"""
    path('store/', views.store, name='store'),
    path('migration/', views.migration_stores, name='migration'),

"""

