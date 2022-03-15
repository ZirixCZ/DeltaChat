const http = require('http').createServer();
const io = require("socket.io")(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["header"],
        credentials: true
    }
});

const PORT = process.env.PORT || 8080;

http.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});

io.on('connection', (socket) => {
    console.log(`new client connected\nid:${socket.id}`);
    socket.emit('connection', null);
    socket.on('message', (message) => {
        console.log(JSON.stringify(message))
        io.emit('message', JSON.stringify(message));
    })
    socket.on('disconnect', () => {
        console.log('client has disconnected')
        io.emit("client had disconnected");
    })
})