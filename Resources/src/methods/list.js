//Hier showt hij de cancelbutton op zowel iphone, ipad als android niet zodra de searchbar wordt gefocused.
tableSearchBar.addEventListener('focus', function(){
	table.search.setShowCancel(false);
});




