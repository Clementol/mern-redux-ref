import {addItem} from './actions/itemActions';
import { useState, useEffect } from 'react';
// import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap'
import Link from 'next/link';


// Link to login page
export const LoginLink = (
    <h4>Please 
        <Link href='/'>
          <a> login</a> 
        </Link> to manage items
    </h4>
  )



const ItemModal = () => {

    const [name, setName] = useState('')
    const [modal, setModal] = useState(false);
    const [msg, setMsg] = useState('');
    const [success_msg, setSuccessMsg] = useState('');
    const [addingLoad, setAddingLoad] = useState(false)

    const dispatch = useDispatch();

    // Reducers
    const {auth} = useSelector( state => state )
    const {item} = useSelector( state => state )

    // Life cycle method
    useEffect( () => {
    
        if ( item.add_item_status === 400 | 500) {
            setMsg(item.add_item_msg)
            setSuccessMsg('')
            setAddingLoad(false)
    
        }
        if (item.add_item_status === 200) {
          setSuccessMsg('Item Added')
          setMsg('')
          setAddingLoad(false)
        }
     
      }, [item] )


    
    /**
     * @description handle event
     * @param event
    */
    const onChange = (event) => {
        event.preventDefault()
        setName( event.target.value)
    }

    // method to open and close modal
    const toggle = () => {
      setModal(!modal)
      setMsg('')
      setAddingLoad(false)
      setSuccessMsg('')
      setName('')
     
    }
    
    /**
     * @description Add item button
     * @param event
    */
    const onSubmit = e => {
        e.preventDefault();
        setModal(true)
        setMsg('')
        setSuccessMsg('')
        setAddingLoad(true)
        const newItem = {
          name: name
        }
        //Add Item to list
        dispatch(addItem(auth.user.id, newItem))

        // setMsg('');
        //if no name  don't close modal
          // if (add_item_status === 400) {
          //   setModal(true);
          //   setMsg(add_item_msg);
          // } else {
          //   setModal(false)
          // }
          // // close modal if status is 200
          // if (add_item_status === 200 ) {
          //   setModal(false)
          // } 
        
        
  }
     

    return (
        <div style={{margin: '2rem'}}>
          <>
           {
             auth.isAuthenticated ?
             <Button color="primary" onClick={toggle}>Add Item</Button>
                : LoginLink
           }

          </>  
        {/* Modal */}
        <Modal isOpen={modal} fade={true} toggle={toggle} modalTransition={{ timeout: 100 }}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
           
          { msg ? <Alert color="danger" >{msg}</Alert> : null }
          { success_msg ? <Alert color="success" >{success_msg}</Alert> : null }
        
          <form onSubmit={ onSubmit}>

              <div className="form-group">
                  <label htmlFor="item" >Item</label>
                  <input className="form-control"
                      type="text"
                      value={name}
                      name="name"
                      id="item"
                      placeholder="Add shopping item"
                      onChange={onChange}
                  ></input>
                  <button 
                  style={{margin: '1rem', marginRight: '6rem'}}
                  type='submit'
                  disabled={addingLoad}
                  className="btn btn-primary" >{addingLoad ? 'Adding...' : "Add Item"}</button>
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
