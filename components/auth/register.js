import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../actions/authActions";
import Router from 'next/router'
import { clearErrors } from "../actions/errorActions";
import { LoginLink } from "../../pages/confirmation";

export const RegisterLink = (
    <Link href='/register'>
        <a style={{backgroundColor: '#fff'}}>here</a>
    </Link>
)

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [reTypePassword, setRetypePassword] = useState('');

    const [err_msg, setErrMsg] = useState('')
    const [msg, setMsg] = useState('')
    const [loadButton, setLoadButton] = useState(false)

    const dispatch = useDispatch();
    
    
    const {auth} = useSelector(state => state)
    const {message} = useSelector(state => state)
    const {error} = useSelector(state => state)
    
    
    useEffect( () => {
        
            if (error.status === 400) {
                setErrMsg(error.msg);
                setMsg('')
                setLoadButton(false);
            } else {
                setErrMsg(null)
            }
            if (message.status === 200) {
                setMsg(message.msg)
                setLoadButton(false)
                setErrMsg('');
                setName('');
                setEmail('');
                setPassword('');
                setRetypePassword('');
            }
            
    }, [error, message] )     
   

    /**
     * @param event
     * @description onSubmit button to regiser
     */
    const onsubmit =  (e) => {
        e.preventDefault();
        setLoadButton(true);
        setErrMsg('')
        setMsg('')
        // New user info
        const newUser = {
            name,
            email,
            password,
            reTypePassword
        }

        // perforM registeration
        dispatch(register(newUser))
        
        
    }

    return (
        <div style={{margin: "3rem"}} >
            {err_msg && <div className="alert alert-danger" > {err_msg} </div> }

            {msg && <div className="alert alert-success" > {msg} </div> }

        <form onSubmit={onsubmit}>

            <div className="form-group row" >
                <label htmlFor="name" className="col-sm-2" style={{fontWeight: "bold"}} >Name</label>
                <div className="col-sm-8">
                    <input type="text" placeholder="name" 
                    className="form-control" id="name" name="name"
                    value={name }
                    onChange={(e) => setName(e.target.value)}
                    />
                </div>
            </div>

            <div className="form-group row" >
                <label htmlFor="email" className="col-sm-2" style={{fontWeight: "bold"}}>Email</label>
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
                style={{fontWeight: "bold"}}>Password</label>
                <div className="col-sm-8">
                    <input type="password" placeholder="password" 
                    className="form-control" id="password" name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="reTypePassword" className="col-sm-2 col-form-label"
                style={{fontWeight: "bold"}}>Confirm Password</label>
                <div className="col-sm-8">
                    <input type="password" placeholder="confirm password" 
                    className="form-control" id="reTypePassword" name="reTypePassword"
                    value={reTypePassword}
                    onChange={(e) => setRetypePassword(e.target.value)}
                    />
                </div>
            </div>

            <div className="form-group row" style={{width: '30%', position: 'relative', margin: '2.5rem 0rem 2.5rem 9rem'}}>
                <button className="btn btn-primary" style={{width: '6rem'}} disabled={loadButton}>
                    { loadButton  && <span > <i className="fa fa-spinner fa-spin"></i> </span>} 
                    { loadButton ? "" : 'Register'}
                </button>
            </div>
                <p style={{margin: '.1rem 0 0 0rem',fontWeight: 'bolder' }} >Already have an account? Please login {LoginLink} </p>
        </form>
        </div>
    )
}

export default Register