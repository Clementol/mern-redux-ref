import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import Link from "next/link"
import { resendLink } from "../components/actions/authActions"


export const ResendLink = (
    <Link href='/resend-link'>
        <a>here</a>
    </Link>
)

const Resend = () => {

    const [email, setEmail] = useState('')
    const [succMsg, setSuccMsg] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [loadButton, setLoadButton] = useState(false)

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
        setSuccMsg('');

        const info = {
            email
        }

        // To resend link
        dispatch(resendLink(info))

    }
    return (
        <div style={{margin: "3rem"}} >
                {errMsg && <div className="alert alert-danger" >{errMsg}</div> }

                {succMsg && <div className="alert alert-success" >{succMsg}</div> }

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


            <div className="form-group row" style={{width: '30%', position: 'relative', margin: '2.5rem 0rem 2.5rem 9rem'}} >
                <button className="btn btn-primary" style={{width: '8rem'}} disabled={loadButton}>
                    { loadButton === true && <span><i className="fa fa-spinner fa-spin"></i> </span> } 
                    {loadButton ? "" : 'Resend Link'}
                </button>
            </div>
             
        </form>
        </div>
    )
}

export default Resend;
