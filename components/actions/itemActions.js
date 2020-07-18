import axios from 'axios';
import {GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING} from './types';
import {siteUrl} from '../myConfig';


export const getItems = () => dispatch => {
    dispatch(setItemsLoading());
    axios
        .get(`${siteUrl}/api/items`)
        .then(res => dispatch({
            type: GET_ITEMS,
            payload: res.data
        }))
}

export const addItem = item =>  dispatch => {
    axios.post(`${siteUrl}/api/add-item`, item)
        .then(res => dispatch({
             type: ADD_ITEM,
             payload: res.data
        }))
}
export const deleteItem = id => dispatch => {
    axios
    .delete(`${siteUrl}/api/delete-item/${id}`)
    .then(res => dispatch({
        type: DELETE_ITEM,
        payload: id
    }))
}
export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    }
}

