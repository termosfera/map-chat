var socketio = require('socket.io');
var io = {};

module.exports = {

    startSocketServer: function (app) {
        io = socketio.listen(app);

        io.sockets.on('connection', function (socket) {

            socket.on('newMessage', function (message) {
                console.log(message);
                if (message.text) {
                    io.sockets.emit('messages', message);
                }
            });

            socket.on('disconnect', function () {

            });
        });
    }
};