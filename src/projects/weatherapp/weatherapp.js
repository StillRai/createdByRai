import feather from 'feather-icons';
import '../weatherapp/weatherapp.css';
import weatherIcons from '../weatherapp/weatherIcons.json';

export function initializeWeatherApp() {
  const apiKey = process.env.WEATHER_API_KEY;
  const geoNamesUsername = process.env.GEONAMES_USERNAME;
  const weatherContainer = document.getElementById('weather-container');
  const searchButton = document.getElementById('search-button');
  const cityInput = document.getElementById('city-input');
  const currentLocationButton = document.getElementById('current-location-button');
  const citySuggestions = document.getElementById('city-suggestions');
  const backArrowContainer = document.getElementById('back-arrow');

  if (!apiKey || !geoNamesUsername) {
    console.error('API keys are missing');
    if (weatherContainer) {
      weatherContainer.innerHTML = '<p class="text-red-500">API keys are missing. Please check your .env file.</p>';
    }
    return;
  }

  // Add back arrow
  if (backArrowContainer) {
    backArrowContainer.innerHTML = `
      <div style="position: absolute; top: 20px; left: 20px; z-index: 50;">
        <button id="back-button" class="flex items-center text-light hover:text-gray-300 transition duration-200">
          <i data-feather="arrow-left" class="mr-2"></i> Back
        </button>
      </div>
    `;
    const backButton = document.getElementById('back-button');
    backButton.addEventListener('click', () => {
      window.history.back();
    });
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
    const apiUrl = `http://api.geonames.org/searchJSON?q=${query}&maxRows=5&username=${geoNamesUsername}&featureClass=P&orderby=population`;
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const populationThreshold = 100000; 
        const filteredCities = data.geonames.filter(city => city.population > populationThreshold);
  
        citySuggestions.innerHTML = '';
        filteredCities.forEach(city => {
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
    const weatherIcon = weatherIcons[current.condition.text] || 'cloud'; 
    weatherContainer.innerHTML = `
     <h1 class="text-3xl font-bold mb-7 text-custom-buttondark">${location.name}</h1>
      <div class="weather-item"><i data-feather="${weatherIcon}"></i>&nbsp;<div class="text-xl mb-2">${current.condition.text}</div></div>
      <div class="weather-item"><i data-feather="thermometer"></i>&nbsp;<div class="text-xl mb-2">${current.temp_c} °C</div></div>
      <div class="weather-item"><i data-feather="wind"></i>&nbsp;<div class="text-xl mb-2">${current.wind_kph} kph</div></div>
      <div class="weather-item"><i data-feather="droplet"></i>&nbsp;<div class="text-xl">${current.humidity}% Humidity</div></div>
    `;
    feather.replace();
    weatherContainer.classList.add('visible'); 
  }
}

document.addEventListener('DOMContentLoaded', initializeWeatherApp);
