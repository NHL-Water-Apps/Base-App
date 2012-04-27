/*
 *  
 */

var getXML = function(filename) {
	var XMLDIR    = 'XML/'
	  , XMLfile	  = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, XMLDIR + filename)
	  , XMLblob
	  , XMLtext;
	  
	if (XMLfile && XMLfile.exists && XMLfile.extension === 'xml') {
		XMLblob = XMLfile.read();
	} else if (XMLfile && XMLfile.exists) {
		console.warn('Error: ' + XMLDIR + filename + ' is not an XML file');
		return null;
	} else {
		console.warn('Error: ' + XMLDIR + filename + ' does not exist' );
		return null;
	}

	  
	  
};
