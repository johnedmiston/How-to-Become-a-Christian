// Global Variables
// ****************************************************************************
var permenantStorage = window.localStorage;
var currentPage; // Current page the user is viewing
var percent; // How far from the top the user has scrolled

var size = {
	SMALL: "7pt",
	MEDIUM: "12pt",
	LARGE: "16pt"
};

// Document initialization wars
// ****************************************************************************
$(document).ready(function() {
	currentPage = permenantStorage.getItem("page");
	if (currentPage == null) {
		currentPage = 1;
	}
	changePage();
	
	$(window).on("scroll", updateStatus);
	$("#content").on("swipeleft", function(e) {
		currentPage++;
		if (currentPage > 12) {
			currentPage = 12;
		}
		else {
			changePage();
		}
	});
	$("#content").on("swiperight", function(e) {
		currentPage--;
		if (currentPage < 1) {
			currentPage = 1;
		}
		else {
			changePage();
		}
	});
	$("#content").on('movestart', function(e) {
		if ((e.distX > e.distY && e.distX < -e.distY) ||
		(e.distX < e.distY && e.distX > -e.distY)) {
			e.preventDefault();
		}
	});
});

// Support functions
// ****************************************************************************
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
	//var scaleSource = $('body').width();
	//var fontSize = scaleSource * scaleFactor;

	$('#content').css('font-size', fontSize);
	
	if (percent == null) {
		percent = 0;
	}
	
	$(document).scrollTop(percent * ($(document).height() - $(window).height()));
}

function updateStatus(e) {
	var a = document.getElementById("status");
	percent = $(document).height() - $(window).height() > 0 ?
			($(document).scrollTop() / ($(document).height() - $(window).height())) : 1;
	a.innerHTML = "<p>" + percent + "</p>";
}

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