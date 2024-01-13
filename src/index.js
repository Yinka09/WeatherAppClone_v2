function displayCurrentWeather(response) {
  let currentTemp = document.querySelector("#weather-app-temp");
  let searchCity = document.querySelector("#weather-app-city");
  let weatherDescription = document.querySelector("#description");
  let weatherHumidity = document.querySelector("#humidity");
  let weatherWind = document.querySelector("#wind-value");
  let currentDateTime = document.querySelector("#date-time");
  let date = new Date(response.data.time * 1000);
  let weatherIcon = document.querySelector("#icon-image");
  weatherIcon.innerHTML = `<img src="${response.data.condition.icon_url}"
                      class="weather-app-emoji"
                    />`;

  searchCity.innerHTML = response.data.city;
  weatherDescription.innerHTML = response.data.condition.description;
  weatherHumidity.innerHTML = `${response.data.temperature.humidity}%,`;
  weatherWind.innerHTML = `${response.data.wind.speed}km/h`;
  currentDateTime.innerHTML = formatDate(date);

  //console.log(response.data.condition.icon);
  let apiCurrentTemp = response.data.temperature.current;
  currentTemp.innerHTML = Math.round(apiCurrentTemp);
}

function formatDate(date) {
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hour < 10) {
    hour = `0${hour}`;
  }
  return `${day} ${hour}:${minutes}`;
}

function apiSearchCity(city) {
  //Use API call to search for city weather and update interface
  let apiKey = "8ee4f5od9c4ae9cb47ffb5f4t03d2531";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCurrentWeather);
}

function doSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  //let newH1 = searchInput.value;
  //newH1 = newH1.trim();
  //newH1 = newH1[0].toUpperCase() + newH1.slice(1).toLowerCase();
  //searchCity.innerHTML = searchInput.value;

  apiSearchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", doSearch);

apiSearchCity("Lagos");
