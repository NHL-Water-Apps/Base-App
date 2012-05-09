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
	if(mapType === 'map') { sMap.hasCheck = true; }
	else if (mapType === 'satelite') { sSatelite.hasCheck = true; }
	else { sHybrid.hasCheck = true; } // Niet met een else if omdat er aan het begin al gechecked wordt
})();

sMap.addEventListener('click', function(){
	sMap.hasCheck = true;
	sSatelite.hasCheck = false;
	sHybrid.hasCheck = false;
});
sHybrid.addEventListener('click', function(){
	sMap.hasCheck = false;
	sSatelite.hasCheck = false;
	sHybrid.hasCheck = true;
});
sSatelite.addEventListener('click', function(){
	sMap.hasCheck = false;
	sSatelite.hasCheck = true;
	sHybrid.hasCheck = false;
}); 
//sHybrid.addEventListener('click', SetMap('hybrid')); 
//sSatelite.addEventListener('click', SetMap('satelite')); 


