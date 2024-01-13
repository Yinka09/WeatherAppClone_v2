function displayCurrentWeather(response) {
  let currentTemp = document.querySelector("#weather-app-temp");
  let searchCity = document.querySelector("#weather-app-city");
  searchCity.innerHTML = response.data.city;
  let apiCurrentTemp = response.data.temperature.current;
  currentTemp.innerHTML = Math.round(apiCurrentTemp);
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
