/*
New Perspectives on JavaScript, 2nd Edition
Tutorial 7
Tutorial Case

Author: 
Date:   

Filename: toc.js

Global Variables:
sections
An array contain the HTML elements used as section headings in the historic document

Functions List:

addEvent(object, evName, fnName, cap)
Adds an event hander to object where evName is the name of the event,
fnName is the function assigned to the event, and cap indicates whether
event handler occurs during the capture phase (true) or bubbling
phase (false)

makeTOC()
Generate a table of contents as a nested list for the contents of the "doc" 
element within the current Web page. Store the nested list in the "toc"
element.

levelNum(node)
Returns the level number of the object node. If the object node does not
represent a section heading, the function returns the value -1.

createList()
Goes through the child nodes of the "doc" element searching for section headings.
When it finds a section heading, a new entry is added to the table of contents

expandCollapse()
Expands and collapse the content of the table of contents and the historic
document

expandCollapseDoc()
Goes through the child nodes of the "doc" element determining which elements to
hide and which elements to display

isHidden(object)
Returns a Boolean value indicating whether object is hidden (true) or
not hidden (false) on the Web page by examining the display style for object
and all its parent nodes up to the body element

*/

function addEvent(object, evName, fnName, cap) {
	if (object.attachEvent)
		object.attachEvent("on" + evName, fnName);
	else if (object.addEventListener)
		object.addEventListener(evName, fnName, cap);
}

addEvent(window, "load", makeTOC, false);
var sourceDoc;

var sections = new Array("h1", "h2", "h3", "h4", "h5", "h6");

function makeTOC() {
	var TOC = document.getElementById("toc");
	TOC.innerHTML = "<h1>Table of Contents</h1>";
	var TOCList = document.createElement("ol");
	TOC.appendChild(TOCList);
	sourceDoc = document.getElementById("doc");

	//
	createList(sourceDoc, TOCList);
}

function levelNum(node) {
	for (var i = 0; i < sections.length; i++) {
		if (node.nodeName == sections[i].toUpperCase()) { return i; }
	}
	return -1;
}

function createList(object, list) {

	var prevLevel = 0;
	var headNum = 0;

	for (var n = object.firstChild; n != null; n = n.nextSibling) {
		//

		var nodeLevel = levelNum(n);
		if (nodeLevel != -1) {
			//

			// 
			headNum++;
			if (n.id == "") { n.id = "head" + headNum; }

			//
			var listItem = document.createElement("li");
			listItem.id = "TOC" + n.id;

			//
			var linkItem = document.createElement("a");
			linkItem.innerHTML = n.innerHTML;
			linkItem.href = "#" + n.id;

			//
			listItem.appendChild(linkItem);

			if (nodeLevel == prevLevel) {
				//
				list.appendChild(listItem);
			}

			else if (nodeLevel > prevLevel) {
				//
				var nestedList = document.createElement("ol");
				nestedList.appendChild(listItem);

				list.lastChild.appendChild(nestedList);

				// pg 405
				var plusMinusBox = document.createElement("span");
				plusMinusBox.innerHTML = "--";
				addEvent(plusMinusBox, "click", expandCollapse, false);
				nestedList.parentNode.insertBefore(plusMinusBox, nestedList.previousSibling);

				list = nestedList;
				prevLevel = nodeLevel;
			}

			else if (nodeLevel < prevLevel) {
				//
				var levelUp = prevLevel - nodeLevel;
				for (var i = 1; i <= levelUp; i++) {
					list = list.parentNode.parentNode;
				}
				list.appendChild(listItem);
				prevLevel = nodeLevel;
			}

		}
	}
}

function expandCollapse(e) {
	var plusMinusBox = e.target || event.srcElement;
	var nestedList = plusMinusBox.nextSibling.nextSibling;

	// pg 407
	if ( plusMinusBox.innerHTML == "--" ) { plusMinusBox.innerHTML = "+"; }
	else { plusMinusBox.innerHTML = "--"; }

	// pg 409
	if ( nestedList.style.display == "none" ) { nestedList.style.display = ""; }
	else { nestedList.style.display = "none"; }

	// pg 413
	expandCollapseDoc();
}

function expandCollapseDoc() {
	var displayStstus = "";
	for (var n = sourceDoc.firstChild; n != null; n = n.nextSibling) {
		var nodeLevel = levelNum(n);

		if (nodeLevel != -1) {
			// pg 413
			var TOCentry = document.getElementById("TOC" + n.id);
			if ( isHidden(TOCentry) ) { displayStstus = "none"; }
			else { displayStstus = ""; }
		}
		if (nodeLevel == 1) {
			// pg 413
			n.style.display = displayStstus;
		}
	}
}

function isHidden(object) {
	for (var n = object; n.nodeName != "BODY"; n = n.parentNode) {
		if (n.style.display == "none") { return true; }
	}
	return false;
}



