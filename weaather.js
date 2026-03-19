const apiKey = "9d0d7e3ec5994c62ba592323261903";
const apiUrl = "https://api.weatherapi.com/v1/forecast.json?key=" + apiKey + "&q=";

const searchBox = document.querySelector("[data-search] input");
const searchBtn = document.querySelector("[data-search] button");
const weatherIcon = document.querySelector("[data-weather-icon]");

async function checkWeather(city){
    const response = await fetch(apiUrl + city + "&days=7&aqi=yes");

    const data = await response.json();

    if(data.error){
        document.querySelector("[data-error]").style.display = "block";
        document.querySelector("[data-weather]").style.display = "none";
        return;
    }

    document.querySelector("[data-city]").innerHTML = data.location.name;
    document.querySelector("[data-temp]").innerHTML = data.current.temp_c + "°C";
    document.querySelector("[data-humidity]").innerHTML = data.current.humidity + "%";
    document.querySelector("[data-wind]").innerHTML = data.current.wind_kph + " km/h";
    document.querySelector("[data-humidity-box]").innerHTML = data.current.humidity + "%";
    document.querySelector("[data-wind-box]").innerHTML = data.current.wind_kph + " km/h";

    document.querySelector("[data-uv]").innerHTML = data.current.uv;

    document.querySelector("[data-air]").innerHTML =
        Math.round(data.current.air_quality.pm2_5);

    document.querySelector("[data-sunrise]").innerHTML =
        data.forecast.forecastday[0].astro.sunrise;

    document.querySelector("[data-sunset]").innerHTML =
        data.forecast.forecastday[0].astro.sunset;

    const condition = data.current.condition.text.toLowerCase();

    if(condition.includes("cloud")){
        weatherIcon.src = "images/clouds.png";
    }
    else if(condition.includes("clear") || condition.includes("sunny")){
        weatherIcon.src = "images/clear.png";
    }
    else if(condition.includes("rain")){
        weatherIcon.src = "images/rain.png";
    }
    else if(condition.includes("drizzle")){
        weatherIcon.src = "images/drizzle.png";
    }
    else if(condition.includes("mist") || condition.includes("fog")){
        weatherIcon.src = "images/mist.png";
    }

    const forecastBox = document.querySelector("[data-forecast]");
    forecastBox.innerHTML = "";

    data.forecast.forecastday.forEach(day => {
        const date = new Date(day.date).toLocaleDateString("en-US",{weekday:"short"});
        forecastBox.innerHTML += `
            <div class="flex justify-between text-sm">
                <span>${date}</span>
                <span>${day.day.mintemp_c}° / ${day.day.maxtemp_c}°</span>
            </div>
        `;
    });

    document.querySelector("[data-weather]").style.display = "block";
    document.querySelector("[data-error]").style.display = "none";
}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        checkWeather(searchBox.value);
    }
});