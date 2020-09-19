import React from 'react';
import ApiDataPopulatedTable from '../components/ApiDataPopulatedTable';
import Header from '../components/Header'

export default class Persons extends React.Component {  
  constructor(props) {
      super(props);
      this.state = {
          error: null,
          isLoaded: false,
          items: []
      }
  }

  componentDidMount() {
    const API_URL = "http://localhost:8080/person";
    fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      this.setState({
        items: data,
        isLoaded: true
      })
    });
  }

  render() {
    const headerNames = [ "Id", "First Name", "Last Name" ]
      return (
        <div className="app-wrapper">
          <Header activerKey="persons" />
          <ApiDataPopulatedTable urlMapping="/person" headerNames={headerNames} />
        </div>
      );
  }

}