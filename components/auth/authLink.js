import Logout from "./logout";
import { useSelector } from "react-redux";
import { useEffect } from "react";


const AuthLink = () => {
    const {user} = useSelector( (state) => state.auth )
    
    useEffect( () => {
        if (user) user.name
    }, [user])
    return (
        <>
            {    user && 
               
                <li className="nav-item ">
                    <strong  style={{color: 'white'}} >Welcome, {user.name} </strong>
                </li>
                }
               
                <Logout />
        </>
    )
}


export default AuthLink;
