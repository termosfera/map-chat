(function() {
    "use strict";

    angular.module("map-chat")
        .factory("UserFactory", ["geolocation", function(geolocation) {

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
                getUser: getUser,
                storeUser: storeUser,
                retrieveUser: retrieveUser
            };

            function setUser(u) {

                geolocation.getLocation().then(function (data) {
                    user.alias = u.alias;
                    user.isLogged = true;
                    user.location.id = u.id;
                    user.location.icon = u.avatar;

                    if (data) {
                        user.location.latitude = data.coords.latitude;
                        user.location.longitude = data.coords.longitude;
                    }
                }).then(function() {
                    storeUser(user);
                });
            }

            function getUser() {
                return user;
            }

            function storeUser(user) {
                localStorage.setItem("map-chat.user", JSON.stringify(user));
            }

            function retrieveUser() {
                return localStorage.getItem("map-chat.user");
            }

        }]);

})();