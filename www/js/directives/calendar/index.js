angular.module('app.directives', [])
.controller("calendar", function($scope, $element, $attrs, toolPanel){
	this.show = function(){
		$scope.close = function(){
			toolPanel.hide();
		};

		$scope.months = (function(date){
			var year = date.getFullYear();
			var month = date.getMonth();
			var months = [];
			for(var i = 0; i < 12; i ++){
				months[i] = (function(year, month){
					var date = new Date(year, month, 1);
					var month = {
						year: date.getFullYear(),
						num: date.getMonth() + 1,
						weeks: (function(start, count){
							var days = [];
							for(var i = 0; i < start; i ++){
								days.push({
									empty: true
								});
							}
							for(i = 1; i <= count; i ++){
								days.push({
									able: true,
									num: i
								});
							}
							i = 0;
							for(l = (7 - (start + count) % 7) % 7; i < l; i ++){
								days.push({
									empty: true
								});
							}

							var weeks = [];
							days.forEach(function(day, index){
								var week = index / 7 | 0;
								if(!weeks[week]){
									weeks[week] = {
										days: []
									};
								}
								weeks[week].days.push(day);
							});
							return weeks;
						})(date.getDay(), new Date(year, month + 1, 0).getDate())
					}
					return month;
				})(year, month++);
			}
			return months;
		})(new Date());

		$scope.select = function(year, month, day){
			toolPanel.hide();
			$element.text([year, month, day].join("-"));
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