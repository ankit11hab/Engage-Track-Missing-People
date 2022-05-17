from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import MissingPerson, TrackHistory


@api_view(['GET'])
def getAllPersons(request):
    missing_person = MissingPerson.objects.all()
    for person in missing_person:
        missing_person_details = {
            "id": person.id,
            "applicant_police_station": person.applicant_police_station.police_station_uid,
            "name": person.name,
            "age": person.age,
            "gender": person.gender,
            "isCriminal": person.isCriminal,
            "isTracked": person.isTracked,
            "isFound": person.isFound,
            "details": person.details,
            "applicant_email": person.applicant_email,
        }
    
    return Response(missing_person_details, status=status.HTTP_200_OK)

@api_view(['GET'])
def getPerson(request):
    data = request.data
    missing_person = MissingPerson.objects.get(id = data["id"])
    location = missing_person.trackhistory_set.all()
    print(location)
    track_history = []
    for item in location:
        detail = {
            "time": item.time_of_tracking,
            "location": item.location
        }
        track_history.append(detail)
    missing_person_details = {
        "id": missing_person.id,
        "applicant_police_station": missing_person.applicant_police_station.police_station_uid,
        "name": missing_person.name,
        "age": missing_person.age,
        "gender": missing_person.gender,
        "isCriminal": missing_person.isCriminal,
        "isTracked": missing_person.isTracked,
        "isFound": missing_person.isFound,
        "details": missing_person.details,
        "applicant_email": missing_person.applicant_email,
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
    MissingPerson(applicant_police_station=user, name = data["name"], age = data["age"], gender = data["gender"], isCriminal = data["isCriminal"], details = data["details"], applicant_email = data["applicant_email"]).save()
    return Response("Person added", status=status.HTTP_200_OK)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addTrackHistory(request):
    data = request.data
    missing_person = MissingPerson.objects.filter(id=data["id"]).first()
    TrackHistory(missing_person=missing_person, location = data["location"]).save()
    return Response("History updated", status=status.HTTP_200_OK)



@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deletePerson(request):
    user = request.user
    data = request.data
    missing_person = MissingPerson.objects.get(id = data["id"])
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

