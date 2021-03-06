/*
New Perspectives on JavaScript, 2nd Edition
Tutorial 9
Case Problem 1

Author: Kevin McCarthy  
Date: 2/2/2015    

Filename: counter.js



Functions List:

addEvent(object, evName, fnName, cap)
Adds an event handler to object where object is the object 
reference, evName is the name of the event, fnName is the
reference to the function, and cap specifies the
capture phase.

writeDateString(dateObj)
Returns the date contained in the dateObj date object as
a text string in the format mmm. dd, yyyy

storeCookie(cName, cValue, expDate, cPath, cDomain, cSecure)
Stores a cookie named cName with value cValue. Optional parameters
expDate, cPath, cDomain, and cSecure set the expiry date,
path, doman, and secure flag

getCookie(cName)
Returns the value of cookie, cName.

setCounter()
Retrieves and updates the date last visited and page counter
cookies and displays them on the Web page along with the
date last modified.

*/

function addEvent(object, evName, fnName, cap) {
	if (object.attachEvent)
		object.attachEvent("on" + evName, fnName);
	else if (object.addEventListener)
		object.addEventListener(evName, fnName, cap);
}


function writeDateString(dateObj) {

	var monthName = new Array("Jan", "Feb", "Mar",
		"Apr", "May", "Jun", "Jul", "Aug", "Sep",
		"Oct", "Nov", "Dec");

	var thisMonth = dateObj.getMonth();
	var thisYear = dateObj.getFullYear();

	return monthName[thisMonth] + " " + dateObj.getDate() + ", " + thisYear;
}

function setCookie(cName, cValue, expDate, cPath, cDomain, cSecure) {
	if (cName && cValue != "") {
		var cString = cName + "=" + escape(cValue);
		cString += (expDate ? ";expires=" + expDate.toGMTString(): "");
		cString += (cPath ? ";path=" + cPath : "");
		cString += (cDomain ? ";domain=" + cDomain : "");
		cString += (cSecure ? ";secure" : "");
		document.cookie = cString;
	}
}


function getCookie(cName) {
	if (document.cookie) {
		var cookies = document.cookie.split("; ");
		for (var i = 0; i < cookies.length; i++) {
			if (cookies[i].split("=")[0] == cName) {
				return unescape(cookies[i].split("=")[1]);
			}
		}
	}
}


/* Add new code below */


addEvent(window, "load", setCounter, false);

function setCounter() {

	var lastVisit;
	var pageCount;
	var today = new Date();

	if (getCookie("lastVisit")) {
		lastVisit = "Last Visit: " + getCookie("lastVisit");
	} else {
		lastVisit = "Welcome to Cliff Hangers.";
	}

	setCookie( "lastVisit", writeDateString(today) );

	if (getCookie("pageCount")) {
		pageCount = parseInt(getCookie("pageCount")) + 1;
	} else {
		pageCount = 1;
	}

	setCookie( "pageCount", pageCount );

	var lastMod = new Date(document.lastModified);
	var pageUpdate = writeDateString(lastMod);
	var rightCol = document.getElementById("rightCol");

	var pageFooter = document.createElement("div");
	pageFooter.id = "pageFooter";

	htmlString = "<span> Visit Number:" + pageCount + "</span>";
	htmlString += "<span>" + lastVisit + "</span>";
	htmlString += "<span>Last update: " + pageUpdate + "</span>";

	pageFooter.innerHTML = htmlString;
	rightCol.appendChild(pageFooter);

}

