from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from web.views import home, about, agent, crm, why_us, privacy, terms, submit_demo_lead, book_demo

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home, name='home'),
    path('about/', about, name='about'),
    path('agent/', agent, name='agent'),
    path('crm/', crm, name='crm'),
    path('why-us/', why_us, name='why_us'),
    path('privacy/', privacy, name='privacy'),
    path('terms/', terms, name='terms'),
    path('submit-demo-lead/', submit_demo_lead, name='submit_demo_lead'),
    path('book-demo/', book_demo, name='book_demo'),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
