
import {GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING,
    DELETE_ERROR,
    ITEM_ERROR, ADD_ITEM_ERROR} from '../actions/types';

const initialState  = {
    items: [],
    loading: false,
    item_msg: '',
    add_item_msg: '',
    item_status: null,
    add_item_status: null,
    items_id: null,
    item_others: null
}

export default function(state=initialState, action) {
    switch (action.type) {
        case GET_ITEMS: 
            return {
                ...state,
                items: action.payload.items,
                items_id: action.payload.items_id,
                item_others: action.payload.item_others,
                loading: false
            } 
        case DELETE_ITEM:
            return {
                ...state,
                items: state.items.filter(item => item !== action.payload.name),
                item_status: action.payload.item_status
            } 
        case DELETE_ERROR: 
            return {
                ...state,
                item_msg: action.payload.item_msg,
                item_status: action.payload.item_status,
                item_others: action.payload.item_others
            }
        case ADD_ITEM:
            return {
                ...state,
                items: [action.payload.name, ...state.items],
                add_item_status: action.payload.add_item_status
              
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
                item_others: action.payload.item_others,
                
            } 
        case ADD_ITEM_ERROR: 
            return {
                ...state,
                add_item_msg: action.payload.add_item_msg,
                add_item_status: action.payload.add_item_status
            }      
        default: 
            return state;
    }
};
