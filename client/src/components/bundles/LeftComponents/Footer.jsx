import React from "react";
import mystyle from "../ModuleCss/My.module.css";

const Footer = () => {
    return (
        <div className={mystyle.Footer}>
        <div className={mystyle.BetweenLine}></div>
        <div className={mystyle.PeopleContent}>
            <div className={mystyle.NumOfPeople}><span className={mystyle.BigSizeText}>Právě připojeno 10 lidí</span></div>
            <div className={mystyle.ListContainer}>
                <div className={mystyle.PeopleList}>● Some Jmeno</div>
                <div className={mystyle.PeopleList}>● Some Jmeno</div>
                <div className={mystyle.PeopleList}>● Some Jmeno</div>
                <div className={mystyle.PeopleList}>● Some Jmeno</div>
            </div>
        </div>
    </div>
)}

export default Footer;