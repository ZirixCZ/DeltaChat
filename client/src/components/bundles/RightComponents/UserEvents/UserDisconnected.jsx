import React from 'react';
import mystyle from "../../ModuleCss/My.module.css";
import LImgIcon from '../../icons/LImgIcon.png';

const UserDisconnected = (props) => {
    return (
        <div className={mystyle.UserDisConnected}><img src={LImgIcon}></img> <span
            className={mystyle.MsgUserName}>{props.name}</span> se odpojil.</div>
    )
}

export default UserDisconnected;
