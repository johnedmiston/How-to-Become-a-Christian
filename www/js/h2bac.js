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
function sendResponse(type, name, country, comments) {
	window.plugin.email.isServiceAvailable(
		function (isAvailable) {
			window.plugin.email.open({
				to:          ['terrencepenner@gmail.com'],
				subject:     'H2BAC Response',
				body:        '<h3>Response</h3><br />' +
						'<p>Type: ' + type + '</p>' +
						'<p>Name: ' + name + '</p>' +
						'<p>Country: ' + country + '</p>' +
						'<p>Comments: ' + comments + '</p>',
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
	
	var type = $("#formRespond").attr("name");
	var name = $("#formRespond").find("[name='name']").val();
	var country = $("#formRespond").find("[name='country']").val();
	var comments = $("#formRespond").find("[name='comments']").val();
	
	if (name != "") {
		sendResponse(type, name, country, comments);
		permenantStorage.setItem("page", 2);
		redirect('devotionalpages.html');
	}
	else {
		alert("Please enter your name.");
	}
}

// Open response form
function openResponse(buttonType) {
	if (responseFormOpen == 0) {
		$("#formRespond").attr("name", buttonType);
		$("#darkbox").fadeIn();
		$("#response").css("margin-top", ($(this).height() - $("#response").height()) / 2);
		$("#response").css("margin-bottom", ($(this).height() - $("#response").height()) / 2);
		responseFormOpen = 1;
	}
}

// Close response form when anywhere else is clicked
function closeResponse() {
	if (responseFormOpen == 1) {
		$("#darkbox").fadeOut();
		responseFormOpen = 0;
	}
}

// This function takes a url and changes the current page to be it
function redirect(page) {
    window.location = page;
}

// Close response form when the darkbox is clicked
$(document).click(function(e) {
	if ($(e.target).is($("#darkbox"))) {
		closeResponse();
	}
});

// Change the size of the popup as needed
$(window).resize(function() {
	$("#response").css("margin-top", ($(this).height() - $("#response").height()) / 2);
	$("#response").css("margin-bottom", ($(this).height() - $("#response").height()) / 2);
})
