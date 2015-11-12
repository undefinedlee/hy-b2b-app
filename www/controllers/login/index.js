require("services:user");

angular.module('controllers.login', ["Services.User"])
.controller('LoginController',function($scope, $rootScope, $stateParams, User) {
	if(!$stateParams.from || $stateParams.from === "login"){
		$stateParams.from = "main.home";
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
	            $rootScope.$state.go($stateParams.from, $stateParams.params || {});
	        	$scope.$apply(function(){
		        	$scope.isLogin = true;
					$scope.errorMessage = "";
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
            $rootScope.$state.go($stateParams.from, $stateParams.params);
        }else{
        	$scope.$apply(function(){
	        	$scope.isLogin = false;
	        });
        }
    });
});