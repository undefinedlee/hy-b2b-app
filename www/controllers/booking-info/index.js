require("services:order");

function numToArray(num){
	return new Array(num || 0);
};

angular.module('controllers.booking-info', ["Services.Order"])
.controller('BookingInfoController',function($scope, $rootScope, $document, $stateParams, $ionicLoading, $ionicScrollDelegate, $ionicHistory, TempOrder, Order) {
	var tempOrder = TempOrder.Get();

	$scope.adult = numToArray(tempOrder.adult);
	$scope.child = numToArray(tempOrder.child);
	$scope.old = numToArray(tempOrder.old);
	$scope.baby = numToArray(tempOrder.baby);

	$scope.hasBack = function(){
		return !!$ionicHistory.backTitle();
	};

	$scope.booking = function(){
		TempOrder.Extend({
			adult: $scope.adult,
			child: $scope.child,
			old: $scope.old,
			baby: $scope.baby
		});

		$ionicLoading.show({
			template: '<ion-spinner icon="ios" class="spinner-light"></ion-spinner>'
		});
		Order.Create(TempOrder.Get(), function(result){
			$ionicLoading.hide();

			if(result.code === 200){
				TempOrder.Clear();
				$ionicLoading.show({
					template: '<i class="icon i-checked" style="font-size:30px;color:#fff;"></i>'
				});
				setTimeout(function(){
					$ionicLoading.hide();
	        		$rootScope.$state.go("order-info", {
	        			orderId: result.orderId
	        		});
	        	}, 500);
			}
		});
	};
});