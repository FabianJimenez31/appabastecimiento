# Generated by Django 3.0.4 on 2020-03-27 16:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_remove_store_product_unit'),
    ]

    operations = [
        migrations.AddField(
            model_name='store_product',
            name='unit',
            field=models.ForeignKey(default=6, on_delete=django.db.models.deletion.CASCADE, to='api.units'),
        ),
    ]
