var weatherCards = document.getElementById('weatherCards');
var getWeatherBtn = document.getElementById('getWeather');
var city = document.getElementById('inputCity');
var APIKey = "385978d94fcfbfed39d6f1fa9a036cef";
var h2 = document.getElementById("hide");

function getApi() {

    var requestUrl = "http://api.openweathermap.org/data/2.5/forecast?units=imperial&q=" + city.value + "&appid=" + APIKey;


    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)

            for (var i = 0; i < data.list.length; i+=8) {

                var cardInfo = document.createElement('div');
                var cardDate = document.createElement('h3');
                var cardIcon = document.createElement('img');
                var cardTemp = document.createElement('p');
                var cardDescription = document.createElement('p');
                var cardWind = document.createElement('p');
                var cardHumid = document.createElement('p');

                h2.style.visibility = "visible";	

                cardInfo.classList.add('cardInfo');
                cardDate.classList.add('cardDate');
                cardIcon.classList.add('cardIcon');
                cardTemp.classList.add('cardTemp');
                cardDescription.classList.add('cardList');
                cardWind.classList.add('cardWind');
                cardHumid.classList.add('cardHumid');

                cardIcon.src = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png";
                cardDate.textContent = moment(data.list[i].dt * 1000).format("dddd, MMMM Do YYYY");
                cardTemp.innerHTML = data.list[i].main.temp + " <i class='fas fa-temperature-low'></i>";
                cardDescription.innerHTML = data.list[i].weather[0].description;
                cardWind.innerHTML = data.list[i].wind.speed + (" mph ") + " <i class='fas fa-wind'></i>";
                cardHumid.innerHTML = data.list[i].main.humidity + (" % humidity ");

                cardInfo.append(cardIcon, cardDate, cardTemp, cardDescription, cardWind, cardHumid);
                weatherCards.appendChild(cardInfo);
            }
        });
}

getWeatherBtn.addEventListener('click', getApi)