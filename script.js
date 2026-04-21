const apiKey = "47f9b9125dd9a353b11772ac2a56e2fb";

// Search by city
function searchWeather() {
    const city = document.getElementById("searchBox").value;

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "404") {
                document.getElementById("condition").innerText = "City not found ❌";
                return;
            }

            document.getElementById("city").innerText = data.name;
            document.getElementById("temp").innerText = Math.round(data.main.temp) + "°C";
            document.getElementById("condition").innerText = data.weather[0].main;
        })
        .catch(() => {
            document.getElementById("condition").innerText = "Error fetching data ❌";
        });
}