from django.db import models

class product(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=500)

class store(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    models.ManyToManyField(product, through='store_product')

class store_status(models.Model):
    name = models.CharField(max_length=100)

class store_report(models.Model):
    store = models.ForeignKey(store, on_delete=models.CASCADE)
    store_status = models.ForeignKey(store_status, on_delete=models.CASCADE)
    time = models.IntegerField()
    photo = models.CharField(max_length=200, blank=True, default='')

class store_product(models.Model):
    store = models.ForeignKey(store, on_delete=models.CASCADE)
    product = models.ForeignKey(product, on_delete=models.CASCADE)


class product_report(models.Model):
    product = models.ForeignKey(store_product, on_delete=models.CASCADE)
    before = models.IntegerField()
    after = models.IntegerField()
    time = models.IntegerField()

