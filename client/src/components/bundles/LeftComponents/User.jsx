import React, {useEffect, useState} from "react";
import mystyle from "../ModuleCss/My.module.css";

const User = (props) => {
    const [name, setName] = useState(null);

    useEffect(() => {
        if (props.name.length > 5) {
            setName("BRUH")
            return;
        }
        setName(props.name)
    }, [props.name])

    return (
        <div className={mystyle.PeopleList}>● {name}</div>
    )
}

export default User;