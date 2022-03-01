import React, { useState } from 'react'
import styles from './style/template.module.css'

type TemplateProps = {
    text: string;
    children?: JSX.Element | JSX.Element[];
}

const Template = ({ text, children }: TemplateProps) => {
    // [watched variable, update function] = useState(innitial value)
    const [count, setCount] = useState(0)
    const handleButtonClick = (e) => {
        e.preventDefault();
        // update state variable count
        setCount(count + 1)
    }
    return (
        // has to have one parent element. <></> can help.
        <div className={`${styles.centereddiv} ${styles.colorblue}`}>
            {children}
            <h1 id={`${styles.fuckoffnext}`}>{text}</h1>
            <button onClick={handleButtonClick}>{count}</button>
        </div>
    )
}
export default Template