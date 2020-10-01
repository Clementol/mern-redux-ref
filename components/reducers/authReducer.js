import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTRATION_CONFIRMATION_FAILED
} from '../actions/types'

const initialState = {
    token: null ,
    isAuthenticated: false,
    confirmed: false,
    isLoading: false,
    user: {}
}

export default function(state=initialState, action) {
    switch (action.type) {
        case USER_LOADING:
    
            return {
                ...state,
                isLoading: true
            };
        case USER_LOADED:
            return {
                // ...state,
                // isLoading: false,
                // user: action.payload
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                token: action.payload.token,
                isAuthenticated: true,
                confirmed: action.payload.confirmed,
                isLoading: false,
                user: action.payload.user
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                confirmed: action.payload.confirmed,
                isLoading: false
            }
        
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem('token')
            return {
                ...state,
                confirmed: false,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            };
        default: 
            return state;

    }
}