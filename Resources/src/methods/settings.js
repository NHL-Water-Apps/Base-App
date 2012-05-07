/*
 * Dit bestand zal alle methodes bevatten zoals gebruikt bij settings
 */

// Functie die zal kijken naar welke breedte en hoogte is ingevuld
// Indien deze 0 of negatief is zal deze een error opgooien en
// het tekstvakje weer leeg maken.
// In andere gevallen zal BoatWidth de breedte van de boot gaan bevatten (0 standaard)
SettingsWindow.addEventListener('click', function (e){
	if(WidthField.value > 0) // kijken of de ingevulde waarde positief is
	{
		Titanium.App.Properties.setInt("BoatWidth", WidthField.value) // als dat zo is sla hem op
	}
	else if (WidthField.value !== '') // kijken of hij niet leeg is
	{								 // als dat zo is dan is er sprake van een foutieve invoer
		alert('De breedte van de boot moet groter zijn dan 0. Komma getallen dienen gescheiden te worden met een punt.'); // laat de error zien
		WidthField.value = ''; // reset de textfield
		Titanium.App.Properties.setInt("BoatWidth", 0); // de opgeslagen waarde zal gereset worden naar 0
	}
	
	// nu naar de hoogte
	if(HeightField.value > 0) // als deze groter is dan 0
	{
		Titanium.App.Properties.setInt("BoatHeight", HeightField.value); // dan de nieuwe waarde opslaan
	}
	else if(HeightField.value !== '') // zoniet dan kijken of hij niet leeg is
	{
		alert('De hoogte van de boot moet groter dan 0 zijn. Komma getallen dienen gescheiden te worden met een punt.') // error laten zien
		HeightField.value = ''; // invoerveld leeg maken
		Titanium.App.Properties.setInt("BoatHeight", 0); // opgeslagen waarde 0 maken
		
	}
	HeightField.blur();
	WidthField.blur(); // indien er ergens anders op het scherm geklikt wordt focus weghalen
});

// Functie de alle ingevulde waarden zal wissen.
// indien er geklikt wordt op de wissen knop
ClearButton.addEventListener("click", function(e){
	HeightField.value = ''; 							// Hoogte veld op het scherm leegmaken
	WidthField.value = ''; 								// Breedte veld op het scherm leegmaken
	Titanium.App.Properties.setInt("BoatHeight", 0); 	// opgeslagen hoogte resetten
	Titanium.App.Properties.setInt("BoatWidth", 0); 	// opgeslagen breedte resetten
});



if(Titanium.Platform.osname === 'android'){
// Functie die kijkt of er op het type map is geklikt
// if so dan zet hij deze aan en de rest uit
sMap.addEventListener("click", function (e) {
	sMap.value = true;
	sSatelite.value = false;
	sHybrid.value = false;
	mapView.mapType = Titanium.Map.STANDARD_TYPE;
	Titanium.App.Properties.setString('mapType', 'map');
});
sHybrid.addEventListener("click", function(e){
	sMap.value = false;
	sSatelite.value = false;
	sHybrid.value = true;
	mapView.mapType = Titanium.Map.HYBRID_TYPE;
	Titanium.App.Properties.setString('mapType', 'hybrid');
});
sSatelite.addEventListener("click", function(e){
	sMap.value = false;
	sSatelite.value = true;
	sHybrid.value = false;
	mapView.mapType = Titanium.Map.SATELLITE_TYPE;
	Titanium.App.Properties.setString('mapType', 'satelite');
});
}

//een functie om de verschillende kaarten te tonen op de map
if(Titanium.Platform.osname === 'iphone'){
	buttonMapTypes.addEventListener("click", function(e){
		if(e.index === 0)
		{
			mapView.mapType = Titanium.Map.STANDARD_TYPE;
		}
		else if(e.index === 1)
		{
			buttonMapTypes.labels[1].value = true;
			mapView.mapType = Titanium.Map.SATELLITE_TYPE;
		}
		else if(e.index === 2)
		{
			buttonMapTypes.labels[2].enabled = true;
			mapView.mapType = Titanium.Map.HYBRID_TYPE;
		}
	});
}

if(Titanium.Platform.osname === 'android'){
	// Self exectuting functie voor het bepalen van welke kaart type er geselecteerd is
	// Als er geen type kaart geselecteerd is zal er voor de stratenkaart gekozen worden
	(function(){
		var mapType = Titanium.App.Properties.getString('mapType', null);
		// controleren of de opgeslagen waarde valid is
		if(mapType === null || !(mapType === 'map' || mapType === 'hybrid' || mapType === 'satelite') )
		{
			mapType = 'map';
			Titanium.App.Properties.setString('mapType', 'map');
		}
		// en anders het juiste knopje aanzetten
		if(mapType === 'map')
		{
			mapView.mapType = Titanium.Map.STANDARD_TYPE;
			sMap.value = true;
		}
		else if(mapType === 'hybrid')
		{
			sHybrid.value = true;
			mapView.mapType = Titanium.Map.HYBRID_TYPE;
		}
		else if(mapType === 'satelite')
		{
			mapView.mapType = Titanium.Map.SATELLITE_TYPE;
			sSatelite.value = true;
		}
	})();
}