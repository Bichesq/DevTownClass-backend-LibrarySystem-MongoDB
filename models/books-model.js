const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    genre: { type: String, required: true },
    publisher: { type: String, required: true }
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;