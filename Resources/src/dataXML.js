if (!Data) {
	var Data = {};
}

/*
 *	Deze functie leest en parsed een XML bestand uit de Resources/XML folder.
 *  
 * @param (string) filename :: 
 * 		De naam van het XML bestand.
 * 
 * @returns (Titanium.XML.Document | null) ::
 * 		Een Titanium.XML.Document object met de data geladen uit het aangegeven 
 *      XML bestand. 
 *      De functie returned null als het laden en/of parsen van het XML bestand 
 *      fout is gegaan.
 * 
 *  @example :: Het bestand 'data.xml' laden en parsen
 * 		var XMLdata = Data.getXML('data.xml');
 */
Data.getXML = function(filename) {
	var XMLDIR    = 'XML/'
	  , XMLfile	  = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, XMLDIR + filename)
	  , XMLblob
	  , XMLdocument
	  
	  // Interne functie die de rotzooi opruimt en netjes een waarschuwings berichtje 
	  // achterlaat als het mis gaat.
	  , errorcleanup = function(msg) {
		  	Titanium.API.warn('Functie getXML: ' + msg);
		  	XMLfile = null;
		  	XMLblob = null;
		  	XMLdocument = null;
	  };
	
	// Lees het bestand uit als het bestaat en het een XML bestand is, anders
	// cleanup doen en null returnen.  
	if (XMLfile && XMLfile.exists && XMLfile.extension() === 'xml') {
		XMLblob = XMLfile.read();
	} else {
		errorcleanup('\'' + XMLDIR + filename + '\' is niet gevonden of een ongeldig XML bestand');	
		return null;
	}
		
	// Probeer het XMLbestand te parsen, cleanup doen en null returnen als het mislukt
	if (XMLblob && XMLblob.text) {
		try {
			XMLdocument = Titanium.XML.parseString(XMLblob.text);
		} catch (e) {
			errorcleanup('Het parsen van het XML bestand \'' + XMLDIR + filename +'\' is mislukt');
			return null;
		}		
	} else {
		errorcleanup('Het is mislukt om \'' + XMLDIR + filename + '\' uit te lezen');	
		return null;
	}
	
	// Als alles goed is gegaan, dan hebben we nu een XML.Document object, die returnen we.
	return XMLdocument;  
};