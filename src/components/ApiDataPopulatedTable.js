import React from 'react';
import { Table } from 'react-bootstrap';
import ApiDataPopulatedTableRow from '../components/ApiDataPopulatedTableRow'
import queryPersons from '../queries/PersonQuery.js'

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
    queryPersons().then( data =>
        this.setState({
          isLoaded: true,
          items: data
        })
      )
    
  }

  render() {
    if (!this.state.isLoaded) {
      return <div>Loading...</div>
    } 
    const entries = this.state.items;
    let headers = [];
    let body = [];
    if (entries !== undefined && entries.length > 0) {
      headers = this.props.headerNames.map((item, index) => <th key={index}>{item}</th>)
      const entryKeys = Object.keys(entries[0])
      body.push(entries.map( entry => <ApiDataPopulatedTableRow key={entry[entryKeys[0]]} entry={entry} entryKeys={entryKeys} />) )
      
    }

    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            {headers}
          </tr>
        </thead>
        <tbody>
          {body}
        </tbody>
      </Table> 
    );
  }
}