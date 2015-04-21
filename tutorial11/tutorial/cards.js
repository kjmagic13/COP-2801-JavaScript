/*
New Perspectives on JavaScript, 2nd Edition
Tutorial 11
Tutorial Case

Author: 
Date:   

Filename: cards.js


Custom Object Classes

pokerGame
The pokerGame object contains properties and methods for the game
of draw poker

pokerDeck
The pokerDeck object contains an array of poker cards and methods
for shuffling and drawing cards from the deck.

pokerHand
The pokerHand object contains an array of poker cards drawn from a
poker deck. The methods associated with the object include the ability 
to calculate the value of the hand and to mark cards to be discarded,
replaced with new cards from a poker deck.

pokerCard
The pokerCard object contains properties and methods associated with
individual poker cards including the card rank, suit, and value.


*/




/*    The pokerGame Object  */


var pokerGame = {
	currentPot: null,
	currentBet: null,

	placeBet : function() {
		this.currentPot -= this.currentBet;
	},
	payout : function(odds) {
		this.currentPot += this.currentBet*odds;
	}
}

/*    The pokerDeck Object constructor  */


function pokerDeck() {
	this.cards = new Array(52);
	var suits = new Array("Club", "Diamond", "Heart", "Spade");
	var ranks = new Array("2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace");


	var cardCount = 0;
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 13; j++) {
			this.cards[cardCount] = new pokerCard(suits[i], ranks[j]);
			cardCount++;
		}
	}

	this.shuffle = function() {
		this.cards.sort(function() {
			return 0.5 - Math.random();
		})
	}

	this.dealTo = function(pokerHand) {
		for (var i = 0; i < pokerHand.cards.length; i++) {
			pokerHand.cards[i] = this.cards.shift();
		}
	}
} 

/*    The pokerHand Object constructor   */

function pokerHand(handLength) {


	if (arguments.length != 1) {
		throw new Error("Enter a single parameter value");
	}

	if (arguments[0].constructor != Number) {
		throw new Error("handLength value must be a number");
	}

	this.cards = new Array(handLength);
}


pokerHand.prototype.maxValue = function() {
	var values = new Array();

	for (var i = 0; i < this.cards.length; i++) {
		values[i] = this.cards[i].value();
	}
	return values.max();
}

pokerHand.prototype.hasFlush = function() {

	for (var i = 1; i < this.cards.length; i++) {
		if (this.cards[i].suit != this.cards[i - 1].suit) return false;
	}
	return true;
}

pokerHand.prototype.hasStraight = function() {

	var values = new Array();

	for (var i = 0; i < this.cards.length; i++) {
		values[i] = this.cards[i].value();
	}
	values.numericSort(true);

	for (var i = 1; i < values.length; i++) {
		if (values[i] != values[i-1] + 1) return false;
	}
	return true;
}


pokerHand.prototype.hasRoyalFlush = function() {
	return this.hasFlush() && this.hasStraight() && this.maxValue() == 14;
}


pokerHand.prototype.hasStraightFlush = function() {
	return this.hasFlush() && this.hasStraight() && this.maxValue() != 14;
}


pokerHand.prototype.matches = function() {

	var values = new Array();
	for (var i = 0; i < this.cards.length; i++) {
		values[i] = this.cards[i].value();
	}
	values.numericSort(true);

	var duplicates = new Array();
	for (var i = 1; i < this.cards.length; i++) {
		if (values[i] == values[i - 1]) duplicates.push(values[i]);
	}


	if (duplicates.length == 3) {
		for (var i = 1; i < 3; i++) {
			if (duplicates[i] != duplicates[i-1]) return "Full House";
		}
		return "Four of a Kind"
	}

	if (duplicates.length == 2) {
		if (duplicates[0] == duplicates[1]) return "Three of a Kind"
			else return "Two Pair";
	}

	if (duplicates.length == 1 && duplicates[0] >= 11) return "Jacks or Better";


	return "";
}

pokerHand.prototype.handValue = function() {
	if (this.hasRoyalFlush()) return "Royal Flush";
	else if (this.hasStraightFlush()) return "Straight Flush";
	else if (this.hasFlush()) return "Flush";
	else if (this.hasStraight()) return "Straight";
	else return this.matches();
}


pokerHand.prototype.handOdds = function() {
	switch (this.handValue()) {
		case "Royal Flush" : return 250;
		case "Straight Flush" : return 50;
		case "Four of a Kind" : return 25;
		case "Full House" : return 9;
		case "Flush" : return 6;
		case "Straight" : return 4;
		case "Three of a Kind" : return 3;
		case "Two Pair" : return 2;
		case "Jacks or Better" : return 1;
		default: return 0;
	}
}


/*    The pokerCard Object constructor   */

function pokerCard(suit, rank) {

	if (arguments.length != 2) {
		throw new Error("Enter two string values");
	}

	for (var i = 0; i < arguments.length; i ++) {
		if (arguments[i].constructor != String) {
			throw new Error(arguments[i] + "  must be entered as a text string"); 
		}
	}

	this.suit = suit; 
	this.rank = rank; 

	pokerCard.prototype.imageSrc = function() {
		var fileName = this.suit.substring(0,1);

		if (this.rank == "10") fileName += "10"
			else fileName += this.rank.substring(0,1);

		fileName += ".png";
		return fileName.toLowerCase();
	}

	pokerCard.prototype.discard = false;

	pokerCard.prototype.replaceFromDeck = function(pokerDeck) {
		this.rank = pokerDeck.cards[0].rank;
		this.suit = pokerDeck.cards[0].suit;
		pokerDeck.cards.shift(); 
	}    

	pokerCard.prototype.value = function() {
		switch (this.rank) {
			case "Jack": return 11;
			case "Queen": return 12;
			case "King": return 13;
			case "Ace": return 14;
			default: return parseInt(this.rank);
		}
	}

}
