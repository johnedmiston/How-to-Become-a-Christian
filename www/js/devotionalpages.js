// Global Variables
// ****************************************************************************
var permenantStorage = window.localStorage;
var currentPage; // Current page the user is viewing
var percent; // How far from the top the user has scrolled

// Font sizes
var size = {
	SMALL: "7pt",
	MEDIUM: "12pt",
	LARGE: "16pt"
};

// Document initialization
// ****************************************************************************
$(document).ready(function() {
	// Loading the user's current page at the beginning and setting the text size
	currentPage = permenantStorage.getItem("page");
	if (currentPage == null) {
		currentPage = 1;
	}
	changePage();
	setScale(size.MEDIUM);
	updateStatus();
	
	// Binding the event to update the status bar to when the height changes
	$(window).on("scroll", updateStatus);
	
	// Changing content pages and updating progress when the user swipes side to side
	$("#content").on("swipeleft", function(e) {
		currentPage++;
		if (currentPage > 12) {
			currentPage = 12;
		}
		else {
			if (currentPage > permenantStorage.getItem("page")) {
				permenantStorage.setItem("page", currentPage);
			}
			changePage();
			updateStatus(e);
		}
	});
	$("#content").on("swiperight", function(e) {
		currentPage--;
		if (currentPage < 1) {
			currentPage = 1;
		}
		else {
			changePage();
			updateStatus(e);
		}
	});
	
	// Making sure that scrolling up and down is still enabled
	$("#content").on('movestart', function(e) {
		if ((e.distX > e.distY && e.distX < -e.distY) ||
		(e.distX < e.distY && e.distX > -e.distY)) {
			e.preventDefault();
		}
	});
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

function setScale(fontSize) {
	$('#content').css('font-size', fontSize);
	
	if (percent == null) {
		percent = 0;
	}

	var pageLoc = percent * ($(document).height() - $(window).height());
	$('html, body').animate({scrollTop: pageLoc}, 1);
}

// This function updates the progress bar based on the user's current place in the page
function updateStatus(e) {
	percent = $(document).height() - $(window).height() > 0 ?
			($(document).scrollTop() / ($(document).height() - $(window).height())) : 1;
	var totalPercent = (currentPage - 1 + percent) / 12 * 100;
	$("#status").css("width", totalPercent + "%");
	
	if (totalPercent == 1) {
		permenantStorage.setItem("completed", true);
	}
}

// This function reloads the content in the page from the new file we want
function changePage() {
	$("#content").toggle().attr("data-html", currentPage + "%20ChristianStarterKit");
	loadDoc();
	$("#content").toggle();
	$(document).scrollTop(0);
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