import React, {useState} from "react";
import mystyle from "../ModuleCss/My.module.css";

const User = (props) => {
    const [name, setName] = useState(null);
    // USE THIS FUNCTION TO LIMIT THE NAME LENGTH
    // --> "Michal" will output "Michal"
    // --> "MichalMichalMichalMichalMichal" will output "MichalMichalMich..."
    /*    useEffect(() => {
            if (props.name.length > 5) {
                setName("BRUH")
                return;
            }
            setName(props.name)
        }, [props.name])*/

    return (
        <div className={mystyle.PeopleList}>{props.name}</div>
    )
}

export default User;