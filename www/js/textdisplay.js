// Global Variables
// ****************************************************************************
var permenantStorage = window.localStorage;

// Font sizes
var size = {
	SMALL: "7pt",
	MEDIUM: "12pt",
	LARGE: "16pt"
};

// Support functions
// ****************************************************************************

// Scaling the text size based on the user's choice
function setScale(fontSize) {
	$('#content').css('font-size', fontSize);
	permenantStorage.setItem("font", fontSize);
	
	if (percent == null) {
		percent = 0;
	}
	var pageLoc = percent * ($(document).height() - $(window).height());
	$('html, body').animate({scrollTop: pageLoc}, 1);
}

// From https://gist.github.com/tsi/5137145
// By tsi
function loadDoc() { 
	// Load external contents
	$("[data-html]").each(function() {
		element = $(this);
		var src = "content/" + $(this).attr("data-html") + ".html";
		element.load(src);
	});
}
