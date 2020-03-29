from django.urls import path
from django.conf.urls import include, url
from . import views

urlpatterns = [
    path('store/',views.StoreList.as_view()),
    path('store/<latitude>/<longitude>/',views.StoreByGeoPointList.as_view()),
    path('store/<int:pk_store>/',views.StoreDetail.as_view()),
    path('products/',views.productList.as_view()),
    path('store/status/',views.StoreStatusList.as_view()),
    path('report/store/',views.StoreReportList.as_view()),
    path('report/product/',views.ProductReportList.as_view()),
    path('report/stock/product/',views.StoreStockProductList.as_view()),
    url('store/query/',views.StoreListbyQuery.as_view()),
    path('unit/',views.UnitList.as_view())

    
    
]
"""
    path('store/', views.store, name='store'),
    path('migration/', views.migration_stores, name='migration'),

"""

