(function() {
    "use strict";

    angular.module("map-chat")
        .factory("OauthFactory", OauthFactory);

    OauthFactory.$inject = ["$q"];

    /**
     * @ngdoc service
     * @name map-chat.service:OauthFactory
     *
     * @param {object} $q $q promises service
     *
     * @description
     *
     * Factory which is responsible of oauth autentication
     */
    function OauthFactory($q) {

        var authorizationResult = false;

        return {
            initialize: initialize,
            isReady: isReady,
            connectTwitter: connectTwitter,
            clearCache: clearCache
        };

        /**
         * @ngdoc function
         * @name map-chat.service:OauthFactory#initialize
         * @methodOf map-chat.service:OauthFactory
         * @description
         *
         * initializes oauth script passing oauth token
         */
        function initialize() {
            OAuth.initialize("DGPBxDEJ59WaLZaRK1zn82gEU7Q", {cache:true});
            authorizationResult = OAuth.create("twitter");
        }

        /**
         * @ngdoc function
         * @name map-chat.service:OauthFactory#isReady
         * @methodOf map-chat.service:OauthFactory
         * @returns {boolean} Authorization result
         * @description
         *
         * Returns authorization result
         */
        function isReady() {
            return (authorizationResult);
        }

        /**
         * @ngdoc function
         * @name map-chat.service:OauthFactory#connectTwitter
         * @methodOf map-chat.service:OauthFactory
         * @returns {*} promise connection with twitter promise
         * @description
         *
         * Returns promise with twitter connection
         */
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

        /**
         * @ngdoc function
         * @name map-chat.service:OauthFactory#clearCache
         * @methodOf map-chat.service:OauthFactory
         * @description
         *
         * Clears oauth cache
         */
        function clearCache() {
            OAuth.clearCache();
            authorizationResult = false;
        }

    }

})();