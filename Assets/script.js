$(document).ready(function(){
 
    var apikey = "bfca03004ceea2ea6bcd069a361cb91e";
    var citySearchArray = JSON.parse(localStorage.getItem('cities')) || [];

    listCities();

    $('#searchBtn').click(function(){
        event.preventDefault();
        var city = $('#inputCity').val();
        console.log(city);
        if (city == '')
        {
           alert ('Please enter a valid city name');
        } else {
            fetchForeCast(city);
            toStoreLocal(city);
        }
    });

    $('.list-group-item').on('click', function() {
        fetchForeCast($(this).text());
    });

    function listCities() {
        $('#prevSearches').html('');
        for (var i = 0; i < citySearchArray.length; i++) {
            $('#prevSearches').append('<li class="list-group-item">' + citySearchArray[i] + '</li>');
        }
    }

    function convertToF(temperature) 
    {
        //console.log(celsius )
        let fahrenheit = Math.round((temperature-273.15) * 9/5 + 32);
        //console.log(fahrenheit)
        // return the variable fahrenheit as the answer
        return fahrenheit;
    }


    function fetchForeCast(city)
    {
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid="+ apikey;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(weatherdata){
            console.log(weatherdata)
            var date = weatherdata.dt;
            var myDate = new Date( date *1000);
            var newDate = myDate.toLocaleDateString('en-US');
            var weatherPic = weatherdata.weather[0].icon;
            var lat = weatherdata.coord.lat;
            console.log(weatherdata.coord.lat);
            var lon = weatherdata.coord.lon;
            cityName = weatherdata.name;
            cityTemperature = convertToF(weatherdata.main.temp);
            humidity = weatherdata.main.humidity;
            windSpeed = weatherdata.wind.speed
            $("#heading").html(cityName+ ' ' + '('+newDate+')').append($('<img>').attr('src',"https://openweathermap.org/img/wn/" + weatherPic + "@2x.png"));
            $('#temperature').html("Temperature: " + cityTemperature + "°F");
            $('#humidity').html("Humidity: " + humidity + "%");
            $('#Windspeed').html("Wind Speed: " + windSpeed + " MPH");
            fiveDayForecast(lat,lon);
            getUVIndex(lat,lon);
        });
    }

    function fiveDayForecast(lat,lon)
    {
        console.log(lat);
        var fiveDayForecast = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apikey;
            $.ajax({
                url: fiveDayForecast,
                method: "GET"
            }).then(function(fiveday){
                
                
                var containerDisplay = $('<div>').addClass('container');
                var text = $('<h3>').html("5 Day's Weather Forecast")
                $('#forecastcard').html(text).append(containerDisplay);
                
                var displayCard = $('<div>').addClass('row');
                containerDisplay.html(displayCard);

                for(var i=0; i<fiveday.list.length; i++)
                {
                    var myCol = $('<div>').addClass('col forecast bg-primary text-white rounded border border-primary mr-2');
                    const foreCastIndex = (i * 8 )+ 4;
                    //console.log(fiveday.list[i].dt);
                    var thisDate = fiveday.list[foreCastIndex].dt;
                    var myDate = new Date( thisDate *1000);
                    var foreCast = myDate.toLocaleDateString('en-US');
                    //console.log(foreCastIndex)
                    //console.log(foreCast)           
                    myCol.append($('<p>').append(foreCast).append($('<img>').attr('src',"https://openweathermap.org/img/wn/" + fiveday.list[i].weather[0].icon + "@2x.png")));
                    myCol.append($('<p>').append("Temp: " + convertToF(fiveday.list[i].main.temp) + '°F'));
                    myCol.append($('<p>').append("Humidity: " + fiveday.list[i].main.humidity + '%'));
                    displayCard.append(myCol);
                }

            });



    }

    function getUVIndex(lat,lon){

        var uvIndex = "https://api.openweathermap.org/data/2.5/uvi?appid=bfca03004ceea2ea6bcd069a361cb91e&lat=" + lat + "&lon=" + lon;
        $.ajax({
                url: uvIndex,
                method: "GET"
            }).then(function(uvindex) {
                
                var uvi = uvindex.value;
                if (uvi <= 5)
                {
                    $('#UVIndex').html("UV Index: " + uvi);
                    $('#UVIndex').addClass('badge badge-secondary');
                }
                else if(uvi > 5 && uvi < 9)
                {
                    $('#UVIndex').html("UV Index: " + uvi);
                    $('#UVIndex').addClass('badge badge-warning');
                }
                else
                {
                    $('#UVIndex').html("UV Index: " + uvi);
                    $('#UVIndex').addClass('badge badge-danger');
                } 
             });

    }

    function toStoreLocal(city) {
        var cityExists = citySearchArray.indexOf(city);
        if (cityExists === -1) {
            citySearchArray.push(city);
        }

        localStorage.setItem('cities', JSON.stringify(citySearchArray));
        listCities();
    }
});
