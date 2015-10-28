(function() {
    "use strict";

    angular.module("map-chat")
        .controller("HomeController", HomeController);

    HomeController.$inject = ["SocketFactory", "geolocation"];

    function HomeController(SocketFactory, geolocation) {
        var home = this;
        home.user = {
            location: {
                latitude: 0,
                longitude: 0
            }
        };
        home.map = {};
        home.messageText = "";
        home.messagesList = [];

        home.sendMessage = sendMessage;

        activate();

        function activate() {
            home.map = {
                center: {
                    latitude: 45,
                    longitude: -73
                },
                zoom: 8
            };

            geolocation.getLocation().then(function(data) {
                if (data) {
                    home.user.location.latitude = data.coords.latitude;
                    home.user.location.longitude = data.coords.longitude;
                    SocketFactory.emit("userConnected", home.user);
                }
            });

            SocketFactory.on("messages", function(message) {
                console.log(message);
                if (home.messagesList.length >= 9) {
                    home.messagesList.shift();
                }
                home.messagesList.push(message);
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