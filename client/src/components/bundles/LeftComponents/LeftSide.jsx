import React from "react";
import mystyle from "../ModuleCss/My.module.css";
import Footer from "./Footer";
import Header from "./Header";

const LeftSide = (props) => {
    return (
        <div className={mystyle.LeftSideBar}>
            <Header/>
            <Footer properties={props.properties}/>
        </div>
    )
}

export default LeftSide;