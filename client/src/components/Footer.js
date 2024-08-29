import * as strings from "../text/strings";
import { Toggle } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import { useContext } from "react";
import UserContext from "../context/UserProvider";

export default function Footer() {
    const {isAuthorized, setIsAuthorized} = useContext(UserContext);

    const handleChange = () => {
        setIsAuthorized(!isAuthorized);
    }

    return (
        <footer className="text-center font-weight-lighter m-5 pt-5 border-top" >
            <p>{strings.FOOTER_TEXT_CREATED_BY} &copy;{strings.FOOTER_TEXT_CREATOR}, {strings.FOOTER_TEXT_CREATED_YEAR}. {strings.FOOTER_TEXT_MESSAGE}.</p>
            <Toggle className="mt-3" checkedChildren="Admin" unCheckedChildren="User" checked={isAuthorized} color="cyan" onChange={handleChange}/>
        </footer>
    );
}