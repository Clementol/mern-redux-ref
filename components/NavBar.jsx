import Link from 'next/link'
import {Router} from 'next/router'
// import Logout from './auth/logout'
import { useSelector } from 'react-redux'
import AuthLink from './auth/authLink'
import GuestLink from './guestLink'



const NavBar = () => {

    const {confirmed} = useSelector( state => state.auth )

    const refresh = () => {
      window.location = '/'
    }

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
        <Link href="/">
          <a className="navbar-brand" onClick={refresh} >Shopping List</a>
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            
          <ul className="navbar-nav mr-auto">
            {
              confirmed ?  <AuthLink />  :  <GuestLink />
            }
           
          </ul>
         
        </div>
      </nav>
    )
}
export default NavBar;
