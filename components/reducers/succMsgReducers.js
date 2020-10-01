import { REGISTRATION_CONFIRMED, CLEAR_MESSAGE, EMAIL_SENT, PASSWORD_UPDATED } from "../actions/types"

const initialState = {
    status: null,
    msg: null
}

export default function (state=initialState, action) {

    switch (action.type) {
        case EMAIL_SENT:
            return {
                ...state,
                status: action.payload.status,
                msg: action.payload.msg
            }
        case REGISTRATION_CONFIRMED:
            return {
                ...state,
                status: action.payload.status,
                msg: action.payload.msg
            }
        case PASSWORD_UPDATED:
            return {
                ...state,
                status: action.payload.status,
                msg: action.payload.msg
            }
        case CLEAR_MESSAGE: 
            return {
                ...state,
                status: null,
                msg: null
            }
        default: 
            return state
    }


}