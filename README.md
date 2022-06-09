# ![6](https://user-images.githubusercontent.com/49836430/172929195-0b5af3bc-d47a-47c4-9210-665fa1a8c7da.png) DeltaChat

Real-time IRC like chatting application created with React, Node.js and websockets.

## Commands
To start the application on your local machine follow the steps below.

#### Clone the repository
```
git clone https://github.com/ZirixCZ/DeltaChat
```

#### Navigate into /client
```
cd /client
```

#### Install required packages
```
npm install
```

#### Start the development server
```
npm run start
```

## Configuration
To change the socket.io receiving server navigate into `client/src/modules/Socket.js` and change the `SERVER` constant.
```
const SERVER = "https://my-server.com/"
```

To start the server, navigate into `/server` and install all packages with `npm install`. 

Then change the origin in `server/lib/server.js` to the address of your client.
