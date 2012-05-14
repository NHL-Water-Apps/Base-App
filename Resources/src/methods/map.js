//Een event voor het bepalen van de huidge locatie
	// Self exectuting functie voor het bepalen van je huidige positie op de kaart
	// Als er geen type kaart geselecteerd is zal er voor de stratenkaart gekozen worden
function ShowOnMap(){
	if (Ti.Geolocation.locationServicesEnabled) {
	    Titanium.Geolocation.purpose = 'De huidige positie verkrijgen';
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
	    alert(config.geenGPS);
	}
}

(function(){
	ShowOnMap();
})();

//een event voor de mapButton waarmee de huidige positie op de kaart wordt getoond
mapButton.addEventListener("click", function(){
	ShowOnMap();
});


//Zodra hij op de rightButton van de annotation klikt krijg je een alert
/*mapView.addEventListener('click', function(e){
	if(e.clicksource === 'rightButton'){
		alert('vanaf hier ga je naar de Detailpagina');
	}
});*/

if(Titanium.Platform.osname === 'android'){
	searchButton.addEventListener("click", function(){
		if(searchBarMap.visible === false){
			searchBarMap.setVisible(true, {animated: true});
		}
		else if(searchBarMap.visible === true){
			searchBarMap.setVisible(false, {animated: true});
		}
	})
}

mapView.addEventListener('click', function(e){
	if(e.clicksource === 'rightButton')
	{
		var windowBrug = Titanium.UI.createWindow({
			title: e.title,
			backgroundColor: "#FFF",
			url: '/src/uiDetailView.js',
			navBarHidden: false,
			tabBarHidden: true
		});
		
		MapTab.open(windowBrug, {animated: true});
	}
	
});

//Een event waarmee de cancelbutton wordt getoond op het scherm zodra de searchbar wordt aangeraakt
searchBarMap.addEventListener('focus', function(){
	//voor de iphone
	if(Titanium.Platform.osname === 'iphone' || Titanium.Platform.osname === 'ipad' ){
		searchBarMap.setShowCancel(true, { animated: true});	
		//MapWindow.showNavBar();
	}	
	//voor de android
	else if(Titanium.Platform.osname = 'android'){
		//softKeyboardOnFocus: Titaniu==m.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS;
		//searchBarMap.setFocusable = false;
		//Titanium.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS;
		//searchBarMap.setSoftKeyboardOnFocus();
	}
})

//een event waarmee de searhBar inactief wordt gemaakt zodra je op de cancel knop klikt
searchBarMap.addEventListener('cancel', function(){
	if(Titanium.Platform.osname === 'iphone' || Titanium.Platform.osname === 'ipad'){
		searchBarMap.setShowCancel(false, { animated: true });	//de cancel knop wordt inactief gemaakt
		searchBarMap.blur();
		//MapWindow.hideNavBar();
	}
	else if(Titanium.Platform.osname === 'android'){
		searchBarMap.setShowCancel(false, {animated: true});
	}
});

//een event waarmee de searchBar inactief wordt gemaakt zodra je op de search knop klikt
searchBarMap.addEventListener("return", function(){
	if(Titanium.Platform.osname === 'iphone' || Titanium.Platform.osname === 'ipad'){
		searchBarMap.blur();
		searchBarMap.setShowCancel(false, {animated: true});	
	}
});

//Een event waarmee wordt gekeken of er een orientatiechange is
Titanium.Gesture.addEventListener('orientationchange', function () {
	if(Titanium.Platform.osname === 'android'){
		searchBarMap.height = Titanium.Gesture.isPortrait() ? '12%' : '20%';
	}
});
