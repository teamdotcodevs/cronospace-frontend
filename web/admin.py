from django.contrib import admin
from .models import Lead

# Register your models here.
@admin.register(Lead)
class DemoLeadAdmin(admin.ModelAdmin):
    list_display = ['user_name', 'business_type', 'user_email', 'preferred_date', 'preferred_time', 'created_at']
    list_filter = ['business_type', 'created_at']
    search_fields = ['user_name', 'user_email']
    date_hierarchy = 'created_at'
