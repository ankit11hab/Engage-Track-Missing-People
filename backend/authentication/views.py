from rest_framework.response import Response
from .serializers import UserSerializer
from rest_framework.generics import GenericAPIView
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
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
def getPoliceStationDetails(request):
    user = request.user
    station_details = {
        "location": user.location,
        "police_station_uid": user.police_station_uid,
        "email": user.email,
        "phone": user.phone
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