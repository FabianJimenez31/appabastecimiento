from django.http import (
        Http404,
        JsonResponse,
        HttpResponse
    )
from django.core.files.storage import FileSystemStorage

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser,FormParser,JSONParser
from .serializers import (
    StoreSerializer,
    StoreStatusSerializer,
    UnitSerializer,
    ProductSerializer
        )
from drf_yasg.utils import swagger_auto_schema 
from drf_yasg import openapi
from . import models
from AppAbastecernos.util.load_stores import LoadStore
from AppAbastecernos.config.config import Config
from AppAbastecernos.util import ip_load
from AppAbastecernos.util.geo_point import GeoPoint
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
    @swagger_auto_schema(
        responses={200:openapi.Response('Store',StoreSerializer)},
        tags=['Store']

    )
    def get(self, request, format=None):
        stores = models.store.objects.all()
        serializer = StoreSerializer(stores, many=True)
        return Response(serializer.data)
    @swagger_auto_schema(
        responses={201:''},
        operation_description="Create Store",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['name','latitude','longitude',],
            properties={
                'name': openapi.Schema(type=openapi.TYPE_STRING),
                'latitude': openapi.Schema(type=openapi.TYPE_NUMBER),
                'longitude': openapi.Schema(type=openapi.TYPE_NUMBER),

            },
        ),
        
    )
    def post(self, request, format=None):
        name = None
        latitude = None
        longitude = None
        products = models.product.objects.all()

        try:
            name = request.data['name']
            latitude = request.data['latitude']
            longitude =request.data['longitude']
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        store_object = models.store(
            name=name, 
            latitude=latitude, 
            longitude=longitude)
        
        store_object.save()
        store_object.products.add(*products)

        store_object.save()

        return Response(status=status.HTTP_201_CREATED)





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

    def get(self, request, format=None):
        products = models.product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)


class StoreStatusList(APIView):

    parser_classes = (JSONParser,)

    def get(self,request,format=None):
        stores_status = models.store_status.objects.all()
        serializer = StoreStatusSerializer(stores_status, many=True)
        return Response(serializer.data)

class StoreListbyQuery(APIView):
    parser_classes = (JSONParser,)
    @swagger_auto_schema(
        responses={200:openapi.Response('Stores',StoreSerializer(many=True))},
        tags=['Stores']
        )
    def get(self, request, name=None, format=None):
        if name is not None:
            stores = models.store.objects.filter(name__icontains=name)[0:6]
            serializer = StoreSerializer(stores, many=True)
            return Response(serializer.data)

        return Response(status=status.HTTP_400_BAD_REQUEST)
    
    def post(self, request, format=None):
        name = None
        stores = None
        

        try:
            name = request.data['name']
            stores = models.store.objects.filter(name__icontains=name)[0:6]
            serializer = StoreSerializer(stores, many=True)
            return Response(serializer.data)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST) 



class StoreReportList(APIView):

    #parser_classes = (MultiPartParser,FormParser,JSONParser,)
    
    def get_object(self,pk):
        try:
            return models.store.objects.get(pk=pk)
        except models.store.DoesNotExist:
            raise Http404

    @swagger_auto_schema(
        responses={201:''},
        operation_description="Create Report Store Description",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['store_id','description','photo'],
            properties={
                'store_id': openapi.Schema(type=openapi.TYPE_INTEGER),
                'description': openapi.Schema(type=openapi.TYPE_STRING),
                'photo': openapi.Schema(type=openapi.TYPE_FILE),

            },
        ),
        
    )
    def post(self,request,format=None):
        
        store_id = None
        description = None
        photo = None
        
        store_id = request.data['store_id']
        description = request.data['description']
        

       

        if 'photo' in request.FILES.get('photo'):
            photo = request.FILES.get('photo')
        else:
            photo = ''

        
        store_object = None
        

     
        store_object = self.get_object(store_id)
            
       
            

        store_report_object = models.store_report(
                    store=store_object,
                    description=description,
                    ip_client=ip_load.get_ip(request)
                    )
        store_report_object.save()
        if(
            photo is not None
            and photo!=''
            and store_report_object is not None
            ):
            fs = FileSystemStorage()
            ubication = fs.save(
            'images/'+str(store_report_object.id)+photo.name,
            photo
            )
            store_report_object.photo = fs.url(ubication)
            store_report_object.save()

        return Response(status=status.HTTP_201_CREATED)
    


class StoreDetail(APIView):
    parser_classes = (JSONParser,)
    
    def get_object(sef,pk_store):
        try:
            return models.store.objects.get(pk=pk_store)
        except models.store.DoesNotExist:
            raise Http404


    @swagger_auto_schema(
        responses={200:openapi.Response('Store',StoreSerializer)},
        tags=['Store']

    )

    def get(self, request, pk_store, format=None):
        store_object = None
        try:
            pk_store = int(pk_store)
            store_object = self.get_object(pk_store)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        serializer =StoreSerializer(store_object)
        return Response(serializer.data)


