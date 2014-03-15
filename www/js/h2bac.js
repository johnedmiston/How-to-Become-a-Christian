// Authors: Mark Smullen and Terry Penner
// Date Created: March 13, 2014
// Purpose: Supports the h2bac.html page

// Variables
var responseFormOpen = 0;

// Document initialization
// ****************************************************************************
$(document).ready(function() {
	loadDoc();
	setupMenu();
	
	// Loading the user's current page at the beginning and setting the text size
	currentPage = permenantStorage.getItem("page");
	if (currentPage == null) {
		currentPage = 2;
	}
	setScale(permenantStorage.getItem("font"));
	
	$("#response").on("submit", sendForm);
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
				body:        '<h3>Response</h3><br />' +
					     '',
				isHtml:      true
			});
		}
	);
}

// Dummy function for document load callback
function updateProgress() {
}

// Method called when the form "submit" button is pressed
function sendForm(e) {
	e.preventDefault();
	
	alert($("#formRespond").find("[name='name']").val());
	//redirect('devotionalpages.html');
}

function openResponse() {
	// Open response form
	if (responseFormOpen == 0) {
		//$("#darkbox").show();
		$("#darkbox").fadeIn();
		$("#response").css("margin-top", ($(this).height() - $("#response").height()) / 2);
		$("#response").css("margin-bottom", ($(this).height() - $("#response").height()) / 2);
		responseFormOpen = 1;
	}
}

function closeResponse() {
	// Close response form when anywhere else is clicked
	if (responseFormOpen == 1) {
		$("#darkbox").fadeOut();
		//$("#darkbox").hide();
		responseFormOpen = 0;
	}
}

function redirect(page) {
    window.location = page;
}

$(document).click(function(e) {
	if ($(e.target).is($("#darkbox"))) {
		closeResponse();
	}
});

$(window).resize(function() {
	$("#response").css("margin-top", ($(this).height() - $("#response").height()) / 2);
	$("#response").css("margin-bottom", ($(this).height() - $("#response").height()) / 2);
})