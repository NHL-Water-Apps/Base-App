/*
 *	Het config bestand
 * 	Hierin komen alle verschillende opties voor het snel uitbrengen
 * 		van verschillende apps 
 */

var config = {
	/*
	 * 	Alle app eigenschappen
	 */
	// Voor het invoeren van de hoogte van de boot
	showHeight: true,
	// Voor het invoeren van de breedte van de boot
	showWidth: true,
	// Voor het invoeren van de tijd tussen de trail stappen (milliseconden)
	trailTimeout: 40000, // 40 seconden
	// Voor het ingeven van hoelang een trail zou blijven staan (milliseconden)
	trailSaveTime: 300000,
	
	
	
	/*
	 * 	Alles voor tekstuele aanpassingen:
	 */
	
	/*	- - - - - - - - - - 
	 * 	   	  MENU
	 *	- - - - - - - - - -
	 */ 
	kaartTab: 'Map',		// Eerste tab
	lijstTab: 'Lijst',		// Tweede tab
	optiesTab: 'Opties',	// Derde tab
	
	
	/*	- - - - - - - - - - 
	 * 	   INSTELLINGEN
	 *	- - - - - - - - - -
	 */ 
	// Kopje voor de eigenschappen van de boot
	bootHeader: 'Boot eigenschappen',
	// Hoogte (bij instellingen)
	hoogte: 'Hoogte(m):',
	// Breedte (bij instellingen)
	breedte: 'Breedte(m):',
	
	// Header van de kaart spullen
	mapHeader: 'Kaart eigenschappen',
	// Knopje sateliet
	sateliet: 'Satelliet',
	// Knopje hybride
	hybrid: 'Hybride',
	// Knopje kaart
	map: 'Kaart'
	
};
