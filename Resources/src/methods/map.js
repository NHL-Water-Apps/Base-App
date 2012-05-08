if(Titanium.Platform.osname === 'iphone' || Titanium.Platform.osname === 'ipad'){
	// Self exectuting functie voor het bepalen van je huidige positie op de kaart
	// Als er geen type kaart geselecteerd is zal er voor de stratenkaart gekozen worden
	(function(){
			if (Ti.Geolocation.locationServicesEnabled) {
			    Titanium.Geolocation.purpose = 'Get Current Location';
			    Titanium.Geolocation.getCurrentPosition(function(e) {
			        if (e.error) {
			            Ti.API.error('Error: ' + e.error);
			        } else {
			            Ti.API.info(e.coords);
			            
			            mapView.setRegion({
			            	latitude: e.coords.latitude,
			            	longitude: e.coords.longitude,
			            	animate: true,
			            	latitudeDelta: 0.01,
			            	longitudeDelta: 0.01
			            });
			        }
			    });
			} else {
			    alert('Please enable location services');
			}
	})();
}