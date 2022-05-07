import React, { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import socketClient from "socket.io-client";
import style from "./App.module.css";

export default function App() {
  const SERVER = "https://detla-chat-server.herokuapp.com/";
  //const SERVER = "http://localhost:8080/";
  const [status, setStatus] = useState("not connected");
  const [message, setMessage] = useState(null);
  const [socket] = useState(() => {
    return socketClient(SERVER);
  });
  const location = useLocation();
  const [onlineCount, setOnlineCount] = useState(1);
  const [name, setName] = useState(location.state?.name || "Guest");
  const messagesEndRef = useRef(null);

  const displayCurrentName = () => {
    if (location.state?.name) {
      return location.state.name;
    }
    return "Guest";
  };

  useEffect(() => {
    socket.on("connection", () => {
      setStatus("Connected");
      socket.on("broadcast", (data) => {
        setOnlineCount(parseInt(JSON.parse(JSON.stringify(data)).count));
      });
      socket.on("message", (message) => {
        const chat = document.getElementById("messages");
        chat.insertAdjacentHTML(
          "afterbegin",
          `
        <div class={style.MessageContainer}>
          <div class={style.UserName}>
            ${JSON.parse(message).name}
          </div>

          <div class={style.UserText}>
            ${JSON.parse(message).message}
          </div>
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
    if (message === null) return;
    socket.emit("message", {
      message: message,
      name: name,
    });
  }, [message]);

  return (
    <>
      <main className={style.Container}>
        <aside className={style.CeftContainer}>
          <div className={style.AccountContainer}>
            <div className={style.AccountHeader}>
              <div>
                <h4 className={style.GreenText}> {status} </h4>
              </div>
            </div>

            <div className={style.AccountContent}>
              <div>
                <Link className={style.TextGreen} to="/Login">
                  {displayCurrentName()}
                </Link>
              </div>
            </div>

            {/* <div className={style.AccountFooter}>
              <button className={style.LogBtn}>Log out/in</button>
            </div> */}
          </div>

          <div className={style.OnlineContainer}>
            <div className={style.OnlineHeader}>
              <div>ONLINE ({onlineCount})</div>
            </div>

            <div className={style.OnlineContent}>
              <div className={style.OnlUser}>hard.tender.blade</div>
              <div className={style.OnlUser}>hard.tender.blade</div>
              <div className={style.OnlUser}>hard.tender.blade</div>
              <div className={style.OnlUser}>hard.tender.blade</div>
              <div className={style.OnlUser}>hard.tender.blade</div>
            </div>
          </div>

          <div className={style.ChangelogContainer}>
            <div className={style.ChangelogWrapper}>
              <div>CHANGELOG</div>
            </div>

            <div className={style.ChangelogContent}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </div>
          </div>
        </aside>

        <div className={style.RightContainer}>
          <div className={style.Test}>
            <div className={style.TestContent}>
              <div className={style.TestName}>
                  {status} like: 
                  <Link className={style.TextGreen} to="/Login">
                    {displayCurrentName()}
                  </Link>
              </div>
              <div className={style.TestOnline}>
                  <div>Online: {onlineCount}</div>
              </div> 
            </div>

          </div>
          <div className={style.ChatBox}>
            <div id="messages">
              {/* <div class="MessageBox">
                <div class="UserName"></div>

                <div class="UserText"></div>
              </div> */}
            </div>
            <div ref={messagesEndRef}></div>
          </div>

          <div className={style.InputBox}>
            <form>
              <div className={style.In}>
                <input type="text" id="message-input"></input>
                <button
                  id="sender"
                  onClick={(e) => {
                    e.preventDefault();
                    let messageInput = document.getElementById("message-input");
                    let isEmpty = true;
                    for (let i = 0; i < messageInput.value.length; i++) {
                      if (messageInput.value[i] != " ") {
                        isEmpty = false;
                        break;
                      }
                    }
                    if (
                      messageInput.value === null ||
                      messageInput.value === "" ||
                      isEmpty
                    )
                      return;
                    setMessage(messageInput.value);
                    messageInput.value = "";
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
