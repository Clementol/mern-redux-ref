import Link from "next/link";

import Router from "next/router";

const GuestLink = (
    <>
        <li className="nav-item ">
              <Link href='/register'>
                <a className="nav-link" >Register</a>
              </Link>
            </li>
            <li className="nav-item ">
              <Link href='/login'>
                <a className="nav-link" >Login</a>
              </Link>
            </li>
    </>
)
export default GuestLink;
