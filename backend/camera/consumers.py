import datetime
from channels.generic.websocket import AsyncWebsocketConsumer
import json
import io
import cv2
import numpy as np
from .utils import createNotification, getTimeDiff
from missing_people.models import Notifications
from .models import CameraRecord
from missing_people.models import MissingPerson, TrackHistory
import base64
from asgiref.sync import sync_to_async
from missing_people.views import get_face_names_and_encodings
from PIL import Image
import uuid
from django.core.files.base import ContentFile


# @sync_to_async
# def save_image(channel_name, person_uuid):
#     print("Here")
#     time_now = datetime.datetime.now()
#     time_now_aware = time_now.astimezone()
#     missingPersonArr = MissingPerson.objects.filter(person_uuid=person_uuid)
#     missingPerson = missingPersonArr.first()
#     track_history = TrackHistory.objects.filter(missing_person=missingPerson)
    
#     last_track = track_history.order_by("-time_of_tracking").first()
#     time_then = last_track.time_of_tracking
#     time_diff = (time_now_aware - time_then).total_seconds()/60
#     if time_diff>5:
#         camera = CameraRecord.objects.get(channel_name=channel_name)
#         location = str(camera.location)
#         ps = camera.police_station
#         print(ps)



class CameraConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_group_name = 'CameraRoom'

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

        await self.send(text_data=json.dumps({
            'channel_name': self.channel_name
        }))


    async def receive(self, text_data):
        known_face_names, known_face_encodings, known_face_uuids, face_recognition = get_face_names_and_encodings()
        image = text_data  
        decoded_data = base64.b64decode(image)
        np_data = np.fromstring(decoded_data,np.uint8)
        original_image = image_to_recognize = cv2.imdecode(np_data,cv2.IMREAD_UNCHANGED)
        all_face_locations = face_recognition.face_locations(image_to_recognize,model="hog")
        all_face_encodings = face_recognition.face_encodings(image_to_recognize,all_face_locations)

        for current_face_location, current_face_encoding in zip(all_face_locations, all_face_encodings):
            top_pos,right_pos,bottom_pos,left_pos = current_face_location
            print("Top: {}, Right: {}, Bottom: {}, Left: {}".format(top_pos,right_pos,bottom_pos,left_pos))
            #current_face_image = image_to_detect[top_pos:bottom_pos,left_pos:right_pos]
            all_matches = face_recognition.compare_faces(known_face_encodings,current_face_encoding)
            name_of_person = "Unknown name"
            flag = 0
            person_uuid = ""
            if True in all_matches:
                first_match_index = all_matches.index(True)
                name_of_person = known_face_names[first_match_index]
                person_uuid = known_face_uuids[first_match_index]
                flag = 1

            cv2.rectangle(original_image, (left_pos-14, top_pos-14), (right_pos+14, bottom_pos+14), (0,0,255), 1)
            cv2.line(original_image, (left_pos-9, top_pos-9), (left_pos+9, top_pos-9), (0,0,255), 1)
            cv2.line(original_image, (left_pos-9, top_pos-9), (left_pos-9, top_pos+9), (0,0,255), 1)
            cv2.line(original_image, (right_pos-9, bottom_pos+9), (right_pos+9, bottom_pos+9), (0,0,255), 1)
            cv2.line(original_image, (right_pos+9, bottom_pos-9), (right_pos+9, bottom_pos+9), (0,0,255), 1)
            font = cv2.FONT_HERSHEY_DUPLEX
            cv2.putText(original_image,name_of_person,(left_pos,bottom_pos), font, 0.5, (0,0,255),1)
            if flag==1:
                time_diff = await sync_to_async(getTimeDiff)(person_uuid)
                print("Time", time_diff)
                if time_diff>5:
                    camera = await sync_to_async(CameraRecord.objects.get)(channel_name=self.channel_name)
                    location = str(camera.location)
                    await sync_to_async(print)(location)
                    # await sync_to_async(print)(location)
                    missingPersonArr = await sync_to_async(MissingPerson.objects.filter)(person_uuid=person_uuid)
                    missingPerson = await sync_to_async(missingPersonArr.first)()
                    _, im_arr = cv2.imencode('.jpg', original_image)  # im_arr: image in Numpy one-dim array format.
                    im_bytes = im_arr.tobytes()
                    im_b64 = base64.b64encode(im_bytes)
                    final_img = await sync_to_async(ContentFile)(base64.b64decode(im_b64), name=f'{str(uuid.uuid4())}.jpg')
                    await sync_to_async(print)(final_img)
                    await sync_to_async(TrackHistory(missing_person=missingPerson, location=location, image=final_img).save)()
                    await sync_to_async(createNotification)(missingPerson)


    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

        cameraRecord = await sync_to_async(CameraRecord.objects.get)(channel_name=self.channel_name)
        await sync_to_async(cameraRecord.delete)()

    
    # async def send_message(self, event):
    #     message = event['message']
    #     await self.send(text_data=json.dumps({
    #         'channel_name': message
    #     }))