import React from "react";
import mystyle from "../ModuleCss/My.module.css";
import Footer from "./Footer";
import Header from "./Header";

const LeftSide = () => {
    return (
        <div className={mystyle.LeftSideBar}>
            <Header/>
            <Footer/>
        </div>

)}

export default LeftSide;