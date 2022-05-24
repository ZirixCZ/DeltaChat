import React from "react";
import mystyle from "../ModuleCss/My.module.css";
import User from './User';

const Footer = (props) => {
    console.log(props.properties.usernames)
    return (
        <div className={mystyle.Footer}>
        <div className={mystyle.BetweenLine}></div>
        <div className={mystyle.PeopleContent}>
            <div className={mystyle.NumOfPeople}><span className={mystyle.BigSizeText}>Právě připojeno {props.properties.count} lidí</span></div>
            <div className={mystyle.ListContainer}>
                {props.properties.usernames.map((name) => {return (<User name={name}/>)})}
            </div>
        </div>
    </div>
)}

export default Footer;