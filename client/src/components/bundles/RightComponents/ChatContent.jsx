import React, {useEffect, useRef, useState} from "react";
import mystyle from "../ModuleCss/My.module.css";
import UserConnected from "./UserEvents/UserConnected";
import UserDisconnected from "./UserEvents/UserDisconnected";
import NewMessage from "./UserEvents/NewMessage";
import socket from "../../../modules/Socket";

const ChatContent = (props) => {
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState(null);
    const [newConnectedUser, setNewConnectedUser] = useState();
    const [newDisconnectedUser, setNewDisconnectedUser] = useState();
    const chatContent = useRef();

    useEffect(() => {
        socket.on("message", (message) => {
            setCurrentMessage({
                message: JSON.parse(message).message,
                name: JSON.parse(message).name,
                isOnConnected: false,
                isOnDisconnected: false,
            });
        });
        socket.on("addUser", (name) => {
            setNewConnectedUser(name)
            setCurrentMessage({
                message: false,
                name: JSON.parse(name),
                isOnConnected: true,
                isOnDisconnected: false,
            });
        });
        socket.on("deleteUser", (name) => {
            setNewDisconnectedUser(name)
            console.log(name)
            setCurrentMessage({
                message: false,
                name: name,
                isOnConnected: false,
                isOnDisconnected: true,
            });
        })
    }, [socket])

    useEffect(() => {
        if (!currentMessage) return;

        let messageArray = [...messages];
        console.log(currentMessage)
        messageArray.push(currentMessage)
        setMessages(messageArray);
    }, [currentMessage])

    useEffect(() => {
        if (newConnectedUser === null || newConnectedUser === undefined) return;
        console.log(`User has connected ${newConnectedUser}`)
    }, [newConnectedUser])

    useEffect(() => {
        if (newDisconnectedUser === null || newDisconnectedUser === undefined) return;
        console.log(`User has disconnected ${newDisconnectedUser}`)
    }, [newDisconnectedUser])

    return (
        <div className={mystyle.ChatContent} ref={chatContent}>
            {messages.map((message) => {
                if (message.isOnConnected) {
                    return <UserConnected name={message.name}/>
                } else if (message.isOnDisconnected) {
                    return <UserDisconnected name={message.name}/>
                }
                return <NewMessage message={message.message} name={message.name}/>
            })}
        </div>
    )
}

export default ChatContent;