(function() {
    "use strict";

    angular.module("map-chat")
        .controller("LoginController", LoginController);

    LoginController.$inject = ["OauthFactory", "UserFactory", "$state", "SocketFactory"];

    /**
     * @ngdoc controller
     * @name map-chat.controller:LoginController
     * @param {object} OauthFactory SocketFactory service
     * @param {object} UserFactory UserFactory service
     * @param {object} $state $state service
     * @description
     *
     * Login page Controller
     */
    function LoginController(OauthFactory, UserFactory, $state) {
        var login = this;

        login.connect = connect;

        activate();

        function activate() {
            var user = JSON.parse( UserFactory.retrieveUser() );
            if (user && user.isLogged) {
                return $state.go("home");
            }
            OauthFactory.initialize();
        }

        /**
         * @ngdoc function
         * @name map-chat.controller:LoginController#connect
         * @methodOf map-chat.controller:LoginController
         * @public
         * @description
         *
         * connects to twitter with oauth service on click
         */
        function connect() {

            // Call to oauth to connect with twitter...
            OauthFactory.connectTwitter()
                .then(function() {

                    OauthFactory.isReady().me()
                        .done(function(me) {

                            // When done use the user factory to store the user...
                            UserFactory.storeUser(me)
                                .then(function() {
                                    $state.go("home");
                            });

                    });
                })
                .catch(function(error) {
                    console.error(error);
                    OauthFactory.initialize();
                });
        }

    }

})();