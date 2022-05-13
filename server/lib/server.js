const http = require('http').createServer();
const io = require("socket.io")(http, {
    cors: {
        //origin: "http://localhost:3000",
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["header"],
        credentials: true
    }
});
const PORT = process.env.PORT || 8080;
let connectedUserCount = 0;
let connecteduserNames = [];

http.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});

const removeNameFromArray = (nameToRemove) => {
    for (let index = 0; index < connecteduserNames.length; index++) {
        if (nameToRemove === connecteduserNames[index]) {
            connecteduserNames.splice(index, 1);
        }
    }
}

const stateBroadcast = () => {
    io.sockets.emit('broadcast', {
        count: connectedUserCount,
        names: connecteduserNames
    });
}

io.on('connection', (socket) => {
    connectedUserCount++;
    socket.emit('connection', null);
    console.log(`new client connected\nid:${socket.id}`);
    stateBroadcast();
    socket.on('message', (message) => {
        console.log(JSON.stringify(message))
        io.emit('message', JSON.stringify(message));
    })
    socket.on('addUser', (name) => {
        connecteduserNames.push(name);
        console.log(connecteduserNames);
        stateBroadcast();
    })
    socket.on('deleteUser', (name) => {
        connectedUserCount--;
        removeNameFromArray(name);
        console.log(name);
        stateBroadcast();
    })
    socket.on('disconnect', () => {
        console.log('client has disconnected');
        stateBroadcast();
        io.emit("client has disconnected");
    })
})