import React from 'react';
import socketIOClient from 'socket.io-client';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import API from '../utils/API';
import Navigation from '../components/Navigation';
import Banner from '../components/Banner';
import BookCard from '../components/BookCard';
import VerticallyCenteredModal from '../components/VerticallyCenteredModal';
import server from '../config/config';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            books: [],
            book: "",
            savedBook: "",
            showSaved: false,
            showError: false
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
        
        API.saveBook(book)
            .then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
                this.setState({showError: true});
            });
    }

    componentDidUpdate = () => {
        const socket = socketIOClient(server,{ secure: true });
        socket.on('saved book', data => this.setState({savedBook: data, showSaved: true}));
    }

    render() {
        const closeModal = () => this.setState({ showSaved: false, showError: false });
        return (
            <div>
                <Navigation />
                <div className="pb-5">
                    <Banner style={{ backgroundImage: "url(/images/books.jpg)" }}>
                        <Container>
                            <h1><i className="fab fa-react"></i> <i className="fab fa-google"></i> Books Search</h1>
                            <h6>Search for and Save Books of Interest</h6>
                        </Container>
                    </Banner>
                    <Container>
                        <Row>
                            <Col sm={12} className="text-left">
                                <h2><i className="fas fa-book-dead"></i> BOOK SEARCH</h2>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="formSearch">
                                        <Form.Label>Book</Form.Label>
                                        <Form.Control type="text" placeholder="What book are you looking for?" name="query" onChange={this.handleInputChange}/>
                                    </Form.Group>
                                    <Button variant="secondary" type="submit">
                                        <i className="fas fa-search"></i>
                                    </Button>
                                </Form>
                            </Col>
                        </Row>
                        <Row>
                            {this.state.books.map((book, index) =>
                                <BookCard
                                    key={index}
                                    book={book.volumeInfo}
                                    title={book.volumeInfo.title}
                                    authors={book.volumeInfo.authors}
                                    link={book.volumeInfo.previewLink}
                                    image={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : ""}
                                    description={book.volumeInfo.description}
                                    buttonText="fa-save"
                                    onSelect={() => this.handleSave(book.volumeInfo)}
                                />
                            )}
                        </Row>
                    </Container>
                </div>
                <VerticallyCenteredModal
                    show={this.state.showSaved}
                    onHide={closeModal}
                    heading="Saved!"
                >
                    ({this.state.savedBook}) was successfuly saved.
                </VerticallyCenteredModal>
                <VerticallyCenteredModal
                    show={this.state.showError}
                    onHide={closeModal}
                    heading="Error!"
                >
                    This book is already saved. Please choose another book to save.
                </VerticallyCenteredModal>
            </div>
        );
    };
}
export default Search;
