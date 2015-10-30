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
			$scope.week = new Date(year, month - 1, day).getDay();
		};
		
		toolPanel.fill();
		toolPanel.show();
		
		setTimeout(function(){
			$scope.months = (function(date){
				var year = date.getFullYear();
				var month = date.getMonth();
				var months = [];
				var startDay = year * 10000 + month * 100 + date.getDate();
				var now = $scope.year * 10000 + ($scope.month - 1) * 100 + +$scope.day;
				for(var i = 0; i < 12; i ++){
					months[i] = (function(year, month){
						var date = new Date(year, month, 1);
						var currentMonth = date.getFullYear() * 10000 + date.getMonth() * 100;
						var dayOffset = currentMonth - startDay;
						var nowOffset = now - currentMonth;
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
									if(i == nowOffset){
										days.push({
											current: true,
											num: i
										});
									}else if(dayOffset + i < 0){
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
.directive("calendar", function($rootScope, $compile, $document){
	return {
		restrict: "E",
		//template: "<a></a>",
		controller: "calendar",
		//replace: true,
		require: '^?ngModel',
		scope: {
			year: '=',
            month: '=',
			day: '=',
			week: '='
        },
		compile: function compile(element, attrs, linkFn) {
			var placeholder = attrs["placeholder"];
			var templateNodes = element.contents();
			var template = $compile(templateNodes);
			var tempContainer = angular.element('<div></div>');
			return function(scope, element, attrs, controller){
				//template(scope);
				var lastHasValue = true;
				controller.$render = function() {
					var value = this.$viewValue;
					if(value){
						value = value.split("-");
						scope.year = value[0];
						scope.month = value[1];
						scope.day = value[2];
						scope.week = new Date(scope.year, scope.month - 1, scope.day).getDay();
					}else{
						scope.year = "";
						scope.month = "";
						scope.day = "";
						scope.week = "";
					}
				};
				//scope.$apply(function() {
				scope.$watch(function() {
					if(scope.year && scope.month && scope.day){
						if(!lastHasValue){
							lastHasValue = true;
							element.empty().removeClass("calendar-placeholder");
							element.append(templateNodes);
						}
						controller.$setViewValue([scope.year, scope.month, scope.day].join("-"));
					}else{
						if(lastHasValue){
							lastHasValue = false;
							tempContainer.append(templateNodes);
							element.text(placeholder).addClass("calendar-placeholder");
						}
						controller.$setViewValue("");
					}
				});
				//controller.$setViewValue([scope.year, scope.month, scope.day].join("-"));
				template(scope);
			};
		}
	};
})
.filter("weekName", function(){
	return function(week){
		return "日一二三四五六"[week] || "";
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