// Authors: Mark Smullen and Terry Penner
// Date Created: March 13, 2014
// Purpose: Supports the h2bac.html and devotionalpages.html pages

// Global Variables
// ****************************************************************************
var permenantStorage = window.localStorage;
var percent = 0;
var currentTheme;

// Font sizes
var size = {
	TINY: "10pt",
	SMALL: "12pt",
	NORMAL: "14pt",
	LARGE: "16pt",
	HUGE: "18pt"
};

// Theme options
var theme = {
	'LIGHT': {
		IMG: "img/sun.png",
		CSS: "css/content.css"
	},
	'DARK': {
		IMG: "img/moon.png",
		CSS: "css/darkcontent.css"
	}
}

// Document utilities initialization
// ****************************************************************************
$(document).ready(function() {
	loadDoc();
	setupMenu();
});

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

// Loading display theme based on user's preference
function setTheme(displayTheme) {
	if (document.getElementById("theme")) {
		$("#theme").attr('href', theme[displayTheme].CSS);
	}

	$("#themebutton").css("background-image", "url('" + theme[displayTheme].IMG + "')");
	permenantStorage.setItem("theme", displayTheme);
}

// This function sets the click events for showing and hiding the settings menu
function setupMenu() {
	sanitizeTheme();

	$("#settingsbutton").click(function() {
		showSettings();
	});
}

// Dummy function for document load callback
function updateProgress() {
}

// Sanitize theme setting to prevent falsy and unrecognized values
function sanitizeTheme() {
	if (!currentTheme || !theme[currentTheme].IMG) {
		if (permenantStorage.getItem("theme") == 'DARK') {
			currentTheme = 'DARK';
		} else {
			currentTheme = 'LIGHT';
		}
	}

	setTheme(currentTheme);
}

// Toggle between day and night themes
function toggleTheme() {
	if (currentTheme == 'LIGHT' || currentTheme == null) {
		currentTheme = 'DARK';
	} else {
		currentTheme = 'LIGHT';
	}

	setTheme(currentTheme);
}

// From https://gist.github.com/tsi/5137145
// By tsi
function loadDoc() { 
	// Load external contents
	$("[data-html]").each(function() {
		element = $(this);
		var src = "content/" + $(this).attr("data-html") + ".html";
		
		element.load(src, updateProgress);
	});
}
