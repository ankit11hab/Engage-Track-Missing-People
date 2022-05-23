from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
import uuid
from .models import MissingPerson, TrackHistory
from camera.models import CameraRecord, CapturedImages
from authentication.models import CustomUser
from django.conf import settings
import datetime
import cv2
import face_recognition

known_face_encodings = []
known_face_names = []

missing_persons_for_encodings = MissingPerson.objects.all()
for person in missing_persons_for_encodings:
    path = "media/"+str(person.image)
    image = face_recognition.load_image_file(path)
    try:
        face_encoding = face_recognition.face_encodings(image)[0]
        known_face_encodings.append(face_encoding)
        known_face_names.append(person.name)
    except IndexError as e:
        print(e)


def get_face_names_and_encodings():
    return (known_face_names, known_face_encodings, face_recognition)


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

@api_view(['GET'])
def getAllCriminals(request):
    missing_person = MissingPerson.objects.filter(isCriminal=True)
    data = []
    for person in missing_person:
        missing_person_details = {
            "person_uuid": person.person_uuid,
            "applicant_police_station": person.applicant_police_station.police_station_uid,
            "name": person.name,
            "details": person.details,
            "image": settings.SERVER_URL+'media/'+person.image.name
        }
        print(missing_person_details)
        data.append(missing_person_details)
    
    return Response(data, status=status.HTTP_200_OK)

@api_view(['GET'])
def getAllNonCriminals(request):
    missing_person = MissingPerson.objects.filter(isCriminal=False)
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

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getAllAppliedFromHere(request):
    user = request.user
    missing_person = MissingPerson.objects.filter(applicant_police_station=user)
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
    police_stations = CustomUser.objects.all()
    ps_count = police_stations.count()
    camera_records = CameraRecord.objects.all().count()
    captured_images = CapturedImages.objects.all().count()
    max_ps_missing = 0
    ps_missing = ""
    for station in police_stations:
        count = station.missingperson_set.all().count()
        if count>max_ps_missing:
            max_ps_missing = count
            ps_missing = station.police_station_uid
    number_of_persons_tracked = number_of_persons_found = count = 0
    number_of_persons_tracked_today = number_of_persons_found_today = number_of_persons_missing_today = count_today = 0
    for person in missing_person:
        if person.time_of_addition.date() == datetime.datetime.now().date():
            count_today+=1
        if person.isTracked:
            number_of_persons_tracked+=1
            if person.time_of_first_tracking.date() == datetime.datetime.now().date():
                number_of_persons_tracked_today += 1
        if person.isFound:
            number_of_persons_found+=1
            if person.time_of_found.date() == datetime.datetime.now().date():
                number_of_persons_found_today += 1
        count+=1
    number_of_persons_missing = count - number_of_persons_found
    number_of_persons_missing_today = count_today - number_of_persons_found_today
    stats = {
        "missing":number_of_persons_missing,
        "tracked":number_of_persons_tracked,
        "found":number_of_persons_found,
        "missing_today": number_of_persons_missing_today,
        "tracked_today": number_of_persons_tracked_today,
        "found_today": number_of_persons_found_today,
        "police_station_count": ps_count,
        "camera_count": camera_records,
        "image_count": captured_images,
        "most_active_ps": ps_missing,
        "missing_most_active_ps": max_ps_missing

    }
    
    return Response(stats, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addPerson(request):
    user = request.user
    data = request.data
    person_uuid = uuid.uuid4()
    print("name",data['image'].name)
    MissingPerson(person_uuid = person_uuid, applicant_police_station=user, name = data["name"], image=data['image'], age = data["age"], gender = data["gender"], isCriminal = data["isCriminal"], details = data["details"], applicant_email = data["applicant_email"]).save()
    path = "media/missing_people/"+data['image'].name
    image = face_recognition.load_image_file(path)
    try:
        face_encoding = face_recognition.face_encodings(image)[0]
        known_face_encodings.append(face_encoding)
        known_face_names.append(data["name"])
    except IndexError as e:
        print(e)
    return Response(person_uuid, status=status.HTTP_200_OK)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addTrackHistory(request):
    data = request.data
    missing_person = MissingPerson.objects.filter(person_uuid=data["person_uuid"]).first()
    if missing_person.isTracked==False:
        missing_person.isTracked = True
    if missing_person.time_of_first_tracking==None:
        missing_person.time_of_first_tracking = datetime.datetime.now()
    missing_person.save()
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
    missing_person = MissingPerson.objects.filter(person_uuid=data["person_uuid"]).first()
    if(user==missing_person.applicant_police_station):
        if "name" in data:
            missing_person.name = data["name"]
        if "age" in data:
            missing_person.age = data["age"]
        if "gender" in data:
            missing_person.gender = data["gender"]
        if "isCriminal" in data:
            missing_person.isCriminal = data["isCriminal"]
        if "isTracked" in data:
            missing_person.isTracked = data["isTracked"]
        if "isFound" in data:
            missing_person.isFound = data["isFound"]
        if "details" in data:
            missing_person.details = data["details"]
        if "applicant_email" in data:
            missing_person.applicant_email = data["applicant_email"]
        missing_person.save()
        return Response("Person detail edited", status=status.HTTP_200_OK)
    return Response("Can not edit person details", status=status.HTTP_403_FORBIDDEN)

