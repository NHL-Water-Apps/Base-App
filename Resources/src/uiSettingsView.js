/*
 *	Dit bestand zal alle instellingen bevatten:
 *		- Mogelijkheid bieden om te kunnen kiezen tussen types
 * 			kaart
 * 		- Het invoeren van het formaat van de boot
 * 		- De mogelijkheid bieden om de frequentie van het
 * 			updaten van je positie in te stellen
 */

// 	Het maken van de window
var SettingsWindow = Titanium.UI.createWindow({
	title: 'Opties',		// Titel van de window
	backgroundColor: '#000000',	// En de achtergrond kleur
	navBarHidden: true // Navigatie balk op de iPhone en Ipad onzichtbaar
});

//	De orientatiemodus voor de verschillende platformen
SettingsWindow.orientationModes = [
	Titanium.UI.PORTRAIT,
	Titanium.UI.UPSIDE_PORTRAIT,
	Titanium.UI.LANDSCAPE_LEFT,
	Titanium.UI.LANDSCAPE_RIGHT
];

// 	Aanmaken van extra knopjes indien we op iOS zitten
if(Titanium.Platform.osname === 'iphone' || Titanium.Platform.osname === 'ipad'){
	var next = Titanium.UI.createButton({
	    title : 'Volgende',
	    style : Titanium.UI.iPhone.SystemButtonStyle.DONE,
	});
	 
	var Done = Titanium.UI.createButton({
		title: 'Klaar',
	    systemButton : Titanium.UI.iPhone.SystemButton.DONE,
	});
}


// 	Een lege array die al onze opties zal gaan bevatten
var data = [];

/*
 * 	Data[0] zal een reeks elementen bevatten over de boot eigenschappen
 *	Hiervoor wordt eerst een section aangemaakt.
 *	Deze sectie zal de eigenschappen hoogte en breedte krijgen
 */
// 	De sectie die als groepering zal dienen voor alle booteigenschappen
data[0] = Titanium.UI.createTableViewSection({
	top: '5%',
	headerTitle: 'Boot eigenschappen:',
	touchEnabled: false
});

// 	Aanmaken van een nieuwe rij voor de hoogte
var height = Titanium.UI.createTableViewRow({
	top: 0,
	left: 0,
	width: 'auto',
	selectionStyle: 0,
	height: 'auto'
});

/*
 * 	De rij hoogte zal een textField krijgen (heightField)
 * 	Hierin kunnen gebruikers de hoogte van hun boot ingeven
 * 		zodat de app hier rekening mee kan houden (brughoogte)
 */
var heightField = Titanium.UI.createTextField({
	height: 'auto',
	width: '35%',
	focusable: true,
	right: '5%',
	keyboardType: Titanium.UI.KEYBOARD_NUMBER_PAD,
	returnKeyType: Titanium.UI.RETURNKEY_DONE,
	top: Titanium.Platform.osname === 'android' ? '5%' : '6%',
	hintText: 'Hoogte',
	touchEnabled: true,
	keyboardToolbar: Titanium.Platform.osname === 'iphone' || Titanium.Platform.osname === 'ipad' ? [next, Done] : 0
});
height.add(heightField); // toevoegen aan de rij
// 	En een label aanmaken wat aangeeft wat er in deze rij dient te worden ingevoerd
// 	Dit in verband met als je iets invuld de hintText niet meer zichtbaar is
height.add(Titanium.UI.createLabel({
	text: 'Hoogte (meters):',
	top: Titanium.Platform.osname === 'android' ? '35%' : '6%',
	left: '5%',
	height: 'auto',
	width: 'auto',
	touchEnabled: false
}));
data[0].add(height); // Het geheel toevoegen aan de sectie (booteigenschappen)

