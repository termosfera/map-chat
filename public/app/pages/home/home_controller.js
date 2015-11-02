(function () {
    "use strict";

    angular.module("map-chat")
        .controller("HomeController", HomeController);

    HomeController.$inject = ["SocketFactory", "UserFactory", "$state"];

    /**
     * @ngdoc controller
     * @name map-chat.controller:HomeController
     * @param {object} SocketFactory SocketFactory service
     * @param {object} UserFactory UserFactory service
     * @param {object} $state $state service
     * @description
     *
     * Home page Controller
     */
    function HomeController(SocketFactory, UserFactory, $state) {
        // Attributes
        var home = this;
        home.user = {};
        home.map = {};
        home.messageText = "";
        home.messagesList = [];
        home.usersLocationsList = [];

        // Public functions
        home.sendMessage = sendMessage;
        home.logout = logout;

        activate();

        /**
         * Initial page logic
         */
        function activate() {
            // Check if user is logged, if not redirect to login
            home.user = JSON.parse(UserFactory.retrieveUser());
            if (!home.user || !home.user.isLogged) {
                return $state.go("login");
            }

            // Emit that a new user is connected...
            SocketFactory.emit("userConnected", home.user);

            // Set initial map position
            home.map = {
                center: {
                    latitude: home.user.location.latitude || 0,
                    longitude: home.user.location.longitude || 0
                },
                zoom: 9
            };

            handleMessages();
            handleUsers();
        }

        /**
         * Messages handler
         */
        function handleMessages() {
            SocketFactory.on("messages", function (message) {
                if (home.messagesList.length >= 6) {
                    home.messagesList.shift();
                }
                home.messagesList.push(message);
            });
        }

        /**
         * Connected users handler
         */
        function handleUsers() {
            SocketFactory.on("users", function (users) {
                var usersLocations = [];
                for (var i = 0; i < users.length; i++) {
                    usersLocations.push(users[i].location);
                }
                home.usersLocationsList = usersLocations;
            });
        }

        /**
         * @ngdoc function
         * @name map-chat.controller:HomeController#sendMessage
         * @methodOf map-chat.controller:HomeController
         * @public
         * @description
         *
         * Sends message on click
         */
        function sendMessage() {
            var message = {
                author: home.user.alias,
                text: home.messageText,
                time: new Date()
            };
            home.messageText = "";
            SocketFactory.emit("newMessage", message);
        }

        /**
         * @ngdoc function
         * @name map-chat.controller:HomeController#logout
         * @methodOf map-chat.controller:HomeController
         * @public
         * @description
         *
         * Logs out on click
         */
        function logout() {
            localStorage.removeItem("map-chat.user");
            return $state.go("login");
        }

    }

})();