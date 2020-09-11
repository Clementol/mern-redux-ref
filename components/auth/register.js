import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../actions/authActions";
import Router from 'next/router'
import { clearErrors } from "../actions/errorActions";


const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [err_msg, setErrMsg] = useState('')
    const [loadButton, setLoadButton] = useState(false)

    const dispatch = useDispatch();
    
    
    const {auth} = useSelector(state => state)
    // const {msg} = useSelector(state => state.error)
    const {error} = useSelector(state => state)
    
    
    useEffect( () => {
        
            if (error.msg) {
                setErrMsg(error.msg);
                setLoadButton(false);
            } else {
                setErrMsg(null)
            }

            if (auth.isAuthenticated){
                Router.push('/[name]', `/${auth.user.name}`);
                setEmail('')
                setPassword('')
           }
           
           //dispatch(clearErrors());
    }, [error, auth] )     
   

    /**
     * @param event
     * @description onSubmit button to regiser
     */
    const onsubmit =  (e) => {
        e.preventDefault();
        setLoadButton(true);
        setErrMsg('')
        // New user info
        const newUser = {
            name,
            email,
            password
        }

        // perforM register
        dispatch(register(newUser))
        
        
        
    }

    return (
        <div style={{margin: "3rem"}} >
            {err_msg &&
                <div className="alert alert-danger" > 
                {err_msg}
                </div> 
            
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
                { loadButton  && 
                      <span> <i className="fa fa-spinner fa-spin"></i> &nbsp;</span>
                    
                    } Register</button>
            </div>

        </form>
        </div>
    )
}

export default Register