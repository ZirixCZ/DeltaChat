import React, {useState} from "react";
import {Link} from 'react-router-dom';
import mystyle from "../ModuleCss/My.module.css";
import {CgProfile} from 'react-icons/cg';
import BL from '../icons/BurgerLines.png';
import BX from '../icons/BurgerX.png';
import User from '../LeftComponents/User';



const NavBar = (props) => {
    const [isClose, setIsClose] = useState(true);
    var a = document.getElementById("WithMenu");

    return (
        <div className={mystyle.HeaderBar}>
        

        <div className={mystyle.WithOutMenu}>
            <div className={mystyle.Name}><p to="/Login" className={mystyle.NavBarLink}>{props.name}</p></div>
            <div className={mystyle.ManIcon}><CgProfile style={{height: '2rem', width: '2rem'}}/></div>
            <div className={mystyle.NavBarText}><span className={mystyle.ColorText}>Delta</span>Chat</div>


            <button id="Burger" className={mystyle.Burger} onClick={() => {
                setIsClose(!isClose);
                isClose ? a.style.display = "flex" : a.style.display = "none";
            }}>
               <div id="BL"><img src={isClose ? BL : BX} alt=""></img></div>
            </button>

        </div>

        <div id="WithMenu" className={mystyle.WithMenu}>
                    <div className={mystyle.Menu}>

                        <div className={mystyle.MenuName}>Jmeno</div>

                        <div className={mystyle.MenuBetweenLine}></div>

                        <div className={mystyle.NumOfPeople}><span className={mystyle.BigSizeText}>{(props.properties.count > 1) ? `Právě připojeno: ${props.properties.count}` : `Jste tu jen vy`}</span></div>

                        

                        <div className={mystyle.ListContainer}>
                            <div className={mystyle.ListContainerInner}>
                            {props.properties.usernames.map((name) => {
                                return (<User name={name}/>)
                            })}
                            </div>
                        </div>
                        
                    </div> 
        </div>
        
        </div>


        
    )
}

export default NavBar;