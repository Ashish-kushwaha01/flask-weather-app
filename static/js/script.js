const weatherDiv = document.getElementById("weather");
const forecastDiv = document.getElementById("forecast");
const errorDiv = document.getElementById("error");
const loadingDiv = document.getElementById("loading");

let forecastData = [];


let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

/* ---------------- WEATHER FETCH ---------------- */

function getWeather() {
    const city = document.getElementById("city").value.trim();
    if (!city) return;

    errorDiv.innerText = "";
    weatherDiv.innerHTML = "";
    forecastDiv.innerHTML = "";
    loadingDiv.style.display = "block";

    fetch(`/api/weather?city=${city}`)
        .then(res => res.json())
        .then(data => {
            loadingDiv.style.display = "none";

            if (data.error) {
                errorDiv.innerText = data.error;
                return;
            }

            forecastData = data.forecast;
renderForecast(forecastData);


            renderWeather(data.current);
            renderForecast(data.forecast);
            setBackground(data.current.desc);
        })
        .catch(() => {
            loadingDiv.style.display = "none";
            errorDiv.innerText = "Something went wrong";
        });
}

/* ---------------- CURRENT WEATHER ---------------- */

function renderWeather(w) {
    weatherDiv.innerHTML = `
        <h3>${w.city}</h3>
        <p>🌡 ${w.temp} °C</p>
        <p>🌥 ${w.desc}</p>
        <p>💧 Humidity: ${w.humidity}%</p>
        <p>💨 Wind: ${w.wind} m/s</p>
    `;
}

/* ---------------- FORECAST ---------------- */

function renderForecast(days) {
    let html = "<h4>5-Day Forecast</h4><div class='forecast-container'>";

    days.forEach((day, index) => {
        html += `
            <div class="forecast-card" onclick="showForecastDetail(${index})">
                <p>${day.date}</p>
                <img src="https://openweathermap.org/img/wn/${day.icon}.png">
                <p>${day.temp} °C</p>
            </div>
        `;
    });

    html += "</div>";
    forecastDiv.innerHTML = html;
}


function showForecastDetail(index) {
    const day = forecastData[index];

    const detailHTML = `
        <h3>${day.date}</h3>
        <p>🌡 Temperature: ${day.temp} °C</p>
        <p>🌥 Weather: ${day.desc}</p>
        <p>💧 Humidity: ${day.humidity}%</p>
        <p>💨 Wind: ${day.wind} m/s</p>
    `;

    weatherDiv.innerHTML = detailHTML;
}


/* ---------------- BACKGROUND ---------------- */

function setBackground(desc) {
    desc = desc.toLowerCase();

    if (desc.includes("rain")) {
        document.body.style.background = "linear-gradient(135deg, #4b79a1, #283e51)";
    } else if (desc.includes("cloud")) {
        document.body.style.background = "linear-gradient(135deg, #bdc3c7, #2c3e50)";
    } else if (desc.includes("clear")) {
        document.body.style.background = "linear-gradient(135deg, #56ccf2, #2f80ed)";
    } else {
        document.body.style.background = "linear-gradient(135deg, #74ebd5, #ACB6E5)";
    }
}

/* ---------------- FAVORITES ---------------- */

function addFavorite() {
    const city = document.getElementById("city").value.trim();
    if (!city || favorites.includes(city)) return;

    favorites.push(city);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    showFavorites();
}

function showFavorites() {
    let html = "<h4>⭐ Favorites</h4>";

    if (favorites.length === 0) {
        html += "<p>No favorites yet</p>";
    }

    favorites.forEach((city, index) => {
        html += `
            <div class="favorite-item">
                <span onclick="loadFav('${city}')">${city}</span>
                <button onclick="removeFavorite(${index})">❌</button>
            </div>
        `;
    });

    document.getElementById("favorites").innerHTML = html;
}

function removeFavorite(index) {
    favorites.splice(index, 1);   // remove 1 item at index
    localStorage.setItem("favorites", JSON.stringify(favorites));
    showFavorites();
}


function loadFav(city) {
    document.getElementById("city").value = city;
    getWeather();
}

showFavorites();

/* ---------------- DARK MODE ---------------- */

function toggleDark() {
    document.body.classList.toggle("dark");
    localStorage.setItem("dark", document.body.classList.contains("dark"));
}

if (localStorage.getItem("dark") === "true") {
    document.body.classList.add("dark");
}
