var template = require("./main.txt");
require("./main.styl");

angular.module('mods.number', [])
.directive("number", function($rootScope, $compile, $document){
	return {
		restrict: "E",
		require: '?ngModel',
		scope: {
			value: '='
		},
		compile: function compile(element, attrs, linkFn) {
			var max = attrs["max"] || Infinity;
			var min = attrs["min"] || 0;

			element.addClass("mod-number").html(template);
			
			return function(scope, element, attrs, controller){
				if(controller){
					controller.$render = function() {
						scope.value = this.$viewValue;
					};
	
					scope.$watch("value", function() {
						controller.$setViewValue(scope.value);
					});
				}

				scope.down = function(){
					scope.value = Math.max(min, +(scope.value || 0) - 1);
				};
				scope.up = function(){
					scope.value = Math.min(max, +(scope.value || 0) + 1);
				};
				scope.downClass = function(){
					return scope.value === min ? "disabled" : "";
				};
				scope.upClass = function(){
					return scope.value === max ? "disabled" : "";
				};

				$compile(element.contents())(scope);
			};
		}
	};
});