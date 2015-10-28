(function() {
    "use strict";

    angular.module("map-chat")
        .controller("LoginController", LoginController);

    LoginController.$inject = ["OauthFactory", "UserFactory", "$state"];

    function LoginController(OauthFactory, UserFactory, $state) {
        var login = this;
        var user;

        login.connect = connect;

        activate();

        function activate() {
            var isLogged = JSON.parse( localStorage.getItem("map-chat.user.isLogged") );
            if (isLogged) {
                $state.go("home");
            }
            user = UserFactory.getUser();
            OauthFactory.initialize();
        }

        function connect() {
            OauthFactory.connectTwitter()
                .then(function() {
                    OauthFactory.isReady().me().done(function(me) {
                        if (me) {
                            user.alias = me.alias;
                            user.isLogged = true;
                            user.location.id = me.id;
                            user.location.icon = me.avatar;
                            localStorage.setItem("map-chat.user.isLogged", JSON.stringify(user.isLogged));
                            console.log(user);
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