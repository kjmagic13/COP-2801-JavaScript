/*
New Perspectives on JavaScript, 2nd Edition
Tutorial 4
Case Problem 1

Author: Kevin McCarthy
Date: 1/31/15       

Filename:  jemenus.js

-------------------------------------------------------------
Function List:
setTabs()
Initializes the contents of the printer.htm Web page, locating
the tab menus and assigning event handler to the tabs.

showTab()
Shows the currently-select tab menu, bring it to the top
of the stack


-------------------------------------------------------------
Global Variable List:

currentTab
An object variable pointing to the currently selected tab

maxZ
A variable containing maximum z-index value among the tab lists

-------------------------------------------------------------
*/

var currentTab = null;
var maxZ = 1;

window.onload = setTabs;

function setTabs() {
	var menuTabs = [];
	var allElems = document.getElementsByTagName("*");
	for (var i = 0; i < allElems.length; i++) {
		if (allElems[i].className == "tab") {
			menuTabs.push(allElems[i]);
			allElems[i].onclick = showTab;
		};
	};
	currentTab = menuTabs[0];
}

function showTab() {
	currentTab.style.backgroundColor = "#fff";
	maxZ++;
	var tabList = this.getElementsByTagName("ul")[0];
	tabList.style.zIndex = maxZ;
	currentTab = tabList;
	currentTab.style.backgroundColor = 'rgb(' + [221,221,255].join(',') + ')';;
}






