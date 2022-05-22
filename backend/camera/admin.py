from django.contrib import admin
from .models import CameraRecord, CapturedImages

# Register your models here.
admin.site.register(CameraRecord)
admin.site.register(CapturedImages)