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
	title: 				'Opties',		
	backgroundColor: 	'#000000',	
	// Navigatie balk verstoppen op iOS
	navBarHidden: 		true
});

//	De orientatiemodus voor de verschillende platformen
SettingsWindow.orientationModes = [
	Titanium.UI.PORTRAIT,
	Titanium.UI.UPSIDE_PORTRAIT,
	Titanium.UI.LANDSCAPE_LEFT,
	Titanium.UI.LANDSCAPE_RIGHT
];

// 	Aanmaken van extra knopjes indien we op iOS zitten
// 	Moet nog functionaliteit aan gekoppeld worden
if(Titanium.Platform.osname === 'iphone' || Titanium.Platform.osname === 'ipad'){
	var next = Titanium.UI.createButton({
	    title: 	config.volgendeText,
	    style: 	Titanium.UI.iPhone.SystemButtonStyle.DONE,
	});
	
	var flex = Titanium.UI.createButton({
	    systemButton: Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE,
	}); 

	var done = Titanium.UI.createButton({
		title: 			config.klaarText,
	    systemButton: 	Titanium.UI.iPhone.SystemButton.DONE,
	});
}


// 	Een lege array die al onze opties zal gaan bevatten
var tableData = [];

/*
 * 	Data[0] zal een reeks elementen bevatten over de boot eigenschappen
 *	Hiervoor wordt eerst een section aangemaakt.
 *	Deze sectie zal de eigenschappen hoogte en breedte krijgen
 */
// Indien we geen hoogte en geen breedte willen kunnen invoeren
if(config.showHeight || config.showWidth) // hoeven we ook geen sectie aan te maken
{ 
	// De sectie die als groepering zal dienen voor alle booteigenschappen
	tableData[0] = Titanium.UI.createTableViewSection({
		top: 			'5%',
		headerTitle: 	config.bootHeader,
		touchEnabled: 	false
	});
}

// als we een hoogte moeten kunnen ingeven
if(config.showHeight)
{
	/*
 	 * 	De rij hoogte zal een textField krijgen (heightField)
	 * 	Hierin kunnen gebruikers de hoogte van hun boot ingeven
 	 * 		zodat de app hier rekening mee kan houden (brughoogte)
	 */

	// 	Aanmaken van een nieuwe rij voor de hoogte
	var height = Titanium.UI.createTableViewRow({
		top: 	0,
		left: 	0,
		width: 	'auto',
		selectionStyle: 0,
		height: 'auto'
	});

	/*
	 * 	De rij hoogte zal een textField krijgen (heightField)
	 * 	Hierin kunnen gebruikers de hoogte van hun boot ingeven
	 * 		zodat de app hier rekening mee kan houden (brughoogte)
	 */
	var heightField = Titanium.UI.createTextField({
		height: 	'auto',
		width: 		'35%',
		focusable: 	true,
		// Inladen van de opgeslagen waarde
		value: 		Titanium.App.Properties.getString('height', null),
		right: 		'5%',
		keyboardType: Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION,
		returnKeyType: Titanium.UI.RETURNKEY_DONE,
		top: 		Titanium.Platform.osname === 'android' ? '5%' : '6%',
		hintText: 	config.hoogteHintText,
		touchEnabled: true,
		//keyboardToolbar: Titanium.Platform.osname === 'iphone' || Titanium.Platform.osname === 'ipad' ? [next, flex, done] : 0
	});
	height.add(heightField); // toevoegen aan de rij
	// 	En een label aanmaken wat aangeeft wat er in deze rij dient te worden ingevoerd
	// 	Dit in verband met als je iets invuld de hintText niet meer zichtbaar is
	height.add(Titanium.UI.createLabel({
		text: 		config.hoogte,
		top: 		Titanium.Platform.osname === 'android' ? '35%' : '6%',
		left: 		'5%',
		height: 	'auto',
		width: 		'auto',
		touchEnabled: false
	}));
	tableData[0].add(height); // Het geheel toevoegen aan de sectie (booteigenschappen)
}

// Als we een breedte moeten kunnen ingeven
if(config.showWidth)
{
	// Daarna ook een rij maken om de breedte in te geven
	var width = Titanium.UI.createTableViewRow({
		top: 		0,
		left: 		0,
		width: 		'100%',
		height: 	'auto',
		selectionStyle: 0
	});
	
	/*
 	* 	De rij breedte zal een textField krijgen (widthField)
 	* 	Hierin kunnen gebruikers de breedte van hun boot ingeven
 	* 		zodat de app hier rekening mee kan houden (brug breedte of anders)
 	*/
	var widthField = Titanium.UI.createTextField({
		height: 	'auto',
		width: 		'35%',
		right: 		'5%',
		keyboardType: Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION,
		returnKeyType: Titanium.UI.RETURNKEY_DONE,
		// Inaden van de opgeslagen waarde
		value: 		Titanium.App.Properties.getString('width', null),
		top: 		Titanium.Platform.osname === 'android' ? '5%' : '6%',
		//keyboardToolbar: Titanium.Platform.osname === 'iphone' || Titanium.Platform.osname === 'ipad' ? [next, flex, done] : 0,
		hintText: 	config.breedteHintText
	});
	width.add(widthField); // Deze toevoegen aan de rij
	// 	En een label toevoegen die zegt wat er zou moeten komen te staan
	//	Dit omdat als we iets ingevuld hebben we de hintText niet meer zien
	width.add(Titanium.UI.createLabel({
		text: 		config.breedte,
		top: 		Titanium.Platform.osname === 'android' ? '35%' : '6%',
		left: 		'5%',
		touchEnabled: false,
		height: 	'auto',
		width: 		'auto'
	}));
	tableData[0].add(width);	// Het geheel toevoegen aan de booteigenschappen
}

