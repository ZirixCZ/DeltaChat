import React from "react";
import {Link} from 'react-router-dom';
import mystyle from "../ModuleCss/My.module.css";
import LImgIcon from '../icons/LImgIcon.png';
import JImgIcon from '../icons/JImgIcon.png';
import { CgProfile } from 'react-icons/cg';

const NavBar = (props) => {

    return (
        <div className={mystyle.HeaderBar}>
            <div className={mystyle.Name}>
                <Link to="/Login">{props.properties}</Link>
            </div>
            <div className={mystyle.ManIcon}><image src="man2.jpg" alt=""></image></div>
            <CgProfile />
        </div>
)}

export default NavBar;