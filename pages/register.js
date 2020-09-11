import Head from 'next/head'
import Register from "../components/auth/register"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearErrors } from "../components/actions/errorActions";


const RegisterPage = () => {
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(clearErrors())
    }, [] )

    return (
        <div className="bg">
        <Head>
            <title>Register to manage Shopping List</title>
        </Head>
        <div className="container">
            <Register />
        </div>
        </div>
    )
}

export default RegisterPage;
