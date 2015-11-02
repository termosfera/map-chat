(function() {
    "use strict";

    angular.module("map-chat")
        .factory("UserFactory", UserFactory);

    UserFactory.$inject = ["geolocation"];

    /**
     * @ngdoc service
     * @name map-chat.service:UserFactory
     *
     * @param {object} geolocation Geolocation service
     *
     * @description
     *
     * Factory which is responsible of store and retrieve client user data
     */
    function UserFactory(geolocation) {

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
            retrieveUser: retrieveUser
        };

        /**
         * @ngdoc function
         * @name map-chat.service:UserFactory#storeUSer
         * @methodOf map-chat.service:UserFactory
         * @public
         * @param {me} me user data to set
         * @returns {*} promise Returns promise after store user data
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
         * @ngdoc function
         * @name map-chat.service:UserFactory#retrieveUser
         * @methodOf map-chat.service:UserFactory
         * @public
         * @returns {String} Users data
         */
        function retrieveUser() {
            return localStorage.getItem("map-chat.user");
        }

    }

})();