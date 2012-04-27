// Dit bestand zal de eerste pagina zijn die 
// getoond wordt met het opstarten van de app
// Deze pagina zal o.a. de kaart bevatten met alle
// POI's erop.

// Het maken van de window
var MapWindow = Titanium.UI.createWindow({
	title: 'Kaart',				// Titel van de window
	backgroundColor: '#FFFFFF'	// En de achtergrond kleur
});

// Deze krijgt een .open om zo te starten met dit window open
MapWindow.open();
