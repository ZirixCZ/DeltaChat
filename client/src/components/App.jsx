import React, { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import socketClient from "socket.io-client";
import "./index.css";

export default function App() {
  const SERVER = "https://detla-chat-server.herokuapp.com/";
  const [status, setStatus] = useState("not connected");
  const [message, setMessage] = useState(null);
  const [socket] = useState(() => {
    return socketClient(SERVER);
  });
  const location = useLocation();
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
      socket.on("message", (message) => {
        const chat = document.getElementById("messages");
        chat.insertAdjacentHTML(
          "afterbegin",
          `
        <div class="message-container">
          <div class="user-name">
            ${JSON.parse(message).name}
          </div>

          <div class="user-text">
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
  }, [socket, name]);

  useEffect(() => {
    if (message === null) return;
    socket.emit("message", {
      message: message,
      name: name,
    });
  }, [message]);

  // useEffect(() => {
  //   let name = prompt("SET YOUR NAME");
  //   setName(name);
  // }, []);

  return (
    <>
      <main className="container">
        <aside className="left-container">
          <div className="account-container">
            <div className="account-header">
              <div>
                <h4 className="green-text"> {status} </h4>
              </div>
            </div>

            <div className="account-content">
              <div>
                <Link className="text-green" to="/Login">
                  {displayCurrentName()}
                </Link>
              </div>
            </div>

            {/* <div className="account-footer">
              <button className="log-btn">Log out/in</button>
            </div> */}
          </div>

          <div className="online-container">
            <div className="online-header">
              <div>ONLINE (N)</div>
            </div>

            <div className="online-content">
              <div className="onl-user">hard.tender.blade</div>
              <div className="onl-user">hard.tender.blade</div>
              <div className="onl-user">hard.tender.blade</div>
              <div className="onl-user">hard.tender.blade</div>
              <div className="onl-user">hard.tender.blade</div>
            </div>
          </div>

          <div className="changelog-container">
            <div className="changelog-wrapper">
              <div>CHANGELOG</div>
            </div>

            <div className="changelog-content">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </div>
          </div>
        </aside>

        <div className="right-container">
          <div className="chat-box">
            <div id="messages">
              {/* <div class="message-box">
                <div class="user-name"></div>

                <div class="user-text"></div>
              </div> */}
            </div>
            <div ref={messagesEndRef}></div>
          </div>

          <div className="input_box">
            <form>
              <div className="in">
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