// Daarna ook een rij maken om de breedte in te geven
var width = Titanium.UI.createTableViewRow({
	top: 0,
	left: 0,
	width: '100%',
	height: 'auto',
	selectionStyle: 0
});
/*
 * 	De rij breedte zal een textField krijgen (widthField)
 * 	Hierin kunnen gebruikers de breedte van hun boot ingeven
 * 		zodat de app hier rekening mee kan houden (brug breedte of anders)
 */
var widthField = Titanium.UI.createTextField({
	height: 'auto',
	width: '35%',
	right: '5%',
	keyboardType: Titanium.UI.KEYBOARD_NUMBER_PAD,
	returnKeyType: Titanium.UI.RETURNKEY_DONE,
	top: Titanium.Platform.osname === 'android' ? '5%' : '6%',
	keyboardToolbar: Titanium.Platform.osname === 'iphone' || Titanium.Platform.osname === 'ipad' ? [next, Done] : 0,
	hintText: 'Breedte'
});
width.add(widthField); // Deze toevoegen aan de rij
// 	En een label toevoegen die zegt wat er zou moeten komen te staan
//	Dit omdat als we iets ingevuld hebben we de hintText niet meer zien
width.add(Titanium.UI.createLabel({
	text: 'Breedte (meters):',
	top: Titanium.Platform.osname === 'android' ? '35%' : '6%',
	left: '5%',
	touchEnabled: false,
	height: 'auto',
	width: 'auto'
}));
data[0].add(width);	// Het geheel toevoegen aan de booteigenschappen

/*
 * 	De tweede secie:
 * 		- Deze zal de verschillende types kaarten bevatten
 * 		- Op een type kaart klikken zal deze waarde opslaan en de kaart opnieuw instellen
 */
// Een nieuwe sectie aanmaken
data[1] = Titanium.UI.createTableViewSection({
	headerTitle: 'Type kaart:',
	touchEnabled: true
});
// Het type sateliet toevoegen
var sateliteType = Titanium.UI.createTableViewSection({
	headerTitle: 'Selecteer type kaart',
	height: 'auto',
	top: 0,
	left: 0,
	width: 'auto',
	touchEnabled: true
})
var sSatelite = Titanium.UI.createTableViewRow({
	title: 'Satelliet',
	className: "row",
	hasCheck: false,
	touchEnabled: false,
	});
// Het type kaart toevoegen
var sMap = Titanium.UI.createTableViewRow({
	title: 'Kaart',
	className: "row",
	hasCheck: false,
	touchEnabled: false
	});
	
// 	Omdat op android het type hybride niet wordt ondersteund
// 	geven we deze alleen als het niet op android is
if(Titanium.Platform.osname !== 'android'){
	// het type hybride toevoegen
	var sHybrid = Titanium.UI.createTableViewRow({
		title: 'Hybride',
		className: "row",
		hasCheck: false,
		touchEnabled: false
		});
	data[1].add(sHybrid);
}

// En de verschillende types kaart toevoegen aan de data
data[1].add(sSatelite);
data[1].add(sMap);


// De daadwerkelijke tabel creëren
var settingsTable = Titanium.UI.createTableView({
	top: 0,
	left: 0,
	// 	Workaround voor het niet laten zien van de tabel
	height: Titanium.Gesture.isPortrait ? Titanium.Platform.displayCaps.platformHeight : Titanium.Platform.displayCaps.platformWidth,
	width: '100%',
	data:data,
	style: Titanium.UI.iPhone.TableViewStyle.GROUPED
});

/*
 * 	Een scrollview waarin de de tableview gaan stoppen
 * 		dit zodat we de textvelden goed kunnen selecteren
 * 		op android(bug)
 */
var container = Titanium.UI.createScrollView({
	top: 0,
	left: 0,
	layout: 'vertical',
	contentHeight: 'auto',
	contentWidth: 'auto',
	height: '100%',
	width: '100%'
});

// Alles toevoegen aan de window
container.add(settingsTable); // eerst de tabel aan de container toevoegen
SettingsWindow.add(container); // Dan de container aan het scherm toevoegen

// include het bestand met alle opties
Titanium.include('methods/settings.js');
