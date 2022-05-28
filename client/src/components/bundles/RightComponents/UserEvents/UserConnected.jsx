import React from 'react';
import mystyle from "../../ModuleCss/My.module.css";
import JImgIcon from '../../icons/JImgIcon.png';

const UserConnected = (props) => {
    return (
        <>
            {(props.name === "Guest") ? null : <div className={mystyle.UserConnected}><img src={JImgIcon}></img> <span
                className={mystyle.MsgUserName}>{props.name}</span> se připojil/a.</div> }

        </>
        )
}

export default UserConnected;
