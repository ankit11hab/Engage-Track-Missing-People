# slipStream - Engage

slipStream is an engine to track missing people using face recognition. This web application is built keeping in mind that it will primarily be used by the police to track criminals or other missing persons through CCTV cameras that are installed in crowded places. Everyone can, however, view the list of missing persons and the statistics from the portal but the feature to perform CRUD operations on missing persons in the database can only be accessed by authenticated police stations.

NOTE: For demonstration purpose, I have used webcam instead of realtime CCTV cameras


## Tech stacks used:
- React
- Django
- Django Rest Framework

## Release
The website is currently hosted on AWS. Feel free to explore the application [here](http://ankit-guha.me). In case you are unable to access the website, please go through the installation guide to test the code locally in your system.

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
$ type nul > .env
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
Now run the project using the following command. Make sure that the server is running on port:8000 only, else the frontend will not be able to call the backend APIs.
```
$ python manage.py runserver 127.0.0.1:8000  --insecure
```
## Usage Guide
Let's have a brief walkthrough of the application. Starting with the dashboard, this is how the website looks.
#### Dashboard Page
Here you will find some statistics about the total number of persons enlisted, tracked and found along with a daywise distribution plot. You will also find here informations about the number of police stations, number of active cameras, number of pictures captured so far, etc. Let's visit the Missing People page from the navbar.

| Dashboard Page     | 
| :---:        |   
| ![image](https://github.com/ankit11hab/Engage-Track-Missing-People/blob/master/screenshots/dashboard.jpg)      |

#### Missing People Page
Here you will find the list of missing persons. You can also filter them from the dropdown at the top. The dropdown has 5 options: All, Tracked, Found, Criminal, Non-criminal. Also, please note that "a person has been tracked" means he or she has been captured and recognized by a camera. For viewing a person's information, we need to visit the "View details" link present on the card of each person.

| Missing People Page     | Filtering |
| :---:        |    :----:   |
| ![image]()      |![image]()    | 

#### View Details Page
Here you will find the details of the missing person, his track history and the details of the police station that has enlisted this person into the database. These are the pages we can access without logging in (The edit and the delete icons will not be accessible unless we log in).

| View Details Page     | 
| :---:        |   
| ![image]()      |

#### Login Modal
We have the login option at the right hand side of the header. For logging in, we need Police station UID and the password. Note the changes we get after login. The "Add Missing Person" and the "Monitoring" links are accessible now!
| Login Modal     | After Login |
| :---:       |    :----:   |
| ![image]()      |![image]()    | 

The edit, delete and the add track history links in the view details page will also be accessible now.
| Edit Person Details     | Add Track History |
| :---:        |    :----:   |
| ![image]()      |![image]()    | 

#### Add Missing Person Page
Here you can enlist a new missing person to the database. You can also keep a note of the person's history and add it to database.
| Add Missing Person Page     | 
| :---:        |   
| ![image]()      |

#### Monitoring Page
Finally, we come to the page where you can connect to a camera and deploy it to track people using face-recognition.

| Monitoring Page    | Live Monitoring |
| :---:        |    :----:   |
| ![image]()      |![image]()    | 

#### Notification Popup

Once the server recognizes someone who is there in the database, the police station that added the person will get notified along with the link of the track history of the person.

| Notification Popup     | 
| :---:        |   
| ![image]()      |

## Demonstration video
Here is the demonstration video for this project: 
[Video] ()

