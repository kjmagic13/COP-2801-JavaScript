/*
New Perspectives on JavaScript, 2nd Edition
Tutorial 11
Case Problem 1

Author: Kevin McCarthy
Date: 1/31/15   

Filename: shop.js


Functions
startShopping()
Reads the properties of the shopping items from the Web table
and places them in custom objects. The function then allows users
to move items from the shelf and their virtual cart.

*/

addEvent(window, "load", startShopping, false);

function startShopping() {

	var spiceTableRows = document.getElementById('saltItems').tBodies[0].getElementsByTagName('tr');

	for(i=0;i <spiceTableRows.length; i++) {

		var prodId = spiceTableRows[i].getElementsByTagName('td')[0];
		var prodName = spiceTableRows[i].getElementsByTagName('td')[1];
		var prodDesc = spiceTableRows[i].getElementsByTagName('td')[2];
		var prodPrice = spiceTableRows[i].getElementsByTagName('td')[3];
		var qtySelect = document.getElementById(prodId.textContent + 'Qty');


		var newItem = new storeItem();
		newItem.pid = prodId.textContent;
		newItem.prod = prodName.textContent;
		newItem.desc = prodDesc.textContent;
		newItem.price = prodPrice.textContent;
		newItem.qty = qtySelect.options[qtySelect.selectedIndex].value;

		qtySelect.onchange = function() {
			qtySelect.currentItem.qty = this.value;
		}

		qtySelect.currentItem = newItem;

		var selCheckBox = spiceTableRows[i].getElementsByTagName('td')[5].firstChild;

		selCheckBox.currentItem = newItem;
		

	}

	var viewCartBtn = document.getElementById('viewCart');

	viewCartBtn.onclick = function() {

		var allCheckBoxes = new Array();
		var docBody = document.getElementById('main').getElementsByTagName('input');

		for(i = 0; i < docBody.length; i++) {

			if(docBody[i].type == 'checkbox') {
				allCheckBoxes.push(docBody[i]);
			}
		}
		
		var cartCount = 0;

		for(i = 0; i < allCheckBoxes.length; i++) {

			if(allCheckBoxes[i].checked == true) {

				var qtySelect = document.getElementById(allCheckBoxes[i].currentItem.pid + 'Qty');

				storeCookieField(allCheckBoxes[i].currentItem.pid, 'prod', allCheckBoxes[i].currentItem.prod);
				storeCookieField(allCheckBoxes[i].currentItem.pid, 'desc', allCheckBoxes[i].currentItem.desc);
				storeCookieField(allCheckBoxes[i].currentItem.pid, 'price', allCheckBoxes[i].currentItem.price);

				storeCookieField(allCheckBoxes[i].currentItem.pid, 'qty', qtySelect.options[qtySelect.selectedIndex].value);

				cartCount++;
			}

			else {
				removeCookie(allCheckBoxes[i].currentItem.pid);
			}

		}

		alert("You have " + cartCount + " different items in your shopping cart");
		
	}

}

