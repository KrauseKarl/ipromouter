from django.urls import path

from .views import *


app_name = 'app_site'

urlpatterns = [
    path('', index, name='index'),
    path('feature', feature, name='feature'),
    path('cities', cities, name='cities'),
]