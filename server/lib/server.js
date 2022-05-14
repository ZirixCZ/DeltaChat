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
    connecteduserNames = connecteduserNames.filter((c, index) => {
        return connecteduserNames.indexOf(c) === index;
    })
}

const stateBroadcast = () => {
    io.sockets.emit('broadcast', {
        count: connecteduserNames.length,
        names: connecteduserNames
    });
}
io.on('connection', (socket) => {
    socket.emit('connection', null);
    console.log(`new client connected\nid:${socket.id}`);
    stateBroadcast();
    socket.on('message', (message) => {
        console.log(JSON.stringify(message))
        io.emit('message', JSON.stringify(message));
    })
    socket.on('addUser', (name) => {
        connecteduserNames.push(name);
        removeNameFromArray();
        stateBroadcast();
        console.log(connecteduserNames);
    })
    socket.on('deleteUser', (name) => {
        console.log(`erasing ${name}`)
        removeNameFromArray(name);
        stateBroadcast();
    })
    socket.on('disconnect', (reason) => {
        console.log(reason)
        console.log(`client disconnected ${reason}`);
        removeNameFromArray(reason);
        stateBroadcast();
        io.sockets.emit("logMessage", "user has disconnected");
    })
})