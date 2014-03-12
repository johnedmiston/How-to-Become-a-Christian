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

var size = {
	SMALL: 0.1,
	MEDIUM: 0.2,
	LARGE: 0.3
};

function setScale(scaleFactor) {
	var scaleSource = $('body').width();
	var fontSize = scaleSource * scaleFactor;

	$('body').css('font-size', fontSize + '%');
}

function updateStatus(e) {
	var a = document.getElementById("status");
	var percent = $(document).height() - $(window).height() > 0 ?
			($(document).scrollTop() / ($(document).height() - $(window).height())) : 1;
	a.innerHTML = "<p>" + percent + "</p>";
}

function changePage(e) {
	var a = document.getElementById("status");
	a.innerHTML = "<p>" + ("SIEOW") + "</p>";
	$("#content").toggle().attr("data-html", "02%20ChristianStarterKit");
	loadDoc();
	$("#content").toggle();
	$(document).scrollTop(0);
}

$(document).ready(function() {
	$(window).on("scroll", updateStatus);
	$("#content").on("swipeleft", changePage);
	$("#content").on('movestart', function(e) {
		if ((e.distX > e.distY && e.distX < -e.distY) ||
		(e.distX < e.distY && e.distX > -e.distY)) {
			e.preventDefault();
		}
	});
	
	loadDoc();
});

// From https://gist.github.com/tsi/5137145
// By tsi
function loadDoc() { 
	var a = document.getElementById("status");
	a.innerHTML = "<p>" + ("ser") + "</p>";
	// Load external contents
	$("[data-html]").each(function() {
		el = $(this);
		var src = "content/" + $(this).attr("data-html") + ".html";
		el.load(src);
	});
}