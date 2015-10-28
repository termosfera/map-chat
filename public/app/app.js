(function() {
    "use strict";

    angular.module('map-chat', ['uiGmapgoogle-maps', "geolocation", "ui.router"])
        .config(['uiGmapGoogleMapApiProvider', function(GoogleMapApiProviders) {
            GoogleMapApiProviders.configure({
                    china: true
                });
            }]
        )
        .config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise("/home");

            $stateProvider
                .state("login", {
                    url: "/login",
                    templateUrl: "app/pages/login/login_template.html"
                })
                .state("home", {
                    url: "/home",
                    templateUrl: "app/pages/home/home_template.html",
                    controller: "HomeController as home"
                })
        }]);

})();