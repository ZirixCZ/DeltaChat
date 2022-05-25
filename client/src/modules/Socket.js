import io from "socket.io-client";
const SERVER = "http://localhost:8080"
export default io(SERVER);
