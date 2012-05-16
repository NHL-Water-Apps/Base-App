/*
 * 	Een functie die je naar jouw plaats op de kaart brengt 
 * 	Indien er geen gps beschikbaar is of niet gevonden dan zal er een alert gegeven worden
 */
function ShowOnMap(){
	if (Ti.Geolocation.locationServicesEnabled) {
	    Titanium.Geolocation.purpose = 'Get Current Location';
	    Titanium.Geolocation.getCurrentPosition(function(e) {
	        if (e.error) {
	            Ti.API.error('Error: ' + e.error);
	        } else {
	            Ti.API.info(e.coords);

	            mapView.setLocation({
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

/*
 * 	Zelf uitvoerende functie die je naar jouw positie op de kaart brengt 
 * 		en begint met het maken van een trail
 */
(function(){
	ShowOnMap();
	showTrail(0);
})();

function annotationImage(){
		if(data[i].HEIGTH > Titanium.App.Properties.getString('height', '0') && Titanium.App.Properties.getString('height', '0') !=  '0' && data[i].BRIDGETYPE != 'beweegbare brug'){
			annotationsMap[i].image = '/img/OnMap/BrugRood.png'; 
		}
		else{
			annotationsMap[i].image = '/img/OnMap/BrugGroen.png';
		}
}

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

/**
 *	Fucntie die draait op het moment dat er op een punt in de kaart geklikt wordt
 * 	Als hierop geklikt is zal er gekeken "waar" er op de item geklikt is en als dat
 * 		op het knopje is, zal er een nieuw venster geopend worden naar een detailview	 
 */
mapView.addEventListener('click', function(e){
	// Kijken of er op het juiste gedrukt is
	if(e.clicksource === 'rightButton' || e.clicksource === 'rightPane')
	{
		// Indien een nieuw window aanmaken
		var windowBrug = Titanium.UI.createWindow({
			title: 				e.title,
			backgroundColor: 	"#FFF",
			// Onze custom value meegeven met alle data over het POI
			dataToPass: 		e.annotation.dataToPass,
			url: 				'/src/uiDetailView.js',
			navBarHidden: 		false,
			tabBarHidden: 		true
		});
		
		// En deze dan openen
		MapTab.open(windowBrug, {animated: true});
	}	
});

//Een event waarmee de cancelbutton wordt getoond op het scherm zodra de searchbar wordt aangeraakt
searchBarMap.addEventListener('focus', function(){
	//voor de iphone
	if(Titanium.Platform.osname === 'iphone' || Titanium.Platform.osname === 'ipad' ){
		
		var blackMapView = Titanium.UI.createView({
			backgroundColor: '#000',
			opacity: 0.5
		});
		
		mapView.add(blackMapView);
	
		blackMapView.addEventListener('click', function(){
			searchBarMap.blur();
		});
		
		searchBarMap.addEventListener('blur', function(){
			mapView.remove(blackMapView);
			blackMapView = null;
		});
	}	
})

//een event waarmee de searchBar inactief wordt gemaakt zodra je op de search knop klikt
searchBarMap.addEventListener("return", function(){
	if(Titanium.Platform.osname === 'iphone' || Titanium.Platform.osname === 'ipad'){
		searchBarMap.blur();
		searchBarMap.setShowCancel(false, {animated: true});	
	}
});

if(Titanium.Platform.osname === 'android'){
	Titanium.Gesture.addEventListener('orientationchange', function () {
		searchBarMap.height = Titanium.Gesture.isPortrait() ? '12%' : '20%';
	});
}

/*
 * 	De onderstaande functie zal annotaions toevoegen op de kaart om zo een trail
 * 		te maken.
 * 	Indien er al x aantal annotaions op de kaart staan zal hij de als eerste
 * 		toegevoegde annotation weghalen.
 */
var trailers = [];
function showTrail(plaats){
	// Controle of we niet al teveel annotaions op de kaart hebben
	// Als we al we te veel hebben zetten we de pointer op 0 (en dan opnieuw eroverheen)
	if(plaats > config.trailerAmmount) { plaats = 0; }
	
	// Kijken of we een positie kunnen krijg
	if(Titanium.Geolocation.getLocationServicesEnabled()){
		Titanium.Geolocation.getCurrentPosition(function(e) {
			if(e.coords && e.coords.speed)
			{
				// Kijken of we bewegen
				if(e.coords.speed > 0){		
					// Indien dan zal er een nieuwe annotaion gemaakt worden maar eerst zullen we een oude annotation verwijderen
					if(trailers[plaats])
					{
						mapView.removeAnnotation(trailers[plaats]);
					}
					// Darna maken we een nieuw annotion aan op deze lokatie in de array
					trailers[plaats] = Titanium.Map.createAnnotation({
	   					latitude:	e.coords.latitude,
	   					longitude:	e.coords.longitude,
	 					title:		'',
    					opacity: 	1,
    					duration: 	3000,
	   					image: '/img/trailstip.png'
					});
					// Daarna deze annotatie toeveogen aan de kaart					
					mapView.addAnnotation(trailers[plaats]);			
	 			}
	 		}
		});
	}
	// Toevoegen en verwijderen is klaar
	// Functie opnieuw aanroepen na een timout (en pointer met 1 verhogen)
	setTimeout(function(){
	 	showTrail(plaats + 1)}, config.trailTimeout);
}

