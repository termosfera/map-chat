(function() {
    "use strict";

    angular.module("map-chat")
        .controller("LoginController", LoginController);

    LoginController.$inject = ["OauthFactory", "UserFactory", "$state"];

    function LoginController(OauthFactory, UserFactory, $state) {
        var login = this;

        login.connect = connect;

        activate();

        function activate() {
            var storedUser = JSON.parse( localStorage.getItem("map-chat.user") );
            if (storedUser && storedUser.isLogged) {
                return $state.go("home");
            }
            OauthFactory.initialize();
        }

        function connect() {
            OauthFactory.connectTwitter()
                .then(function() {
                    OauthFactory.isReady().me().done(function(me) {
                        if (me) {
                            UserFactory.setUser(me);
                            var user = UserFactory.getUser();
                            UserFactory.storeUser(user);
                            $state.go("home");
                        }
                    });
                })
                .catch(function(error) {
                    console.error(error);
                });
        }

    }

})();