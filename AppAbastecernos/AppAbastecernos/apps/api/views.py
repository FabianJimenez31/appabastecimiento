from django.http import JsonResponse

def get(request):
    return JsonResponse({'message':'Hola'})