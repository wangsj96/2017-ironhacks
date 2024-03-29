		$(document).ready(function() {

			var zipcode = window.location.search;
			zipcode = zipcode.substring(1);
			zipcode = zipcode.substring( zipcode.indexOf('=') + 1 );
			initMap(zipcode);
			getWeather(zipcode);
			getMarkets(zipcode);
		});

		var geocoder;
  		var map;
		function initMap(zip){
  			geocoder = new google.maps.Geocoder();
  			var myOptions = {
  			    zoom: 9,
  			    center: codeAddress(zip)
  			}
  			map = new google.maps.Map(document.getElementById("map"), myOptions);
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
 				    content: "<span>Your position</span>",
 				    disableAutoPan: true
 				});
 				infowindow.open(map,marker);
 				/*google.maps.event.addListener(marker, 'mouseover', function() {
 				  	infowindow.open(map,marker);
 				});
 				
 				google.maps.event.addListener(marker, 'mouseout', function() {
 				  	infowindow.close(map,marker);
 				});*/
 		      } else {
 		        alert("Geocode was not successful for the following reason: " + status);
 		      }
 		    });
 		  }
		
		function getWeather(zip) {
			//get today's date
			var today = new Date();
			//change date to correct format
			function addZ(n){return n<10? '0'+n:''+n;}
			var date = today.getFullYear()+'-'+(addZ(today.getMonth() + 1))+'-'+ (addZ(today.getDate() - 2));
			$.ajax({
				//url: "https://www.ncdc.noaa.gov/cdo-web/api/v2/datatypes?datasetid=GHCND&locationid=ZIP:47906&startdate=2017-04-09&enddate=2017-04-09",
				url: "https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&datatypes=TOBS&locationid=ZIP:47906&startdate="+ date +"&enddate=" + date,
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
					//console.log(result.results[i].value);
					var temp = result.results[i].value.toString().slice(0, -1) + '.' + result.results[i].value.toString().slice(-1);
					var p = $("<p>Today's temperature is about <b>" + temp + "°C</b></p>");
					break;
				}
			}
			$('#weather').append(p);
		}

		//get local markets
		var markets;
		var markersArray = [];
		//var counter = 0;

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
			markets = Create2DArray(result.results.length);
			var counter = 0;
			var mytable = $("<table></table>");
			mytable.append("<tr><th>Market Name</th><th>Distance to you</th></tr>");
			for(id in result.results) {

				var allName = result.results[counter].marketname;
				var index = allName.indexOf(" ");
				var name = allName.substring(index + 1);
				var dist = allName.substring(0, index);

				mytable.append("<tr><td>" + name + "</td><td>"
								+ dist + " miles </td></tr>");
				markets[counter].id = result.results[counter].id;
				markets[counter].distance = dist;
				markets[counter].name = name;
				counter ++;
			}

			$("#markets").append(mytable);
			//console.log(markets);
			//get market detail
			for(counter = 0; counter < markets.length; counter ++) {
				$.ajax({
			        type: "GET",
			        contentType: "application/json; charset=utf-8",
			        // submit a get request to the restful service mktDetail.
			        url: "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=" + markets[counter].id,
			        dataType: 'jsonp',
		        	success: function(data){
		        		var start = this.url.indexOf('=') + 1 ;
		        		var end = this.url.indexOf('&');
		        		var id = this.url.substring(start, end);
		        		//console.log(id);
		        		for (var n = 0; n < markets.length; n ++) {
		        			if(markets[n].id == id) {
		        				markets[n].address = data.marketdetails.Address;
		        				markets[n].link = data.marketdetails.GoogleLink;
		        				markets[n].time = data.marketdetails.Schedule;
		        				markets[n].category = data.marketdetails.Products;
		        				var latStart = markets[n].link.indexOf("=") + 1;
								var latEnd = markets[n].link.indexOf("%2C");
								var lngStart = markets[n].link.indexOf("%20") + 3;
								var lngEnd = markets[n].link.indexOf("(") - 3;
								var lat = parseFloat(markets[n].link.substring(latStart, latEnd));
								var lng = parseFloat(markets[n].link.substring(lngStart,lngEnd));
								//console.log(lat+','+lng);
								var marker = new google.maps.Marker({
				 		            map: map,
				 		            position: {lat: lat, lng: lng},
				 		            id: markets[n].id
				 		    	});
				 		    	markersArray.push(marker);
				 		    	var index = markersArray.length;
				 		    	var infowindow = new google.maps.InfoWindow({
				 				    content: markets[n].name,
				 				    disableAutoPan: true
				 				});
				 				
				 				google.maps.event.addListener(marker, 'mouseover', function() {
				 				  	infowindow.open(map,marker);
				 				});
				 				//i do not know why click listener is not working
				 				google.maps.event.addListener(marker, 'click', (function() {
							        clickMarkerEvent(index);
							    });
				 				//infowindow.open(map,marker);
				 				google.maps.event.addListener(marker, 'mouseout', function() {
				 				  	infowindow.close(map,marker);
				 				});
				 				//console.log(markersArray);
		        				break;
		        			}
		        		}
		        	}
		    	});
			}
		}
		//initiate array with several related fields
		function Create2DArray(rows) {
		  var arr = [];

		  for (var i=0;i<rows;i++) {
		     arr[i] = {id:"",name:"",address:"",link:"", time:"", category:"", distance:""};
		  }

		  return arr;
		}

		//when click change the content of div#markets, all these are not working
		function clickMarkerEvent(index) {
			/*console.log(markersArray);
			var infowindow = new google.maps.InfoWindow({
				content: "clicked clicked clicked",
				maxWidth: 200
			});*/

			//get the id
			var id = markersArray[index].id;
			var time,name,products,address,distance;
			for (var i = 0; i < markets.length; i ++) {
				if(markets[i].id == id) {
					name = markets[i].name;
					address = markets[i].address;
					products = markets[i].category;
					time = markets[i].time;
					distance = markets[i].distance;
					break;
				}
			}
			//empty the current content
			$("#markets").empty();
			var list = $("<ul></ul>");
			list.append("<li>Name: " + name +"</li><li>Address: " + address +"</li><li>Products: " + name +"</li><li>Open hours: " + time +"</li>");
			$("#markets").append(list);
			//draw radar chart
			var margin = {top: 100, right: 100, bottom: 100, left: 100},
				width = Math.min(700, window.innerWidth - 10) - margin.left - margin.right,
				height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);
			var color = d3.scale.category10();
				
			var radarChartOptions = {
			  w: width,
			  h: height,
			  margin: margin,
			  maxValue: 0.5,
			  levels: 5,
			  roundStrokes: true,
			  color: color
			};
			var data = [
						{axis:"distance",value:evalDist(distance)},
						{axis:"food category",value:evalCate(products)},
						{axis:"open hours",value:evalHour(time)}		
					];
			//Call function to draw the Radar chart
			RadarChart(".radarChart", data, radarChartOptions);
		}
		//evaluation distance
		function evalDist() {
			//to be implemented
		}
		//evaluation of food categories
		function evalCate() {
			//to be implemented	
		}
		//evaluation of open hours
		function evalHour() {
			//to be implemented
		}

		