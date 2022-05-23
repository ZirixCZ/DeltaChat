import React, {useEffect, useRef, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import socketClient from "socket.io-client";
import mystyle from "./bundles/ModuleCss/My.module.css";
import LeftSide from "./bundles/LeftComponents/LeftSide";
import RightSide from "./bundles/RightComponents/RightSide";

export default function App() {
    const location = useLocation();
    const navigate = useNavigate();
    const [name, setName] = useState(location.state?.name || "Guest");
/*    useEffect(() => {
        console.log(name)
    }, [name])*/
/*    const changeNameState = () => {
        if (location.state?.name) {
            setName(location.state?.name);
        }
    }
    let tName = name;*/

/*    useEffect(() => {
        if (name === null || name === undefined) return
        if (name) {
            tName = name;
        }
    }, [name])*/
/*    window.addEventListener('beforeunload', (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        event.returnValue = 'unused string';
        changeNameState();
        console.log(`dELETING USER ${displayCurrentName(tName)}`)
        socket.emit('deleteUser', displayCurrentName(tName));
    });*/
    window.onbeforeunload = (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        event.returnValue = 'unused string';
        console.log(`dELETING USER ${name}`)
        socket.emit('deleteUser', name);
    }
    const SERVER = "https://detla-chat-server.herokuapp.com/";
    //const SERVER = "http://localhost:8080/";
    const [status, setStatus] = useState("not connected");
    const [temporaryMessage, setTemporaryMessage] = useState("");
    const [message, setMessage] = useState(null);
    const [socket] = useState(() => {
        return socketClient(SERVER);
    });
    const [onlineCount, setOnlineCount] = useState(0);
    const [connectedUserNames, setConnectedUserNames] = useState([]);
    const messagesEndRef = useRef(null);
    const messagesRef = useRef(null);
/*    useEffect(() => {
        if (location.state?.name === null) return;
        setName(location.state?.name);
    }, [location.state?.name])*/

/*    useEffect(() => {
        const unloadCallback = (event) => {
            event.preventDefault();
            event.stopImmediatePropagation();
            event.returnValue = "";
            console.log(`dELETING USER ${name}`)
            socket.emit('deleteUser', name);
            return "";
        };

        window.addEventListener("beforeunload", unloadCallback);
        return () => window.removeEventListener("beforeunload", unloadCallback);
    }, []);*/

/*    useEffect(() => {
        setName(location.state?.name);
    }, location.state?.name)

    window.addEventListener('beforeunload',  (e) => {
        console.log(`dELETING USER ${name}`)
        socket.emit('deleteUser', name);
        for (let i = 0; i < 500000000; i++) { }
        for (let i = 0; i < 500000000; i++) { }
        for (let i = 0; i < 500000000; i++) { }
        for (let i = 0; i < 500000000; i++) { }
        for (let i = 0; i < 500000000; i++) { }
        return undefined;
    });*/
/*    const handleTabClosing = () => {
        socket.emit('deleteUser', name);
    }

    const alertUser = (event) => {
        event.preventDefault()
        event.returnValue = ''
    }
    useEffect(() => {
        window.addEventListener('beforeunload', alertUser)
        window.addEventListener('unload', handleTabClosing)
        return () => {
            window.removeEventListener('beforeunload', alertUser)
            window.removeEventListener('unload', handleTabClosing)
        }
    }, [])*/

    const displayCurrentName = (tName) => {
        console.log(tName);
        if (name) {
            return name;
        }
        return "Guest";
    };

    useEffect(() => {
        socket.on("connection", (usernames) => {
            setStatus("Connected");
            socket.on("broadcast", (data) => {
                console.log("HELLO")
                setOnlineCount(parseInt(JSON.parse(JSON.stringify(data)).count));
                console.log(data);
                setConnectedUserNames(JSON.parse(JSON.stringify(data)).names);

            });
            socket.on("logMessage", (logMessage) => {
                console.log(logMessage);
            })
            socket.on("message", (message) => {
                const chat = messagesRef.current;
                chat.insertAdjacentHTML(
                    "afterbegin",
                    `
        <div className={style.MessageContainer}>
          <h3 className={style.UserName} style={{ color: "red" }}>
            ${JSON.parse(message).name}
          </h3>

          <h4 className={style.UserText}>
            ${JSON.parse(message).message}
          </h4>
        </div>
        `
                );
                messagesEndRef.current?.scrollIntoView();
            });
        });
    }, [socket]);

    useEffect(() => {
        if (name === null) return;
        socket.emit('addUser', name);
    }, [name])

    useEffect(() => {
        if (message === null) return;
        socket.emit("message", {
            message: message,
            name: name,
        });
    }, [message]);

    return (
        <>
            <main className={mystyle.Wrapper}>
                <LeftSide/>
                <RightSide/>


                {/* <aside className={style.LeftContainer}>
                    <div className={style.AccountContainer}>
                        <div className={style.AccountHeader}>
                            <div>
                                <h4 className={style.GreenText}> {status} </h4>
                            </div>
                        </div>

                        <div className={style.AccountContent}>
                            <div>
                                <Link className={style.TextGreen} to="/Login" onClick={() => {
                                    console.log("DELETETHEUSEWR" + name);
                                    socket.emit('deleteUser', name);
                                }}>
                                    {name}
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className={style.OnlineContainer}>
                        <div className={style.OnlineHeader}>
                            <div>ONLINE ({onlineCount})</div>
                        </div>

                        <div className={style.OnlineContent}>
                          {connectedUserNames.map(name => <p className={style.OnlineParagraph}>{name}</p>)}
                        </div>
                    </div>

                    <div className={style.ChangelogContainer}>
                        <div className={style.ChangelogWrapper}>
                            <div>CHANGELOG</div>
                        </div>

                        <div className={style.ChangelogContent}>
                            <ul>
                                <li>Added overview of connected users</li>
                                <li>Fixed connected user count</li>
                            </ul>
                        </div>
                    </div>
                </aside> */}

                {/* <div className={style.RightContainer}>
                    <div className={style.Test}>
                        <div className={style.TestContent}>
                            <div className={style.TestName}>
                                {status} as:
                                <Link  onClick={() => {
                                    console.log("DELETETHEUSEWR" + name);
                                    socket.emit('deleteUser', name);
                                }} className={style.TextGreen} to="/Login">
                                    {name}
                                </Link>

                            </div>
                            <div className={style.TestOnline}>
                                <div>Online: {onlineCount}</div>
                            </div>
                        </div>

                    </div>
                    <div className={style.ChatBox}>
                        <div className={style.Messages} ref={messagesRef}></div>
                        <div ref={messagesEndRef}></div>
                    </div>

                    <div className={style.InputBox}>
                        <form>
                            <div className={style.In}>
                                <input type="text" value={temporaryMessage} id={style.messageInput} onChange={(e) => {
                                    setTemporaryMessage(e.target.value);
                                }}></input>
                                <button
                                    className={style.sender}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        //let messageInput = document.getElementById("message-input");
                                        let isEmpty = true;
                                        if (temporaryMessage === null || temporaryMessage === "") {
                                            return;
                                        }
                                        for (let i = 0; i < temporaryMessage.length; i++) {
                                            if (temporaryMessage[i] !== " ") {
                                                isEmpty = false;
                                                break;
                                            }
                                        }
                                        if (isEmpty)
                                            return;
                                        setMessage(temporaryMessage);
                                        setTemporaryMessage("");

                                    }}
                                >
                                    Send
                                </button>
                            </div>
                        </form>
                    </div>
                </div> */}
            </main>
        </>
    );
}
