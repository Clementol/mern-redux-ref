import axios from 'axios'
import { returnErrors } from "./errorActions";
const siteUrl = process.env.siteUrl
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGOUT_SUCCESS
} from './types';


/**
 * @description Check token & load user
 */
export const loadUser = () => (dispatch, getState) => {
    // User loading
    dispatch({type: USER_LOADING});
    

    axios.get(`${siteUrl}/api/user`, tokenConfig(getState))
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
 
 export const register = ({name, email, password}) => dispatch => {
     // header
        const config = {
            headers: {
                "Content-Type": 'application/json'
            }
        }
     //Request body
     const body = JSON.stringify({name, email, password});

     axios.post(`${siteUrl}/api/add-user`, body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch (err => {
            const {data, status, ...o}  = err.response
            dispatch(returnErrors(data, status, 'REGISTER_FAIL'))
            dispatch({
                type: REGISTER_FAIL,
            })
        })
 }

/**@description login */

export const login = ({email, password}) => dispatch => {
    // header
       const config = {
           headers: {
               "Content-Type": 'application/json'
           }
       }
    //Request body
    const body = JSON.stringify({email, password});

    axios.post(`${siteUrl}/api/authenticate`, body, config)
       .then(res => dispatch({
           type: LOGIN_SUCCESS,
           payload: res.data
       }))
       .catch (err => {
           const {data, status, ...o}  = err.response
           dispatch(returnErrors(data, status, 'LOGIN_FAIL'))
           dispatch({
               type: LOGIN_FAIL,
           })
       })
}


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