import axios from 'axios'
import { returnErrors, returnConfirmatonError } from "./errorActions";
import { successMessage, updatePasswordMessage } from "./succMsgActions";

const siteUrl = process.env.siteUrl
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGOUT_SUCCESS,
    REGISTRATION_CONFIRMED,
    // REGISTRATION_CONFIRMATION_FAILED
} from './types';
    

/**
 * @description Check token & load user
 */
export const loadUser = () => async (dispatch, getState) => {
    // User loading
    dispatch({type: USER_LOADING});
    

    await axios.get(`${siteUrl}/api/user`, tokenConfig(getState))
        .then( res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }) )
        .catch ( err => {
            const {data, status, ...o}  = err.response
            dispatch(returnErrors(data, status, o))
            dispatch({
                type: AUTH_ERROR
            })
        })
} 

/** 
 * @param name 
 * @param email
 * @param password
 * @description Regiter user 
 */
 
 export const register = ({name, email, password, reTypePassword}) =>  dispatch => {
     // header
        const config = {
            headers: {
                "Content-Type": 'application/json'
            }
        }
     //Request body
     const body = JSON.stringify({name, email, password, reTypePassword});

    axios.post(`${siteUrl}/api/add-user`, body, config)
        .then(res => { 
            if (res.data) {
                const {confirmed, msg} = res.data
                //console.log(confirmed, msg)
                dispatch(successMessage(res.status, msg))
                dispatch({
                    type: REGISTER_SUCCESS,
                    payload: {
                        confirmed: confirmed
                    }
                })
            }
        } 
        )
        .catch (err => {
            //console.log(err.response)
            if (err.response) {
                const {data, status, ...o}  = err.response
                dispatch(returnErrors(data, status, 'REGISTER_FAIL'))
                dispatch({
                    type: REGISTER_FAIL
                })
            }
        })
 }


 export const confirmation = ({email, token}) => dispatch => {
    const body = JSON.stringify({email, token})
    const config = {
        headers: {
            "Content-Type": 'application/json'
        }
    }
    axios.post(`${siteUrl}/api/confirmation`, body, config)
    .then( res => {
        if (res.data) {
            const { confirmed, msg} = res.data;
            dispatch(successMessage(res.status, msg))
            dispatch({
                type: REGISTRATION_CONFIRMED,
                payload: {
                    confirmed: confirmed
                }
            })
        }
    })
    .catch( err => {
        if (err.response) {
            const {status, data}  = err.response;
            dispatch(returnConfirmatonError(data, status))
            
        }
    })
 }

/**
 * @param {*} email
 * @param {*} password
 * @description login 
 * */

export const login = ({email, password}) => async dispatch => {
    // header
       const config = {
           headers: {
               "Content-Type": 'application/json'
           }
       }
    //Request body
    const body = JSON.stringify({email, password});

    await axios.post(`${siteUrl}/api/authenticate`, body, config)
       .then(res => dispatch({
           type: LOGIN_SUCCESS,
           payload: {
               token: res.data.token,
               user: res.data.user,
               confirmed: res.data.user.confirmed
            }
       }))
       .catch (err => {
           const {data, status, ...o}  = err.response
           dispatch(returnErrors(data.msg, status, data.id))
           dispatch({
               type: LOGIN_FAIL,
           })
       })
}

/**
 * @param {*} email
 * @description Forget password action
*/
export const forgetPassword = ({email}) => dispatch => {
   // header
   const config = {
        headers: {
            "Content-Type": 'application/json'
        }
    }
    //Request body
    const body = JSON.stringify({email});

    axios.post(`${siteUrl}/api/forgetpassword`, body, config)
    .then( res => {
        if (res.data) {
            dispatch(successMessage(res.status, res.data))
        }
    })
    .catch(err => {
        if (err.response) {
            const {data, status} = err.response
            dispatch(returnErrors(data, status))
        }
    })
}


/**
 * @param {*} password 
 * @param {*} reTypePassword 
 * @param {*} token 
 * @description  To reset passoword
 */
export const resetPassword = ({password, reTypePassword, token}) => dispatch => {
      // header
    const config = {
        headers: {
            "Content-Type": 'application/json'
        }
    }
    //Request body
    const body = JSON.stringify({password, reTypePassword, token});

    axios.post(`${siteUrl}/api/resetpassword`, body, config)
    .then(res => {
        if (res.data) {
            dispatch(updatePasswordMessage(res.status, res.data))
        }
    })
    .catch( err => {
        if (err.response) {
            const {data, status} = err.response
            dispatch(returnErrors(data, status))
        }
    })
}

/**
 * 
 * @param {*} email 
 */
export const resendLink = ({email}) => dispatch => {
      // header
      const config = {
        headers: {
            "Content-Type": 'application/json'
        }
    }
    //Request body
    const body = JSON.stringify({email});
    axios.post(`${siteUrl}/api/resendlink`, body, config)
    .then(res => {
        if (res.data) {
            dispatch(successMessage(res.status, res.data))
        }
    })
    .catch(err => {
        if (err.response) {
            const {data, status} = err.response;
            dispatch(returnErrors(data.msg, status, data.id))
        }
    })
}

/**
 * @description To logout
 */
export const logout = () => dispatch => {
    dispatch({ type: LOGOUT_SUCCESS })
}

/**
 * @description setup header and token
*/
export const tokenConfig = getState => {

        // Geting token from localstorage
        const token = getState().auth.token;

        //Headers
        const config = {
            headers: {
                "Content-Type": "application/json",
                "access-control-allow-origin": "*"
            }
        }
        // If token add to headers
        if (token) {
            config.headers['x-auth-token'] = token
        }
       return config;
};