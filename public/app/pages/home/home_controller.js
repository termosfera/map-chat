(function() {
    "use strict";

    angular.module("map-chat")
        .controller("HomeController", HomeController);

    HomeController.$inject = ["$scope"];

    function HomeController($scope) {

        $scope.map = {
            center: {
                latitude: 45,
                longitude: -73
            },
            zoom: 8
        };

    }

})();