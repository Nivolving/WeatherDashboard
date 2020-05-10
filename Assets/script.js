$( document ).ready(function() {
    //console.log('hello');

    var lat;
    var lon;
    var city;
    var myresponse ;
    var cityName;
    var cityTemperature;
    var humidity;
    var windSpeed

    $('#searchBtn').on('click',function(){

        event.preventDefault();

        //console.log("heloo");
        city = $('#inputCity') .val();
        fetchForecast(city);
        
        fetchUV();
        renderForecast(city);


        function convertToF(temperature) 
    
        {
                //console.log(celsius )
                let fahrenheit = Math.round((temperature-273.15) * 9/5 + 32);
                //console.log(fahrenheit)
                // return the variable fahrenheit as the answer
                return fahrenheit;
        }
        
        
        
        function fetchForecast(value)
        {
            var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid=bfca03004ceea2ea6bcd069a361cb91e";
            
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) 
            {
                console.log(response);
                myresponse = response;
                
                console.log((response.dt)*1000)
                lat = response.coord.lat;
                lon = response.coord.lon;
                cityName = myresponse.name;
                cityTemperature = convertToF(myresponse.main.temp);
                humidity = myresponse.main.humidity;
                windSpeed = myresponse.wind.speed

                                 
            });

        }

        function fetchUV()
        {

            var uvIndex = "http://api.openweathermap.org/data/2.5/uvi?appid=bfca03004ceea2ea6bcd069a361cb91e&lat=" + lat + "&lon=" + lon;

            
            $.ajax({
                url: uvIndex,
                method: "GET"
            }).then(function(response) {


  
    
                var uvi = response.value;
                //console.log(uvi);
        
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
            }
        

        )};

            
       function renderForecast(value)
        
        {
            $("#heading").html(cityName);
            $('#temperature').html("Temperature: " + cityTemperature + "°F");
            $('#humidity').html("Humidity: " + humidity);
            $('#Windspeed').html("Wind Speed: " + windSpeed);
            
        } 
    });



    
   
 


});