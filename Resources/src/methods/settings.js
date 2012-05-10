/*
 * Dit bestand zal alle methodes bevatten zoals gebruikt bij settings
 * oa.:
 * 		- inlezen van opgeslagen waarden
 * 		- waarden opslaan
 * 		- eventhandelers voor knoppen en tekstvelden
 */

// Functie voor het inladen van opgeslagen waarden
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

	// Hoogte van een boot ophalen
	var hoogte = Titanium.App.Properties.getInt('height', 0);
	if(hoogte !== 0) { heightField.value = hoogte; } // indien dit niet gelijk is aan 0 (standaard waarden) dan laten zien
	var widthvalue = Titanium.App.Properties.getInt('width', 0);
	if(widthvalue !== 0) { widthField.value = widthvalue; }	// indien dit niet gelijk is aan 0 (standaard waarden) dan laten zien
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
	Titanium.App.Properties.setString('mapType', 'satelite');
});


/*
 * 	Een functie zie zal kijken naar invoer in het hoogteveld en breedteveld
 * 		- Hij zal controleren of dit om een getal gaat
 * 		- Indien goed, dan opslaan anders een alert opgooien en resetten
 */
SettingsWindow.addEventListener('click', function(e){
	heightField.blur(); 	// Verplichten om dan focus te verlieze
	widthField.blur(); 		// idem
	var rExp  = /[0-9]+/; // Regualar expression die test voor juiste getallen
	if(heightField.value === '' || rExp.test(heightField.value)) // kijken of er een juist iets is ingevuld
	{
		var temp = rExp.exec(heightField.value);				// kijken of er een getal uit de regular expression komt
		if(heightField.value === '') { Titanium.App.Properties.setInt( 'height', 0); }	// indien het leeg is dan 0 oplsaan
		else {
			Titanium.App.Properties.setInt('height', temp[0]);	// anders het eerste getal uit de regular expression opslaan
			heightField.value = temp[0];						// deze waarde ook weer terug zetten
		}
	}
	// Zelfde verhaal alleen dan voor het andere veld
	if(widthField.value === '' || rExp.test(widthField.value))
	{
		var temp = rExp.exec(widthField.value);
		if(widthField.value === '') { Titanium.App.Properties.setInt( 'width', 0); }
		else {
			Titanium.App.Properties.setInt('width', temp[0]);
			widthField.value = temp[0];
		}
	}
});

/*
 * 	Twee functies die op het moment dat de tekstvelden worden aangeklikt een 
 * 	notificatie laten zien.
 */
heightField.addEventListener('focus', function(){
	// Nieuwe notificatie maken
	var toast = Titanium.UI.createNotification({
    duration: Titanium.UI.NOTIFICATION_DURATION_LONG,
    message: 'Getallen worden afgekapt. 10.7 wordt 10. Houd hier rekening mee'
    });
    toast.show();
});
widthField.addEventListener('focus', function(){
	var toast = Titanium.UI.createNotification({
    duration: Titanium.UI.NOTIFICATION_DURATION_LONG,
    message: 'Getallen worden afgekapt. 10.7 wordt 10. Houd hier rekening mee'
    });
    toast.show();
});
