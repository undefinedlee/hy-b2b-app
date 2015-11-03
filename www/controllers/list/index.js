//require("views:list/index.styl");
require("mods:tool-panel");
var filterTemplate = require("views:list/filter.txt");

angular.module('controllers.list', ['mods.tool-panel'])
.controller('ListController',function($scope, $ionicModal, toolPanel) {
	$scope.filterShow = function(){
		var scope = $scope.$new();
		
		toolPanel.show({
			template: filterTemplate,
			scope: scope
		});

		scope.ok = function(){
			toolPanel.hide();
		};
	};
});