import Logout from "./logout";
import { useSelector } from "react-redux";
import { useEffect } from "react";


const AuthLink = () => {
    const {auth} = useSelector( (state) => state )
    
    useEffect( () => {
        //if (user) user.name
    }, [])
    return (
        <>
            {    auth.isAuthenticated & auth.confirmed &&
               
                <li className="nav-item ">
                    <strong  style={{color: 'white'}} >Welcome, {auth.user.name} </strong>
                </li>
                }
               
                <Logout />
        </>
    )
}


export default AuthLink;
