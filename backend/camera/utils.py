from missing_people.models import Notifications
import datetime
from missing_people.models import MissingPerson, TrackHistory


def createNotification(missingPerson):
    print("Missing")
    police_station = missingPerson.applicant_police_station
    Notifications(police_station=police_station, message=f"{missingPerson.name} has been tracked. Click to view more details").save()


def getTimeDiff(person_uuid):
    time_now = datetime.datetime.now()
    time_now_aware = time_now.astimezone()
    missingPersonArr = MissingPerson.objects.filter(person_uuid=person_uuid)
    missingPerson = missingPersonArr.first()
    track_history = TrackHistory.objects.filter(missing_person=missingPerson)
    
    last_track = track_history.order_by("-time_of_tracking").first()
    time_then = last_track.time_of_tracking
    return (time_now_aware - time_then).total_seconds()/60