from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import CameraRecord, CapturedImages
from authentication.models import CustomUser


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addCameraRecord(request):
    user = request.user
    data = request.data
    CameraRecord(channel_name = data['channel_name'], police_station = user, location = data['location']).save()
    return Response("Camera has been added to database", status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addCapturedImages(request):
    data = request.data
    camera = CameraRecord.objects.get(channel_name=data['channel_name'])
    CapturedImages(camera=camera, image=data['image']).save()
    return Response("Image has been added to database", status=status.HTTP_200_OK)