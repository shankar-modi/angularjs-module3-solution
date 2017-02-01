(function (){

'use strict';

var app = angular.module("ShoppingListCheckOff", []);

app.controller("ToBuyController", ToBuyController);
app.controller("AlreadyBoughtController", AlreadyBoughtController);
app.service("ShoppingListCheckOffService", ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

function ToBuyController(ShoppingListCheckOffService){
	var itemsToBuy = this;

	itemsToBuy.items = ShoppingListCheckOffService.getItems();

	itemsToBuy.checkoff = function(itemIndex){
			ShoppingListCheckOffService.buyItem(itemIndex);
	}

};

function AlreadyBoughtController(ShoppingListCheckOffService){
	var itemBought = this;
	itemBought.items = ShoppingListCheckOffService.getBougthItems();
};

function ShoppingListCheckOffService(){
	var service = this;

	 var itemsToBuy = [
		{ name: "cookies", quantity: 10 },
		{ name: "chips", quantity: 15 },
		{ name: "biscuit", quantity: 20 },
		{ name: "pizza", quantity: 3 },
		{ name: "pepsi", quantity: 5}
	];

	var itemsBought = [];

	service.getItems = function(){
		return itemsToBuy;
	}

	service.getBougthItems = function(){
		return itemsBought;
	}

	service.buyItem = function buy(itemIndex){
		var item = itemsToBuy[itemIndex];
		itemsBought.push(item);
		itemsToBuy.splice(itemIndex,1);
	}
}

})();