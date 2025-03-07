from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin


from django.urls import path, include

urlpatterns = [
    path('btl-admin/', admin.site.urls),
    path('', include(('app_site.urls', 'app_site'), namespace='app_site')),
    path('__debug__/', include('debug_toolbar.urls')),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
