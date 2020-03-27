from django.db import models
from datetime import datetime
from django.utils import timezone

class product(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=500)
    icon = models.CharField(max_length=200, default='')
    def __str__(self):
        return self.name

class store(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    latitude = models.FloatField()
    longitude = models.FloatField()
    products = models.ManyToManyField(product, through='store_product')
    def __str__(self):
        return self.name

class store_status(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name

class store_report(models.Model):
    store = models.ForeignKey(store, on_delete=models.CASCADE)
    store_status = models.ForeignKey(store_status, on_delete=models.CASCADE)
    time = models.DateTimeField(default=timezone.now)
    photo = models.CharField(max_length=200, blank=True, default='')
    ip = models.CharField(max_length=20)

class units(models.Model):
    name = models.CharField(max_length=100)
    short_name = models.CharField(max_length=100)
    def __str__(self):
        return self.name+' ('+self.short_name+')'


class store_product(models.Model):
    store = models.ForeignKey(store, on_delete=models.CASCADE)
    product = models.ForeignKey(product, on_delete=models.CASCADE)
    amount = models.IntegerField()


class product_report(models.Model):
    product = models.ForeignKey('product', on_delete=models.CASCADE)
    store = models.ForeignKey('store', on_delete=models.CASCADE)
    before = models.IntegerField()
    after = models.IntegerField()
    time = models.DateTimeField(default=timezone.now)
    ip = models.CharField(max_length=20)
    unit = models.ForeignKey(units, on_delete=models.CASCADE, default=6)
