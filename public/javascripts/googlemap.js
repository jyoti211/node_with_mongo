$(document).on('click', '#searchAddress', function() {
	searchAddress($("#address").val());

});

var geocoder;
var map;
function success(position) {
	var lat = position.coords.latitude;
	var long = position.coords.longitude;
	var city;
	var arrAddress;
	geocoder = new google.maps.Geocoder();
	var LatLng = new google.maps.LatLng(lat, long);
	//  var city= codeAddress(LatLng,function(callback){ }); //to get value returned by function in callback
	var city = codeAddress(LatLng);
}

// function codeAddress(LatLng,callback) { //to return value to called function in callback
function codeAddress(LatLng) {
	var LatLng = new google.maps.LatLng(LatLng.A, LatLng.F);
	geocoder.geocode({'latLng' : LatLng	},
					function(results, status) {
						var codedAddress;

						if (status == google.maps.GeocoderStatus.OK) {
							if (results[1]) {
								arrAddress = results;
								// iterate through address_component array
								$
										.each(
												arrAddress,
												function(i, address_component) {

													if (address_component.types[0] == "locality") {
														// console.log("City: "+ address_component.address_components[0].long_name);
														codedAddress = address_component.address_components[0].long_name;
													}
												});

							} else {
								alert("There was a problem with the map");
							}

							var mapOptions = {
								center : LatLng,
								zoom : 12,
								mapTypeId : google.maps.MapTypeId.ROADMAP
							};
							map = new google.maps.Map(document
									.getElementById("MyMapLOC"), mapOptions);
							var marker = new google.maps.Marker(
									{
										position : LatLng,
										title : "<div style = 'height:60px;width:200px'><b>Your location:</b><br />Latitude: "
												+ LatLng.A
												+ +"<br />Longitude: "
												+ LatLng.F
												+ "<br />City: "
												+ codedAddress
									});

							marker.setMap(map);
							var getInfoWindow = new google.maps.InfoWindow(
									{
										content : "<b>Your Current Location</b><br/> Latitude:"
												+ LatLng.A
												+ "<br /> Longitude:"
												+ LatLng.F
												+ ""
												+ "<br />City: " + codedAddress
									});
							getInfoWindow.open(map, marker);

						}
						// callback(codedAddress);//to return value in called function
					});

}

function searchAddress(address) {
	geocoder.geocode({
		'address' : address
	}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			map.setCenter(results[0].geometry.location);
			var marker = new google.maps.Marker({
				map : map,
				position : results[0].geometry.location
			});
		} else {
			alert("unsuccessful");
		}
	});

}