# cs261


## Web Server Installation Instructions
prerequisite:
 - Python 3.6 or above
 - PIP (https://pip.pypa.io/en/stable/installing/)
 - Virtualenv (https://virtualenv.pypa.io/en/latest/installation.html <- require PIP to install)
 
Once you have these installed, clone the repository into a folder.

1) Navigate to this folder. 
2) Make sure that you are own your own development branch.
3) Create a virtual enviroment:
```
py -m venv env
```
4) Activate the virtual enviroment
```
On Windows:
./env/Scripts/activate.bat
```
5) Install the requirements
```
pip install -r requirements.txt
```
6) Start the development server
```
cd app/
python manage.py migrate
python manage.py runserver
```
Then go to http://127.0.0.1:8000/ in your browser.

## Populating the database with dummy data
1) Download and unzip the dummy data zip
2) Get the path of the folder e.g. C:\Users\maxwi\Downloads\cs261dummydata
3) Follow the step above but do not start the server
4) Enter the django shell
```
python manage.py shell
```
5) Inside the shell type the following:
```
from trades.load import load_data
load_data(":\\Users\\maxwi\\Downloads\\cs261dummydata") 
```
Make sure to add your own path instead of mine as the `load_data` param. Make sure to the escape the backspaces by using two \\.
Let the script run for about 10 minutes to get some trades into the db.
6) Exit the shell
```
exit()
```
