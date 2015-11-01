var views = {
	start: require("views:home/start.txt"),
	dest: require("views:home/dest.txt")
};
//require("view:home/index.styl");

angular.module('controllers.home', [])
.controller('HomeController',function($scope, $ionicModal) {
	// $scope.close = function(){
	// 	toolPanel.hide();
	// };

	// $scope.selectStart = function(){
	// 	toolPanel.show({
	// 		template: views.start,
	// 		scope: $scope
	// 	});
	// };

	// $scope.selectDest = function(){
	// 	toolPanel.show({
	// 		template: views.dest,
	// 		scope: $scope
	// 	});
	// };
	
	$scope.StartDateBegin = (function(date){
		return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join("-");
	})(new Date());
	$scope.showDate = function(){
		console.log($scope.StartDateBegin);
	};
});