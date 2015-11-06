//require("views:list/index.styl");
require("mods:tool-panel");
require("services:common");
require("services:product");
var filterTemplate = require("views:list/filter.txt");

angular.module('controllers.list', ['mods.tool-panel', 'Services.Common', 'Services.Product'])
.controller('ListController',function($scope, $ionicLoading, $timeout, $ionicScrollDelegate, toolPanel, Common, Product, Tour) {
	// 过滤条件
	var filters = {
		startCitys: [],
		dests: [],
		startDateBegin: "",
		startDateEnd: "",
		playList: [],
		featureList: [],
		page: 1
	};

	$scope.hasMore = false;
	function search(){
		$ionicLoading.show({
			template: '<ion-spinner icon="ios" class="spinner-light"></ion-spinner>'
		});
		Product.List(angular.copy(filters), function(data){
			$ionicLoading.hide();
			if(data.code === 200){
				data = data.content;
				console.log(data);
				$scope.products = data.products;
				filters.page ++;
				$ionicScrollDelegate.$getByHandle('list').scrollTo(0, 0);
				$scope.hasMore = data.page < data.pageCount;
			}
		});
	}
	// 搜索方法
	function load(){
		Product.List(angular.copy(filters), function(data){
			if(data.code === 200){
				data = data.content;
				console.log(data);
				$scope.products = ($scope.products || []).concat(data.products || []);
				filters.page ++;
				$scope.hasMore = data.page < data.pageCount;
				$scope.$broadcast('scroll.infiniteScrollComplete');
			}
		});
	}
	
	$scope.search = search;
	$scope.load = load;
	
	$scope.loadTours = function(productId){
		var product = $scope.products.filter(function(product){
			return product.id == productId;
		})[0];
		product.loading = true;
		Tour.TourList(productId, function(data){
			if(data.code === 200){
				data = data.content.filter(function(tour){
					return !product.tours.some(function(_tour){
						return _tour.id === tour.id;
					});
				});
				$scope.$apply(function(){
					product.tours = product.tours.concat(data);
					product.hasMore = false;
				});
			}
		});
	};
	
	$scope.filterShow = function(){
		var scope = $scope.$new();
		angular.extend(scope, filters);
		// 目的地数据源
		Common.Dest(function(data){
			scope.destSource = data;
		});
		// 线路玩法数据源
		Common.LinePlay(function(data){
			scope.playSource = data;
		});
		// 产品特色数据源
		Common.ProductFeature(function(data){
			scope.featureSource = data;
		});
		
		toolPanel.show({
			template: filterTemplate,
			scope: scope
		});
		
		var tabs = angular.element(toolPanel.container[0].querySelectorAll(".J-tabs a")),
			panels = angular.element(toolPanel.container[0].querySelectorAll(".J-tab-panel"));
		
		scope.switchTab = function(index){
			tabs.removeClass("current");
			tabs.eq(index).addClass("current");
			panels.addClass("tab-panel-hide");
			panels.eq(index).removeClass("tab-panel-hide");
		};

		scope.ok = function(){
			filters.startCitys = scope.startCitys;
			filters.dests = scope.dests;
			filters.startDateBegin = scope.startDateBegin;
			filters.startDateEnd = scope.startDateEnd;
			filters.playList = scope.playList;
			filters.featureList = scope.featureList;
			filters.page = 1;
			search();
			toolPanel.hide();
		};
	};

	search();
});