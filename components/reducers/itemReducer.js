
import {GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING,
    DELETE_ERROR,
    ITEM_ERROR} from '../actions/types';

const initialState  = {
    items: [],
    loading: false,
    item_msg: '',
    item_status: null,
    item_id: null
}

export default function(state=initialState, action) {
    switch (action.type) {
        case GET_ITEMS: 
            return {
                ...state,
                items: action.payload,
                loading: false
            } 
        case DELETE_ITEM:
            return {
                ...state,
                items: state.items.filter(item => item._id !== action.payload)
            } 
        case DELETE_ERROR: 
            return {
                ...state,
                item_msg: action.payload.item_msg,
                item_status: action.payload.item_status,
                item_id: action.payload.item_id
            }
        case ADD_ITEM:
            return {
                ...state,
                items: [action.payload, ...state.items],
                item_msg: ''
            }  
        case ITEMS_LOADING:
            return {
                ...state,
                loading: true
            }    
        case ITEM_ERROR:
            return {
                ...state,
                item_msg: action.payload.item_msg,
                item_status: action.payload.item_status,
                item_id: action.payload.item_id
            }       
        default: 
            return state;
    }
};
