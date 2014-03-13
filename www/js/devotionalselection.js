// Authors: Mark Smullen and Terry Penner
// Date Created: March 13, 2014
// Purpose: Supports the devotionalselection.html page

// Global Variables
// ****************************************************************************
var permenantStorage = window.localStorage;

// Support functions
// ****************************************************************************

// This function takes a url and changes the current page to be it
function gotoDevotional(page) {
	permenantStorage.setItem("page", page);
	
    window.location = "devotionalpages.html";
}