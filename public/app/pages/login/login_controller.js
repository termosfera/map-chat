(function() {
    "use strict";

    angular.module("map-chat")
        .controller("LoginController", LoginController);

    LoginController.$inject = ["OauthFactory", "UserFactory", "$state", "SocketFactory"];

    function LoginController(OauthFactory, UserFactory, $state, SocketFactory) {
        var login = this;

        login.connect = connect;

        activate();

        function activate() {
            var user = JSON.parse( UserFactory.getUser() );
            if (user && user.isLogged) {
                return $state.go("home");
            }
            OauthFactory.initialize();
        }

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