class ProductReportList(APIView):
    parser_classes = (JSONParser,)
    @swagger_auto_schema(
        responses={201:''},
        operation_description="Create Report Description",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['product_id','before','after','unit_id','store_id'],
            properties={
                'product_id': openapi.Schema(type=openapi.TYPE_INTEGER),
                'before': openapi.Schema(type=openapi.TYPE_STRING),
                'after': openapi.Schema(type=openapi.TYPE_STRING),
                'unit_id':openapi.Schema(type=openapi.TYPE_INTEGER),
                'store_id':openapi.Schema(type=openapi.TYPE_INTEGER),

            },
        ),
        
    )
    def post(self, request, format=None):
        product_id = None
        before = None
        after = None
        unit_id = None
        store_id = None
       
        try:
            product_id = request.data['product_id']
            before = request.data['before']
            after = request.data['after']
            unit_id = request.data['unit_id']
            store_id = request.data['store_id']
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        product_object = None
        store_object = None
        try:

            product_object = models.product.objects.get(pk=product_id)
            store_object = models.store.objects.get(pk=store_id)
        except models.product.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        product_report_object = models.product_report(
            product=product_object,
            store=store_object,
            before=before,
            after=after,
            unit_id=unit_id
        )

        product_report_object.save()

        return Response(status=status.HTTP_201_CREATED)



class StoreRaitingList(APIView):
    parser_classes = (JSONParser,)
    @swagger_auto_schema(
        responses={201:''},
        operation_description="Create raiting",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['store_id','raiting',],
            properties={
                'store_id': openapi.Schema(type=openapi.TYPE_INTEGER),
                'raiting': openapi.Schema(type=openapi.TYPE_INTEGER)
                
            

            },
        ),
        
    )
    def post(self, request, format=None):
        raiting = None  
        store_id = None 

        try:
            raiting = int(request.data['raiting'])
            store_id = request.data['store_id']
            store_raiting = models.store_raiting(raiting=raiting,store_id=store_id)
            store_raiting.save()
        except:
            Response(status=status.HTTP_400_BAD_REQUEST)
        
        return Response(status=status.HTTP_201_CREATED)




class StoreStockProductList(APIView):
    parser_classes = (JSONParser,)
    @swagger_auto_schema(
        responses={201:''},
        operation_description="Create Report Stock_Product_Description",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['store_id','product_id','amount'],
            properties={
                'store_id': openapi.Schema(type=openapi.TYPE_INTEGER),
                'products': openapi.Schema(type=openapi.TYPE_ARRAY,
                items=openapi.Items(type=openapi.TYPE_STRING)
                ),
            

            },
        ),
        
    )
    def post(self, request, format=None):
        store_id = None
        store_object = None
        product_object = None

        try:
            store_id = request.data['store_id']
            products = request.data['products']
            
            
            for product in products:
                
                store_product_object = models.store_product.objects.filter(
                store_id=store_id,
                product_id=product['id'])[0]
                store_product_object.amount = product['count']
                store_product_object.save()


            
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)


        return Response(status=status.HTTP_201_CREATED)

 

class StoreByGeoPointList(APIView):
    parser_classes = (JSONParser,)
    @swagger_auto_schema(
        responses={200:StoreSerializer(many=True)},
        tags=['Stores']
    )
    def get(self, request,latitude,longitude, radio=2, format=None):
        geo_point = GeoPoint(radio)
        latitude = float(latitude)
        longitude = float(longitude)
        latitude_min = float(latitude-geo_point.get_haversine_latitude())
        latitude_max = float(latitude+geo_point.get_haversine_latitude())
        longitude_min = float(longitude-geo_point.get_haversine_longitude(latitude))
        longitude_max = float(longitude+geo_point.get_haversine_longitude(latitude))

        stores_object = models.store.objects.filter(
            latitude__gte=latitude_min,
            latitude__lte=latitude_max,
            longitude__gte=longitude_min,
            longitude__lte=longitude_max,

        )
        serializer = StoreSerializer(stores_object, many=True)

        return Response(serializer.data)
    @swagger_auto_schema(
        responses={200:StoreSerializer(many=True)},
        operation_description="Return Stores by geopoint and products",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['products'],
            properties={
                'products': openapi.Schema(type=openapi.TYPE_ARRAY,
                items=openapi.Items(type=openapi.TYPE_INTEGER)
                ),
            

            }
        ),
        
    )
    def post(self, request, latitude, longitude, format=None):
        products = request.data['products']
        products = [int(product) for product in products]      
        geo_point = GeoPoint()
        latitude = float(latitude)
        longitude = float(longitude)
        latitude_min = float(latitude-geo_point.get_haversine_latitude())
        latitude_max = float(latitude+geo_point.get_haversine_latitude())
        longitude_min = float(longitude-geo_point.get_haversine_longitude(latitude))
        longitude_max = float(longitude+geo_point.get_haversine_longitude(latitude))

        stores_object = models.store.objects.filter(
            latitude__gte=latitude_min,
            latitude__lte=latitude_max,
            longitude__gte=longitude_min,
            longitude__lte=longitude_max,

        )
        store_result = stores_object
        

        for store in stores_object:
            count = 0 
            products_store = models.store_product.objects.filter(store_id=store.id)

            for product_store in products_store:
                if products.count(int(product_store.product_id))>0:
                    count+=1
                
            if count==0:
                store_result = store_result.exclude(pk=store.id)

        serializer = StoreSerializer(store_result, many=True)
        return Response(serializer.data)


class UnitList(APIView):
    parser_classes = (JSONParser,)

    def get(self, request, format=None):
        units = models.units.objects.all()
        serializer = UnitSerializer(units,many=True)
        return Response(serializer.data)




        





