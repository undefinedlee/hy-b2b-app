//require("views:list/index.styl");
require("mods:tool-panel");
require("mods:include-template");
require("services:common");
require("services:product");
var store = require("mods:store");
var template = {
	filter: require("views:list/filter.txt"),
	list: require("views:list/list.txt"),
	filterContent: require("views:list/filter-content.txt"),
};

var filterStoreKey = "list-filters";

angular.module('controllers.list', ['mods.tool-panel', 'Services.Common', 'Services.Product', "mods.include-template"])
.controller("ListController", function($scope, $rootScope, $ionicViewSwitcher, $ionicLoading, $document, $timeout, $ionicScrollDelegate, $ionicNavBarDelegate, includeTemplateDelegate, toolPanel, Common, Product, Tour){
	var filters = store.get(filterStoreKey);

	function filterController(scope){
		// 出发城市数据源
		Common.StartCity(function(data){
			scope.startCitySource = data;
		});
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
	}

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

	function FilterController(){
		$scope.listContent = template.filter;
		$scope.hasFilters = false;
		//$ionicNavBarDelegate.$getByHandle("main").setTitle("产品查询");

		includeTemplateDelegate.ready("product-list-content", function(){
			var container = angular.element($document[0].getElementById("product-list"));
			var scope = $scope.$$childTail;
			scope.filterContent = template.filterContent;
			filterController(scope);

			includeTemplateDelegate.ready("product-filter-content", function(){
				$timeout(function(){
					scope.switchTab = switchTab(container);
					scope.switchTab(0);
				});

				scope.ok = function(){
					ok(scope);
					//$rootScope.$state.reload(true);
					ListController();
				};
			});
		});
	}

	function ListController(){
		$scope.listContent = template.list;
		includeTemplateDelegate.reset("product-list-content");
		$scope.hasFilters = true;
		//$ionicNavBarDelegate.$getByHandle("main").setTitle("产品列表");

		includeTemplateDelegate.ready("product-list-content", function(){
			var scope = $scope.$$childTail;

			scope.hasMore = false;

			function search(isRefresh){
				if(!isRefresh){
					$ionicLoading.show({
						template: '<ion-spinner icon="ios" class="spinner-light"></ion-spinner>'
					});
				}
				Product.List(angular.copy(filters), function(data){
					if(isRefresh){
						scope.$broadcast('scroll.refreshComplete');
					}else{
						$ionicLoading.hide();
					}
					
					if(data.code === 200){
						data = data.content;
						console.log(data);
						scope.products = data.products;
						filters.page ++;
						$ionicScrollDelegate.$getByHandle('list').scrollTo(0, 0);
						scope.hasMore = data.page < data.pageCount;
					}
				});
			}
			// 搜索方法
			function load(){
				Product.List(angular.copy(filters), function(data){
					scope.$broadcast('scroll.infiniteScrollComplete');
					if(data.code === 200){
						data = data.content;
						console.log(data);
						scope.products = (scope.products || []).concat(data.products || []);
						filters.page ++;
						scope.hasMore = data.page < data.pageCount;
					}
				});
			}
			
			scope.refresh = function(){
				search(true);
			};
			scope.load = load;
			
			scope.loadTours = function(productId){
				var product = scope.products.filter(function(product){
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
						scope.$apply(function(){
							product.tours = product.tours.concat(data);
							product.hasMore = false;
						});
					}
				});
			};
	
			$scope.filterShow = function(){
				var _scope = scope.$new();
				angular.extend(_scope, filters);

				filterController(_scope);

				_scope.moreFilter = true;
				
				toolPanel.onBeforeShow = function(){
					_scope.switchTab = switchTab(toolPanel.container);
					_scope.switchTab(0);
				};

				toolPanel.onBeforeHide = function(){
					var container = this.container[0].querySelector(".filter-panel");
					container.style.height = "";
				};
				
				toolPanel.show({
					template: template.filterContent,
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
	}

	if(filters){
		filters = JSON.parse(filters);
		ListController();
	}else{
		filters = {};
		FilterController();
	}
});