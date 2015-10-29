angular.module('app.controllers', [])
.controller('HomeController',function($scope, toolPanel) {
	$scope.close = function(){
		toolPanel.hide();
	};

	$scope.selectStart = function(){
		toolPanel.show({
			templateUrl: "views/home/start.html",
			scope: $scope
		});
	};

	$scope.selectDest = function(){
		toolPanel.show({
			templateUrl: "views/home/dest.html",
			scope: $scope
		});
	};
})
.controller('ListController',function($scope) {
	console.log("list");
})
.controller('OrderController',function($scope) {
	console.log("order");
})
.controller('UserController',function($scope) {
	console.log("user");
})
.controller('DetailController',function($scope) {
	console.log("detail");
});