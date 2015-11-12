var template = require("./main.txt");
require("./main.styl");

angular.module('mods.checkbox', [])
.controller("checkbox", function($scope, $element, $attrs, $ionicModal, $ionicScrollDelegate){
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
		
		scope.items = $scope._source;
		if($scope._value){
			scope.items.forEach(function(item){
				item.checked = $scope._value.indexOf(item.value) !== -1;
			});
		}
		scope.title = $scope._title;

		scope.close = function(){
			scope.modal.hide().then(function(){
				scope.modal.remove();
			});
		};

		scope.check = function(value){
			scope.items.some(function(item){
				if(item.value == value){
					item.checked = !item.checked;
					return true;
				}
			});
		};
		
		scope.checkClass = function(checked){
			return checked ? " checked" : "";
		}
		
		scope.ok = function(value){
			scope.close();
			$scope._value = scope.items.filter(function(item){
				return item.checked;
			}).map(function(item){
				return item.value;
			});
		};

		scope.modal = $ionicModal.fromTemplate(template, {
			scope: scope,
			animation: 'slide-in-left'
		});
		scope.modal.show();
	}
})
.directive("checkbox", function($rootScope, $compile, $document){
	return {
		restrict: "E",
		//template: "<a></a>",
		controller: "checkbox",
		//replace: true,
		require: '?ngModel',
		scope: {
			_title: '=',
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
				scope._title = title;
				
				scope.$watch("_value", function(){
					var sourceHash = {};
					scope._source && scope._source.forEach(function(item){
						sourceHash[item.value] = item.name;
					});
					scope.value = scope._value? scope._value.map(function(value){
						return sourceHash[value];
					}) : [];
				});
						
				var lastHasValue = true;
				if(controller){
					controller.$render = function() {
						var value = this.$viewValue;
						if(value){
							scope._value = value;
						}else{
							scope._value = [];
						}
					};
	
					scope.$watch("_value", function() {
						if(scope._value && scope._value.length){
							if(!lastHasValue){
								lastHasValue = true;
								element.empty().removeClass("placeholder");
								element.append(templateNodes);
							}
							controller.$setViewValue(scope._value);
						}else{
							if(lastHasValue){
								lastHasValue = false;
								tempContainer.append(templateNodes);
								element.text(placeholder).addClass("placeholder");
							}
							controller.$setViewValue([]);
						}
					});
				}
				template(scope);
			};
		}
	};
});