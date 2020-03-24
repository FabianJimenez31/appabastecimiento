# Generated by Django 3.0.4 on 2020-03-24 16:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_store_product_amount'),
    ]

    operations = [
        migrations.AddField(
            model_name='store',
            name='products',
            field=models.ManyToManyField(through='api.store_product', to='api.product'),
        ),
    ]
