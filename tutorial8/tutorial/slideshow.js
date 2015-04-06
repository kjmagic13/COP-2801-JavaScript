/*
New Perspectives on JavaScript, 2nd Edition
Tutorial 8
Tutorial Case

Author: Kevin McCarthy
Date:   4/5/15   


Functions

addEvent(object, evName, fnName, cap)
Run the function fnName when the event evName occurs in object.

setupSlideshow()
Sets up the slideshow by locating all slide images in the document
and then runs function to create the slide gallery and page
overlay.

createHighRes(thumb, index)
Creates image objects containing high resolution versions of the
thumbnail images by attaching the high res versions as a custom
property.

createRollover(thumb)
Creates image objects to act as rollover images for the thumbnail
images in the document.

createGallery(slides)
Creates an HTML fragment for a slide gallery containing a close button,
a slide image, navigation buttons, and a slide caption.

showGallery()
Shows the slide gallery using a fade-in effect.

changeSlide(slide)
Changes the current slide in the gallery to the slide parameter.

createOverlay()
Creates a page overlay obscuring the page content when the slide gallery
is visible.

setOpacity(objID, value)  
Set the opacity of the document object with the id, objID to value.

fadeIn(objID, maxOpacity, fadeTime, delay)
Fades in an object with the id, objID up to a maximum opacity of 
maxOpacity over an interval of fadeTime seconds with a delay of
delay seconds.

fadeOut(objID, maxOpacity, fadeTime, delay)
Fades out an object with the id, objID from a maximum opacity of 
maxOpacity down to 0 over an interval of fadeTime seconds with a 
delay of delay seconds.

*/

function addEvent(object, evName, fnName, cap) {
	if (object.attachEvent)
		object.attachEvent("on" + evName, fnName);
	else if (object.addEventListener)
		object.addEventListener(evName, fnName, cap);
}

addEvent(window, "load", setupSlideshow, false);

function setupSlideshow() {
	var slides =new Array();

	// pg 454
	for (var i = 0; i < document.images.length; i++) {
		var thumb = document.images[i];

		if (thumb.className == "slide" && thumb.parentNode.tagName == "A") {
			slides.push(thumb);
		}
	}

	for (var i = 0; i < slides.length; i++) {
		// pg 458
		createRollover(slides[i]);

		// pg 466
		createHighRes(slides[i], i);
	}

	if (slides.length > 0) {
		createGallery(slides);
		createOverlay();
	}

}

function createHighRes(thumb, index) {

	thumb.big = new Image();
	thumb.big.src = thumb.src.replace(/_thumb/, "");

	// pg 472
	thumb.onclick = showGallery;

	// pg 479
	thumb.big.index = index;

}

function createRollover(thumb) {
	thumb.out = new Image();
	thumb.over = new Image();

	thumb.out.src = thumb.src;
	thumb.over.src = thumb.src.replace(/_thumb/, "_over");

	thumb.onmouseout = function() {
		thumb.src = thumb.out.src;
	}

	thumb.onmouseover = function() {
		thumb.src = thumb.over.src;
	}
}

