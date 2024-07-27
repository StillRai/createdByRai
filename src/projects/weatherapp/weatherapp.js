document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
    const weatherContainer = document.getElementById('weather-container');
    const searchButton = document.getElementById('search-button');
    const cityInput = document.getElementById('city-input');
  
    searchButton.addEventListener('click', () => {
      const city = cityInput.value;
      if (city) {
        fetchWeatherData(city);
      }
    });
  
    function fetchWeatherData(city) {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          if (data.cod === 200) {
            displayWeatherData(data);
          } else {
            weatherContainer.innerHTML = `<p class="text-red-500">City not found. Please try again.</p>`;
          }
        })
        .catch(error => {
          console.error('Error fetching weather data:', error);
          weatherContainer.innerHTML = `<p class="text-red-500">Error fetching weather data. Please try again later.</p>`;
        });
    }
  
    function displayWeatherData(data) {
      const { name, main, weather, wind } = data;
      weatherContainer.innerHTML = `
        <h2 class="text-2xl font-bold mb-2 text-pastel-purple">${name}</h2>
        <div class="text-xl mb-2 text-pastel-green"><i data-feather="cloud"></i> ${weather[0].description}</div>
        <div class="text-xl mb-2 text-pastel-blue"><i data-feather="thermometer"></i> ${main.temp} °C</div>
        <div class="text-xl mb-2 text-pastel-pink"><i data-feather="wind"></i> ${wind.speed} m/s</div>
        <div class="text-xl text-pastel-yellow"><i data-feather="droplet"></i> ${main.humidity}% Humidity</div>
      `;
      feather.replace();
    }
  });
  