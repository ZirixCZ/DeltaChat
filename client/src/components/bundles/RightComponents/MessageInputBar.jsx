import React, {useEffect, useState} from "react";
import mystyle from "../ModuleCss/My.module.css";
import socket from "../../../modules/Socket";


const MessageInputBar = (props) => {
    const [message, setMessage] = useState(null);
    const [temporaryMessage, setTemporaryMessage] = useState("");

    useEffect(() => {
        if (message === null) return;
        socket.emit("message", {
            message: message,
            name: props.name,
        });
    }, [message]);

    return (
        <form className={mystyle.MessageInputBar}>
            <input className={mystyle.Input} type="text" value={temporaryMessage} placeholder="Pošlete zprávu..."
                   onChange={(e) => {
                       setTemporaryMessage(e.target.value);
                   }}></input>
            <button style={{display: 'none'}}
                    onClick={(e) => {
                        e.preventDefault();
                        //let messageInput = document.getElementById("message-input");
                        let isEmpty = true;
                        if (temporaryMessage === null || temporaryMessage === "") {
                            return;
                        }
                        for (let i = 0; i < temporaryMessage.length; i++) {
                            if (temporaryMessage[i] !== " ") {
                                isEmpty = false;
                                break;
                            }
                        }
                        if (isEmpty)
                            return;
                        setMessage(temporaryMessage);
                        setTemporaryMessage("");

                    }}
            ></button>
        </form>
    )
}

export default MessageInputBar;