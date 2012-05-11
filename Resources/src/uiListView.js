// Dit bestand zal alle informatie omtrend het lijstje
// van alle POI's bevatten. En de mogelijkheid om te
// kunnen zoeken tussen deze POI's.

// Het maken van de window
var ListWindow = Titanium.UI.createWindow({
	title: 'Lijst',				// Titel van de window
	backgroundColor: '#FFFFFF',	// En de achtergrond kleur
	navBarHidden: true // Navigatie balk op de iPhone en Ipad onzichtbaar
});

var data = [
    {title:"Lopersbrug 1", description:"De langste brug ter wereld", js:"'Detail.js'"},
    {title:"Vrachtwagenbrug 2,5", description:"De hoogste brug ter wereld", js:"'Detail.js'"},
    {title:"Allesbrug 3", description:"Een brug die sterk is"},
    {title:"Autobrug 4", description:"Een brug onder de grond"},
    {title:"Fietsbrug 5", description:"Nog een brug"}
];  //random data

data.sort(sortName);  //sorteren van de data met de methode sortName
 
function sortName(thisObject,thatObject) {   //op naam sorteren
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


var table = Titanium.UI.createTableView({data:data,  //lijst met searchbar
			search: Titanium.UI.createSearchBar(
			{barColor:'#FFF',  //kleur
   			height:43, //hoogte
   			hintText:'U zoekt..', //hinttekst
   			top:0,
			filterAttribute:'title'  //filteren op titel
			})});
table.addEventListener('click', function(e)
{
		// :(
});
ListWindow.add(table);

//De orientatiemodus voor de verschillende platformen
ListWindow.orientationModes = [
	Titanium.UI.PORTRAIT,
	Titanium.UI.UPSIDE_PORTRAIT,
	Titanium.UI.LANDSCAPE_LEFT,
	Titanium.UI.LANDSCAPE_RIGHT
];