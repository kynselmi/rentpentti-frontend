import React from 'react'
import Nav from 'react-bootstrap/Nav';

export default class Navigation extends React.Component {
    render() {
        return (
            <Nav
                className="navbar"
                activeKey={this.props.activeKey}
            >
            <Nav.Item>
                <Nav.Link href="/" eventKey="home">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/persons" to="/persons" eventKey="band">Persons</Nav.Link>
            </Nav.Item>
            </Nav>
        );
    }
}