angular.module('controllers.detail', [])
.controller('DetailController',function($scope, $stateParams) {
	console.log("detail:" + $stateParams.tourId);
});