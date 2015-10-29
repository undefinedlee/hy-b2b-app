angular.module('app.directives', [])
.controller("calendar", function($scope, $element, $attrs, toolPanel){
	this.show = function(){
		$scope.close = function(){
			toolPanel.hide();
		};
		
		toolPanel.show({
			templateUrl: "js/directives/calendar/main.html",
			scope: $scope
		});
	};
})
.directive("calendar", function($rootScope){
	return {
		restrict: "A",
		controller: "calendar",
		link: function(scope, element, attrs, controller){
			element.on("click", function(){
				controller.show();
			});
		}
	};
})
.factory("toolPanel", function(){
	return {};
})
.controller("toolPanel", function($scope, $element, $attrs, $templateRequest, $compile, $rootScope, toolPanel){
	function render(content){
		$element.html(content.template);
		$compile($element.contents())(content.scope || $rootScope.$new());
	}
	
	this.show = function(content){
		if(content){
			if(content.templateUrl){
				$templateRequest(content.templateUrl, true).then(function(response) {
					render({
						template: response,
						scope: content.scope
					});
				});
			}else if(content.template){
				render({
					template: content.template,
					scope: content.scope
				});
			}
		}
		$element.addClass("tool-panel-show");
	};
	this.hide = function(){
		$element.removeClass("tool-panel-show");
	};
	
	toolPanel.show = this.show;
	toolPanel.hide = this.hide;
})
.directive("toolPanel", function($document){
	return {
		restrict: "E",
		controller: "toolPanel",
		compile: function compile(element, attrs, linkFn) {
			element.addClass("tool-panel");
		},
		link: function(scope, element, attrs, controller){}
	};
});