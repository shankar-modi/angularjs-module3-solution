(function (){

'use strict';

var app = angular.module("NarrowItDownApp", []);

app.controller("NarrowItDownController", NarrowItDownController);
app.service("MenuSearchService", MenuSearchService);
app.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");
NarrowItDownController.$inject = ['MenuSearchService'];
MenuSearchService.$inject = ['$http', 'ApiBasePath', '$q'];

function NarrowItDownController(MenuSearchService){
	var menu = this;

  menu.search = function(){
    var searchStr = menu.searchStr;

    var promise = MenuSearchService.getMatchedMenuItems(searchStr);
    promise.then(function (response) {
      menu.found = response.data;
    })
    .catch(function (error) {
      console.log(error);
    })
  }
};

function MenuSearchService($http, ApiBasePath, $q){
	var service = this;



	service.getMatchedMenuItems = function (searchTerm){
      var deferred = $q.defer();
	 		$http({
  						method: "GET",
      					url: (ApiBasePath + "/menu_items.json")
    				}).then(function(response){
    						var menuArr = response.data.menu_items;
                var found = [];
                for (var i = 0; i < menuArr.length; i++ ) {
                      if(menuArr[i].description.toLowerCase().indexOf(searchTerm) !== -1){
                          found.push(menuArr[i]);
                      }

                };
                response.data = found 
                deferred.resolve(response);

    				},function(error){
                deferred.reject(error);
    				});

            return deferred.promise;


	}
}

})();