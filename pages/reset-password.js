import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../components/actions/authActions";
import { LoginLink } from "./confirmation";

const ResetPassword = () => {

    const [password, setPassword] = useState('')
    const [reTypePassword, setRetypePassword] = useState('')
    const [loadButton, setLoadButton] = useState(false);
    const [succMsg, setSuccMsg] = useState('')
    const [errMsg, setErrMsg] = useState('')

    const dispatch = useDispatch()
    const {message, error} = useSelector(state => state)

    useEffect( ()  => {
        if (message.status === 200 ) {
            setSuccMsg(message.msg)
            setLoadButton(false)
            setErrMsg('')
        }
        if (error.status === 400) {
            setErrMsg(error.msg)
            setLoadButton(false)
            setSuccMsg('')
        }
    }, [message, error])

    const onsubmit = e => {
        e.preventDefault();
        setLoadButton(true)
        setSuccMsg('')
        setErrMsg('');

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const token = urlParams.get('token');

        const info = {
            password,
            reTypePassword,
            token
        }

        // Reset password
        dispatch(resetPassword(info))


    }

    return (
    <div style={{margin: "3rem"}} >
        {succMsg && <div className="alert alert-success" >{succMsg}</div> }

        {errMsg && <div className="alert alert-danger" >{errMsg}</div> }

        {succMsg && <h5>Please click {LoginLink} to login</h5> }
    <form onSubmit={onsubmit}>

        <div className="form-group row" >
            <label htmlFor="password" className="col-sm-2">Password</label>
            <div className="col-sm-8">
                <input type="password" placeholder="password"
                className="form-control" id="password" name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
        </div>

        
        <div className="form-group row">
            <label htmlFor="reTypePassword" className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-8">
                <input type="password" placeholder="reTypePassword" 
                className="form-control" id="reTypePassword" name="reTypePassword"
                value={reTypePassword}
                onChange={(e) => setRetypePassword(e.target.value)}
                />
            </div>
        </div>

        <div className="form-group row" style={{width: '30%', position: 'relative', margin: '2.5rem 0rem 2.5rem 9rem'}}>
            <button className="btn btn-primary" style={{width: '6rem'}} disabled={loadButton}>
                { loadButton === true && <span><i className="fa fa-spinner fa-spin"></i> </span> } 
                {loadButton ? "" : 'Reset'}
            </button>
        </div>

    </form>
    </div>
    )
}

export default ResetPassword;
