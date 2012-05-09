// Dit bestand zal alle informatie omtrend het lijstje
// van alle POI's bevatten. En de mogelijkheid om te
// kunnen zoeken tussen deze POI's.

// Het maken van de window
var ListWindow = Titanium.UI.createWindow({
	title: 'Lijst',				// Titel van de window
	backgroundColor: '#FFFFFF',	// En de achtergrond kleur
	navBarHidden: true // Navigatie balk op de iPhone en Ipad onzichtbaar
});

var data = [{title:"Brug 1"},{title:"Brug 2"},{title:"Brug 3"},{title:"Brug 4"}];  //random data
var table = Titanium.UI.createTableView({data:data,
			search: Titanium.UI.createSearchBar(  //zoekbalk
			{barColor:'#FFF',   //kleur zoekbalk
   			height:43,   //hoogte zoekbalk
   			hintText:'U zoekt een..',  //vraag in de zoekbalk
   			top:0,
			filterAttribute:'title' //zoeken op titel
			})});


ListWindow.add(table);

//De orientatiemodus voor de verschillende platformen
ListWindow.orientationModes = [
	Titanium.UI.PORTRAIT,
	Titanium.UI.UPSIDE_PORTRAIT,
	Titanium.UI.LANDSCAPE_LEFT,
	Titanium.UI.LANDSCAPE_RIGHT
];