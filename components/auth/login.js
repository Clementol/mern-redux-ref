import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../actions/authActions";
import Router from 'next/router'

import { clearErrors } from "../actions/errorActions";


const Login = () => {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [msg, setMsg] = useState('')
    const [loadButton, setLoadButton] = useState(false)
    
    const dispatch = useDispatch();
    
  
    // const {isAuthenticated, user} = useSelector(state => state.auth)
    const {auth} = useSelector(state => state)
    const {error} = useSelector(state => state) ;
    
    

    useEffect( () => {
       
            if ( error.id === 'LOGIN_FAIL') {
                setMsg(error.msg)
                setLoadButton(false)
            } else {
                setMsg(null)
            }
        
        if (auth.isAuthenticated) {
         Router.push('/[name]', `/${auth.user.name}`)
            setEmail('');
            setPassword('');
        }
        
    }, [error, auth] )     
   

    /**
     * @param event
     * @description onSubmit button to login
     */
    const onsubmit =  (e) => {
        e.preventDefault();
        
        const user = {email:email, password: password}
        // perforM login
        dispatch(login(user))
         
        // loading button
        setLoadButton(true)
        setMsg('');
    }

    return (
        <div style={{margin: "3rem"}} >
                {msg && <div className="alert alert-danger" >{msg}</div> }

        <form onSubmit={onsubmit}>

            <div className="form-group row" >
                <label htmlFor="email" className="col-sm-2">Email</label>
                <div className="col-sm-8">
                    <input type="email" placeholder="email"
                    className="form-control" id="email" name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
            </div>

            <div className="form-group row">
                <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                <div className="col-sm-8">
                    <input type="password" placeholder="password" 
                    className="form-control" id="password" name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>

            <div className="form-group row" style={{margin: '3rem'}} >
                <button className="btn btn-primary" style={{marginLeft: '5.5rem' }}>
                    { loadButton === true &&
                        <span><i className="fa fa-spinner fa-spin"></i> &nbsp; </span> 
                    
                    } Login</button>
            </div>

        </form>
        </div>
    )
}

export default Login