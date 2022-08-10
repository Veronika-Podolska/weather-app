let nowDay = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentDay = days[nowDay.getDay()];
let hours = nowDay.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = nowDay.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentDayTime = document.querySelector("h4");
currentDayTime.innerHTML = `${currentDay} ${hours}:${minutes}`;

function showData(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#exampleInputEmail1");
  if (searchInput.value) {
    function showTemperature(response) {
      let degree = document.querySelector("#current-degree");
      degree.innerHTML = Math.round(response.data.main.temp);
      let city = document.querySelector("h1");
      city.innerHTML = response.data.name;
      let humidity = document.querySelector("#humidity");
      humidity.innerHTML = `Humidity ${response.data.main.humidity}%`;
      let wind = document.querySelector("#wind");
      wind.innerHTML = `Wind ${response.data.wind.speed} m/s`;
      let feelsLike = document.querySelector("#feels-like");
      feelsLike.innerHTML = `Feels like ${Math.round(
        response.data.main.feels_like
      )}°C`;
    }

    let city = searchInput.value;
    let apiKey = "0c395d6ecc2a4c8d0c6102ab57ade34d";
    let units = "metric";
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

    axios.get(apiURL).then(showTemperature);
  }
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", showData);

function currentData() {
  function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let units = "metric";
    let apiKey = `0c395d6ecc2a4c8d0c6102ab57ade34d`;
    let currentApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

    function currentLocationAndTemp(response) {
      let degree = document.querySelector("#current-degree");
      degree.innerHTML = Math.round(response.data.main.temp);
      let city = document.querySelector("h1");
      city.innerHTML = response.data.name;
      let humidity = document.querySelector("#humidity");
      humidity.innerHTML = `Humidity ${response.data.main.humidity}%`;
      let wind = document.querySelector("#wind");
      wind.innerHTML = `Wind ${response.data.wind.speed} m/s`;
      let feelsLike = document.querySelector("#feels-like");
      feelsLike.innerHTML = `Feels like ${Math.round(
        response.data.main.feels_like
      )}°C`;
    }

    axios.get(currentApiUrl).then(currentLocationAndTemp);
  }
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector("button");
currentLocationButton.addEventListener("click", currentData);
