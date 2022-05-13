import React, {useEffect, useRef, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import socketClient from "socket.io-client";
import style from "./App.module.css";

export default function App() {
    const SERVER = "https://detla-chat-server.herokuapp.com/";
    //const SERVER = "http://localhost:8080/";
    const [status, setStatus] = useState("not connected");
    const [temporaryMessage, setTemporaryMessage] = useState("");
    const [message, setMessage] = useState(null);
    const [socket] = useState(() => {
        return socketClient(SERVER);
    });
    const location = useLocation();
    const [onlineCount, setOnlineCount] = useState(0);
    const [name, setName] = useState(location.state?.name || "Guest");
    const [connectedUserNames, setConnectedUserNames] = useState([]);
    const messagesEndRef = useRef(null);
    const messagesRef = useRef(null);

    const displayCurrentName = () => {
        if (location.state?.name) {
            return location.state.name;
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
        return () => {
            socket.off("connection");
        };
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
            <main className={style.Container}>
                <aside className={style.LeftContainer}>
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
                                    {displayCurrentName()}
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
                </aside>

                <div className={style.RightContainer}>
                    <div className={style.Test}>
                        <div className={style.TestContent}>
                            <div className={style.TestName}>
                                {status} as:
                                <Link  onClick={() => {
                                    console.log("DELETETHEUSEWR" + name);
                                    socket.emit('deleteUser', name);
                                }} className={style.TextGreen} to="/Login">
                                    {displayCurrentName()}
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
                </div>
            </main>
        </>
    );
}
