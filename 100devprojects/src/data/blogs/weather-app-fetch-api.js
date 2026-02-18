// Blog Post: How to Build a Weather App in JavaScript (Fetch API Tutorial)
// Author: Ashwani
// Last Updated: 2026-02-18

export const weatherAppBlog = {
  id: 11,
  title: "How to Build a Weather App in JavaScript - Complete Fetch API Tutorial",
  slug: "how-to-build-weather-app-javascript-fetch-api",
  category: "Tutorial",
  author: "Ashwani",
  datePublished: "2026-02-18",
  readTime: "18 min read",

  meta: {
    title: "Build a Weather App in JavaScript | Fetch API Tutorial 2026",
    description:
      "Learn how to build a real-time Weather App using JavaScript and OpenWeather API. Master Fetch API, async/await, Geolocation API, and error handling with this step-by-step tutorial.",
    keywords: [
      "weather app javascript tutorial",
      "fetch api javascript tutorial",
      "openweather api javascript",
      "how to build weather app javascript",
      "javascript api project",
      "async await fetch api",
      "geolocation api javascript",
      "intermediate javascript project"
    ],
    canonicalUrl:
      "https://100devprojects.in/blog/how-to-build-weather-app-javascript-fetch-api"
  },

  excerpt:
    "Build a real-time Weather App with JavaScript from scratch. Learn the Fetch API, async/await error handling, Geolocation API, and how to integrate OpenWeatherMap in this complete step-by-step tutorial.",

  content: `
# How to Build a Weather App in JavaScript — Complete Fetch API Tutorial

If you've been writing JavaScript for a while and only built UI-based projects like calculators and todo apps, building a **Weather App** is the perfect next step. Why? Because it teaches you the single most important skill in modern web development — **talking to external APIs**.

Every real-world app — from Instagram to Zomato to Google Maps — fetches data from APIs. The sooner you get comfortable with this, the sooner you go from "beginner" to "intermediate" developer.

By the end of this tutorial, you'll build a fully functional Weather App that:
- Fetches live weather data from OpenWeatherMap API
- Uses **Fetch API** with **async/await**
- Gets the user's location via **Geolocation API**
- Handles errors gracefully
- Saves recent searches to **localStorage**
- Shows a 5-day forecast

Let's build it.

---

## What is an API? (Quick Refresher)

An **API (Application Programming Interface)** is a way for two programs to talk to each other. Think of it like ordering food at a restaurant:

- **You (your app)** = the customer
- **The menu** = API documentation (what you can order)
- **The waiter** = API (carries your request and brings back the response)
- **The kitchen** = the server (where data is actually processed)

When you ask for weather data, you send a **request** to the weather service's API, and it sends back a **response** with temperature, humidity, wind speed, etc.

---

## Step 0: Get Your Free API Key

Before writing any code, you need an API key from OpenWeatherMap.

1. Go to [openweathermap.org](https://openweathermap.org/)
2. Click **Sign Up** and create a free account
3. Go to **API Keys** tab in your dashboard
4. Copy your default API key

> **Note:** New API keys take ~2 hours to activate. Plan ahead!

The free tier allows **60 calls/minute** — more than enough for a portfolio project.

---

## Project Structure

\`\`\`
weather-app/
├── index.html
├── style.css
└── script.js
\`\`\`

---

## Step 1: HTML Structure

Let's build the skeleton first. Clean, semantic HTML:

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Weather App</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="app">

    <!-- Search Bar -->
    <div class="search-bar">
      <input
        type="text"
        id="cityInput"
        placeholder="Search city..."
        autocomplete="off"
      />
      <button id="searchBtn">Search</button>
      <button id="locationBtn" title="Use my location">📍</button>
    </div>

    <!-- Error Message -->
    <div class="error-msg hidden" id="errorMsg"></div>

    <!-- Loading Spinner -->
    <div class="loading hidden" id="loading">
      <div class="spinner"></div>
      <p>Fetching weather...</p>
    </div>

    <!-- Current Weather Card -->
    <div class="weather-card hidden" id="weatherCard">
      <div class="city-name" id="cityName"></div>
      <div class="weather-icon" id="weatherIcon"></div>
      <div class="temperature" id="temperature"></div>
      <div class="description" id="description"></div>

      <div class="details-grid">
        <div class="detail-item">
          <span class="label">Feels Like</span>
          <span class="value" id="feelsLike"></span>
        </div>
        <div class="detail-item">
          <span class="label">Humidity</span>
          <span class="value" id="humidity"></span>
        </div>
        <div class="detail-item">
          <span class="label">Wind Speed</span>
          <span class="value" id="windSpeed"></span>
        </div>
        <div class="detail-item">
          <span class="label">Visibility</span>
          <span class="value" id="visibility"></span>
        </div>
      </div>

      <!-- Temperature Toggle -->
      <button id="unitToggle">Switch to °F</button>
    </div>

    <!-- 5-Day Forecast -->
    <div class="forecast hidden" id="forecast">
      <h3>5-Day Forecast</h3>
      <div class="forecast-grid" id="forecastGrid"></div>
    </div>

    <!-- Recent Searches -->
    <div class="recent-searches hidden" id="recentSearches">
      <h4>Recent Searches</h4>
      <div class="recent-list" id="recentList"></div>
    </div>

  </div>
  <script src="script.js"></script>
</body>
</html>
\`\`\`

---

## Step 2: CSS Styling

\`\`\`css
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', sans-serif;
  background: linear-gradient(135deg, #1a1a2e, #16213e, #0f3460);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px 16px;
  color: #fff;
}

.app {
  width: 100%;
  max-width: 480px;
}

/* Search Bar */
.search-bar {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.search-bar input {
  flex: 1;
  padding: 12px 16px;
  border: 2px solid rgba(255,255,255,0.2);
  border-radius: 12px;
  background: rgba(255,255,255,0.1);
  color: #fff;
  font-size: 16px;
  outline: none;
  transition: border-color 0.2s;
}

.search-bar input:focus {
  border-color: rgba(255,255,255,0.5);
}

.search-bar input::placeholder { color: rgba(255,255,255,0.5); }

.search-bar button {
  padding: 12px 18px;
  background: #e94560;
  border: none;
  border-radius: 12px;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.2s;
}

.search-bar button:hover { background: #c73652; }

/* Weather Card */
.weather-card {
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 20px;
  padding: 30px;
  text-align: center;
  margin-bottom: 20px;
}

.city-name { font-size: 26px; font-weight: 700; margin-bottom: 8px; }
.weather-icon { font-size: 72px; margin: 10px 0; }
.temperature { font-size: 56px; font-weight: 800; margin-bottom: 8px; }
.description { font-size: 18px; color: rgba(255,255,255,0.75); text-transform: capitalize; margin-bottom: 24px; }

.details-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 20px;
}

.detail-item {
  background: rgba(255,255,255,0.08);
  border-radius: 12px;
  padding: 12px;
}

.label { display: block; font-size: 12px; color: rgba(255,255,255,0.6); margin-bottom: 4px; }
.value { font-size: 18px; font-weight: 600; }

#unitToggle {
  background: transparent;
  border: 2px solid rgba(255,255,255,0.3);
  color: #fff;
  padding: 8px 20px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}
#unitToggle:hover { background: rgba(255,255,255,0.1); }

/* Forecast */
.forecast {
  background: rgba(255,255,255,0.08);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
}

.forecast h3 { margin-bottom: 16px; font-size: 16px; color: rgba(255,255,255,0.7); }

.forecast-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
}

.forecast-day {
  text-align: center;
  background: rgba(255,255,255,0.08);
  border-radius: 12px;
  padding: 10px 4px;
}

.forecast-day .day { font-size: 12px; color: rgba(255,255,255,0.6); }
.forecast-day .f-icon { font-size: 28px; margin: 6px 0; }
.forecast-day .f-temp { font-size: 14px; font-weight: 700; }

/* Recent Searches */
.recent-searches { margin-bottom: 20px; }
.recent-searches h4 { font-size: 14px; color: rgba(255,255,255,0.6); margin-bottom: 10px; }

.recent-list { display: flex; flex-wrap: wrap; gap: 8px; }

.recent-chip {
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 20px;
  padding: 6px 14px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;
}
.recent-chip:hover { background: rgba(255,255,255,0.2); }

/* Utilities */
.hidden { display: none; }

.error-msg {
  background: rgba(233,69,96,0.2);
  border: 1px solid #e94560;
  color: #ff8fa3;
  padding: 12px 16px;
  border-radius: 12px;
  margin-bottom: 16px;
  font-size: 14px;
}

.loading {
  text-align: center;
  padding: 40px;
  color: rgba(255,255,255,0.7);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255,255,255,0.2);
  border-top-color: #e94560;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto 16px;
}

@keyframes spin { to { transform: rotate(360deg); } }
\`\`\`

---

## Step 3: JavaScript — The Core Logic

Here's where it all comes together. Let's break it down piece by piece.

### 3.1 Setup and State

\`\`\`javascript
const API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// DOM elements
const cityInput    = document.getElementById('cityInput');
const searchBtn    = document.getElementById('searchBtn');
const locationBtn  = document.getElementById('locationBtn');
const weatherCard  = document.getElementById('weatherCard');
const forecast     = document.getElementById('forecast');
const forecastGrid = document.getElementById('forecastGrid');
const loading      = document.getElementById('loading');
const errorMsg     = document.getElementById('errorMsg');
const unitToggle   = document.getElementById('unitToggle');

// App state
let currentCity = '';
let isCelsius = true;
let currentWeatherData = null;
\`\`\`

### 3.2 Fetch Weather Data (The Most Important Part)

This is the heart of the app — a function that fetches weather from the API.

\`\`\`javascript
async function fetchWeather(city) {
  showLoading();

  try {
    // Fetch current weather
    const currentRes = await fetch(
      \`\${BASE_URL}/weather?q=\${encodeURIComponent(city)}&appid=\${API_KEY}&units=metric\`
    );

    // Always check if the response is ok BEFORE parsing JSON
    if (!currentRes.ok) {
      if (currentRes.status === 404) {
        throw new Error(\`City "\${city}" not found. Check the spelling and try again.\`);
      }
      throw new Error('Failed to fetch weather. Please try again.');
    }

    const currentData = await currentRes.json();

    // Fetch 5-day forecast
    const forecastRes = await fetch(
      \`\${BASE_URL}/forecast?q=\${encodeURIComponent(city)}&appid=\${API_KEY}&units=metric\`
    );
    const forecastData = await forecastRes.json();

    // Save state and display
    currentWeatherData = { current: currentData, forecast: forecastData };
    currentCity = city;

    displayWeather(currentData);
    displayForecast(forecastData);
    saveRecentSearch(city);
    showRecentSearches();

  } catch (error) {
    showError(error.message);
  } finally {
    hideLoading();
  }
}
\`\`\`

**Key points about this function:**
- \`async/await\` makes async code read like synchronous code
- We check \`response.ok\` BEFORE calling \`.json()\` — this is critical. A 404 response still has a body and won't throw automatically
- The \`finally\` block always runs — perfect for hiding the loader
- \`encodeURIComponent\` handles special characters in city names

### 3.3 Display Current Weather

\`\`\`javascript
function displayWeather(data) {
  const { name, sys, main, weather, wind, visibility } = data;

  document.getElementById('cityName').textContent = \`\${name}, \${sys.country}\`;
  document.getElementById('weatherIcon').textContent = getWeatherEmoji(weather[0].id);
  document.getElementById('temperature').textContent = isCelsius
    ? \`\${Math.round(main.temp)}°C\`
    : \`\${toFahrenheit(main.temp)}°F\`;
  document.getElementById('description').textContent = weather[0].description;
  document.getElementById('feelsLike').textContent = isCelsius
    ? \`\${Math.round(main.feels_like)}°C\`
    : \`\${toFahrenheit(main.feels_like)}°F\`;
  document.getElementById('humidity').textContent = \`\${main.humidity}%\`;
  document.getElementById('windSpeed').textContent = \`\${Math.round(wind.speed * 3.6)} km/h\`;
  document.getElementById('visibility').textContent = \`\${(visibility / 1000).toFixed(1)} km\`;

  weatherCard.classList.remove('hidden');
}
\`\`\`

### 3.4 Weather Emoji Mapper

Instead of loading icon images, we can use emojis — simpler and faster:

\`\`\`javascript
function getWeatherEmoji(weatherId) {
  if (weatherId >= 200 && weatherId < 300) return '⛈️';  // Thunderstorm
  if (weatherId >= 300 && weatherId < 400) return '🌦️';  // Drizzle
  if (weatherId >= 500 && weatherId < 600) return '🌧️';  // Rain
  if (weatherId >= 600 && weatherId < 700) return '❄️';   // Snow
  if (weatherId >= 700 && weatherId < 800) return '🌫️';  // Atmosphere (fog, mist)
  if (weatherId === 800)                   return '☀️';   // Clear sky
  if (weatherId > 800)                     return '☁️';   // Clouds
  return '🌡️';
}
\`\`\`

> OpenWeatherMap uses **weather condition codes** (200–804). Each range maps to a weather type. Check the [full list in their docs](https://openweathermap.org/weather-conditions).

### 3.5 Display 5-Day Forecast

The forecast endpoint returns data every 3 hours. We want one entry per day:

\`\`\`javascript
function displayForecast(data) {
  // Filter: get one reading per day (at noon ~12:00:00)
  const daily = data.list.filter(item => item.dt_txt.includes('12:00:00'));

  forecastGrid.innerHTML = daily.slice(0, 5).map(item => {
    const date = new Date(item.dt * 1000);
    const day = date.toLocaleDateString('en', { weekday: 'short' });
    const temp = isCelsius
      ? \`\${Math.round(item.main.temp)}°C\`
      : \`\${toFahrenheit(item.main.temp)}°F\`;

    return \`
      <div class="forecast-day">
        <div class="day">\${day}</div>
        <div class="f-icon">\${getWeatherEmoji(item.weather[0].id)}</div>
        <div class="f-temp">\${temp}</div>
      </div>
    \`;
  }).join('');

  forecast.classList.remove('hidden');
}
\`\`\`

### 3.6 Geolocation API

Let the browser detect the user's location:

\`\`\`javascript
function getLocationWeather() {
  if (!navigator.geolocation) {
    showError('Geolocation is not supported by your browser.');
    return;
  }

  showLoading();

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const res = await fetch(
          \`\${BASE_URL}/weather?lat=\${latitude}&lon=\${longitude}&appid=\${API_KEY}&units=metric\`
        );
        if (!res.ok) throw new Error('Could not get weather for your location.');
        const data = await res.json();
        // Use the city name from the response to fetch full data
        await fetchWeather(data.name);
      } catch (error) {
        showError(error.message);
        hideLoading();
      }
    },
    (error) => {
      hideLoading();
      showError('Location access denied. Please search manually.');
    }
  );
}
\`\`\`

### 3.7 Temperature Toggle (°C / °F)

\`\`\`javascript
function toFahrenheit(celsius) {
  return Math.round((celsius * 9/5) + 32);
}

unitToggle.addEventListener('click', () => {
  isCelsius = !isCelsius;
  unitToggle.textContent = isCelsius ? 'Switch to °F' : 'Switch to °C';

  // Re-render with existing data (no new API call needed)
  if (currentWeatherData) {
    displayWeather(currentWeatherData.current);
    displayForecast(currentWeatherData.forecast);
  }
});
\`\`\`

This is a great pattern — **store the raw data** from the API, then re-render when the unit changes. No extra API calls needed.

### 3.8 Recent Searches with localStorage

\`\`\`javascript
const MAX_RECENT = 5;

function saveRecentSearch(city) {
  let recent = getRecentSearches();
  // Remove duplicate and add to front
  recent = [city, ...recent.filter(c => c.toLowerCase() !== city.toLowerCase())];
  // Keep only last 5
  recent = recent.slice(0, MAX_RECENT);
  localStorage.setItem('recentSearches', JSON.stringify(recent));
}

function getRecentSearches() {
  try {
    return JSON.parse(localStorage.getItem('recentSearches')) || [];
  } catch {
    return [];
  }
}

function showRecentSearches() {
  const recent = getRecentSearches();
  const container = document.getElementById('recentSearches');
  const list = document.getElementById('recentList');

  if (recent.length === 0) {
    container.classList.add('hidden');
    return;
  }

  list.innerHTML = recent.map(city => \`
    <span class="recent-chip" data-city="\${city}">\${city}</span>
  \`).join('');

  container.classList.remove('hidden');
}

// Click on recent chip to search
document.getElementById('recentList').addEventListener('click', (e) => {
  const chip = e.target.closest('.recent-chip');
  if (chip) fetchWeather(chip.dataset.city);
});
\`\`\`

### 3.9 UI Helper Functions

\`\`\`javascript
function showLoading() {
  loading.classList.remove('hidden');
  weatherCard.classList.add('hidden');
  forecast.classList.add('hidden');
  hideError();
}

function hideLoading() {
  loading.classList.add('hidden');
}

function showError(message) {
  errorMsg.textContent = message;
  errorMsg.classList.remove('hidden');
  weatherCard.classList.add('hidden');
  forecast.classList.add('hidden');
}

function hideError() {
  errorMsg.classList.add('hidden');
}
\`\`\`

### 3.10 Event Listeners & Init

\`\`\`javascript
// Search button
searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) fetchWeather(city);
});

// Enter key to search
cityInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const city = cityInput.value.trim();
    if (city) fetchWeather(city);
  }
});

// Location button
locationBtn.addEventListener('click', getLocationWeather);

// Init: show recent searches on load
showRecentSearches();
\`\`\`

---

## Common Mistakes & How to Avoid Them

### 1. Not checking \`response.ok\`

❌ **Wrong:**
\`\`\`javascript
const data = await fetch(url).then(res => res.json()); // Silently fails on 404!
\`\`\`

✅ **Correct:**
\`\`\`javascript
const res = await fetch(url);
if (!res.ok) throw new Error(\`HTTP error: \${res.status}\`);
const data = await res.json();
\`\`\`

### 2. Exposing your API key in frontend code

Your API key is visible in browser DevTools. For a portfolio project this is acceptable, but for production:
- Move API calls to a backend server (Node.js, Express)
- Use environment variables
- Use serverless functions (Vercel/Netlify Functions)

### 3. Not handling network errors

Fetch only rejects on **network failure** (no internet). A 404 or 500 response is still a "successful" fetch. Always check \`response.ok\`.

### 4. Wind speed units confusion

OpenWeather returns wind speed in **meters/second**. To convert to km/h, multiply by 3.6. To convert to mph, multiply by 2.237.

---

## What to Build Next

Now that you have a working Weather App, here's how to level it up:

- **Add weather animations** — CSS rain drops, sun rays based on current conditions
- **Hourly forecast** — the \`/forecast\` endpoint gives data every 3 hours
- **Air Quality Index** — OpenWeather has a separate \`/air_pollution\` endpoint
- **Weather maps** — integrate Leaflet.js with OpenWeather map tiles
- **PWA** — add a service worker to make it work offline

---

## Key Concepts You Learned

| Concept | What You Used It For |
|---------|---------------------|
| **Fetch API** | Making HTTP requests to OpenWeather |
| **async/await** | Writing async code that reads synchronously |
| **try/catch/finally** | Error handling + always hiding the loader |
| **response.ok check** | Detecting API errors before parsing JSON |
| **Geolocation API** | Getting user's GPS coordinates |
| **localStorage** | Saving recent searches between sessions |
| **encodeURIComponent** | Safely encoding city names in URLs |
| **Weather condition codes** | Mapping API codes to emojis |

---

## Live Demo

Want to see the finished project in action? Check out the live demo on 100 Dev Projects — it includes all these features plus dynamic backgrounds, hourly forecast, and more.

This is one of the best intermediate JavaScript projects you can add to your portfolio. It shows employers that you can:
- Work with external APIs
- Handle async operations correctly
- Write proper error handling
- Build a feature-complete, real-world app

Happy coding!
  `,

  tags: [
    "javascript",
    "fetch-api",
    "weather-app",
    "api",
    "async-await",
    "tutorial",
    "intermediate",
    "geolocation",
    "localstorage"
  ],
  relatedProjects: ["weather-app"],
  featured: true,
  views: 0
};
