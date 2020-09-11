 import React, {Component, useEffect, useState} from 'react' ;
import {useSelector, useDispatch} from 'react-redux'
import {Alert} from 'reactstrap'
import axios from 'axios'
import BeatLoader from 'react-spinners/BeatLoader'
import {getItems, deleteItem} from '../components/actions/itemActions';
import ItemModal from './itemModal';
import { clearErrors } from './actions/errorActions';


/**
 * @param items
 * @description display items
*/
const Items = ({items_id, items}) => {

    const [deletingLoad, setDeletingingLoad] = useState(false)

    const {auth} = useSelector( (state) => state )
    const {item} = useSelector( (state) => state )
    const dispatch = useDispatch()

    useEffect( () => {
        if (item.item_status === 400 || 200) {
            setDeletingingLoad(false)
        }
        
    }, [item] )


    return (
        <>
        {deletingLoad ? <h6 style={{color: 'red'}} >deleting...</h6> : null }
        <h6 className="itemLength" >You have {items.length} item(s) </h6>
        <ul className="list-group ">
                { items ? items.map((name) => {
                    return <li key={name} className="list-group-item" >

                        <button disabled={auth.isAuthenticated === false} className="btn btn-danger small"
                        style={{marginRight: '2rem'}}
                        onClick={ () => {   
                            setDeletingingLoad(true)
                            dispatch(deleteItem(items_id, name)) } }
                        >   
                             Delete
                        </button>
                        {name}</li>
                }) : null}
            </ul>
            {items.length === 0 ? <h3 className="" style={{color: "orange"}} >No Items</h3> : null}
        </>
    )
}


/**
 * @description ShoppingList
*/
const ShoppingList = () => {
    const [err_msg, setMsg] = useState('')

    // const {loading, items, items_id, item_msg} = useSelector(state => state.item);
    const {item} = useSelector(state => state);
    const {auth} = useSelector(state => state);

    const dispatch = useDispatch();
    

    useEffect(() => {
        if (item.item_status === 400) {
            setMsg(item.item_msg)
        }
        if (auth.isAuthenticated) {
            dispatch(getItems(auth.user.id));
            // console.log('name', item.items)
            dispatch(clearErrors())
        }
    }, [auth])

        return (
            <div className="">
                <ItemModal />
              
                {
                    err_msg ? <Alert color="danger" > {err_msg} </Alert> : null
                }
                
                {
                     
                item.loading ? (<div style={{textAlign: 'center'}}>
                        <BeatLoader color={'blue'} size={45} margin={20}  />
                    </div>) :
                <Items items_id={item.items_id} items={item.items} />
                      
                }
               
            </div>
        )
    
}

export default ShoppingList;
