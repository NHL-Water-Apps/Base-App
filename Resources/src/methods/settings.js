/*
 * 	Dit bestand zal alle methodes bevatten zoals gebruikt bij settings
 * 	oa.:
 * 		- inlezen van opgeslagen waarden
 * 		- waarden opslaan
 * 		- eventhandelers voor knoppen en tekstvelden
 */

/*
 * 	Deze functie zal het inladen van alle opgeslagen waarden afhandelen.
 * 
 * 	Het laad eerst het type kaart in:
 * 		- Kijken of dit type een valide kaart type is
 * 		- Indien deze laden
 * 			anders het standaardType kaart laden en dit opslaan
 * 
 * 	Daarna laadt hij de breedte en hoogte in,
 * 		indien dit niet opgeslagen staat komt er een null (leeg)
 * 		te staan.
 * 
 */
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

	// Hoogte van een boot ophalen en in het tekstvakje zetten
	heightField.value = Titanium.App.Properties.getString('height', null);
	widthField.value = Titanium.App.Properties.getString('width', null);
})();

Titanium.Gesture.addEventListener('orientationchange', function () {
	settingsTable.height = '100%';
	settingsTable.width = '100%';
});

(function(){
	settingsTable.height = '100%';
	settingsTable.width = '100%';
})();

SettingsWindow.addEventListener('click', function(){
	settingsTable.height = '100%';
	settingsTable.width = '100%';
});

/*
 * 	 Verschillende functies voor elk type kaart
 *  	- Elke functie zal all andere "vinkjes" weghalen en de juiste aanvinken
 * 		- De nieuwe waarde opslaan 
 * 		- De map opnieuw instellen zodat deze de juiste type kaart gebruikt
 */
sMap.addEventListener('click', function(){
	sMap.hasCheck = true;					// De juiste aanvinken
	sSatelite.hasCheck = false;				// De rest uitvinken
	if(Titanium.Platform.osname !== 'android'){	// Dit omdat deze het niet doet op android
		sHybrid.hasCheck = false;			
	}
	mapView.mapType = Titanium.Map.STANDARD_TYPE,
	Titanium.App.Properties.setString('mapType', 'map');
});
sSatelite.addEventListener('click', function(){
	sMap.hasCheck = false;
	sSatelite.hasCheck = true;
	if(Titanium.Platform.osname !== 'android'){
		sHybrid.hasCheck = false;
	}
	mapView.mapType = Titanium.Map.SATELLITE_TYPE;
	Titanium.App.Properties.setString('mapType', 'satelite');
});
if(Titanium.Platform.osname !== 'android'){
	sHybrid.addEventListener('click', function(){
		sMap.hasCheck = false;
		sSatelite.hasCheck = false;
		sHybrid.hasCheck = true;
		mapView.mapType = Titanium.Map.HYBRID_TYPE;
		Titanium.App.Properties.setString('mapType', 'hybrid');
	});
}

/*
 * 	Een functie die zal kijken naar invoer in het hoogteveld en breedteveld
 * 		- Hij zal controleren of dit om een getal gaat
 * 		- Indien goed, dan opslaan anders een alert opgooien en resetten
 */
SettingsWindow.addEventListener('click', function(){
	widthField.blur();
	heightField.blur();
});

/*
 * Twee functies die zullen kijken of de textvelden 'gedeselecteerd' worden, idien:
 * 		- Controle of het ingevoerde valid is
 * 		- Indien deze waarde opslaan,
 * 			anders zal gekeken worden of er een valid iets in zat
 * 			dit zal dan opgeslagen worden en weergegeven worden in
 * 			het tekstvak
 */
heightField.addEventListener('blur', function(e){
	var rExp  = /[0-9]+(\.[0-9]+)?/; 				// Regualar expression die test voor juiste getallen
	if(heightField.value === '' || rExp.test(heightField.value)) // kijken of er een juist iets is ingevuld
	{
		var temp = rExp.exec(heightField.value);	// kijken of er een getal uit de regular expression komt
		if(heightField.value === '') { Titanium.App.Properties.setString( 'height', null); }	// indien het leeg is dan 0 oplsaan
		else {
			Titanium.App.Properties.setString('height', temp[0]);	// anders het eerste getal uit de regular expression opslaan
			heightField.value = temp[0];			// deze waarde ook weer terug zetten
		}
	}
	else
	{
		heightField.color = 'red';
	}
});
widthField.addEventListener('blur', function(e){
	var rExp  = /[0-9]+(\.[0-9]+)?/; 				// Regualar expression die test voor juiste getallen
	if(widthField.value === '' || rExp.test(widthField.value)) // kijken of er een juist iets is ingevuld
	{
		var temp = rExp.exec(widthField.value); 	// kijken of er een getal uit de regular expression komt
		if(widthField.value === '') { Titanium.App.Properties.setString( 'width', null); } 
		else {
			Titanium.App.Properties.setString('width', temp[0]); // anders het eerste getal uit de regular expression opslaan
			widthField.value = temp[0];				// deze waarde ook weer terug zetten
		}
	}
	else{
		widthField.color = 'red';
	}
});
