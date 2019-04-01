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
                                    {this.props.book.authors.map((a, i) => {
                                        let author;
                                        if (this.props.book.authors.length - 1 === i) {
                                            author = a;
                                        } else {
                                            author = a + ', ';
                                        }
                                        return author;
                                    })}
                                </Card.Subtitle>
                            </Col>
                            <Col sm={4} className="text-right">
                                <Button variant="secondary" type="button" className="pr-2">View</Button>
                                <Button variant="secondary" type="button" onClick={() => this.props.onSelect()}>Delete</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={3}>
                                <img src={this.props.book.image} alt={this.props.book.title} />
                            </Col>
                            <Col sm={9}>
                                <Card.Text>
                                    {this.props.book.description}
                                </Card.Text>
                            </Col>
                        </Row>
                        <Card.Link href={this.props.book.previewLink}>Preview Link</Card.Link>
                    </Card.Body>
                </Card>
            </Col>
        );
    }
}

export default BookCard;