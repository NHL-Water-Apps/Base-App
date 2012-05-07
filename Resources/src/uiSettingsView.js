// Dit bestand zal de rest van de informatie omtrend
// de instellingen van de app bevatten en de 
// mogelijkheid bieden om te kunnen kiezen tussen types
// kaart en het invoeren van het formaat van de boot

// Het maken van de window
var SettingsWindow = Titanium.UI.createWindow({
	title: 'Opties',			// Titel van de window
	backgroundColor: '#000000',	// En de achtergrond kleur
	navBarHidden: true // Navigatie balk op de iPhone en Ipad onzichtbaar
});

//De orientatiemodus voor de verschillende platformen
SettingsWindow.orientationModes = [
	Titanium.UI.PORTRAIT,
	Titanium.UI.UPSIDE_PORTRAIT,
	Titanium.UI.LANDSCAPE_LEFT,
	Titanium.UI.LANDSCAPE_RIGHT
];
	   
// Dit is de daadwerkelijke textbox
var WidthField = Titanium.UI.createTextField({
	borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED, // De stijl van de rand
	value: Titanium.App.Properties.getInt("BoatWidth", 0) !== 0 ? Titanium.App.Properties.getInt("BoatWidth", 0) : "" ,  // inladen van de "opgeslagen" waarde breedte van de boot (0 indien niet bestaand)
	height: 'auto',							// De hoogte
	hintText: 'Breedte',
	top: 20,							// Plaatsing van het vakje vanaf de bovenkant
	width: 100, 						// de breedte van het vakje (70% van de breedte van de app)
	left: 135,							// De plaatsing vanuit links
	backgroundColor: '#FFFFFF'			// achtergrond kleur
});

// Een label wat aangeeft wat er in de tekstfield dient te worden ingevuld
var WidthLabel = Titanium.UI.createLabel({
	top: 20,					// positie vanuit de bovenkant
	left: 10,					// vanuit de linkerkant
	text: 'Breedte(meter):',	// De tekst in het label
	width: 'auto',				// de breedte
	color: '#FFFFFF',	// kleur (standaard zwart, zwart op zwart?)
	height: 40,					// Hoogte van deze label
	textAlign: 'left'			// uitlijning van de tekst
});

// Dit is de daadwerkelijke textbox
var HeightField = Titanium.UI.createTextField({
	borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED, // De stijl van de rand
	value: Titanium.App.Properties.getInt("BoatHeight", 0) !== 0 ? Titanium.App.Properties.getInt("BoatHeight", 0) : "" ,  // inladen van de "opgeslagen" waarde breedte van de boot (0 indien niet bestaand)
	height: 'auto',						// De hoogte
	hintText: 'Hoogte',
	top: 80,							// Plaatsing van het vakje vanaf de bovenkant
	width: 100, 						// de breedte van het vakje (70% van de breedte van de app)
	left: 135,							// De plaatsing vanuit links
	backgroundColor: '#FFFFFF'			// achtergrond kleur
});

// Een label wat aangeeft wat er in de tekstfield dient te worden ingevuld
var HeightLabel = Titanium.UI.createLabel({
	top: 80,					// positie vanuit de bovenkant
	left: 10,					// vanuit de linkerkant
	text: 'Hoogte(meter):',		// De tekst in het label
	width: 'auto',				// de breedte
	color: '#FFFFFF',	// kleur (standaard zwart, zwart op zwart?)
	height: 40,					// Hoogte van deze label
	textAlign: 'left'			// uitlijning van de tekst
});


// De button om alle ingevulde waarden te resetten
var ClearButton = Titanium.UI.createButton({
	borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED, // De stijl van de rand
	title: "Wissen",			// Wat er in de knop staat
	height: 'auto',					// De hoogte 
	width: 85,				// Breedte: auto, app bepaalt hoe breedt aan de had van de tekst
	top: 200,					// positie vanuit de bovenkant
	right: 20					// positie vanuit de rechterkant
});

// Label boven de types kaart
var MapLabel = Titanium.UI.createLabel({
	text: 'Selecteer het type kaart:',
	height: 'auto',
	width: 'auto',
	bottom: 100,
	left: 20
});

// Selecteren welk type kaart je wilt
var sSatelite = Titanium.UI.createSwitch({
	style:Titanium.UI.Android.SWITCH_STYLE_TOGGLEBUTTON,
    titleOff:'Satelite',
    titleOn:'Satelite',
   	bottom: 50,
	left: 40,
    value:false
});
var sMap = Titanium.UI.createSwitch({
	style:Titanium.UI.Android.SWITCH_STYLE_TOGGLEBUTTON,
    titleOff:'Map',
    titleOn:'Map',
   	bottom: 50,
	left: 93,
    value:false
});
var sHybrid = Titanium.UI.createSwitch({
	style:Titanium.UI.Android.SWITCH_STYLE_TOGGLEBUTTON,
    titleOff:'Hybrid',
    titleOn:'Hybrid',
   	bottom: 50,
	left: 144,
    value:false
});

// add all the methods to this page
Titanium.include('methods/settings.js');

// Voeg de textvelden toe voor breedte
SettingsWindow.add(WidthLabel);		// van het label voor het tekstvakje breedte
SettingsWindow.add(WidthField); 	// Voor de breedte van de boot

// Voeg de textvelden toe voor hoogte
SettingsWindow.add(HeightLabel);		// van het label voor het tekstvakje hoogte
SettingsWindow.add(HeightField); 		// Voor de hoogte van de boot

SettingsWindow.add(ClearButton);	// de wis knop


// De types kaart
SettingsWindow.add(sMap);
SettingsWindow.add(sHybrid);
SettingsWindow.add(sSatelite);
SettingsWindow.add(MapLabel); // en een label
