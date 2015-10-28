(function() {
    "use strict";

    angular.module("map-chat")
        .factory("OauthFactory", ["$q", function($q) {

            var authorizationResult = false;

            return {
                initialize: initialize,
                isReady: isReady,
                connectTwitter: connectTwitter,
                clearCache: clearCache
            };

            function initialize() {
                OAuth.initialize("DGPBxDEJ59WaLZaRK1zn82gEU7Q", {cache:true});
                authorizationResult = OAuth.create("twitter");
            }

            function isReady() {
                return (authorizationResult);
            }

            function connectTwitter() {
                var deferred = $q.defer();
                OAuth.popup("twitter", {cache:true}, function(error, result) {
                    if (!error) {
                        authorizationResult = result;
                        deferred.resolve();
                    } else {
                        console.error(error);
                    }
                });
                return deferred.promise;
            }

            function clearCache() {
                OAuth.clearCache();
                authorizationResult = false;
            }

        }]);

})();