from channels.generic.websocket import AsyncWebsocketConsumer
import json
import cv2
import PIL.Image as Image
import io
import numpy as np


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


    async def receive(self, bytes_data):
        img = Image.open(io.BytesIO(bytes_data))
        img.show()
        # nparr = np.fromstring(bytes_data, np.uint8).reshape( h, w, nb_planes )
        # img = cv2.imdecode(nparr, flags=1)
        # cv2.imwrite('./0.jpg', img)
        # img_np = cv2.imdecode(nparr, cv2.CV_LOAD_IMAGE_COLOR)
        # cv2.imshow("Image" ,img)

        #original_image = cv2.imread(img)
        #cv2.imshow("Image", img)

        # cv2.imshow("Image",bytes_data)

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'send.message',
                'message': self.channel_name
            }
        )



    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    
    # async def send_message(self, event):
    #     message = event['message']
    #     await self.send(text_data=json.dumps({
    #         'channel_name': message
    #     }))