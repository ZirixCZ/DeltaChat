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

    socket.on('message', (message) => {
        console.log(JSON.stringify(message))
        io.emit('message', JSON.stringify(message));
    })

    socket.on('addUser', (name) => {
        if (name === "Guest") return;
        connecteduserNames.push(name);
        removeNameFromArray();
        stateBroadcast();
        console.log(connecteduserNames);
        io.emit('addUser', JSON.stringify(name));
    })

    socket.on('deleteUser', (name) => {
        console.log(`erasing ${name}`)
        removeNameFromArray(name);
        console.log("BRUH NOT POSSIBLE")
        stateBroadcast();
        io.emit('deleteUser', name);
    })

    socket.on('disconnect', (reason) => {
        console.log(`client disconnected ${reason}`);
        io.sockets.emit("logMessage", "user has disconnected");
    })

})