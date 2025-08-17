const apiKey = 'f6d60ce0d8a40bfd42ac5c284da4c0ef'; // Replace with your actual OpenWeatherMap API key

document.getElementById('getWeatherBtn')
  .addEventListener('click', () => getWeather(apiKey));

async function getWeather(apiKey) {
  const city = document.getElementById('cityInput').value;

  if (city === '') {
    alert("Please enter a city name.");
    return;
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);

    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    displayWeather(data);

  } catch (error) {
    document.getElementById('weatherDisplay').innerText = error.message;
  }
}

function displayWeather(data) {
  const weather = data.weather[0];
  const main = data.main;
  const display = document.getElementById('weatherDisplay');

  display.innerHTML = `
    <h2>${data.name}</h2>
    <p>Temperature: ${main.temp}°C</p>
    <p>Condition: ${weather.description}</p>
    <img src="https://openweathermap.org/img/wn/${weather.icon}@2x.png" alt="${weather.description}">
  `;
}
