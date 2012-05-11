// Dit bestand zal alle onderdelen gaan bevatten van
// de detail pagina van een POI.
// Dus alle informatie die er is over een POI en een 
// knopje naar het tonen van deze POI op de kaart.

var windowDetailView = Titanium.UI.currentWindow; 
		
var windowLabel = Titanium.UI.createLabel({
	text: 'Dit is een nieuw scherm vanaf de annotation:' + windowDetailView.title,
	textAlign: 'center',
	width: 'auto',
	height: 'auto'
});
		
windowDetailView.add(windowLabel);