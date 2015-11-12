require("services:order");
require("services:user");
require("mods:number");
require("mods:radio");

angular.module('controllers.booking', ["mods.number", "mods.radio", "Services.User"])
.controller('BookingController',function($scope, $rootScope, $document, $stateParams, $ionicLoading, $ionicScrollDelegate, $ionicHistory, User) {
	var tourId = $stateParams.tourId;

	User.LinkSalesOrCustomers(function(data){
		if(data.code === 200){
			$scope.$apply(function(){
				$scope.salesSource = data.content;
			});
		}
	});

	$scope.linkUserType = {
		"sales": "客户",
		"customer": "销售"
	}[$rootScope.$state.login.type];
	$scope.adult = 1;
	$scope.child = 0;
	$scope.old = 0;
	$scope.baby = 0;

	$scope.hasBack = function(){
		return !!$ionicHistory.backTitle();
	};
});