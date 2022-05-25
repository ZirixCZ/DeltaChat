import React from "react";
import mystyle from "../ModuleCss/My.module.css";
import LImgIcon from '../icons/LImgIcon.png';
import JImgIcon from '../icons/JImgIcon.png';
import NavBar from "./NavBar";
import ChatContent from "./ChatContent";
import MessageInputBar from "./MessageInputBar";

const RightSide = (props) => {
    return (
        <div className={mystyle.RightSideBar}>
            <NavBar properties={props.properties}/>
            <ChatContent name={props.name} message={props.message}/>
            <MessageInputBar name={props.name}/>
        </div>
)}

export default RightSide;