/*
 *	Het config bestand
 * 	Hierin komen alle verschillende opties voor het snel uitbrengen
 * 		van verschillende apps en het veranderen van de teksten in de
 * 		app (oa. voor andere talen)
 */
var config = {
	/*
	 * 	Alle app eigenschappen
	 */
	// Voor het invoeren van de hoogte van de boot
	showHeight: true,
	// Voor het invoeren van de breedte van de boot
	showWidth: true,
	showLoadPicture: true,
	// Voor het invoeren van de tijd tussen de trail stappen (milliseconden)
	trailTimeout: 1000, // 10 seconden
	// Voor het ingeven van hoelang een trail zou blijven staan (milliseconden)
	trailerAmmount: 5,	// 5 minuten
	
	
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
	
	/*
	 * 	- - - - - - - - - -
	 * 		OVERALL
	 * 	- - - - - - - - - -
	 */
	// Spreekt voor zich
	zoekText: 'Zoek',
	volgendeText: 'Volgende',
	klaarText: 'Done',
	
	/*
	 * 	- - - - - - - - - -
	 * 		 KAART
	 * 	- - - - - - - - - -
	 */
	// Wat er in de error message komt idien hij gps aanvraagt maar
	//		dit uitstaat
	geenGPS: 'Schakel alstublieft de Locatievoorziening in.',
	
	/*	- - - - - - - - - - 
	 * 	   INSTELLINGEN
	 *	- - - - - - - - - -
	 */ 
	// Kopje voor de eigenschappen van de boot
	bootHeader: 'Boot eigenschappen',
	// Hoogte (bij instellingen)
	hoogte: 'Hoogte(m):',
	hoogteHintText: 'Hoogte',
	// Breedte (bij instellingen)
	breedte: 'Breedte(m):',
	breedteHintText: 'Breedte',
	
	// Header van de kaart spullen
	mapHeader: 'Kaart eigenschappen',
	// Knopje sateliet
	sateliet: 'Satelliet',
	// Knopje hybride
	hybrid: 'Hybride',
	// Knopje kaart
	map: 'Kaart',
	
	// Header van het databebruik
	dataHeader: 'Datagebruik:',
	// text achter checkbox van het laden van data
	laadAfbeeldingText: 'Internet afbeeldingen laden',
	
	/*	- - - - - - - - - - 
	 * 	   DETAIL
	 *	- - - - - - - - - -
	 */ 
	 // Text weer te geven als er geen foto is
	 geenFoto: 'Geen foto beschikbaar'
	 
};
