# cs261


## Installation Instructions
prerequisite:
 - Python 3.6 or above
 - PIP (https://pip.pypa.io/en/stable/installing/)
 - Virtualenv (https://virtualenv.pypa.io/en/latest/installation.html <- requires PIP to install)
 - Node.js (https://nodejs.org/en/download/)
 
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
6) Build the front end
```
cd frontend/
npm install
npm run-script build
```
7) Start the development server
```
cd ..
cd backend/
python manage.py runserver
```
Then go to http://127.0.0.1:8000/ in your browser.
