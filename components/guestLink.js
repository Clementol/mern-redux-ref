import Link from "next/link";

import {useRouter} from "next/router";
const GuestLink = () => {

  const router = useRouter();
  return (
    <>
        <li className="nav-item ">
              <Link href='/register'>
                <a className="nav-link" >Register</a>
              </Link>
            </li>
            <li className="nav-item ">
              <Link as="/login" href='/' >
                <a className="nav-link" >Login</a>
              </Link>
            </li>
    </>)
}
export default GuestLink;
