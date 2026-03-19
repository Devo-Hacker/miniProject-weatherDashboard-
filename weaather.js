const apiKey = "59455a91951625afcd93d655aa331cbb";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector("[data-search] input");
const searchBtn = document.querySelector("[data-search] button");
const weatherIcon = document.querySelector("[data-weather-icon]");

async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status == 404){
        document.querySelector("[data-error]").style.display = "block";
        document.querySelector("[data-weather]").style.display = "none";
    }
    else{
        var data = await response.json();

        document.querySelector("[data-city]").innerHTML = data.name;
        document.querySelector("[data-temp]").innerHTML = data.main.temp +"°C";
        document.querySelector("[data-humidity]").innerHTML = data.main.humidity + "%";
        document.querySelector("[data-wind]").innerHTML = data.wind.speed +"km/h";
        document.querySelector("[data-humidity-box]").innerHTML = data.main.humidity + "%";
        document.querySelector("[data-wind-box]").innerHTML = data.wind.speed + " km/h";

        const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
        const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();

        document.querySelector("[data-sunrise]").innerHTML = sunrise;
        document.querySelector("[data-sunset]").innerHTML = sunset;

        if(data.weather[0].main == "Clouds"){
            weatherIcon.src = "images/clouds.png"; 
        }
        else if(data.weather[0].main == "Clear"){
            weatherIcon.src = "images/clear.png"; 
        }
        else if(data.weather[0].main == "Rain"){
            weatherIcon.src = "images/rain.png"; 
        }
        else if(data.weather[0].main == "Drizzle"){
            weatherIcon.src = "images/drizzle.png"; 
        }
        else if(data.weather[0].main == "Mist"){
            weatherIcon.src = "images/mist.png"; 
        }

        document.querySelector("[data-weather]").style.display = "block";
        document.querySelector("[data-error]").style.display = "none";
    }
}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})

searchBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        checkWeather(searchBox.value);
    }
});