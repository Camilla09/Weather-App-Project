//Date and time
function formatDate(timestamp) {
  let date = new Date(timestamp);
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

//Search function

function showCurrentData(response) {
  console.log(response);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#current-pressure").innerHTML = Math.round(
    response.data.main.pressure
  );
  let windSpeed = response.data.wind.speed;
  document.querySelector("#current-wind-speed").innerHTML = Math.round(
    windSpeed * 3.6
  );
  document.querySelector("#current-humidity").innerHTML =
    response.data.main.humidity;
  document.querySelector("#day-time").innerHTML = formatDate(
    response.data.dt * 1000
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
}

function search(cityValue) {
  let apiKey = "749f35553db8c3cd2efeb65b0321e00d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showCurrentData);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityValue = document.querySelector("#location-input").value;
  search(cityValue);
}

let searchLocationForm = document.querySelector("#search-location-form");
searchLocationForm.addEventListener("submit", handleSubmit);

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

search("Hamburg");
