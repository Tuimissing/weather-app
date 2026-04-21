const apiKey = "47f9b9125dd9a353b11772ac2a56e2fb";

// 📍 AUTO DETECT LOCATION ON LOAD
window.onload = () => {
    navigator.geolocation.getCurrentPosition(success, error);
};

function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    getWeatherByCoords(lat, lon);
}

function error() {
    document.getElementById("condition").innerText = "Location denied ❌";
}

// 🌍 FETCH USING COORDINATES
function getWeatherByCoords(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(res => res.json())
        .then(updateUI)
        .catch(() => {
            document.getElementById("condition").innerText = "Error ❌";
        });
}

// 🔍 SEARCH BY CITY
function searchWeather() {
    const city = document.getElementById("searchBox").value;

    if (!city) {
        alert("Enter a city name");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.cod === "404") {
                document.getElementById("condition").innerText = "City not found ❌";
                return;
            }
            updateUI(data);
        })
        .catch(() => {
            document.getElementById("condition").innerText = "Error ❌";
        });
}

// 🎨 UPDATE UI + ICON
function updateUI(data) {
    document.getElementById("city").innerText = data.name;
    document.getElementById("temp").innerText = Math.round(data.main.temp) + "°C";
    document.getElementById("condition").innerText = data.weather[0].main;

    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    document.getElementById("icon").src = iconUrl;
}

// ⌨️ ENTER KEY SUPPORT
document.getElementById("searchBox").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        searchWeather();
    }
});