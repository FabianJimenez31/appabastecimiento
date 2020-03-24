from django.http import JsonResponse
from . import models

def get(request):
    return JsonResponse({'message':'Hola'})

def store(request):
    if request.method == 'GET':

        store = request.GET.get('id', 'none')

        if store == 'none':
            stores = models.store.objects.all()
            response = {'stores':[]}
            for sto in stores:
                obj = {'id':sto.id,'name':sto.name,'location':{'latitude':sto.latitude,'longitude':sto.longitude},'products':[], 'reports':[]}


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
            obj = {'id':sto.id,'name':sto.name,'location':{'latitude':sto.latitude,'longitude':sto.longitude},'products':[]}
            for pro in sto.products.all():
                obj['products'].append({'product':pro.name,'ammount':models.store_product.objects.get(store=sto, product=pro).amount})
            return JsonResponse(obj)

    if request.method == 'POST':
        print(request.body)
        return JsonResponse({'message':'agregado', 'elque':str(request.body)})

