# Generated by Django 3.0.4 on 2020-03-27 16:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_merge_20200327_1637'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='store_product',
            name='unit',
        ),
    ]