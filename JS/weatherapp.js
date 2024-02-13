const inputbox= document.querySelector(".input-box");
const searchbtn = document.querySelector("#search-btn");
const weatherTemp = document.querySelector(".weather__temperature");
const weatherfeel = document.querySelector(".weather__realfeel")
const weatherForecast = document.querySelector(".weather__forecast");
const humidity = document.querySelector(".weather__humidity");
const windSpeed = document.querySelector(".weather__wind");
const pressure = document.querySelector(".weather__pressure");
const weatherIcon = document.querySelector(".weather__icon");
const tempMin = document.querySelector(".temp_min");
const tempMax = document.querySelector(".temp_max");
const cityName = document.querySelector(".weather__city")
const weatherBody = document.querySelector(".weather__body");
const weatherInfo = document.querySelector(".weather__info")
const errorMsg = document.querySelector(".error_msg")

// convertCountryCode function
function convertCountryCode(country){
    let regionNames = new Intl.DisplayNames(["en"], {type: "region"});
    return regionNames.of(country)
}

// checkWeather function
async function checkWeather(city){
    const apiKey=  "d9e6b3f796af37f643871efb3cbab44c";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
   
    const weatherData = await fetch(`${apiUrl}`).then(response => 
        response.json());

        if(weatherData.cod ==='404'){    // if city name is not found
            errorMsg.style.display="block";
            errorMsg.innerHTML = "Please enter a correct city name !";
            weatherBody.style.display = "none";
            weatherInfo.style.display = "none"
            
            console.log("error");
            return;
        }
        else if(inputbox.value == ""){     // if inputbox value is empty
            errorMsg.style.display="block";
            errorMsg.innerHTML = "Enter a city name !";
        }
        else{
            errorMsg.style.display = "none"
            weatherBody.style.display = "block";
            weatherInfo.style.display = "grid";
            weatherTemp.innerHTML=`${Math.round(weatherData.main.temp- 273.15)}°C`
            weatherForecast.innerHTML =`${weatherData.weather[0].description}`
            humidity.innerHTML = `${weatherData.main.humidity}%`
            pressure.innerHTML = `${weatherData.main.pressure} hPa`
            weatherfeel.innerHTML = `${Math.round(weatherData.main.feels_like- 273.15)}°C`
            windSpeed.innerHTML =  `${weatherData.wind.speed} m/s`
            tempMin.innerHTML = `Min : ${Math.round(weatherData.main.temp_min- 273.15)}°C`
            tempMax.innerHTML = `Max : ${Math.round(weatherData.main.temp_max- 273.15)}°C`
            cityName.innerHTML = `${weatherData.name} , ${convertCountryCode(weatherData.sys.country)}`
            weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png" alt="Weather Icon" />`;
        } 
}
// searchbtn event
searchbtn.addEventListener('click', function(){
    checkWeather(inputbox.value.trim());  
})

// search input toggle
const inputValue = document.querySelector(".search_input");
const formContainer = document.querySelector(".form");
inputValue.addEventListener("mouseover", function () {
	formContainer.classList.toggle("form_active");
});
inputValue.addEventListener("mouseout", function () {
	formContainer.classList.toggle("form_active");
});