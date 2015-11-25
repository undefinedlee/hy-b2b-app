require("services:product");
var store = require("mods:store");
require("mods:tool-panel");
var template = {
	filter: require("views:order/filter.txt")
};

var filterStoreKey = "order-filters";

angular.module('controllers.order', ['Services.Order', 'mods.tool-panel'])
.controller('OrderController',function($scope, $ionicLoading, $ionicScrollDelegate, Order, toolPanel) {
	//var scope = $scope.$$childTail;
	var scope = $scope;

	var filters = store.get(filterStoreKey);
	if(filters){
		filters = JSON.parse(filters);
	}else{
		filters = {};
	}

	scope.hasMore = false;

	function search(isRefresh){
		if(!isRefresh){
			$ionicLoading.show({
				template: '<ion-spinner icon="ios" class="spinner-light"></ion-spinner>'
			});
		}
		Order.List(angular.copy(filters), function(data){
			if(isRefresh){
				scope.$broadcast('scroll.refreshComplete');
			}else{
				$ionicLoading.hide();
			}
			
			if(data.code === 200){
				data = data.content;
				console.log(data);
				scope.orders = data.orders;
				filters.page ++;
				$ionicScrollDelegate.$getByHandle('list').scrollTo(0, 0);
				scope.hasMore = data.page < data.pageCount;
			}
		});
	}
	// 搜索方法
	function load(){
		Order.List(angular.copy(filters), function(data){
			scope.$broadcast('scroll.infiniteScrollComplete');
			if(data.code === 200){
				data = data.content;
				console.log(data);
				scope.orders = (scope.orders || []).concat(data.orders || []);
				filters.page ++;
				scope.hasMore = data.page < data.pageCount;
			}
		});
	}
	
	scope.refresh = function(){
		search(true);
	};
	scope.load = load;

	function switchTab(container){
		var panelHeights = [],
			tabs, panels;

		return function(index){
			if(!tabs){
				container = angular.element(container[0].querySelector(".filter-panel"));
				tabs = angular.element(container[0].querySelectorAll(".J-tabs a"));
				panels = angular.element(container[0].querySelectorAll(".J-tab-panel"));
				(function(){
					var currentIndex;

					for(var i = 0, l = panels.length; i < l; i ++){
						panelHeights[i] = panels[i].offsetHeight;
						if(!panels.eq(i).hasClass("tab-panel-hide")){
							currentIndex = i;
						}
					}

					container.css({
						height: panelHeights[currentIndex] + "px"
					}).addClass("filter-panel-animate");
				})();
			}

			tabs.removeClass("current");
			tabs.eq(index).addClass("current");
			panels.addClass("tab-panel-hide");
			panels.eq(index).removeClass("tab-panel-hide");
			container.css({
				height: panelHeights[index] + "px"
			});
		}
	}

	function ok(scope){
		filters.startCitys = scope.startCitys;
		filters.dests = scope.dests;
		filters.startDateBegin = scope.startDateBegin;
		filters.startDateEnd = scope.startDateEnd;
		filters.playList = scope.playList;
		filters.featureList = scope.featureList;
		filters.page = 1;

		store.set(filterStoreKey, JSON.stringify(filters));
	}

	$scope.filterShow = function(){
		var _scope = scope.$new();
		angular.extend(_scope, filters);

		//filterController(_scope);
		
		toolPanel.onBeforeShow = function(){
			_scope.switchTab = switchTab(toolPanel.container);
			_scope.switchTab(0);
		};

		toolPanel.onBeforeHide = function(){
			var container = this.container[0].querySelector(".filter-panel");
			container.style.height = "";
		};
		
		toolPanel.show({
			template: template.filter,
			scope: _scope
		});

		_scope.ok = function(){
			ok(_scope);
			search();
			toolPanel.hide();
		};
	};

	search();
});