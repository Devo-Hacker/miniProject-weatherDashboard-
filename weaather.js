 const apiKey = "59455a91951625afcd93d655aa331cbb";
        const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

        const searchBox = document.querySelector("[data-search] input");
        const searchBtn = document.querySelector("[data-search] button");
        const weatherIcon = document.querySelector("[data-weather-icon]");

        async function checkWeather(city){
            const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
            var data = await response.json();

            document.querySelector("[data-city]").innerHTML = data.name;
            document.querySelector("[data-temp]").innerHTML = data.main.temp +"°C";
            document.querySelector("[data-humidity]").innerHTML = data.main.humidity + "%";
            document.querySelector("[data-wind]").innerHTML = data.wind.speed +"km/h";

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
        }

        searchBtn.addEventListener("click", ()=>{
            checkWeather(searchBox.value);
        })

        searchBox.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
        checkWeather(searchBox.value);
        }
        });
        