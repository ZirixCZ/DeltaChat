import React, {useEffect, useRef, useState} from "react";
import mystyle from "../ModuleCss/My.module.css";
import UserConnected from "./UserEvents/UserConnected";
import UserDisconnected from "./UserEvents/UserDisconnected";
import NewMessage from "./UserEvents/NewMessage";
import socket from "../../../modules/Socket";

const ChatContent = (props) => {
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState(null);
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
            setCurrentMessage({
                message: false,
                name: JSON.parse(name),
                isOnConnected: true,
                isOnDisconnected: false,
            });
        });
        socket.on("deleteUser", (name) => {
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
        chatContent.current?.scrollIntoView();
    }, [currentMessage])

    return (
        <div className={mystyle.ChatContent}>
            {messages.map((message) => {
                if (message.isOnConnected) {
                    return <UserConnected name={message.name}/>
                } else if (message.isOnDisconnected) {
                    return <UserDisconnected name={message.name}/>
                }
                return <NewMessage message={message.message} name={message.name}/>
            })}
            <div ref={chatContent} className={mystyle.ChatBorder}></div>
        </div>
    )
}

export default ChatContent;