import feather from 'feather-icons';
import '../weatherapp/weatherapp.css';

export function initializeWeatherApp() {
  const apiKey = process.env.WEATHER_API_KEY;
  const geoNamesUsername = process.env.GEONAMES_USERNAME; // Add this line
  const weatherContainer = document.getElementById('weather-container');
  const searchButton = document.getElementById('search-button');
  const cityInput = document.getElementById('city-input');
  const currentLocationButton = document.getElementById('current-location-button');
  const citySuggestions = document.getElementById('city-suggestions');

  if (!apiKey || !geoNamesUsername) { // Check for both API keys
    console.error('API keys are missing');
    if (weatherContainer) {
      weatherContainer.innerHTML = '<p class="text-red-500">API keys are missing. Please check your .env file.</p>';
    }
    return;
  }

  if (searchButton && cityInput) {
    searchButton.addEventListener('click', () => {
      const city = cityInput.value;
      if (city) {
        fetchWeatherData(city);
      }
    });

    cityInput.addEventListener('input', () => {
      const query = cityInput.value;
      if (query.length > 2) {
        fetchCitySuggestions(query);
      } else {
        citySuggestions.innerHTML = '';
      }
    });
  } else {
    console.error('Search button or city input not found');
  }

  if (currentLocationButton) {
    currentLocationButton.addEventListener('click', () => {
      fetch('http://ip-api.com/json')
        .then(response => response.json())
        .then(data => {
          const { lat, lon } = data;
          fetchWeatherDataByCoords(lat, lon);
        })
        .catch(error => {
          console.error('Error getting location:', error);
          if (weatherContainer) {
            weatherContainer.innerHTML = '<p class="text-red-500">Error getting location. Please try again later.</p>';
          }
        });
    });
  } else {
    console.error('Current location button not found');
  }

  function fetchWeatherData(city) {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.error) {
          throw new Error(data.error.message);
        }
        displayWeatherData(data);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        weatherContainer.innerHTML = `<p class="text-red-500">Error: ${error.message}</p>`;
      });
  }

  function fetchWeatherDataByCoords(latitude, longitude) {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`;
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data) {
          displayWeatherData(data);
        } else {
          weatherContainer.innerHTML = '<p class="text-red-500">Location not found. Please try again.</p>';
        }
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        weatherContainer.innerHTML = '<p class="text-red-500">Error fetching weather data. Please try again later.</p>';
      });
  }

  function fetchCitySuggestions(query) {
    const apiUrl = `http://api.geonames.org/searchJSON?q=${query}&maxRows=5&username=${geoNamesUsername}`;
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        citySuggestions.innerHTML = '';
        data.geonames.forEach(city => {
          const suggestion = document.createElement('div');
          suggestion.className = 'suggestion';
          suggestion.textContent = `${city.name}, ${city.countryName}`;
          suggestion.addEventListener('click', () => {
            cityInput.value = city.name;
            citySuggestions.innerHTML = '';
          });
          citySuggestions.appendChild(suggestion);
        });
      })
      .catch(error => {
        console.error('Error fetching city suggestions:', error);
      });
  }

  function displayWeatherData(data) {
    const { location, current } = data;
    weatherContainer.innerHTML = `
      <div class="weather-item"><i data-feather="map-pin"></i><h2 class="text-2xl font-bold mb-2">${location.name}</h2></div>
      <div class="weather-item"><i data-feather="cloud"></i><div class="text-xl mb-2">${current.condition.text}</div></div>
      <div class="weather-item"><i data-feather="thermometer"></i><div class="text-xl mb-2">${current.temp_c} °C</div></div>
      <div class="weather-item"><i data-feather="wind"></i><div class="text-xl mb-2">${current.wind_kph} kph</div></div>
      <div class="weather-item"><i data-feather="droplet"></i><div class="text-xl">${current.humidity}% Humidity</div></div>
    `;
    feather.replace();
    weatherContainer.classList.add('visible'); // Show the weather container
  }
}

document.addEventListener('DOMContentLoaded', initializeWeatherApp);
