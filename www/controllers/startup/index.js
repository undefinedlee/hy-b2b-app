require("controllers:home");
require("controllers:list");
require("controllers:detail");
require("controllers:order");
require("controllers:user");
require("mods:calendar");
var views = {
    main: require("views:main/index.txt"),
    home: require("views:home/index.txt"),
    list: require("views:list/index.txt"),
    detail: require("views:detail/index.txt"),
    order: require("views:order/index.txt"),
    user: require("views:user/index.txt")
};

angular.module('controllers.startup',
    ['ionic',
     'controllers.home',
     'controllers.list',
     'controllers.detail',
     'controllers.order',
     'controllers.user',
     "mods.calendar"])
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
            template: views.main
        })
        .state('main.home', {
            url: "/home",
            views: {
                'home': {
                    template: views.home,
                    controller: "HomeController"
                }
            }
        })
        .state('main.list', {
            url: "/list",
            views: {
                'list': {
                    template: views.list,
                    controller: "ListController"
                }
            }
        })
        .state('main.order', {
            url: "/order",
            views: {
                'order': {
                    template: views.order,
                    controller: "OrderController"
                }
            }
        })
        .state('main.user', {
            url: "/user",
            views: {
                'user': {
                    template: views.user,
                    controller: "UserController"
                }
            }
        })
        .state('main.detail', {
            url: "/detail",
            views: {
                'list': {
                    template: views.detail,
                    controller: "DetailController"
                }
            }
        });
    
    $urlRouterProvider.otherwise("/main/home");
});