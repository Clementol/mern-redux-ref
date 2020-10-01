import { GET_ERRORS, CLEAR_ERRORS, REGISTRATION_CONFIRMATION_FAILED } from "./types";

/**
 * 
 * @param  msg 
 * @param  status 
 * @param id 
 */

export const returnErrors = (msg, status, id=null) => {
    return {
        type: GET_ERRORS,
        payload: {msg, status, id}
    }
}
/**
 * 
 * @param  msg 
 * @param  status 
 * @param id 
 */

export const returnConfirmatonError = (msg, status, id=null) => {
    return {
        type: REGISTRATION_CONFIRMATION_FAILED,
        payload: {msg, status, id}
    }
}

/**
 * @description clear errors
*/

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
}