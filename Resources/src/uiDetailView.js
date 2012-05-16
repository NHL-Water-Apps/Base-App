// Dit bestand zal alle onderdelen gaan bevatten van
// de detail pagina van een POI.
// Dus alle informatie die er is over een POI en een 
// knopje naar het tonen van deze POI op de kaart.

var windowDetailview = Ti.UI.currentWindow;

var containerScrollView = Titanium.UI.createScrollView({
	top: 0,
	layout: 'vertical',
	height: '100%',
	width: '100%',
	contentHeight: 'auto',
	
})

if(windowDetailview.dataToPass.PICTURE != "geen foto beschikbaar" && Titanium.App.Properties.getBool('laadData', false))   //kijken of er een foto beschikbaar is
{
	alert(Titanium.App.Properties.getBool('laadData', false));
var labels = 
	Ti.UI.createImageView({url:'http://www.moorsmagazine.com/images13/brug002.jpg',
	height: '35%',
	width : '80%',
	top: '2%',
	})  //dummylink voor foto, dit kan dataToPass zijn
}

else   //geen foto beschikbaar
{   if(dataSwitch.value)
	{var labels = Titanium.UI.createLabel({
	text : config.geenFoto})}
	else
	{
	var labels = Titanium.UI.createLabel({
	text : "Foto laden is uitgeschakeld, schakel deze in bij de instellingen."})
	}
}

var Type = Titanium.UI.createLabel({
	text : 'Type: ' +windowDetailview.dataToPass.BRIDGETYPE,
	textAlign : 'left',
	width : 'auto',
	heigth : 'auto'
});
var Hoogte = Titanium.UI.createLabel({
	text : 'Hoogte: ' + windowDetailview.dataToPass.HEIGTH,
	textAlign : 'left',
	width : 'auto',
	heigth : 'auto'
});
var Breedte = Titanium.UI.createLabel({
	text : 'Breedte' + windowDetailview.dataToPass.WIDTH,
	textAlign : 'left',
	width : 'auto',
	heigth : 'auto'
});
containerScrollView.add(labels);
containerScrollView.add(Type);
containerScrollView.add(Hoogte);
containerScrollView.add(Breedte);  //toevoegen aan tabel
windowDetailview.add(containerScrollView )


//eddie oud
//var windowDetailView = Titanium.UI.currentWindow; 
		
//var windowLabel = Titanium.UI.createLabel({
	//text: 'Dit is een nieuw scherm vanaf de annotation:' + windowDetailView.title \n +,
	//textAlign: 'center',
	//width: 'auto',
	//height: 'auto'
//});
		
//windowDetailView.add(windowLabel);