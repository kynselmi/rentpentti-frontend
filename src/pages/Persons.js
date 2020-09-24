import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ApiDataPopulatedTable from '../components/ApiDataPopulatedTable';
import Header from '../components/Header'

const API_URL = "http://localhost:8080/person";
const HEADER_NAMES = [ "Id", "First Name", "Last Name" ]

export default class Persons extends React.Component {  
  constructor(props) {
      super(props);
      this.state = {
          showCreationModal: false
      }
  }

  toggleShow() {
    this.setState(prevState => ({
      showCreationModal: !prevState.showCreationModal
    }))
  }

  createForm() {
    return (
      <Form className="form-small" onSubmit={() => this.sendForm()}>
      <div className="flex-row">
      <Form.Group controlId="formFirstName">
        <Form.Label>
          First Name
        </Form.Label>
        <Form.Control type="text" placeholder="John" />
      </Form.Group>
      <Form.Group controlId="formLastName">
        <Form.Label>
          Last Name
        </Form.Label>
        <Form.Control type="text" placeholder="Smith" />
      </Form.Group>
    </div>
    <Button className="form-button-wide" variant="primary" type="submit">
      Create
    </Button>
  </Form>
    )
  }

  sendForm() {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", API_URL, true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    let firstName = document.getElementById("formFirstName").value;
    let lastName = document.getElementById("formLastName").value
    let person = {
      firstName: firstName,
      lastName: lastName
    }
    xhr.send(JSON.stringify(person))
  }

  render() {
    let id = undefined
    if(id !== undefined) {
      return (
        <div className="app-wrapper">
          <Header activeKey="persons" />
          <h1>Moi</h1>
        </div>
      )
    }
    const handleShow = () => this.toggleShow();
      return (
        <div className="app-wrapper">
          <Header activeKey="persons" />
          <div className="table-wrapper">
            <ApiDataPopulatedTable className="data-table" urlMapping="/person" headerNames={HEADER_NAMES} />
          </div>
          <Button className="button-small" onClick={handleShow} variant="primary">
            Create person
          </Button>
          <Modal show={this.state.showCreationModal} onHide={handleShow}>
            <Modal.Header closeButton>
              <Modal.Title>Create a person</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {this.createForm()}
            </Modal.Body>
          </Modal>
        </div>
      );
  }
}
