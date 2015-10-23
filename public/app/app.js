(function() {
    "use strict";

    angular.module('map-chat', ['uiGmapgoogle-maps'])
        .config(['uiGmapGoogleMapApiProvider', function(GoogleMapApiProviders) {
            GoogleMapApiProviders.configure({
                china: true
            });
        }]
    );

})();