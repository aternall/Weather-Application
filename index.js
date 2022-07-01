let now = new Date();
let currentDate = document.querySelector("#current-date");
let date = now.getDate();
let hour = now.getHours();
let minutes = now.getMinutes();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
currentDate.innerHTML = `${day} ${date} ${month} ${hour}:${minutes}`;
//

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  let apiKey = "b366a246e7ce61f2fb734e1ed208be90";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = `${Math.round(
    response.data.main.temp
  )}`;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#high-temp").innerHTML = `H:${Math.round(
    response.data.main.temp_max
  )}°C`;
  document.querySelector("#low-temp").innerHTML = `L:${Math.round(
    response.data.main.temp_min
  )}°C`;
  document.querySelector(
    "#wind"
  ).innerHTML = `W:${response.data.wind.speed}m/s`;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
