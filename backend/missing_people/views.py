from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
import uuid
from .models import MissingPerson, TrackHistory
from authentication.models import CustomUser
from django.conf import settings


@api_view(['GET'])
def getAllPersons(request):
    missing_person = MissingPerson.objects.all()
    data = []
    for person in missing_person:
        missing_person_details = {
            "person_uuid": person.person_uuid,
            "applicant_police_station": person.applicant_police_station.police_station_uid,
            "name": person.name,
            "details": person.details,
            "image": settings.SERVER_URL+'media/'+person.image.name
        }
        data.append(missing_person_details)
    
    return Response(data, status=status.HTTP_200_OK)

@api_view(['POST'])
def getPerson(request):
    data = request.data
    missing_person = MissingPerson.objects.filter(person_uuid = data["person_uuid"]).first()
    police_station_details = CustomUser.objects.filter(police_station_uid = missing_person.applicant_police_station.police_station_uid).first()
    location = missing_person.trackhistory_set.all().order_by("-time_of_tracking")
    print(location)
    track_history = []
    for item in location:
        detail = {
            "time": item.time_of_tracking,
            "location": item.location
        }
        track_history.append(detail)
    missing_person_details = {
        "person_uuid": missing_person.person_uuid,
        "ps_uid": missing_person.applicant_police_station.police_station_uid,
        "ps_location": police_station_details.location,
        "ps_phone": police_station_details.phone,
        "ps_email": police_station_details.email,
        "name": missing_person.name,
        "age": missing_person.age,
        "gender": missing_person.gender,
        "isCriminal": missing_person.isCriminal,
        "isTracked": missing_person.isTracked,
        "isFound": missing_person.isFound,
        "details": missing_person.details,
        "applicant_email": missing_person.applicant_email,
        "image": settings.SERVER_URL+'media/'+missing_person.image.name,
        "track_history": track_history
    }
    
    return Response(missing_person_details, status=status.HTTP_200_OK)


@api_view(['GET'])
def getStatistics(request):
    missing_person = MissingPerson.objects.all()
    number_of_persons_tracked = number_of_persons_found = count = 0
    for person in missing_person:
        if person.isTracked:
            number_of_persons_tracked+=1
        if person.isFound:
            number_of_persons_found+=1
        count+=1
    number_of_persons_missing = count - number_of_persons_found - number_of_persons_tracked
    stats = {
        "missing":number_of_persons_missing,
        "tracked":number_of_persons_tracked,
        "found":number_of_persons_found
    }
    
    return Response(stats, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addPerson(request):
    user = request.user
    data = request.data
    person_uuid = uuid.uuid4()
    MissingPerson(person_uuid = person_uuid, applicant_police_station=user, name = data["name"], image=data['image'], age = data["age"], gender = data["gender"], isCriminal = data["isCriminal"], details = data["details"], applicant_email = data["applicant_email"]).save()
    return Response(person_uuid, status=status.HTTP_200_OK)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addTrackHistory(request):
    data = request.data
    missing_person = MissingPerson.objects.filter(person_uuid=data["person_uuid"]).first()
    print(missing_person)
    TrackHistory(missing_person=missing_person, location = data["location"]).save()
    return Response("History updated", status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addTrackHistoryManually(request):
    data = request.data
    missing_person = MissingPerson.objects.filter(person_uuid=data["person_uuid"]).first()
    print(missing_person)
    TrackHistory(time_of_tracking=data["time_of_tracking"], missing_person=missing_person, location = data["location"]).save()
    return Response("History updated", status=status.HTTP_200_OK)



@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deletePerson(request):
    user = request.user
    data = request.data
    missing_person = MissingPerson.objects.filter(person_uuid=data["person_uuid"]).first()
    if user == missing_person.applicant_police_station:
        missing_person.delete()
        return Response("Person deleted", status=status.HTTP_200_OK)
    return Response("Police Station didn't match", status=status.HTTP_403_FORBIDDEN)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def editPerson(request):
    user = request.user
    data = request.data
    missing_person = MissingPerson.objects.get(id = data["id"])
    if(user==missing_person.applicant_police_station):
        if data["name"]:
            missing_person.name = data["name"]
        if data["age"]:
            missing_person.age = data["age"]
        if data["gender"]:
            missing_person.gender = data["gender"]
        if data["isCriminal"]:
            missing_person.isCriminal = data["isCriminal"]
        if data["isTracked"]:
            missing_person.isTracked = data["isTracked"]
        if data["details"]:
            missing_person.details = data["details"]
        if data["applicant_email"]:
            missing_person.applicant_email = data["applicant_email"]
        missing_person.save()
        return Response("Person detail edited", status=status.HTTP_200_OK)
    return Response("Can not edit person details", status=status.HTTP_403_FORBIDDEN)

