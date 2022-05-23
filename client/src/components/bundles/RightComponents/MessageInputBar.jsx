import React from "react";
import mystyle from "../ModuleCss/My.module.css";
import LImgIcon from '../icons/LImgIcon.png';
import JImgIcon from '../icons/JImgIcon.png';

const MessageInputBar = () => {
    return (
        <div className={mystyle.MessageInputBar}>
            <input className={mystyle.Input} type="text" placeholder="Pošlete zprávu..."></input>
        </div>
)}

export default MessageInputBar;