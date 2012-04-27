// Dit bestand zal alle informatie omtrend het lijstje
// van alle POI's bevatten. En de mogelijkheid om te
// kunnen zoeken tussen deze POI's.

// Het maken van de window
var ListWindow = Titanium.UI.createWindow({
	title: 'Lijst',				// Titel van de window
	backgroundColor: '#FFFFFF',	// En de achtergrond kleur
	navBarHidden: true // Navigatie balk op de iPhone en Ipad onzichtbaar
});

//De orientatiemodus voor de verschillende platformen
ListWindow.orientationModes = [
	Titanium.UI.PORTRAIT,
	Titanium.UI.UPSIDE_PORTRAIT,
	Titanium.UI.LANDSCAPE_LEFT,
	Titanium.UI.LANDSCAPE_RIGHT
];