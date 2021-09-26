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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thrsday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row next-days">`;

  forecast.forEach(function (forecastDay, index) {
    let iconCode = forecastDay.weather[0].icon;
    if (index > 0 && index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col-3">
          <div class="forecast-day">${formatDay(forecastDay.dt)}</div>
            <img
              src="images/${iconCode}.png"
              width="150px"
            />
        <div class="temperatures-next-days">
            <span class="min-temp">${Math.round(
              forecastDay.temp.min
            )}°C</span> |
            <span class="max-temp">${Math.round(forecastDay.temp.max)}°C</span>
          </div>
        </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "749f35553db8c3cd2efeb65b0321e00d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(displayForecast);
}

function showCurrentData(response) {
  console.log(response);
  document.querySelector("#city").innerHTML = response.data.name;
  celsiusTemp = response.data.main.temp;
  document.querySelector("#temperature").innerHTML = Math.round(celsiusTemp);
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
  let iconCode = response.data.weather[0].icon;
  document.querySelector("#icon").setAttribute("src", `images/${iconCode}.png`);
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].main);

  getForecast(response.data.coord);
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

let searchLocationForm = document.querySelector("#search-location-form");
searchLocationForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", searchCurrentLocationData);

search("Hamburg");
