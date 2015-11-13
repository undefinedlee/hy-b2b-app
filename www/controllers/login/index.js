require("services:user");

angular.module('controllers.login', ["Services.User"])
.controller('LoginController',function($scope, $rootScope, $stateParams, $location, User) {
	if(!$stateParams.from || $stateParams.from === "/login"){
		$stateParams.from = "/home";
	}

	$scope.isLogin = true;

	$scope.logining = false;

	$scope.loginClass = function(){
		return $scope.isLogin ? "has-login" : "";
	};

	$scope.login = function(){
		if($scope.logining){
			return;
		}
		
		$scope.logining = true;
		User.Login({
			username: $scope.username,
			password: $scope.password
		}, function(result){
	        $scope.$apply(function(){
				$scope.logining = false;
		    });

			if(result.code === 200){
	            $rootScope.$state.login = result.content;
	        	$scope.$apply(function(){
		        	$scope.isLogin = true;
					$scope.errorMessage = "";
	            	$location.path($stateParams.from);
		        });
			}else{
	        	$scope.$apply(function(){
					$scope.errorMessage = result.msg;
		        });
			}
		});
	};

    User.CheckLogin(function(result){
        if(result.code === 200 && result.content){
            $rootScope.$state.login = result.content;
            $scope.$apply(function() {
	            $location.url($stateParams.from);
	        });
        }else{
        	$scope.$apply(function(){
	        	$scope.isLogin = false;
	        });
        }
    });
});