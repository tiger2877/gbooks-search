import axios from 'axios';

const url = 'https://www.googleapis.com/books/v1/volumes?q='

export default {
    // Gets all books
    getBooks: query => {
        return axios.get(url + query);
    },
    // Gets all saved books
    getSavedBooks: () => {
        return axios.get("/api/books");
    },
    // Gets the book with the given id
    getBook: id => {
        return axios.get('/api/books/' + id);
    },
    // Deletes the book with the given id
    deleteBook: id => {
        return axios.delete('/api/books/' + id);
    },
    // Saves a book to the database
    saveBook: bookData => {
        return axios.post('/api/books', bookData);
    }

}