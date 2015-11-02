(function () {
    "use strict";

    angular.module("map-chat")
        .factory('SocketFactory', SocketFactory);

    SocketFactory.$inject = ['$rootScope'];

    /**
     * @ngdoc service
     * @name map-chat.service:SocketFactory
     *
     * @param {object} $rootScope $rootScope service
     *
     * @description
     *
     * Factory which is responsible of receive and emit socket events.
     */
    function SocketFactory($rootScope) {
        var socket = io.connect();

        return {
            on: on,
            emit: emit
        };

        /**
         * @ngdoc function
         * @name map-chat.service:SocketFactory#on
         * @methodOf map-chat.service:SocketFactory
         *
         * @param {String} eventName events name
         * @param {function} callback function to execute when event fires
         * @returns {*} removes listener after execute event callback
         */
        function on(eventName, callback) {
            function wrapper() {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            }

            socket.on(eventName, wrapper);

            return function () {
                socket.removeListener(eventName, wrapper);
            };
        }

        /**
         * @ngdoc function
         * @name map-chat.service:SocketFactory#emit
         * @methodOf map-chat.service:SocketFactory
         *
         * @param {String} eventName events name
         * @param {object} data data to emit
         * @param {function} callback function to execute
         */
        function emit(eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            });
        }
    }

})();