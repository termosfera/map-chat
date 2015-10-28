(function() {
    "use strict";

    angular.module("map-chat")
        .controller("HomeController", HomeController);

    HomeController.$inject = ["SocketFactory", "geolocation"];

    function HomeController(SocketFactory, geolocation) {
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

        home.sendMessage = sendMessage;

        activate();

        function activate() {
            getGeolocation();
            handleMessages();
            handleUsers();
        }

        function handleMessages() {
            SocketFactory.on("messages", function(message) {
                console.log(message);
                if (home.messagesList.length >= 9) {
                    home.messagesList.shift();
                }
                home.messagesList.push(message);
            });
        }

        function handleUsers() {
            SocketFactory.on("users", function(user) {
                if (user) {
                    console.log(user.location);
                    home.usersLocationsList.push(user.location);
                }
            });
        }

        function getGeolocation() {
            geolocation.getLocation().then(function(data) {
                if (data) {
                    home.user.location.latitude = data.coords.latitude;
                    home.user.location.longitude = data.coords.longitude;
                    SocketFactory.emit("userConnected", home.user);
                }
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