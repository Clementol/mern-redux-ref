import axios from 'axios';
import {GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING, GET_ERRORS, 
ITEM_ERROR, DELETE_ERROR
} from './types';
import { itemErrors } from './errorActions';
import {tokenConfig} from './authActions'
import {returnErrors} from './errorActions'


const siteUrl = process.env.siteUrl

/**
 * @description Get items form database
*/

export const getItems = () => dispatch => {
    dispatch(setItemsLoading());
    axios
        .get(`${siteUrl}/api/items`)
        .then(res => dispatch({
            type: GET_ITEMS,
            payload: res.data
        }))
        .catch (err => {
            const {data, status, ...o}  = err.response;
            //dispatch(itemErrors(data, status))
            dispatch({
                type: ITEM_ERROR,
                payload: {
                    item_msg: data,
                    item_status: status,
                    item_id: o
                }
            })
            
         
        })
}

export const addItem = item =>  (dispatch, getState) => {
    axios.post(`${siteUrl}/api/add-item`, item, tokenConfig(getState))
        .then(res => dispatch({
             type: ADD_ITEM,
             payload: res.data
        }))
        .catch (err => {
            const {data, status, ...o}  = err.response;
            //dispatch(itemErrors(data, status))
            dispatch({
                type: ITEM_ERROR,
                payload: {
                    item_msg: data,
                    item_status: status,
                    item_id: o
                }
            })
        })
}

/**
 * @description delete item
 * @param id
*/
export const deleteItem = id => (dispatch, getState) => {
    axios
    .delete(`${siteUrl}/api/delete-item/${id}`, tokenConfig(getState))
    .then(res => 
        dispatch({
        type: DELETE_ITEM,
        payload: id
    }))
    .catch(err => {
        const {data, status, ...o} = err.response;
        dispatch({
            type: DELETE_ERROR,
            payload: {
                item_msg: data,
                item_status: status,
                item_id: o
            }
        })
    })
}
export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    }
}

