import React, { useState, useEffect, useRef } from 'react';
import socketClient from 'socket.io-client';
import './index.css';
//TODO: fix naming
export default function App() {
  const SERVER = "https://detla-chat-server.herokuapp.com/";
  const [status, setStatus] = useState("not connected");
  const [message, setMessage] = useState(null);
  const [socket] = useState(() => { return socketClient(SERVER) });
  const [name, setName] = useState("noname");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.on("connection", () => {
      setStatus("Connected");
      socket.on("message", (message) => {
        const chat = document.getElementById("messages");
        let mestext = JSON.parse(message).message;
        let username = JSON.parse(message).name;
        let username = "no-name"

        const mes = `
        <div class="mes-box">
          <div class="user-name">
            ${username}
          </div>

          <div class="user-text">
            ${mestext}
          </div>
        </div>
        `;
        
        chat.insertAdjacentHTML('afterbegin', mes);
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
      
    useEffect(() => {
    let name = prompt("SET YOUR NAME");
    setName(name);
  }, []);

  return (
    <>
      <div className="content">

        <div className="Left">
          <div className="acc">
            <div className="acc-header">
                <div>ACCOUNT: <h className="green-text" > {status} </h></div>
            </div>

            <div className="acc-content">
                <div>NAME:  <h className="green-text" > name</h></div>
            </div>

            <div className="acc-footer">
              <button className="log-btn">Log out/in</button>
            </div>
            
          </div>

          <div className="online">
            <div className="onl-header">
              <div>ONLINE (N)</div>
            </div>

            <div className="onl-content">
              <div className="onl-user">hard.tender.blade</div>
              <div className="onl-user">hard.tender.blade</div>
              <div className="onl-user">hard.tender.blade</div>
              <div className="onl-user">hard.tender.blade</div>
              <div className="onl-user">hard.tender.blade</div>
            </div>
          </div>

          <div className="changelog">
          <div className="chlog-header">
              <div>CHANGELOG</div>
          </div>

          <div className="chlog-content">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </div>

          </div>
        </div>


        <div className="Right">
          <div className="chat_box">
            <div className="all-mes" id="messages">

              <div class="mes-box">
                <div class="user-name">
                    
                </div>

                <div class="user-text">
                
                </div>
              </div>

            </div>
            <div ref={messagesEndRef}></div>
          </div>

          <div className="input_box">
            <form>
              <div className="in">
                <input type="text" id="message-input" className="inp"></input>
                <button className="btn" id="sender" onClick={(e) => {
                  e.preventDefault()
                  let messageInput = document.getElementById('message-input');
                  let isEmpty = true;
                  for (let i = 0; i < (messageInput.value).length; i++) {
                    if (messageInput.value[i] != " ") {
                      isEmpty = false;
                      break;
                    }
                  }
                  if (messageInput.value === null || messageInput.value === "" || isEmpty) return;
                  setMessage(messageInput.value);
                  messageInput.value = ""
                }}>Send</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
