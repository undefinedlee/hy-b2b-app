//require("views:list/index.styl");
require("mods:tool-panel");
require("services:common");
require("services:product");
var filterTemplate = require("views:list/filter.txt");

angular.module('controllers.list', ['mods.tool-panel', 'Services.Common', 'Services.Product'])
.controller('ListController',function($scope, $ionicLoading, $timeout, toolPanel, Common, Product) {
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
		Product.List(filters, function(data){
			$ionicLoading.hide();
			if(data.code === 200){
				data = data.content;
				$scope.products = data.products;
				filters.page ++;
				$scope.hasMore = data.page < data.pageCount;
			}
		});
	}
	// 搜索方法
	var loading = false;
	function load(){
		if(loading){
			return;
		}
		loading = true;
		Product.List(filters, function(data){
			loading = false;
			if(data.code === 200){
				data = data.content;
				$scope.products = ($scope.products || []).concat(data.products || []);
				$scope.$broadcast('scroll.infiniteScrollComplete');
				filters.page ++;
				$scope.hasMore = data.page < data.pageCount;
			}
		});
	}
	
	$scope.load = load;
	
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