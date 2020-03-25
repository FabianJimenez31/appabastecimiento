from django.http import (
        Http404,
        JsonResponse,
        HttpResponse
    )
from . import models
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import JSONParser
from .serializers import (
    StoreSerializer,
    StoreStatusSerializer
        )
from AppAbastecernos.util.load_stores import LoadStore
from AppAbastecernos.config.config import Config
config = Config()

LoadInformation = config.get_migration_stores()

def get(request):
    return JsonResponse({'message':'Hola'})

def store(request):
    if request.method == 'GET':

        store = request.GET.get('id', 'none')

        if store == 'none':
            stores = models.store.objects.all()
            response = {'stores':[]}
            for sto in stores:

                state = calculateJam(sto)

                obj = {'id':sto.id,'address':sto.address,'name':sto.name,'state':state,'location':{'latitude':sto.latitude,'longitude':sto.longitude},'products':[], 'reports':[]}


                #Aquí conseguimos los productos
                for pro in sto.products.all():
                    obj['products'].append({'product':pro.name,'ammount':models.store_product.objects.get(store=sto, product=pro).amount})
                response['stores'].append(obj)

                #Aquí conseguimos los reportes
                for rep in models.store_report.objects.filter(store=sto):
                    obj['reports'].append({'status':rep.store_status.name, 'time':rep.time, 'photo':rep.photo})

            return JsonResponse(response)
        
        else:
            sto = models.store.objects.get(pk=store)

            state = calculateJam(sto)
            obj = {'id':sto.id,'address':sto.address,'name':sto.name,'state':state,'location':{'latitude':sto.latitude,'longitude':sto.longitude},'products':[], 'reports':[]}

            for pro in sto.products.all():
                obj['products'].append({'product':pro.name,'ammount':models.store_product.objects.get(store=sto, product=pro).amount})

            for rep in models.store_report.objects.filter(store=sto):
                    obj['reports'].append({'status':rep.store_status.name, 'time':rep.time, 'photo':rep.photo})
            return JsonResponse(obj)

    if request.method == 'POST':
        print(request.body)
        return JsonResponse({'message':'agregado', 'elque':str(request.body)})

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

def migration_stores(request): 
    if LoadInformation:
        load_store = LoadStore()
        load_store.load_stores_api()
    return JsonResponse({'message':'Hola'})

class StoreList(APIView):

    parser_classes = (JSONParser,)

    def get(self, request, format=None):
        stores = models.store.objects.all()
        serializer = StoreSerializer(stores, many=True)
        return Response(serializer.data)

class productList(APIView):
    parser_classes = (JSONParser,)

    def post(self, request, format=None):
        try:

            name = request.data['name']
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        description = None

        if 'description' in request.data:
            description = request.data['descripcion']
        
        if description is not None:
            product = models.product(name=name, description=description)
            product.save()
        else:
            product = models.product(name=name)
            product.save()

        return Response(status=status.HTTP_201_CREATED)


class StoreStatusList(APIView):

    parser_classes = (JSONParser,)

    def get(self,request,format=None):
        stores_status = models.store_status.objects.all()
        serializer = StoreStatusSerializer(stores_status, many=True)
        return Response(serializer.data)

class StoreReportList(APIView):
    parser_classes = (JSONParser,)

    def get_object(self,pk):
        try:
            return models.store.objects.get(pk=pk)
        except models.store.DoesNotExist:
            raise Http404

    def post(self,request,format=None):
        store_id = None
        store_status_id = None
        time = None
        photo = None
        try:
            store_id = request.data['store_id']
            store_status_id = request.data['status_id']
            time = request.data['time']

        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        if 'photo' in request.data:
            photo = request.data['photo']
        else:
            photo = ''
        store_object = None
        status_object = None

        try:
            store_object = self.get_object(store_id)
            status_object = models.store_status.objects.get(pk=store_status_id)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        store_report_object = models.store_report(
                    store=store_object,
                    store_status=status_object,
                    time=time,
                    photo=photo
                    )
        store_report_object.save()

        return Response(status=status.HTTP_201_CREATED)


class ProductReportList(APIView):
    parser_classes = (JSONParser,)

    def post(self, request, format=None):
        product_id = None
        before = None
        after = None
        time = None
        try:
            product_id = request.data['product_id']
            before = request.data['before']
            after = request.data['after']
            time = request.data['time']
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        product_object = None
        try:

            product_object = models.product.objects.get(pk=product_id)
        except models.product.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        product_report_object = models.product_report(
            product=product_object,
            before=before,
            after=after,
            time=time
        )

        product_report_object.save()

        return Response(status=status.HTTP_201_CREATED)


class StoreProductList(APIView):
    parser_classes = (JSONParser,)

    def post(self, request, format=None):
        store_id = None
        product_id = None
        amount = None

        try:
            store_id = request.data['store_id']
            product_id = request.data['product_id']
            amount = request.data['amount']
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        store_object = None
        product_object = None

        try:
            store_object = models.store.objects.get(pk=store_id)
            product_object = models.product.objects.get(pk=product_id)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        store_product_object = models.store_product(
            store=store_object,
            product=product_object,
            amount=amount
            )
        return Response(status=status.HTTP_201_CREATED)







        





