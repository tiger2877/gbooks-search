import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './style.css';

class Banner extends React.Component {
    render() {
        return (
            <Jumbotron style={{ backgroundImage: "url(./images/books.jpg)" }} className="text-center">
                {this.props.children}
            </Jumbotron>
        );
    }
}

export default Banner;