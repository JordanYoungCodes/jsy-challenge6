



const apikey = "d3ea21122600c5ec891d278316d323ee"
function geo(city) {
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=3&appid=${apikey}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            weather(data[0].lat, data[0].lon)
            fetchWeatherForecast(data[0].lat, data[0].lon)
        })
}

function weather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            // const directionB = windDirection().value
            document.querySelector("#citylabel").textContent = data.name

            let date2 = dayjs.unix(data.dt).format("dddd MMMM D")
            document.querySelector("#TDdate").textContent = date2

            document.querySelector("#tdicon").textContent = "Conditions:" + " " + data.weather[0].description
            document.querySelector("#tdtemp").textContent = "Temp:  " + ((data.main.temp - 273) * (9 / 5) + 32).toFixed(2) + " °F"
            document.querySelector("#tdwind").textContent = "wind speed:  " + data.wind.speed + "  MPH" + " " + windDirection(data.wind.deg)
            document.querySelector("#tdhumid").textContent = "humidity:  " + data.main.humidity
            console.log(data.dt)
        })
}

function fetchWeatherForecast(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}`)
        .then(response => response.json())
        .then(data => {
            const weatherCards = document.querySelectorAll(".weatherCard");
            const forecastIndices = [4, 12, 20, 28];
            let step = 0;
            forecastIndices.forEach(index => {
                if (index < data.list.length) {
                    const weatherData = data.list[index];
                    const weatherCard = weatherCards[step];

                    if (weatherCard.textContent) {
                        weatherCard.textContent = " ";
                    }

                    // Calculate formatted date for each weatherData entry
                    let formatteddate = dayjs.unix(weatherData.dt).format("dddd MMMM D");

                    // Use formatteddate instead of weatherData.dt_txt
                    const dateItem = createWeatherListItem(formatteddate);
                    const tempItem = createWeatherListItem(`Temp: ${convertKelvinToFahrenheit(weatherData.main.temp)} °F`);
                    const windItem = createWeatherListItem(`Wind Speed: ${weatherData.wind.speed} MPH` + " " + windDirection(weatherData.wind.deg));
                    const humidityItem = createWeatherListItem(`Humidity: ${weatherData.main.humidity}`);
                    const iconItem = createWeatherListItem(`Conditions: ${weatherData.weather[0].description}`);

                    weatherCard.append(dateItem, iconItem, tempItem, windItem, humidityItem);
                    step++;
                }
            });
        })
        .catch(error => console.error('Error fetching weather forecast:', error));
    }

function createWeatherListItem(text) {
    const listItem = document.createElement("li");
    listItem.textContent = text;
    return listItem;
}

function convertKelvinToFahrenheit(kelvin) {
    return ((kelvin - 273.15) * 9/5 + 32).toFixed(2);
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


// Function to update the city list in local storage
function updateCityList(city) {
    const cityArray = JSON.parse(localStorage.getItem("lsCityArray")) || [];
    if (cityArray.length >= 5) {
        cityArray.shift(); // Remove the oldest city if there are already 5
    }
    cityArray.push(city);
    localStorage.setItem("lsCityArray", JSON.stringify(cityArray));
}

// Function to show the last 5 cities as a dropdown
function showLastCities() {
    const cityArray = JSON.parse(localStorage.getItem("lsCityArray")) || [];
    const cityList = document.createElement('ul');
    cityList.id = 'cityList';
    cityArray.forEach(city => {
        const cityItem = document.createElement('li');
        cityItem.textContent = city;
        cityItem.addEventListener('click', function() {
            document.getElementById('input').value = city;
            cityList.remove(); // Remove the list after selection
        });
        cityList.appendChild(cityItem);
    });
    return cityList;
}

// Add event listeners to the input area
const inputArea = document.getElementById('input');
inputArea.addEventListener('focus', function() {
    const cityList = showLastCities();
    inputArea.parentElement.appendChild(cityList);
});

inputArea.addEventListener('blur', function() {
    setTimeout(() => {
        const cityList = document.getElementById('cityList');
        if (cityList) {
            cityList.remove();
        }
    }, 200); // Delay to allow click event to register
});


// Update the city list when a new city is submitted
document.querySelector("#input").addEventListener("click", function () {
    const cityValue = document.getElementById("input").value;
    geo(cityValue);
    updateCityList(cityValue);
});