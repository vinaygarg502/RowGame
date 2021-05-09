import {Modal, Button} from 'react-bootstrap';
import './Modal.css';
import { useState } from 'react';

function RadioModal(props) {
    const {defaultValue,formRadio,title, name} = props.data;
    const [value, setValue] = useState(defaultValue); 
    const handleChange = (event)=>{
      setValue(event.target.value);
    }
    const listItems = formRadio.map((radio, index) =>
      <div className="modal-radiogroup" key={index}>
        <input type="radio"  
          {...radio} 
          defaultChecked={value === radio.value}
          onChange={(e) => handleChange(e)}/>
        <label htmlFor={radio.id}>{radio.viewvalue}</label>
      </div>
    );
    return (
      <Modal
        show={props.show} onHide={props.onHide} backdrop = {props.backdrop}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {listItems}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary" onClick={props.onHide}>
            CANCEL
          </Button>
          <Button variant="primary" onClick={() => props.handleradiochange({name,value})}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  export default RadioModal;
  