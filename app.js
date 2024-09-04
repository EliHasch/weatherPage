import getWeatherData from "./utils/htppReq.js";
import { showModal, removeModal } from "./utils/modal.js";
import { getWeekDay } from "./utils/customeDate.js";



const searchInput = document.querySelector("input");
const searchButton = document.querySelector("button");
const weaterContainer = document.getElementById("weather");
const forecastContainer = document.getElementById("forecast");
const locationIcon = document.getElementById("location");
const modalButton = document.getElementById("modal-bottun");

const renderCurrentWether = (data) => {
  if(!data) return
  weaterContainer.innerHTML = "";
  const weaterJSx = `
  <h1>${data.name} ${data.sys.country}</h1>
  <div id="main" >
  <img alt="weather icon" src="https://openweathermap.org/img/w/${
    data.weather[0].icon
  }.png"/>
  <span>${data.weather[0].main}</span>
  <p>${Math.round(data.main.temp)} °C</p>
  </div>
  <div id="info">
  <p>Humidity: <span>${data.main.humidity}</span></p>
  <p>Wind: <span>${data.wind.speed}</span></p>
  </div>
  `;
  weaterContainer.innerHTML += weaterJSx;
};


const renderForecastWether = (data) => {
  if(!data) return
  forecastContainer.innerHTML = "";
  data = data.list.filter((obj) => obj.dt_txt.endsWith("12:00:00"));
  data.forEach((i) => {
    const forecastJSx = `
    <div>
        <img alt="weather icon" src="https://openweathermap.org/img/w/${
          i.weather[0].icon
        }.png"/>
        <h3>${getWeekDay(i.dt)}</h3>
        <p>${Math.round(i.main.temp)} °C</p>
        <span>${i.weather[0].main}</span>
    </div>
  `;

    forecastContainer.innerHTML += forecastJSx;
  });
};


const searchHandler = async () => {
  const cityName = searchInput.value;

  if (!cityName) {
    showModal("Please enter city name!");
    return
  }
  const currentData = await getWeatherData("current", cityName);

  renderCurrentWether(currentData);
  const forecastData = await getWeatherData("forecase", cityName);
  renderForecastWether(forecastData);
};

const positionCallback = async (position) => {
  const currentData = await getWeatherData("current", position.coords);
  renderCurrentWether(currentData);
  const forecastData = await getWeatherData("forecase", position.coords);
  renderForecastWether(forecastData);
};

const errorCallback = (error) => {
  showModal(error.message);
};

const locationHndler = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(positionCallback, errorCallback);
  } else {
    showModal("Your browser does not support gelocation ");

  }
};

const initHandler = async ()=> {
  const currentData = await getWeatherData("current", "berlin");
  renderCurrentWether(currentData);
  const forecastData = await getWeatherData("forecase", "berlin");
  renderForecastWether(forecastData);
}

searchButton.addEventListener("click", searchHandler);
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchHandler();
  }
});
locationIcon.addEventListener("click", locationHndler);
modalButton.addEventListener("click", removeModal)
document.addEventListener("DOMContentLoaded", initHandler)
