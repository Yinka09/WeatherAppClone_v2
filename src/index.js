function doSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let searchCity = document.querySelector("#weather-app-city");
  searchCity.innerHTML = searchInput.value;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", doSearch);
