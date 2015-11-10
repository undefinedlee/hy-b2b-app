require("services:product");

angular.module('controllers.detail', [])
.controller('DetailController',function($scope, $document, $stateParams, $ionicLoading, $ionicScrollDelegate, Tour) {
	var tourId = $stateParams.tourId;
	$scope.update = function(){
		$scope.$broadcast('scroll.refreshComplete');
	};
	$scope.tabIndex = 0;
	$scope.tabClass = function(index){
		return index === $scope.tabIndex ? "current" : "";
	};
	$scope.tabPanel = function(index){
		return index === $scope.tabIndex;
	};
	var mainScroll = $ionicScrollDelegate.$getByHandle('main');
	var tabHeader = $document[0].getElementById("product-detail").querySelector(".detail-info h3");
	var $tabHeader = angular.element(tabHeader);
	var tabContainer = $tabHeader.parent();
	var flying = false;
	var top;
	$scope.onScroll = function(){
		if(!top){
			top = tabHeader.offsetParent.offsetTop - 46;
		}
		if(mainScroll.getScrollPosition().top > top){
			if(!flying){
				flying = true;
				$tabHeader.addClass("product-detail-tab-fly");
				$document.find("body").append($tabHeader);
			}
		}else if(flying){
			flying = false;
			tabContainer.append($tabHeader);
			$tabHeader.removeClass("product-detail-tab-fly");
		}
	};
	var tripInited = false;
	var extendInfoInited = false;
	$scope.switchTo = function(index){
		$scope.tabIndex = index;
		if(mainScroll.getScrollPosition().top > top){
			mainScroll.scrollTo(0, top || 0, true);
		}
		
		if(index === 1 && !tripInited){
			tripInited = true;
			Tour.Trips(tourId, function(data){
				if(data.code === 200){
					data = data.content;
					data.forEach(function(item){
						item.desc = item.desc.split("\n");
					});
					$scope.$apply(function(){
						$scope.trips = data;
					});
				}
			});
		}
		if(index === 2 && !extendInfoInited){
			extendInfoInited = true;
			Tour.ExtendInfo(tourId, function(data){
				var items = [];
				if(data.code === 200){
					data.content.forEach(function(item){
						items = items.concat(item.items);
					});
					items.forEach(function(item){
						item.desc = item.desc.split("\n");
					});
					$scope.$apply(function(){
						$scope.extendInfos = items;
					});
				}
			});
		}
	};
	$ionicLoading.show({
		template: '<ion-spinner icon="ios" class="spinner-light"></ion-spinner>'
	});
	Tour.Info(tourId, function(data){
		if(data.code === 200){
			data = data.content;
			data.level = new Array(data.level + 1).join(".").split("").map(function(item, index){
				return index;
			});
			data.summary.recommends = data.summary.recommends.split("\n");
			$scope.$apply(function(){
				$scope.info = data;
			});
			$ionicLoading.hide();
		}
	});
});