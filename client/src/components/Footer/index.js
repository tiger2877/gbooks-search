import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './style.css';

class Footer extends React.Component {
    render() {
        return (
            <div className={window.location.pathname === "/" ? "site-footer bg-light" : "site-footer"}>
                <Container>
                    <Row>
                        <Col xs={6} sm={6} className="text-left">
                            © 2019 <a href="https://github.com/j-Riv" target="_blank" rel="noopener noreferrer">jRiv</a>
                        </Col>
                        <Col xs={6} sm={6} className="text-right">
                            <a href="https://github.com/j-Riv/nyt-google-books-search" target="_blank" rel="noopener noreferrer"><i className="fas fa-code"></i></a>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Footer;
