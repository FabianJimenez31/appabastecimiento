import math

class GeoPoint:
    def __init__(self, radio):
        self.radius = radio

    def get_haversine_longitude(self,latitude):
        return float(self.radius / abs(math.cos(math.radians(latitude)) * 69))

    def get_haversine_latitude(self):
        return float(self.radius/69)

    