/*
 * 	De tweede secie(tableData[1]):
 * 		- Deze zal de verschillende types kaarten bevatten
 * 		- Op een type kaart klikken zal deze waarde opslaan en de kaart opnieuw instellen
 */
// Een nieuwe sectie aanmaken
tableData[1] = Titanium.UI.createTableViewSection({
	headerTitle: 	config.mapHeader,
	touchEnabled: 	true,
	top: 			'1%'
});

// Het type sateliet toevoegen
var sSatelite = Titanium.UI.createTableViewRow({
	title: 			config.sateliet,
	className: 		"row",
	hasCheck: 		false,
	touchEnabled: 	false,
	});
// Het type kaart toevoegen
var sMap = Titanium.UI.createTableViewRow({
	title: 			config.map,
	className: 		"row",
	hasCheck: 		false,
	touchEnabled: 	false
	});
	
// 	Omdat op android het type hybride niet wordt ondersteund
// 	geven we deze alleen als het niet op android is
if(Titanium.Platform.osname !== 'android'){
	// het type hybride toevoegen
	var sHybrid = Titanium.UI.createTableViewRow({
		title: 			config.hybrid,
		className: 		"row",
		hasCheck: 		false,
		touchEnabled: 	false
		});
	// Hybrid voegen we hier dan ook gelijk toe
	// Dat scheelt weer een if statement
	tableData[1].add(sHybrid);
}

// En de verschillende types kaart toevoegen aan de data
tableData[1].add(sSatelite);
tableData[1].add(sMap);

/*
 * 	Opties voor het data gebruik
 * 		- Laden van afbeeldingen aan of uit
 */
if(config.showLoadPicture)
{
	// Nieuwe sectie hiervoor maken
	tableData[2] = Titanium.UI.createTableViewSection({
		headerTitle: 	config.dataHeader,
		touchEnabled: 	false,
		top: 			'1%'
	});
	// hier een rij aan toevoegen
	var dataRow = Titanium.UI.createTableViewRow({
		top: 		0,
		left: 		0,
		width: 		'auto',
		selectionStyle:	0,
		height: 	'auto'
	});
	// En een switch met als style een checkbox
	var dataSwitch = Titanium.UI.createSwitch({
		style: 	Titanium.Platform.osname === 'android' ? Titanium.UI.Android.SWITCH_STYLE_CHECKBOX : 0,
		value: 	Titanium.App.Properties.getBool('laadData', false),
		left: 	'5%'
	});
	dataRow.add(dataSwitch); // toevoegen aan de rij
	// Een label erbij te indicatie
	dataRow.add(Titanium.UI.createLabel({
		text: 	config.laadAfbeeldingText,
		top: 	Titanium.Platform.osname === 'android' ? '33%' : '6%', // voor het uitlijnen
		left: 	'23%',
		touchEnabled: false,
		height: 'auto',
		width: 	'auto'
	}));
	// Geheel toevoegen aan de tabel
	tableData[2].add(dataRow);
}

// De daadwerkelijke tabel creëren
var settingsTable = Titanium.UI.createTableView({
	top: 	0,
	left: 	0,
	// 	Workaround voor het niet laten zien van de tabel
	height: Titanium.Platform.osname === 'android' ? 
			// op android de hoogte absoluut zetten anders werkt hij niet en is hij weg :<
			(Titanium.Gesture.isPortrait ? Titanium.Platform.displayCaps.platformHeight : Titanium.Platform.displayCaps.platformWidth) : 
			'100%',
	width: 	'100%',
	scrollable: false,
	data: 	tableData,
	style: 	Titanium.UI.iPhone.TableViewStyle.GROUPED
});

/*
 * 	Een scrollview waarin de de tableview gaan stoppen
 * 		dit zodat we de textvelden goed kunnen selecteren
 * 		op android(bug)
 */
var container = Titanium.UI.createScrollView({
	top: 		0,
	left: 		0,
	layout: 	'vertical',
	scrollType: 'vertical',
	contentHeight: 'auto',
	contentWidth: 'auto',
	height: 	'100%',
	width: 		'100%'
});

// Alles toevoegen aan de window
container.add(settingsTable); // eerst de tabel aan de container toevoegen
SettingsWindow.add(container); // Dan de container aan het scherm toevoegen

// include het bestand met alle opties
Titanium.include('methods/settings.js');
