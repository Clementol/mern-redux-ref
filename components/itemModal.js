import {addItem} from './actions/itemActions';
import { useState } from 'react';
import PropTypes from 'prop-types'
import { useDispatch, useSelector, connect } from 'react-redux';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
const ItemModal = () => {

    const [state, setState] = useState({name: ''})
    const [modal, setModal] = useState(false);
    const dispatch = useDispatch();
    
    const onChange = (event) => {
        event.preventDefault()
        setState({ name: event.target.value})
    }
    const toggle = () => {
      setModal(!modal)
    }
    const onSubmit = e => {
        e.preventDefault();
        const newItem = {
          name: state.name
        }
        //Add Item to list
        dispatch(addItem(newItem))
        //cloas modal
        setModal(!modal)
        // set input to empty
        setState({name: ''})
    }

    return (
        <div style={{margin: '2rem'}}>
           <Button color="primary" onClick={toggle}>Add Item</Button>
        {/* Modal */}
        <Modal isOpen={modal} fade={true} toggle={toggle} modalTransition={{ timeout: 100 }}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
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
ItemModal.propTypes = {
  addItem: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  item: state.item
})

export default connect(mapStateToProps, {addItem})(ItemModal);
