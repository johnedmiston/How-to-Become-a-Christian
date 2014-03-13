// Global Variables
// ****************************************************************************
var permenantStorage = window.localStorage;

// Support functions
// ****************************************************************************

// This function checks to see if the user has completed all the devitions yet
function checkCompletion() {
	var completed = permenantStorage.getItem("completed");
	if (completed) {
		redirect("devotionalselection.html");
	}
	else {
		redirect("devotionalpages.html");
	}
}

// This function takes a url and changes the current page to be it
function redirect(page) {
    window.location=page;
}