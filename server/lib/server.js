const http = require('http').createServer();
const io = require("socket.io")(http, {
    cors: {
        //origin: "http://localhost:3000", <- for development, note: IT SHOULDN'T END WITH "/" !!!
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["header"],
        credentials: true
    }
});

const PORT = process.env.PORT || 8080;
let connectedUserCount = 0;

http.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});

io.on('connection', (socket) => {
    connectedUserCount++;
    console.log(`new client connected\nid:${socket.id}`);
    socket.emit('connection', null);
    io.sockets.emit('broadcast', {
        count: connectedUserCount,
    });
    socket.on('message', (message) => {
        console.log(JSON.stringify(message))
        io.emit('message', JSON.stringify(message));
    })
    socket.on('disconnect', () => {
        connectedUserCount--;
        console.log('client has disconnected')
        io.sockets.emit('broadcast', {
            count: connectedUserCount,
        });
        io.emit("client has disconnected");
    })
})