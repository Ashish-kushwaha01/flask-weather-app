from flask import Flask, render_template, request,jsonify
import requests

import os

app = Flask(__name__)

API_KEY = os.environ.get("WEATHER_API_KEY")


app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def home():
    return render_template('index.html')
    
@app.route("/api/weather")
def weather_api():
    city = request.args.get("city")

    if not city:
        return jsonify({"error": "City is required"})

    url = f"https://api.openweathermap.org/data/2.5/forecast?q={city}&appid={API_KEY}&units=metric"

    try:
        response = requests.get(url, timeout=5)
        data = response.json()
        print(data)  # DEBUG
    except requests.exceptions.RequestException:
        return jsonify({"error": "Weather service unavailable"})

    if str(data.get("cod")) != "200":
        return jsonify({"error": data.get("message", "City not found")})

    current_item = data["list"][0]

    current = {
        "city": data["city"]["name"],
        "temp": current_item["main"]["temp"],
        "desc": current_item["weather"][0]["description"],
        "icon": current_item["weather"][0]["icon"],
        "humidity": current_item["main"]["humidity"],
        "wind": current_item["wind"]["speed"]
    }

    forecast = []
    for item in data["list"]:
        if "12:00:00" in item["dt_txt"]:
            forecast.append({
            "date": item["dt_txt"].split(" ")[0],
            "temp": item["main"]["temp"],
            "icon": item["weather"][0]["icon"],
            "desc": item["weather"][0]["description"],
            "humidity": item["main"]["humidity"],
            "wind": item["wind"]["speed"]
            })


    return jsonify({"current": current, "forecast": forecast})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
