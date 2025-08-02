const form = document.getElementById("weather-form");
const cityInput = document.getElementById("city-input");
const useLocationBtn = document.getElementById("use-location");
const outputDiv = document.getElementById("weather-output");

// 🔐 Replace this with your actual API key
const API_KEY = "f9a7287f2ba7d123f4b0546d311f90e7"; // ← Add your OpenWeatherMap API key here

// 📍 Submit: Search by city name
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();

  if (!API_KEY) {
    outputDiv.innerHTML = `<p>⚠️ Please add your API key in <code>script.js</code>.</p>`;
    return;
  }

  if (city) {
    fetchWeatherByCity(city);
  } else {
    outputDiv.innerHTML = `<p>📢 Please enter a city name!</p>`;
  }
});

// 📌 Get weather by geolocation
useLocationBtn.addEventListener("click", () => {
  if (!API_KEY) {
    outputDiv.innerHTML = `<p>⚠️ Please add your API key in <code>script.js</code>.</p>`;
    return;
  }

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoords(latitude, longitude);
      },
      () => {
        outputDiv.innerHTML = `<p>❌ Location permission denied.</p>`;
      }
    );
  } else {
    outputDiv.innerHTML = `<p>🚫 Your browser doesn't support location.</p>`;
  }
});

// 🌆 Fetch weather by city name
function fetchWeatherByCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
  fetchWeather(url);
}

// 🌍 Fetch weather by coordinates
function fetchWeatherByCoords(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  fetchWeather(url);
}

// 🔁 Universal fetch function
function fetchWeather(url) {
  outputDiv.innerHTML = `<p>🌐 Fetching weather data...</p>`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data?.cod === 200) {
        const weatherHTML = `
          <div class="info-block">
            <h2>${data.name}, ${data.sys?.country}</h2>
            <p>🌡️ Temperature: <strong>${data.main?.temp}°C</strong></p>
            <p>🌤️ Condition: ${data.weather?.[0]?.main} (${data.weather?.[0]?.description})</p>
            <p>💧 Humidity: ${data.main?.humidity}%</p>
            <p>🌬️ Wind Speed: ${data.wind?.speed} m/s</p>
          </div>
        `;
        outputDiv.innerHTML = weatherHTML;
      } else {
        outputDiv.innerHTML = `<p>❌ ${data?.message || "City not found."}</p>`;
      }
    })
    .catch(() => {
      outputDiv.innerHTML = `<p>⚠️ Could not fetch data. Please try again later.</p>`;
    });
}
