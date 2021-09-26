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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row next-days">`;
  forecastHTML =
    forecastHTML +
    `<div class="col-3">
          <div class="forecast-day">Tomorrow</div>
            <img
              src="images/sunbehindclouds3.png"
              alt="SunBehindClouds"
              width="150px"
            />
        <div class="temperatures-next-days">
            <span class="min-temp">15°C</span> |
            <span class="max-temp">23°C</span>
          </div>
        </div>`;
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
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
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].main);
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

function convertTempToF(event) {
  event.preventDefault();
  let temperatureInF = (celsiusTemp * 9) / 5 + 32;
  document.querySelector("#temperature").innerHTML = Math.round(temperatureInF);
  document.querySelector("#unit").innerHTML = "°F";
}

function convertTempToC(event) {
  event.preventDefault();
  document.querySelector("#temperature").innerHTML = Math.round(celsiusTemp);
  document.querySelector("#unit").innerHTML = `°C`;
}

let searchLocationForm = document.querySelector("#search-location-form");
searchLocationForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", searchCurrentLocationData);

let convertButtonF = document.querySelector("#convert-to-°F-button");
convertButtonF.addEventListener("click", convertTempToF);

let convertButtonC = document.querySelector("#convert-to-°C-button");
convertButtonC.addEventListener("click", convertTempToC);

let celsiusTemp = null;

displayForecast();
search("Hamburg");
