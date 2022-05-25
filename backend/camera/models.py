from django.db import models
from authentication.models import CustomUser
from PIL import Image
import io
import uuid
from django.core.files.base import ContentFile

# Create your models here.
class CameraRecord(models.Model):
    channel_name = models.CharField(max_length=200, primary_key=True)
    police_station = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    location = models.TextField(max_length=1000, default="")

    def __str__(self):
        return self.channel_name


class CapturedImages(models.Model):
    image = models.ImageField(default='default.jpg', upload_to = 'captured_images', null=True, blank=True)
    police_station = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True, blank=True)
    location = models.TextField(max_length=1000, default="")

    def __str__(self):
        return f'{self.police_station}, {self.image} Image'
