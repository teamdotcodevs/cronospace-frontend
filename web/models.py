from django.db import models

# Create your models here.
class Lead(models.Model):
    user_name = models.CharField(max_length=100)
    business_type = models.CharField(max_length=100)
    user_email = models.EmailField()
    preferred_date = models.DateField(null=True, blank=True)
    preferred_time = models.TimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user_name} - {self.business_type}"
