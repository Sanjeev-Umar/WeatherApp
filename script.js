import { API_KEY } from "./Api_key";

const info = document.querySelectorAll(".details");
const container = document.querySelector(".container");
const loadingRipple = ` 
<div class="lds-ripple">
<div></div>
<div></div>
</div>`;
const getWeather = async (country) => {
  try {
    container.innerHTML = "";
    container.insertAdjacentHTML("afterbegin", loadingRipple);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${country}&units=metric&appid=${config.API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Data not found");
    }

    const data = await response.json();
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
};

const render = (data) => {
  const card = `
    <div class="card" >
      <div class ="top"> 
        <h2 class="country">Weather in ${data.name}</h2>
      </div>

      <div class="icon">
      <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png
      " alt="icon" />
      </div>

      <div class="details tempinfo">
        <span>${data.main.temp}°C</span>
      </div>

      

      <div class="container-info" >
        <div class="details flinfo">
        <p>Min temp</p>
        <span>${data.main.temp_min}°C</span>
        </div>
        
        <div class="details huminfo">
          <p>Max temp</p>
          <span>${data.main.temp_max}°C</span>
        </div>
      <div class="container-info" >
        <div class="details flinfo">
        <p>FeelsLike</p>
        <span>${data.main.feels_like}</span>
        </div>
        
        <div class="details huminfo">
          <p>Humidity</p>
          <span>${data.main.humidity}%</span>
        </div>
       
      </div>
    </div>`;

  container.innerHTML = "";
  container.insertAdjacentHTML("beforeend", card);
};

const country = getWeather("mumbai").then((data) => render(data));
// Search
const button = document.querySelector("button");
const text = document.querySelector("input");

button.addEventListener("click", (e) => {
  e.preventDefault();
  const query = text.value;
  if (query) {
    getWeather(query)
      .then((data) => render(data))
      .catch((e) => {
        const error = `<h2>${e.message}</h2>`;
        container.innerHTML = "";
        container.insertAdjacentHTML("beforeend", error);
      });

    document.querySelector(
      "body"
    ).style.backgroundImage = `url("https://source.unsplash.com/1920x1080/?${query}")`;
  }
});
