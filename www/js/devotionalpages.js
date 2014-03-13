// Global Variables
// ****************************************************************************

// Current page the user is viewing
var currentPage;

// How far from the top the user has scrolled
var percent;

// Document initialization
// ****************************************************************************
$(document).ready(function() {
	// Loading the user's current page at the beginning and setting the text size
	currentPage = permenantStorage.getItem("page");
	if (currentPage == null) {
		currentPage = 2;
	}
	changePage();
	setScale(permenantStorage.getItem("font"));
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
		if (currentPage < 2) {
			currentPage = 2;
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

// This function updates the progress bar based on the user's current place in the page
function updateStatus(e) {
	percent = $(document).height() - $(window).height() > 0 ?
			($(document).scrollTop() / ($(document).height() - $(window).height())) : 1;
	var totalPercent = (currentPage - 2 + percent) / 11 * 100;
	$("#status").css("width", totalPercent + "%");
	
	if (totalPercent == 100) {
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
