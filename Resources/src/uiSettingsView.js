/*
 * 	de instellingen van de app bevatten en de 
 *	mogelijkheid bieden om te kunnen kiezen tussen types
 * 	kaart en het invoeren van het formaat van de boot
 */

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

// een lege array die al onze opties zal gaan bevatten
var data = [];
/*
 * 	Data[0] zal een reeks elementen bevatten over de boot eigenschappen
 *	Hiervoor wordt eerst een section aangemaakt.
 *	Deze sectie zal de eigenschappen hoogte en breedte krijgen
 */
data[0] = Titanium.UI.createTableViewSection({
	top: Math.round(Titanium.Platform.displayCaps.platformHeight*0.05),
	headerTitle: 'Boot eigenschappen:',
	size: 20,
	touchEnabled: false
});

// Aanmaken van een nieuwe rij voor de hoogte
var height = Titanium.UI.createTableViewRow({
	touchEnabled: false,
	className: "row",
	height: 'auto'
});
// Hier een textField aan toevoegen die waar de hoogte ingevoerd kan worden
var heightField = Titanium.UI.createTextField({
	height: 'auto',
	width: Math.round(Titanium.Platform.displayCaps.platformWidth*0.35),
	right: Math.round(Titanium.Platform.displayCaps.platformWidth*0.05),
	keyboardType: Titanium.UI.KEYBOARD_NUMBER_PAD,
	returnKeyType: Titanium.UI.RETURNKEY_DONE,
	top: Math.round(Titanium.Platform.displayCaps.platformHeight*0.01),
	hintText: 'Hoogte',
	touchEnabled: true
});
height.add(heightField); 		// toevoegen
// en een label om aan te geven wat er zou moeten komen te staan
height.add(Titanium.UI.createLabel({
	text: 'Hoogte (meters):',
	top: Math.round(Titanium.Platform.displayCaps.platformHeight*0.035),
	left: Math.round(Titanium.Platform.displayCaps.platformWidth*0.05),
	height: 'auto',
	width: 'auto',
	touchEnabled: false
}));
data[0].add(height); // Deze rij toevoegen

// Daarna ook een rij maken om de breedte in te geven
var width = Titanium.UI.createTableViewRow({
	touchEnabled: false,
	className: "row",
	height: 'auto'
});
// Een textField om de breedte in in te voeren
var widthField = Titanium.UI.createTextField({
	height: 'auto',
	width: Math.round(Titanium.Platform.displayCaps.platformWidth*0.35),
	right: Math.round(Titanium.Platform.displayCaps.platformWidth*0.05),
	keyboardType: Titanium.UI.KEYBOARD_NUMBER_PAD,
	returnKeyType: Titanium.UI.RETURNKEY_DONE,
	top: Math.round(Titanium.Platform.displayCaps.platformHeight*0.01),
	hintText: 'Breedte'
});
width.add(widthField); // Deze toevoegen aan de rij
// En een label toevoegen die zegt wat er zou moeten komen te staan
width.add(Titanium.UI.createLabel({
	text: 'Breedte (meters):',
	top: Math.round(Titanium.Platform.displayCaps.platformHeight*0.035),
	left: Math.round(Titanium.Platform.displayCaps.platformWidth*0.05),
	//touchEnabled: false,
	height: 'auto',
	width: 'auto'
}));
// en deze rij toevoegen aan de tabel
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
var sSatelite = Titanium.UI.createTableViewRow({
	title: 'Satelliet',
	className: "row",
	hasCheck: false,
	touchEnabled: true
	});
// Het type kaart toevoegen
var sMap = Titanium.UI.createTableViewRow({
	title: 'Kaart',
	className: "row",
	hasCheck: false,
	touchEnabled: true
	});
// het type hybride toevoegen
var sHybrid = Titanium.UI.createTableViewRow({
	title: 'Hybride',
	className: "row",
	hasCheck: false,
	touchEnabled: true
	});
// En de verschillende types kaart toevoegen aan de data
data[1].add(sSatelite);
data[1].add(sMap);
data[1].add(sHybrid);

// De daadwerkelijke tabel creëren
var settingsTable = Titanium.UI.createTableView({
	style: Titanium.UI.iPhone.TableViewStyle.GROUPED, // Om de opmaak natuurlijk te maken voor iPhone (geen effect op android)
	data: data,				// Hier de reeds gemaakt tabel aan meegeven
	touchEnabled: false
});

// include het bestand met alle opties
Titanium.include('methods/settings.js');

// De tabel toevoegen aan de window
SettingsWindow.add(settingsTable);
