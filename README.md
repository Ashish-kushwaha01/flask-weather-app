# flask-weather-app

A responsive weather forecast web application built using Flask and the OpenWeather API.  
The application allows users to search for weather information by city, view current conditions, see a multi-day forecast, manage favorite cities, and use a dark mode interface.

Live Application URL  
https://flask-weather-app-e08t.onrender.com

---

## Features

- Search weather by city name
- Display current temperature, humidity, and wind speed
- Show five-day weather forecast
- Add and remove favorite cities
- Dark mode support
- AJAX-based updates without page reload
- Fully responsive for mobile, tablet, and desktop
- Secure API key handling using environment variables
- Deployed online with HTTPS

---

## Technology Stack

Frontend  
- HTML  
- CSS (responsive design)  
- JavaScript (AJAX using Fetch API)

Backend  
- Python  
- Flask

External API  
- OpenWeather API

Deployment  
- Render  
- Gunicorn

---

## Running the Project Locally
Step 1: Clone the repository
git clone https://github.com/Ashish-kushwaha01/flask-weather-app.git

cd flask-weather-app

Step 2: Install dependencies
(pip install -r requirements.txt)


Step 3: Set environment variable

Windows (Command Prompt)
set WEATHER_API_KEY=your_api_key_here


Step 4: Run the application
python app.py 


Step 5: Open in browser
http://127.0.0.1:5000

