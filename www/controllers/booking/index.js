require("services:order");
require("services:user");
require("mods:number");
require("mods:radio");

angular.module('controllers.booking', ["mods.number", "mods.radio", "Services.User", "Services.Order"])
.controller('BookingController',function($scope, $rootScope, $document, $stateParams, $ionicLoading, $ionicScrollDelegate, $ionicHistory, User, TempOrder) {
	$scope.hasBack = function(){
		return !!$ionicHistory.backTitle();
	};

	var tourId = $stateParams.tourId;

	// 加载关联销售或客户
	User.LinkSalesOrCustomers(function(data){
		if(data.code === 200){
			$scope.$apply(function(){
				$scope.salesSource = data.content;
			});
		}
	});
	// 判断关联信息为销售还是客户
	$scope.linkUserType = {
		"sales": "客户",
		"customer": "销售"
	}[$rootScope.$state.login.type];

	$scope.adult = 1;
	$scope.child = 0;
	$scope.old = 0;
	$scope.baby = 0;

	$scope.next = function(){
		var scope = $scope.$$childHead;

		TempOrder.Create({
			tourId: tourId,
			sales: scope.sales,
			adult: scope.adult,
			child: scope.child,
			old: scope.old,
			baby: scope.baby
		});
		$rootScope.$state.go("booking-info");
	};
});