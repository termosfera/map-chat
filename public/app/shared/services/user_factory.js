(function() {
    "use strict";

    angular.module("map-chat")
        .factory("UserFactory", [function() {

            var user = {
                isLogged: false,
                alias: "",
                avatar: "",
                location: {
                    id: 0,
                    title: "",
                    latitude: 0,
                    longitude: 0
                }
            };

            return {
                setUser: setUser,
                getUser: getUser
            };

            function setUser(u) {
                user = u;
            }

            function getUser() {
                return user;
            }

        }]);

})();