// Vanuit dit bestand wordt de rest ingeladen.
// Dit bestand zal de verder nodige bestanden inladen.

// Titanium.App.Properties.getInt("BoatWidth", 0) bevat de breedte van de boot 
// Wel checken of het niet 0 is (default)

// Titanium.App.Properties.getInt("BoatHeight", 0) bevat de hoogte van de boot
// Wel checken of het niet 0 is (default)

// Alle andere pagina ui's includen
Titanium.include('uiListView.js'); // lijst pagina
Titanium.include('uiDetailView.js'); // detail pagina
Titanium.include('uiMapView.js'); // kaart pagina
Titanium.include('uiSettingsView.js'); // settings pagina

// Maken van het menu
var tabMenu = Titanium.UI.createTabGroup(); // de container van het menu

if(Titanium.Platform.osname === 'iphone' || Titanium.Platform.osname === 'ipad'){
	// Eerst de verschillende tabs maken:
	// De tab voor de kaart
	var MapTab = Titanium.UI.createTab({
		icon: 'img/IMap.png', 	// Het icoontje van de tab
		title: 'Map',			// Naam die op de tab staat
		window: MapWindow 		// bind deze tab aan deze window (Kaart)
	});
	
	// De tab voor het lijstje van alle POI's
	var ListTab = Titanium.UI.createTab({
		title: 'Lijst',			// Naam die op de tab staat
		icon: 'img/IList.png',	// Het icoontje van de tab
		window: ListWindow 		// bind deze tab aan deze window (Lijst)
	});
	
	// En de tab voor de instellingen
	var SettingsTab = Titanium.UI.createTab({
		title: 'Opties',		// Naam die op de tab staat
		icon: 'img/IOpties.png',// Het icoontje van de tab
		window: SettingsWindow	// bind deze tab aan deze window (Opties)
	});
}

if(Titanium.Platform.osname === 'android'){
	var MapTab = Titanium.UI.createTab({
		icon: 'img/Map.png', 	// Het icoontje van de tab
		title: 'Map',			// Naam die op de tab staat
		window: MapWindow 		// bind deze tab aan deze window (Kaart)
	});
	
	// De tab voor het lijstje van alle POI's
	var ListTab = Titanium.UI.createTab({
		title: 'Lijst',			// Naam die op de tab staat
		icon: 'img/Lijst.png',	// Het icoontje van de tab
		window: ListWindow 		// bind deze tab aan deze window (Lijst)
	});
	
	// En de tab voor de instellingen
	var SettingsTab = Titanium.UI.createTab({
		title: 'Opties',		// Naam die op de tab staat
		icon: 'img/Opties.png',// Het icoontje van de tab
		window: SettingsWindow	// bind deze tab aan deze window (Opties)
	});
}
// Toevoegen van elke tab aan het menu
tabMenu.addTab(MapTab); // de tab met de kaart
tabMenu.addTab(ListTab); // de tab met het lijstje
tabMenu.addTab(SettingsTab); // de tab met de instellingen

tabMenu.open(); // Openen van het menu zodat deze onderaan komt te staan

