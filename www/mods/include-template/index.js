angular.module('mods.include-template', [])
.directive("includeTemplate", function($rootScope, $compile, $document){
	return {
		restrict: "EA",
		scope: false,
		compile: function compile(element, attrs, linkFn) {
			var content = attrs["content"];
			
			return function(scope, element, attrs, controller){
				scope.$watch(content, function(value){
					element.html(value);

					var templateNodes = element.contents();
					$compile(templateNodes)(scope);
				});
			};
		}
	};
});