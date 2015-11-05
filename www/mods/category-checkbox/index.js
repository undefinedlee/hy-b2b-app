var template = require("./main.txt");
require("./main.styl");

angular.module('mods.category-checkbox', [])
.controller("categoryCheckbox", function($scope, $element, $attrs, $ionicModal, $ionicScrollDelegate){
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
		
		scope.categorys = $scope._source;
		//scope.items.forEach(function(item){
		//	item.checked = $scope._value.indexOf(item.value) !== -1;
		//});

		scope.close = function(){
			scope.modal.hide().then(function(){
				scope.modal.remove();
			});
		};
		
		var itemHash = {},
			itemCategoryHash = {};
		scope.categorys.forEach(function(category){
			category.items.forEach(function(item){
				itemHash[item.value] = item;
				item.checked = $scope._value.indexOf(item.value) !== -1;
				itemCategoryHash[item.value] = category;
			});
			checkCategoryCheck(category);
		});
		
		function checkCategoryCheck(category){
			category.hasChecked = category.checked || category.items.some(function(item){
				return item.checked;
			});
		}

		scope.check = function(type, value){
			if(type === "item"){
				itemHash[value].checked = !itemHash[value].checked;
				checkCategoryCheck(itemCategoryHash[value]);
			}
		};
		
		scope.checkClass = function(className, checked){
			return checked ? " " + className : "";
		}
		
		scope.ok = function(value){
			scope.close();
			var values = [];
			for(var value in itemHash){
				if(itemHash[value].checked){
					values.push(itemHash[value].value);
				}
			}
			$scope._value = values;
		};

		scope.modal = $ionicModal.fromTemplate(template, {
			scope: scope,
			animation: 'slide-in-left'
		});
		scope.modal.show();
		
		scope.switchCategory = function(index){
			var tabs = angular.element(scope.modal.modalEl.querySelectorAll(".category-checkbox-tabs a"));
			var panels = angular.element(scope.modal.modalEl.querySelectorAll(".category-checkbox-panel"));
			tabs.removeClass("current");
			tabs.eq(index).addClass("current");
			panels.addClass("hide");
			panels.eq(index).removeClass("hide");
		};
	}
})
.directive("categoryCheckbox", function($rootScope, $compile, $document){
	return {
		restrict: "E",
		//template: "<a></a>",
		controller: "categoryCheckbox",
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
				
				scope.$watch("_value", function(){
					var sourceHash = {};
					scope._source.forEach(function(category){
						category.items.forEach(function(item){
							sourceHash[item.value] = item.name;
						});
					});
					scope.value = scope._value.map(function(value){
						return sourceHash[value];
					});
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
						if(scope._value.length){
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