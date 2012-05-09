/*
 * Dit bestand zal alle methodes bevatten zoals gebruikt bij settings
 */

// Functie voor het inladen van verschillende types kaart
(function(){
	// Ophalen van de opgeslagen waarde
	var mapType = Titanium.App.Properties.getString('mapType', 'map');
	// controle of de teruggegeven waarde valid is
	if(!(mapType === 'map' || mapType === 'satelite' || mapType === 'hybrid'))
	// zoniet dan instellen op de standaardwaarde van de kaart
		{ mapType = 'map'; Titanium.App.Properties.setString('mapType', 'map');	}  
	
	// Kijken welke waarde er opgeslagen stond en deze inladen
	// En tevens de kaart instellen op het juiste type
	if(mapType === 'map') { sMap.hasCheck = true; mapView.mapType = Titanium.Map.STANDARD_TYPE;}
	else if (mapType === 'satelite') { sSatelite.hasCheck = true; mapView.mapType = Titanium.Map.SATELLITE_TYPE; }
	else { sHybrid.hasCheck = true; mapView.mapType = Titanium.Map.HYBRID_TYPE; } // Niet met een else if omdat er aan het begin al gechecked wordt
})();


/*
 * 	 Verschillende functies voor elk type kaart
 *  	- Elke functie zal all andere "vinkjes" weghalen en de juiste aanvinken
 * 		- De nieuwe waarde opslaan 
 * 		- De map opnieuw instellen zodat deze de juiste type kaart gebruikt
 */
sMap.addEventListener('click', function(){
	sMap.hasCheck = true;
	sSatelite.hasCheck = false;
	sHybrid.hasCheck = false;
	mapView.mapType = Titanium.Map.STANDARD_TYPE;
	Titanium.App.Properties.setString('mapType', 'map');
});
sHybrid.addEventListener('click', function(){
	sMap.hasCheck = false;
	sSatelite.hasCheck = false;
	sHybrid.hasCheck = true;
	mapView.mapType = Titanium.Map.HYBRID_TYPE;
	Titanium.App.Properties.setString('mapType', 'hybrid');
});
sSatelite.addEventListener('click', function(){
	sMap.hasCheck = false;
	sSatelite.hasCheck = true;
	sHybrid.hasCheck = false;
	mapView.mapType = Titanium.Map.SATELLITE_TYPE;
	Titanium.App.Properties.setString('mapType', 'map');
});