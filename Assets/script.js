$( document ).ready(function() {
    //console.log("ready");
    
    $('#searchBtn').click(function(){
        event.preventDefault();
        var city = $('#inputCity').val();
        var apikey = "bfca03004ceea2ea6bcd069a361cb91e";
        localStorage(city);


        /* function localStorage(value){

            const searchHistory = [];
            var searchItem = $('#inputCity').val();
            localStorage.setItem("search",searchItem)
            searchHistory.push(searchItem);


        }
 */
        //console.log(city);
        function convertToF(temperature) {
                //console.log(celsius )
                let fahrenheit = Math.round((temperature-273.15) * 9/5 + 32);
                //console.log(fahrenheit)
                // return the variable fahrenheit as the answer
                return fahrenheit;
        }

        /* function toConvertDate(){

           

        } */

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid="+ apikey;
            
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(weatherdata) 
        {
            var date = weatherdata.dt;
            var myDate = new Date( date *1000);
            var newDate = myDate.toLocaleDateString('en-US');
            //console.log(newDate)
            

            var lat = weatherdata.coord.lat;
            var lon = weatherdata.coord.lon;

            /*api call for the UV Index*/
            var uvIndex = "http://api.openweathermap.org/data/2.5/uvi?appid=bfca03004ceea2ea6bcd069a361cb91e&lat=" + lat + "&lon=" + lon;
            
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

            var fiveDayForecast = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apikey;
            $.ajax({
                url: fiveDayForecast,
                method: "GET"
            }).then(function(fiveday) {

                 // console.log(fiveday.list)
                   /*console.log(fiveday.list[8])
                   console.log(fiveday.list[16])
                   console.log(fiveday.list[24])
                   console.log(fiveday.list[32]) */
                   /* var containerDisplay = $('<div>').addClass('container');
                   containerDisplay.attr('id', 'myContainer');
                   $('#forecastcard').append(containerDisplay); */


                   var displayCard = $('<div>').addClass('row');
                   displayCard.attr('id', 'fivedaydisplay');
                   $('#forecastcard').append(displayCard);

                 
                   
                    for(var i=0; i<fiveday.list.length; i = i+8)
                   {
                       //console.log(i);
                       
                       
                       var myCol = $('<div>').addClass('col forecast bg-primary text-white rounded border border-primary')
                       myCol.attr('id','nextfivedays')
                       $('#fivedaydisplay').append(myCol);
                       thisDate = fiveday.list[i].dt_txt;
                       /* var fiveDate = new Date( thisDate *1000);
                       var finalDate = fiveDate.toLocaleDateString('en-US'); */
                       myCol.append(thisDate)
                       //console.log(thisDate);
                       myCol.append("Temp: " + convertToF(fiveday.list[i].main.temp) + 'F');
                       //console.log(convertToF(fiveday.list[i].main.temp));
                       myCol.append("Humidity:" + fiveday.list[i].main.humidity + '%');
                       //console.log(fiveday.list[i].main.humidity);
                       displayCard.append(myCol)
                     } 

            });
            
            cityName = weatherdata.name;
            cityTemperature = convertToF(weatherdata.main.temp);
            humidity = weatherdata.main.humidity;
            windSpeed = weatherdata.wind.speed
            $("#heading").html(cityName+ ' ' + '('+newDate+')');
            $('#temperature').html("Temperature: " + cityTemperature + "°F");
            $('#humidity').html("Humidity: " + humidity + "%");
            $('#Windspeed').html("Wind Speed: " + windSpeed + " MPH");

        });
        
            
    });
});





