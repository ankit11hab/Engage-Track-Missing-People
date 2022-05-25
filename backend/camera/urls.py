from django.urls import path
from . import views

urlpatterns = [
    path('camera-record', views.addCameraRecord, name='addCameraRecord')
]