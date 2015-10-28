angular.module('app', ['ionic', 'app.controllers'])
.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})
.config(function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position("bottom");
    $ionicConfigProvider.navBar.alignTitle("center");
})
.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('main', {
            url: "/main",
            abstract: true,
            templateUrl: "views/main.html"
        })
        .state('main.home', {
            url: "/home",
            views: {
                'home': {
                    templateUrl: "views/home/index.html",
                    controller: "HomeController"
                }
            }
        })
        .state('main.list', {
            url: "/list",
            views: {
                'list': {
                    templateUrl: "views/list/index.html",
                    controller: "ListController"
                }
            }
        })
        .state('main.order', {
            url: "/order",
            views: {
                'order': {
                    templateUrl: "views/order/index.html",
                    controller: "OrderController"
                }
            }
        })
        .state('main.user', {
            url: "/user",
            views: {
                'user': {
                    templateUrl: "views/user/index.html",
                    controller: "UserController"
                }
            }
        })
        .state('main.detail', {
            url: "/detail",
            views: {
                'list': {
                    templateUrl: "views/detail/index.html",
                    controller: "DetailController"
                }
            }
        });
    
    $urlRouterProvider.otherwise("/main/home");
});