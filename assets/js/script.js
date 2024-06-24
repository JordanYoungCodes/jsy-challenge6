
// const modalHeader = document.querySelector(".modalHeader");
// const modal2 = document.querySelector("#modal2");
// const weather1 = document.createElement("h3");
// $(document).ready(function () {
//     $('.modal').modal();
// });

const apikey = "8f0fa8364b82a56ff6b29b97a2963b6e"
function geo(city) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=3&appid=${apikey}`)
        .then(response => response.json())
        .then(potato => {
            console.log(potato)
            weather(potato[0].lat, potato[0].lon)
            weather2(potato[0].lat, potato[0].lon)
        })
}

function weather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            // const directionB = windDirection(data.wind.deg).value
            document.querySelector("#citylabel").textContent = data.name
            document.querySelector("#TDdate").textContent = data.dt
            document.querySelector("#tdicon").textContent = data.weather[0].icon
            document.querySelector("#tdtemp").textContent = "Temp:  " + ((data.main.temp - 273) * (9 / 5) + 32).toFixed(2) + " Farenheight"
            document.querySelector("#tdwind").textContent = "wind speed:  " + data.wind.speed + "  MPH"
            document.querySelector("#tdhumid").textContent = "humidity:  " + data.main.humidity
            console.log(data.wind.deg)
        })
}
const conditionsArray = [0, 12, 20, 28]
function weather2(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            document.querySelector("#Tdate1").textContent = data.list[0].dt_txt
            document.querySelector("#ticon1").textContent = data.list[0].icon
            document.querySelector("#ttemp1").textContent = "Temp:  " + ((data.list[0].main.temp - 273) * (9 / 5) + 32).toFixed(2) + " Farenheight"
            document.querySelector("#twind1").textContent = "wind speed:  " + data.list[0].wind.speed + "  MPH"
            document.querySelector("#thumid1").textContent = "humidity:  " + data.list[0].main.humidity

        })
}


function windDirection(dir) {
  let direction
    if (dir >= 315 || (dir >= 0 && dir < 45)) {
        direction = "North"
    } else if (dir >= 45 && dir < 135) {
        direction = "East"
    } else if (dir >= 135 && dir < 225){
        direction = "South"
    } else {
        direction = "West"
        
    }
}


document.querySelector(".city").addEventListener("click", function () {
    const cityValue = document.getElementById("input").value
    geo(cityValue)
})

// const weatherObj = {
//     date: " ",
//     temp: " ",
//     wind: " ",
//     himidity: " ",
//     icon: " ",
// }
// // weatherObj.temp = data.main.temp

// function ktoc(){
//     let k = data.main.temp
//     const fa = (k - 273) * (9 / 5) -32
// }