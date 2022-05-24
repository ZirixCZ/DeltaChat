import React, {useEffect, useRef} from "react";
import mystyle from "../ModuleCss/My.module.css";
import UserConnected from "./UserEvents/UserConnected";
import UserDisconnected from "./UserEvents/UserDisconnected";

const ChatContent = (props) => {
    const chatContent = useRef();

    const properties = {
        message: props.messages,
        name: props.name,

    }

    useEffect(() => {
        if (props.message === null || props.message === undefined) return;
        console.log(`name: ${props.name}, message: ${props.message}`)
        const chat = chatContent.current;
        chat.insertAdjacentHTML(
            "afterbegin",
            `<div className={mystyle.Message}>
            <UserConnected props={properties}/>
        </div>`
        );
        chatContent.current?.scrollIntoView();
    }, [props.message])

    return (
        <div className={mystyle.ChatContent} ref={chatContent}>
            <UserConnected/>
            <UserDisconnected/>

        </div>
    )
}

export default ChatContent;