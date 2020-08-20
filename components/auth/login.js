import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../actions/authActions";
import Router from 'next/router'
import { Alert } from "../shoppingList";


// const Alert = ({msg}) => {
//     return (
//         <div className="alert alert-danger" > 
//                 {msg}
//             </div> 
//     )
// }

const Login = () => {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [msg, setMsg] = useState('')
    const [loadButton, setLoadButton] = useState(false)
    
    const dispatch = useDispatch();
    
  
    const {isAuthenticated} = useSelector(state => state.auth)
    const {error} = useSelector(state => state) ;
    
    

    useEffect( () => {
        //if (error !== prevError) {
            if ( error.id === 'LOGIN_FAIL') {
                setMsg(error.msg)
                setLoadButton(false)
            } else {
                setMsg(null)
            }
        //}
        //if authenticated
        
        if (isAuthenticated) {
         Router.push('/')
            setEmail('');
            setPassword('')
        }
        
    }, [error, isAuthenticated] )     
   

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
    }

    return (
        <div style={{margin: "3rem"}} >
                {msg && <Alert item_msg={msg} /> 
                
                }
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

            <div className="form-group row" style={{margin: '3rem'}}>
                <button className="btn btn-primary">
                    { loadButton === true &&
                        <i className="fa fa-spinner fa-spin"></i>  
                    
                    } &nbsp; Login</button>
            </div>

        </form>
        </div>
    )
}

export default Login