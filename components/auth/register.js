import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../actions/authActions";
import Router from 'next/router'



const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [msg, setMsg] = useState(null)
    
    const dispatch = useDispatch();
    
    
    const {isAuthenticated} = useSelector(state => state.auth)
    const {item_msg} = useSelector(state => state.item)
    const {error} = useSelector(state => state) ;
    const [loadButton, setLoadButton] = useState(false)
    

    useEffect( () => {
        //if (isAuthenticated) {
            if (item_msg) {
                setMsg(item_msg)
                setLoadButton(false)
            } else {
                setMsg(null)
            }
        //}
        //if authenticated
        
        
    }, [isAuthenticated, item_msg] )     
   

    /**
     * @param event
     * @description onSubmit button to regiser
     */
    const onsubmit =  (e) => {
        e.preventDefault();
       
        // New user info
        const newUser = {
            name,
            email,
            password
        }

        // perforM register
        dispatch(register(newUser))
        setLoadButton(true)
        
    }

    return (
        <div style={{margin: "3rem"}} >
            {msg ? 
                <div className="alert alert-danger" > 
                {msg}
                </div> 
            : null
        }
        <form onSubmit={onsubmit}>

            <div className="form-group row" >
                <label htmlFor="name" className="col-sm-2">Name</label>
                <div className="col-sm-8">
                    <input type="text" placeholder="name" 
                    className="form-control" id="name" name="name"
                    value={name }
                    onChange={(e) => setName(e.target.value)}
                    />
                </div>
            </div>

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
                    
                    } &nbsp; Register</button>
            </div>

        </form>
        </div>
    )
}

export default Register