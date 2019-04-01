import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
// import { Link } from 'react-router-dom';
import API from '../utils/API';
import Navigation from '../components/Navigation';
import Banner from '../components/Banner';
import SavedBookCard from '../components/SavedBookCard';

class Saved extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: []
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

    componentDidMount = () => {
        API.getSavedBooks()
            .then(res => {
                console.log(res);
                this.getBooks();
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
            </div>
        );
    };
}
export default Saved;
