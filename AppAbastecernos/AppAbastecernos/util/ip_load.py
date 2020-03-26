
def get_ip(request):
    ip_proxy = get_ip_proxy(request)
    if ip_proxy:
        ip_proxy = ip_proxy.split(',')[0]
    else:
        ip_proxy = request.META.get('REMOTE_ADDR')
    return ip_proxy
        

def get_ip_proxy(request):
    return request.META.get('HTTP_X_FORWARDED_FOR')