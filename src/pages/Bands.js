import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import ApiDataPopulatedTable from '../components/ApiDataPopulatedTable';
import Header from '../components/Header'
import BandCard from '../components/BandCard'

const API_URL = "http://localhost:8080";
const HEADER_NAMES = [ "Id", "Name" ]

export default class Bands extends React.Component {  
  constructor(props) {
      super(props);
      this.state = {
          error: null,
          isLoaded: false,
          bands: [],
          showCreationModal: false
      }
  }

  componentDidMount() {
    // Fetch bands
    fetch(API_URL+"/band")
    .then(res => res.json())
    .then(data => {
      this.setState({
        bands: data,
        isLoaded: true
      })
    });
      // Fetch persons
      fetch(API_URL+"/person")
      .then(res => res.json())
      .then(data => {
        this.setState({
          persons: data,
          isLoaded: true
        })
      });
  }

  toggleShow() {
    this.setState(prevState => ({
      showCreationModal: !prevState.showCreationModal
    }))
  }

  createForm() {
    let persons = this.state.persons
    if (persons === undefined) {
      return
    }
    let bandMemberOptions = persons
      .sort( (a, b) => a.lastName.toUpperCase().localeCompare(b.lastName.toUpperCase()) )
      .map( person => <option>{person.lastName} {person.firstName}</option> )
    return (
      <Form className="form-small" onSubmit={() => this.sendForm()}>
      <Form.Group controlId="formBandName">
        <Form.Label>
          Name
        </Form.Label>
        <Form.Control type="text" placeholder="The Scorpions" />
      </Form.Group>
      <Form.Group controlId="formBandMembers">
        <Form.Label>
          Members
        </Form.Label>
        <Form.Control as="select" multiple>
          {bandMemberOptions}
        </Form.Control>
      </Form.Group>
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
    let bandName = document.getElementById("formBandName").value;
    let bandMembers = document.getElementById("formBandMembers").value
    let band = {
      name: bandName,
      members: bandMembers
    }
    xhr.send(JSON.stringify(band))
  }

  render() {
    const handleShow = () => this.toggleShow();
      return (
        <div className="app-wrapper">
          <Header activerKey="bands" />
          <BandCard className="band-card" urlMapping="/band" headerNames={HEADER_NAMES} />
          <Button className="button-small" onClick={handleShow} variant="primary">
            Create a band
          </Button>
          <Modal show={this.state.showCreationModal} onHide={handleShow}>
            <Modal.Header closeButton>
              <Modal.Title>Create a band</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {this.createForm()}
            </Modal.Body>
          </Modal>
        </div>
      );
  }

}