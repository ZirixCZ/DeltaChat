import React, { useState, useEffect, createElement, useRef } from 'react';
import socketClient, { io, Socket } from 'socket.io-client'
import './index.css'

export default function App() {
  const [connected, setLabel] = useState('Not connected');
  const [message, setMessage] = useState('empty');
  const SERVER = "https://detla-chat-server.herokuapp.com/";
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const socket = socketClient(SERVER);
    socket.on('connection', () => {
      setLabel('Connected');
      socket.on('message', (message) => {
        messagesEndRef.current?.scrollIntoView();
        let li = document.createElement('li');
        document.getElementById('messages').appendChild(li).innerHTML = JSON.parse(message).message;
      })
    });

    return () => {
      socket.off('connection')
    }
  }, [])
  
  return (
    <>
      <div class="wrapper">
        <div class="status">
          <h1>{connected}</h1>
        </div>
        <div class="message-wrapper">
          <ul id="messages"></ul>
          <div ref={messagesEndRef}></div>
        </div>
        <div class="form-wrapper">
          <form class="sender-form">
            <input type="text" id="message-holder"></input>
            <button id="sender" onClick={(e) => {
              e.preventDefault()
              let message = document.getElementById('message-holder');
              let isThere = false;
              for (let i = 0; i < (message.value).length; i++) {
                if (message.value[i] != " ") {
                  isThere = true;
                }
              }
              if (message.value == null || message.value == "" || !isThere) {
                return;
              }
              else {
                setMessage(message.value);
                socketClient(SERVER).emit('message', {
                  message: message.value
                })
                message.value = ""
              }
            }}>Send</button>
          </form>
        </div>
      </div>
    </>
  )
}