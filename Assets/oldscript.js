$( document ).ready(function() {
    //console.log("ready");


    /*1.create an array
      2.to the array the search city name
      3.make a variable xyz = JSON.stringify(cities)-->name of the arry within paranthese
      4.localStorage.setItem("key",xyz);


      create an Array
      set the array = JSON.parse(localStorage.getItem("key"))
      
    */

    /* $('#searchBtn').click(function(){

        event.preventDefault();
        var city = $('#inputCity').val();

        callCity(city);}); 
        
        "functions Should be outside the button Clicks"
        
        function fetchForecast(value){


        }

        function uvIndex(value){


        }

        function fiveDayForecast(){

        }

        function  renderData(){


        }
    
    
    
    
    
    
    
    
    
    */
    
    $('#searchBtn').click(function(){
        event.preventDefault();
        var city = $('#inputCity').val();
        var apikey = "bfca03004ceea2ea6bcd069a361cb91e";

        //console.log(city);
        function convertToF(temperature) {
                //console.log(celsius )
                let fahrenheit = Math.round((temperature-273.15) * 9/5 + 32);
                //console.log(fahrenheit)
                // return the variable fahrenheit as the answer
                return fahrenheit;
        }
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid="+ apikey;

        
            
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(weatherdata)
        {
            //console.log(weatherdata)
            
            var date = weatherdata.dt;
            var myDate = new Date( date *1000);
            var newDate = myDate.toLocaleDateString('en-US');
            var weatherPic = weatherdata.weather[0].icon;
            //console.log(weatherPic)
      /*       var imageURL = "https://openweathermap.org/img/wn/" + weatherPic + "@2x.png"

            $.ajax({
                url: imageURL,
                method: "GET"
            }).then(function(weatherImage){ */

                //console.log(weatherImage)


            var lat = weatherdata.coord.lat;
            var lon = weatherdata.coord.lon;

            /*api call for the UV Index*/
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
             /*api call for the UV Index*/

            var fiveDayForecast = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apikey;
            $.ajax({
                url: fiveDayForecast,
                method: "GET"
            }).then(function(fiveday) {

                 console.log(fiveday.list)
                   /*console.log(fiveday.list[8])
                   console.log(fiveday.list[16])
                   console.log(fiveday.list[24])
                   console.log(fiveday.list[32]) */


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
                       
                       console.log(foreCastIndex)
                       
                      
                       
                       //console.log(foreCast)           
                       myCol.append($('<p>').append(foreCast).append($('<img>').attr('src',"https://openweathermap.org/img/wn/" + fiveday.list[i].weather[0].icon + "@2x.png")));
                       myCol.append($('<p>').append("Temp: " + convertToF(fiveday.list[i].main.temp) + '°F'))
                       myCol.append($('<p>').append("Humidity: " + fiveday.list[i].main.humidity + '%'));
                       displayCard.append(myCol);
                       
                       
                       
                     } 

                     

            });
            cityName = weatherdata.name;
            cityTemperature = convertToF(weatherdata.main.temp);
            humidity = weatherdata.main.humidity;
            windSpeed = weatherdata.wind.speed
            $("#heading").html(cityName+ ' ' + '('+newDate+')').append($('<img>').attr('src',"https://openweathermap.org/img/wn/" + weatherPic + "@2x.png"));
            $('#temperature').html("Temperature: " + cityTemperature + "°F");
            $('#humidity').html("Humidity: " + humidity + "%");
            $('#Windspeed').html("Wind Speed: " + windSpeed + " MPH");

        });


        
            
    });
});





