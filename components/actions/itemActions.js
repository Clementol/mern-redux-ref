import axios from 'axios';
import {GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING, GET_ERRORS, 
ITEM_ERROR, DELETE_ERROR, ADD_ITEM_ERROR
} from './types';

import {tokenConfig} from './authActions'


const siteUrl = process.env.siteUrl

/**
 * @description Get items from database
 * @param id
*/

export const getItems = (id) => async(dispatch, getState) => {
    dispatch(setItemsLoading());
    await axios
        .get(`${siteUrl}/api/${id}/items`, tokenConfig(getState))
        .then(res => {
            //console.log('res' ,res.data)
            const {items, _id, ...o} = res.data
            //console.log(id)
            dispatch({
            type: GET_ITEMS,
            payload: {
                items: items.reverse(),
                items_id: id,
                items_others: o
            }
            }) 
    } )
        .catch (err => {
            const {data, status, ...o}  = err.response;
            // console.log(data)
            dispatch({
                type: ITEM_ERROR,
                payload: {
                    item_msg: data,
                    item_status: status,
                    item_others: o
                }
            })
            
         
        })
}
/**
 * @description Add item
 * @param id
 * @param item
*/
export const addItem = (id, item) => (dispatch, getState) => {

    const name = JSON.stringify(item);
    axios.post(`${siteUrl}/api/${id}/add-item`, name, tokenConfig(getState))
        .then(res => { 
                dispatch(getItems(id))
                dispatch({
                type: ADD_ITEM,
                 payload: {
                     name: res.data.name,
                     add_item_status: res.status
                 }
                }) 
            })
        .catch (err => {
            const {data, status, ...o}  = err.response;
            //dispatch(itemErrors(data, status))
            dispatch({
                type: ADD_ITEM_ERROR,
                payload: {
                    add_item_msg: data,
                    add_item_status: status
                }
            })
        })
}

/**
 * @description delete item
 * @param id
 * @param name
*/
export const deleteItem = (id, name) => (dispatch, getState) => {
     axios
    .delete(`${siteUrl}/api/delete-item/${id}/${name}`, tokenConfig(getState))
    .then(res => {
        // console.log(res.status)
        dispatch({
            type: DELETE_ITEM,
            payload: {
                id, name, item_status: res.status
            }
        })
    })
    .catch(err => {
        const {data, status, ...o} = err.response;
        dispatch({
            type: DELETE_ERROR,
            payload: {
                item_msg: data,
                item_status: status,
                item_others: o
            }
        })
    })
}
export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    }
}

