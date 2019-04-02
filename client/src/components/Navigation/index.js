import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import './style.css';

class Navigation extends React.Component {
    render() {
        return (
            <Navbar bg="white" expand="lg" className="nav-home">
                <Container>
                    <Navbar.Brand href="/">
                        <img src="/images/gbooks-search-logo.png" alt="gBooks Search" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav">
                        <i className="fas fa-bars text-white"></i>
                    </Navbar.Toggle>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link
                                href="/"
                                className={window.location.pathname === "/" ? "nav-link active" : "nav-link"}
                            >
                                Search
                            </Nav.Link>
                            <Nav.Link
                                href="/saved"
                                className={window.location.pathname === "/saved" ? "nav-link active" : "nav-link"}
                            >
                                Saved
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default Navigation;