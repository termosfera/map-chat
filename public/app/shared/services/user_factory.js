(function() {
    "use strict";

    angular.module("map-chat")
        .factory("UserFactory", ["geolocation", function(geolocation) {

            // User model
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
                storeUser: storeUser,
                getUser: getUser
            };

            /**
             *
             * @param me
             * @returns {*}
             * @description
             *
             * Set the user model and store it to the localstorage
             */
            function storeUser(me) {

                return geolocation.getLocation()
                    .then(function (data) {
                        user.alias = me.alias;
                        user.isLogged = true;
                        user.location.id = me.id;
                        user.location.icon = me.avatar;
                        user.location.latitude = data.coords.latitude;
                        user.location.longitude = data.coords.longitude;

                        localStorage.setItem("map-chat.user", JSON.stringify(user));
                });

            }

            /**
             * @description
             *
             * Retrieve a user stored in the local storage
             */
            function getUser() {
                return localStorage.getItem("map-chat.user");
            }

        }]);

})();