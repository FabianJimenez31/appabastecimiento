import requests
from AppAbastecernos.apps.api.models import store

class LoadStore:

    def __init__(self):
        self.url_api_komercia = 'https://api-marketplace.komercia.co/api/shops/by/id/'
        self.limit_ids = 2000
        self.encoding = 'utf-8'

    def validate_store(self,dict_store):
        store_exits = store.objects.filter(name=dict_store['name'])

        for stores in store_exits:
            if(
                stores.latitude==dict_store['latitude'] 
                and stores.longitude==dict_store['longitude']):
                return False
        return True


    def save_store(self,dict_store):
        new_store = store(
            name=dict_store['name'], 
            latitude=dict_store['latitude'],
            longitude=dict_store['longitude'],
            address=dict_store['address']
            )
        new_store.save()    

        

    def validate_status_response(self,code):
        if code is 200:
            return True
        return False

    def load_stores_api(self):
        for id_store in range(self.limit_ids):
            response = requests.get(self.url_api_komercia+str(id_store))
            response.encoding = self.encoding
            result_store = response.json()

            if self.validate_status_response(response.status_code):
                data_stores = result_store['data']
                
                for data_store in data_stores:
                    sedes_store = data_store['sedes']
                    for sede_store in sedes_store:
                        if(
                            self.validation_keys(sede_store['nombre_sede'])
                            and self.validation_keys(sede_store['latitud'])
                            and self.validation_keys(sede_store['longitud'])
                            and self.validation_keys(sede_store['direccion'])
                            ):
                            sede_store = { 
                            "name":sede_store['nombre_sede'],
                            "latitude":sede_store['latitud'],
                            'longitude':sede_store['longitud'],
                            'address':sede_store['direccion'] }

                            if self.validate_store(sede_store):
                                self.save_store(sede_store)

    def validation_keys(self,name_validate=None):
        if(
            name_validate is not None
            and name_validate!='undefined'
            and name_validate!='Test'):
                return True
    
        return False

