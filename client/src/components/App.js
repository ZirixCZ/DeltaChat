import React, { useState, useEffect, useRef } from 'react';
import socketClient from 'socket.io-client';
import './index.css';

export default function App() {
  const SERVER = "https://detla-chat-server.herokuapp.com/";
  const [status, setStatus] = useState('not connected');
  const [message, setMessage] = useState(null);
  const [socket] = useState(() => { return socketClient(SERVER) });
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.on('connection', () => {
      setStatus('Connected');
      socket.on('message', (message) => {
        document.getElementById('messages')
          .appendChild(document.createElement('li'))
          .innerHTML = JSON.parse(message).message;
        messagesEndRef.current?.scrollIntoView();
      });
    });
    return () => {
      socket.off('connection');
    }
  }, [socket]);

  useEffect(() => {
    if (message === null) return;
    socket.emit('message', {
      message: message
    });
  }, [message]);

  

  return (
    <>
<div className="content">

  <div className="Left">
    <div className="acc"><h1>{status}</h1></div>
    <div className="online">online</div>
    <div className="changelog">change</div>
  </div>
    

  <div className="Right">
        <div className="chat_box">
          <ul id="messages"></ul>
          <div ref={messagesEndRef}></div>
        </div>

        <div className="input_box">
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
        </div>
  </div>
</div>


    </>
  )
}