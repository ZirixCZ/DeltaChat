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
                message: JSON.stringify(JSON.parse(message).message),
                name: JSON.stringify(JSON.parse(message).name)
            });
        });
        socket.on("addUser", (name) => {
            setNewConnectedUser(name)
        });
        socket.on("deleteUser", (name) => {
            setNewDisconnectedUser(name)
        })
    }, [socket])

    useEffect(() => {
        if (!currentMessage) return;

        let messageArray = [...messages];
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
            <UserConnected/>
            <UserDisconnected/>
            {messages.map((message) => {
                return <NewMessage message={message.message} name={message.name}/>
            })}
        </div>
    )
}

export default ChatContent;