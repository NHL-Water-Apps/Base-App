/*
 * 	Dit bestand zal alle informatie omtrend het lijstje
 * 	van alle POI's bevatten. En de mogelijkheid om te
 *		kunnen zoeken tussen deze POI's.
 */

// Het maken van de window
var ListWindow = Titanium.UI.createWindow({
	title: 'Lijst',				// Titel van de window
	backgroundColor:'#000000',	// En de achtergrond kleur
	navBarHidden: true // Navigatie balk op de iPhone en Ipad onzichtbaar
});

data.sort(sortName);  //sorteren van de data
 
function sortName(thisObject,thatObject) {     //sorteerfunctie
    if (thisObject.title > thatObject.title)
    {
        return 1;
    }
    else if (thisObject.title < thatObject.title)
    {
        return -1;
    }
    return 0;
  }

//De Searchbar voor de lijst
var tableSearchBar = Titanium.UI.createSearchBar(
			{barColor: '#000000',    //kleur voor zoekbar
   			//height: Titanium.Gesture.isPortrait() ? '12%' : '20%',
   			height: Titanium.Platform.osname == 'iphone' || Titanium.Platform.osname == 'ipad' ? 43 : 55,
   			hintText: config.zoekText,  //hulptekst
   			top:0, //de afstand vanaf de bovenkant
			filterAttribute:'title',  //filteren op title wanneer er iets ingevoerd wordt
			zIndex: 9 //de z-Index die hij heeft om de hoogtes te bepalen
		});

var table = Titanium.UI.createTableView({data:data,       //list inclusief zoekveld
			search: tableSearchBar, //hier wordt de tableSearchbar aan de tabel toegevoegd
			zIndex: 0 //de z-Index die hij heeft om de hoogtes te bepalen hier staat hij op 0 om de searchbar erboven te krijgen
			});

table.addEventListener('click', function(e){   //eventlistener	
	var DetailView = Titanium.UI.createWindow({ //aanmaken nieuw window
		title: e.rowData.title,  //titel nieuwe window
	 	dataToPass: e.rowData,  //data versturen naar detailscherm
	 	backgroundColor: '#FFF',  //achtergrondkleur
	 	url:'src/uiDetailView.js',  //url van pagina is uiDetailView.js
	 	navBarHidden: false, //de navbar op iphone en ipad zichtbaar gemaakt
	 	tabBarHidden: true //de tabBar op de iphone en ipad wordt onzichtbaar gemaakt
}); 
		
		ListTab.open(DetailView, {animated: true});	//nieuwe window openenen
});

//Op de iphone en ipad voegt hij de tableSearchbar ook apart toe aan de ListWindow om zo tijdens het scrollen altijd zichtbaar te zijn
if(Titanium.Platform.osname === 'iphone' || Titanium.Platform.osname === 'ipad'){
	ListWindow.add(tableSearchBar); 
}
ListWindow.add(table);

Titanium.include('methods/list.js');

//De orientatiemodus voor de verschillende platformen
ListWindow.orientationModes = [
	Titanium.UI.PORTRAIT,
	Titanium.UI.UPSIDE_PORTRAIT,
	Titanium.UI.LANDSCAPE_LEFT,
	Titanium.UI.LANDSCAPE_RIGHT
];