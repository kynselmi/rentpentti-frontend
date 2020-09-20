import React from 'react'
import Navigation from './Navigation'

import '../styles/header.css'

export default class Header extends React.Component {
  render() {
    return (
      <header className="app-header">
        <Navigation activeKey={this.props.activeKey}/>
      </header>
    );
  }
}