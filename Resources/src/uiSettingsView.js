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

var data = [];

data[0] = Titanium.UI.createTableViewSection({
	top: Math.round(Titanium.Platform.displayCaps.platformHeight*0.05),
	headerTitle: 'Boot eigenschappen:',
	size: 20,
	touchEnabled: false
});
var height = Titanium.UI.createTableViewRow({
	// verdere boot eigenschappen
	touchEnabled: false,
	className: "row",
	height: 'auto'
	});
var heightField = Titanium.UI.createTextField({
	height: 'auto',
	width: Math.round(Titanium.Platform.displayCaps.platformWidth*0.35),
	right: Math.round(Titanium.Platform.displayCaps.platformWidth*0.05),
	top: Math.round(Titanium.Platform.displayCaps.platformHeight*0.01),
	hintText: 'Hoogte',
	touchEnabled: true
});
height.add(heightField);
height.add(Titanium.UI.createLabel({
	text: 'Hoogte (meters):',
	top: Math.round(Titanium.Platform.displayCaps.platformHeight*0.035),
	left: Math.round(Titanium.Platform.displayCaps.platformWidth*0.05),
	height: 'auto',
	width: 'auto',
	touchEnabled: false
}));
data[0].add(height);
var width = Titanium.UI.createTableViewRow({
	// verdere boot eigenschappen
	touchEnabled: false,
	className: "row",
	height: 'auto'
	});
var widthField = Titanium.UI.createTextField({
	height: 'auto',
	width: Math.round(Titanium.Platform.displayCaps.platformWidth*0.35),
	right: Math.round(Titanium.Platform.displayCaps.platformWidth*0.05),
	top: Math.round(Titanium.Platform.displayCaps.platformHeight*0.01),
	hintText: 'Breedte'
});
width.add(widthField);
width.add(Titanium.UI.createLabel({
	text: 'Breedte (meters):',
	top: Math.round(Titanium.Platform.displayCaps.platformHeight*0.035),
	left: Math.round(Titanium.Platform.displayCaps.platformWidth*0.05),
	//touchEnabled: false,
	height: 'auto',
	width: 'auto'
}));
data[0].add(width);

data[1] = Titanium.UI.createTableViewSection({
	headerTitle: 'Type kaart:',
	touchEnabled: true
});
var sSatelite = Titanium.UI.createTableViewRow({
	title: 'Satelliet',
	className: "row",
	hasCheck: false,
	touchEnabled: true
	});
var sMap = Titanium.UI.createTableViewRow({
	title: 'Kaart',
	className: "row",
	hasCheck: false,
	touchEnabled: true
	});
var sHybrid = Titanium.UI.createTableViewRow({
	title: 'Hybride',
	className: "row",
	hasCheck: false,
	touchEnabled: true
	});
data[1].add(sSatelite);
data[1].add(sMap);
data[1].add(sHybrid);

var settingsTable = Titanium.UI.createTableView({
	style: Titanium.UI.iPhone.TableViewStyle.GROUPED,
	data: data,
	//touchEnabled: false
});

// include het bestand met alle opties
Titanium.include('methods/settings.js');

SettingsWindow.add(settingsTable);
