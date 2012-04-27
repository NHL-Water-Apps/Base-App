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



// Het maken van een lege textfield waarin we de breedte van een boot
// kunnen invoeren:
var BoatWidth = 0; // Dit is een globaal beschikbare variable die de breedte van de boot
				   // zal bevatten en 0 zijn als er geen breedte is ingevoerd 
// Dit is de daadwerkelijke textbox
var WidthField = Titanium.UI.createTextField({
	borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED, // De stijl van de rand
	value: BoatWidth !== 0 ? BoatWidth : '',  // inladen van de "opgeslagen" waarde breedte van de boot
	height: 40,							// De hoogte
	top: 20,							// Plaatsing van het vakje vanaf de bovenkant
	width: 100, // de breedte van het vakje (70% van de breedte van de app)
	left: 130,
	backgroundColor: '#FFFFFF'			// achtergrond kleur
});

var ClearButton = Titanium.UI.createButton({
	borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED, // De stijl van de rand
	title: "Wissen",
	height: 40,
	width: 90,
	top: 200,
	left: Math.round(Titanium.Platform.displayCaps.getPlatformWidth - 400)
});

var WidthLabel = Titanium.UI.createLabel({
	top: 20,
	left: 10,
	text: 'Breedte(meter):',
	width: 'auto',
	font: {color: '#FFFFFF'},
	height: 40,
	textAlign: 'left'
});

// Functie die zal kijken naar welke breedte is ingevuld
// Indien deze 0 of negatief is zal deze een error opgooien en
// het tekstvakje weer leeg maken.
// In andere gevallen zal BoatWidth de breedte van de boot gaan bevatten (0 standaard)
SettingsWindow.addEventListener('click', function (e){
	if(WidthField.value > 0) // kijken of de ingevulde waarde positief is
	{
		BoatWidth = WidthField.value; // als dat zo is sla hem op
	}
	else if (WidthField.value !== '') // kijken of hij niet leeg is
	{								 // als dat zo is dan is er sprake van een foutieve invoer
		alert('De breedte van de boot moet groter zijn dan 0'); // laat de error zien
		WidthField.value = ''; // reset de textfield
		BoatWidth = 0; // zet de breedte van de boot op 0 (standaard value)
	}
	WidthField.blur(); // indien er ergens anders op het scherm geklikt wordt focus weghalen
});

// Voeg de textvelden toe
SettingsWindow.add(WidthLabel);
SettingsWindow.add(WidthField); // Voor de breedte van de boot
SettingsWindow.add(ClearButton);
