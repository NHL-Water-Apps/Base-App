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

//hier maakt hij een array aan waarin de annotations worden opgeslagen
var annotationsMap = [];
//hiermee loopt hij door de array met data heen
for(var i = 0; i < data.length; i++){
	annotationsMap[i] = Titanium.Map.createAnnotation({ //voor elke index maakt hij een annotation aan
		latitude: data[i].LAT, //de latitude van de brug
		longitude: data[i].LON, //de longitude van de brug
		title: data[i].title, //de titel van de brug
		subtitle: 'H: ' + data[i].HEIGTH + 'm' + '\tB: ' + data[i].WIDTH + 'm', //de hoogte van de brug
		image: (Titanium.Platform.osname === 'iphone' || Titanium.Platform.osname === 'ipad') ? 
			'/img/AnnotationGroen.png' : '/img/Groter/Anotation Android Groen G.png', //de image van de annotation
		rightButton: Titanium.Platform.osname === 'android' ? '/img/pijl.png' : Titanium.UI.iPhone.SystemButton.DISCLOSURE, // de button die op de annotation wordt getoond zodra er op geklikt wordt.
		animate: true, //hiermee wordt er een animatie toegevoegd aan de annotation
	});
};

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
	annotations: annotationsMap, //hiermee geeft hij de annotation weer op de kaart
});


if(Titanium.Platform.osname === 'iphone' || Titanium.Platform.osname === 'ipad'){
	// Een searchbar voor de map
	var searchBarMap = Titanium.UI.createSearchBar({
    	barColor:'#000', //de kleur van de searchbar
    	showCancel: false, //hij zet de cancelButton op false
    	focusable: false, //Hiermee wordt de searhbar niet gelijk gefocust
    	hintText: config.zoekText, //dit is de hinttext die in de searchbar wordt geplaatst
    	//height: '43', //de hoogte van de searchbar
    	top: 0, //hiermee wordt de searhbar tegen de bovenkant van het scherm gepositioneerd
	});
}

if(Titanium.Platform.osname === 'android'){
	//een searchbar voor de map op android
	var searchBarMap = Titanium.UI.createSearchBar({
	    barColor:'#000', //de kleur van de searchbar
	    showCancel: false, //hij zet de cancelButton op false
	    focusable: false, //Hiermee wordt de searhbar niet gelijk gefocust
	    hintText: config.zoekText, //dit is de hinttext die in de searchbar wordt geplaatst
	    height: Titanium.Gesture.isPortrait() ? '12%' : '20%', //de hoogte van de searchbar
	    top: 0, //hiermee wordt de searhbar tegen de bovenkant van het scherm gepositioneerd
	    visible: false //hier geeft hij de searchbar aan het begin niet weer 
	});
	
	//de searchbutton voor android waarmee de searchbar wordt getoggled van visible naar unvisible en vice versa
	var searchButton = Titanium.UI.createButton({
		image: '/img/Groter/ZoekG.png', //de afbeelding van de button
		right: '2%', // de positie van de button vanaf de rechterkant
		bottom: 50, //de positie van de button vanaf de onderkant
		height: 'auto', //de hoogte van de button
		width: 'auto' //de breedte van de button
	});
}

var mapButton = Titanium.UI.createButton({
	image: Titanium.Platform.osname === 'android' ? '/img/Groter/LocatieG.png' : '/img/ILocatie.png', //de afbeelding van de mapbutton
	right: '3%', //de positie van de button vanaf de rechterkant
	bottom: 5, //de positie van de button vanaf de onderkant
	height: 'auto', //de hoogte van de button
	width: 'auto' //de breedte van de button
});

//De orientatiemodus voor de verschillende platformen
MapWindow.orientationModes = [
	Titanium.UI.PORTRAIT,
	Titanium.UI.UPSIDE_PORTRAIT,
	Titanium.UI.LANDSCAPE_LEFT,
	Titanium.UI.LANDSCAPE_RIGHT
];

Titanium.include('methods/map.js'); //hierin staan alle functies van de MapView 

MapWindow.add(mapView); // hier voegt hij de MapView toe aan de MapWindow
MapWindow.add(mapButton); //hier voegt hij de mapButton toe aan de MapWindow
MapWindow.add(searchBarMap); //hier voegt hij de searchbar toe aan de MapWindow
if(Titanium.Platform.osname === 'android'){
	MapWindow.add(searchButton); //hier voegt hij op android een zoekbutton toe
};


