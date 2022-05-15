from rest_framework.response import Response
from .serializers import UserSerializer
from rest_framework.generics import GenericAPIView
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated


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
        "latitude": user.latitude,
        "longitude": user.longitude,
        "police_station_uid": user.police_station_uid,
        "email": user.email
    }
    return Response("Police station details changed", status=status.HTTP_200_OK)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def editPoliceStationDetails(request):
    user = request.user
    data = request.data
    if "latitude" in data.keys():
        user.latitude = data["latitude"]
    if "longitude" in data.keys():
        user.longitude = data["longitude"]
    if "phone" in data.keys():
        user.phone = data["phone"]
    if "email" in data.keys():
        user.email = data["email"]
    user.save()
    return Response("Police station details changed", status=status.HTTP_200_OK)