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
})();

Titanium.Gesture.addEventListener('orientationchange', function () {
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
	mapView.mapType = Titanium.Map.STANDARD_TYPE, // juiste kaart type instellen
	Titanium.App.Properties.setString('mapType', 'map'); // en opslaan
});
// idem
sSatelite.addEventListener('click', function(){
	sMap.hasCheck = false;
	sSatelite.hasCheck = true;
	if(Titanium.Platform.osname !== 'android'){
		sHybrid.hasCheck = false;
	}
	mapView.mapType = Titanium.Map.SATELLITE_TYPE;
	Titanium.App.Properties.setString('mapType', 'satelite');
});
// idem maar omdat dit kaart type het niet doet op android staat er een if voor
if(Titanium.Platform.osname !== 'android'){
	sHybrid.addEventListener('click', function(){
		sMap.hasCheck = false;
		sSatelite.hasCheck = false;
		sHybrid.hasCheck = true;
		mapView.mapType = Titanium.Map.HYBRID_TYPE;
		Titanium.App.Properties.setString('mapType', 'hybrid');
	});
}

settingsTable.addEventListener('click', function(){
	if(heightField.focus = true){
		heightField.blur();
	};
	if(widthField.focus = true){
		widthField.blur();
	};
});
//	Kopelen van de controle functies aan de inputvelden
if(config.showHeight)	// indien we deze optie geven
{	
	heightField.addEventListener('blur', function(){
		checkField(heightField, 'height'); // controle op dit veld aanroepen
		
		//zodra er opnieuw iets wordt ingevoerd in de heightField worden alle annotations van de map verwijderd
		mapView.removeAllAnnotations();
		
		//Hierna worden er opnieuw annotations op de kaart getoond
		
		//hier maakt hij een array aan waarin de annotations worden opgeslagen
		var annotationsMap = [];
		//hiermee loopt hij door de array met data heen
		for(var i = 0; i < data.length; i++){
			annotationsMap[i] = Titanium.Map.createAnnotation({ //voor elke index maakt hij een annotation aan
				// Custom attribute zodat we een detail pagina kunnen maken
				dataToPass: 	data[i],
				latitude: 		data[i].LAT, //de latitude van de brug
				longitude: 		data[i].LON, //de longitude van de brug
				title: 			data[i].title, //de titel van de brug
				subtitle: 		'H: ' + data[i].HEIGTH + 'm' + '\tB: ' + data[i].WIDTH + 'm', //de hoogte van de brug
				//image: 			'/img/OnMap/BrugGroen.png',
				rightButton: 	Titanium.Platform.osname === 'android' ? '/img/pijl.png' : Titanium.UI.iPhone.SystemButton.DISCLOSURE, // de button die op de annotation wordt getoond zodra er op geklikt wordt.
				animate: 		true //hiermee wordt er een animatie toegevoegd aan de annotation
			});
			//annotationImage();
			
			//Hier wordt gechecked of de hoogte van de brug kleiner is dan de hoogte van de boot + de brugtype mag niet gelijk zijn aan beweegbare brug om een rode annotation te plaatsen
			if(data[i].HEIGTH < Titanium.App.Properties.getString('height', '0') && Titanium.App.Properties.getString('height', '0') !=  '0' && data[i].BRIDGETYPE != 'beweegbare brug'){
					annotationsMap[i].image = '/img/OnMap/BrugRood.png'; 
				}
				else{
					annotationsMap[i].image = '/img/OnMap/BrugGroen.png'; //in alle andere gevallen komen er groene annations op de map
				}
		
			};
			mapView.addAnnotations(annotationsMap);
		});
}

// indien we een breedte willen weergeven
if(config.showWidth)
{
	widthField.addEventListener('blur', function(){
		checkField(widthField, 'width'); // controle op dit veld aanroepen
	});
}

/*
 * Een functies die zullen kijken of een textvelden 'gedeselecteerd' word, idien:
 * 		- Controle of het ingevoerde valid is
 * 		- Indien deze waarde opslaan,
 * 			anders zal gekeken worden of er een valid iets in zat
 * 			dit zal dan opgeslagen worden en weergegeven worden in
 * 			het tekstvak
 * 		- Als er niets valids gevonden is in het textvak dan zal
 * 			de text in het textvak rood gemaakt worden
 * 
 * 	@fieldName: de textField die gecontroleerd dient te worden
 * 	@saveNam: string, mee te geven naam waarin de waarde (indien juist) zal worden opgeslagen
 * 				om zo later weer te gebruiken
 */
function checkField(fieldName, saveName){
	var rExp  = /[0-9]+(\.[0-9]+)?/; 							// Regualar expression die test voor juiste getallen
	if(fieldName.value === '' || rExp.test(fieldName.value)) 	// kijken of er een juist iets is ingevuld
	{
		var temp = rExp.exec(fieldName.value); 				// kijken of er een getal uit de regular expression komt
		if(fieldName.value === '') { Titanium.App.Properties.setString( saveName, null); } 
		else if(temp !== null && temp.length > 0){				// kleine controle (gaf een error zonder vreemd genoeg)
			Titanium.App.Properties.setString(saveName, temp[0]); // anders het eerste getal uit de regular expression opslaan
			fieldName.value = temp[0];							 // deze waarde ook weer terug zetten
			fieldName.color = 'black';							 // de kleur van het tekstvak weer zwart maken	
		}
	}
	else{														// indien de invoer niet valid is
		fieldName.color = 'red';								// het textveld een andere kleur geven
	}
}

/*
 * 	Eventlistener toevoegen die kijkt of er op het laden van afbeeldingen switch gedrukt is
 * 	Indien zo nieuwe waarde opslaan
 */
dataSwitch.addEventListener('change', function(){
	// Het opslaan van de waarde van de switch
	Titanium.App.Properties.setBool('laadData', dataSwitch.value);
});
