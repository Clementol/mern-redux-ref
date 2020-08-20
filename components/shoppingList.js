 import React, {Component, useEffect} from 'react' ;
import {useSelector, useDispatch} from 'react-redux'
import PropTypes from 'prop-types'
import BeatLoader from 'react-spinners/BeatLoader'
import {getItems, deleteItem} from '../components/actions/itemActions';
import ItemModal from './itemModal';
import { clearErrors } from './actions/errorActions';


/**
 * @param items
 * @description display items
*/
const Items = ({items}) => {
    const {isAuthenticated} = useSelector( (state) => state.auth )
    const dispatch = useDispatch()


    return (
        
        <ul className="list-group ">
                { items ? items.map(({_id, name}) => {
                    return <li key={_id} className="list-group-item" >

                        <button disabled={isAuthenticated === false} className="btn btn-danger small"
                        style={{marginRight: '5rem'}}
                        onClick={() => dispatch(deleteItem(_id))}
                        >   
                            Delete
                        </button>
                        {name}</li>
                }) : 'No Items'}
            </ul>
        
    )
}




/**
 * @param {*} item_msg 
 * @description Alert message
 */

export const Alert = ({item_msg}) => {
    
    return (
    <div className="alert alert-danger" >{item_msg}</div>
    )
    
}

/**
 * @description ShoppingList
*/
const ShoppingList = () => {
    const {loading, items, item_msg} = useSelector(state => state.item)
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getItems())
        dispatch(clearErrors())
    }, [])

        return (
            <div className="container">
                <ItemModal />
                {
                    item_msg ? <Alert item_msg={item_msg} /> : null
                }
                       
                {
                     
                loading ? <div style={{textAlign: 'center'}}>
                        <BeatLoader color={'blue'} size={45} margin={20}  />
                    </div> :
                <Items items={items} />
                      
                }
               
            </div>
        )
    
}

export default ShoppingList;
