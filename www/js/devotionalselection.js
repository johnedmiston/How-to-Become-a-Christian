// Authors: Mark Smullen and Terry Penner
// Date Created: March 13, 2014
// Purpose: Supports the devotionalselection.html page

// Global Variables
// ****************************************************************************
var permenantStorage = window.localStorage;

// Support functions
// ****************************************************************************

window.onload = function() {
	getLayout();
};

// This function takes a url and changes the current page to be it
function gotoDevotional(page) {
	permenantStorage.setItem("page", page);
	
    window.location = "devotionalpages.html";
}

// This function determines the current aspect ratio of the device and
// returns 0 if portrait, 1 if landscape
function getLayout() {
	var width = $(window).width();
	var height = $(window).height();
	var ratio = width / height;
	var layout = (ratio < 1) ? 0 : 1;
	alert("size: (" + width + ", " + height + ")\nratio: " + ratio + "\nlayout: " + layout);
	
	return layout;
}

// Set the button layout of the page
function layoutButtons(layout) {
	if (layout == 0) {
		// Portrait
		
	} else {
		// Landscape
		
	}
}