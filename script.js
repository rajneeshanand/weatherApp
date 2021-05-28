
//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
//c66f1484f9f6deeeeec42c76bd3c36fc

const weatherApi={
    key: "c66f1484f9f6deeeeec42c76bd3c36fc",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather"
}
const searchinputbox = document.getElementById('inputbox');
console.log(searchinputbox);
//document.addEventListener('DOMContentLoaded',function(){
    
searchinputbox.addEventListener('keypress',(event) =>  {
    if(event.keyCode == 13){
    console.log(searchinputbox.value);
    getweather(searchinputbox.value);
    }
});
//},false);

function getweather(city){
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(weather=>{
        return weather.json();
    }).then(showweather);
}
function showweather(weather){
    console.log(weather);
    let city=document.getElementById('city');
    city.innerText=`${weather.name}, ${weather.sys.country}`;

    let tempr=document.getElementById('temp');
    tempr.innerHTML= `${weather.main.temp}&deg;C`;
    let minmax = document.getElementById('min-max');
    minmax.innerHTML =`${Math.floor(weather.main.temp_min)}&deg;C (min)/ ${Math.ceil(weather.main.temp_max)}&deg;C (max)`;

    let feeltemp=document.getElementById('feels');
    feeltemp.innerHTML= `feels-like: ${weather.main.feels_like}&deg;C`;

    let winds =document.getElementById('wind');
    winds.innerHTML= `wind speed: ${weather.wind.speed} mps`;

    let weathertype=document.getElementById('weather');
    weathertype.innerText = `${weather.weather[0].main}`;
    let date =document.getElementById('date');
    let todaydate=new Date();
    date.innerText=datemanage(todaydate);
    if(weathertype.textContent=='Clear'){
        document.body.style.backgroundImage="url('images/3.jpg')";

    }else if(weathertype.textContent=='Clouds'){
        document.body.style.backgroundImage="url('images/2.jpg')";

    }else if(weathertype.textContent=='Rain'){
        document.body.style.backgroundImage="url('images/1.jpg')";

    }else if(weathertype.textContent=='Snow'){
        document.body.style.backgroundImage="url('images/1.png')";

    } else if(weathertype.textContent=='Thunderstorm'){
        document.body.style.backgroundImage="url('images/5.jpg')";

    }else if(weathertype.textContent=='Haze'){
        document.body.style.backgroundImage="url('images/4.jpg')";

    }
}
function datemanage(datearg){
    let days=["sunday","monday","tuesday","wednesday","thrusday","friday","saturday"];
    let months=["January","February","March","April","May","June","July","August","September","October","November","December"];
    let year=datearg.getFullYear();
    let month=months[datearg.getMonth()];
    let date =datearg.getDate();
    let day =days[datearg.getDay()];
    return `${date} ${month} (${day}) ${year}`;
}
