import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './style.css';

class BookCard extends React.Component {
    render() {
        return (
            <Col sm={12} className="card-wrapper">
                <Card>
                    <Card.Body>
                        <Row>
                            <Col sm={8}>
                                <Card.Title>{this.props.book.title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    {this.props.book.authors ? this.props.book.authors.join(', ') : 'N/A'}
                                </Card.Subtitle>
                            </Col>
                            <Col sm={4} className="text-right">
                                <Button variant="secondary" type="button" className="pr-2" href={this.props.book.previewLink} target="_blank">View</Button>
                                <Button variant="secondary" type="button" onClick={() => this.props.onSelect()}>Save</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={3}>
                                <img src={this.props.book.imageLinks.thumbnail} alt={this.props.book.title} />
                            </Col>
                            <Col sm={9}>
                                <Card.Text>
                                    {this.props.book.description}
                                </Card.Text>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        );
    }
}

export default BookCard;