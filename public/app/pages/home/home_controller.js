(function () {
    "use strict";

    angular.module("map-chat")
        .controller("HomeController", HomeController);

    HomeController.$inject = ["SocketFactory", "geolocation", "UserFactory", "$state"];

    function HomeController(SocketFactory, UserFactory, $state) {

        // Attributes
        var home = this;
        home.user = {};
        home.messageText = "";
        home.messagesList = [];
        home.usersLocationsList = [];

        // Public functions
        home.sendMessage = sendMessage;
        home.logout = logout;

        activate();

        function activate() {
            // Check if user is logged, if not redirect to login
            var storedUser = JSON.parse( UserFactory.retrieveUser() );
            if (!storedUser || !storedUser.isLogged) {
                return $state.go("login");
            }

            // If the user is logged we have data to retrieve
            home.user = storedUser;

            // Set initial map position
            var initialLatitude = home.user.location.latitude || 0;
            var initialLongitude = home.user.location.longitude || 0;
            home.map = {
                center: {
                    latitude: initialLatitude,
                    longitude: initialLongitude
                },
                zoom: 9
            };

            handleMessages();
            handleUsers();
        }

        function handleMessages() {
            SocketFactory.on("messages", function (message) {
                if (home.messagesList.length >= 9) {
                    home.messagesList.shift();
                }
                home.messagesList.push(message);
            });
        }

        function handleUsers() {
            SocketFactory.on("users", function (users) {
                var usersLocations = [];
                for (var i = 0; i < users.length; i++) {
                    usersLocations.push(users[i].location);
                }
                home.usersLocationsList = usersLocations;
            });
        }

        function sendMessage() {
            var message = {
                author: home.user.alias,
                text: home.messageText,
                time: new Date()
            };
            home.messageText = "";
            SocketFactory.emit("newMessage", message);
        }

        function logout() {
            localStorage.removeItem("map-chat.user");
            $state.go("login");
        }

    }

})();