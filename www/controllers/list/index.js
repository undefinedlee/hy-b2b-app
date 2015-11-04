//require("views:list/index.styl");
require("mods:tool-panel");
var filterTemplate = require("views:list/filter.txt");

angular.module('controllers.list', ['mods.tool-panel'])
.controller('ListController',function($scope, $ionicModal, toolPanel) {
	$scope.filterShow = function(){
		var scope = $scope.$new();
		
		scope.allPlayList = [{
			name: "选项一",
			value: 1
		}, {
			name: "选项二",
			value: 2
		}, {
			name: "选项三",
			value: 3
		}, {
			name: "选项四",
			value: 4
		}, {
			name: "选项五",
			value: 5
		}];
		
		scope.playList = [2, 4];
		
		scope.allFeatureList = [{
			name: "选项一",
			value: 1
		}, {
			name: "选项二",
			value: 2
		}, {
			name: "选项三",
			value: 3
		}, {
			name: "选项四",
			value: 4
		}, {
			name: "选项五",
			value: 5
		},{
			name: "选项六",
			value: 6
		}, {
			name: "选项七",
			value: 7
		}, {
			name: "选项八",
			value: 8
		}, {
			name: "选项九",
			value: 9
		}, {
			name: "选项十",
			value: 10
		}];
		
		scope.featureList = null;
		
		toolPanel.show({
			template: filterTemplate,
			scope: scope
		});

		scope.ok = function(){
			toolPanel.hide();
		};
	};
});