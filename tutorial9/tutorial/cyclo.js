/*
New Perspectives on JavaScript, 2nd Edition
Tutorial 9
Tutorial Case

Author: Kevin McCarthy  
Date: 4/12/2015    

Filename: cyclo.js


Functions List:


*/

addEvent(window, "load", initPage, false);

function initPage() {

	if (cookiesEnabled() == false) {
		alert("Enable your cookies yo!");
	}

	if (retrieveCookie("lastVisit") == null) {
		lastVisit = "First time";
	} else {
		lastVisit = retrieveCookie("lastVisit");
	}

	var today = new Date();
	var currentVisit = writeDateString(today);

	expire = new Date();
	expire.setMonth(expire.getMonth()+6);
	writeCookie("lastVisit", currentVisit, expire);

	if (retrieveMCookie("memberInfo", "lastName") != null) {
		var firstName = retrieveMCookie("memberInfo", "firstName");

		var lastModified = new Date(document.lastModified);
		var pageUpdate = writeDateString(lastModified);

		var welcome = document.createElement("div");
		welcome.id = "welcome";

		htmlString = "Welcome " + firstName;
		htmlString += "<br>";
		htmlString += "Last Visit: <span>" + lastVisit + "</span>";
		htmlString += "<br>";
		htmlString += "Last update: <span>" + pageUpdate + "</span>";

		welcome.innerHTML = htmlString;
		document.body.appendChild(welcome);
	}

}