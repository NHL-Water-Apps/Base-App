/*
 * 	Dit bestand zal alle informatie omtrend het lijstje
 * 	van alle POI's bevatten. En de mogelijkheid om te
 *		kunnen zoeken tussen deze POI's.
 */

// Het maken van de window
var ListWindow = Titanium.UI.createWindow({
	title: 'Lijst',				// Titel van de window
	backgroundColor: '#FFFFFF',	// En de achtergrond kleur
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


var table = Titanium.UI.createTableView({data:data,       //list inclusief zoekveld
			search: Titanium.UI.createSearchBar(
			{barColor: Titanium.Platform.osname === 'iphone' || Titanium.Platform.osname === 'ipad' ? '#000000' : '#FFF',    //kleur voor zoekbar
   			height:55,
   			hintText:'U zoekt..',  //hulptekst
   			top:0,
			filterAttribute:'title'  //filteren op title wanneer er iets ingevoerd wordt
			})});

table.addEventListener('click', function(e)   //eventlistener
{	
	 var DetailView = Titanium.UI.createWindow({ //aanmaken nieuw window
	 	title: e.rowData.title,  //titel nieuwe window
	 	dataToPass: e.rowData.PICTURE,  //data versturen naar detailscherm
	 	backgroundColor: '#FFF',  //achtergrondkleur
	 	url:'src/uiDetailView.js',  //url van pagina is uiDetailView.js
}); 
		
		ListTab.open(DetailView, {animated: true});	//nieuwe window openenen
}
)
ListWindow.add(table);

Titanium.include('methods/list.js');

//De orientatiemodus voor de verschillende platformen
ListWindow.orientationModes = [
	Titanium.UI.PORTRAIT,
	Titanium.UI.UPSIDE_PORTRAIT,
	Titanium.UI.LANDSCAPE_LEFT,
	Titanium.UI.LANDSCAPE_RIGHT
];