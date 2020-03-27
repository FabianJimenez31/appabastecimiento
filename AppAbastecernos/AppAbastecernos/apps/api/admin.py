from django.contrib.admin import AdminSite
from django.contrib import admin
from django.utils.translation import ugettext_lazy
from .models import store, product, store_status, product_report, store_report, store_product, units
# Register your models here.

class adm(AdminSite):
	site_title = ugettext_lazy('App Abastecernos admin')
	site_header = ugettext_lazy('App Abastecernos admin')
	site_title = ugettext_lazy('App Abastecernos admin')


adm = adm()

adm.register(store_status)
adm.register(store)
adm.register(product)
adm.register(product_report)
adm.register(store_report)
adm.register(store_product)
adm.register(units)