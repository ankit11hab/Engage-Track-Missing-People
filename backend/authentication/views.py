from rest_framework.response import Response
import csv
import io
from .models import CustomUser
from .serializers import UserSerializer
from rest_framework.generics import GenericAPIView
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.contrib.auth.hashers import check_password


class RegisterView(GenericAPIView):
    serializer_class = UserSerializer
    def post(self,request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getPoliceStationDetails(request):
    user = request.user
    station_details = {
        "location": user.location,
        "police_station_uid": user.police_station_uid,
        "email": user.email,
        "phone": user.phone,
        "is_admin": user.is_admin
    }
    return Response(station_details, status=status.HTTP_200_OK)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def editPoliceStationDetails(request):
    user = request.user
    data = request.data
    if "location" in data.keys():
        user.location = data["location"]
    if "phone" in data.keys():
        user.phone = data["phone"]
    if "email" in data.keys():
        user.email = data["email"]
    user.save()
    return Response("Police station details changed", status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def changePassword(request):
    user = request.user
    data = request.data
    if user.check_password(data['current_password']):
        user.set_password(data['new_password'])
        user.save()
        return Response("Password has been updated", status=status.HTTP_200_OK)
    return Response("Enter correct credentials", status=status.HTTP_406_NOT_ACCEPTABLE)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def registerInBulk(request):
    file = request.FILES['file']
    decoded_file = file.read().decode('utf-8').splitlines()
    reader = csv.DictReader(decoded_file)
    for row in reader:
        if not 'police_station_uid' in row:
            return Response("Could not parse Police Station UID", status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        if not 'phone' in row:
            return Response("Could not parse Police Station's phone", status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        police_station_uid = row['police_station_uid']
        phone = row['phone']
        newUser = CustomUser(police_station_uid=police_station_uid, phone=phone)
        newUser.set_password("password")
        newUser.save()
    
    return Response("Police stations have been added", status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getAllPoliceStations(request):
    police_stations = CustomUser.objects.all()
    data = []
    for police_station in police_stations:
        ps = {
            "police_station_uid": police_station.police_station_uid,
            "location": police_station.location,
            "phone": police_station.phone,
            "email": police_station.email,
        }
        data.append(ps)
    
    return Response(data, status=status.HTTP_200_OK)