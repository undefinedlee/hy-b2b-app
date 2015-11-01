require("./index.styl");

angular.module('mods.tool-panel', [])
.factory("toolPanel", function(){
	return {};
})
.controller("toolPanel", function($scope, $element, $attrs, $templateRequest, $compile, $rootScope, toolPanel){
	function render(content){
		$element.html(content.template);
		$compile($element.contents())(content.scope || $rootScope.$new());
	}
	
	this.fill = function(content){
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
		}else{
			$element.empty();
		}
	};
	this.show = function(content){
		if(content){
			this.fill(content);
		}
		$element.addClass("tool-panel-show");
	};
	this.hide = function(){
		$element.removeClass("tool-panel-show");
	};
	
	toolPanel.fill = this.fill;
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