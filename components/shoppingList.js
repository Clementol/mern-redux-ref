 import {Component, useEffect} from 'react' ;
import {useSelector, useDispatch} from 'react-redux'
import PropTypes from 'prop-types'
import {setItemsLoading, getItems, deleteItem} from '../components/actions/itemActions';
import ItemModal from './itemModal';


const Items = () => {
    const {items} = useSelector(state => state.item)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getItems())
    }, [])
    return (
        <ul className="list-group ">
                {items && items.map(({_id, name}) => {
                    return <li key={_id} className="list-group-item" >
                        <button className="btn btn-danger small"
                        style={{marginRight: '5rem'}}
                        onClick={() => dispatch(deleteItem(_id))}
                        >   
                            Delete
                        </button>
                        {name}</li>
                }) }
            </ul>
    )
}

const ItemList = () => {
    
    return (
        <>
          <ItemModal />
          <Items /> 
        </>
    )
   
}

ItemList.propTypes = {
    getItems: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired
}
class ShoppingList extends Component {
    
    render() {
       
        return (
            <div className="container">
               <ItemList getItems={getItems} deleteItem={deleteItem} />
            </div>
        )
    }
    
}

export default ShoppingList;
