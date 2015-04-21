/*
New Perspectives on JavaScript, 2nd Edition
Tutorial 11
Tutorial Case

Author: 
Date:   

Filename: poker.js


Functions and Nested Functions

playDrawPoker()
Initializes and plays the video poker game

disableButton(button)
Disables and fades-out the form button

enableButton(button)
Enables and fades-in the form button

evaluateHand()
Evaluates the current poker hand and updates
the pot value

*/

addEvent(window, "load", playDrawPoker, false);

function playDrawPoker() {

	var dealButton = document.getElementById("dealB");
	var drawButton = document.getElementById("drawB");
	var standButton = document.getElementById("standB");
	var resetButton = document.getElementById("resetB");
	var handValueText = document.getElementById("handValue");
	var betSelection = document.getElementById("bet");
	var potValue = document.getElementById("pot");


	var cardImages = new Array();
	var allImages = document.getElementsByTagName("img");
	for (var i = 0; i < allImages.length; i++) {
		if (allImages[i].className == "pokerCard") cardImages.push(allImages[i]);
	}


	pokerGame.currentPot = 500;
	pokerGame.currentBet = 25;


	potValue.value = pokerGame.currentPot;


	var myDeck = new pokerDeck();
	myDeck.shuffle();


	var myHand = new pokerHand(5);


	betSelection.onchange = function() {
		pokerGame.currentBet = parseInt(this.options[this.selectedIndex].value);
	}


	function disableButton(button) {
		button.disabled = true;
		setOpacity(button, 25);
	}


	function enableButton(button) {
		button.disabled = false;
		setOpacity(button, 100);
	}


	for (var i=0; i < cardImages.length; i++) {

		cardImages[i].index = i;

		cardImages[i].onclick = function() {
			if (myHand.cards[this.index].discard) {
				myHand.cards[this.index].discard = false;
				this.src = myHand.cards[this.index].imageSrc();
			}else{
				myHand.cards[this.index].discard = true;
				this.src = "cardback.png";
			}
		}     
	}

	dealButton.onclick = function() {

		if (pokerGame.currentBet <= pokerGame.currentPot) {

			disableButton(dealButton);
			enableButton(drawButton);
			enableButton(standButton);
			betSelection.disabled = true;


			pokerGame.placeBet();
			potValue.value = pokerGame.currentPot;


			handValueText.innerHTML = "";
			for (var i = 0; i < cardImages.length; i++) {
				setOpacity(cardImages[i], 100);
			}


			if (myDeck.cards.length < 10) {
				myDeck = new pokerDeck();
				myDeck.shuffle;
			}

			myDeck.dealTo(myHand);


			for (var i = 0; i < cardImages.length; i++) {
				cardImages[i].src = myHand.cards[i].imageSrc();
			}
		} else {
			alert("Reduce the size of your bet");
		}
	}


	drawButton.onclick = function() {


		enableButton(dealButton);
		disableButton(drawButton);
		disableButton(standButton);
		betSelection.disabled = false;


		for (var i = 0; i < myHand.cards.length; i++) {

			if (myHand.cards[i].discard) {
				myHand.cards[i].replaceFromDeck(myDeck);
				myHand.cards[i].discard = false;
				cardImages[i].src = myHand.cards[i].imageSrc();
			}
		}
		evaluateHand();
	}

	standButton.onclick = function() {

		enableButton(dealButton);
		disableButton(drawButton);
		disableButton(standButton);
		betSelection.disabled = false;

		evaluateHand();

	}


	function evaluateHand() {

		handValueText.innerHTML = myHand.handValue();

		for (var i = 0; i < cardImages.length; i++) {
			setOpacity(cardImages[i], 25);
		}


		var payoutValue = myHand.handOdds();
		pokerGame.payout(payoutValue);
		potValue.value = pokerGame.currentPot;


		if (pokerGame.currentPot == 0) {
			alert("GAME OVER");
			disableButton(dealButton);
		}
	}  


	resetButton.onclick = function() {
		window.location.reload(true);
	}

} 