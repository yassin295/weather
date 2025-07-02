var apiKey = "26c2c59a17e54ff7b8c150838253006 "; 

  var searchBtn = document.getElementById("searchBtn");
  var input = document.getElementById("cityInput");
  var card = document.getElementById("mainCard");
  var row = document.getElementById("forecastRow");

document.addEventListener("DOMContentLoaded", () => {
  searchBtn.addEventListener("click", handleSearch);
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleSearch();
  });
});

async function handleSearch() {
  var city = document.getElementById("cityInput").value.trim();
  if (!city) return alert("Please enter a city name");

  try {
    var res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`);
    if (!res.ok) throw new Error("City not found");
    var data = await res.json();
    updateMainCard(data);
    updateForecast(data.forecast.forecastday);
  } catch (err) {
    alert(err.message);
  }
}

function updateMainCard(data) {
  var current = data.current;
  var location = data.location;

  card.innerHTML = `
    <div class="d-flex justify-content-between align-items-center">
      <div>
        <h2>${location.name}, ${location.country}</h2>
        <h4>${location.localtime.split(" ")[1]}</h4>
        <h1>${current.temp_c}°C</h1>
        <p>${current.condition.text}</p>
        <p> ${current.humidity}%  | ${current.wind_kph} kph | UV: ${current.uv}</p>
      </div>
      <img src="https:${current.condition.icon}" alt="weather icon" />
    </div>
  `;
}

function updateForecast(days) {
  row.innerHTML = "";

  days.forEach((day) => {
    var date = new Date(day.date);
    var dayName = date.toLocaleDateString("en-US", { weekday: "long" });

    row.innerHTML += `
      <div class="col-md-4">
        <div class="forecast-card">
          <h5>${dayName}</h5>
          <img src="https:${day.day.condition.icon}" alt="icon" />
          <p>${day.day.avgtemp_c}°C</p>
          <small>${day.day.condition.text}</small>
        </div>
      </div>
    `;
  });
}
