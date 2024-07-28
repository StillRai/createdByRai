import feather from 'feather-icons';

export function initializeWeatherApp() {
  document.addEventListener('DOMContentLoaded', () => {
    const weatherApiKey = process.env.WEATHER_API_KEY;
    const geoNamesUsername = process.env.GEONAMES_USERNAME;

    console.log('Weather API Key:', weatherApiKey); // Debugging
    console.log('GeoNames Username:', geoNamesUsername); // Debugging

    const weatherContainer = document.getElementById('weather-container');
    const searchButton = document.getElementById('search-button');
    const cityInput = document.getElementById('city-input');

    if (!weatherApiKey || !geoNamesUsername) {
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
          fetchWeatherDataByCity(city);
        } else {
          console.log('No city input');
        }
      });
    }

    // Fetch geolocation data and then fetch weather data based on the user's current location
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

    function fetchWeatherDataByCity(city) {
      const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${city}`;
      console.log('Fetching weather data for city:', city); // Debugging

      fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          if (data) {
            displayWeatherData(data);
          } else {
            if (weatherContainer) {
              weatherContainer.innerHTML = '<p class="text-red-500">City not found. Please try again.</p>';
            }
          }
        })
        .catch(error => {
          console.error('Error fetching weather data:', error);
          if (weatherContainer) {
            weatherContainer.innerHTML = '<p class="text-red-500">Error fetching weather data. Please try again later.</p>';
          }
        });
    }

    function fetchWeatherDataByCoords(latitude, longitude) {
      const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${latitude},${longitude}`;
      console.log('Fetching weather data for coordinates:', latitude, longitude); // Debugging

      fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          if (data) {
            displayWeatherData(data);
          } else {
            if (weatherContainer) {
              weatherContainer.innerHTML = '<p class="text-red-500">Location not found. Please try again.</p>';
            }
          }
        })
        .catch(error => {
          console.error('Error fetching weather data:', error);
          if (weatherContainer) {
            weatherContainer.innerHTML = '<p class="text-red-500">Error fetching weather data. Please try again later.</p>';
          }
        });
    }

    function displayWeatherData(data) {
      const { location, current } = data;
      if (weatherContainer) {
        weatherContainer.innerHTML = `
          <h2 class="text-2xl font-bold mb-2 text-custom-dark">${location.name}</h2>
          <div class="text-xl mb-2 text-custom-dark"><i data-feather="cloud"></i> ${current.condition.text}</div>
          <div class="text-xl mb-2 text-custom-dark"><i data-feather="thermometer"></i> ${current.temp_c} °C</div>
          <div class="text-xl mb-2 text-custom-dark"><i data-feather="wind"></i> ${current.wind_kph} kph</div>
          <div class="text-xl text-custom-dark"><i data-feather="droplet"></i> ${current.humidity}% Humidity</div>
        `;
        feather.replace();
      }
    }

    // Implement city autofill
    if (cityInput) {
      cityInput.addEventListener('input', () => {
        const query = cityInput.value;
        if (query.length > 2) {
          fetch(`http://api.geonames.org/searchJSON?q=${query}&maxRows=5&username=${geoNamesUsername}`) // Use the GeoNames username from the .env file
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then(data => {
              const suggestions = data.geonames.map(city => city.name).join(', ');
              console.log('City suggestions:', suggestions); // Debugging
              // Optional: Display suggestions below the input field
            })
            .catch(error => {
              console.error('Error fetching city suggestions:', error);
            });
        }
      });
    }
  });
}
