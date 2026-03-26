from django.contrib.sitemaps.views import sitemap
from django.urls import path

from .sitemap import StaticViewSitemap
from .views import *

sitemaps = {
    'static': StaticViewSitemap,
}
app_name = 'app_site'

urlpatterns = [
    path('', index, name='index'),
    path('contact', contact, name='contact'),
    path('candidate', candidate, name='candidate'),
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps})
]