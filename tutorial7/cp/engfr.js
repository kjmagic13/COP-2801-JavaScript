/*
New Perspectives on JavaScript, 2nd Edition
Tutorial 7
Case Problem 1

Author: Kevin McCarthy          
Date: 3/29/2015

Filename: engfr.js


Function List:

addEvent(object, evName, fnName, cap)
Adds an event hander to object where evName is the name of the event,
fnName is the function assigned to the event, and cap indicates whether
event handler occurs during the capture phase (true) or bubbling
phase (false)

setUp()
Insert the current week's french phrases into document and set up
event handlers for the phrases.

swapFE(phrase, pnum)
Changes a French phrase to the English version of that phrase.

swapEF(phrase, pnum)
Changes an English phrase ot the Frech version of that phrase.

*/

function addEvent(object, evName, fnName, cap) {
	if (object.attachEvent)
		object.attachEvent("on" + evName, fnName);
	else if (object.addEventListener)
		object.addEventListener(evName, fnName, cap);
}


addEvent(window, "load", setUp, false);

function setUp() {
	var transDoc = document.getElementById("doc");
	var olElem = document.createElement("ol");
	for (var i = 0; i < french.length; i++) {
		var newLI = document.createElement("li");
		newLI.innerHTML = french[i];
		newLI.id = i + "phrase";
		newLI.style.cursor = "pointer";

		newLI.onmousedown = swapFE;
		newLI.onmouseup = swapEF;

		olElem.appendChild(newLI);
	}
	transDoc.appendChild(olElem);
}

function swapFE(phrase, pNum) {
	var phrase = this;
	var pNum = 0;

	// console.log('swapped');

	if (phrase.nodeType == "#text") {
		phrase = phrase.parent.Node
	} else {
		pNum = parseInt(phrase.id);
		phrase.innerHTML = english[pNum];
		phrase.style.fontStyle = "italic";
		phrase.style.color = "rgb(155, 102, 102)";
	}
}

function swapEF(phrase, pNum) {
	var phrase = this;
	var pNum = 0;

	// console.log('swapped');

	if (phrase.nodeType == "#text") {
		phrase = phrase.parentNode
	} else {
		pNum = parseInt(phrase.id);
		phrase.innerHTML = french[pNum];
		phrase.style.fontStyle = "normal";
		phrase.style.color = "black";
	}
}
