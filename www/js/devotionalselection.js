// Authors: Mark Smullen and Terry Penner
// Date Created: March 13, 2014
// Purpose: Supports the devotionalselection.html page

// Global Variables
// ****************************************************************************
var permenantStorage = window.localStorage;

// Support functions
// ****************************************************************************

window.onload = function() {
	layoutButtons(getLayout());
};

$(window).resize(function() {
	layoutButtons(getLayout());
	if ($(window).height / 16 < 22) {
		$("body").css("font-size", (22 / ($(window).height / (16 * 16)) + "%"));
	} else {
		$("body").css("font-size", "100%");
	}
})

// This function takes a url and changes the current page to be it
function gotoDevotional(page) {
	permenantStorage.setItem("page", page);
	
    window.location = "devotionalpages.html";
}

// This function determines the current aspect ratio of the device and
// returns 0 if portrait, 1 if landscape
function getLayout() {
	var width = $(window).width();
	var height = ($(window).height()-64);
	var ratio = width / height;
	var layout = (ratio < 1) ? 0 : 1;
	
	return layout;
}

// Set the button layout of the page
function layoutButtons(layout) {
	$(".docbutton").css("clear", "none");
	if (layout == 0) {
		// Portrait
		if ($(window).width / 3 < $(window).height / 4) {
			// When the screen's buttons overflow widthwise
			$("button").css("width", "30%");
			$("button").css("height", $("button").width() + "px");
		} else {
			$("button").css("height", ($(window).height()-64)/100*22 + "px");
			$("button").css("width", $("button").height() + "px");
		}
		$(".docbutton").css("margin-left", ((($(window).width() - ( $("button").outerWidth() * 3 ) ) / 4 ) - 1));
		$(".docbutton").css("margin-top", (((($(window).height()-64) - ( $("button").outerHeight() * 4 ) ) / 5 ) - 1));
		$("button").each(function(i) {
			if (i % 3 == 0) {
				$(this).css("clear", "left");
			}
		});
	} else {
		// Landscape
		if ((($(window).height()-64) / 3) < ($(window).width() / 4)) {
			// When the screen's buttons overflow heightwise
			$("button").css("height", ($(window).height()-64)/10*3 + "px");
			$("button").css("width", $("button").height() + "px");
		} else {
			$("button").css("width", "22%");
			$("button").css("height", $("button").width() + "px");
		}
		$(".docbutton").css("margin-left", ((($(window).width() - ( $("button").outerWidth() * 4 ) ) / 5 ) - 1));
		$(".docbutton").css("margin-top", (((($(window).height()-64) - ( $("button").outerHeight() * 3 ) ) / 4 ) - 1));
		$("button").each(function(i) {
			if (i % 4 == 0) {
				$(this).css("clear", "left");
			}
		});
	}
}

// This function takes a url and changes the current page to be it
function redirect(page) {
    window.location = page;
}