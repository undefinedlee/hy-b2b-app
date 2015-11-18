require("services:order");

angular.module('controllers.booking-info', ["Services.Order"])
.controller('BookingInfoController',function($scope, $rootScope, $document, $stateParams, $ionicLoading, $ionicScrollDelegate, $ionicHistory, TempOrder) {
	$scope.tempOrder = TempOrder.Get();

	$scope.hasBack = function(){
		return !!$ionicHistory.backTitle();
	};

	$scope.booking = function(){
		TempOrder.Extend({});
	};
});