var template = require("./main.txt");
require("./main.styl");

angular.module('mods.suggest', [])
.controller("suggest", function($scope, $element, $attrs, $ionicModal, $ionicScrollDelegate){
	var self = this;
	$element.on("click", function(){
		show();
	});
	
	$element.on("touchstart", function(){
		$element.addClass("activated");
	}).on("touchend", function(){
		$element.removeClass("activated");
	});
	
	function show(){
		// 为弹出日历层创建单独的作用域
		var scope = $scope.$new();

		scope.close = function(){
			scope.modal.hide().then(function(){
				scope.modal.remove();
			});
		};
		
		scope.ok = function(value){
			scope.close();
		};

		scope.modal = $ionicModal.fromTemplate(template, {
			scope: scope,
			animation: 'slide-in-left'
		});
		scope.modal.show();
	}
})
.directive("suggest", function($rootScope, $compile, $document){
	return {
		restrict: "E",
		//template: "<a></a>",
		controller: "suggest",
		//replace: true,
		require: '?ngModel',
		scope: {
			_source: '=',
			_value: '=',
			value: '='
        },
		compile: function compile(element, attrs, linkFn) {
			var placeholder = attrs["placeholder"];
			var source = attrs["source"];
			var title = attrs["title"];
			
			var templateNodes = element.contents();
			var template = $compile(templateNodes);
			// 用于模板从DOM树中临时脱离出来暂时存放点
			var tempContainer = angular.element('<div></div>');
			
			return function(scope, element, attrs, controller){
				scope.$parent.$watch(source, function(value){
					scope._source = value;
				});
				
				scope.$watch("_value", function(){});
						
				var lastHasValue = true;
				if(controller){
					controller.$render = function() {
						var value = this.$viewValue;
						scope._value = value;
					};
	
					scope.$watch("_value", function() {
						if(scope._value){
							if(!lastHasValue){
								lastHasValue = true;
								element.empty().removeClass("placeholder");
								element.append(templateNodes);
							}
						}else if(lastHasValue){
							lastHasValue = false;
							tempContainer.append(templateNodes);
							element.text(placeholder).addClass("placeholder");
						}
						controller.$setViewValue(scope._value);
					});
				}
				template(scope);
			};
		}
	};
});