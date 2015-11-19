require("controllers:home");
require("controllers:list");
require("controllers:detail");
require("controllers:booking");
require("controllers:booking-info");
require("controllers:order");
require("controllers:order-info");
require("controllers:user");
require("controllers:login");
require("mods:calendar");
require("mods:checkbox");
require("mods:category-checkbox");
var views = {
    main: require("views:main/index.txt"),
    home: require("views:home/index.txt"),
    list: require("views:list/index.txt"),
    detail: require("views:detail/index.txt"),
    booking: require("views:booking/index.txt"),
    bookingInfo: require("views:booking-info/index.txt"),
    order: require("views:order/index.txt"),
    orderInfo: require("views:order-info/index.txt"),
    user: require("views:user/index.txt"),
    login: require("views:login/index.txt")
};

angular.module('controllers.startup',
    ['ionic',
     'controllers.home',
     'controllers.list',
     'controllers.detail',
     'controllers.booking',
     'controllers.booking-info',
     'controllers.order',
     'controllers.order-info',
     'controllers.user',
     'controllers.login',
     "mods.calendar",
     "mods.checkbox",
     "mods.category-checkbox"])
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
    // 渐隐切换动画
    $ionicConfigProvider.transitions.views.opacity = function(enteringEle, leavingEle, direction, shouldAnimate) {
        function setStyles(ele, opacity) {
            var css = {};
            css.opacity = opacity;
            ionic.DomUtil.cachedStyles(ele, css);
        }

        var d = {
            run: function(step) {
                if (direction == 'forward') {
                    setStyles(enteringEle, step);
                    setStyles(leavingEle, 1 - step);

                } else if (direction == 'back') {
                    setStyles(enteringEle, step);
                    setStyles(leavingEle, 1 - step);

                } else {
                    // swap, enter, exit
                    setStyles(enteringEle, 1);
                    setStyles(leavingEle, 0);
                }
            },
            shouldAnimate: shouldAnimate && (direction == 'forward' || direction == 'back')
        };

        return d;
    };
    $ionicConfigProvider.transitions.navBar.opacity = $ionicConfigProvider.transitions.navBar.none;
})
.config(function ($stateProvider, $urlRouterProvider) {
    function ResolveController(controllerName){
        return function($stateParams, $rootScope, $location){
            var $state = $rootScope.$state;

            if($state.login){
                return controllerName;
            }else{
                $state.go("login", {
                    from: $location.$$url
                });
            }
        }
    }

    $stateProvider
        .state('main', {
            url: "/main",
            //abstract: true,
            template: views.main
        })
        .state('main.home', {
            url: "^/home",
            template: views.home,
            controllerProvider: ResolveController("HomeController")
        })
        .state('main.list', {
            url: "^/list",
            template: views.list,
            controllerProvider: ResolveController("ListController")
        })
        .state('main.order', {
            url: "^/order",
            template: views.order,
            controllerProvider: ResolveController("OrderController")
        })
        .state('order-info', {
            url: "^/order-info/{orderId}",
            template: views.orderInfo,
            controllerProvider: ResolveController("OrderInfoController")
        })
        .state('main.user', {
            url: "^/user",
            template: views.user,
            controllerProvider: ResolveController("UserController")
        })
        .state('detail', {
            url: "^/detail/{tourId}",
            template: views.detail,
            controllerProvider: ResolveController("DetailController")
        })
        .state('booking', {
            url: "^/booking/{tourId}",
            template: views.booking,
            controllerProvider: ResolveController("BookingController")
        })
        .state('booking-info', {
            url: "^/booking-info",
            template: views.bookingInfo,
            controllerProvider: ResolveController("BookingInfoController")
        })
        .state('login', {
            url: "^/login/{from}",
            template: views.login,
            controller: "LoginController"
        });
    
    $urlRouterProvider.otherwise("/home");
})
.run(function($rootScope, $state, $stateParams){
    $rootScope.$state = $state;
    $state.login = false;
});