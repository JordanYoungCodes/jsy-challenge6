



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
            // const directionB = windDirection().value
            document.querySelector("#citylabel").textContent = data.name

            let date2 = dayjs.unix(data.dt).format("DD/MM/YYYY")
            document.querySelector("#TDdate").textContent = date2

            document.querySelector("#tdicon").textContent = data.weather[0].description
            document.querySelector("#tdtemp").textContent = "Temp:  " + ((data.main.temp - 273) * (9 / 5) + 32).toFixed(2) + " Farenheight"
            document.querySelector("#tdwind").textContent = "wind speed:  " + data.wind.speed + "  MPH" + " " + windDirection(data.wind.deg)
            document.querySelector("#tdhumid").textContent = "humidity:  " + data.main.humidity
            console.log(data.dt)
        })
}

function weather2(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}`)
        .then(response => response.json())
        .then(data => {
            const weatherCard = document.querySelectorAll(".weatherCard")
            // const conditionsArray = [4, 12, 20, 28]
            let step = 0
            for (let i = 0; i < data.list.length; i++) {
                if (i === 4 || i === 12 || i === 20 || i === 28) {
                       if(weatherCard[step].textContent) {
                        weatherCard[step].textContent = " "
                       }
                    const date1 = document.createElement("li")
                    const temp1 = document.createElement("li")
                    const wind1 = document.createElement("li")
                    const humd1 = document.createElement("li")
                    const icon1 = document.createElement("li")
                    weatherCard[step].appendChild(date1)
                    weatherCard[step].appendChild(icon1)
                    weatherCard[step].appendChild(temp1)
                    weatherCard[step].appendChild(wind1)
                    weatherCard[step].appendChild(humd1)
                    
                    date1.textContent = data.list[i].dt_txt
                    temp1.textContent = "Temp:  " + ((data.list[i].main.temp - 273) * (9 / 5) + 32).toFixed(2) + " Farenheight"
                    wind1.textContent = "wind speed:  " + data.list[i].wind.speed + "  MPH"
                    humd1.textContent = "humidity:  " + data.list[i].main.humidity
                    icon1.textContent = data.list[i].weather[0].description
                        step += 1;console.log(data.list[i].weather[0].description)
                }

                
            }

        })
}



function windDirection(dir) {
    let direction
    if (dir >= 315 || (dir >= 0 && dir < 45)) {
        direction = "North"
    } else if (dir >= 45 && dir < 135) {
        direction = "East"
    } else if (dir >= 135 && dir < 225) {
        direction = "South"
    } else {
        direction = "West"

    }
    console.log(direction)
    return direction;
}


document.querySelector(".city").addEventListener("click", function () {
    const cityValue = document.getElementById("input").value
    geo(cityValue)
    const cityArray = JSON.parse(localStorage.getItem("lsCityArray")) || [];
    if (cityArray.length > 10) {
        cityArray.length = 10
    }

    cityArray.push(cityValue)
    localStorage.setItem("lsCityArray", JSON.stringify(cityArray))
})

