import {GET_ERRORS, CLEAR_ERRORS, REGISTRATION_CONFIRMATION_FAILED} from '../actions/types';

const initialState = {
    msg: null,
    status: null,
    id: null
}

export default function(state=initialState, action) {
    switch (action.type) {
        case GET_ERRORS:
            return {
                ...state,
                msg: action.payload.msg,
                status: action.payload.status,
                id: action.payload.id
            };
        case REGISTRATION_CONFIRMATION_FAILED:
            return {
                msg: action.payload.msg,
                status: action.payload.status
            }
        case CLEAR_ERRORS:
            return {
                msg: null,
                status: null,
                id: null
            };
        
        default: 
            return state;
    }
}