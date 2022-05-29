import React, {useEffect, useState} from "react";
import mystyle from "../ModuleCss/My.module.css";
import socket from "../../../modules/Socket";


const MessageInputBar = (props) => {
    const [message, setMessage] = useState(null);
    const [temporaryMessage, setTemporaryMessage] = useState("");
    const [width, setWindowWidth] = useState(0)

    useEffect(() => {
        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        return () =>
            window.removeEventListener("resize", updateDimensions);
        }, [])

    const updateDimensions = () => {
        const width = window.innerWidth
        setWindowWidth(width)
    }

    const btnStyle = {
        display: (width > 1028) ? 'none' : 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '10rem',
        backgroundColor: '#262337',
        borderRight: 'none',
        borderTop: 'none',
        borderBottom: 'none',
        borderLeft: '2px solid black'
    }

    console.log(btnStyle)

    useEffect(() => {
        if (message === null) return;
        socket.emit("message", {
            message: message,
            name: props.name,
        });
    }, [message]);

    return (
        <form className={mystyle.MessageInputBar}>
            <div style={{height: '100%', display: 'flex', flexDirection: 'row'}}>
                <input className={mystyle.Input} type="text" value={temporaryMessage} placeholder="Pošlete zprávu..."
                       onChange={(e) => {
                           setTemporaryMessage(e.target.value);
                       }}></input>
                <button style={btnStyle}
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
                >
                    <p style={{color: '#92909B', fontWeight: 'bold'}}>Odeslat</p>
                </button>
            </div>


        </form>
    )
}

export default MessageInputBar;