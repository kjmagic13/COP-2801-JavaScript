/*
New Perspectives on JavaScript, 2nd Edition
Tutorial 5
Case Problem 1

Author: Kevin McCarthy  
Date: 2/27/2015    

Filename: links.js



Functions List:

init()
Initializes the contents of the Web page

loadLink()
Opens a Web page based on the value property of
the selected option from a selection list


*/

window.onload = init;

function init() {

	var allSelects = new Array();
	var allElems = document.getElementsByTagName("*");

	for (var i = 0; i < allElems.length; i++) {
		if (allElems[i].className == "optionLinks") { allSelects.push(allElems[i]); }
	}

	for (var i = 0; i < allSelects.length; i++) {
		allSelects[i].onchange = loadLink;
	}
}

function loadLink() {
	// sIndex = this.value;
	// alert(sIndex);
	location.href = this.value;
}