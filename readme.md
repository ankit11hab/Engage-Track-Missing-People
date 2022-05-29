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
| ![image](https://engagebucketankit.s3.ap-south-1.amazonaws.com/screenshots/dashboard.jpg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAQaCmFwLXNvdXRoLTEiRzBFAiBOOUPJqel38MA89fo0pla0mRpknrdeCNHY0FLrF6n44wIhAL9fuQ97NU%2FSczzLSnMOYvbVmeNPEktLFPeGcR9vq29ZKu0CCO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjY0NjM5NzgyNDkwIgx5p7F3w0dYQoMrnNAqwQJxRHltzosbqAAx8EfW5e9w%2F%2Fi8GUIEXJvHP8fXYJqXP5GYiLWU7Mr8JFIStphUzO6Ji2QFfdZDAA1s25aOwAtXV9Hkqta7QkAgrXuRbr8emR8JLwJj81ZCwCxIT5IZGbX2lQX2XUwKSJWl2V08KZf7s5W6EDE9M7Ngzp07keJUW1AiOdGNSBiHFHq2ZPywHa2IRcFf9g8KpR38Lk2h36C%2FQKNr%2BfNLoabSJJr1231WIWSzQROfaGyD%2FFLb%2FxjANWsuo5mS2e4Kphs9sHAdLwuAja0EunliNIgO%2F8dG5MrvFC1CiO%2F6%2FRO1zu4CabwL0EGOZBroJQLRmhLIB3O1BKwabTYyIEA0v%2FR%2F%2FLAmr2oTlqTvcLvtdJflo%2FDOppjQYkeJ%2Foy6Xd0qpp1D8jTveYJZuJKNw9PZ0A%2BP%2FdrY5j9eREcwyJXMlAY6swKsI9Sra0V8arSdZzIlkgrwFJosp%2Fmm7ho%2BvxQ%2BaGab1NnmMgEr6lE8Cprtjriwviec5ZwR36XfMHLLKkrVyDcy%2BpvgE2RvJSawQE0qWlp3P0pWoT4KMdt5Sa4UC%2FM5eNtCBbrIcMEex7jdgfJgTX6mJ5oThlKp1jIyhrZfZJXjPyQd7sOoN8FikMqpAAg06xDhdkQRC%2FQ9KWlJFJKsIUYdVwpDL2lKpCEE6D5MNOmGeelQbAvgy6FSf7277C%2BTpnwOCxPbrFQ7yvdld%2FMAK1M%2FhbETyeMaNaDbT40GDVptn2oai2%2FgQTBlft6h2Av8Lm0gGOHngHWqOBTPnep%2BKocGR8Fxjisd5h72e53Qlsb%2FIrzQWJlVLrWVO9HInS%2FA%2Fs9WNmkx02WRzk7M7HQhAsCGNVHQ&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220529T114309Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAZVP46HZNMFBQR76R%2F20220529%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=422de45dff6cccc2b3a1b857d30dcc4d1f9e9c4a62a9f0cd4dd114e7f1b765a2)      |

#### Missing People Page
Here you will find the list of missing persons. You can also filter them from the dropdown at the top. The dropdown has 5 options: All, Tracked, Found, Criminal, Non-criminal. Also, please note that "a person has been tracked" means he or she has been captured and recognized by a camera. For viewing a person's information, we need to visit the "View details" link present on the card of each person.

| Missing People Page     | Filtering |
| :---:        |    :----:   |
| ![image](https://engagebucketankit.s3.ap-south-1.amazonaws.com/screenshots/missingpeoplelist.jpg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAQaCmFwLXNvdXRoLTEiRzBFAiBOOUPJqel38MA89fo0pla0mRpknrdeCNHY0FLrF6n44wIhAL9fuQ97NU%2FSczzLSnMOYvbVmeNPEktLFPeGcR9vq29ZKu0CCO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjY0NjM5NzgyNDkwIgx5p7F3w0dYQoMrnNAqwQJxRHltzosbqAAx8EfW5e9w%2F%2Fi8GUIEXJvHP8fXYJqXP5GYiLWU7Mr8JFIStphUzO6Ji2QFfdZDAA1s25aOwAtXV9Hkqta7QkAgrXuRbr8emR8JLwJj81ZCwCxIT5IZGbX2lQX2XUwKSJWl2V08KZf7s5W6EDE9M7Ngzp07keJUW1AiOdGNSBiHFHq2ZPywHa2IRcFf9g8KpR38Lk2h36C%2FQKNr%2BfNLoabSJJr1231WIWSzQROfaGyD%2FFLb%2FxjANWsuo5mS2e4Kphs9sHAdLwuAja0EunliNIgO%2F8dG5MrvFC1CiO%2F6%2FRO1zu4CabwL0EGOZBroJQLRmhLIB3O1BKwabTYyIEA0v%2FR%2F%2FLAmr2oTlqTvcLvtdJflo%2FDOppjQYkeJ%2Foy6Xd0qpp1D8jTveYJZuJKNw9PZ0A%2BP%2FdrY5j9eREcwyJXMlAY6swKsI9Sra0V8arSdZzIlkgrwFJosp%2Fmm7ho%2BvxQ%2BaGab1NnmMgEr6lE8Cprtjriwviec5ZwR36XfMHLLKkrVyDcy%2BpvgE2RvJSawQE0qWlp3P0pWoT4KMdt5Sa4UC%2FM5eNtCBbrIcMEex7jdgfJgTX6mJ5oThlKp1jIyhrZfZJXjPyQd7sOoN8FikMqpAAg06xDhdkQRC%2FQ9KWlJFJKsIUYdVwpDL2lKpCEE6D5MNOmGeelQbAvgy6FSf7277C%2BTpnwOCxPbrFQ7yvdld%2FMAK1M%2FhbETyeMaNaDbT40GDVptn2oai2%2FgQTBlft6h2Av8Lm0gGOHngHWqOBTPnep%2BKocGR8Fxjisd5h72e53Qlsb%2FIrzQWJlVLrWVO9HInS%2FA%2Fs9WNmkx02WRzk7M7HQhAsCGNVHQ&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220529T115214Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAZVP46HZNMFBQR76R%2F20220529%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=71414af869beb4af973d44d5d919c23c2bb05f19c59ffa2f1dcd911837fa9ab1)      |![image](https://engagebucketankit.s3.ap-south-1.amazonaws.com/screenshots/filteredoutmissingpeople.jpg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAQaCmFwLXNvdXRoLTEiRzBFAiBOOUPJqel38MA89fo0pla0mRpknrdeCNHY0FLrF6n44wIhAL9fuQ97NU%2FSczzLSnMOYvbVmeNPEktLFPeGcR9vq29ZKu0CCO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjY0NjM5NzgyNDkwIgx5p7F3w0dYQoMrnNAqwQJxRHltzosbqAAx8EfW5e9w%2F%2Fi8GUIEXJvHP8fXYJqXP5GYiLWU7Mr8JFIStphUzO6Ji2QFfdZDAA1s25aOwAtXV9Hkqta7QkAgrXuRbr8emR8JLwJj81ZCwCxIT5IZGbX2lQX2XUwKSJWl2V08KZf7s5W6EDE9M7Ngzp07keJUW1AiOdGNSBiHFHq2ZPywHa2IRcFf9g8KpR38Lk2h36C%2FQKNr%2BfNLoabSJJr1231WIWSzQROfaGyD%2FFLb%2FxjANWsuo5mS2e4Kphs9sHAdLwuAja0EunliNIgO%2F8dG5MrvFC1CiO%2F6%2FRO1zu4CabwL0EGOZBroJQLRmhLIB3O1BKwabTYyIEA0v%2FR%2F%2FLAmr2oTlqTvcLvtdJflo%2FDOppjQYkeJ%2Foy6Xd0qpp1D8jTveYJZuJKNw9PZ0A%2BP%2FdrY5j9eREcwyJXMlAY6swKsI9Sra0V8arSdZzIlkgrwFJosp%2Fmm7ho%2BvxQ%2BaGab1NnmMgEr6lE8Cprtjriwviec5ZwR36XfMHLLKkrVyDcy%2BpvgE2RvJSawQE0qWlp3P0pWoT4KMdt5Sa4UC%2FM5eNtCBbrIcMEex7jdgfJgTX6mJ5oThlKp1jIyhrZfZJXjPyQd7sOoN8FikMqpAAg06xDhdkQRC%2FQ9KWlJFJKsIUYdVwpDL2lKpCEE6D5MNOmGeelQbAvgy6FSf7277C%2BTpnwOCxPbrFQ7yvdld%2FMAK1M%2FhbETyeMaNaDbT40GDVptn2oai2%2FgQTBlft6h2Av8Lm0gGOHngHWqOBTPnep%2BKocGR8Fxjisd5h72e53Qlsb%2FIrzQWJlVLrWVO9HInS%2FA%2Fs9WNmkx02WRzk7M7HQhAsCGNVHQ&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220529T115241Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAZVP46HZNMFBQR76R%2F20220529%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=33643825bd8b73c85a9237fd98cf30dac8fca07b504826f131d24d6e76a96d1f)    | 

#### View Details Page
Here you will find the details of the missing person, his track history and the details of the police station that has enlisted this person into the database. These are the pages we can access without logging in (The edit and the delete icons will not be accessible unless we log in).

| View Details Page     | 
| :---:        |   
| ![image](https://engagebucketankit.s3.ap-south-1.amazonaws.com/screenshots/persondetails.jpg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAQaCmFwLXNvdXRoLTEiRzBFAiBOOUPJqel38MA89fo0pla0mRpknrdeCNHY0FLrF6n44wIhAL9fuQ97NU%2FSczzLSnMOYvbVmeNPEktLFPeGcR9vq29ZKu0CCO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjY0NjM5NzgyNDkwIgx5p7F3w0dYQoMrnNAqwQJxRHltzosbqAAx8EfW5e9w%2F%2Fi8GUIEXJvHP8fXYJqXP5GYiLWU7Mr8JFIStphUzO6Ji2QFfdZDAA1s25aOwAtXV9Hkqta7QkAgrXuRbr8emR8JLwJj81ZCwCxIT5IZGbX2lQX2XUwKSJWl2V08KZf7s5W6EDE9M7Ngzp07keJUW1AiOdGNSBiHFHq2ZPywHa2IRcFf9g8KpR38Lk2h36C%2FQKNr%2BfNLoabSJJr1231WIWSzQROfaGyD%2FFLb%2FxjANWsuo5mS2e4Kphs9sHAdLwuAja0EunliNIgO%2F8dG5MrvFC1CiO%2F6%2FRO1zu4CabwL0EGOZBroJQLRmhLIB3O1BKwabTYyIEA0v%2FR%2F%2FLAmr2oTlqTvcLvtdJflo%2FDOppjQYkeJ%2Foy6Xd0qpp1D8jTveYJZuJKNw9PZ0A%2BP%2FdrY5j9eREcwyJXMlAY6swKsI9Sra0V8arSdZzIlkgrwFJosp%2Fmm7ho%2BvxQ%2BaGab1NnmMgEr6lE8Cprtjriwviec5ZwR36XfMHLLKkrVyDcy%2BpvgE2RvJSawQE0qWlp3P0pWoT4KMdt5Sa4UC%2FM5eNtCBbrIcMEex7jdgfJgTX6mJ5oThlKp1jIyhrZfZJXjPyQd7sOoN8FikMqpAAg06xDhdkQRC%2FQ9KWlJFJKsIUYdVwpDL2lKpCEE6D5MNOmGeelQbAvgy6FSf7277C%2BTpnwOCxPbrFQ7yvdld%2FMAK1M%2FhbETyeMaNaDbT40GDVptn2oai2%2FgQTBlft6h2Av8Lm0gGOHngHWqOBTPnep%2BKocGR8Fxjisd5h72e53Qlsb%2FIrzQWJlVLrWVO9HInS%2FA%2Fs9WNmkx02WRzk7M7HQhAsCGNVHQ&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220529T120226Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAZVP46HZNMFBQR76R%2F20220529%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=c46d455c677b495b00ee23845a10031e287500fd7eaa4c73b9e2cb6a0f266f0f)      |

#### Login Modal
We have the login option at the right hand side of the header. For logging in, we need Police station UID and the password. Note the changes we get after login. The "Add Missing Person" and the "Monitoring" links are accessible now!
| Login Modal     | After Login |
| :---:       |    :----:   |
| ![image](https://engagebucketankit.s3.ap-south-1.amazonaws.com/screenshots/signin.jpg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAQaCmFwLXNvdXRoLTEiRzBFAiBOOUPJqel38MA89fo0pla0mRpknrdeCNHY0FLrF6n44wIhAL9fuQ97NU%2FSczzLSnMOYvbVmeNPEktLFPeGcR9vq29ZKu0CCO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjY0NjM5NzgyNDkwIgx5p7F3w0dYQoMrnNAqwQJxRHltzosbqAAx8EfW5e9w%2F%2Fi8GUIEXJvHP8fXYJqXP5GYiLWU7Mr8JFIStphUzO6Ji2QFfdZDAA1s25aOwAtXV9Hkqta7QkAgrXuRbr8emR8JLwJj81ZCwCxIT5IZGbX2lQX2XUwKSJWl2V08KZf7s5W6EDE9M7Ngzp07keJUW1AiOdGNSBiHFHq2ZPywHa2IRcFf9g8KpR38Lk2h36C%2FQKNr%2BfNLoabSJJr1231WIWSzQROfaGyD%2FFLb%2FxjANWsuo5mS2e4Kphs9sHAdLwuAja0EunliNIgO%2F8dG5MrvFC1CiO%2F6%2FRO1zu4CabwL0EGOZBroJQLRmhLIB3O1BKwabTYyIEA0v%2FR%2F%2FLAmr2oTlqTvcLvtdJflo%2FDOppjQYkeJ%2Foy6Xd0qpp1D8jTveYJZuJKNw9PZ0A%2BP%2FdrY5j9eREcwyJXMlAY6swKsI9Sra0V8arSdZzIlkgrwFJosp%2Fmm7ho%2BvxQ%2BaGab1NnmMgEr6lE8Cprtjriwviec5ZwR36XfMHLLKkrVyDcy%2BpvgE2RvJSawQE0qWlp3P0pWoT4KMdt5Sa4UC%2FM5eNtCBbrIcMEex7jdgfJgTX6mJ5oThlKp1jIyhrZfZJXjPyQd7sOoN8FikMqpAAg06xDhdkQRC%2FQ9KWlJFJKsIUYdVwpDL2lKpCEE6D5MNOmGeelQbAvgy6FSf7277C%2BTpnwOCxPbrFQ7yvdld%2FMAK1M%2FhbETyeMaNaDbT40GDVptn2oai2%2FgQTBlft6h2Av8Lm0gGOHngHWqOBTPnep%2BKocGR8Fxjisd5h72e53Qlsb%2FIrzQWJlVLrWVO9HInS%2FA%2Fs9WNmkx02WRzk7M7HQhAsCGNVHQ&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220529T120526Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAZVP46HZNMFBQR76R%2F20220529%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=570c5f9975594e34455858f332215fef9a7346b35268a35685897ae943bd179a)      |![image](https://engagebucketankit.s3.ap-south-1.amazonaws.com/screenshots/signedin.jpg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAQaCmFwLXNvdXRoLTEiRzBFAiBOOUPJqel38MA89fo0pla0mRpknrdeCNHY0FLrF6n44wIhAL9fuQ97NU%2FSczzLSnMOYvbVmeNPEktLFPeGcR9vq29ZKu0CCO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjY0NjM5NzgyNDkwIgx5p7F3w0dYQoMrnNAqwQJxRHltzosbqAAx8EfW5e9w%2F%2Fi8GUIEXJvHP8fXYJqXP5GYiLWU7Mr8JFIStphUzO6Ji2QFfdZDAA1s25aOwAtXV9Hkqta7QkAgrXuRbr8emR8JLwJj81ZCwCxIT5IZGbX2lQX2XUwKSJWl2V08KZf7s5W6EDE9M7Ngzp07keJUW1AiOdGNSBiHFHq2ZPywHa2IRcFf9g8KpR38Lk2h36C%2FQKNr%2BfNLoabSJJr1231WIWSzQROfaGyD%2FFLb%2FxjANWsuo5mS2e4Kphs9sHAdLwuAja0EunliNIgO%2F8dG5MrvFC1CiO%2F6%2FRO1zu4CabwL0EGOZBroJQLRmhLIB3O1BKwabTYyIEA0v%2FR%2F%2FLAmr2oTlqTvcLvtdJflo%2FDOppjQYkeJ%2Foy6Xd0qpp1D8jTveYJZuJKNw9PZ0A%2BP%2FdrY5j9eREcwyJXMlAY6swKsI9Sra0V8arSdZzIlkgrwFJosp%2Fmm7ho%2BvxQ%2BaGab1NnmMgEr6lE8Cprtjriwviec5ZwR36XfMHLLKkrVyDcy%2BpvgE2RvJSawQE0qWlp3P0pWoT4KMdt5Sa4UC%2FM5eNtCBbrIcMEex7jdgfJgTX6mJ5oThlKp1jIyhrZfZJXjPyQd7sOoN8FikMqpAAg06xDhdkQRC%2FQ9KWlJFJKsIUYdVwpDL2lKpCEE6D5MNOmGeelQbAvgy6FSf7277C%2BTpnwOCxPbrFQ7yvdld%2FMAK1M%2FhbETyeMaNaDbT40GDVptn2oai2%2FgQTBlft6h2Av8Lm0gGOHngHWqOBTPnep%2BKocGR8Fxjisd5h72e53Qlsb%2FIrzQWJlVLrWVO9HInS%2FA%2Fs9WNmkx02WRzk7M7HQhAsCGNVHQ&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220529T120717Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAZVP46HZNMFBQR76R%2F20220529%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=6037133718f00acf7ff753fbb1762abea65976bdc2d9a9709cec2137b75125f2)    | 

The edit, delete and the add track history links in the view details page will also be accessible now.
| Edit Person Details     | Add Track History |
| :---:        |    :----:   |
| ![image](https://engagebucketankit.s3.ap-south-1.amazonaws.com/screenshots/editperson.jpg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAQaCmFwLXNvdXRoLTEiRzBFAiBOOUPJqel38MA89fo0pla0mRpknrdeCNHY0FLrF6n44wIhAL9fuQ97NU%2FSczzLSnMOYvbVmeNPEktLFPeGcR9vq29ZKu0CCO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjY0NjM5NzgyNDkwIgx5p7F3w0dYQoMrnNAqwQJxRHltzosbqAAx8EfW5e9w%2F%2Fi8GUIEXJvHP8fXYJqXP5GYiLWU7Mr8JFIStphUzO6Ji2QFfdZDAA1s25aOwAtXV9Hkqta7QkAgrXuRbr8emR8JLwJj81ZCwCxIT5IZGbX2lQX2XUwKSJWl2V08KZf7s5W6EDE9M7Ngzp07keJUW1AiOdGNSBiHFHq2ZPywHa2IRcFf9g8KpR38Lk2h36C%2FQKNr%2BfNLoabSJJr1231WIWSzQROfaGyD%2FFLb%2FxjANWsuo5mS2e4Kphs9sHAdLwuAja0EunliNIgO%2F8dG5MrvFC1CiO%2F6%2FRO1zu4CabwL0EGOZBroJQLRmhLIB3O1BKwabTYyIEA0v%2FR%2F%2FLAmr2oTlqTvcLvtdJflo%2FDOppjQYkeJ%2Foy6Xd0qpp1D8jTveYJZuJKNw9PZ0A%2BP%2FdrY5j9eREcwyJXMlAY6swKsI9Sra0V8arSdZzIlkgrwFJosp%2Fmm7ho%2BvxQ%2BaGab1NnmMgEr6lE8Cprtjriwviec5ZwR36XfMHLLKkrVyDcy%2BpvgE2RvJSawQE0qWlp3P0pWoT4KMdt5Sa4UC%2FM5eNtCBbrIcMEex7jdgfJgTX6mJ5oThlKp1jIyhrZfZJXjPyQd7sOoN8FikMqpAAg06xDhdkQRC%2FQ9KWlJFJKsIUYdVwpDL2lKpCEE6D5MNOmGeelQbAvgy6FSf7277C%2BTpnwOCxPbrFQ7yvdld%2FMAK1M%2FhbETyeMaNaDbT40GDVptn2oai2%2FgQTBlft6h2Av8Lm0gGOHngHWqOBTPnep%2BKocGR8Fxjisd5h72e53Qlsb%2FIrzQWJlVLrWVO9HInS%2FA%2Fs9WNmkx02WRzk7M7HQhAsCGNVHQ&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220529T121000Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAZVP46HZNMFBQR76R%2F20220529%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=c6a8bfbbf3cf3499f8439a2652de565c40e3f84b42daeb8a07afc8e66bd1ea53)      |![image](https://engagebucketankit.s3.ap-south-1.amazonaws.com/screenshots/2022-05-29%20%281%29.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAQaCmFwLXNvdXRoLTEiRzBFAiBOOUPJqel38MA89fo0pla0mRpknrdeCNHY0FLrF6n44wIhAL9fuQ97NU%2FSczzLSnMOYvbVmeNPEktLFPeGcR9vq29ZKu0CCO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjY0NjM5NzgyNDkwIgx5p7F3w0dYQoMrnNAqwQJxRHltzosbqAAx8EfW5e9w%2F%2Fi8GUIEXJvHP8fXYJqXP5GYiLWU7Mr8JFIStphUzO6Ji2QFfdZDAA1s25aOwAtXV9Hkqta7QkAgrXuRbr8emR8JLwJj81ZCwCxIT5IZGbX2lQX2XUwKSJWl2V08KZf7s5W6EDE9M7Ngzp07keJUW1AiOdGNSBiHFHq2ZPywHa2IRcFf9g8KpR38Lk2h36C%2FQKNr%2BfNLoabSJJr1231WIWSzQROfaGyD%2FFLb%2FxjANWsuo5mS2e4Kphs9sHAdLwuAja0EunliNIgO%2F8dG5MrvFC1CiO%2F6%2FRO1zu4CabwL0EGOZBroJQLRmhLIB3O1BKwabTYyIEA0v%2FR%2F%2FLAmr2oTlqTvcLvtdJflo%2FDOppjQYkeJ%2Foy6Xd0qpp1D8jTveYJZuJKNw9PZ0A%2BP%2FdrY5j9eREcwyJXMlAY6swKsI9Sra0V8arSdZzIlkgrwFJosp%2Fmm7ho%2BvxQ%2BaGab1NnmMgEr6lE8Cprtjriwviec5ZwR36XfMHLLKkrVyDcy%2BpvgE2RvJSawQE0qWlp3P0pWoT4KMdt5Sa4UC%2FM5eNtCBbrIcMEex7jdgfJgTX6mJ5oThlKp1jIyhrZfZJXjPyQd7sOoN8FikMqpAAg06xDhdkQRC%2FQ9KWlJFJKsIUYdVwpDL2lKpCEE6D5MNOmGeelQbAvgy6FSf7277C%2BTpnwOCxPbrFQ7yvdld%2FMAK1M%2FhbETyeMaNaDbT40GDVptn2oai2%2FgQTBlft6h2Av8Lm0gGOHngHWqOBTPnep%2BKocGR8Fxjisd5h72e53Qlsb%2FIrzQWJlVLrWVO9HInS%2FA%2Fs9WNmkx02WRzk7M7HQhAsCGNVHQ&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220529T121316Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAZVP46HZNMFBQR76R%2F20220529%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=4cd11aa3acba9dcf6d9bde2d0f54980a0c09f9cdf65af0a7ef648e2518156e45)    | 

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
