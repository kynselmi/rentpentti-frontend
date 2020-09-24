import React from 'react';
import { Accordion, Button, Card, ListGroup } from 'react-bootstrap';

export default class ApiDataPopulatedTable extends React.Component {  
  constructor(props) {
      super(props);
      this.state = {
          error: null,
          isLoaded: false,
          items: []
      }
  }

  componentDidMount() {
    const API_URL = "http://localhost:8080"
    const URL_MAPPING = this.props.urlMapping;
    fetch(API_URL+URL_MAPPING)
    .then(res => res.json())
    .then(data => {
      this.setState({
        items: data,
        isLoaded: true
      })
    });
  }

  render() {
    if (!this.state.isLoaded) {
      return <div>Loading...</div>
    } 
    const entries = this.state.items;
    let body = [];
    if (entries !== undefined && entries.length > 0) {
      const entryKeys = Object.keys(entries[0])
      body.push(entries.map( entry => {
        if (entry === undefined) {
          return
        }
        let cardBody = []
        cardBody.push(<p>{this.props.headerNames[0]+": "+entry[entryKeys[0]]}</p>);
        cardBody.push(<p>{this.props.headerNames[1]+": "+entry[entryKeys[1]]}</p>);
        let members = entry[entryKeys[2]].map( (value, index) => <ListGroup.Item key={index}><a href={"/persons/"+value.id}>{value.firstName+" "+value.lastName}</a></ListGroup.Item>)
        cardBody.push(<p>{this.props.headerNames[2]+": "}<ListGroup variant="flush">{members}</ListGroup></p>)
        return (
        <Card key={entry["id"]}>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="1">
              {entry.name}
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body className={this.props.className}>{cardBody}</Card.Body>
          </Accordion.Collapse>
        </Card>
        )
      }))   
    }

    return (
      <Accordion defaultActiveKey="0">
        {body}
      </Accordion>
    );
  }
}