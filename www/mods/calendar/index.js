var template = require("./main.txt");
require("./main.styl");

angular.module('mods.calendar', [])
.controller("calendar", function($scope, $element, $attrs, $ionicModal, $ionicScrollDelegate){
	var self = this;
	$element.on("click", function(){
		show();
	});
	
	function show(){
		// 为弹出日历层创建单独的作用域
		var scope = $scope.$new();

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
		
		// toolPanel.show({
		// 	template: template,
		// 	scope: scope
		// });

		(function(date){
			var year = date.getFullYear();
			var month = date.getMonth();
			var months = scope.months = [];
			var startDay = year * 10000 + month * 100 + date.getDate();
			var now = $scope.year * 10000 + ($scope.month - 1) * 100 + +$scope.day;

			function createMonthData(year, month){
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
					})(date.getDay(), new Date(year, month + 1, 0).getDate())
				}
				return month;
			}

			var count = 12;
			(function createMonths(){
				scope.$apply(function(){
					months.push(createMonthData(year, month++));
				});
				if(--count > 0){
					setTimeout(createMonths, 100);
				}
			})();
			// setTimeout(function(){
			// 	$ionicScrollDelegate.$getByHandle('calendar-scroll').scrollTo(0, 100);
			// }, 250);
		})(new Date());
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