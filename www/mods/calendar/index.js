var template = require("./main.txt");
require("./main.styl");

var DateRegex = /^\d{4}\-\d{1,2}\-\d{1,2}$/;

angular.module('mods.calendar', [])
.controller("calendar", function($scope, $element, $attrs, $ionicModal, $ionicScrollDelegate){
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
		
		scope.months = [];

		scope.close = function(){
			scope.modal.hide().then(function(){
				scope.modal.remove();
			});
		};

		scope.clear = function(){
			this.close();
			$scope.year = "";
			$scope.month = "";
			$scope.day = "";
			$scope.week = "";
		};

		scope.select = function(year, month, day){
			this.close();
			$scope.year = year;
			$scope.month = month;
			$scope.day = day;
			$scope.week = new Date(year, month - 1, day).getDay();
		};

		scope.modal = $ionicModal.fromTemplate(template, {
			scope: scope,
			animation: 'slide-in-left'
		});
		scope.modal.show();
		
		var begin = $scope._begin || (function(date){
				return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join("-");
			})(new Date()),
			end = $scope._end || (function(begin){
				return [+begin[0] + 1, begin[1], begin[2]].join("-");
			})(begin.split("-"));

		(function(){
			begin = (function(date){
				return {
					year: +date[0],
					month: +date[1],
					day: +date[2]
				};
			})(begin.split("-"));
			
			end = (function(date){
				date = {
					year: +date[0],
					month: +date[1],
					day: +date[2]
				};
				date.month += (date.year - begin.year) * 12;
				date.year = begin.year;
				return date;
			})(end.split("-"));
			
			var beginDay = begin.month * 100 + begin.day;
			var endDay = end.month * 100 + end.day;
			var now = (+$scope.month + +($scope.year - begin.year) * 12) * 100 + +$scope.day;
			
			function createMonthData(year, month){
				var currentMonth = month * 100;
				var beginOffset = beginDay - currentMonth;
				var endOffset = endDay - currentMonth;
				var nowOffset = now - currentMonth;
				
				var date = new Date(year, month - 1, 1);
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
							}else if(i < beginOffset || i > endOffset){
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
						for(var l = (7 - (start + count) % 7) % 7; i < l; i ++){
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
					})(date.getDay(), new Date(year, month, 0).getDate())
				}
				return month;
			}
			
			var months = scope.months;
			
			(function createMonths(){
				scope.$apply(function(){
					months.push(createMonthData(begin.year, begin.month++));
				});
				if(begin.month <= end.month){
					setTimeout(createMonths, 100);
				}
			})();
			// setTimeout(function(){
			// 	$ionicScrollDelegate.$getByHandle('calendar-scroll').scrollTo(0, 100);
			// }, 250);
		})();
	};
})
.directive("calendar", function($rootScope, $compile, $document){
	return {
		restrict: "E",
		//template: "<a></a>",
		controller: "calendar",
		//replace: true,
		require: '?ngModel',
		scope: {
			_begin: '=',
			_end: '=',
			year: '=',
            month: '=',
			day: '=',
			week: '='
        },
		compile: function compile(element, attrs, linkFn) {
			var placeholder = attrs["placeholder"];
			var begin = attrs["begin"];
			var end = attrs["end"];
			
			var templateNodes = element.contents();
			var template = $compile(templateNodes);
			// 用于模板从DOM树中临时脱离出来暂时存放点
			var tempContainer = angular.element('<div></div>');
			
			return function(scope, element, attrs, controller){
				if(begin){
					if(DateRegex.test(begin)){
						scope._begin = begin;
					}else{
						scope.$parent.$watch(begin, function(value){
							scope._begin = value;
						});
					}
				}
				
				if(end){
					if(DateRegex.test(end)){
						scope._end = end;
					}else{
						scope.$parent.$watch(end, function(value){
							scope._end = value;
						});
					}
				}
				
				var lastHasValue = true;
				if(controller){
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
	
					scope.$watchGroup(["year", "month", "day"], function() {
						if(scope.year && scope.month && scope.day){
							if(!lastHasValue){
								lastHasValue = true;
								element.empty().removeClass("placeholder");
								element.append(templateNodes);
							}
							controller.$setViewValue([scope.year, scope.month, scope.day].join("-"));
						}else{
							if(lastHasValue){
								lastHasValue = false;
								tempContainer.append(templateNodes);
								element.text(placeholder).addClass("placeholder");
							}
							controller.$setViewValue("");
						}
					});
				}
				template(scope);
			};
		}
	};
})
.filter("weekName", function(){
	return function(week){
		return "日一二三四五六"[week] || "";
	};
});