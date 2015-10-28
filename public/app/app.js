(function() {
    "use strict";

    angular.module('map-chat', ['uiGmapgoogle-maps', "geolocation"])
        .config(['uiGmapGoogleMapApiProvider', function(GoogleMapApiProviders) {
            GoogleMapApiProviders.configure({
                china: true
            });
        }]
    );

})();