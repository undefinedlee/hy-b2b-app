angular.module('app.directives', [])
.controller("calendar", function($scope, $element, $attrs, $ionicModal, toolPanel){
	var self = this;
	$element.on("click", function(){
		self.show();
	});
	
	this.show = function(){
		$scope.close = function(){
			toolPanel.hide();
		};

		$scope.select = function(year, month, day){
			toolPanel.hide();
			$scope.year = year;
			$scope.month = month;
			$scope.day = day;
		};
		
		toolPanel.fill();
		toolPanel.show();
		
		setTimeout(function(){
			$scope.months = (function(date){
				var year = date.getFullYear();
				var month = date.getMonth();
				var months = [];
				var startDay = year * 10000 + month * 100 + date.getDate();
				for(var i = 0; i < 12; i ++){
					months[i] = (function(year, month){
						var date = new Date(year, month, 1);
						var dayOffset = date.getFullYear() * 10000 + date.getMonth() * 100 - startDay;
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
									if(dayOffset + i < 0){
										days.push({
											disable: true,
											num: i
										});
									}else{
										days.push({
											able: true,
											num: i
										});
									}
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
			
			toolPanel.fill({
				templateUrl: "js/directives/calendar/main.html",
				scope: $scope
			});
		}, 200);
	};
	// 	$ionicModal.fromTemplateUrl('js/directives/calendar/main.html', {
    // scope: $scope,
    // animation: 'slide-in-up'
  // }).then(function(modal) {
    // $scope.modal = modal;
  // });
  // $scope.openModal = function() {
    // $scope.modal.show();
  // };
  // this.show = $scope.openModal;
  // $scope.close = function() {
    // $scope.modal.hide();
  // };
  // //当我们用到模型时，清除它！
  // $scope.$on('$destroy', function() {
    // $scope.modal.remove();
  // });
  // // 当隐藏的模型时执行动作
  // $scope.$on('modal.hide', function() {
    // // 执行动作
  // });
  // // 当移动模型时执行动作
  // $scope.$on('modal.removed', function() {
    // // 执行动作
  // });
})
.directive("calendar", function($rootScope, $compile){
	return {
		restrict: "E",
		//template: "<a></a>",
		controller: "calendar",
		//replace: true,
		require: '^?ngModel',
		scope: {
			year: '=',
            month: '=',
			day: '='
        },
		compile: function compile(element, attrs, linkFn) {
			//var value = attrs["value"];
			//var template = element.html();
			//var placeholder = atrrs["placeholder"];
			//console.log(value);
			//console.log(template);
			//console.log(placeholder);
			
			var template = $compile(element.contents());
			return function(scope, element, attrs, controller){
				template(scope);
				controller.$render = function(value) {
					if(value){
						value = value.split("-");
						scope.year = value[0];
						scope.month = value[1];
						scope.day = value[2];
					}else{
						scope.year = "";
						scope.month = "";
						scope.day = "";
					}
				};
				//scope.$apply(function() {
				// scope.$watch(function() {
				// 	controller.$setViewValue([scope.year, scope.month, scope.day].join("-"));
				// });
				controller.$setViewValue([scope.year, scope.month, scope.day].join("-"));
			};
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