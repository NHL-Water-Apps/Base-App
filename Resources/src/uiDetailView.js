// Dit bestand zal alle onderdelen gaan bevatten van
// de detail pagina van een POI.
// Dus alle informatie die er is over een POI en een 
// knopje naar het tonen van deze POI op de kaart.
var windowDetailview = Ti.UI.currentWindow;   //tabview , hierin komt de scrollview
Titanium.include('config.js');
var containerScrollView = Titanium.UI.createScrollView({   //scrollview
	top: 0,
	layout: 'vertical',
	height: '100%',
	width: '100%', 
	backgroundColor:'#000000',  
	contentHeight: 'auto'
});

if(windowDetailview.dataToPass.PICTURE != "geen foto beschikbaar" && Titanium.App.Properties.getBool('laadData', false))   //kijken of er een foto beschikbaar is
//en of het laten zien van foto's aangevinkt is in de settings.
{
	var imagebridge =       //foto van de brug tonen
	Ti.UI.createImageView({url:'http://www.moorsmagazine.com/images13/brug002.jpg',  //dummylink voor foto, dit kan dataToPass zijn
	height: '35%',
	width : '80%',
	top: '2%',
});
}
else   //geen foto beschikbaar
{   if(Titanium.App.Properties.getBool('laadData', false))     //wanneer foto's laden ingeschakeld is en er is geen foto beschikbaar toon de tekst dat er geen foto beschikbaar is
	{var imagebridge = Titanium.UI.createLabel({
	text : config.geenFoto})}
	else
	{
	var imagebridge = Titanium.UI.createLabel({  //als het laden van foto's uitgeschakeld is geef hierover een melding
	text : config.fotoUitgeschakeld,
	height: '35%',
	width : '80%',
	top: '2%',
	position: 'center'});
	}
}
//Hieronder staan de eigenschappen van de brug. Type, hoogte etc
var Type = Titanium.UI.createLabel({
	text : config.type +windowDetailview.dataToPass.BRIDGETYPE,
	textAlign : "left",
	left: '3 %',
	width : 'auto',
	heigth : 'auto'
});
var Hoogte = Titanium.UI.createLabel({
	text : config.hoogte + windowDetailview.dataToPass.HEIGTH+ config.eenheid,
	textAlign : "left",
	left: '3 %',
	width : 'auto',
	heigth : 'auto'
});
var Breedte = Titanium.UI.createLabel({
	text : config.breedte + windowDetailview.dataToPass.WIDTH + config.eenheid,
	textAlign : "left",
	left: '3 %',
	width : 'auto',
	heigth : 'auto'
});
var Adres = Titanium.UI.createLabel({
	text : config.adres + windowDetailview.dataToPass.ADRESS,
	textAlign : "left",
	left: '3 %',
	top: '2%',
	width : 'auto',
	heigth : 'auto'
});
var Toonkaart = Titanium.UI.createButton({   //de button om de brug op de kaart te tonen
		
		top: 80, 
		height: 'auto',
		width: 'auto', 
		title: config.ToonopKaart,
		position: 'center'
});
Titanium.include('methods/detail.js'); //hierin staan alle functies van de detailview
containerScrollView.add(imagebridge);
containerScrollView.add(Type);
containerScrollView.add(Hoogte);
containerScrollView.add(Breedte); 
containerScrollView.add(Toonkaart);  //toevoegen aan tabel
windowDetailview.add(containerScrollView )   //scrollview aan de window toevoegen