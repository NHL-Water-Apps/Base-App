//Een event voor het bepalen van de huidge locatie
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
	
	mapButton.addEventListener("click", function(){	
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
});
}

//Een event waarmee de cancelbutton wordt getoond op het scherm zodra de searchbar wordt aangeraakt
searchBarMap.addEventListener("focus", function(){
	//voor de iphone
	if(Titanium.Platform.osname = 'iphone'){
		searchBarMap.setShowCancel(true, { animated: true });	
	}	
	//voor de android
	else if(Titanium.Platform.osname = 'android'){
		softKeyboardOnFocus: Titanium.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS;
		searchBarMap.setFocusable = false;
		Titanium.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS;
		searchBarMap.setSoftKeyboardOnFocus();
	}
})

//een event waarmee de searhBar inactief wordt gemaakt zodra je op de cancel knop klikt
searchBarMap.addEventListener("cancel", function(){
	if(Titanium.Platform.osname = 'iphone'){
		searchBarMap.setShowCancel(false, { animated: true });	//de cancel knop wordt inactief gemaakt
		searchBarMap.blur();
	}
});

//een event waarmee de searchBar inactief wordt gemaakt zodra je op de search knop klikt
searchBarMap.addEventListener("return", function(){
	if(Titanium.Platform.osname = 'iphone'){
		searchBarMap.blur();	
	}
});