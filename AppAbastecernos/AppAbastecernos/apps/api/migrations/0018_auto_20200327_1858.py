# Generated by Django 3.0.4 on 2020-03-27 18:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0017_auto_20200327_1731'),
    ]

    operations = [
        migrations.RenameField(
            model_name='product_report',
            old_name='units',
            new_name='unit',
        ),
    ]