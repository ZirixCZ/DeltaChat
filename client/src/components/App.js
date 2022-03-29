import React, { useState, useEffect, useRef } from 'react';
import socketClient from 'socket.io-client';
import './index.css';
//TODO: fix naming
export default function App() {
  const SERVER = "https://detla-chat-server.herokuapp.com/";
  const [status, setStatus] = useState('not connected');
  const [message, setMessage] = useState(null);
  const [socket] = useState(() => { return socketClient(SERVER) });
  const [name, setName] = useState("noname");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.on('connection', () => {
      setStatus('Connected');
      socket.on('message', (message) => {
        document.getElementById('messages')
          .appendChild(document.createElement('li'))
          .innerHTML = JSON.parse(message).name + " " + JSON.parse(message).message;
        messagesEndRef.current?.scrollIntoView();
      });
    });
    return () => {
      socket.off('connection');
    }
  }, [socket, name]);

  useEffect(() => {
    let name = prompt("SET YOUR NAME");
    setName(name);
  }, []);

  useEffect(() => {
    if (message === null) return;
    socket.emit('message', {
      name: name,
      message: message
    });
  }, [message]);

  return (
    <>
      <div className="wrapper">
        <div className="status">
          <h1>{status}</h1>
        </div>
        <div className="message-wrapper">
          <ul id="messages"></ul>
          <div ref={messagesEndRef}></div>
        </div>
        <div className="form-wrapper">
          <form className="sender-form">
            <input type="text" id="message-input"></input>
            <button id="sender" onClick={(e) => {
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
          </form>
        </div>
      </div>
    </>
  )
}