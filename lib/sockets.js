var socketio = require('socket.io');
var io = {};
var users = [];

module.exports = {

    startSocketServer: function (app) {
        io = socketio.listen(app);

        io.sockets.on('connection', function(socket) {

            socket.on("userConnected", function(user) {
                if (user) {
                    users.push(user);
                    console.log(users);
                    io.sockets.emit("users", users);
                }
            });

            socket.on('newMessage', function(message) {
                if (message.text) {
                    io.sockets.emit('messages', message);
                }
            });

            socket.on('userLogout', function(user) {
                if (user) {
                    //console.log(user);
                    for (var i = 0; i < users.length; i++) {
                        if (users[i].location.id == user.location.id) {
                            users.splice(i, 1);
                            console.log(users);
                            io.sockets.emit("users", users);
                        }
                    }
                }
            });

            socket.on('disconnect', function () {

            });
        });
    }
};