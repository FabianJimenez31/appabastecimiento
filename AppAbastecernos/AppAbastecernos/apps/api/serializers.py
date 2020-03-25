from rest_framework import serializers
from .models import store, product, store_report, store_status

class ProductSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = product
        fields = ('id','name', 'description')

class StoreStatusSerializer(serializers.ModelSerializer):

    class Meta:
        model = store_status
        fields = ('name')


class StoreReportSerializer(serializers.ModelSerializer):
    store_status = StoreStatusSerializer(read_only=True)
    class Meta:

        model = store_report
        fields = ('time', 'photo','store_status')

class StoreSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)
    reports = serializers.SerializerMethodField('get_reports')
    class Meta:
        model = store
        
        fields = ('id','name','latitude','longitude','products','reports')

        

    def get_reports(self,obj):
        stores = store_report.objects.filter(store_id=obj.id)
        return StoreReportSerializer(stores, many=True).data


def calculateJam(sto):
    state = models.store_report.objects.all().filter(store=sto).order_by('-time')[:3]
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