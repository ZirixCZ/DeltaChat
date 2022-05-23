import React from "react";
import mystyle from "../ModuleCss/My.module.css";
import LImgIcon from '../icons/LImgIcon.png';
import JImgIcon from '../icons/JImgIcon.png';

const ChatContent = () => {
    return (
        <div className={mystyle.ChatContent}>
                <div className={mystyle.UserConnected}> <img src={JImgIcon}></img> <span className={mystyle.MsgUserName}>Jmeno </span> se připojil.</div>

                <div className={mystyle.Message}>
                    <div className={mystyle.MsgName}>Denys</div>
                    <div className={mystyle.MsgText}>Hi i from Delta ss!</div>
                </div>

                <div className={mystyle.UserDisConnected}> <img src={LImgIcon}></img> <span className={mystyle.MsgUserName}>Jmeno </span> se odpojil.</div>

        </div>
)}

export default ChatContent;