import React from "react";
import mystyle from "../ModuleCss/My.module.css";
import LImgIcon from '../icons/LImgIcon.png';
import JImgIcon from '../icons/JImgIcon.png';
import Header from "./Header";
import ChatContent from "./ChatContent";
import MessageInputBar from "./MessageInputBar";

const RightSide = () => {
    return (
        <div className={mystyle.RightSideBar}>
            <Header/>
            <ChatContent/>
            <MessageInputBar/>
        </div>
)}

export default RightSide;