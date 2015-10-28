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
                user.alias = u.alias;
                user.isLogged = true;
                user.location.id = u.id;
                user.location.icon = u.avatar;
                localStorage.setItem("map-chat.user.isLogged", JSON.stringify(user.isLogged));
            }

            function getUser() {
                return user;
            }

        }]);

})();