require("services:order");
require("services:user");
require("mods:number");
require("mods:radio");

angular.module('controllers.booking', ["mods.number", "mods.radio", "Services.User"])
.controller('BookingController',function($scope, $document, $stateParams, $ionicLoading, $ionicScrollDelegate, $ionicHistory, User) {
	var tourId = $stateParams.tourId;

	User.Sales(1, function(data){
		if(data.code === 200){
			$scope.$apply(function(){
				$scope.salesSource = data.content;
			});
		}
	});

	$scope.adult = 1;
	$scope.child = 0;
	$scope.old = 0;
	$scope.baby = 0;

	$scope.hasBack = function(){
		return !!$ionicHistory.backTitle();
	};
});