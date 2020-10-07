import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../actions/authActions";
import Router from 'next/router'

import { clearErrors } from "../actions/errorActions";
import { RegisterLink } from "./register";
import { ForgotPasswordLink } from "../../pages/forget-password";
import { ResendLink } from "../../pages/resend-link";


const Login = () => {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [msg, setMsg] = useState('')
    const [loadButton, setLoadButton] = useState(false)
    const [notVerified, setNotVerified] = useState(false)
    
    const dispatch = useDispatch();
    
  
    // const {isAuthenticated, user} = useSelector(state => state.auth)
    const {auth} = useSelector(state => state)
    const {error} = useSelector(state => state) ;
    
    

    useEffect( () => {
       
            if (error.id === 'NOT_VERIVIED') {
                setNotVerified(true)
            }
            if ( error.status === 400 || 401) {
                setMsg(error.msg)
                setLoadButton(false)
            } else {
                setMsg(null)
            }
        
        if (auth.isAuthenticated && auth.confirmed) {
            setMsg('');
            // Concatenate spaced name with '-'
            let userName = auth.user.name
            let rUserName
            if (userName.indexOf(' ') > 0) {
                 rUserName = userName.replace(' ', '-')
            } else {
                rUserName = userName
            }
            
            console.log(rUserName)
            Router.push('/[name]', `/${rUserName}`)
                setEmail('');
                setPassword('');
        }
        
    }, [error, auth] )     
   

    /**
     * @param event
     * @description onSubmit button to login
     */
    const onsubmit =  e => {
        e.preventDefault();
        setNotVerified(false);
        setLoadButton(true)
        setMsg('');
        const user = {email:email, password: password}
        // perforM login
        dispatch(login(user));
         
    }

    return (
        <div style={{margin: "3rem"}} >
                {msg && <div className="alert alert-danger" >{msg}</div> }
                {notVerified && <h5>Click {ResendLink} to be verified </h5> }

        <form onSubmit={onsubmit}>

            <div className="form-group row" >
                <label htmlFor="email" className="col-sm-2" style={{fontWeight: 'bold'}}>Email</label>
                <div className="col-sm-8">
                    <input type="email" placeholder="email"
                    className="form-control" id="email" name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
            </div>

            <div className="form-group row">
                <label htmlFor="password" className="col-sm-2 col-form-label"
                style={{fontWeight: 'bold'}}>Password</label>
                <div className="col-sm-8">
                    <input type="password" placeholder="password"  
                    className="form-control" id="password" name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>

            <div className="form-group row" style={{width: '30%', position: 'relative', margin: '2.5rem 0rem 2.5rem 9rem'}} >
                <button className="btn btn-primary" style={{width: '6rem'}} disabled={loadButton}>
                    { loadButton === true && <span><i className="fa fa-spinner fa-spin"></i> </span> } 
                    {loadButton ? "" : 'Login'}
                </button>
            </div>
                <p style={{margin: '.1rem 0 0 0rem', fontWeight: 'bolder'}}> Don't have an account? Please Register {RegisterLink} </p>
                <p style={{margin: '.1rem 0 0 0rem', fontWeight: 'bolder'}}> Forgot password? Click {ForgotPasswordLink} </p>

        </form>
        </div>
    )
}

export default Login;
