const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: { 
        type: String, 
        unique: true, 
        required: true 
    },
    authors: [{ type: String}],
    description: String,
    image: String,
    link: { 
        type: String, 
        required: true 
    }
});

bookSchema.plugin(uniqueValidator);

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
