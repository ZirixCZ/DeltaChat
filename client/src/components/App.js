import React, { useState, useEffect, useRef } from 'react';
import socketClient from 'socket.io-client';
import './index.css';

export default function App() {
  const SERVER = "https://detla-chat-server.herokuapp.com/";
  const [connected, setLabel] = useState('Not connected');
  const [message, setMessage] = useState(null);
  // TODO: Find more info about the evil below
  const [socket] = useState(() => { return socketClient(SERVER) });
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.on('connection', () => {
      setLabel('Connected');
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
      <div className="wrapper">
        <div className="status">
          <h1>{connected}</h1>
        </div>
        <div className="message-wrapper">
          <ul id="messages"></ul>
          <div ref={messagesEndRef}></div>
        </div>
        <div className="form-wrapper">
          <form className="sender-form">
            <input type="text" id="message-holder"></input>
            <button id="sender" onClick={(e) => {
              e.preventDefault()
              let message = document.getElementById('message-holder');
              let isThere = false;
              for (let i = 0; i < (message.value).length; i++) {
                if (message.value[i] != " ") {
                  isThere = true;
                  break
                }
              }
              if (message.value === null || message.value === "" || !isThere) return;
              setMessage(message.value);
              message.value = ""
            }}>Send</button>
          </form>
        </div>
      </div>
    </>
  )
}