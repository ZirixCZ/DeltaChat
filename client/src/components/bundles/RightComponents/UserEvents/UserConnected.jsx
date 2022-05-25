import React from 'react';
import mystyle from "../../ModuleCss/My.module.css";
import JImgIcon from '../../icons/JImgIcon.png';

const UserConnected = (props) => {
    return (
        <div className={mystyle.UserConnected}><img src={JImgIcon}></img> <span
            className={mystyle.MsgUserName}>{props.name}</span> se připojil.</div>
    )
}

export default UserConnected;
