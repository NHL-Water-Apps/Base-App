// Dit bestand zal alle onderdelen gaan bevatten van
// de detail pagina van een POI.
// Dus alle informatie die er is over een POI en een 
// knopje naar het tonen van deze POI op de kaart.

var windowDetailview = Ti.UI.currentWindow;

if(windowDetailview.dataToPass.PICTURE != "geen foto beschikbaar")   //kijken of er een foto beschikbaar is
{
var labels = 
	Ti.UI.createImageView({url:'http://www.moorsmagazine.com/images13/brug002.jpg'})  //dummylink voor foto, dit kan dataToPass zijn
}

else   //geen foto beschikbaar
{	var labels = Titanium.UI.createLabel({
	text : config.geenFoto})
}
windowDetailview.add(labels);  //toevoegen aan tabel



//eddie oud
//var windowDetailView = Titanium.UI.currentWindow; 
		
//var windowLabel = Titanium.UI.createLabel({
	//text: 'Dit is een nieuw scherm vanaf de annotation:' + windowDetailView.title,
	//textAlign: 'center',
	//width: 'auto',
	//height: 'auto'
//});
		
//windowDetailView.add(windowLabel);