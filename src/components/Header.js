import React from 'react'
import Navigation from './Navigation'

export default class Header extends React.Component {
  render() {
    return (
      <header className="app-header">
        <Navigation activeKey={this.props.activeKey}/>
      </header>
    );
  }
}