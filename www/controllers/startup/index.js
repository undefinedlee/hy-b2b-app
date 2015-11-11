require("controllers:home");
require("controllers:list");
require("controllers:detail");
require("controllers:booking");
require("controllers:order");
require("controllers:user");
require("mods:calendar");
require("mods:checkbox");
require("mods:category-checkbox");
var views = {
    main: require("views:main/index.txt"),
    home: require("views:home/index.txt"),
    list: require("views:list/index.txt"),
    detail: require("views:detail/index.txt"),
    booking: require("views:booking/index.txt"),
    order: require("views:order/index.txt"),
    user: require("views:user/index.txt")
};

angular.module('controllers.startup',
    ['ionic',
     'controllers.home',
     'controllers.list',
     'controllers.detail',
     'controllers.booking',
     'controllers.order',
     'controllers.user',
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
    $stateProvider
        .state('main', {
            url: "/main",
            //abstract: true,
            template: views.main
        })
        .state('main.home', {
            url: "^/home",
            template: views.home,
            controller: "HomeController"
        })
        .state('main.list', {
            url: "^/list",
            template: views.list,
            controller: "ListController"
        })
        .state('main.order', {
            url: "^/order",
            template: views.order,
            controller: "OrderController"
        })
        .state('main.user', {
            url: "^/user",
            template: views.user,
            controller: "UserController"
        })
        .state('detail', {
            url: "^/detail/{tourId}",
            template: views.detail,
            controller: "DetailController"
        })
        .state('booking', {
            url: "^/booking/{tourId}",
            template: views.booking,
            controller: "BookingController"
        });
    
    $urlRouterProvider.otherwise("/home");
});