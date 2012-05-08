// Dit bestand zal de eerste pagina zijn die 
// getoond wordt met het opstarten van de app
// Deze pagina zal o.a. de kaart bevatten met alle
// POI's erop.

// Het maken van de window
var MapWindow = Titanium.UI.createWindow({
	title: 'Kaart',				// Titel van de window
	backgroundColor: '#FFFFFF',	// En de achtergrond kleur
	navBarHidden: true // Navigatie balk op de iPhone en Ipad onzichtbaar
});

//het maken van een map
var mapView = Titanium.Map.createView({
	top: 0, // hiermee positioneert hij de kaart vanuit de top
	left: 0, // hiermee positioneert hij de kaart vanuit de linkerkant
	height: "100%", // de hoogte is 100%
	width: "100%", // de breedte is 100%
	mapType: Titanium.Map.STANDARD_TYPE, //het maptype van de kaart wordt ingesteld op de Standard Type
	animate: true, //hiermee geeft hij een animatie zodra de kaart getoond wordt
	regionFit: true, //de kaart wordt niet passende gemaakt
	userLocation: true //hiemeer haalt hij je huidge positie op en toont hij die op de kaart
});

//een searchbar voor de map
var searchBarMap = Titanium.UI.createSearchBar({
    barColor:'#000', //de kleur van de searchbar
    showCancel:false, //hij zet de cancelButton op false
    focusable: false, //Hiermee wordt de searhbar niet gelijk gefocust
    hintText: 'Zoek voor plaatsen...', //dit is de hinttext die in de searchbar wordt geplaatst
    height: 43, //de hoogte van de searchbar
    top: 0, //hiermee wordt de searhbar tegen de bovenkant van het scherm gepositioneerd
});

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

//De orientatiemodus voor de verschillende platformen
MapWindow.orientationModes = [
	Titanium.UI.PORTRAIT,
	Titanium.UI.UPSIDE_PORTRAIT,
	Titanium.UI.LANDSCAPE_LEFT,
	Titanium.UI.LANDSCAPE_RIGHT
];

// hier voegt hij de MapView toe aan de MapWindow

MapWindow.add(mapView);

MapWindow.add(searchBarMap);

// Deze krijgt een .open om zo te starten met dit window open
MapWindow.open();
