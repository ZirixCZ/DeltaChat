import React, {useEffect, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import socketClient from "socket.io-client";
import mystyle from "./bundles/ModuleCss/My.module.css";
import LeftSide from "./bundles/LeftComponents/LeftSide";
import RightSide from "./bundles/RightComponents/RightSide";

export default function App() {
    const location = useLocation();
    const navigate = useNavigate();
    const [name, setName] = useState(location.state?.name || "Guest");

    window.onbeforeunload = (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        event.returnValue = 'unused string';
        socket.emit('deleteUser', name);
    }

    const SERVER = "https://detla-chat-server.herokuapp.com/";
    //const SERVER = "http://localhost:8080/";
    const [newlyWrittenMessage, setNewlyWrittenMessage] = useState(null);
    const [socket] = useState(() => {
        return socketClient(SERVER);
    });
    const [onlineCount, setOnlineCount] = useState(0);
    const [connectedUserNames, setConnectedUserNames] = useState([]);
    const isUnhooked = useRef();

    useEffect(() => {
        socket.on("broadcast", (data) => {
            setOnlineCount(parseInt(JSON.parse(JSON.stringify(data)).count));
            setConnectedUserNames(JSON.parse(JSON.stringify(data)).names);
        });
    }, [socket, isUnhooked]);

    useEffect(() => {
        if (name === null) return;
        socket.emit('addUser', name);
    }, [name])

    const props = {
        name: name,
        count: onlineCount,
        usernames: connectedUserNames,
        newMessage: newlyWrittenMessage,
    }
    return (
        <>
            <main className={mystyle.Wrapper}>
                <LeftSide properties={props}/>
                <RightSide name={props.name} message={props.newMessage}/>
            </main>
        </>
    );
}
