import React from 'react';
import mystyle from "../../ModuleCss/My.module.css";

const NewMessage = (props) => {
    return (
        <div className={mystyle.Message}>
            <div className={mystyle.MsgName}>{props.properties.name}</div>
            <div className={mystyle.MsgText}>{props.properties.message}</div>
        </div>
    )
}

export default  NewMessage;
