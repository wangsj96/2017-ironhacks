		$(document).ready(function() {

			var zipcode = window.location.search;
			zipcode = zipcode.substring(1);
			zipcode = zipcode.substring( zipcode.indexOf('=') + 1 );
			initMap(zipcode);
			getWeather(zipcode);
			getMarkets(zipcode);
		});
		
		function getWeather(zip) {
			$.ajax({
				//url: "https://www.ncdc.noaa.gov/cdo-web/api/v2/datatypes?datasetid=GHCND&locationid=ZIP:47906&startdate=2017-04-09&enddate=2017-04-09",
				url: "https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&datatypes=TOBS&locationid=ZIP:47906&startdate=2017-04-15&enddate=2017-04-15",
				headers: {token: 'kdBkZEmRPolVnxmJgdQQxthkOzoGtjaE'},
				//i am not for this part whether is correct and efficient if there is any more efficient way to manipulate data in postback function, please comment! Really appreciate!
				success: function(result) {
					resultHandler(result);
				}
			});
		}

		function resultHandler(result) {
			//console.log(result);
			for(var i = 0; i < result.results.length; i ++){
				if(result.results[i].datatype == 'TOBS') {
					console.log(result.results[i].value);
					var temp = result.results[i].value.toString().slice(0, -1) + '.' + result.results[i].value.toString().slice(-1);
					var p = $("<p>Today's temperature is <b>" + temp + "°C</b></p>");
					break;
				}
			}
			$('#weather').append(p);
		}

		//get local markets
		var markets;
		var address = new Array;

		function getMarkets(zip) {
			$.ajax({
				type: "GET",
        		contentType: "application/json; charset=utf-8",
				url: "https://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=" + zip,
				dataType: 'jsonp',
        		jsonpCallback: 'getMarketID'
			});
		}

		//get the market ids from the json response.
		function getMarketID(result) {
			//console.log(result.results);
			markets = new Array;
			var counter = 0;
			for(id in result.results) {
				markets[counter] = result.results[counter].id;
				counter ++;
			}
			//create table with market information append to div#markets
			var mytable = $("<table></table>");
			mytable.append("<tr><th>Market Name</th><th>Distance to you</th></tr>");
			for(counter = 0; counter < result.results.length; counter ++) {

				var allName = result.results[counter].marketname;
				var index = allName.indexOf(" ");
				var name = allName.substring(index + 1);
				var dist = allName.substring(0, index);

				mytable.append("<tr><td>" + name + "</td><td>"
								+ dist + " miles </td></tr>");
			}

			$("#markets").append(mytable);
			//console.log(markets);
			//get market detail
			for(var i = 0; i < markets.length; i ++) {
				$.ajax({
			        type: "GET",
			        contentType: "application/json; charset=utf-8",
			        // submit a get request to the restful service mktDetail.
			        url: "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=" + markets[i],
			        dataType: 'jsonp',
		        	jsonpCallback: 'createMarker'
		    	});
			};
		}
		//iterate through the JSON result object.
		function createMarker(detailresults) {
		    var counter = address.length;
			address[counter] = detailresults.marketdetails.Address;
			$('#data').append(address +  "<br />");
		}


		var geocoder;
  		var map;
		function initMap(zip){
  			geocoder = new google.maps.Geocoder();
  			var myOptions = {
  			    zoom: 12,
  			    center: codeAddress(zip)
  			}
  			map = new google.maps.Map(document.getElementById("map"), myOptions);
  			var marker = new google.maps.Marker({ //Line 1
 				position: {lat: 40.4237, lng: -86.9212}, //Line2: Location to be highlighted
 				map: map,//Line 3: Reference to map object
 				title: 'Purdue University' //Line 4: Title to be given
 			})
 		};
 		function codeAddress(zipCode) {
 		    geocoder.geocode( { 'address': zipCode}, function(results, status) {
 		      if (status == google.maps.GeocoderStatus.OK) {
 		        //Got result, center the map and put it out there
 		        map.setCenter(results[0].geometry.location);
 			    var marker = new google.maps.Marker({
 		            map: map,
 		            position: results[0].geometry.location,
 		            title: 'Your position'
 		        });
 		        var infowindow = new google.maps.InfoWindow({
 				    content: "<span>Your position</span>"
 				});
 				google.maps.event.addListener(marker, 'mouseover', function() {
 				  	infowindow.open(map,marker);
 				});
 				google.maps.event.addListener(marker, 'mouseout', function() {
 				  	infowindow.close(map,marker);
 				});
 		      } else {
 		        alert("Geocode was not successful for the following reason: " + status);
 		      }
 		    });
 		  }