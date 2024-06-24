

const weatherCard = document.querySelector("class", "weatherCard")
const conditionsArray = [0, 12, 20, 28]

for(i = 0; i < conditionsArray.length; i++) {
    const date1 = document.createElement("li")
    const temp1 = document.createElement("li")
    const wind1 = document.createElement("li")
    const humd1 = document.createElement("li")
    weatherCard.append(date1)
    weatherCard.append(temp1)
    weatherCard.append(wind1)
    weatherCard.append(humd1)
    date1.textContent = data.list[i].dt_txt
    temp1.textContent =  "Temp:  " + ((data.list[i].main.temp - 273) * (9 / 5) + 32).toFixed(2) + " Farenheight"
    wind1.textContent = "wind speed:  " + data.list[i].wind.speed + "  MPH"
    humd1.textContent =  "humidity:  " + data.list[0].main.humidity
}



const cityArray = []
while(cityArray.length >= 10)
cityValue.push(cityArray)
JSON.stringify.cityArray.toLocaleStorage