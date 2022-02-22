const info = document.querySelectorAll(".details");
const container = document.querySelector(".container");

const getWeather = async (country) => {
  const response = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=1075b7c5f2dc436ca7a92921220902&q=${country}&aqi=no`
  );

  const data = await response.json();

  return data;
};

const render = (data) => {
  console.log(data);

  const card = `
    <div class="card" >
      <div class ="top"> 
        <h2 class="country">Weather in ${data.location.name}</h2>
      </div>

      <div class="icon">
      <img src="${data.current.condition.icon}" alt="icon" />
      </div>

      <div class="details tempinfo">
        <span>${data.current.temp_c}°C</span>
      </div>

      

      <div class="container-info" >
        <div class="details flinfo">
        <p>FeelsLike</p>
        <span>${data.current.feelslike_c}</span>
        </div>
        
        <div class="details huminfo">
          <p>Humidity</p>
          <span>${data.current.humidity}</span>
        </div>
        <div class="details windinfo">
          <p>Wind</p>
          <span>${data.current.wind_degree}°</span>
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
    getWeather(query).then((data) => render(data));

    document.querySelector(
      "body"
    ).style.backgroundImage = `url("https://source.unsplash.com/1920x1080/?${query}")`;
  }
});
