//array to store the cities, use it for the api
//you can change the city here, and it will get all the correct data
//will also change everything in the html
var cities = ['Lakeland', 'Miami', 'Orlando', 'Omaha'];
// api key variable
var apiKey = "5053359f9344aa9c3b256a5d2928bd2a";
// useing a forEach to call my getCurrentWeather function 
// runs for each item in the cities array above. 
cities.forEach(getCurrentWeather);
//getCurrentWeather funciton.. 
//this function will get the data from the openweather api 
//based on the city. 
function getCurrentWeather(city, index){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cities[index]}&units=imperial&appid=${apiKey}`
    ).then(response => response.json())
    .then(function (data) {

        document.getElementById(`city${index}`).innerText = city;
        document.getElementById(`currentWeather${index}`).innerHTML = `${data.weather[0].main}: ${data.main.temp}&#8457;` 

        var forecastID = data.weather[0].id;
        var icon = document.getElementById(`icon${index}`);
        var modalBtn = document.getElementById(`btnModal${index}`);

        modalBtn.dataset.city = city;
        
        icon.classList.add(weatherIcon(forecastID)); 
    }
        )
}
// function used to determine correct bootstrap icon based on id from api
function weatherIcon(weatherID){
    if(weatherID>=200 && weatherID <=232){
         return "bi-cloud-lightning"
     }
     else if(weatherID >= 300 && weatherID <= 321){
         return "bi-cloud-rain"
     }
     else if(weatherID >= 500 && weatherID <= 531){
         return "bi-cloud-rain-heavy"
     }
     else if(weatherID >= 600 && weatherID <= 622){
         return "bi-cloud-snow"
     }
     else if(weatherID >= 700 && weatherID <= 771){
         return "bi-cloud-fog"
     }
     else if(weatherID == 781){
         return "bi-tornado"
     }
     else if(weatherID == 800 ){
         return "bi-sun"
      }
     else if(weatherID >= 801 && weatherID <= 804){
         return "bi-cloudy"
     }
     else{
         return "bi-patch-question"
     }
}
// function to retrieve the seven day forecast in the modal
function sevenDayForecast(city){
    // first fetch is used to retrieve the lon and lat for the city
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
    ).then(response => response.json())
    .then(function (data) {

        // nested fetch to retrieve seven day forecast
        fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=hourly,minutely,alerts&units=imperial&appid=${apiKey}`
        ).then(response2 => response2.json())
        .then(function (data2) {

           document.getElementById("modal-title").innerText = `Forecast for ${city}`;
           
           for(var i = 1; i <= 7; i++){
               console.log(i)
               document.getElementById(`day${i}`).innerHTML = `
               <i class="bi ${weatherIcon(data2.daily[i].weather[0].id)} me-3"></i>
               ${data2.daily[i].temp.max}&#8457; / ${data2.daily[i].temp.min}&#8457; - ${data2.daily[i].weather[0].main}, ${data2.daily[i].wind_speed} mph wind
               `
           }
        })
    })
}

