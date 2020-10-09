import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import Link from 'next/link'
import { confirmation } from "../components/actions/authActions"
import Head from "next/head"
import { ResendLink } from "./resend-link"


export const LoginLink = (
    <Link href="/" as='/login'>
         <a style={{backgroundColor: '#fff'}} >here</a>
    </Link>
)

const EmailConfirmation = () => {

    const [email, setEmail] = useState('')
    const [succMsg, setSuccMsg] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [loadButton, setLoadButton] = useState(false)
    const [notVerified, setNotVerified] = useState(false)


    const dispatch = useDispatch()
    const {message, auth} = useSelector(state => state)
    const {error} = useSelector(state => state)

    useEffect(() => {
        if (message.status === 200) {
            setSuccMsg(message.msg)
            setErrMsg('')
            setLoadButton(false)
        }
        if (error.status === 400) {
            setErrMsg(error.msg)
            setSuccMsg('')
            setLoadButton(false)
        }

    }, [error, message])

    const onsubmit = (e) => {
        e.preventDefault();
        setLoadButton(true);
        setErrMsg('');
        setNotVerified(false);
        setSuccMsg('');
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const token = urlParams.get('token');

        const info = {
            email,
            token
        }

        // To confirm user
        dispatch(confirmation(info));

    }

    return (
        <>
        <Head>
            <title>Password Confirmation</title>
        </Head>
        <div style={{margin: "3rem"}} >

        {errMsg && <> <div className="alert alert-danger" > {errMsg} </div> 
        <h5>Please click {ResendLink} resend link </h5> 
        </>}

        {succMsg &&  <div className="alert alert-success"> {succMsg }</div> }

        { succMsg ? <div className="confirmed" >
            <img  src="/confirmed.png" className="img-fluid" style={{borderRadius: '100%'}}
            alt="confirmed" width='100px' height='100px' />
            <h5>Please log in {LoginLink} </h5> 
        </div> : ''}
           




            <form onSubmit={onsubmit}>

            <div className="form-group row" >
                <label htmlFor="email" className="col-sm-2" style={{fontWeight: 'bold'}} >Email</label>
                <div className="col-sm-8">
                    <input type="text" placeholder="email" 
                    className="form-control" id="email" name="email"
                    value={email }
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
            </div>
            <div className="form-group row" style={{ position: 'relative', margin: '2.5rem 0rem 2.5rem 9rem'}}>
                <button className="btn btn-primary" style={{width: '13rem'}} disabled={loadButton}>
                    { loadButton  && <span> <i className="fa fa-spinner fa-spin"></i> </span>} 
                    {auth.confirmed == true ? 'Comfirmed' : 'Confirm'}
                     
                </button>
            </div>
            </form>
        </div>
        </>
    )
}

export default EmailConfirmation;