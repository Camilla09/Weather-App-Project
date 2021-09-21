//Date and time
function formatDate(date) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"];
  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}, ${hours}:${minutes}`;
}
let dayTime = document.querySelector("#day-time");
let now = new Date();
dayTime.innerHTML = formatDate(now);

//Search function

function showCurrentData(response) {
  console.log(response);
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = Math.round(response.data.main.temp);
  let currentPressure = document.querySelector("#current-pressure");
  currentPressure.innerHTML = Math.round(response.data.main.pressure);
  let currentWindSpeed = document.querySelector("#current-wind-speed");
  let windSpeed = response.data.wind.speed;
  currentWindSpeed.innerHTML = Math.round(windSpeed * 3.6);
  let currentHumidity = document.querySelector("#current-humidity");
  currentHumidity.innerHTML = response.data.main.humidity;
}

function search(event) {
  event.preventDefault();
  let locationInput = document.querySelector("#location-input");
  let cityValue = `${locationInput.value}`;
  let apiKey = "749f35553db8c3cd2efeb65b0321e00d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showCurrentData);
}

let searchLocationForm = document.querySelector("#search-location-form");
searchLocationForm.addEventListener("submit", search);

//Current Location Search
function searchCurrentLocationData(event) {
  event.preventDefault();
  function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = `749f35553db8c3cd2efeb65b0321e00d`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    axios.get(`${apiUrl}`).then(showCurrentData);
  }
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", searchCurrentLocationData);

//Convert to °F/°C

function convertTempToF(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  let temperatureInF = (temperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(temperatureInF);
  let unit = document.querySelector("#unit");
  unit.innerHTML = "°F";
}

let convertButtonF = document.querySelector("#convert-to-°F-button");
convertButtonF.addEventListener("click", convertTempToF);

function convertTempToC(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  let temperatureInC = ((temperature - 32) * 5) / 9;
  temperatureElement.innerHTML = Math.round(temperatureInC);
  let unit = document.querySelector("#unit");
  unit.innerHTML = `°C`;
}

let convertButtonC = document.querySelector("#convert-to-°C-button");
convertButtonC.addEventListener("click", convertTempToC);
