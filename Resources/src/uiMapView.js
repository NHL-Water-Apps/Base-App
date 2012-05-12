/*
 * 	Dit bestand zal de eerste pagina zijn die 
 * 	getoond wordt met het opstarten van de app
 * 	Deze pagina zal o.a. de kaart bevatten met alle
 * 	POI's erop.
 */

// Het maken van de window
var MapWindow = Titanium.UI.createWindow({
	title: 'Kaart',				// Titel van de window
	backgroundColor: '#FFFFFF',	// En de achtergrond kleur
	navBarHidden: true // Navigatie balk op de iPhone en Ipad onzichtbaar
});

// Hiermee maak je een annotation op de map
var mountainView = Titanium.Map.createAnnotation({
    latitude:53.206547,
    longitude:5.801554,
    title:'VrouwenpoortBrug',
    subtitle:'Hoogte: 3.25 m',
    image: Titanium.Platform.osname === 'iphone' || Titanium.Platform.osname === 'ipad' ? '/img/AnnotationRood.png' : '/img/Anotation Android Rood.png',
    animate:true,
    rightButton: Titanium.Platform.osname === 'android' ? '/img/pijl.png' : Titanium.UI.iPhone.SystemButton.DISCLOSURE,
    myid:1 // Custom property to uniquely identify this annotation.
});

//	Hiermee maak je een annotation op de map
var mountainView2 = Titanium.Map.createAnnotation({
    latitude:53.208547,
    longitude:5.803554,
    title:'allesandersBrug',
    subtitle:'Hoogte: 13.15 m',
    image: Titanium.Platform.osname === 'iphone' || Titanium.Platform.osname === 'ipad' ? '/img/AnnotationGroen.png' : '/img/Anotation Android Groen.png',
    animate:true,
    rightButton: Titanium.Platform.osname === 'android' ? '/img/pijl.png' : Titanium.UI.iPhone.SystemButton.DISCLOSURE,
    myid:2 // Custom property to uniquely identify this annotation.
});

// Het maken van een map
var mapView = Titanium.Map.createView({
	bottom: 0, // hiermee positioneert hij de kaart vanuit de top
	left: 0, // hiermee positioneert hij de kaart vanuit de linkerkant
	height: "100%", // de hoogte is 100%
	width: "100%", // de breedte is 100%
	mapType: Titanium.Map.STANDARD_TYPE, //het maptype van de kaart wordt ingesteld op de Standard Type
	animate: true, //hiermee geeft hij een animatie zodra de kaart getoond wordt
	regionFit: true, //de kaart wordt niet passende gemaakt
	userLocation: true, //hiemeer haalt hij je huidge positie op en toont hij die op de kaart
	annotations:[mountainView, mountainView2]
});

if(Titanium.Platform.osname === 'iphone' || Titanium.Platform.osname === 'ipad'){
	// Een searchbar voor de map
	var searchBarMap = Titanium.UI.createSearchBar({
    	barColor:'#000', //de kleur van de searchbar
    	showCancel: false, //hij zet de cancelButton op false
    	focusable: false, //Hiermee wordt de searhbar niet gelijk gefocust
    	hintText: 'Zoek...', //dit is de hinttext die in de searchbar wordt geplaatst
    	//height: '43', //de hoogte van de searchbar
    	top: 0, //hiermee wordt de searhbar tegen de bovenkant van het scherm gepositioneerd
	});
}

if(Titanium.Platform.osname === 'android'){
	//een searchbar voor de map
	var searchBarMap = Titanium.UI.createSearchBar({
	    barColor:'#000', //de kleur van de searchbar
	    showCancel: false, //hij zet de cancelButton op false
	    focusable: false, //Hiermee wordt de searhbar niet gelijk gefocust
	    hintText: 'Zoek...', //dit is de hinttext die in de searchbar wordt geplaatst
	    height: '20%', //de hoogte van de searchbar
	    top: 0, //hiermee wordt de searhbar tegen de bovenkant van het scherm gepositioneerd
	    visible: false
	});
	
	var searchButton = Titanium.UI.createButton({
		title: '',
		image: '/img/Zoek.png',
		right: '13%',
		bottom: 5,
		height: 'auto',
		width: 'auto'
	});
}

var mapButton = Titanium.UI.createButton({
	title: '',
	//backgroundColor: 'rgba(0,0,0,0.0)',
	image: '/img/Locatie.png',
	right: '2%',
	bottom: 5,
	height: 32,
	width: 32
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
if(Titanium.Platform.osname === 'android'){
	MapWindow.add(searchButton);
}


