import io from "socket.io-client";
const SERVER = "https://detla-chat-server.herokuapp.com/"
export default io(SERVER);
