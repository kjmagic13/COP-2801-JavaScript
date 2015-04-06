/*
New Perspectives on JavaScript, 2nd Edition
Tutorial 8
Case Problem 1

Author: Kevin McCarthy  
Date: 4/5/2015    

Filename: banners.js


Global Variables
nextAd
Used to track the next ad to be displayed in the banner box


Functions

addEvent(object, evName, fnName, cap)
Run the function fnName when the event evName occurs in object.

makeBannerAds()
Create the banner box and stacked collection of banner ads

changeBannerAd()
Change the ad displayed in the banner box by changing the stacking
order of the ads

moveNextAd(top)
Move the nextAd object down top pixels from its current location.

*/


function addEvent(object, evName, fnName, cap) {
	if (object.attachEvent)
		object.attachEvent("on" + evName, fnName);
	else if (object.addEventListener)
		object.addEventListener(evName, fnName, cap);
}

/* Add new code below */

var nextAd;

addEvent(window, "load", makeBannerAds, false);

function makeBannerAds() {
	var bannerBox = document.createElement("div");
	bannerBox.id = "bannerBox";
	for (var i = 0; i < adsURL.length; i++) {
		var bannerAd = document.createElement("div");
		bannerAd.className = "bannerAd";
		bannerAd.style.zIndex = i;
		var bannerAnchor = document.createElement("a");
		bannerAnchor.href = adsURL[i];
		var bannerImage = document.createElement("img");
		// bannerImage.type = "image";
		bannerImage.src = "banner" + i + ".jpg";
		bannerAnchor.appendChild(bannerImage);
		bannerAd.appendChild(bannerAnchor);
		bannerBox.appendChild(bannerAd);
	}

	document.body.appendChild(bannerBox);

	setInterval(function() {
		changeBannerAd();
	}, 10000);
}

function changeBannerAd() {
	var allAds = document.getElementsByClassName("bannerAd");

	for (var i = 0; i < allAds.length; i++) {
		if (allAds[i].style.zIndex == 0) {
			allAds[i].style.top = "-50px";
			nextAd = allAds[i];
		}
	}

	for (var i = 0; i < allAds.length; i++) {

		allAds[i].style.zIndex = allAds[i].style.zIndex - 1;

		if (allAds[i].style.zIndex < 0) {
			allAds[i].style.zIndex = allAds.length - 1;
		}
	}

	var timeDelay = 0;
	for (var i = -50; i < 0; i++) {
		setInterval(function() {
			moveNextAd(i);
		}, timeDelay);
		timeDelay += 15;
	}

}


function moveNextAd(top) {
	nextAd.style.top = top + "px"
}
