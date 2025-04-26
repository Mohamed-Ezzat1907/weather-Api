const inputSearch = document.getElementById("inputSearch");
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

inputSearch.addEventListener("input", function () {
  search(inputSearch.value);
});

search("cairo");

async function search(city) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=737096138e5341fc966123528240112&q=${city}&days=3`
    );

    const weatherData = await response.json();
    update(weatherData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

function update(data) {
  const todayName = getDayName(0);
  const nextDayName = getDayName(1);
  const nextNextDayName = getDayName(2);

  display(data, todayName, nextDayName, nextNextDayName);
}

function getDayName(index) {
  const dayIndex = (new Date().getDay() + index) % 7;
  return daysOfWeek[dayIndex];
}

function display(data, todayName, nextDayName, nextNextDayName) {
  const cartona = `
    <div class="col-md-4">
      <div class="today">
        <div class="dayDetails d-flex justify-content-between">
          <div id="day" class="day">${todayName}</div>
          <div class="date">${new Date().toLocaleDateString()}</div>
        </div>
        <div class="locationDetails">
          <div id="city" class="location">${data.location.name}</div>
          <div id="degree" class="degree">
            ${data.current.temp_c}<sup>o</sup>C
          </div>
          <div class="img">
            <img id="imgWeather" class="w-25" src="https:${
              data.current.condition.icon
            }" class="w-100" alt="Weather icon" />
          </div>
          <div id="descripWeather" class="weather">
            ${data.current.condition.text}
          </div>
          <div>
                    <span
                      ><img src="img/icon-umberella.png" alt="" /> 20%
                    </span>
                    <span><img src="img/icon-wind.png" alt="" />18km/h</span>
                    <span><img src="img/icon-compass.png" alt="" />East</span>
                  </div>
        </div>
      </div>
    </div>

    <div class="col-md-4 middel">
      <div class="next">
        <div class="dayDetails d-flex justify-content-between">
          <div id="nextDay" class="day">${nextDayName}</div>
        </div>
        <div class="weatherDetails text-center">
          <div class="img">
            <img id="imgWeatherNext" src="https:${
              data.forecast.forecastday[1].day.condition.icon
            }" class="w-100" alt="Weather icon" />
          </div>
          <div id="maxDegreeNext" class="degreeMax">
            ${data.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C
          </div>
          <div id="minDegreeNext" class="degreeMin">
            ${data.forecast.forecastday[1].day.mintemp_c}<sup>o</sup>C
          </div>
          <div id="descripWeatherNext" class="weather">
            ${data.forecast.forecastday[1].day.condition.text}
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-4">
      <div class="next">
        <div class="dayDetails d-flex justify-content-between">
          <div id="nextNextDay" class="day">${nextNextDayName}</div>
        </div>
        <div class="weatherDetails text-center">
          <div class="img">
            <img id="imgWeatherNextNext" src="https:${
              data.forecast.forecastday[2].day.condition.icon
            }" class="w-100" alt="Weather icon" />
          </div>
          <div id="maxDegreeNextNext" class="degreeMax">
            ${data.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C
          </div>
          <div id="minDegreeNextNext" class="degreeMin">
            ${data.forecast.forecastday[2].day.mintemp_c}<sup>o</sup>C
          </div>
          <div id="descripWeatherNextNext" class="weather">
            ${data.forecast.forecastday[2].day.condition.text}
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById("data").innerHTML = cartona;
}
