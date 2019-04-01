const db = require('../models');

// Defining methods for the booksController
module.exports = {
    getBooks: function (req, res) {
        db.Book
            .find(req.query)
            .sort({ date: -1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    // findById: function (req, res) {
    //     db.Books
    //         .findById(req.params.id)
    //         .then(dbModel => res.json(dbModel))
    //         .catch(err => res.status(422).json(err));
    // },
    saveBook: function (req, res) {
        console.log('this is req.body');
        console.log(req.body);
        db.Book
            .create(req.body)
            .then(dbModel => {
                req.io.emit('saved book', req.body.title);
                res.json(dbModel)
            }).catch(err => res.status(422).json(err));
    },
    // update: function (req, res) {
    //     db.Books
    //         .findOneAndUpdate({ _id: req.params.id }, req.body)
    //         .then(dbModel => res.json(dbModel))
    //         .catch(err => res.status(422).json(err));
    // },
    deleteBook: function (req, res) {
        db.Book
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => {
                req.io.emit('deleted book', dbModel.title);
                res.json(dbModel)
            }).catch(err => res.status(422).json(err));
    }
};
