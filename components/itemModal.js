import {addItem} from './actions/itemActions';
import { useState, useEffect } from 'react';
// import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap'
import Link from 'next/link';

// Link to login page
const LoginLink = (
    <h4>Please 
        <Link href='/login'>
          <a> login</a> 
        </Link> to manage items
    </h4>
  )



const ItemModal = () => {

    const [state, setState] = useState({name: ''})
    const [modal, setModal] = useState(false);
    const [msg, setMsg] = useState('');

    const dispatch = useDispatch();

    // Reducers
    const {isAuthenticated} = useSelector( state => state.auth )
    const {item_msg, item_status} = useSelector( state => state.item )

    // Life cycle method
    useEffect( () => {
      //if (isAuthenticated ===  true) {
        if (item_status === 400) {
            setMsg(item_msg)
            
        }
      //}
      }, [ item_status, item_msg] )


    
    /**
     * @description handle event
     * @param event
    */
    const onChange = (event) => {
        event.preventDefault()
        setState({ name: event.target.value})
    }

    // method to open and close modal
    const toggle = () => {
      setModal(!modal)
      setMsg('')
    }
    
    /**
     * @description Add item button
     * @param event
    */
    const onSubmit = e => {
        e.preventDefault();

        // name of item to be added
        const newItem = {
          name: state.name
        }

        //Add Item to list
        dispatch(addItem(newItem))
        setMsg('');
        //if no name  don't close modal
        if (item_status === 400) {
          setModal(true)
        } else {

          setModal(false)
        }

        // set input to empty
        setState({name: ''})
    }
     

    return (
        <div style={{margin: '2rem'}}>
          <>
           {
             isAuthenticated ?
             <Button color="primary" onClick={toggle}>Add Item</Button>
                : LoginLink
           }

          </>  
        {/* Modal */}
        <Modal isOpen={modal} fade={true} toggle={toggle} modalTransition={{ timeout: 100 }}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
           
        {item_msg ? <Alert color="danger"> {item_msg} </Alert> : null
        }
        
          <form onSubmit={onSubmit}>

              <div className="form-group">
                  <label htmlFor="item" >Item</label>
                  <input className="form-control"
                      type="text"
                      value={state.name}
                      name="name"
                      id="item"
                      placeholder="Add shopping item"
                      onChange={onChange}
                  ></input>
                  <button 
                  style={{margin: '1rem', marginRight: '6rem'}}
                  type='submit'
                  className="btn btn-primary" >Add Item</button>
              </div>
          </form>      

        </ModalBody>

        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>

      </Modal>
    </div>
       
    )
}


export default ItemModal;
