import React, { useState, useEffect, createElement } from 'react';
import socketClient, { io, Socket } from 'socket.io-client'

export default function App() {
  const [connected, setLabel] = useState('not connected');
  const [message, setMessage] = useState('empty');
  const SERVER = "https://detla-chat-server.herokuapp.com/";


  useEffect(() => {
    const socket = socketClient(SERVER);
    socket.on('connection', () => {
      setLabel('connected');
      socket.on('message', (message) => {
          let li = document.createElement('li');
          document.getElementById('messages').appendChild(li).innerHTML = message;
      })
    });

    return () => {
      socket.off('connection')
    }
  }, [])
  

  return (
    <>
      <h1>{connected}</h1>
      <form>
        <input type="text" id="message-holder"></input>
        <button id="sender" onClick={(e) => {
          e.preventDefault()
          let message = document.getElementById('message-holder');
          setMessage(message.value);
          socketClient(SERVER).emit('message', {
            message: message.value
          })
          message.value = ""
        }}>Send</button>
      </form>
      <ul id="messages">

      </ul>
    </>
  )
}