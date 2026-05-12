from django.contrib import admin
from django.urls import path, include
from web.views import home, about, agent, crm, why_us, privacy, terms

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home, name='home'),
    path('about/', about, name='about'),
    path('agent/', agent, name='agent'),
    path('crm/', crm, name='crm'),
    path('why-us/', why_us, name='why_us'),
    path('privacy/', privacy, name='privacy'),
    path('terms/', terms, name='terms'),
]
