/* This is a Vanilla Javascript code for my weather app clone
 * both for the current weather and forecast weather
 */

// CODE FOR CURRENT WEATHER

// Function which takes API response from apiSearchCity(city) to
// display the current weather conditions, date - time, weather icon
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
                      class="weather-app-emoji" draggable="true"
                    />`;

  searchCity.innerHTML = response.data.city;
  weatherDescription.innerHTML = response.data.condition.description;
  weatherHumidity.innerHTML = `${response.data.temperature.humidity}%,`;
  weatherWind.innerHTML = `${response.data.wind.speed}km/h`;
  currentDateTime.innerHTML = formatDate(date);

  let apiCurrentTemp = response.data.temperature.current;
  currentTemp.innerHTML = Math.round(apiCurrentTemp);

  // Call the getWeatherForecast func using the reponse.data.city to ensure accurate data input
  getWeatherForecast(response.data.city);
}

// Function to create the formatted current date and time to be displayed
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

// Function to make the API call for the input city
function apiSearchCity(city) {
  //Use API call to search for city weather and update interface
  let apiKey = "8ee4f5od9c4ae9cb47ffb5f4t03d2531";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCurrentWeather);
}

//Function which does the weather search for each city the user enters
function doSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  apiSearchCity(searchInput.value);
}

// CODE FOR FORECASTED WEATHER

//Function to format forecast weather date-time stamp
function formatforecastDay(timeStamp) {
  let forecastDate = new Date(timeStamp * 1000); //To convert from milliseconds
  let forecastDays = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return forecastDays[forecastDate.getDay()];
}

//Function which takes in API response from the axios API URL call from getWeatherForecast(city)
function displayForecastWeather(response) {
  console.log(response.data);

  //let days = ["Fri", "Sat", "Sun", "Mon", "Tue"];
  let forecastHMTL = "";

  response.data.daily.forEach(function (day, index) {
    //To ensure forecasts for only five days are shown
    if (index < 5) {
      forecastHMTL =
        forecastHMTL +
        `<div class="col-2">
            <div class="weather-forecast-date">${formatforecastDay(
          day.time
        )}</div>
            <div>
              <img
                src="${day.condition.icon_url}" class="weather-forecast-icon"
                alt="Weather icon"
                
              />
            </div>
            <div class="weather-forecast-temps">
              <div class="weather-forecast-temp-max"><strong>${Math.round(
          day.temperature.maximum
        )}º</strong></div>
              <div class="weather-forecast-temp-min">${Math.round(
          day.temperature.minimum
        )}º</div>
            </div>
          </div>`;
    }
  });

  let forecastElement = document.querySelector("#weather-forecast");
  forecastElement.innerHTML = forecastHMTL;
}

//Function to make the API call for the weather forecast section
function getWeatherForecast(city) {
  let apiKey = "8ee4f5od9c4ae9cb47ffb5f4t03d2531";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecastWeather);
}

//Add EventListner for user input to begin search
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", doSearch);

//Initialize automatic first search based on reload
apiSearchCity("Lagos");
