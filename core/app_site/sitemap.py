from django.contrib import sitemaps
from django.urls import reverse


class StaticViewSitemap(sitemaps.Sitemap):
    changefreq = 'monthly'
    priority = 0.9

    def items(self):
        return ['app_site:index']

    def location(self, item):
        return reverse(item)

