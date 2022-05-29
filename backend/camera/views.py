from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import CameraRecord
from authentication.models import CustomUser
import requests
from urllib.parse import urlencode
from django.conf import settings


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addCameraRecord(request):
    user = request.user
    data = request.data
    channel_name = data['channel_name']
    lat = data["lat"]
    lng = data["lng"]
    data_type = "json"
    endpoint = f"https://maps.googleapis.com/maps/api/geocode/{data_type}"
    params = {"latlng":f"{lat},{lng}","key":settings.AUTOCOMPLETE_API_KEY}
    url_params = urlencode(params)
    url = f"{endpoint}?{url_params}"
    res = requests.get(url)
    data = res.json()
    address_components = data['results'][0]['address_components']
    location = ""
    for component in address_components:
        if 'long_name' in component:
            location+=component['long_name']+" "
    CameraRecord(channel_name = channel_name, police_station = user, location = location).save()
    return Response("Camera has been added to database", status=status.HTTP_200_OK)
