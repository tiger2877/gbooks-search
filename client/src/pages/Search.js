import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import { Link } from 'react-router-dom';
import API from '../utils/API';
import Navigation from '../components/Navigation';
import Banner from '../components/Banner';
import BookCard from '../components/BookCard';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            books: [],
            book: ""
        }
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.value;

        this.setState({
            query: encodeURI(value)
        });
        console.log(this.state.query);
    }

    handleSubmit = event => {
        event.preventDefault();
        API.getBooks(this.state.query)
            .then(res => {
                console.log(res.data.items);
                this.setState({ books: res.data.items });
            }).catch(err => {
                console.log(err);
            });
    }

    handleSave(data) {
        const book = {
            title: data.title,
            authors: data.authors,
            description: data.description,
            image: data.imageLinks.thumbnail,
            link: data.previewLink
        };
        console.log('Handle Save');
        console.log(book);
        API.saveBook(book)
            .then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div>
                <Navigation />
                <div className="pb-5">
                    <Banner style={{ backgroundImage: "url(/images/books.jpg)" }}>
                        <Container>
                            <h1>(React) Google Books Search</h1>
                            <h6>Search for and Save Books of Interest</h6>
                        </Container>
                    </Banner>
                    <Container>
                        <Row>
                            <Col sm={12} className="text-center">
                                <h2>Book Search</h2>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="formSearch">
                                        <Form.Label>Book</Form.Label>
                                        <Form.Control type="text" placeholder="What book are you looking for?" name="query" onChange={this.handleInputChange}/>
                                    </Form.Group>
                                    <Button variant="secondary" type="submit">
                                        Submit
                                    </Button>
                                </Form>
                            </Col>
                        </Row>
                        <Row>
                            {this.state.books.map((book, index) =>
                                <BookCard
                                    key={index}
                                    book={book.volumeInfo}
                                    onSelect={() => this.handleSave(book.volumeInfo)}
                                />
                            )}
                        </Row>
                    </Container>
                </div>
            </div>
        );
    };
}
export default Search;
