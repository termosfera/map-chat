(function() {
    "use strict";

    angular.module("map-chat")
        .controller("HomeController", HomeController);

    HomeController.$inject = ["SocketFactory", "geolocation", "UserFactory", "$state"];

    function HomeController(SocketFactory, geolocation, UserFactory, $state) {

        // Attributes
        var home = this;
        home.user = UserFactory.getUser();
        home.map = {
            center: {
                latitude: 38,
                longitude: -1.9
            },
            zoom: 9
        };
        home.messageText = "";
        home.messagesList = [];
        home.usersLocationsList = [];

        // Public functions
        home.sendMessage = sendMessage;

        activate();

        function activate() {
            // Check if user is logged, if not redirect to login
            if (!home.user.isLogged) {
                $state.go("login");
            }

            handleNewUserConnection();
            handleMessages();
            handleUsers();
        }

        function handleNewUserConnection() {
            geolocation.getLocation().then(function(data) {
                if (data) {
                    home.user.location.latitude = data.coords.latitude;
                    home.user.location.longitude = data.coords.longitude;
                    console.log(home.user);
                    SocketFactory.emit("userConnected", home.user);
                }
            });
        }

        function handleMessages() {
            SocketFactory.on("messages", function(message) {
                if (home.messagesList.length >= 9) {
                    home.messagesList.shift();
                }
                home.messagesList.push(message);
            });
        }

        function handleUsers() {
            SocketFactory.on("users", function(users) {
                var usersLocations = [];
                for (var i = 0; i < users.length; i++) {
                    usersLocations.push(users[i].location);
                }
                home.usersLocationsList = usersLocations;
                console.log(home.usersLocationsList);
            });
        }

        function sendMessage() {
            var message = {
                text: home.messageText,
                time: new Date()
            };
            home.messageText = "";
            SocketFactory.emit("newMessage", message);
        }

    }

})();