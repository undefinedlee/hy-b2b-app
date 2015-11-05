//require("views:list/index.styl");
require("mods:tool-panel");
require("services:common");
require("services:product");
var filterTemplate = require("views:list/filter.txt");

angular.module('controllers.list', ['mods.tool-panel', 'Services.Common', 'Services.Product'])
.controller('ListController',function($scope, $ionicLoading, toolPanel, Common, Product) {
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
	// 搜索方法
	function load(){
		if(filters.page === 1){
			$ionicLoading.show({
				template: '<ion-spinner icon="ios" class="spinner-light"></ion-spinner>'
			});
		}
		Product.List(filters, function(data){
			$ionicLoading.hide();
			if(data.code === 200){
				if(filters.page === 1){
					$scope.products = data.content.products;
				}else{
					$scope.products = ($scope.products || []).concat(data.content.products || []);
				}
				filters.page ++;
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
			load();
			toolPanel.hide();
		};
	};
});