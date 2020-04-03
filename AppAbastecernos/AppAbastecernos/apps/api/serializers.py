from django.db.models import  Avg
from rest_framework import serializers
from drf_yasg.utils import swagger_serializer_method
from .models import (
    store, 
    product, 
    store_status,
    units,
    store_report,
    store_raiting
)


class ProductSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = product
        fields = ('id','name', 'description','icon')

class StoreRaiting(serializers.ModelSerializer):

    class Meta:
        model = store_raiting
        fields = ('id','raiting')

class StoreStatusSerializer(serializers.ModelSerializer):

    class Meta:
        model = store_status
        fields = ('id','name')


class StoreReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = store_report
        fields = ('id','photo','description','created_on')


class StoreSerializer(serializers.ModelSerializer):
    #products = ProductSerializer(many=True, read_only=True)
    reports = serializers.SerializerMethodField('get_reports')
    #5state = serializers.SerializerMethodField('get_state')
    raiting = serializers.SerializerMethodField('get_raiting')
    class Meta:
        model = store
        
        fields = (
            'id',
            'name',
            'latitude',
            'longitude',
             'raiting',
            'reports'
            )

        
    @swagger_serializer_method(serializer_or_field=StoreReportSerializer(many=True))
    def get_reports(self,obj):
        stores_reports = store_report.objects.filter(store_id=obj.id)
        return StoreReportSerializer(stores_reports, many=True).data
    @swagger_serializer_method(serializer_or_field=serializers.IntegerField)
    def get_raiting(self,obj):
        raiting_dict = store_raiting.objects.filter(store_id=obj.id).aggregate(Avg('raiting'))
        if raiting_dict['raiting__avg']:
            raiting_result = int(raiting_dict['raiting__avg'])
            return raiting_result
        else:
            return 0


    def get_state(self,obj):
        state = calculateJam(obj)
        return str(state)


class UnitSerializer(serializers.ModelSerializer):

    class Meta:
        model = units
        fields =('id', 'name', 'short_name')



def calculateJam(sto):
    state = store_report.objects.all().filter(store=sto).order_by('-time')[:3]
    summ = 0
    c = 0
    for st in state:
        summ += int(st.store_status.id)
        c += 1

    if c == 0:
        return 0
    if c == 1:
        return int(summ*(5/3))
    if c == 2:
        return int(summ*(5/6))
    else:
        return int(summ*(5/9))