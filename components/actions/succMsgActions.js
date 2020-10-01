import { EMAIL_SENT, CLEAR_MESSAGE, PASSWORD_UPDATED } from "./types"


/**
 *
 * @param {*} status 
 * @param {*} msg 
 */

export const successMessage = (status, msg) => {
    return {
        type: EMAIL_SENT,
        payload: {status, msg}
    }
}

/**
 * 
 * @param {*} status 
 * @param {*} msg 
 */
export const updatePasswordMessage = (status, msg) => {
    return {
        type: PASSWORD_UPDATED,
        payload: {status, msg}
    }
}


export const clearMessage = () => {
    return {
        type: CLEAR_MESSAGE
    }
}