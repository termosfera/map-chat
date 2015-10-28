(function() {
    "use strict";

    angular.module("map-chat")
        .controller("HomeController", HomeController);

    HomeController.$inject = ["SocketFactory", "geolocation"];

    function HomeController(SocketFactory, geolocation) {
        // Attributes
        var home = this;
        var randomValue = Math.floor(Math.random() * 100);
        home.user = {
            location: {
                id: randomValue,
                title: "m" + randomValue,
                latitude: 0,
                longitude: 0
            }
        };
        home.map = {
            center: {
                latitude: 38,
                longitude: -1.9
            },
            zoom: 8
        };
        home.messageText = "";
        home.messagesList = [];
        home.usersLocationsList = [];

        // Public functions
        home.sendMessage = sendMessage;

        activate();

        function activate() {
            handleNewUserConnection();
            handleMessages();
            handleUsers();
        }

        function handleNewUserConnection() {
            geolocation.getLocation().then(function(data) {
                if (data) {
                    home.user.location.latitude = data.coords.latitude;
                    home.user.location.longitude = data.coords.longitude;
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
            //SocketFactory.on("users", function(user) {
            //    if (user) {
            //        home.usersLocationsList.push(user.location);
            //    }
            //});

            SocketFactory.on("usersLocations", function(usersLocations) {
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