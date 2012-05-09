// Dit bestand zal de eerste pagina zijn die 
// getoond wordt met het opstarten van de app
// Deze pagina zal o.a. de kaart bevatten met alle
// POI's erop.

// Het maken van de window
var MapWindow = Titanium.UI.createWindow({
	title: 'Zoeken',				// Titel van de window
	backgroundColor: '#FFFFFF',	// En de achtergrond kleur
	navBarHidden: true // Navigatie balk op de iPhone en Ipad onzichtbaar
});

//hiermee maak je een annotation op de map
var mountainView = Titanium.Map.createAnnotation({
    latitude:53.206547,
    longitude:5.801554,
    title:"VrouwenpoortBrug",
    subtitle:'Hoogte: 3.25 m',
    pincolor:Titanium.Map.ANNOTATION_RED,
    animate:true,
    rightButton: Titanium.UI.iPhone.SystemButton.INFO_LIGHT, //'KS_nav_ui.png',
    myid:1 // Custom property to uniquely identify this annotation.
});

//het maken van een map
var mapView = Titanium.Map.createView({
	bottom: 0, // hiermee positioneert hij de kaart vanuit de top
	left: 0, // hiermee positioneert hij de kaart vanuit de linkerkant
	height: "100%", // de hoogte is 100%
	width: "100%", // de breedte is 100%
	mapType: Titanium.Map.STANDARD_TYPE, //het maptype van de kaart wordt ingesteld op de Standard Type
	animate: true, //hiermee geeft hij een animatie zodra de kaart getoond wordt
	regionFit: true, //de kaart wordt niet passende gemaakt
	userLocation: true, //hiemeer haalt hij je huidge positie op en toont hij die op de kaart
	annotations:[mountainView]
});

//een searchbar voor de map
var searchBarMap = Titanium.UI.createSearchBar({
    barColor:'#000', //de kleur van de searchbar
    showCancel: false, //hij zet de cancelButton op false
    focusable: false, //Hiermee wordt de searhbar niet gelijk gefocust
    hintText: 'Zoek voor POI\'s...', //dit is de hinttext die in de searchbar wordt geplaatst
    height: 43, //de hoogte van de searchbar
    top: 0, //hiermee wordt de searhbar tegen de bovenkant van het scherm gepositioneerd
});

var mapButton = Titanium.UI.createButton({
	title: '+',
	right: 5,
	bottom: 5,
	height: 'auto',
	width: 'auto'
});

//De orientatiemodus voor de verschillende platformen
MapWindow.orientationModes = [
	Titanium.UI.PORTRAIT,
	Titanium.UI.UPSIDE_PORTRAIT,
	Titanium.UI.LANDSCAPE_LEFT,
	Titanium.UI.LANDSCAPE_RIGHT
];

//hierin staan alle functies van de MapView
Titanium.include('methods/map.js');

// hier voegt hij de MapView toe aan de MapWindow
MapWindow.add(mapView);
MapWindow.add(mapButton);
MapWindow.add(searchBarMap);
