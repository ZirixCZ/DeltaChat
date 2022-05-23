import React from "react";
import mystyle from "../ModuleCss/My.module.css";
import LImgIcon from '../icons/LImgIcon.png';
import JImgIcon from '../icons/JImgIcon.png';

const Header = () => {
    return (
        <div className={mystyle.HeaderBar}>
            <div className={mystyle.Name}>Jmeno</div>
            <div className={mystyle.ManIcon}><image src="man2.jpg" alt=""></image></div>
        </div>
)}

export default Header;