function createGallery(slides) {

	var galleryBox = document.createElement("div");
	galleryBox.id = "galleryBox";

	// pg 470
	var galleryTitle = document.createElement("p");
	galleryTitle.id = "galleryTitle";

	var closeButton = document.createElement("input");
	closeButton.type = "image";
	closeButton.src = "galleryClose.png";
	closeButton.onclick = function() {
		fadeOut("galleryBox", 100, 0.5, 0);
		fadeOut("pageOverlay", 80, 0.5, 0);
		setTimeout(function() {
			galleryBox.style.display = "none";
			document.getElementById("pageOverlay").style.display = "none";
		}, 500);
		galleryBox.style.display = "none";
		document.getElementById("pageOverlay").style.display = "none";
	}

	galleryTitle.appendChild(closeButton);
	galleryBox.appendChild(galleryTitle);

	// pg 463
	var slide = document.createElement("img");
	slide.id = "gallerySlide";
	slide.src = slides[0].big.src;
	slide.index = 0;
	galleryBox.appendChild(slide);

	// pg 468
	var slideCaption = document.createElement("p");
	slideCaption.id = "slideCaption";
	slideCaption.innerHTML = slides[0].alt;
	galleryBox.appendChild(slideCaption);

	// pg 477
	var galleryFooter = document.createElement("p");
	galleryFooter.id = "galleryFooter";

	// 
	var slideBack = document.createElement("input");
	slideBack.type = "image";
	slideBack.src = "back.png";

	// pg 481
	slideBack.onclick = function() {

		// 
		var currentSlide = document.getElementById("gallerySlide");
		var currentIndex = currentSlide.index

		// 
		currentIndex--;

		// 
		if (currentIndex == -1) { currentIndex = slides.length - 1; }

		// 
		changeSlide(slides[currentIndex]);
	}

	galleryFooter.appendChild(slideBack);

	// pg 483
	var slideNum = document.createElement("span");
	slideNum.id = "slideNumber";
	slideNum.innerHTML = "1";

	// 
	var slideTotal = document.createTextNode(" of " + slides.length);

	galleryFooter.appendChild(slideNum);
	galleryFooter.appendChild(slideTotal);

	galleryBox.appendChild(galleryFooter);

	// 
	var slideForward = document.createElement("input");
	slideForward.type = "image";
	slideForward.src = "forward.png";

	// pg 482
	slideForward.onclick = function() {

		// 
		var currentSlide = document.getElementById("gallerySlide");
		var currentIndex = currentSlide.index

		// 
		currentIndex++;

		// 
		if (currentIndex == slides.length) { currentIndex = 0; }

		// 
		changeSlide(slides[currentIndex]);
	}

	galleryFooter.appendChild(slideForward);

	document.body.appendChild(galleryBox);

}

function showGallery() {

	// pg 474
	changeSlide(this);

	// pg 472
	setOpacity("gallerySlide", 0);
	setOpacity("pageOverlay", 0);
	document.getElementById("galleryBox").style.display = "block";
	document.getElementById("pageOverlay").style.display = "block";
	fadeIn("galleryBox", 100, 0.5, 0);
	fadeIn("pageOverlay", 80, 0.5, 0);

	// pg 472
	return false;

}

function changeSlide(slide) {
	// pg 474
	var galleryBox = document.getElementById("galleryBox");
	var oldSlide = document.getElementById("gallerySlide");
	var slideCaption = document.getElementById("slideCaption");
	var slideNum = document.getElementById("slideNumber");

	// 
	setOpacity("gallerySlide", 0);
	var newSlide = oldSlide.cloneNode(true);
	newSlide.src = slide.big.src;
	newSlide.index = slide.big.index;
	galleryBox.replaceChild(newSlide, oldSlide);
	fadeIn("gallerySlide", 100, 0.5, 0);

	// 
	slideCaption.innerHTML = slide.alt;

	// pg 484
	slideNum.innerHTML = newSlide.index + 1;

}

function createOverlay() {

	// pg 485
	var pageOverlay = document.createElement("div");
	pageOverlay.id = "pageOverlay";

	document.body.appendChild(pageOverlay);

}

function setOpacity(objID, value)   {

	var object = document.getElementById(objID);

	// pg 492
	object.style.filter = "alpha(opacity = "+value+")";
	object.style.opacity = value/100;

}

function fadeIn(objID, maxOpacity, fadeTime, delay) {

	// pg 494
	var fadeInt = Math.round(fadeTime*1000)/maxOpacity;

	// 
	for (var i = 0; i <= maxOpacity; i++) {
		setTimeout("setOpacity('"+objID+"', "+i+")", delay);
		delay += fadeInt;
	}

}

function fadeOut(objID, maxOpacity, fadeTime, delay) {

	// pg 494
	var fadeInt = Math.round(fadeTime*1000)/maxOpacity;

	// 
	for (var i = 0; i >= maxOpacity; i--) {
		setTimeout("setOpacity('"+objID+"', "+i+")", delay);
		delay += fadeInt;
	}

}

