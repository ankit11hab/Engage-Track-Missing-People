# slipStream - Engage

slipStream is an engine to track missing people using face recognition. This web application is built keeping in mind that it will primarily be used by the police to track criminals or other missing persons through CCTV cameras that are installed in crowded places. Everyone can, however, view the list of missing persons and the statistics from the portal but the feature to perform CRUD operations on missing persons in the database can only be accessed by authenticated police stations.

NOTE: For demonstration purpose, I have used webcam instead of realtime CCTV cameras


#### Tech stacks used:
- React
- Django
- Django Rest Framework

## Release
The website is currently hosted on AWS. Feel free to explore the application here. In case you are unable to access the website, please go through the installation guide to test the code locally in your system.

## Installation Guide

Basic requirements: Python 3.10 or higher

#### Clone the repository

```
$ git clone https://github.com/ankit11hab/Engage-Track-Missing-People
$ cd Engage-Track-Missing-People/backend
```

#### Install dependencies
```
$ pip install -r requirements.txt
```
#### Setting up environment variables
Create a .env file in the current directory or paste the following command in your terminal if you are in Windows:
```javascript
$ type nul > filename.txt
```
If you are in linux, type the following command:
```javascript
touch .env
```
Copy this credential structure attached below and paste it in the .env file which you just created. Fill your respective credentials and save it.
```javascript
SECRET_KEY = 'django-insecure-)2!=#+u=&x=u^&@-((6a37_@f6_raf6jep&-k%+rr!27)b*$(-'
AUTOCOMPLETE_API_KEY = ''
AWS_ACCESS_KEY_ID = ''
AWS_SECRET_ACCESS_KEY = ''
AWS_STORAGE_BUCKET_NAME = 'engagebucketankit'
AWS_S3_FILE_OVERWRITE = False
AWS_DEFAULT_ACL = ''
DEFAULT_FILE_STORAGE = ''
STATICFILES_STORAGE = ''
AWS_S3_REGION_NAME = ''
AWS_S3_ADDRESSING_STYLE = ''
AWS_S3_SIGNATURE_VERSION = ''
```

#### Running the project
```
$ python manage.py runserver 127.0.0.1:8000  --insecure
```
## Demonstration video
Here is the demonstration video for this project: 
[Video] ()
## Some screenshots
| Authentication Page     | Dashboard Page |
| :---        |    :----:   |
| ![image](https://res.cloudinary.com/dmcbeyvr4/image/upload/v1635179135/buildathon/image_2021-10-25_21-49-44_uofnpn.png)      |![image](https://res.cloudinary.com/dmcbeyvr4/image/upload/v1635179677/buildathon/image_2021-10-25_22-04-19_xkp2uu.png)    | 

| All Triggers     | Adding Triggers |
| :---        |    :----:   |
| ![image](https://res.cloudinary.com/dmcbeyvr4/image/upload/v1635179763/buildathon/image_2021-10-25_22-05-29_iyltdb.png)       | ![image](https://res.cloudinary.com/dmcbeyvr4/image/upload/v1635179884/buildathon/image_2021-10-25_22-06-35_posihi.png)

| Uploading CSV     | Notification History |
| :---        |    :----:   |
| ![image](https://res.cloudinary.com/dmcbeyvr4/image/upload/v1635180585/buildathon/image_2021-10-25_22-19-05_mztkdv.png)       | ![image](https://res.cloudinary.com/dmcbeyvr4/image/upload/v1635180625/buildathon/image_2021-10-25_22-19-17_bwsh5k.png)
