

$(document).ready(function(){
	var location = "http://ip-api.com/json";
	var icon = {
			"01d":"http://res.cloudinary.com/ursularodgers/image/upload/v1497548615/clear_veedxb.png",
			"01n":"http://res.cloudinary.com/ursularodgers/image/upload/v1497548624/clear_night_l8auqv.png",
			"02d":"http://res.cloudinary.com/ursularodgers/image/upload/v1497548687/mostly_sunny_p4w0ea.png",
			"02n":"http://res.cloudinary.com/ursularodgers/image/upload/v1497548656/mostly_clear_ohl3bn.png",
			"03d":"http://res.cloudinary.com/ursularodgers/image/upload/v1497608234/partly_cloudy_svq0gr.png",
			"03n":"http://res.cloudinary.com/ursularodgers/image/upload/v1497608255/partly_cloudy_night_cmijxe.png",
			"04d":"http://res.cloudinary.com/ursularodgers/image/upload/v1497548694/mostly_cloudy_zoqemw.png",
			"04n":"http://res.cloudinary.com/ursularodgers/image/upload/v1497548700/mostly_cloudy_night_auhctf.png",
			"09d":"http://res.cloudinary.com/ursularodgers/image/upload/v1497548887/heavy_rain_h3qvka.png",
			"09n":"http://res.cloudinary.com/ursularodgers/image/upload/v1497548887/heavy_rain_h3qvka.png",
			"10d":"http://res.cloudinary.com/ursularodgers/image/upload/v1497548632/rain_berklr.png",
			"10n":"http://res.cloudinary.com/ursularodgers/image/upload/v1497548632/rain_berklr.png",
			"11d":"http://res.cloudinary.com/ursularodgers/image/upload/v1497548720/t-storm_qh6ik9.png",
			"11n":"http://res.cloudinary.com/ursularodgers/image/upload/v1497548720/t-storm_qh6ik9.png",
			"13d":"http://res.cloudinary.com/ursularodgers/image/upload/v1497548922/light_snow_e7bmtt.png",
			"13n":"http://res.cloudinary.com/ursularodgers/image/upload/v1497548922/light_snow_e7bmtt.png",
			"50d":"http://res.cloudinary.com/ursularodgers/image/upload/v1497548602/fog_ivas6z.png",
			"50n":"http://res.cloudinary.com/ursularodgers/image/upload/v1497548602/fog_ivas6z.png"	
		};
	$.ajax({
		url:location,
		dataType:'json',
		async:false,
		cache:false,
		success:function(data){
			var d = new Date();
			var lat = data.lat;
	    	var lon = data.lon;
	    	var weather = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=8d1dab70d6486ad4b46fe911084f46af";
	    	var forecast = "http://api.openweathermap.org/data/2.5/forecast/daily?lat=" + lat + "&lon=" + lon + "&cnt=7&appid=8d1dab70d6486ad4b46fe911084f46af";
	    	$("#location").html(data.city + ", " + data.countryCode);
	    	$("#currentDate").html(d.toDateString());
			$.ajax({
	    		url:weather,
	    		dataType:'json',
	    		async:false,
	    		cache:false,
	    		success:function(conditions){
	    			if (icon[conditions.weather[0].icon]){
	        			$("#currentWeather").attr("src", icon[conditions.weather[0].icon]);
	        		}
	    			var kelvin = conditions.main.temp;
	    			var kelvinMax = conditions.main.temp_max;
	    			var kelvinMin = conditions.main.temp_min;
	        		var celsius = Math.round(kelvin - 273);
	        		var celsiusMax = Math.round(kelvinMax - 273);
	        		var celsiusMin = Math.round(kelvinMin - 273);
	       	 		var fahr = Math.round((kelvin)*(9/5)-459.67);
	       	 		var fahrMax = Math.round((kelvinMax)*(9/5)-459.67);
	       	 		var fahrMin = Math.round((kelvinMin)*(9/5)-459.67);
	        		$("#fahrenheit").click(function(){
	        			$("#currentTemp").html(fahr);
	       	 			$("#fahrenheit").css("color", "black");
	        			$("#celsius").css("color", "grey");
		        		$(".celsius").hide();
		        		$(".fahr").show();
	        		});
	        		$("#celsius").click(function(){
	            		$("#currentTemp").html(celsius);
	            		$("#celsius").css("color", "black");
	           			$("#fahrenheit").css("color", "grey");
		        		$(".celsius").show();
		        		$(".fahr").hide();
	        		});
	        		$("#description").html(conditions.weather[0].description);
	        		$("#currentWind").html(conditions.wind.speed + " mph");
	        		$("#currentHumidity").html(conditions.main.humidity);
	        		$("#currentTemp").html(celsius);
	        		$("#highC").html("HIGH " + celsiusMax);
	        		$("#highF").html("HIGH " + fahrMax).hide();
	        		$("#lowC").html("LOW " + celsiusMin);
	        		$("#lowF").html("LOW " + fahrMin).hide();
	        		
	    		}
			});//end of first call
			$.ajax({
				url:forecast,
				dataType: 'json',
				async:false,
				cache:false,
				success: function(lookAhead){
					var expected = lookAhead.list;
					
    				for (var i = 1; i < expected.length; i++) {
    					var celsiusHigh = "#day" + i + "highC";
    					var fahrHigh = "#day" + i + "highF";
        				var celsiusLow = "#day" + i + "lowC";
        				var fahrLow = "#day" + i + "lowF";
        				var weatherIcon = "#weatherIcon" + i;
        				var kelvinMax = expected[i].temp.max;
        				var kelvinMin = expected[i].temp.min;
        				celsiusMax = Math.round(kelvinMax - 273);
            			var fahrMax = Math.round((kelvinMax)*(9/5)-459.67);
            			var celsiusMin = Math.round(kelvinMin - 273);
            			var fahrMin = Math.round((kelvinMin)*(9/5)-459.67);
            			var dayIndex = "#d" + i;
            			var dayOfWeek = new Date(expected[i].dt*1000);
    					var dayOfWeekStr = (dayOfWeek.toDateString()).substring(0,3);
    					$(celsiusHigh).html(celsiusMax + "&#8451");
    					$(fahrHigh).html(fahrMax + "&#8457").hide();
    					$(celsiusLow).html(celsiusMin + "&#8451");
    					$(fahrLow).html(fahrMin + "&#8457").hide();
    					$(dayIndex).html(dayOfWeekStr);
    					if (icon[expected[i].weather[0].icon]){
    	        			$(weatherIcon).attr("src", icon[expected[i].weather[0].icon]);
    	        		}
    				}
    				
    				
    				
    			}
    		});
				
        }
    });	
});