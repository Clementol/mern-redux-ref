import Register from "../components/auth/register"
// import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearErrors } from "../components/actions/errorActions";


const RegisterPage = () => {
    const dispatch = useDispatch();
    useEffect( () => {
        dispatch(clearErrors())
    }, [] )
    return (
        <div className="container">
            <Register />
        </div>
    )
}

export default RegisterPage;
