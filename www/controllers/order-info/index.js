require("services:order");

angular.module('controllers.order-info', ["Services.Order"])
.controller('OrderInfoController',function($scope, $rootScope, $document, $stateParams, $ionicLoading, $ionicScrollDelegate, $ionicHistory, Order) {
	var orderId = $stateParams.orderId;
	$scope.update = function(){
		$scope.$broadcast('scroll.refreshComplete');
	};

	$scope.hasBack = function(){
		return !!$ionicHistory.backTitle();
	};

	$ionicLoading.show({
		template: '<ion-spinner icon="ios" class="spinner-light"></ion-spinner>'
	});
	Order.Info(orderId, function(result){
		if(result.code === 200){
			$scope.$apply(function(){
				$scope.info = result.content;
			});
			$ionicLoading.hide();
		}
	});
});