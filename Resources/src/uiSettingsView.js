/*
 * 	de instellingen van de app bevatten en de 
 *	mogelijkheid bieden om te kunnen kiezen tussen types
 * 	kaart en het invoeren van het formaat van de boot
 */

// Het maken van de window
var SettingsWindow = Titanium.UI.createWindow({
	title: 'Opties',		// Titel van de window
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

// Aanmaken van extra knopjes indien we op iOS zitten
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


// een lege array die al onze opties zal gaan bevatten
var data = [];

/*
 * 	Data[0] zal een reeks elementen bevatten over de boot eigenschappen
 *	Hiervoor wordt eerst een section aangemaakt.
 *	Deze sectie zal de eigenschappen hoogte en breedte krijgen
 */
data[0] = Titanium.UI.createTableViewSection({
	top: '5%',
	headerTitle: 'Boot eigenschappen:',
	touchEnabled: false
});

// Aanmaken van een nieuwe rij voor de hoogte
var height = Titanium.UI.createTableViewRow({
	top: 0,
	left: 0,
	width: 'auto',
	selectionStyle: 0,
	height: 'auto'
});

// Hier een textField aan toevoegen die waar de hoogte ingevoerd kan worden
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
	keyboardToolbar: Titanium.Platform.osname === 'iphone' || Titanium.Platform.osname === 'ipad' ? [next, Done] : 0,
});
height.add(heightField); 		// toevoegen
// en een label om aan te geven wat er zou moeten komen te staan
height.add(Titanium.UI.createLabel({
	text: 'Hoogte (meters):',
	top: Titanium.Platform.osname === 'android' ? '35%' : '6%',
	left: '5%',
	height: 'auto',
	width: 'auto',
	touchEnabled: false
}));
data[0].add(height);

// Daarna ook een rij maken om de breedte in te geven
var width = Titanium.UI.createTableViewRow({
	top: 0,
	left: 0,
	width: '100%',
	height: 'auto',
	selectionStyle: 0
});
// Een textField om de breedte in in te voeren
var widthField = Titanium.UI.createTextField({
	height: 'auto',
	width: '35%',
	right: '5%',
	keyboardType: Titanium.UI.KEYBOARD_NUMBER_PAD,
	returnKeyType: Titanium.UI.RETURNKEY_DONE,
	top: Titanium.Platform.osname === 'android' ? '5%' : '6%',
	hintText: 'Breedte'
});
width.add(widthField); // Deze toevoegen aan de rij
// En een label toevoegen die zegt wat er zou moeten komen te staan
width.add(Titanium.UI.createLabel({
	text: 'Breedte (meters):',
	top: Titanium.Platform.osname === 'android' ? '35%' : '6%',
	left: '5%',
	touchEnabled: false,
	height: 'auto',
	width: 'auto'
}));
data[0].add(width);

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
	height: '100%',
	width: '100%',
	data:data,
	style: Titanium.UI.iPhone.TableViewStyle.GROUPED
	//width: 'auto',
	//showVerticalScrollIndicator: true,
});

var container = Titanium.UI.createScrollView({
	top: 0,
	left: 0,
	layout: 'vertical',
	contentHeight: 'auto',
	contentWidth: 'auto',
	height: '100%',
	width: '100%'
});

// De tabel toevoegen aan de window
container.add(settingsTable);
SettingsWindow.add(container);

// include het bestand met alle opties
Titanium.include('methods/settings.js');
