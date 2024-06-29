

const weatherCard = document.querySelectorAll(".weatherCard")
const conditionsArray = [0, 12, 20, 28]

for(i = 0; i < conditionsArray.length; i++) {
    const date1 = document.createElement("li")
    const temp1 = document.createElement("li")
    const wind1 = document.createElement("li")
    const humd1 = document.createElement("li")
    weatherCard[i].appendChild(date1)
    weatherCard[i].appendChild(temp1)
    weatherCard[i].appendChild(wind1)
    weatherCard[i].appendChild(humd1)
    date1.textContent = data.list[i].dt_txt
    temp1.textContent =  "Temp:  " + ((data.list[i].main.temp - 273) * (9 / 5) + 32).toFixed(2) + " Farenheight"
    wind1.textContent = "wind speed:  " + data.list[i].wind.speed + "  MPH"
    humd1.textContent =  "humidity:  " + data.list[i].main.humidity
}





const cityArray = JSON.parse(localStorage.getItem("lsCityArray")) || [];
cityArray.length = 10
cityArray.push(cityValue)
localStorage.setItem("lsCityArray", JSON.stringify(cityArray))