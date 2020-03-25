from rest_framework import serializers
from .models import store, product

class ProductSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = product
        fields = ['id','name', 'description']


class StoreSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)
    class Meta:
        model = store
        fields = ['id','name','latitude','longitude','products']


