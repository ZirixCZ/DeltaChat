import React from "react";
import {Link} from 'react-router-dom';
import mystyle from "../ModuleCss/My.module.css";
import {CgProfile} from 'react-icons/cg';

const NavBar = (props) => {

    return (
        <div className={mystyle.HeaderBar}>
            <div className={mystyle.Name}>
                <Link to="/Login" className={mystyle.NavBarLink}>{props.name}</Link>
            </div>
            <CgProfile style={{height: '2rem', width: '2rem', marginRight: '1rem'}}/>
        </div>
    )
}

export default NavBar;