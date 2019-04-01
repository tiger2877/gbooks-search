import React from 'react';
import socketIOClient from 'socket.io-client';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
// import { Link } from 'react-router-dom';
import API from '../utils/API';
import Navigation from '../components/Navigation';
import Banner from '../components/Banner';
import SavedBookCard from '../components/SavedBookCard';
import VerticallyCenteredModal from '../components/VerticallyCenteredModal';

class Saved extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            deletedBook: "",
            showDeleted: false
        }
    }

    getBooks = () => {
        API.getSavedBooks()
            .then(res => {
                console.log(res);
                this.setState({
                    books: res.data
                })
            }).catch(err => {
                console.log(err);
            });
    }

    handleDelete(id) {
        console.log('Handle Delete');
        console.log(id);
        API.deleteBook(id)
            .then(res => {
                console.log(res);
                this.getBooks();
            }).catch(err => {
                console.log(err);
            });
    }

    componentDidMount = () => {
        API.getSavedBooks()
            .then(res => {
                console.log(res);
                this.getBooks();
            }).catch(err => {
                console.log(err);
            });
    }

    componentDidUpdate = () => {
        const socket = socketIOClient();
        socket.on('deleted book', data => this.setState({ savedBook: data, showDeleted: true }));
    }

    render() {
        const closeDeleted = () => this.setState({ showDeleted: false });
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
                            <Col sm={12} className="text-left">
                                <h2>Saved Books</h2>
                            </Col>
                        </Row>
                        <Row>
                            {this.state.books.map((book, index) =>
                                <SavedBookCard
                                    key={index}
                                    book={book}
                                    onSelect={() => this.handleDelete(book._id)}
                                />
                            )}
                        </Row>
                    </Container>
                </div>
                <VerticallyCenteredModal
                    show={this.state.showDeleted}
                    onHide={closeDeleted}
                    heading="Deleted!"
                >
                    ({this.state.savedBook}) was successfuly deleted.
                </VerticallyCenteredModal>
            </div>
        );
    };
}
export default Saved;
