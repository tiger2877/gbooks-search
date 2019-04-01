const db = require('../models');

// Defining methods for the booksController
module.exports = {
    getBooks: (req, res) => {
        db.Book
            .find(req.query)
            .sort({ date: -1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    saveBook: (req, res) => {
        console.log('this is req.body');
        console.log(req.body);
        db.Book
            .create(req.body)
            .then(dbModel => {
                req.io.emit('saved book', req.body.title);
                res.json(dbModel)
            }).catch(err => res.status(422).json(err));
    },
    deleteBook: (req, res) => {
        db.Book
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => {
                req.io.emit('deleted book', dbModel.title);
                res.json(dbModel)
            }).catch(err => res.status(422).json(err));
    }
};
