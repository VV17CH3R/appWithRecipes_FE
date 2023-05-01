import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';

export const Navbar = () => {

    const [cookies, setCookies] = useCookies(["access_token"])

    const logout = () => {
        setCookies("access_token", "");
        window.localStorage.removeItem("userID");
    };

    return <div className="navbar">
            <Link to={"/"}> Home </Link>
            <Link to={"/createrec"}> Create recipe </Link>
            {cookies.access_token ? 
                (<>
                    <Link to={"/savedrec"}> Saved recipe </Link>
                    <Link onClick={logout} to={"/"} > Logout </Link>
                </>) 
                : 
                (<Link to={"/auth"}> Login/Register </Link>)}
         </div>
}