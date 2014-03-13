// Authors: Mark Smullen and Terry Penner
// Date Created: March 13, 2014
// Purpose: Supports the h2bac.html page

// Document initialization
// ****************************************************************************
$(document).ready(function() {
	loadDoc();
	
	// Loading the user's current page at the beginning and setting the text size
	currentPage = permenantStorage.getItem("page");
	if (currentPage == null) {
		currentPage = 2;
	}
	setScale(permenantStorage.getItem("font"));
});

// Support functions
// ****************************************************************************

// This function sends the email with the form's values
function sendResponse() {
	window.plugin.email.isServiceAvailable(
		function (isAvailable) {
			window.plugin.email.open({
				to:          ['terrencepenner@gmail.com'],
				subject:     'H2BAC Response',
				body:        '<h3>TEST</h3><h2>TEST</h2><h1>TEST</h1>',
				isHtml:      true
			});
		}
	);
}
