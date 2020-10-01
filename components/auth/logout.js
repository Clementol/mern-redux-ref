import Link from 'next/link'
import { logout } from "../actions/authActions";
import { useDispatch } from 'react-redux';
import Router from 'next/router';


const Logout = () => {
    const dispatch = useDispatch()

    const onClick = () => {
        dispatch(logout())
        Router.push('/')
    }

    return (
        <div onClick={onClick } >
            <Link href="/" >
                <a className="nav-link">Logout</a>
            </Link>
        </div>
    )
} 

export default Logout;
