const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 7000 });

sockets = [];
server.on('connection', function(socket) {
    sockets.push(socket);

    // When it receives a message, send it to every socket
    socket.on('message', function(msg) {
        sockets.forEach(s => s.send(msg));
        console.log(msg);
    });

    // When a socket is closed or disconnected, remove it from the array
    socket.on('close', function() {
        sockets = sockets.filter(s => s !== socket);
    });
});
