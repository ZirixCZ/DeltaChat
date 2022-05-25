import React from 'react';
import mystyle from "../../ModuleCss/My.module.css";
import socket from "../../../../modules/Socket";
import UserDisconnected from "./UserDisconnected";
import UserConnected from "./UserConnected";

const NewMessage = (props) => {
    return (
        <div className={mystyle.Message}>
            <div className={mystyle.MsgName}>{props.name}</div>
            <div className={mystyle.MsgText}>{props.message}</div>
        </div>
    )
}

export default  NewMessage;
